import Link from "next/link";
import type { ReactNode } from "react";
import {
  BrandIllustration,
  type BrandIllustrationVariant,
} from "@/components/brand/BrandIllustration";
import {
  EditorialCard,
  EditorialGrid,
  EditorialHero,
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
  JourneyCard,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "@/components/brand/EditorialJumpArrow";
import type { EditorialSectionNavigatorItem } from "@/components/brand/EditorialSectionNavigator";
import { TheoryReference } from "@/components/brand/TheoryReference";
import { MainHeader } from "./main-navigation";

export type ArchitectureSection = {
  title: string;
  purpose?: string;
};

type WebsiteArchitecturePageProps = {
  children?: ReactNode;
  heroActions?: ReactNode;
  heroId?: string;
  heroLead?: ReactNode;
  heroVisual?: ReactNode;
  intro: ReactNode;
  sectionNavigator?: readonly EditorialSectionNavigatorItem[];
  sectionNavigatorLabel?: string;
  sections?: readonly ArchitectureSection[];
  title: ReactNode;
};

export function WebsiteArchitecturePage({
  children,
  heroActions,
  heroId,
  heroLead,
  heroVisual,
  intro,
  sectionNavigator,
  sectionNavigatorLabel,
  sections = [],
  title,
}: WebsiteArchitecturePageProps) {
  return (
    <main className="website-page">
      <MainHeader />
      <EditorialHero
        actions={heroActions}
        className="website-hero"
        id={heroId}
        intro={intro}
        lead={heroLead}
        shellClassName="website-page-shell"
        title={title}
        visual={heroVisual ? <div className="website-hero-visual">{heroVisual}</div> : null}
      />

      {children}

      {sections.length > 0 ? (
        <EditorialSection
          className="website-architecture-section"
          shellClassName="website-page-shell"
        >
          <EditorialSectionHeader
            className="website-section-heading"
            eyebrow="Structure"
            title="Page architecture"
          />
          <EditorialGrid className="website-architecture-grid">
            {sections.map((section) => (
              <EditorialCard className="website-architecture-card" key={section.title}>
                <h3>{section.title}</h3>
                {section.purpose ? <p>{section.purpose}</p> : null}
              </EditorialCard>
            ))}
          </EditorialGrid>
        </EditorialSection>
      ) : null}

      {sectionNavigator?.length ? (
        <EditorialNavigation
          ariaLabel={sectionNavigatorLabel}
          sections={sectionNavigator}
        />
      ) : null}
    </main>
  );
}

export type CapabilityTeaser = {
  badge?: string;
  copy: ReactNode;
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

function CapabilityVisual({ capability }: { capability: CapabilityTeaser }) {
  if (capability.illustrationVariant) {
    return (
      <BrandIllustration
        className="website-card-canon"
        decorative={false}
        interactive
        variant={capability.illustrationVariant}
        viewerMode="figure"
      />
    );
  }

  if (capability.illustration) {
    return (
      <figure className="website-card-canon">
        <img
          alt={capability.illustration.alt}
          className="website-card-canon-image"
          loading="lazy"
          src={capability.illustration.src}
        />
      </figure>
    );
  }

  if (capability.illustrationSlot) {
    return (
      <figure
        aria-hidden="true"
        className="website-card-canon is-empty"
        data-slot={capability.illustrationSlot}
      />
    );
  }

  return null;
}

export function CapabilityTeaserGrid({
  capabilities,
  sectionId,
}: {
  capabilities: CapabilityTeaser[];
  sectionId?: string;
}) {
  const journey = [
    {
      key: "collector",
      label: (
        <>
          <TheoryReference>Organizational Memory</TheoryReference>
        </>
      ),
    },
    {
      key: "magnet",
      label: (
        <>
          <TheoryReference>Organizational Intelligence</TheoryReference>
        </>
      ),
    },
    {
      key: "forge",
      label: (
        <>
          <TheoryReference>Organizational Capabilities</TheoryReference>
        </>
      ),
    },
    {
      key: "dataforge",
      label: (
        <>
          Organizational Self-Empowerment
        </>
      ),
    },
  ];
  const journeyTone = (key: (typeof journey)[number]["key"]) => {
    if (key === "collector") return "collector";
    if (key === "magnet") return "magnet";
    if (key === "forge") return "forge";
    return "dataforge";
  };

  return (
    <EditorialSection
      className="website-capability-section"
      id={sectionId}
      ariaLabel="Platform capabilities"
      shellClassName="website-page-shell"
    >
        <div className="website-section-heading">
          <EditorialEyebrow>The Journey</EditorialEyebrow>
          <h2>How aiio creates organizational capabilities.</h2>
          <p>
            Every platform layer turns organizational reality into a stronger
            capability. Each level creates the prerequisite for the next.
          </p>
        </div>
        <div className="website-capability-journey" aria-label="Capability journey">
          {journey.map((step, index) => (
            <JourneyCard
              className="website-capability-journey-step"
              dataCapability={step.key}
              index={String(index + 1).padStart(2, "0")}
              key={step.key}
              tone={journeyTone(step.key)}
            >
              {step.label}
            </JourneyCard>
          ))}
        </div>
        <EditorialGrid className="website-capability-grid">
          {capabilities.map((capability, index) => (
            <JourneyCard
              cta={
                <Link className="website-text-link" href={capability.href}>
                  Learn more <EditorialJumpArrow />
                </Link>
              }
              className="website-capability-card"
              dataCapability={capabilityKey(capability.product)}
              description={
                <>
                  <p>{capability.copy}</p>
                  {capability.secondaryCopy ? <p>{capability.secondaryCopy}</p> : null}
                </>
              }
              headline={capability.title}
              id={capability.product.toLowerCase()}
              index={String(index + 1).padStart(2, "0")}
              insight={capability.quote}
              key={capability.title}
              poweredBy={capability.product}
              visual={<CapabilityVisual capability={capability} />}
            />
          ))}
        </EditorialGrid>
    </EditorialSection>
  );
}
