import Link from "next/link";
import type { ReactNode } from "react";
import { MainHeader } from "./main-navigation";
import { BrandIllustration } from "../components/brand/BrandIllustration";

export type ArchitectureSection = {
  title: string;
  purpose?: string;
};

type WebsiteArchitecturePageProps = {
  children?: ReactNode;
  eyebrow: string;
  intro: string;
  sections?: readonly ArchitectureSection[];
  title: string;
};

export function WebsiteArchitecturePage({
  children,
  eyebrow,
  intro,
  sections = [],
  title,
}: WebsiteArchitecturePageProps) {
  return (
    <main className="website-page">
      <MainHeader />
      <section className="website-hero">
        <div className="website-page-shell">
          <p className="website-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>

      {children}

      {sections.length > 0 ? (
        <section className="website-architecture-section">
          <div className="website-page-shell">
            <div className="website-section-heading">
              <p className="website-eyebrow">Structure</p>
              <h2>Page architecture</h2>
            </div>
            <div className="website-architecture-grid">
              {sections.map((section) => (
                <article className="website-architecture-card" key={section.title}>
                  <h3>{section.title}</h3>
                  {section.purpose ? <p>{section.purpose}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export type CapabilityTeaser = {
  badge?: string;
  copy: string;
  href: string;
  product: "ProcessCollector" | "ProcessMagnet" | "ProcessForge" | "DataForge";
  title: string;
};

export function CapabilityTeaserGrid({
  capabilities,
}: {
  capabilities: CapabilityTeaser[];
}) {
  return (
    <section className="website-capability-section" aria-label="Platform capabilities">
      <div className="website-page-shell">
        <div className="website-section-heading">
          <p className="website-eyebrow">Capabilities</p>
          <h2>Four capabilities. One system.</h2>
        </div>
        <div className="website-capability-grid">
          {capabilities.map((capability) => (
            <article
              className="website-capability-card"
              id={capability.product.toLowerCase()}
              key={capability.title}
            >
              <div>
                <div className="website-card-topline">
                  <span>Powered by {capability.product}</span>
                  {capability.badge ? <em>{capability.badge}</em> : null}
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
              </div>
              <BrandIllustration className="website-card-canon" variant="BC-003" />
              <Link className="website-text-link" href={capability.href}>
                See {capability.product} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
