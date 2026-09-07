import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPosts, formatPostDate } from "@/lib/blog";
import { ScrollReveal } from "@/components/ScrollReveal";

const COVER_COLORS = [
  "bg-brand-yellow text-brand-maroon",
  "bg-brand-blue text-white",
  "bg-brand-maroon text-brand-cream",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc: Locale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const t = await getTranslations("blog");
  const posts = getPosts(loc);

  return (
    <>
      <section
        aria-labelledby="blog-hero-title"
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
              id="blog-hero-title"
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

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
          {posts.length === 0 ? (
            <p className="rounded-2xl bg-brand-cream-soft p-8 text-center text-brand-ink/70">
              {t("emptyState")}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <ScrollReveal key={post.slug} variant="fade-up" delay={i * 100}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-hover-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-cream bg-white shadow-sm transition-all"
                  >
                    <div
                      className={`flex h-40 items-center justify-center ${COVER_COLORS[i % COVER_COLORS.length]}`}
                    >
                      <span className="px-6 text-center font-display text-2xl font-extrabold transition-transform duration-300 group-hover:scale-105">
                        {post.tags[0] ?? "Orin"}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <p className="text-xs font-semibold text-brand-ink/50">
                        {formatPostDate(post.date, loc)} ·{" "}
                        {t("readingTime", { minutes: post.readingMinutes })}
                      </p>
                      <h2 className="font-display text-xl font-bold text-brand-ink transition-colors group-hover:text-brand-maroon">
                        {post.title}
                      </h2>
                      <p className="line-clamp-3 text-sm text-brand-ink/70">
                        {post.description}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-brand-maroon px-3 py-1 text-xs font-bold text-white shadow-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
