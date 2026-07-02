import Link from "next/link";
import type { ReactNode } from "react";
import {
  BrandIllustration,
  type BrandIllustrationVariant,
} from "../components/brand/BrandIllustration";
import { MainHeader } from "./main-navigation";

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
  illustration?: {
    alt: string;
    src: string;
  };
  illustrationVariant?: BrandIllustrationVariant;
  illustrationSlot?: "BC002A" | "BC002B" | "BC002C" | "BC002D";
  product: "ProcessCollector" | "ProcessMagnet" | "ProcessForge" | "DataForge";
  quote?: string;
  secondaryCopy?: string;
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
          <h2>Complementary capabilities, not separate products.</h2>
          <p>
            The following capabilities are complementary perspectives of one
            Organizational Intelligence System.
          </p>
        </div>
        <div className="website-capability-grid">
          {capabilities.map((capability, index) => (
            <article
              className="website-capability-card"
              id={capability.product.toLowerCase()}
              key={capability.title}
            >
              <div className="website-capability-card-copy">
                <span className="website-capability-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{capability.title}</h3>
                <div className="website-card-topline">
                  <span>Powered by {capability.product}</span>
                  {capability.badge ? <em>{capability.badge}</em> : null}
                </div>
                <p>{capability.copy}</p>
                {capability.secondaryCopy ? <p>{capability.secondaryCopy}</p> : null}
                {capability.quote ? (
                  <blockquote className="website-capability-quote">
                    {capability.quote}
                  </blockquote>
                ) : null}
              </div>
              {capability.illustrationVariant ? (
                <BrandIllustration
                  className="website-card-canon"
                  decorative={false}
                  variant={capability.illustrationVariant}
                />
              ) : capability.illustration ? (
                <figure className="website-card-canon">
                  <img
                    alt={capability.illustration.alt}
                    className="website-card-canon-image"
                    loading="lazy"
                    src={capability.illustration.src}
                  />
                </figure>
              ) : capability.illustrationSlot ? (
                <figure
                  aria-hidden="true"
                  className="website-card-canon is-empty"
                  data-slot={capability.illustrationSlot}
                />
              ) : null}
              <Link className="website-text-link" href={capability.href}>
                Learn more <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
