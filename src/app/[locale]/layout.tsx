import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Poppins, Plus_Jakarta_Sans, Noto_Sans_SC } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Analytics } from "@/components/Analytics";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { PageTransition } from "@/components/PageTransition";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://orinmandarin.com";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const notoSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["400", "700"],
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("siteTitle"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("siteDescription"),
    icons: { icon: "/logo/orin-roundel.svg" },
    alternates: {
      canonical: locale === "id" ? "/" : `/${locale}`,
      languages: { id: "/", en: "/en", zh: "/zh", "x-default": "/" },
    },
    openGraph: {
      siteName: t("siteName"),
      locale: locale === "id" ? "id_ID" : locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
  };
}

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Orin Mandarin Learning Center",
  alternateName: "欧林中文",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/orin-roundel.svg`,
  slogan: "From first character to acceptance letter",
  areaServed: "Indonesia",
  sameAs: ["https://instagram.com/orinmandarin"],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${jakarta.variable} ${notoSC.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans text-brand-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <NextIntlClientProvider>
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
