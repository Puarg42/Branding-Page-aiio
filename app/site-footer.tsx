import Link from "next/link";
import type { ReactNode } from "react";

type FooterLink = {
  href: string;
  label: string;
};

type SocialLink = FooterLink & {
  platform: "facebook" | "instagram" | "x" | "linkedin" | "youtube";
};

const footerNav: FooterLink[] = [
  { href: "/platform", label: "Platform" },
  { href: "/success-stories", label: "Business Impact" },
  { href: "/thinking", label: "Thinking" },
  { href: "/live-demo/kontakt", label: "Get Started" },
  { href: "/partners", label: "Partners" },
  { href: "/academy", label: "Academy" },
  { href: "/company", label: "Company" },
];

const legalLinks: FooterLink[] = [
  { href: "/blog", label: "Blog & News" },
  { href: "/datenschutz", label: "Privacy" },
  { href: "/impressum", label: "Legal" },
];

const socialLinks: SocialLink[] = [
  {
    href: "https://de-de.facebook.com/aiio.official/",
    label: "Follow aiio on Facebook",
    platform: "facebook",
  },
  {
    href: "https://www.instagram.com/aiio_official/",
    label: "Follow aiio on Instagram",
    platform: "instagram",
  },
  {
    href: "https://x.com/aiio_gmbh",
    label: "Follow aiio on X",
    platform: "x",
  },
  {
    href: "https://www.linkedin.com/company/aiio-gmbh/",
    label: "Follow aiio on LinkedIn",
    platform: "linkedin",
  },
  {
    href: "https://www.youtube.com/channel/UC3U8d_ByXWqbKR5xnHQHilg",
    label: "Follow aiio on YouTube",
    platform: "youtube",
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

function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  const commonProps = {
    "aria-hidden": true,
    className: "footer-social-icon",
    fill: "currentColor",
    focusable: false,
    viewBox: "0 0 24 24",
  } as const;

  switch (platform) {
    case "facebook":
      return (
        <svg {...commonProps}>
          <path d="M15.12 8.04h-2.02c-.34 0-.72.45-.72 1.05v1.46h2.74l-.41 2.34h-2.33v7.02H9.72v-7.02H7.44v-2.34h2.28V8.78c0-1.98 1.37-3.59 3.33-3.59h2.07v2.85Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...commonProps}>
          <path
            d="M7.75 2.8h8.5A4.96 4.96 0 0 1 21.2 7.75v8.5a4.96 4.96 0 0 1-4.95 4.95h-8.5a4.96 4.96 0 0 1-4.95-4.95v-8.5A4.96 4.96 0 0 1 7.75 2.8Zm0 1.8a3.15 3.15 0 0 0-3.15 3.15v8.5a3.15 3.15 0 0 0 3.15 3.15h8.5a3.15 3.15 0 0 0 3.15-3.15v-8.5a3.15 3.15 0 0 0-3.15-3.15h-8.5Zm4.25 3.14a4.26 4.26 0 1 1 0 8.52 4.26 4.26 0 0 1 0-8.52Zm0 1.8a2.46 2.46 0 1 0 0 4.92 2.46 2.46 0 0 0 0-4.92Zm4.78-2.84a1.02 1.02 0 1 1 0 2.04 1.02 1.02 0 0 1 0-2.04Z"
            fillRule="evenodd"
          />
        </svg>
      );
    case "x":
      return (
        <svg {...commonProps}>
          <path d="M14.2 10.18 21.08 2.8h-1.63l-5.97 6.4-4.77-6.4H3.2l7.22 9.69-7.22 7.74h1.63l6.31-6.77 5.04 6.77h5.51l-7.49-10.05Zm-2.23 2.39-.73-1.02-5.82-7.33h2.51l4.69 6.35.73 1.02 6.13 7.31h-2.51l-5-6.33Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...commonProps}>
          <path d="M5.44 8.38h3.12v10.38H5.44V8.38Zm1.56-5.14a1.82 1.82 0 1 1 0 3.64 1.82 1.82 0 0 1 0-3.64Zm3.55 5.14h2.99v1.42h.04c.42-.79 1.44-1.62 2.96-1.62 3.16 0 3.74 2.08 3.74 4.79v5.79h-3.12v-5.13c0-1.23-.02-2.8-1.7-2.8-1.71 0-1.97 1.33-1.97 2.71v5.22h-3.12V8.38h.18Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...commonProps}>
          <path
            d="M21.45 7.05a2.7 2.7 0 0 0-1.9-1.92C17.87 4.68 12 4.68 12 4.68s-5.87 0-7.55.45a2.7 2.7 0 0 0-1.9 1.92A28.1 28.1 0 0 0 2.1 12c0 1.72.15 3.45.45 4.95a2.7 2.7 0 0 0 1.9 1.92c1.68.45 7.55.45 7.55.45s5.87 0 7.55-.45a2.7 2.7 0 0 0 1.9-1.92c.3-1.5.45-3.23.45-4.95s-.15-3.45-.45-4.95ZM10.03 15.18V8.82L15.45 12l-5.42 3.18Z"
            fillRule="evenodd"
          />
        </svg>
      );
  }
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

          <div className="footer-legal-stack">
            <nav aria-label="Footer legal links" className="footer-legal-row">
              {legalLinks.map((link) => (
                <SmartLink href={link.href} key={link.href}>
                  {link.label}
                </SmartLink>
              ))}
            </nav>
            <nav aria-label="Social media" className="footer-social-block">
              <div className="footer-social-links">
                {socialLinks.map((link) => (
                  <a
                    aria-label={link.label}
                    href={link.href}
                    key={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={link.label}
                  >
                    <SocialIcon platform={link.platform} />
                  </a>
                ))}
              </div>
            </nav>
            <div className="footer-recognition-bar" aria-label="External recognition" role="group">
              <img
                alt="ISO/IEC 27001 certified"
                className="footer-recognition-logo footer-recognition-logo-iso"
                loading="lazy"
                src="/brand/references/iso-27001-certified-white.png"
              />
              <img
                alt="Member of KI Bundesverband"
                className="footer-recognition-logo footer-recognition-logo-ki"
                loading="lazy"
                src="/brand/references/ki-bundesverband-footer.png"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 aiio GmbH</p>
        </div>
      </div>
    </footer>
  );
}
