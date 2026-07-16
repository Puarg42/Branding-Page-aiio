import { unstable_cache } from "next/cache";
import type { Locale } from "../i18n/config";
import { PUBLICATIONS_TAG } from "./revalidate";

export type PublicationListItem = {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string | null;
  categoryTitle: string | null;
  publishedAt: string | null;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
};

export type PublicationDetail = PublicationListItem & {
  bodyHtml: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: string | null;
};

async function payloadClient() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}

type RawDoc = {
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  readingTime?: string | null;
  category?: number | { title?: string | null } | null;
  publishedAt?: string | null;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  bodyHtml?: string | null;
  updatedAt?: string | null;
  seo?: { title?: string | null; description?: string | null } | null;
};

function categoryTitle(category: RawDoc["category"]): string | null {
  return category && typeof category === "object" ? (category.title ?? null) : null;
}

function toListItem(doc: RawDoc): PublicationListItem {
  return {
    slug: doc.slug ?? "",
    title: doc.title ?? "",
    excerpt: doc.excerpt ?? "",
    readingTime: doc.readingTime ?? null,
    categoryTitle: categoryTitle(doc.category),
    publishedAt: doc.publishedAt ?? null,
    heroImageUrl: doc.heroImageUrl ?? null,
    heroImageAlt: doc.heroImageAlt ?? null,
  };
}

export const getPublications = unstable_cache(
  async (locale: Locale): Promise<PublicationListItem[]> => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "publications",
        locale,
        fallbackLocale: "en",
        where: { _status: { equals: "published" } },
        sort: "-publishedAt",
        depth: 1,
        limit: 200,
      });
      return (result.docs as RawDoc[]).map(toListItem);
    } catch {
      return [];
    }
  },
  ["publications-list"],
  { tags: [PUBLICATIONS_TAG], revalidate: 3600 },
);

export const getPublicationSlugs = unstable_cache(
  async (locale: Locale): Promise<string[]> => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "publications",
        locale,
        fallbackLocale: false,
        where: { _status: { equals: "published" } },
        depth: 0,
        limit: 500,
        select: { slug: true },
      });
      return (result.docs as RawDoc[]).map((d) => d.slug ?? "").filter(Boolean);
    } catch {
      return [];
    }
  },
  ["publication-slugs"],
  { tags: [PUBLICATIONS_TAG], revalidate: 3600 },
);

export const getPublicationBySlug = unstable_cache(
  async (
    slug: string,
    locale: Locale,
    fallbackLocale: Locale | false = "en",
  ): Promise<PublicationDetail | null> => {
    try {
      const payload = await payloadClient();
      const result = await payload.find({
        collection: "publications",
        locale,
        fallbackLocale,
        where: { slug: { equals: slug }, _status: { equals: "published" } },
        depth: 1,
        limit: 1,
      });
      const doc = result.docs[0] as RawDoc | undefined;
      if (!doc) return null;
      return {
        ...toListItem(doc),
        bodyHtml: doc.bodyHtml ?? null,
        seoTitle: doc.seo?.title ?? null,
        seoDescription: doc.seo?.description ?? null,
        updatedAt: doc.updatedAt ?? null,
      };
    } catch {
      return null;
    }
  },
  ["publication-detail"],
  { tags: [PUBLICATIONS_TAG], revalidate: 3600 },
);

export async function getPreviewPublication(
  slug: string,
  locale: Locale,
  requestHeaders: Headers,
): Promise<PublicationDetail | null> {
  try {
    const payload = await payloadClient();
    const { user } = await payload.auth({
      headers: requestHeaders,
      canSetHeaders: false,
    });
    if (!user) return null;
    const result = await payload.find({
      collection: "publications",
      locale,
      fallbackLocale: "en",
      draft: true,
      overrideAccess: true,
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    });
    const doc = result.docs[0] as RawDoc | undefined;
    return doc
      ? {
          ...toListItem(doc),
          bodyHtml: doc.bodyHtml ?? null,
          seoTitle: doc.seo?.title ?? null,
          seoDescription: doc.seo?.description ?? null,
          updatedAt: doc.updatedAt ?? null,
        }
      : null;
  } catch {
    return null;
  }
}
