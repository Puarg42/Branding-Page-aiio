import { unstable_cache } from "next/cache";
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
  async (): Promise<string[]> => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "pages",
        where: { _status: { equals: "published" } },
        limit: 200,
        depth: 0,
        select: { slug: true },
      });
      return result.docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug));
    } catch {
      return [];
    }
  },
  ["cms-page-slugs"],
  { tags: [PAGES_TAG], revalidate: 3600 },
);

/** A single published page by slug, or null. Cached and tag-revalidated. */
export const getPageBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "pages",
        where: { slug: { equals: slug }, _status: { equals: "published" } },
        limit: 1,
        depth: 1,
      });
      return result.docs[0] ?? null;
    } catch {
      return null;
    }
  },
  ["cms-page"],
  { tags: [PAGES_TAG], revalidate: 3600 },
);
