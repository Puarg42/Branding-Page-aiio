import { unstable_cache } from "next/cache";
import type { Locale } from "../i18n/config";
import { NAV_TAG, PUBLICATIONS_TAG } from "./revalidate";

async function payloadClient() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}

export const getSiteSettings = unstable_cache(
  async (locale: Locale) => {
    try {
      const payload = await payloadClient();
      return await payload.findGlobal({
        slug: "site-settings",
        locale,
        fallbackLocale: "en",
        depth: 1,
      });
    } catch {
      return null;
    }
  },
  ["site-settings"],
  { tags: [NAV_TAG], revalidate: 3600 },
);

export const getBlogSettings = unstable_cache(
  async (locale: Locale) => {
    try {
      const payload = await payloadClient();
      return await payload.findGlobal({
        slug: "blog-settings",
        locale,
        fallbackLocale: "en",
      });
    } catch {
      return null;
    }
  },
  ["blog-settings"],
  { tags: [PUBLICATIONS_TAG], revalidate: 3600 },
);
