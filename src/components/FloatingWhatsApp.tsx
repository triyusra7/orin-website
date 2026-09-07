"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { waLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/** Floating WhatsApp button, bottom-right on every page (PRD §7). */
export function FloatingWhatsApp() {
  const t = useTranslations("whatsapp");
  const pathname = usePathname();

  return (
    <a
      href={waLink(t("defaultPrefill"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("floatingLabel")}
      onClick={() =>
        trackEvent("whatsapp_click", { source_page: pathname, context: "floating" })
      }
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg animate-pulse-soft transition-all duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-maroon motion-reduce:transition-none motion-reduce:animate-none"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.1.6 4.1 1.6 5.9L4 29l8.4-1.6c1.7.9 3.6 1.4 5.6 1.4 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.8c-1.8 0-3.5-.5-5-1.3l-.4-.2-5 1 1-4.8-.3-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.4 4.5-9.9 10.1-9.9s10.1 4.4 10.1 9.9c.1 5.4-4.4 9.9-10 9.9zm5.5-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}
