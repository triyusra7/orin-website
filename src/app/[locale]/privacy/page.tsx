import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

// PDP-Law-aware privacy policy (PRD §10). Copy authored inline per locale;
// legal text is page-specific and not reused elsewhere.
const COPY = {
  id: {
    title: "Kebijakan Privasi",
    updated: "Terakhir diperbarui: Juli 2026",
    sections: [
      {
        h: "Data yang kami kumpulkan",
        p: "Saat kamu mengisi formulir, kuis, atau menghubungi kami via WhatsApp, kami menyimpan nama, nomor WhatsApp, alamat email (jika diberikan), minat program, dan isi pesanmu. Kami tidak mengumpulkan data lebih dari yang diperlukan untuk menindaklanjuti pertanyaanmu.",
      },
      {
        h: "Bagaimana data digunakan",
        p: "Data dipakai untuk menghubungimu kembali terkait konsultasi, kelas percobaan, atau asesmen yang kamu minta, serta — jika kamu setuju — mengirim informasi program yang relevan. Kami tidak menjual data pribadimu kepada pihak mana pun.",
      },
      {
        h: "Penyimpanan & keamanan",
        p: "Data prospek disimpan di sistem internal kami (email dan spreadsheet/CRM) dengan akses terbatas pada tim Orin. Kami menyimpan data hanya selama diperlukan untuk tujuan di atas.",
      },
      {
        h: "Analitik",
        p: "Situs ini dapat menggunakan Google Analytics dan Meta Pixel untuk memahami penggunaan situs dan efektivitas iklan. Data ini bersifat agregat dan tunduk pada kebijakan masing-masing penyedia.",
      },
      {
        h: "Hakmu",
        p: "Sesuai UU Pelindungan Data Pribadi (UU PDP), kamu berhak meminta akses, koreksi, atau penghapusan data pribadimu. Hubungi kami via WhatsApp atau halaman Kontak untuk mengajukan permintaan.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "Data we collect",
        p: "When you submit a form, take the quiz, or contact us on WhatsApp, we store your name, WhatsApp number, email (if provided), program interest, and your message. We don't collect more than we need to follow up on your inquiry.",
      },
      {
        h: "How data is used",
        p: "Data is used to get back to you about the consultation, trial class, or assessment you requested, and — with your consent — to send relevant program information. We never sell your personal data.",
      },
      {
        h: "Storage & security",
        p: "Lead data lives in our internal systems (email and spreadsheet/CRM) with access limited to the Orin team. We keep data only as long as needed for the purposes above.",
      },
      {
        h: "Analytics",
        p: "This site may use Google Analytics and Meta Pixel to understand site usage and ad effectiveness. That data is aggregate and governed by each provider's policies.",
      },
      {
        h: "Your rights",
        p: "Under Indonesia's Personal Data Protection Law (UU PDP), you may request access to, correction of, or deletion of your personal data. Contact us via WhatsApp or the Contact page to make a request.",
      },
    ],
  },
  zh: {
    title: "隐私政策",
    updated: "最近更新日期：2026年7月",
    sections: [
      {
        h: "我们收集的数据",
        p: "当您填写在线表单、参与学习路线测验或通过 WhatsApp 联系我们时，我们将记录您的姓名、WhatsApp 号码、电子邮箱（若有提供）、感兴趣的项目及留言内容。我们仅收集为回复及跟进您的咨询所必需的信息，绝不过度索取。",
      },
      {
        h: "数据的使用方式",
        p: "您的数据仅用于跟进您所预约的免费咨询、试听课或留学评估服务；并在获得您明确同意的前提下，向您推送相关的课程及留学资讯。我们绝不会向任何第三方出售或出租您的个人信息。",
      },
      {
        h: "数据存储与安全保障",
        p: "潜在学员数据仅保存在我们的内部系统（企业邮箱及 CRM 数据库）中，访问权限严格限于 Orin 团队必要工作人员。我们仅在实现上述服务目的所需的必要期限内留存数据。",
      },
      {
        h: "网站数据统计与分析",
        p: "本网站可能使用 Google Analytics 及 Meta Pixel 了解网站使用体验与推广成效。此类数据均为汇总匿名数据，并严格遵循各服务商的隐私协议。",
      },
      {
        h: "您的法定权利",
        p: "根据印度尼西亚《个人数据保护法》（UU PDP），您有权要求查阅、更正或请求删除您的个人数据。如需申请，请随时通过 WhatsApp 或联系我们页面与我们沟通。",
      },
    ],
  },
} as const;

type PrivacyLocale = keyof typeof COPY;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const key: PrivacyLocale = locale in COPY ? (locale as PrivacyLocale) : "id";
  const copy = COPY[key];
  return { title: copy.title, robots: { index: true } };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const key: PrivacyLocale = locale in COPY ? (locale as PrivacyLocale) : "id";
  const copy = COPY[key];

  return (
    <article className="mx-auto max-w-prose px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold text-brand-maroon">
        {copy.title}
      </h1>
      <p className="mt-2 text-sm text-brand-ink/60">{copy.updated}</p>
      {copy.sections.map((s) => (
        <section key={s.h} className="mt-8">
          <h2 className="font-display text-xl font-bold text-brand-ink">{s.h}</h2>
          <p className="mt-2 leading-relaxed text-brand-ink/80">{s.p}</p>
        </section>
      ))}
    </article>
  );
}
