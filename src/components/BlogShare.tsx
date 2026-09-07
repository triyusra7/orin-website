"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface BlogShareProps {
  label: string;
  title: string;
  slug: string;
}

/** Share row: copy-link + WhatsApp share (PRD §5.6). */
export function BlogShare({ label, title, slug }: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-brand-ink/60">{label}:</span>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            // Clipboard unavailable — ignore.
          }
        }}
        className="rounded-full border-2 border-brand-cream px-4 py-1.5 text-sm font-semibold text-brand-ink transition-all duration-200 hover:border-brand-maroon hover:text-brand-maroon hover:scale-105 active:scale-95"
      >
        {copied ? "✓" : "🔗"} Link
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("blog_cta_click", { slug, context: "share" })}
        className="rounded-full border-2 border-brand-cream px-4 py-1.5 text-sm font-semibold text-brand-ink transition-all duration-200 hover:border-brand-maroon hover:text-brand-maroon hover:scale-105 active:scale-95"
      >
        WhatsApp
      </a>
    </div>
  );
}
