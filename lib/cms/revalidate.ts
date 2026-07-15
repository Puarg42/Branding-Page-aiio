import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import { revalidateTag } from "next/cache";

/** Cache tag for site-wide navigation (header + footer). */
export const NAV_TAG = "nav";
/** Cache tag for block-composed CMS pages. */
export const PAGES_TAG = "pages";

function bust(tag: string) {
  if (!process.env.NEXT_RUNTIME) return;
  try {
    revalidateTag(tag, "max");
  } catch {
    // Not in a request context (CLI seed/migrate) — nothing to revalidate.
  }
}

/** Global afterChange hook that busts the navigation cache when nav is edited. */
export const revalidateNav: GlobalAfterChangeHook = ({ doc }) => {
  bust(NAV_TAG);
  return doc;
};

export const revalidatePagesChange: CollectionAfterChangeHook = ({ doc }) => {
  bust(PAGES_TAG);
  return doc;
};

export const revalidatePagesDelete: CollectionAfterDeleteHook = ({ doc }) => {
  bust(PAGES_TAG);
  return doc;
};
