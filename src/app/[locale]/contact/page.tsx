import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { ContactForm } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

/** Contact / Book page (PRD §5.7): WhatsApp-first, short form as secondary. */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tw = await getTranslations("whatsapp");
  const tc = await getTranslations("common");

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="contact-hero-title"
        className="relative overflow-hidden bg-brand-yellow"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-zh text-[9rem] font-bold leading-none text-brand-maroon/10 sm:text-[12rem] lg:text-[16rem] animate-float-slow"
        >
          {t("heroZh")}
        </span>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-20 lg:py-28">
          <ScrollReveal variant="fade-down" delay={50}>
            <h1
              id="contact-hero-title"
              className="font-display text-4xl font-extrabold leading-tight text-brand-maroon sm:text-5xl lg:text-6xl"
            >
              {t("heroTitle")}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={120}>
            <p className="font-zh text-3xl font-bold text-brand-maroon sm:text-4xl">
              {t("heroZh")}
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={180}>
            <p className="max-w-xl text-lg text-brand-ink/80">{t("heroDesc")}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-14">
          {/* WhatsApp-first column */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl bg-brand-cream-soft p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold text-brand-ink">
                {t("whatsappTitle")}
              </h2>
              <p className="mt-2 text-sm text-brand-ink/80">{t("whatsappDesc")}</p>
              <WhatsAppLink
                prefill={tw("defaultPrefill")}
                source="/contact"
                context="contact-card"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-maroon px-6 py-4 text-base font-bold text-white shadow-md transition-colors hover:bg-brand-maroon-dark"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2a9.9 9.9 0 0 0-8.6 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.4.2.5.7 1.9.8 2 .1.1.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.2.2-.3.3-.1.6.1.3.7 1.1 1.4 1.8 1 .9 1.8 1.1 2.1 1.3.3.1.4.1.6-.1.2-.2.7-.8.8-1 .2-.3.4-.2.6-.1.2.1 1.6.7 1.8.9.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
                </svg>
                {tc("whatsappUs")}
              </WhatsAppLink>
            </div>

            <div className="rounded-3xl border-2 border-brand-cream p-6 sm:p-8">
              <h2 className="font-display text-lg font-extrabold text-brand-ink">
                {t("hoursTitle")}
              </h2>
              <p className="mt-2 text-sm text-brand-ink/80">{t("hoursWeekday")}</p>
              <p className="mt-1 text-sm text-brand-ink/80">{t("hoursWeekend")}</p>

              <h2 className="mt-6 font-display text-lg font-extrabold text-brand-ink">
                {t("locationTitle")}
              </h2>
              <p className="mt-2 text-sm text-brand-ink/80">{t("locationDesc")}</p>

              <a
                href="https://instagram.com/orinmandarin"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-bold text-brand-blue hover:underline"
              >
                {t("instagramLabel")} ↗
              </a>
            </div>
          </div>

          {/* Form column */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
