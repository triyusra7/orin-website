import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const programs = await getTranslations("programs");
  const tw = await getTranslations("whatsapp");

  const programLinks = [
    { label: programs("kids.name"), href: "/programs#kids" },
    { label: programs("examPrep.name"), href: "/programs#exam-prep" },
    { label: programs("speaking.name"), href: "/programs#speaking-booster" },
    { label: programs("business.name"), href: "/programs#business" },
  ];

  const companyLinks = [
    { label: nav("about"), href: "/about" },
    // { label: nav("results"), href: "/results" }, // HIDDEN — hapus komentar untuk tampilkan kembali
    { label: nav("blog"), href: "/blog" },
    { label: nav("consulting"), href: "/consulting" },
  ];

  return (
    <footer className="bg-brand-ink text-brand-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo/orin-logo-reversed.svg"
            alt="Orin Mandarin — 欧林中文"
            width={200}
            height={60}
          />
          <p className="mt-4 max-w-xs text-sm text-brand-cream/80">{t("tagline")}</p>
        </div>

        <nav aria-label={t("programsTitle")}>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-yellow">
            {t("programsTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {programLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-brand-cream/80 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("companyTitle")}>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-yellow">
            {t("companyTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-brand-cream/80 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-yellow">
            {t("contactTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <WhatsAppLink
                prefill={tw("defaultPrefill")}
                source="/footer"
                context="footer"
                className="text-brand-cream/80 transition-colors hover:text-white"
              >
                WhatsApp
              </WhatsAppLink>
            </li>
            <li>
              <a
                href="https://instagram.com/orinmandarin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cream/80 transition-colors hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-brand-cream/80 transition-colors hover:text-white">
                {nav("contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-5 text-center text-xs text-brand-cream/60 sm:flex-row sm:justify-between">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <Link href="/privacy" className="transition-colors hover:text-white">
            {t("legalPrivacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
