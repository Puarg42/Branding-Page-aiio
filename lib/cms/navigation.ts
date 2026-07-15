import { unstable_cache } from "next/cache";
import { NAV_TAG } from "./revalidate";

export type NavItem = { label: string; href: string };

/** Fallbacks keep the site rendering if the CMS/DB is unavailable. */
export const DEFAULT_HEADER_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/success-stories", label: "Business Impact" },
  { href: "/thinking", label: "Thinking" },
  { href: "/partners", label: "Partners" },
  { href: "/company", label: "Company" },
  { href: "/live-demo/kontakt", label: "Get Started" },
];

export const DEFAULT_FOOTER_NAV: NavItem[] = [
  { href: "/platform", label: "Platform" },
  { href: "/success-stories", label: "Business Impact" },
  { href: "/thinking", label: "Thinking" },
  { href: "/live-demo/kontakt", label: "Get Started" },
  { href: "/partners", label: "Partners" },
  { href: "/academy", label: "Academy" },
  { href: "/company", label: "Company" },
];

export const DEFAULT_FOOTER_LEGAL: NavItem[] = [
  { href: "/blog", label: "Blog & News" },
  { href: "/datenschutz", label: "Privacy" },
  { href: "/impressum", label: "Legal" },
];

function toItems(value: unknown, fallback: NavItem[]): NavItem[] {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .map((entry) => {
      const record = entry as { label?: unknown; href?: unknown };
      return typeof record.label === "string" && typeof record.href === "string"
        ? { label: record.label, href: record.href }
        : null;
    })
    .filter((item): item is NavItem => item !== null);
  return items.length > 0 ? items : fallback;
}

/**
 * Cached navigation read. Uses unstable_cache so static pages stay static; the
 * cache is busted by the Header/Footer afterChange hooks (tag: NAV_TAG).
 * Payload is imported lazily so this module is safe to import anywhere.
 */
export const getNavigation = unstable_cache(
  async () => {
    try {
      const [{ getPayload }, { default: config }] = await Promise.all([
        import("payload"),
        import("@payload-config"),
      ]);
      const payload = await getPayload({ config });
      const [header, footer] = await Promise.all([
        payload.findGlobal({ slug: "header" }),
        payload.findGlobal({ slug: "footer" }),
      ]);
      return {
        header: toItems(header?.navItems, DEFAULT_HEADER_NAV),
        footerNav: toItems(footer?.navItems, DEFAULT_FOOTER_NAV),
        footerLegal: toItems(footer?.legalItems, DEFAULT_FOOTER_LEGAL),
      };
    } catch {
      return {
        header: DEFAULT_HEADER_NAV,
        footerNav: DEFAULT_FOOTER_NAV,
        footerLegal: DEFAULT_FOOTER_LEGAL,
      };
    }
  },
  ["site-navigation"],
  { tags: [NAV_TAG], revalidate: 3600 },
);
