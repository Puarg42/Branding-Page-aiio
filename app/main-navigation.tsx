"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

type HeaderVariant = "home" | "solid";

type MenuLink = {
  href: string;
  label: string;
};

const navItems: MenuLink[] = [
  { href: "/#organizational-intelligence", label: "Vision" },
  { href: "/#capabilities", label: "Platform" },
  { href: "/#category-evolution", label: "Research" },
  { href: "/about-us", label: "Company" },
] as const;

function isExternalLink(href: string) {
  return href.startsWith("http");
}

function SmartLink({
  children,
  className,
  href,
  onClick,
  tabIndex,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
  tabIndex?: number;
}) {
  if (isExternalLink(href)) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        rel="noreferrer"
        tabIndex={tabIndex}
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={onClick} tabIndex={tabIndex}>
      {children}
    </Link>
  );
}

function BrandLink({ className }: { className: string }) {
  return (
    <Link className={className} href="/" aria-label="aiio Startseite">
      <span className="aiio-logo" aria-hidden="true" />
      <span className="sr-only">aiio</span>
    </Link>
  );
}

export function MainHeader({ variant = "home" }: { variant?: HeaderVariant }) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = variant === "solid" || hasScrolled;

  useEffect(() => {
    if (variant === "solid") {
      return;
    }

    function handleScroll() {
      setHasScrolled(window.scrollY > 18);
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

  const headerClass =
    variant === "solid"
      ? `site-header solid is-scrolled${menuOpen ? " is-menu-open" : ""}`
      : `topbar-shell${isScrolled ? " is-scrolled" : ""}${
          menuOpen ? " is-menu-open" : ""
        }`;

  return (
    <header className={headerClass}>
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
            <SmartLink href={item.href} key={item.href}>
              {item.label}
            </SmartLink>
          ))}
        </nav>
        <div className="header-actions" aria-label="Aktionen">
          <a className="nav-action" href="/live-demo/kontakt">
            Request Demo
          </a>
        </div>
      </div>
      <div
        aria-hidden={!menuOpen}
        className="mobile-menu-panel"
        id="mobile-menu"
      >
        <nav aria-label="Mobile Hauptnavigation" className="mobile-menu-nav">
          {navItems.map((item) => (
            <SmartLink
              href={item.href}
              key={item.href}
              onClick={closeMenu}
              tabIndex={menuOpen ? undefined : -1}
            >
              {item.label}
            </SmartLink>
          ))}
        </nav>
        <a
          className="mobile-menu-cta"
          href="/live-demo/kontakt"
          onClick={closeMenu}
          tabIndex={menuOpen ? undefined : -1}
        >
          Request Demo
        </a>
      </div>
    </header>
  );
}
