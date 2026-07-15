"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { SmartLink } from "@/components/navigation/SmartLink";
import { useHeaderNav } from "@/components/navigation/NavProvider";

type HeaderVariant = "home" | "solid";

type MenuLink = {
  href: string;
  label: string;
};

// Fallback used when the CMS-driven nav (NavProvider) is unavailable.
const defaultNavItems: MenuLink[] = [
  { href: "/", label: "Home" },
  { href: "/platform", label: "Platform" },
  { href: "/success-stories", label: "Business Impact" },
  { href: "/thinking", label: "Thinking" },
  { href: "/partners", label: "Partners" },
  { href: "/company", label: "Company" },
  { href: "/live-demo/kontakt", label: "Get Started" },
];

function BrandLink({ className }: { className: string }) {
  return (
    <Link className={className} href="/" aria-label="aiio Startseite">
      <span className="aiio-logo" aria-hidden="true" />
      <span className="sr-only">aiio</span>
    </Link>
  );
}

export function MainHeader({ variant = "home" }: { variant?: HeaderVariant }) {
  const pathname = usePathname();
  const navItems = useHeaderNav(defaultNavItems);
  const [scrollProgress, setScrollProgress] = useState(variant === "solid" ? 1 : 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = variant === "solid" || scrollProgress > 0;

  useEffect(() => {
    if (variant === "solid") {
      // Initial state is already 1 for the solid variant; variant is fixed per
      // route, so no state update is needed here.
      return;
    }

    function handleScroll() {
      const transitionStart = 80;
      const transitionEnd = 180;
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - transitionStart) / (transitionEnd - transitionStart)),
      );

      setScrollProgress(progress);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [variant]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActiveHref(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const headerClass =
    variant === "solid"
      ? `site-header solid is-scrolled${menuOpen ? " is-menu-open" : ""}`
      : `topbar-shell${isScrolled ? " is-scrolled" : ""}${
          menuOpen ? " is-menu-open" : ""
        }`;
  const headerStyle = {
    "--header-progress": variant === "solid" ? 1 : scrollProgress,
  } as CSSProperties;

  return (
    <header className={headerClass} style={headerStyle}>
      <div className={variant === "solid" ? "site-header-inner" : "topbar"}>
        <BrandLink className={variant === "solid" ? "brand-mark" : "brand"} />
        <button
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav aria-label="Hauptnavigation" className="main-nav">
          {navItems.map((item) => (
            <SmartLink
              className={isActiveHref(item.href) ? "is-active" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </SmartLink>
          ))}
        </nav>
      </div>
      <div
        aria-hidden={!menuOpen}
        className="mobile-menu-panel"
        id="mobile-menu"
      >
        <nav aria-label="Mobile Hauptnavigation" className="mobile-menu-nav">
          {navItems.map((item) => (
            <SmartLink
              className={isActiveHref(item.href) ? "is-active" : undefined}
              href={item.href}
              key={item.href}
              onClick={closeMenu}
              tabIndex={menuOpen ? undefined : -1}
            >
              {item.label}
            </SmartLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
