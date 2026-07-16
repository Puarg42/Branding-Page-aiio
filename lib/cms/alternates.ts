import { unstable_cache } from "next/cache";
import {
  defaultLocale,
  locales,
  type Locale,
} from "../i18n/config";
import { NAV_TAG, PAGES_TAG, PUBLICATIONS_TAG } from "./revalidate";

export type LocaleAlternates = Record<Locale, string>;

async function payloadClient() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}

function defaultAlternates(pathname: string): LocaleAlternates {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "en" || segments[0] === "de") segments.shift();
  const rest = segments.length ? `/${segments.join("/")}` : "";
  return { en: `/en${rest}`, de: `/de${rest}` };
}

export const getLocaleAlternates = unstable_cache(
  async (
    pathname: string,
    currentLocale: Locale = defaultLocale,
  ): Promise<LocaleAlternates> => {
    const fallback = defaultAlternates(pathname);
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === currentLocale) segments.shift();
    if (segments.length === 0) return { en: "/en", de: "/de" };

    try {
      const payload = await payloadClient();
      if (segments[0] === "blog") {
        if (segments.length === 1) return { en: "/en/blog", de: "/de/blog" };
        const current = await payload.find({
          collection: "publications",
          locale: currentLocale,
          fallbackLocale: false,
          where: { slug: { equals: segments.slice(1).join("/") } },
          limit: 1,
          depth: 0,
        });
        const id = current.docs[0]?.id;
        if (!id) return fallback;
        const pairs = await Promise.all(
          locales.map(async (locale) => {
            const doc = await payload.findByID({
              collection: "publications",
              id,
              locale,
              fallbackLocale: false,
              depth: 0,
            });
            return [locale, doc.slug ? `/${locale}/blog/${doc.slug}` : fallback[locale]];
          }),
        );
        return Object.fromEntries(pairs) as LocaleAlternates;
      }

      const slug = segments.join("/");
      const current = await payload.find({
        collection: "pages",
        locale: currentLocale,
        fallbackLocale: false,
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      const id = current.docs[0]?.id;
      if (!id) return fallback;
      const pairs = await Promise.all(
        locales.map(async (locale) => {
          const doc = await payload.findByID({
            collection: "pages",
            id,
            locale,
            fallbackLocale: false,
            depth: 0,
          });
          if (doc.pageType === "home") return [locale, `/${locale}`];
          return [locale, doc.slug ? `/${locale}/${doc.slug}` : fallback[locale]];
        }),
      );
      return Object.fromEntries(pairs) as LocaleAlternates;
    } catch {
      return fallback;
    }
  },
  ["locale-alternates"],
  { tags: [NAV_TAG, PAGES_TAG, PUBLICATIONS_TAG], revalidate: 3600 },
);
