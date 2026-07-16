import { unstable_cache } from "next/cache";
import type { Locale } from "../i18n/config";
import { PAGES_TAG } from "./revalidate";

export const getTheoryPublication = unstable_cache(
  async (locale: Locale) => {
    try {
      const [{ getPayload }, { default: config }] = await Promise.all([
        import("payload"),
        import("@payload-config"),
      ]);
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "theory-publications",
        locale,
        fallbackLocale: "en",
        where: { _status: { equals: "published" } },
        limit: 1,
        depth: 0,
      });
      return result.docs[0] ?? null;
    } catch {
      return null;
    }
  },
  ["theory-publication"],
  { tags: [PAGES_TAG], revalidate: 3600 },
);
