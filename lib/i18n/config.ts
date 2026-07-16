export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }
  return value;
}

export function localeFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : null;
}

export function withLocale(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const normalized = href.startsWith("/") ? href : `/${href}`;
  const existing = localeFromPath(normalized);
  return existing ? normalized : `/${locale}${normalized === "/" ? "" : normalized}`;
}
