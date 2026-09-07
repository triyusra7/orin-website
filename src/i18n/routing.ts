import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en", "zh"],
  defaultLocale: "id",
  // "/" = Bahasa Indonesia (default), "/en/..." = English, "/zh/..." = Chinese
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
