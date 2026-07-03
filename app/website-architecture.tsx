import Link from "next/link";
import type { ReactNode } from "react";
import {
  BrandIllustration,
  type BrandIllustrationVariant,
} from "../components/brand/BrandIllustration";
import {
  EditorialSectionNavigator,
  type EditorialSectionNavigatorItem,
} from "../components/brand/EditorialSectionNavigator";
import { MainHeader } from "./main-navigation";

export type ArchitectureSection = {
  title: string;
  purpose?: string;
};

type WebsiteArchitecturePageProps = {
  children?: ReactNode;
  eyebrow: string;
  heroId?: string;
  intro: string;
  sectionNavigator?: readonly EditorialSectionNavigatorItem[];
  sectionNavigatorLabel?: string;
  sections?: readonly ArchitectureSection[];
  title: string;
};

export function WebsiteArchitecturePage({
  children,
  eyebrow,
  heroId,
  intro,
  sectionNavigator,
  sectionNavigatorLabel,
  sections = [],
  title,
}: WebsiteArchitecturePageProps) {
  return (
    <main className="website-page">
      <MainHeader />
      <section className="website-hero" id={heroId}>
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

      {sectionNavigator?.length ? (
        <EditorialSectionNavigator
          ariaLabel={sectionNavigatorLabel}
          sections={sectionNavigator}
        />
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

function capabilityKey(product: CapabilityTeaser["product"]) {
  switch (product) {
    case "ProcessCollector":
      return "collector";
    case "ProcessMagnet":
      return "magnet";
    case "ProcessForge":
      return "forge";
    case "DataForge":
      return "dataforge";
  }
}

export function CapabilityTeaserGrid({
  capabilities,
  sectionId,
}: {
  capabilities: CapabilityTeaser[];
  sectionId?: string;
}) {
  const journey = [
    { key: "collector", label: "Understand Your Organization" },
    { key: "magnet", label: "Build Organizational Self-Understanding" },
    { key: "forge", label: "Enable Organizational Capabilities" },
    { key: "dataforge", label: "Continuously Evolve" },
  ];

  return (
    <section
      className="website-capability-section"
      id={sectionId}
      aria-label="Platform capabilities"
    >
      <div className="website-page-shell">
        <div className="website-section-heading">
          <p className="website-eyebrow">Capabilities</p>
          <h2>Complementary capabilities, not separate products.</h2>
          <p>
            The following capabilities are complementary perspectives of one
            Organizational Intelligence System.
          </p>
        </div>
        <div className="website-capability-journey" aria-label="Capability journey">
          {journey.map((step, index) => (
            <span
              className="website-capability-journey-step"
              data-capability={step.key}
              key={step.key}
            >
              <em>{String(index + 1).padStart(2, "0")}</em>
              {" "}
              {step.label}
            </span>
          ))}
        </div>
        <div className="website-capability-grid">
          {capabilities.map((capability, index) => (
            <article
              className="website-capability-card"
              data-capability={capabilityKey(capability.product)}
              id={capability.product.toLowerCase()}
              key={capability.title}
            >
              <div className="website-capability-card-copy">
                <span className="website-capability-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{capability.title}</h3>
                <div className="website-card-topline">
                  <span>
                    Powered by <strong>{capability.product}</strong>
                  </span>
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
                  interactive
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
