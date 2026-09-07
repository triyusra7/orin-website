import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const PROGRAMS = [
  {
    key: "kids",
    anchor: "kids",
    headerClass: "bg-brand-yellow text-brand-maroon",
  },
  {
    key: "examPrep",
    anchor: "exam-prep",
    headerClass: "bg-brand-blue text-white",
  },
  {
    key: "speaking",
    anchor: "speaking-booster",
    headerClass: "bg-brand-maroon text-brand-cream",
  },
  {
    key: "business",
    anchor: "business",
    headerClass: "bg-brand-cream text-brand-maroon",
  },
] as const;

const TRUST_KEYS = ["trust1", "trust2", "trust3"] as const;
const FAQ_KEYS = ["faq1", "faq2", "faq3", "faq4", "faq5"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programs" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 shrink-0"
    >
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("programs");
  const tWa = await getTranslations("whatsapp");
  const tHome = await getTranslations("home");

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="programs-hero-title"
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
              id="programs-hero-title"
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
            <p className="max-w-2xl text-lg text-brand-ink/80">{t("heroDesc")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Program cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {PROGRAMS.map(({ key, anchor, headerClass }, i) => (
            <ScrollReveal key={key} variant="fade-up" delay={i * 120}>
              <article
                id={anchor}
                className="card-hover-lift flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-brand-ink/10 bg-white shadow-sm"
              >
                <div className={cn("px-6 py-5", headerClass)}>
                  <h2 className="font-display text-2xl font-extrabold">
                    {t(`${key}.name`)}
                  </h2>
                </div>
                <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                  <dl className="flex flex-col gap-3">
                    {(
                      [
                        ["forLabel", "for"],
                        ["formatLabel", "format"],
                        ["outcomeLabel", "outcome"],
                      ] as const
                    ).map(([labelKey, fieldKey]) => (
                      <div key={fieldKey} className="flex flex-col gap-0.5">
                        <dt className="text-sm font-bold text-brand-blue">
                          {t(labelKey)}
                        </dt>
                        <dd className="text-brand-ink/80">
                          {t(`${key}.${fieldKey}`)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="text-brand-ink/70">{t(`${key}.desc`)}</p>
                  <div className="mt-auto pt-2">
                    <WhatsAppLink
                      prefill={tWa("trialPrefill", { program: t(`${key}.name`) })}
                      source="/programs"
                      context={key}
                      className="inline-block rounded-full bg-brand-yellow px-6 py-3 font-bold text-brand-maroon shadow-sm transition-transform hover:scale-[1.03] motion-reduce:transition-none"
                    >
                      {t("trialCta")}
                    </WhatsAppLink>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tutor-quality trust strip */}
      <section className="bg-brand-blue">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <ScrollReveal variant="fade-up">
            <h2 className="mb-8 text-center font-display text-2xl font-extrabold text-white lg:text-3xl">
              {t("trustTitle")}
            </h2>
          </ScrollReveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {TRUST_KEYS.map((trustKey, i) => (
              <ScrollReveal key={trustKey} variant="fade-up" delay={i * 100}>
                <li className="flex items-start gap-3 text-brand-cream">
                  <span className="text-brand-yellow">
                    <CheckIcon />
                  </span>
                  <span>{t(trustKey)}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading title={t("faqTitle")} />
          <FaqAccordion
            items={FAQ_KEYS.map((faqKey) => ({
              q: t(`${faqKey}Q`),
              a: t(`${faqKey}A`),
            }))}
          />
        </ScrollReveal>
      </section>

      {/* Closing CTA band */}
      <CTABand
        title={tHome("closingTitle")}
        description={tHome("closingDesc")}
        ctaLabel={tHome("closingCta")}
        prefill={tWa("defaultPrefill")}
        source="/programs"
      />
    </>
  );
}
