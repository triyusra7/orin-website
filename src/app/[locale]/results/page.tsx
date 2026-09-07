import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ResultsFilter,
  type ResultsTestimonial,
  type TestimonialSegment,
} from "@/components/ResultsFilter";

import { routing, type Locale } from "@/i18n/routing";

/* ---------- Locale-scoped page data (testimonial/placement copy lives here,
   messages/*.json is owned by the orchestrator) ---------- */

interface Testimonial {
  name: string;
  segment: TestimonialSegment;
  role: Record<Locale, string>;
  quote: Record<Locale, string>;
  highlight?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ibu Melisa",
    segment: "kids",
    role: {
      id: "Orang tua murid Kids · YCT",
      en: "Parent, Kids · YCT program",
      zh: "少儿 YCT 学员家长",
    },
    quote: {
      id: "Awalnya anak saya ikut-ikutan saja, sekarang malah dia yang mengingatkan jadwal les. Lagu dan permainannya bikin betah — YCT 3 lulus di percobaan pertama.",
      en: "My son only tagged along at first — now he's the one reminding me about class. The songs and games keep him hooked, and he passed YCT 3 on his first try.",
      zh: "起初孩子只是抱着试试看的心态，现在每到上课时间反而是他主动提醒我。趣味儿歌与游戏互动让他沉浸其中 —— YCT 3 级一次就顺利通过了。",
    },
    highlight: "YCT 3",
  },
  {
    name: "Pak Yohanes",
    segment: "kids",
    role: {
      id: "Orang tua dua murid Kids",
      en: "Parent of two Kids students",
      zh: "两位少儿班学员家长",
    },
    quote: {
      id: "Laporan progresnya jelas: apa yang sudah dikuasai, apa yang perlu diulang. Sebagai orang tua yang tidak bisa Mandarin, saya tetap bisa mengikuti perkembangan anak.",
      en: "The progress reports are clear: what's mastered, what needs review. As a parent who doesn't speak Mandarin, I can still follow my children's growth.",
      zh: "学习进度报告一目了然：哪些知识点已经掌握，哪些需要温习。作为完全不懂中文的家长，我也能时刻跟进孩子们的成长轨迹。",
    },
    highlight: "YCT 2",
  },
  {
    name: "Jessica T.",
    segment: "exam",
    role: {
      id: "Siswa Exam Prep · HSK",
      en: "Exam Prep student · HSK",
      zh: "HSK 备考强化班学员",
    },
    quote: {
      id: "Latihan soalnya persis format asli dan tiap kesalahan dibedah sampai paham. Saya dapat 289 dari 300 di HSK 5 — jauh di atas target saya.",
      en: "The drills mirror the real exam format and every mistake gets dissected until it sticks. I scored 289 out of 300 on HSK 5 — far above my target.",
      zh: "模考真题训练紧扣官方机考形式，每道错题都剖析得透彻入理。最终我在 HSK 5 级考试中拿到了 289 分（满分 300）—— 远超我最初的预期！",
    },
    highlight: "HSK 5 · 289/300",
  },
  {
    name: "Daniel W.",
    segment: "exam",
    role: {
      id: "Siswa Exam Prep · TOCFL",
      en: "Exam Prep student · TOCFL",
      zh: "TOCFL 备考班学员",
    },
    quote: {
      id: "Strategi listening-nya mengubah segalanya. Dari selalu kehabisan waktu, saya lulus TOCFL Band B dengan nyaman untuk syarat beasiswa Taiwan.",
      en: "The listening strategy changed everything. From always running out of time, I passed TOCFL Band B comfortably for my Taiwan scholarship requirement.",
      zh: "听力技巧讲解彻底帮我突破了瓶颈。从以前总是答不完题，到现在从容通过 TOCFL Band B，顺利达到了台湾地区奖学金的申请门槛。",
    },
    highlight: "TOCFL Band B",
  },
  {
    name: "Nadya P.",
    segment: "exam",
    role: {
      id: "Siswa Exam Prep · HSK",
      en: "Exam Prep student · HSK",
      zh: "HSK 备考强化班学员",
    },
    quote: {
      id: "Tiga bulan kelas intensif — kurikulumnya padat tapi masuk akal. HSK 4 tembus 276/300 dan sekarang saya lanjut ke kelas HSK 5.",
      en: "Three months of intensive classes — a dense but sensible curriculum. I hit 276/300 on HSK 4 and moved straight into the HSK 5 class.",
      zh: "三个月的集训课节奏紧凑、循序渐进。HSK 4 级考出了 276 分的高分，目前我正在继续攻读 HSK 5 级课程。",
    },
    highlight: "HSK 4 · 276/300",
  },
  {
    name: "Ibu Christine",
    segment: "adults",
    role: {
      id: "Manajer ekspor · Business Mandarin",
      en: "Export manager · Business Mandarin",
      zh: "外贸出口经理 · 商务中文学员",
    },
    quote: {
      id: "Materinya langsung memakai istilah industri saya. Tiga bulan, saya sudah membuka meeting dengan klien Shenzhen dalam bahasa Mandarin — suasana langsung cair.",
      en: "The material uses my industry's vocabulary. Within three months I was opening meetings with our Shenzhen clients in Mandarin — the room warms up instantly.",
      zh: "课程内容直接契合我所在的行业术语。仅仅三个月，我就能用中文自如主持与深圳客户的业务会议 —— 商务氛围立刻融洽起来。",
    },
  },
  {
    name: "Pak Anton",
    segment: "adults",
    role: {
      id: "Pemilik usaha F&B · Speaking Booster",
      en: "F&B business owner · Speaking Booster",
      zh: "餐饮连锁创始人 · 口语强化班学员",
    },
    quote: {
      id: "Kelas malam online-nya cocok dengan jadwal saya. Sekarang nego harga dengan supplier Taiwan tidak perlu penerjemah lagi.",
      en: "The online evening classes fit my schedule. Negotiating prices with my Taiwanese suppliers no longer needs a translator.",
      zh: "晚间线上课与我的创业时间完美契合。现在我和台湾供应商洽谈合作与采购价格，再也不用依赖专职翻译了。",
    },
  },
  {
    name: "Kevin H.",
    segment: "abroad",
    role: {
      id: "Diterima di Zhejiang University, Hangzhou",
      en: "Accepted at Zhejiang University, Hangzhou",
      zh: "已被浙江大学录取（中国杭州）",
    },
    quote: {
      id: "Dari HSK 4 sampai esai motivasi, satu tim yang sama mendampingi. Saya diterima di Zhejiang University dengan beasiswa penuh CSC.",
      en: "From HSK 4 to my motivation essays, the same team guided it all. I got into Zhejiang University with a full CSC scholarship.",
      zh: "从 HSK 4 级冲刺到个人陈述文书润色，同一个导师团队全程指导。我最终成功获得浙江大学录取及中国政府奖学金（CSC）全额资助。",
    },
    highlight: "CSC Scholarship",
  },
  {
    name: "Felicia G.",
    segment: "abroad",
    role: {
      id: "Diterima di National Taiwan University, Taipei",
      en: "Accepted at National Taiwan University, Taipei",
      zh: "已被国立台湾大学录取（中国台北）",
    },
    quote: {
      id: "Timeline aplikasinya jelas per musim, dokumen dicek berlapis. Ketika surat penerimaan NTU datang, semua langkah kecil itu terbayar.",
      en: "The application timeline was mapped season by season, documents triple-checked. When the NTU acceptance letter arrived, every small step paid off.",
      zh: "申请季的每一个节点都有详尽规划，材料层层严密把关。当收到台湾大学（NTU）录取通知书那一刻，所有的认真与付出都得到了回报。",
    },
    highlight: "NTU Taipei",
  },
];

