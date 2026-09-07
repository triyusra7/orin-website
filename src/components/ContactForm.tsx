"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { waLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Mirrors the Zod rule in src/app/api/lead/route.ts
const WHATSAPP_RE = /^\+?[0-9 \-()]{8,20}$/;

const INTEREST_OPTIONS = [
  { value: "kids", labelKey: "interestKids" },
  { value: "exam", labelKey: "interestExam" },
  { value: "speaking", labelKey: "interestSpeaking" },
  { value: "business", labelKey: "interestBusiness" },
  { value: "consulting", labelKey: "interestConsulting" },
  { value: "other", labelKey: "interestOther" },
] as const;

type FieldName = "name" | "whatsapp" | "interest" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-2xl border-2 border-brand-cream bg-white px-4 py-3 text-sm text-brand-ink outline-none transition-colors focus:border-brand-maroon aria-[invalid=true]:border-brand-maroon";

/** Contact / booking form (PRD §5.7, §6.1): posts to /api/lead, degrades to WhatsApp (PRD §10). */
export function ContactForm() {
  const t = useTranslations("contact");
  const tw = useTranslations("whatsapp");
  const locale = useLocale();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — humans never see it
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const whatsappFallback = waLink(tw("defaultPrefill"));

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = t("validationName");
    if (!WHATSAPP_RE.test(whatsapp.trim())) next.whatsapp = t("validationWhatsapp");
    if (!interest) next.interest = t("validationInterest");
    if (message.trim().length < 10) next.message = t("validationMessage");
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          interest,
          message: message.trim(),
          source: "contact-form",
          locale,
          company,
        }),
      });
      if (!res.ok) throw new Error("lead_failed");
      trackEvent("lead_form_submit", { interest, locale });
      trackEvent("lead_booked", { segment: interest, source: "contact-form" });
      setStatus("success");
    } catch {
      // Graceful degradation: surface a WhatsApp fallback (PRD §10)
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl bg-brand-cream-soft p-6 sm:p-8"
      >
        <h3 className="font-display text-2xl font-extrabold text-brand-maroon">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-brand-ink/80">{t("successDesc")}</p>
        <a
          href={whatsappFallback}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("whatsapp_click", {
              source_page: "/contact",
              context: "form-success",
            })
          }
          className="mt-5 inline-block rounded-full bg-brand-maroon px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-maroon-dark"
        >
          {t("successWhatsappCta")}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-4">
      <h2 className="font-display text-2xl font-extrabold text-brand-ink">
        {t("formTitle")}
      </h2>

      <div>
        <label htmlFor="contact-name" className="text-sm font-bold text-brand-ink">
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-xs font-semibold text-brand-maroon">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-whatsapp" className="text-sm font-bold text-brand-ink">
          {t("whatsappLabel")}
        </label>
        <input
          id="contact-whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={t("whatsappPlaceholder")}
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          aria-invalid={Boolean(errors.whatsapp)}
          aria-describedby={errors.whatsapp ? "contact-whatsapp-error" : undefined}
          className={inputClass}
        />
        {errors.whatsapp && (
          <p id="contact-whatsapp-error" className="mt-1 text-xs font-semibold text-brand-maroon">
            {errors.whatsapp}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-interest" className="text-sm font-bold text-brand-ink">
          {t("interestLabel")}
        </label>
        <select
          id="contact-interest"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? "contact-interest-error" : undefined}
          className={cn(inputClass, !interest && "text-brand-ink/50")}
        >
          <option value="" disabled>
            {t("interestPlaceholder")}
          </option>
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p id="contact-interest-error" className="mt-1 text-xs font-semibold text-brand-maroon">
            {errors.interest}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-bold text-brand-ink">
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(inputClass, "resize-y")}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-xs font-semibold text-brand-maroon">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot (mirrors API "company" field) — hidden from humans, kept in tab-free flow */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-hover-glow w-full rounded-full bg-brand-maroon px-6 py-4 font-bold text-white shadow-md transition-all hover:bg-brand-maroon-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>

      {status === "error" && (
        <div role="alert" className="rounded-2xl bg-brand-cream-soft p-4">
          <p className="font-display font-bold text-brand-maroon">{t("errorTitle")}</p>
          <p className="mt-1 text-sm text-brand-ink/80">{t("errorDesc")}</p>
          <a
            href={whatsappFallback}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", {
                source_page: "/contact",
                context: "form-error",
              })
            }
            className="mt-3 inline-block rounded-full bg-brand-maroon px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-maroon-dark"
          >
            {t("successWhatsappCta")}
          </a>
        </div>
      )}
    </form>
  );
}
