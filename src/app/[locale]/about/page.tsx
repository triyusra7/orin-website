import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

import { routing, type Locale } from "@/i18n/routing";

/* ---------- Locale-scoped page data (placeholder tutor copy lives here,
   messages/*.json is owned by the orchestrator) ---------- */

interface TeamMember {
  name: string;
  avatar: string;
  role: Record<Locale, string>;
  bio: Record<Locale, string>;
}

const TEAM: TeamMember[] = [
  {
    name: "Wei Laoshi 魏老师",
    avatar: "魏",
    role: {
      id: "Pengajar native · HSK & Bisnis",
      en: "Native tutor · HSK & Business",
      zh: "母语外教 · HSK 与商务中文主讲",
    },
    bio: {
      id: "12 tahun mengajar Mandarin untuk pelajar Asia Tenggara.",
      en: "12 years teaching Mandarin to Southeast Asian learners.",
      zh: "拥有 12 年东南亚学员中文一线教学经验。",
    },
  },
  {
    name: "Kak Sinta",
    avatar: "S",
    role: {
      id: "Pengajar Kids · YCT",
      en: "Kids tutor · YCT",
      zh: "少儿 YCT 资深讲师",
    },
    bio: {
      id: "Spesialis kelas anak — lagu, permainan, dan pujian tepat waktu.",
      en: "Kids-class specialist — songs, games, and well-timed praise.",
      zh: "少儿教学专家 —— 善于运用趣味儿歌、互动游戏与及时正向激励。",
    },
  },
  {
    name: "Mei Laoshi 美老师",
    avatar: "美",
    role: {
      id: "Pengajar native · Speaking",
      en: "Native tutor · Speaking",
      zh: "母语外教 · 口语强化主讲",
    },
    bio: {
      id: "Membuat siswa pendiam berani bicara sejak sesi pertama.",
      en: "Gets quiet students talking from the very first session.",
      zh: "擅长启发教学，让内向学员从第一堂课起便自信开口。",
    },
  },
  {
    name: "Kak Devan",
    avatar: "D",
    role: {
      id: "Konselor studi · China & Taiwan",
      en: "Study counselor · China & Taiwan",
      zh: "升学顾问 · 中国大陆与台湾地区留学",
    },
    bio: {
      id: "Alumnus NTU Taipei; memandu aplikasi dan beasiswa dari A sampai Z.",
      en: "NTU Taipei alum; guides applications and scholarships end to end.",
      zh: "毕业于国立台湾大学（NTU）；全程悉心指导选校申请与奖学金攻关。",
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tHome = await getTranslations("home");
  const tWa = await getTranslations("whatsapp");

  const loc: Locale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return (
    <>
      {/* ---------- Hero: brand moment with 欧林中文 (PRD §5.4) ---------- */}
      <section
        aria-labelledby="about-hero-title"
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
              id="about-hero-title"
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
        </div>
      </section>

      {/* ---------- Story: prose + pull-quote ---------- */}
      <section aria-labelledby="story-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal variant="fade-up">
              <div className="flex flex-col gap-4">
                <h2
                  id="story-title"
                  className="font-display text-3xl font-extrabold text-brand-maroon lg:text-4xl"
                >
                  {t("storyTitle")}
                </h2>
                <p className="leading-relaxed text-brand-ink/80">{t("storyP1")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="scale-up" delay={100}>
              <blockquote className="rounded-2xl border-l-4 border-brand-yellow bg-brand-cream-soft p-8 shadow-sm lg:p-10">
                <p className="font-display text-xl font-bold leading-relaxed text-brand-maroon lg:text-2xl">
                  {t("storyP2")}
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---------- Mission callout ---------- */}
      <section aria-labelledby="mission-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 lg:pb-24">
          <ScrollReveal variant="scale-up">
            <div className="relative overflow-hidden rounded-3xl bg-brand-yellow p-8 shadow-md lg:p-14">
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-4 select-none font-zh text-9xl font-bold text-brand-maroon/10"
              >
                使命
              </span>
              <h2
                id="mission-title"
                className="text-sm font-bold uppercase tracking-widest text-brand-maroon/80"
              >
                {t("missionTitle")}
              </h2>
              <p className="mt-3 max-w-3xl font-display text-2xl font-extrabold leading-snug text-brand-maroon lg:text-3xl">
                {t("missionDesc")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------- Method: 3 cards ---------- */}
      <section aria-labelledby="method-title" className="bg-brand-cream-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("methodTitle")} />
          </ScrollReveal>
          <h2 id="method-title" className="sr-only">
            {t("methodTitle")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {(["method1", "method2", "method3"] as const).map((key, i) => (
              <ScrollReveal key={key} variant="fade-up" delay={i * 100}>
                <div className="card-hover-lift flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow font-zh text-lg font-bold text-brand-maroon"
                  >
                    {["一", "二", "三"][i]}
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

      {/* ---------- Team & tutors ---------- */}
      <section aria-labelledby="team-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("teamTitle")} description={t("teamDesc")} />
          </ScrollReveal>
          <h2 id="team-title" className="sr-only">
            {t("teamTitle")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.name} variant="fade-up" delay={i * 100}>
                <div className="card-hover-lift flex h-full flex-col items-center gap-3 rounded-2xl bg-brand-cream-soft p-6 text-center shadow-sm">
                  <span
                    aria-hidden
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-maroon font-zh text-2xl font-bold text-brand-yellow shadow-sm transition-transform duration-300 hover:scale-110"
                  >
                    {member.avatar}
                  </span>
                  <h3 className="font-display text-lg font-bold text-brand-ink">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                    {member.role[loc]}
                  </p>
                  <p className="text-sm text-brand-ink/70">{member.bio[loc]}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Values: 3 cards ---------- */}
      <section aria-labelledby="values-title" className="bg-brand-cream-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("valuesTitle")} />
          </ScrollReveal>
          <h2 id="values-title" className="sr-only">
            {t("valuesTitle")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {(["value1", "value2", "value3"] as const).map((key, i) => (
              <ScrollReveal key={key} variant="fade-up" delay={i * 100}>
                <div className="card-hover-lift flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-brand-maroon">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="text-sm text-brand-ink/70">{t(`${key}Desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA band ---------- */}
      <CTABand
        title={tHome("closingTitle")}
        description={tHome("closingDesc")}
        ctaLabel={tHome("closingCta")}
        prefill={tWa("defaultPrefill")}
        source="/about"
      />
    </>
  );
}
