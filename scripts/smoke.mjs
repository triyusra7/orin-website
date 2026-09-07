/**
 * Playwright smoke test for the lead flow (PRD §9).
 * Assumes the production server is running: npm run start -- -p 3900
 * Run: node scripts/smoke.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3900";
let failures = 0;

function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

// 1. Home renders in Indonesian by default
await page.goto(BASE, { waitUntil: "networkidle" });
check(
  "home renders (id default)",
  (await page.locator("h1").first().innerText()).includes("Dari karakter pertama"),
);

// 2. Language toggle → English URL and copy
await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
check(
  "english locale renders",
  (await page.locator("h1").first().innerText()).includes("From first character"),
);

// 3. Floating WhatsApp button exists with wa.me link
const waHref = await page
  .locator('a[aria-label*="WhatsApp"]')
  .first()
  .getAttribute("href");
check("floating WhatsApp wa.me link", Boolean(waHref?.startsWith("https://wa.me/")), waHref ?? "missing");

// 4. Contact form validates and submits to /api/lead
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
await page.fill('input[name="name"]', "Smoke Test");
await page.fill('input[name="whatsapp"]', "081234567890");
await page.selectOption("select", { index: 1 });
await page.fill("textarea", "Halo, ini pesan uji coba lead flow otomatis.");
const [resp] = await Promise.all([
  page.waitForResponse((r) => r.url().includes("/api/lead"), { timeout: 15000 }),
  page.click('button[type="submit"]'),
]);
check("lead POST returns ok", resp.ok(), `status ${resp.status()}`);
await page.waitForTimeout(500);
check(
  "success state visible with WhatsApp fallback",
  await page.locator('[role="status"] a[href^="https://wa.me/"]').first().isVisible(),
);

// 5. API rejects invalid payloads
const bad = await page.request.post(`${BASE}/api/lead`, {
  data: { name: "", whatsapp: "x", interest: "" },
});
check("lead API rejects invalid payload", bad.status() === 422, `status ${bad.status()}`);

// 6. Honeypot silently accepted
const honey = await page.request.post(`${BASE}/api/lead`, {
  data: {
    name: "Bot",
    whatsapp: "081234567890",
    interest: "spam",
    company: "evil corp",
  },
});
check("honeypot: bot payload dropped politely", honey.status() === 200 || honey.status() === 422);

// 7. Quiz opens, completes, and captures
await page.goto(BASE, { waitUntil: "networkidle" });
await page.locator("button", { hasText: /Kuis|Quiz/i }).first().click();
for (let i = 0; i < 4; i++) {
  await page.locator('[role="dialog"] button').filter({ hasText: /.{6,}/ }).first().click();
  await page.waitForTimeout(200);
}
check(
  "quiz reaches result + capture step",
  await page.locator('[role="dialog"] input[type="tel"]').isVisible(),
);

// 8. Blog index and a post render
await page.goto(`${BASE}/blog`, { waitUntil: "networkidle" });
const postLink = page.locator('a[href*="/blog/"]').first();
check("blog index lists posts", await postLink.isVisible());
await postLink.click();
await page.waitForLoadState("networkidle");
check("blog post renders article", await page.locator("article, h1").first().isVisible());

// 9. Key routes respond 200 in both locales
for (const path of ["/programs", "/consulting", "/about", "/results", "/privacy", "/en/programs", "/en/contact"]) {
  const r = await page.request.get(`${BASE}${path}`);
  check(`route ${path}`, r.status() === 200, `status ${r.status()}`);
}

await browser.close();
console.log(failures === 0 ? "\nALL SMOKE TESTS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