const PLACEMENTS = [
  { name: "Kevin H.", university: "Zhejiang University, Hangzhou" },
  { name: "Felicia G.", university: "National Taiwan University, Taipei" },
  { name: "Marcell A.", university: "Tsinghua University, Beijing" },
  { name: "Angelica P.", university: "Fudan University, Shanghai" },
  { name: "Bryan K.", university: "National Cheng Kung University, Tainan" },
  { name: "Stephanie L.", university: "Beijing Language and Culture University, Beijing" },
  { name: "Jason M.", university: "Shanghai Jiao Tong University, Shanghai" },
] as const;

const EXAM_STATS: { value: string; label: Record<Locale, string> }[] = [
  {
    value: "95%",
    label: {
      id: "Kelulusan HSK 4–6",
      en: "HSK 4–6 pass rate",
      zh: "HSK 4–6 官方考试通过率",
    },
  },
  {
    value: "289/300",
    label: {
      id: "Skor HSK 5 tertinggi",
      en: "Top HSK 5 score",
      zh: "学员 HSK 5 级最高成绩",
    },
  },
  {
    value: "92%",
    label: {
      id: "Lulus YCT di percobaan pertama",
      en: "YCT first-attempt pass rate",
      zh: "YCT 官方考试首次通过率",
    },
  },
  {
    value: "150+",
    label: {
      id: "Sertifikat ujian sejak 2019",
      en: "Exam certificates since 2019",
      zh: "2019 年以来累计取得证书",
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "results" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("results");
  const tHome = await getTranslations("home");
  const tWa = await getTranslations("whatsapp");

  const loc: Locale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const items: ResultsTestimonial[] = TESTIMONIALS.map((item) => ({
    name: item.name,
    segment: item.segment,
    role: item.role[loc],
    quote: item.quote[loc],
    highlight: item.highlight,
  }));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        aria-labelledby="results-hero-title"
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
              id="results-hero-title"
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
        </div>
      </section>

      {/* ---------- Testimonials with segment filter ---------- */}
      <section aria-labelledby="testimonials-title" className="bg-brand-cream-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <ScrollReveal variant="fade-up">
            <SectionHeading title={t("testimonialsTitle")} />
          </ScrollReveal>
          <h2 id="testimonials-title" className="sr-only">
            {t("testimonialsTitle")}
          </h2>
          <ResultsFilter
            items={items}
            labels={{
              all: t("filterAll"),
              kids: t("filterKids"),
              exam: t("filterExam"),
              adults: t("filterAdults"),
              abroad: t("filterAbroad"),
            }}
          />
        </div>
      </section>

      {/* ---------- University placements (HIDDEN — hapus false && untuk tampilkan) ---------- */}
      {false && (
      <section aria-labelledby="placements-title" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <SectionHeading title={t("placementsTitle")} />
          <h2 id="placements-title" className="sr-only">
            {t("placementsTitle")}
          </h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {PLACEMENTS.map(({ name, university }) => (
              <li
                key={name}
                className="rounded-full bg-brand-cream px-5 py-2.5 text-sm font-semibold text-brand-ink"
              >
                {name}
                <span aria-hidden className="mx-2 font-bold text-brand-maroon">
                  →
                </span>
                <span className="text-brand-maroon">{university}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      )}

      {/* ---------- Exam results strip (HIDDEN — hapus false && untuk tampilkan) ---------- */}
      {false && (
      <section aria-labelledby="exam-title" className="bg-brand-cream-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <SectionHeading title={t("examTitle")} />
          <h2 id="exam-title" className="sr-only">
            {t("examTitle")}
          </h2>
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {EXAM_STATS.map(({ value, label }) => (
              <div
                key={value}
                className="flex flex-col items-center gap-1 rounded-2xl bg-white p-6 text-center shadow-sm lg:p-8"
              >
                <dd className="order-1 font-display text-3xl font-extrabold text-brand-maroon lg:text-4xl">
                  {value}
                </dd>
                <dt className="order-2 text-sm font-semibold text-brand-ink/70">
                  {label[loc]}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
      )}

      {/* ---------- Closing CTA band ---------- */}
      <CTABand
        title={tHome("closingTitle")}
        description={tHome("closingDesc")}
        ctaLabel={tHome("closingCta")}
        prefill={tWa("defaultPrefill")}
        source="/results"
      />
    </>
  );
}
