import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Lead capture endpoint (PRD §7): validates with Zod, honeypot + naive
 * rate limit, then forwards to email (Resend) and/or Google Sheet webhook
 * when configured via env. Always degrades gracefully — the client falls
 * back to WhatsApp if this fails (PRD §10).
 */
const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[0-9 \-()]{8,20}$/, "invalid phone"),
  email: z.string().trim().email().optional().or(z.literal("")),
  interest: z.string().trim().min(1).max(60),
  message: z.string().trim().max(2000).optional().default(""),
  source: z.string().trim().max(120).optional().default("website"),
  locale: z.enum(["id", "en", "zh"]).optional().default("id"),
  // Honeypot — real users never fill this
  company: z.string().max(0).optional().or(z.literal("")),
});

// Naive in-memory rate limit: 5 requests/minute/IP (fine for v1 on a
// single serverless instance; replace with Upstash or similar at scale).
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 60_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = parsed.data;
  // Honeypot filled → pretend success, drop silently.
  if (lead.company) {
    return NextResponse.json({ ok: true });
  }

  const tasks: Promise<unknown>[] = [];

  // Email via Resend (optional, PRD §9)
  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM ?? "leads@orinmandarin.com",
          to: process.env.LEAD_EMAIL_TO,
          subject: `[Orin Lead] ${lead.interest} — ${lead.name}`,
          text: [
            `Name: ${lead.name}`,
            `WhatsApp: ${lead.whatsapp}`,
            `Email: ${lead.email || "-"}`,
            `Interest: ${lead.interest}`,
            `Locale: ${lead.locale}`,
            `Source: ${lead.source}`,
            "",
            lead.message,
          ].join("\n"),
        }),
      }),
    );
  }

  // Google Sheet / Airtable style webhook (optional)
  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      }),
    );
  }

  try {
    await Promise.allSettled(tasks);
  } catch {
    // Never fail the user because a downstream sink hiccuped.
  }

  return NextResponse.json({ ok: true });
}
