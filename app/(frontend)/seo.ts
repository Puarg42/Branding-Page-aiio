import type { Metadata } from "next";
import { resourcePages, type ResourceSlug } from "./resource-pages";

type CreateMetadataOptions = {
  /** Route-relative canonical path, e.g. "/platform". */
  path: string;
  title: string;
  description?: string;
  /** Set false for pages that should not advertise a canonical (rare). */
  canonical?: boolean;
};

/**
 * Build page metadata with an explicit, route-specific canonical URL.
 *
 * The root layout intentionally does NOT set a canonical, so every route is
 * responsible for its own. This prevents unrelated routes from inheriting a
 * site-wide `/` canonical (the previous bug).
 */
export function createMetadata({
  path,
  title,
  description,
  canonical = true,
}: CreateMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: canonical ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
    },
    twitter: {
      title,
      description,
    },
  };
}

/**
 * Metadata for a route backed by the resource-page factory. Title and intro copy
 * come from the single source of truth in `resourcePages`.
 */
export function resourceRouteMetadata(slug: ResourceSlug, path: string): Metadata {
  const page = resourcePages[slug];

  return createMetadata({
    path,
    title: `${page.title} | aiio`,
    description: page.intro,
  });
}
