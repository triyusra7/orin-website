import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getPost, getPosts, getRelated, formatPostDate } from "@/lib/blog";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { BlogShare } from "@/components/BlogShare";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = (routing.locales.includes(locale as Locale) ? locale : "id") as Locale;
  const post = getPost(loc, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 font-display text-2xl font-extrabold text-brand-maroon"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 font-display text-xl font-bold text-brand-ink" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-brand-ink/85" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-brand-ink/85" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-brand-ink/85" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-semibold text-brand-blue underline" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 rounded-2xl border-l-4 border-brand-yellow bg-brand-cream-soft p-5 font-semibold text-brand-ink"
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="mt-6 overflow-x-auto">
      <table
        className="w-full border-collapse overflow-hidden rounded-xl text-sm [&_td]:border [&_td]:border-brand-cream [&_td]:px-4 [&_td]:py-2 [&_th]:border [&_th]:border-brand-cream [&_th]:bg-brand-cream [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold [&_th]:text-brand-maroon"
        {...props}
      />
    </div>
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = (routing.locales.includes(locale as Locale) ? locale : "id") as Locale;

  const post = getPost(loc, slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const tCommon = await getTranslations("common");
  const tWa = await getTranslations("whatsapp");
  const related = getRelated(loc, slug, post.tags);

  return (
    <article className="bg-white">
      <header className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 lg:py-16">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-maroon px-3 py-1 text-xs font-bold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-brand-maroon lg:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm font-semibold text-brand-ink/60">
            {formatPostDate(post.date, loc)} ·{" "}
            {t("readingTime", { minutes: post.readingMinutes })}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* mdx-content also styles raw HTML tags in MDX (e.g. <table>),
            which MDX does not route through the components map */}
        <div className="mdx-content">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Inline consultation CTA (PRD §5.6, §6.4) */}
        <aside className="mt-12 rounded-3xl bg-brand-yellow p-8">
          <h2 className="font-display text-2xl font-extrabold text-brand-maroon">
            {t("inlineCtaTitle")}
          </h2>
          <p className="mt-2 text-brand-ink/80">{t("inlineCtaDesc")}</p>
          <WhatsAppLink
            prefill={tWa("defaultPrefill")}
            source={`/blog/${slug}`}
            context="blog-cta"
            className="mt-5 inline-block rounded-full bg-brand-maroon px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand-maroon-dark"
          >
            {tCommon("bookConsultation")}
          </WhatsAppLink>
        </aside>

        <div className="mt-10 border-t border-brand-cream pt-6">
          <BlogShare label={t("shareLabel")} title={post.title} slug={slug} />
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-extrabold text-brand-maroon">
              {t("relatedTitle")}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-brand-cream p-5 transition-shadow hover:shadow-md"
                >
                  <p className="text-xs font-semibold text-brand-ink/50">
                    {formatPostDate(r.date, loc)}
                  </p>
                  <h3 className="mt-1 font-display font-bold text-brand-ink transition-colors group-hover:text-brand-maroon">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-10">
          <Link
            href="/blog"
            className="font-semibold text-brand-blue hover:underline"
          >
            ← {t("backToBlog")}
          </Link>
        </p>
      </div>
    </article>
  );
}
