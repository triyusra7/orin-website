import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { QuizTrigger } from "@/components/QuizModal";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

import { routing, type Locale } from "@/i18n/routing";

/* ---------- Locale-scoped page data (copy for testimonials lives here,
   messages/*.json is owned by the orchestrator) ---------- */

interface Testimonial {
  name: string;
  role: Record<Locale, string>;
  quote: Record<Locale, string>;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ibu Ratna",
    role: {
      id: "Orang tua murid Kids · YCT",
      en: "Parent, Kids · YCT program",
      zh: "少儿 YCT 学员家长",
    },
    quote: {
      id: "Anak saya yang tadinya malu-malu sekarang berani ngobrol bahasa Mandarin di rumah. Gurunya sabar dan kelasnya seru — lulus YCT 2 dalam setahun.",
      en: "My once-shy daughter now happily chats in Mandarin at home. Patient teachers, fun classes — she passed YCT 2 within a year.",
      zh: "我的女儿之前很害羞，现在在家里都会主动开心地说中文了。老师极富耐心，课堂生动有趣 —— 一年内就顺利通过了 YCT 2 级。",
    },
  },
  {
    name: "Kevin S.",
    role: {
      id: "Diterima di Tsinghua University, Beijing",
      en: "Accepted at Tsinghua University, Beijing",
      zh: "已被北京清华大学录取",
    },
    quote: {
      id: "Dari les HSK sampai esai beasiswa, semuanya dipegang satu tim yang sama. Saya lolos HSK 5 dan diterima dengan beasiswa — prosesnya jelas dari awal.",
      en: "From HSK classes to my scholarship essays, one team handled it all. I passed HSK 5 and got in with a scholarship — the process was clear from day one.",
      zh: "从 HSK 强化辅导到奖学金申请文书，全程由同一支导师团队指导。我顺利考取了 HSK 5 级并斩获奖学金录取，整个规划流程自始至终清晰明确。",
    },
  },
  {
    name: "Pak Hendra",
    role: {
      id: "Profesional · Business Mandarin",
      en: "Professional · Business Mandarin",
      zh: "职场人士 · 商务中文学员",
    },
    quote: {
      id: "Jadwalnya fleksibel mengikuti kalender kerja saya. Enam bulan kemudian saya sudah berani negosiasi langsung dengan supplier di Guangzhou.",
      en: "The schedule flexed around my work calendar. Six months in, I was confident enough to negotiate directly with suppliers in Guangzhou.",
      zh: "课程时间非常灵活，完全适配我的出差与工作日程。学习六个月后，我已经能够直接与广州的供应商自如进行商务谈判了。",
    },
  },
];

const STATS = [
  { value: "500+", labelKey: "statsStudents" },
  { value: "80+", labelKey: "statsPlacements" },
  { value: "95%", labelKey: "statsPassRate" },
  { value: "6+", labelKey: "statsYears" },
] as const;

