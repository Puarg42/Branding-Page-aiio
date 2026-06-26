import Link from "next/link";
import type { ReactNode } from "react";

type FooterLink = {
  href: string;
  label: string;
};

const footerNav: FooterLink[] = [
  { href: "/#organizational-intelligence", label: "Vision" },
  { href: "/#capabilities", label: "Platform" },
  { href: "/#category-evolution", label: "Research" },
  { href: "/about-us", label: "Company" },
];

const legalLinks: FooterLink[] = [
  { href: "/datenschutz", label: "Privacy" },
  { href: "/impressum", label: "Legal" },
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

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-closing" aria-label="Closing statement">
        <div className="footer-particles" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="footer-closing-inner">
          <h2>
            Every organization has knowledge.
            <br />
            Few organizations truly understand themselves.
            <br />
            The future belongs to those who do.
          </h2>
          <div className="footer-closing-actions" aria-label="Footer actions">
            <Link className="footer-final-button primary" href="/live-demo/kontakt">
              Request a Demo
            </Link>
            <Link className="footer-final-button" href="/#capabilities">
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      <div className="site-footer-inner">
        <div className="footer-minimal-bar">
          <Link className="footer-logo-link" href="/" aria-label="aiio Startseite">
            <span className="footer-aiio-logo" aria-hidden="true" />
            <span className="sr-only">aiio</span>
          </Link>

          <nav aria-label="Footer navigation" className="footer-link-row">
            {footerNav.map((link) => (
              <SmartLink href={link.href} key={link.href}>
                {link.label}
              </SmartLink>
            ))}
          </nav>

          <nav aria-label="Footer legal links" className="footer-legal-row">
            <a
              href="https://www.linkedin.com/company/aiio-gmbh/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            {legalLinks.map((link) => (
              <SmartLink href={link.href} key={link.href}>
                {link.label}
              </SmartLink>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2026 aiio GmbH</p>
        </div>
      </div>
    </footer>
  );
}
