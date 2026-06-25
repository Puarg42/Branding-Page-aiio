"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getEditableContent } from "./editor/content";

type HeaderVariant = "home" | "solid";

type MenuLink = {
  description?: string;
  href: string;
  label: string;
};

const aboutNavItem: MenuLink = {
  href: "/about-us",
  label: getEditableContent("navigation.about", "Über uns"),
};
const systemNavItem: MenuLink = {
  href: "/#architektur",
  label: getEditableContent("navigation.system", "System"),
};

const resourceGroups = [
  {
    title: "Why choose aiio?",
    items: [
      {
        href: "/academy",
        label: "aiio Academy",
        description:
          "Lerne unsere Plattform in kurzen Video-Tutorials näher kennen.",
      },
      {
        href: "/click-demos",
        label: "Interactive Demos",
        description:
          "Entdecke in wenigen Minuten, wie aiio deine Probleme löst!",
      },
      {
        href: "/success-stories",
        label: "Success Stories",
        description:
          "So haben andere Unternehmen mit aiio einfach Wert geschaffen!",
      },
      {
        href: "/dokumentation",
        label: "Dokumentation",
        description:
          "Alles Wissenswerte über OIS - Das Organizational Intelligence System und seine Handhabung.",
      },
      {
        href: "/platform/product-news",
        label: "Feature Newsletter",
        description:
          "Die neusten Features für Prozess-Champions - in deinem Postfach!",
      },
    ],
  },
  {
    title: "Hilfe, News & Weiteres",
    items: [
      {
        href: "/partner-finden",
        label: "Partner",
        description: "Du benötigst menschliche Unterstützung? Hier findest du sie!",
      },
      {
        href: "/blog",
        label: "Blog & News",
        description:
          "Alles Neue rund um aiio und aus der Welt von KI für Unternehmen.",
      },
      {
        href: "/services",
        label: "Services",
        description: "Schulungen, Workshops und mehr: Wir helfen dir weiter!",
      },
      {
        href: "/downloadcenter",
        label: "Downloads",
        description:
          "Die wichtigsten Dokumente rund um aiio zum Download für dich.",
      },
      {
        href: "/support",
        label: "Support",
        description: "Probleme oder Wünsche? Tritt mit uns in Kontakt!",
      },
    ],
  },
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

function ResourcesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={isOpen ? "resources-menu is-open" : "resources-menu"} ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="resources-trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {getEditableContent("navigation.resources", "Ressource")}
      </button>
      <div className="resources-panel" hidden={!isOpen} role="menu">
        {resourceGroups.map((group) => (
          <div className="resources-group" key={group.title}>
            <p>{group.title}</p>
            {group.items.map((item) => (
              <SmartLink
                className="resources-link"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </SmartLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MainHeader({ variant = "home" }: { variant?: HeaderVariant }) {
  return (
    <header className={variant === "solid" ? "site-header solid" : "topbar-shell"}>
      <div className={variant === "solid" ? "site-header-inner" : "topbar"}>
        <BrandLink className={variant === "solid" ? "brand-mark" : "brand"} />
        <nav aria-label="Hauptnavigation" className="main-nav">
          <SmartLink href={systemNavItem.href}>{systemNavItem.label}</SmartLink>
          <ResourcesMenu />
          <SmartLink href={aboutNavItem.href}>{aboutNavItem.label}</SmartLink>
        </nav>
        <div className="header-actions" aria-label="Aktionen">
          <a className="nav-action" href="/live-demo/kontakt">
            {getEditableContent("navigation.demo", "Jetzt Expertengespräch vereinbaren")}
          </a>
          <a className="nav-action primary" href="/kostenlose-testversion/anmelden">
            {getEditableContent("navigation.trial", "14 Tage kostenlos testen")}
          </a>
        </div>
      </div>
    </header>
  );
}
