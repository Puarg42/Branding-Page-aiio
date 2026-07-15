import type { GlobalAfterChangeHook } from "payload";
import { revalidateTag } from "next/cache";

/** Cache tag for site-wide navigation (header + footer). */
export const NAV_TAG = "nav";

/** Global afterChange hook that busts the navigation cache when nav is edited. */
export const revalidateNav: GlobalAfterChangeHook = ({ doc, req }) => {
  // Only meaningful inside the Next.js runtime (admin request). Skip during
  // CLI seeding/migrations where there is no request cache to revalidate.
  if (!process.env.NEXT_RUNTIME) {
    return doc;
  }
  try {
    revalidateTag(NAV_TAG, "max");
    req.payload.logger.info("Revalidated navigation cache.");
  } catch (error) {
    req.payload.logger.warn(`revalidateNav skipped: ${(error as Error).message}`);
  }
  return doc;
};
