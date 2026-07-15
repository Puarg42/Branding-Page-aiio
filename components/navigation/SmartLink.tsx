import Link from "next/link";
import type { ReactNode } from "react";

/** External links (http/https) render as plain anchors with safe rel/target. */
export function isExternalLink(href: string) {
  return href.startsWith("http");
}

type SmartLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
  tabIndex?: number;
};

/**
 * Renders a `next/link` for internal routes and a safe external anchor for
 * absolute URLs. Shared by the header and footer so link behavior stays
 * consistent in one place.
 */
export function SmartLink({ children, className, href, onClick, tabIndex }: SmartLinkProps) {
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
