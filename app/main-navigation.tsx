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
  { href: "/#why-now", label: "Research" },
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
}: {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
}) {
  if (isExternalLink(href)) {
    return (
      <a className={className} href={href} onClick={onClick} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={onClick}>
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

  const headerClass =
    variant === "solid"
      ? "site-header solid is-scrolled"
      : `topbar-shell${isScrolled ? " is-scrolled" : ""}`;

  return (
    <header className={headerClass}>
      <div className={variant === "solid" ? "site-header-inner" : "topbar"}>
        <BrandLink className={variant === "solid" ? "brand-mark" : "brand"} />
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
    </header>
  );
}
