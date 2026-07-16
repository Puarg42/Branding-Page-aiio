import { unstable_cache } from "next/cache";
import type { Locale } from "../i18n/config";
import { withLocale } from "../i18n/config";
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

export const DEFAULT_HEADER_NAV_DE: NavItem[] = [
  { href: "/", label: "Start" },
  { href: "/plattform", label: "Plattform" },
  { href: "/erfolgsgeschichten", label: "Wirkung" },
  { href: "/denken", label: "Denken" },
  { href: "/partner", label: "Partner" },
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/gespraech", label: "Gespräch starten" },
];

export const DEFAULT_FOOTER_NAV_DE: NavItem[] = [
  ...DEFAULT_HEADER_NAV_DE.slice(1),
  { href: "/akademie", label: "Akademie" },
];

export const DEFAULT_FOOTER_LEGAL_DE: NavItem[] = [
  { href: "/blog", label: "Blog & News" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/impressum", label: "Impressum" },
];

type LinkReference = {
  relationTo?: "pages" | "publications";
  value?: { slug?: string | null } | number | null;
};

type CmsLink = {
  type?: "internal" | "external";
  label?: string;
  reference?: LinkReference | null;
  url?: string | null;
};

function linkHref(link: CmsLink | undefined, locale: Locale): string | null {
  if (!link) return null;
  if (link.type === "external" && link.url) return link.url;
  const value = link.reference?.value;
  if (value && typeof value === "object" && value.slug) {
    const prefix = link.reference?.relationTo === "publications" ? "/blog/" : "/";
    return withLocale(locale, `${prefix}${value.slug}`);
  }
  return null;
}

function toItems(value: unknown, fallback: NavItem[], locale: Locale): NavItem[] {
  const localizedFallback = fallback.map((item) => ({
    ...item,
    href: withLocale(locale, item.href),
  }));
  if (!Array.isArray(value)) return localizedFallback;
  const items = value
    .map((entry) => {
      const record = entry as { label?: unknown; href?: unknown; link?: CmsLink };
      const label =
        typeof record.link?.label === "string"
          ? record.link.label
          : typeof record.label === "string"
            ? record.label
            : null;
      const resolved = linkHref(record.link, locale);
      const href =
        resolved ??
        (typeof record.href === "string" ? withLocale(locale, record.href) : null);
      return label && href ? { label, href } : null;
    })
    .filter((item): item is NavItem => item !== null);
  return items.length > 0 ? items : localizedFallback;
}

/**
 * Cached navigation read. Uses unstable_cache so static pages stay static; the
 * cache is busted by the Header/Footer afterChange hooks (tag: NAV_TAG).
 * Payload is imported lazily so this module is safe to import anywhere.
 */
export const getNavigation = unstable_cache(
  async (locale: Locale) => {
    try {
      const [{ getPayload }, { default: config }] = await Promise.all([
        import("payload"),
        import("@payload-config"),
      ]);
      const payload = await getPayload({ config });
      const [header, footer] = await Promise.all([
        payload.findGlobal({ slug: "header", locale, fallbackLocale: "en", depth: 2 }),
        payload.findGlobal({ slug: "footer", locale, fallbackLocale: "en", depth: 2 }),
      ]);
      const defaults =
        locale === "de"
          ? {
              header: DEFAULT_HEADER_NAV_DE,
              footer: DEFAULT_FOOTER_NAV_DE,
              legal: DEFAULT_FOOTER_LEGAL_DE,
            }
          : {
              header: DEFAULT_HEADER_NAV,
              footer: DEFAULT_FOOTER_NAV,
              legal: DEFAULT_FOOTER_LEGAL,
            };
      return {
        header: toItems(header?.navItems, defaults.header, locale),
        footerNav: toItems(footer?.navItems, defaults.footer, locale),
        footerLegal: toItems(footer?.legalItems, defaults.legal, locale),
      };
    } catch {
      const defaults =
        locale === "de"
          ? {
              header: DEFAULT_HEADER_NAV_DE,
              footer: DEFAULT_FOOTER_NAV_DE,
              legal: DEFAULT_FOOTER_LEGAL_DE,
            }
          : {
              header: DEFAULT_HEADER_NAV,
              footer: DEFAULT_FOOTER_NAV,
              legal: DEFAULT_FOOTER_LEGAL,
            };
      return {
        header: defaults.header.map((item) => ({
          ...item,
          href: withLocale(locale, item.href),
        })),
        footerNav: defaults.footer.map((item) => ({
          ...item,
          href: withLocale(locale, item.href),
        })),
        footerLegal: defaults.legal.map((item) => ({
          ...item,
          href: withLocale(locale, item.href),
        })),
      };
    }
  },
  ["site-navigation"],
  { tags: [NAV_TAG], revalidate: 3600 },
);
