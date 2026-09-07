/**
 * WhatsApp click-to-chat helpers (PRD §7).
 * The business number is an env placeholder until confirmed (PRD §13).
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281200000000";

export function waLink(prefill: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
}
