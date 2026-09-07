/**
 * Event layer (PRD §11). Events flow to GA4 (gtag) and Meta Pixel (fbq)
 * when their scripts are present; otherwise they no-op so the site works
 * without analytics configured.
 */
type EventName =
  | "whatsapp_click"
  | "lead_form_submit"
  | "lead_booked"
  | "quiz_start"
  | "quiz_completed"
  | "lead_captured"
  | "blog_cta_click";

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: EventName, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, props);
  window.fbq?.("trackCustom", name, props);
}
