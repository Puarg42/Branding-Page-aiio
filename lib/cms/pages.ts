import { unstable_cache } from "next/cache";
import type { Locale } from "../i18n/config";
import { throwIfConfigured } from "./errors";
import { PAGES_TAG } from "./revalidate";

async function payloadClient() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}

/** Slugs of published pages, for static generation. Empty if the DB is down. */
export const getPublishedPageSlugs = unstable_cache(
  async (locale: Locale): Promise<string[]> => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "pages",
        locale,
        fallbackLocale: false,
        where: { _status: { equals: "published" } },
        limit: 200,
        depth: 0,
        select: { slug: true },
      });
      return result.docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug));
    } catch (error) {
      throwIfConfigured(error);
      return [];
    }
  },
  ["cms-page-slugs"],
  { tags: [PAGES_TAG], revalidate: 3600 },
);

/** A single published page by slug, or null. Cached and tag-revalidated. */
export const getPageBySlug = unstable_cache(
  async (slug: string, locale: Locale, fallbackLocale: Locale | false = "en") => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "pages",
        locale,
        fallbackLocale,
        where: { slug: { equals: slug }, _status: { equals: "published" } },
        limit: 1,
        depth: 3,
      });
      return result.docs[0] ?? null;
    } catch (error) {
      throwIfConfigured(error);
      return null;
    }
  },
  ["cms-page"],
  { tags: [PAGES_TAG], revalidate: 3600 },
);

export const getPageByType = unstable_cache(
  async (
    pageType: string,
    locale: Locale,
    fallbackLocale: Locale | false = "en",
  ) => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "pages",
        locale,
        fallbackLocale,
        where: {
          pageType: { equals: pageType },
          _status: { equals: "published" },
        },
        limit: 1,
        depth: 3,
      });
      return result.docs[0] ?? null;
    } catch (error) {
      throwIfConfigured(error);
      return null;
    }
  },
  ["cms-page-type"],
  { tags: [PAGES_TAG], revalidate: 3600 },
);

/** Authenticated, uncached draft read for Payload Live Preview. */
export async function getPreviewPage(
  {
    slug,
    pageType,
    locale,
  }: { slug?: string; pageType?: string; locale: Locale },
  requestHeaders: Headers,
) {
  try {
    const payload = await payloadClient();
    const { user } = await payload.auth({
      headers: requestHeaders,
      canSetHeaders: false,
    });
    if (!user) return null;
    const result = await payload.find({
      collection: "pages",
      locale,
      fallbackLocale: "en",
      draft: true,
      overrideAccess: true,
      depth: 3,
      limit: 1,
      where: slug
        ? { slug: { equals: slug } }
        : { pageType: { equals: pageType ?? "home" } },
    });
    return result.docs[0] ?? null;
  } catch (error) {
    throwIfConfigured(error);
    return null;
  }
}
