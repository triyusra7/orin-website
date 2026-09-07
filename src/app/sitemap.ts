import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://orinmandarin.com";

/** "/" for id (default, unprefixed), "/en/..." for en (PRD §7 hreflang). */
function localeUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}` || SITE_URL;
}

const STATIC_PATHS = [
  "",
  "/programs",
  "/consulting",
  // "/results", // HIDDEN — hapus komentar untuk tampilkan kembali
  "/about",
  "/blog",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: localeUrl(locale, path),
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localeUrl(l, path)]),
          ),
        },
      });
    }
  }

  for (const locale of routing.locales) {
    for (const post of getPosts(locale)) {
      entries.push({
        url: localeUrl(locale, `/blog/${post.slug}`),
        lastModified: post.date,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localeUrl(l, `/blog/${post.slug}`)]),
          ),
        },
      });
    }
  }

  return entries;
}
