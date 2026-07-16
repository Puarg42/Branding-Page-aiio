import type { MetadataRoute } from "next";
import { getLocalizedSitemapEntries } from "@/lib/cms/sitemap";
import { siteUrl } from "./site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getLocalizedSitemapEntries();
  return entries.map((entry) => {
    const otherLocale = entry.locale === "en" ? "de" : "en";
    return {
      changeFrequency: "monthly",
      lastModified: entry.lastModified
        ? new Date(entry.lastModified)
        : new Date(),
      priority: entry.path === "/en" || entry.path === "/de" ? 1 : 0.7,
      url: `${siteUrl}${entry.path}`,
      alternates: {
        languages: {
          [entry.locale]: `${siteUrl}${entry.path}`,
          ...(entry.alternate
            ? {
                [otherLocale]: `${siteUrl}${entry.alternate}`,
                "x-default": `${siteUrl}${
                  entry.locale === "en" ? entry.path : entry.alternate
                }`,
              }
            : {}),
        },
      },
    };
  });
}
