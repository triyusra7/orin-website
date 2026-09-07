import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";

/**
 * Blog content layer (PRD §5.6, §7): MDX in-repo at content/blog/*.mdx.
 * Filenames follow `<slug>.<locale>.mdx`; the slug is explicit in
 * frontmatter and stable across locales (PRD §4 — pair rule: every slug
 * must exist in both locales so the language toggle never 404s).
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-06-10" */
  date: string;
  /** Optional cover image path under /public */
  cover?: string;
  tags: string[];
  /** Raw MDX body (without frontmatter) */
  content: string;
  readingMinutes: number;
}

/** ~200 words per minute, floored at 1 minute. */
export function estimateReadingMinutes(content: string): number {
  const words = content
    .replace(/^---[\s\S]*?---/, "") // safety: strip frontmatter if present
    .replace(/<[^>]+>/g, " ") // JSX/HTML tags
    .replace(/[#>*`_|-]+/g, " ") // markdown punctuation
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** gray-matter's YAML parser may coerce dates; normalize to ISO string. */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function parsePost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: String(data.slug),
    locale: data.locale as Locale,
    title: String(data.title),
    description: String(data.description),
    date: toIsoDate(data.date),
    cover: typeof data.cover === "string" ? data.cover : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
    readingMinutes: estimateReadingMinutes(content),
  };
}

function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parsePost);

  // Pair rule: warn in dev when a slug is missing one of the locales.
  if (process.env.NODE_ENV !== "production") {
    const bySlug = new Map<string, Set<string>>();
    for (const p of posts) {
      const set = bySlug.get(p.slug) ?? new Set<string>();
      set.add(p.locale);
      bySlug.set(p.slug, set);
    }
    for (const [slug, locales] of bySlug) {
      if (locales.size < 3) {
        console.warn(
          `[blog] Post "${slug}" only exists in locale(s): ${[...locales].join(", ")} — every slug needs id + en + zh.`,
        );
      }
    }
  }
  return posts;
}

/** All posts for a locale, newest first. */
export function getPosts(locale: Locale): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.locale === locale)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(locale: Locale, slug: string): BlogPost | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

/**
 * Related posts: same locale, excluding the current slug, ranked by
 * shared-tag count then recency; padded with recent posts if needed.
 */
export function getRelated(
  locale: Locale,
  slug: string,
  tags: string[],
  n = 2,
): BlogPost[] {
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));
  return getPosts(locale)
    .filter((p) => p.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((t) => tagSet.has(t.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, n)
    .map(({ post }) => post);
}

/** Locale-aware long date, e.g. "10 Juni 2026" / "10 June 2026". */
export function formatPostDate(iso: string, locale: Locale): string {
  const locTag = locale === "id" ? "id-ID" : locale === "zh" ? "zh-CN" : "en-GB";
  return new Intl.DateTimeFormat(locTag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
