"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LocaleAlternates } from "@/lib/cms/alternates";
import type { NavItem } from "@/lib/cms/navigation";
import type { Locale } from "@/lib/i18n/config";

type NavContextValue = {
  header: NavItem[];
  locale: Locale;
  alternates: LocaleAlternates;
};

const HeaderNavContext = createContext<NavContextValue | null>(null);

export function NavProvider({
  header,
  locale,
  alternates,
  children,
}: {
  header: NavItem[];
  locale: Locale;
  alternates: LocaleAlternates;
  children: ReactNode;
}) {
  return (
    <HeaderNavContext.Provider value={{ header, locale, alternates }}>
      {children}
    </HeaderNavContext.Provider>
  );
}

/** Read CMS-driven header nav, falling back to the provided defaults. */
export function useHeaderNav(fallback: NavItem[]): NavItem[] {
  const items = useContext(HeaderNavContext);
  return items?.header?.length ? items.header : fallback;
}

export function useLocaleNav(): Omit<NavContextValue, "header"> | null {
  const value = useContext(HeaderNavContext);
  return value
    ? { locale: value.locale, alternates: value.alternates }
    : null;
}
