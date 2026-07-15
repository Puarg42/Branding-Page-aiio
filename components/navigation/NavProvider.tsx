"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { NavItem } from "@/lib/cms/navigation";

const HeaderNavContext = createContext<NavItem[] | null>(null);

export function NavProvider({
  header,
  children,
}: {
  header: NavItem[];
  children: ReactNode;
}) {
  return <HeaderNavContext.Provider value={header}>{children}</HeaderNavContext.Provider>;
}

/** Read CMS-driven header nav, falling back to the provided defaults. */
export function useHeaderNav(fallback: NavItem[]): NavItem[] {
  const items = useContext(HeaderNavContext);
  return items && items.length > 0 ? items : fallback;
}
