import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-extrabold text-brand-maroon">
        {t("title")}
      </h1>
      <p className="max-w-md text-brand-ink/70">{t("desc")}</p>
      <Link
        href="/"
        className="rounded-full bg-brand-maroon px-6 py-3 font-bold text-white hover:bg-brand-maroon-dark"
      >
        {t("backHome")}
      </Link>
    </section>
  );
}
