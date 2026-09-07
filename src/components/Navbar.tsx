"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { cn } from "@/lib/utils";

import type { Locale } from "@/i18n/routing";

const NAV_ITEMS = [
  { key: "programs", href: "/programs" },
  { key: "consulting", href: "/consulting" },
  // { key: "results", href: "/results" }, // HIDDEN — hapus komentar untuk tampilkan kembali
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

const LOCALES: { code: Locale; label: string }[] = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const tw = useTranslations("whatsapp");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  const localeToggle = (
    <div
      className="flex items-center gap-1 rounded-full border border-brand-cream bg-brand-cream-soft p-1"
      role="group"
      aria-label={t("languageLabel")}
    >
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95",
            locale === code
              ? "bg-brand-maroon text-white shadow-sm"
              : "text-brand-ink hover:text-brand-maroon hover:bg-white/60",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-brand-cream bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]" onClick={() => setOpen(false)}>
          <Image src="/logo/orin-logo-new.png" alt="" width={100} height={50} priority />
          <span className="font-display text-xl font-extrabold tracking-wide text-brand-maroon">
            Mandarin
          </span>

        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 hover:bg-brand-cream-soft hover:text-brand-maroon active:scale-95",
                pathname.startsWith(item.href)
                  ? "text-brand-maroon bg-brand-cream-soft/50"
                  : "text-brand-ink",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {localeToggle}
          <WhatsAppLink
            prefill={tw("defaultPrefill")}
            source={pathname}
            context="navbar"
            className="btn-hover-glow rounded-full bg-brand-maroon px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-maroon-dark active:scale-95"
          >
            {t("bookCta")}
          </WhatsAppLink>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {localeToggle}
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-maroon transition-all hover:bg-brand-cream-soft hover:scale-105 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-brand-cream bg-white px-4 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 text-base font-semibold transition-all hover:bg-brand-cream-soft hover:translate-x-1 active:scale-[0.99]",
                  pathname.startsWith(item.href)
                    ? "text-brand-maroon"
                    : "text-brand-ink",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
          <WhatsAppLink
            prefill={tw("defaultPrefill")}
            source={pathname}
            context="navbar-mobile"
            className="btn-hover-glow mt-3 block rounded-full bg-brand-maroon px-5 py-3 text-center text-base font-bold text-white shadow-sm"
          >
            {t("bookCta")}
          </WhatsAppLink>
        </div>
      )}
    </header>
  );
}
