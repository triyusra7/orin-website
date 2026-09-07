import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "consulting" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const iconClass = "h-6 w-6";

/** Simple inline icons for the 5 consulting services (PRD §5.3). */
const SERVICE_ICONS: React.ReactNode[] = [
  // 1 — graduation cap (university selection)
  <svg
    key="cap"
    className={iconClass}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 9 12 4 2 9l10 5 10-5Z" />
    <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    <path d="M22 9v5" />
  </svg>,
  // 2 — document (applications & essays)
  <svg
    key="doc"
    className={iconClass}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Z" />
    <path d="M14 3v4h4" />
    <path d="M9.5 12h5M9.5 16h5" />
  </svg>,
  // 3 — chat bubble (interview prep)
  <svg
    key="chat"
    className={iconClass}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12a8 8 0 0 1-8 8H4l2.2-3.3A8 8 0 1 1 21 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </svg>,
  // 4 — award ribbon (scholarship guidance)
  <svg
    key="award"
    className={iconClass}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="9" r="5" />
    <path d="m9 13.5-2 7 5-2.5 5 2.5-2-7" />
  </svg>,
  // 5 — passport (visa basics)
  <svg
    key="passport"
    className={iconClass}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M9 16.5h6" />
  </svg>,
];

/** Locale-agnostic destination universities (proper nouns) for the placements strip. */
const PLACEMENTS = [
  { name: "Tsinghua University", place: "Beijing · China" },
  { name: "Fudan University", place: "Shanghai · China" },
  { name: "Zhejiang University", place: "Hangzhou · China" },
  { name: "National Taiwan University", place: "Taipei · Taiwan" },
  { name: "National Tsing Hua University", place: "Hsinchu · Taiwan" },
  { name: "Beijing Language and Culture University", place: "Beijing · China" },
];

export default async function ConsultingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("consulting");
  const tCommon = await getTranslations("common");
  const tWa = await getTranslations("whatsapp");

  const services = ([1, 2, 3, 4, 5] as const).map((n, i) => ({
    title: t(`service${n}Title`),
    desc: t(`service${n}Desc`),
    icon: SERVICE_ICONS[i],
  }));

  const steps = ([1, 2, 3, 4] as const).map((n) => ({
    label: t(`timeline${n}Label`),
    desc: t(`timeline${n}Desc`),
  }));

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="consulting-hero-title"
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
              id="consulting-hero-title"
              className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-brand-maroon sm:text-5xl lg:text-6xl"
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
            <p className="max-w-2xl text-lg text-brand-ink/80">{t("heroDesc")}</p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={240}>
            <WhatsAppLink
              prefill={tWa("consultingPrefill")}
              source="/consulting"
              context="hero"
              className="btn-hover-glow mt-2 inline-block rounded-full bg-brand-maroon px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-brand-maroon-dark hover:scale-[1.03] active:scale-95 motion-reduce:transition-none"
            >
              {t("heroCta")}
            </WhatsAppLink>
          </ScrollReveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("servicesTitle")} />
          </ScrollReveal>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} variant="fade-up" delay={i * 100}>
                <li className="card-hover-lift flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-brand-maroon transition-transform duration-300 hover:rotate-6">
                    {service.icon}
                  </span>
                  <h3 className="font-display text-lg font-bold text-brand-maroon">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-ink/70">
                    {service.desc}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("timelineTitle")} />
          </ScrollReveal>
          <ol className="grid lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.label} variant="fade-up" delay={i * 120}>
                <li className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-4 lg:pb-0 lg:text-center">
                  {i < steps.length - 1 ? (
                    <>
                      {/* vertical connector (mobile) */}
                      <span
                        aria-hidden="true"
                        className="absolute left-5 top-10 h-[calc(100%-2.5rem)] w-0.5 -translate-x-1/2 bg-brand-maroon/20 lg:hidden"
                      />
                      {/* horizontal connector (lg) */}
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-5 hidden h-0.5 w-full -translate-y-1/2 bg-brand-maroon/20 lg:block"
                      />
                    </>
                  ) : null}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-maroon font-display text-base font-bold text-white shadow-sm transition-transform duration-300 hover:scale-110">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-brand-maroon">
                      {step.label}
                    </h3>
                    <p className="mt-1 max-w-xs text-sm leading-relaxed text-brand-ink/70">
                      {step.desc}
                    </p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Recent placements strip */}
      <section className="bg-brand-cream-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("resultsTitle")} />
          </ScrollReveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLACEMENTS.map((placement, i) => (
              <ScrollReveal key={placement.name} variant="fade-up" delay={i * 80}>
                <li className="card-hover-lift flex flex-col gap-1 rounded-2xl border border-brand-cream bg-white px-5 py-4 shadow-sm">
                  <span className="font-display font-bold text-brand-blue">
                    {placement.name}
                  </span>
                  <span className="text-sm text-brand-ink/60">{placement.place}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <CTABand
        title={t("closingTitle")}
        description={t("closingDesc")}
        ctaLabel={tCommon("freeAssessment")}
        prefill={tWa("consultingPrefill")}
        source="/consulting"
      />
    </>
  );
}
