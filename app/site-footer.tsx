import Link from "next/link";
import type { ReactNode } from "react";
import { getEditableContent } from "./editor/content";

type FooterLink = {
  href: string;
  label: string;
};

const primaryLinks: FooterLink[] = [
  { href: "/about-us", label: "Über uns" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/pricing", label: "Preise" },
  { href: "/#architektur", label: "Plattform" },
  { href: "/blog", label: "Blog & News" },
  { href: "/release-notes", label: "Release Notes" },
];

const secondaryLinks: FooterLink[] = [
  { href: "/downloadcenter", label: "Downloadcenter" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/impressum", label: "Impressum" },
  { href: "/support", label: "Support" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/presse", label: "Presse" },
  { href: "/facts", label: "Facts" },
];

const socialLinks: FooterLink[] = [
  { href: "https://de-de.facebook.com/aiio.official/", label: "Facebook" },
  { href: "https://www.instagram.com/aiio_official/", label: "Instagram" },
  { href: "https://x.com/aiio_gmbh", label: "X" },
  { href: "https://www.linkedin.com/company/aiio-gmbh/", label: "LinkedIn" },
  {
    href: "https://www.youtube.com/channel/UC3U8d_ByXWqbKR5xnHQHilg",
    label: "YouTube",
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

function SmartLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  if (isExternalLink(href)) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

function FooterLinkList({
  ariaLabel,
  links,
}: {
  ariaLabel: string;
  links: FooterLink[];
}) {
  return (
    <nav aria-label={ariaLabel} className="footer-link-row">
      {links.map((link) => (
        <SmartLink href={link.href} key={link.href}>
          {link.label}
        </SmartLink>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <section className="footer-cta" aria-label="Footer Aktion">
          <div>
            <h2>
              {getEditableContent(
                "footer.cta.title",
                "The future belongs to organizations that understand themselves.",
              )}
            </h2>
            <p>
              {getEditableContent(
                "footer.cta.copy",
                "aiio defines Organizational Intelligence for organizations ready to understand, adapt and enable themselves.",
              )}
            </p>
          </div>
          <div className="footer-actions">
            <a
              className="button footer-button"
              href="/live-demo/kontakt"
            >
              See it in action
            </a>
            <Link
              className="button footer-button secondary"
              href="/#organizational-intelligence"
            >
              Explore OIS
            </Link>
          </div>
        </section>

        <div className="footer-links">
          <FooterLinkList ariaLabel="Footer Hauptlinks" links={primaryLinks} />
          <FooterLinkList ariaLabel="Footer Servicelinks" links={secondaryLinks} />
        </div>

        <div className="footer-brand-row">
          <Link className="footer-logo-link" href="/" aria-label="aiio Startseite">
            <span className="footer-aiio-logo" aria-hidden="true" />
            <span className="sr-only">aiio</span>
          </Link>
          <div className="footer-membership">
            <span>aiio ist Mitglied im</span>
            <span
              aria-label="KI Verband Niedersachsen"
              className="footer-member-logo"
              role="img"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 aiio GmbH. Alle Rechte vorbehalten.</p>
          <nav aria-label="Social Media" className="social-links">
            {socialLinks.map((link) => (
              <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
