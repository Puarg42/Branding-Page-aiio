import { unstable_cache } from "next/cache";
import type { Locale } from "../i18n/config";
import { PAGES_TAG } from "./revalidate";

export type SuccessStoryItem = {
  id: number;
  customer: string;
  industry: string | null;
  challenge: string;
  action: string;
  result: string;
  proofPoints: Array<{
    metric?: string | null;
    label?: string | null;
    source?: string | null;
  }>;
  logo: number | { url?: string | null; alt?: string | null } | null;
};

export const getSuccessStories = unstable_cache(
  async (locale: Locale): Promise<SuccessStoryItem[]> => {
    try {
      const [{ getPayload }, { default: config }] = await Promise.all([
        import("payload"),
        import("@payload-config"),
      ]);
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "success-stories",
        locale,
        fallbackLocale: "en",
        where: { _status: { equals: "published" } },
        limit: 100,
      });
      return result.docs.map((doc) => ({
        id: doc.id,
        customer: doc.customer,
        industry: doc.industry ?? null,
        challenge: doc.challenge ?? "",
        action: doc.action ?? "",
        result: doc.result ?? "",
        proofPoints: doc.proofPoints ?? [],
        logo: doc.logo ?? null,
      }));
    } catch {
      return [];
    }
  },
  ["success-stories"],
  { tags: [PAGES_TAG], revalidate: 3600 },
);
