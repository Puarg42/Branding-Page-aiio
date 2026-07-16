import { unstable_cache } from "next/cache";
import { locales, type Locale } from "../i18n/config";
import { PAGES_TAG, PUBLICATIONS_TAG } from "./revalidate";

export type LocalizedSitemapEntry = {
  path: string;
  locale: Locale;
  alternate?: string;
  lastModified?: string;
};

export const getLocalizedSitemapEntries = unstable_cache(
  async (): Promise<LocalizedSitemapEntry[]> => {
    try {
      const [{ getPayload }, { default: config }] = await Promise.all([
        import("payload"),
        import("@payload-config"),
      ]);
      const payload = await getPayload({ config });
      const pageByID = new Map<number, Partial<Record<Locale, string>>>();
      const publicationByID = new Map<number, Partial<Record<Locale, string>>>();

      for (const locale of locales) {
        const [pages, publications] = await Promise.all([
          payload.find({
            collection: "pages",
            locale,
            fallbackLocale: false,
            where: { _status: { equals: "published" } },
            limit: 500,
            depth: 0,
            select: { slug: true, pageType: true },
          }),
          payload.find({
            collection: "publications",
            locale,
            fallbackLocale: false,
            where: { _status: { equals: "published" } },
            limit: 1000,
            depth: 0,
            select: { slug: true, updatedAt: true },
          }),
        ]);
        for (const page of pages.docs) {
          if (!page.slug && page.pageType !== "home") continue;
          const path = page.pageType === "home" ? `/${locale}` : `/${locale}/${page.slug}`;
          pageByID.set(page.id, { ...pageByID.get(page.id), [locale]: path });
        }
        for (const publication of publications.docs) {
          if (!publication.slug) continue;
          publicationByID.set(publication.id, {
            ...publicationByID.get(publication.id),
            [locale]: `/${locale}/blog/${publication.slug}`,
          });
        }
      }

      const entries: LocalizedSitemapEntry[] = [];
      for (const localized of [...pageByID.values(), ...publicationByID.values()]) {
        for (const locale of locales) {
          const path = localized[locale];
          if (!path) continue;
          entries.push({
            path,
            locale,
            alternate: localized[locale === "en" ? "de" : "en"],
          });
        }
      }
      entries.push({ path: "/en/blog", locale: "en", alternate: "/de/blog" });
      entries.push({ path: "/de/blog", locale: "de", alternate: "/en/blog" });
      return entries;
    } catch {
      return [
        { path: "/en", locale: "en", alternate: "/de" },
        { path: "/de", locale: "de", alternate: "/en" },
      ];
    }
  },
  ["localized-sitemap"],
  { tags: [PAGES_TAG, PUBLICATIONS_TAG], revalidate: 3600 },
);
