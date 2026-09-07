"use client";

import { waLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface WhatsAppLinkProps {
  prefill: string;
  /** Where the CTA lives, for analytics (PRD §11 whatsapp_click) */
  source: string;
  context?: string;
  className?: string;
  children: React.ReactNode;
}

/** Any WhatsApp CTA: renders wa.me link and fires whatsapp_click. */
export function WhatsAppLink({
  prefill,
  source,
  context,
  className,
  children,
}: WhatsAppLinkProps) {
  return (
    <a
      href={waLink(prefill)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
      onClick={() => trackEvent("whatsapp_click", { source_page: source, context })}
    >
      {children}
    </a>
  );
}