const FEATURED_PROGRAMS = [
  { anchor: "kids", nameKey: "kids.name", zh: "少儿" },
  { anchor: "exam-prep", nameKey: "examPrep.name", zh: "考试" },
  { anchor: "speaking-booster", nameKey: "speaking.name", zh: "口语" },
  { anchor: "business", nameKey: "business.name", zh: "商务" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const tWa = await getTranslations("whatsapp");
  const tPrograms = await getTranslations("programs");

  const loc: Locale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;
  const prefill = tWa("defaultPrefill");

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-brand-yellow"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 select-none font-zh text-[16rem] font-bold leading-none text-brand-maroon/10 lg:-right-4 lg:text-[24rem] animate-float-slow"
        >
          欧林
        </span>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 lg:py-28">
          <ScrollReveal variant="fade-down" delay={50}>
            <span className="rounded-full bg-brand-maroon px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
              {t("heroBadge")}
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <h1
              id="hero-title"
              className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-brand-maroon sm:text-5xl lg:text-6xl"
            >
              {t("heroTitle")}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={180}>
            <p className="max-w-2xl text-lg text-brand-ink/80">
              {t("heroSubtitle")}
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={260}>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppLink
                prefill={prefill}
                source="/"
                context="hero"
                className="btn-hover-glow inline-flex items-center justify-center rounded-full bg-brand-maroon px-8 py-4 text-base font-bold text-white shadow-md transition-colors hover:bg-brand-maroon-dark"
              >
                {t("heroCtaPrimary")}
              </WhatsAppLink>
              <QuizTrigger
                source="/"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-maroon px-8 py-4 text-base font-bold text-brand-maroon transition-all duration-300 hover:scale-[1.02] hover:bg-brand-maroon hover:text-white"
              >
                {t("heroCtaSecondary")}
              </QuizTrigger>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- Dual value blocks ---------- */}
      <section aria-labelledby="value-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("valueBlocksTitle")} />
          </ScrollReveal>
          <h2 id="value-title" className="sr-only">
            {t("valueBlocksTitle")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <ScrollReveal variant="scale-up" delay={100}>
              <Link
                href="/programs"
                className="card-hover-lift group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-brand-yellow p-8 lg:p-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 -right-2 select-none font-zh text-8xl font-bold text-brand-maroon/10"
                >
                  学
                </span>
                <h3 className="font-display text-2xl font-extrabold text-brand-maroon lg:text-3xl">
                  {t("valueMandarinTitle")}
                </h3>
                <p className="max-w-md text-brand-ink/80">
                  {t("valueMandarinDesc")}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 font-bold text-brand-maroon">
                  {t("valueMandarinCta")}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </span>
              </Link>
            </ScrollReveal>

            <ScrollReveal variant="scale-up" delay={200}>
              <Link
                href="/consulting"
                className="card-hover-lift group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl bg-brand-blue p-8 lg:p-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 -right-2 select-none font-zh text-8xl font-bold text-white/10"
                >
                  留
                </span>
                <h3 className="font-display text-2xl font-extrabold text-white lg:text-3xl">
                  {t("valueConsultingTitle")}
                </h3>
                <p className="max-w-md text-white/85">
                  {t("valueConsultingDesc")}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 font-bold text-brand-yellow">
                  {t("valueConsultingCta")}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---------- Why Orin ---------- */}
      <section aria-labelledby="why-title" className="bg-brand-cream-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("whyTitle")} />
          </ScrollReveal>
          <h2 id="why-title" className="sr-only">
            {t("whyTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(["why1", "why2", "why3", "why4"] as const).map((key, i) => (
              <ScrollReveal key={key} variant="fade-up" delay={i * 100}>
                <div className="card-hover-lift flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow font-zh text-lg font-bold text-brand-maroon"
                  >
                    {["一", "二", "三", "四"][i]}
                  </span>
                  <h3 className="font-display text-lg font-bold text-brand-ink">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="text-sm text-brand-ink/70">{t(`${key}Desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Social proof: stats + testimonials ---------- */}
      <section aria-labelledby="proof-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          {/* Title (HIDDEN — hapus false && untuk tampilkan kembali) */}
          {false && <SectionHeading title={t("proofTitle")} />}
          <h2 id="proof-title" className="sr-only">
            {t("proofTitle")}
          </h2>
          {/* Stats (HIDDEN — hapus false && untuk tampilkan kembali) */}
          {false && (
            <dl className="grid grid-cols-2 gap-6 rounded-3xl bg-brand-cream p-8 lg:grid-cols-4 lg:p-10">
              {STATS.map(({ value, labelKey }) => (
                <div key={labelKey} className="flex flex-col items-center gap-1 text-center">
                  <dd className="order-1 font-display text-4xl font-extrabold text-brand-maroon lg:text-5xl">
                    {value}
                  </dd>
                  <dt className="order-2 text-sm font-semibold text-brand-ink/70">
                    {t(labelKey)}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          <ScrollReveal variant="fade-up">
            <h3 className="mt-6 text-center font-display text-2xl font-extrabold text-brand-maroon lg:text-3xl">
              {t("testimonialsTitle")}
            </h3>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, i) => (
              <ScrollReveal key={item.name} variant="fade-up" delay={i * 120}>
                <figure className="card-hover-lift flex h-full flex-col gap-4 rounded-2xl bg-brand-cream-soft p-6 shadow-sm">
                  <span
                    aria-hidden
                    className="font-display text-4xl font-extrabold leading-none text-brand-yellow"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="text-sm leading-relaxed text-brand-ink/85">
                    {item.quote[loc]}
                  </blockquote>
                  <figcaption className="mt-auto">
                    <p className="font-display font-bold text-brand-maroon">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold text-brand-ink/60">
                      {item.role[loc]}
                    </p>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section aria-labelledby="how-title" className="bg-brand-cream-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("howTitle")} />
          </ScrollReveal>
          <h2 id="how-title" className="sr-only">
            {t("howTitle")}
          </h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {(["how1", "how2", "how3"] as const).map((key, i) => (
              <ScrollReveal key={key} variant="fade-up" delay={i * 140}>
                <li className="flex flex-col items-center gap-4 text-center">
                  <span
                    aria-hidden
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-maroon font-display text-2xl font-extrabold text-white shadow-md transition-transform duration-300 hover:scale-110"
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display text-xl font-bold text-brand-ink">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="max-w-xs text-sm text-brand-ink/70">
                    {t(`${key}Desc`)}
                  </p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Featured programs ---------- */}
      <section aria-labelledby="featured-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("featuredProgramsTitle")} />
          </ScrollReveal>
          <h2 id="featured-title" className="sr-only">
            {t("featuredProgramsTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PROGRAMS.map(({ anchor, nameKey, zh }, i) => (
              <ScrollReveal key={anchor} variant="fade-up" delay={i * 80}>
                <Link
                  href={`/programs#${anchor}`}
                  className="card-hover-lift group flex items-center gap-4 rounded-2xl border-2 border-brand-cream bg-white p-5 transition-all hover:border-brand-yellow hover:bg-brand-cream-soft"
                >
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-cream font-zh text-lg font-bold text-brand-maroon transition-colors group-hover:bg-brand-yellow"
                  >
                    {zh}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display font-bold text-brand-ink transition-colors group-hover:text-brand-maroon">
                      {tPrograms(nameKey)}
                    </span>
                    <span className="text-xs font-semibold text-brand-blue">
                      {tCommon("learnMore")} →
                    </span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA band ---------- */}
      <CTABand
        title={t("closingTitle")}
        description={t("closingDesc")}
        ctaLabel={t("closingCta")}
        prefill={prefill}
        source="/"
      />
    </>
  );
}
