import Link from "next/link";
import type { ReactNode } from "react";

type FooterLink = {
  href: string;
  label: string;
};

const footerNav: FooterLink[] = [
  { href: "/platform", label: "Platform" },
  { href: "/thinking", label: "Thinking" },
  { href: "/success-stories", label: "Business Impact" },
  { href: "/live-demo/kontakt", label: "Get Started" },
  { href: "/partners", label: "Partners" },
  { href: "/academy", label: "Academy" },
  { href: "/company", label: "Company" },
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
