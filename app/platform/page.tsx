import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CapabilityTeaserGrid,
  WebsiteArchitecturePage,
  type CapabilityTeaser,
} from "../website-architecture";
import { BrandIllustration } from "../../components/brand/BrandIllustration";
import { EditorialEyebrow } from "../../components/brand/EditorialEyebrow";
import { EditorialReferenceMarker } from "../../components/brand/EditorialReferenceMarker";
import { EditorialProgression } from "../../components/brand/EditorialProgression";
import { TheoryLink } from "../../components/brand/TheoryLink";
import { canonicalTheoryLinks } from "../../components/brand/theory-links";
import { PlatformEditorialExperience } from "./platform-editorial-experience";

export const metadata: Metadata = {
  title: "Platform | aiio",
  description:
    "One Organizational Intelligence System with four complementary capabilities for organizations that continuously understand, develop and evolve.",
};

const theoryLinks = {
  capabilities: canonicalTheoryLinks.organizationalCapabilities,
  intelligence: canonicalTheoryLinks.organizationalIntelligence,
  resilience: canonicalTheoryLinks.organizationalResilience,
  selfEmpowering: canonicalTheoryLinks.organizationalSelfEmpowering,
  selfUnderstanding: canonicalTheoryLinks.organizationalSelfUnderstanding,
} as const;

const capabilities: CapabilityTeaser[] = [
  {
    title: "Understand\nYour\nOrganization",
    copy:
      "Create a trusted human-readable representation of your organization. People and AI share one consistent organizational representation.",
    illustrationVariant: "BC201",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Build\nOrganizational\nSelf-Understanding",
    copy: (
      <>
        Continuously interpret organizational reality. Connect people, systems,
        documents, operational data, standards, market knowledge and experience.
        Create{" "}
        <TheoryTerm href={theoryLinks.selfUnderstanding}>
          Organizational Self-Understanding
        </TheoryTerm>
        .
      </>
    ),
    illustrationVariant: "BC202",
    product: "ProcessMagnet",
    quote:
      "A library stores knowledge. Understanding begins when every piece of organizational reality becomes connected.",
    href: "#processmagnet",
  },
  {
    title: "Forge\nOrganizational\nCapabilities",
    copy: (
      <>
        Transform{" "}
        <TheoryTerm href={theoryLinks.intelligence}>
          Organizational Intelligence
        </TheoryTerm>{" "}
        into reusable{" "}
        <TheoryTerm href={theoryLinks.capabilities}>
          organizational capabilities
        </TheoryTerm>
        . Capabilities become executable organizational behavior.
      </>
    ),
    illustrationVariant: "BC203",
    product: "ProcessForge",
    quote:
      "Knowledge alone changes nothing. Capabilities transform intelligence into repeatable organizational action.",
    href: "#processforge",
  },
  {
    title: "Enable\nOrganizational\nSelf-Empowering",
    copy: (
      <>
        Continuously validate and evolve{" "}
        <TheoryTerm href={theoryLinks.capabilities}>
          organizational capabilities
        </TheoryTerm>{" "}
        through operational reality, KPIs, goals and scenarios. Organizations
        increasingly empower themselves.
      </>
    ),
    illustrationVariant: "BC204",
    product: "DataForge",
    quote:
      "Organizations become resilient because they continuously learn from reality.",
    href: "#dataforge",
  },
];

const platformSectionNavigator = [
  { id: "platform-hero", label: "Hero" },
  { id: "capability-layer", label: "The System" },
  { id: "platform-capabilities", label: "Capabilities" },
  { id: "platform-outcome", label: "Outcome" },
] as const;

const platformHeroTitle = (
  <>
    <span className="website-platform-hero-title">
      The Organizational
      <br />
      Intelligence System
    </span>
    <span className="website-platform-hero-subtitle">
      for organizations that
      <br />
      continuously understand themselves,
      <br />
      develop new capabilities
      <br />
      and become resilient.
    </span>
  </>
) as unknown as string;

function TheoryTerm({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const label = typeof children === "string" ? children : "this concept";

  return (
    <TheoryLink
      aria-label={`Read theoretical foundation for ${label}`}
      className="platform-theory-term"
      href={href}
      title="Read theoretical foundation"
    >
      <span className="platform-theory-text">{children}</span>
      <EditorialReferenceMarker className="editorial-reference-icon" />
    </TheoryLink>
  );
}

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      heroId="platform-hero"
      heroVisual={
        <BrandIllustration
          className="website-platform-hero-artwork"
          decorative={false}
          priority
          variant="BC-003"
        />
      }
      intro={
        <>
          Organizations need more than disconnected software. They need a system
          that turns organizational reality into self-understanding,
          self-understanding into{" "}
          <TheoryTerm href={theoryLinks.intelligence}>
            Organizational Intelligence
          </TheoryTerm>
          , intelligence into capabilities and capabilities into continuous
          self-empowering.
        </>
      }
      sectionNavigator={platformSectionNavigator}
      sectionNavigatorLabel="Platform sections"
      title={platformHeroTitle}
    >
      <section
        className="website-architecture-section website-platform-system-section"
        id="capability-layer"
      >
        <div className="website-page-shell">
          <div className="website-platform-system-layout">
            <div className="website-section-heading website-platform-system-copy">
              <EditorialEyebrow>The System</EditorialEyebrow>
              <h2>
                <TheoryTerm href={theoryLinks.intelligence}>
                  Organizational Intelligence
                </TheoryTerm>{" "}
                becomes the foundation for organizational capabilities.
              </h2>
              <p>
                <TheoryTerm href={theoryLinks.intelligence}>
                  Organizational Intelligence
                </TheoryTerm>{" "}
                is not the final objective. It is the organization's
                continuously evolving capability to interpret itself. It begins
                with{" "}
                <TheoryTerm href={theoryLinks.selfUnderstanding}>
                  Organizational Self-Understanding
                </TheoryTerm>
                , develops into reusable{" "}
                <TheoryTerm href={theoryLinks.capabilities}>
                  organizational capabilities
                </TheoryTerm>
                , enables{" "}
                <TheoryTerm href={theoryLinks.selfEmpowering}>
                  Organizational Self-Empowering
                </TheoryTerm>{" "}
                and ultimately creates resilience.
              </p>
              <p>
                The capabilities below are not independent products. They are
                complementary perspectives of one Organizational Intelligence
                System.
              </p>
              <p>
                ProcessMagnet continuously interprets organizational reality.
                ProcessCollector makes the resulting intelligence readable,
                reliable and shared.
              </p>
            </div>
            <div className="website-capability-layer-visual">
              <BrandIllustration decorative={false} interactive variant="BC-002" />
            </div>
          </div>
        </div>
      </section>
      <CapabilityTeaserGrid capabilities={capabilities} sectionId="platform-capabilities" />
      <section
        className="website-architecture-section website-platform-outcome-section"
        id="platform-outcome"
      >
        <div className="website-page-shell">
          <div className="website-platform-conclusion">
            <EditorialEyebrow>Outcome</EditorialEyebrow>
            <h2>The outcome is organizational resilience.</h2>
            <p>
              The outcome is not another software platform.
            </p>
            <p>
              The outcome is an organization that continuously develops its own
              capabilities, increasingly empowers itself and becomes more
              resilient under change.
            </p>
            <EditorialProgression
              ariaLabel="Organizational Intelligence outcome hierarchy"
              className="website-platform-outcome-ladder"
              items={[
                {
                  label: (
                    <TheoryTerm href={theoryLinks.intelligence}>
                      Organizational Intelligence
                    </TheoryTerm>
                  ),
                  meta: "Level 1",
                  tone: "cyan",
                },
                {
                  label: (
                    <TheoryTerm href={theoryLinks.capabilities}>
                      Organizational Capabilities
                    </TheoryTerm>
                  ),
                  meta: "Level 2",
                  tone: "purple",
                },
                {
                  label: (
                    <TheoryTerm href={theoryLinks.selfEmpowering}>
                      Organizational Self-Empowering
                    </TheoryTerm>
                  ),
                  meta: "Level 3",
                  tone: "amber",
                },
                {
                  label: (
                    <TheoryTerm href={theoryLinks.resilience}>
                      Organizational Resilience
                    </TheoryTerm>
                  ),
                  meta: "Business Outcome",
                  tone: "violet",
                },
              ]}
              orientation="horizontal"
            />
            <p>
              Organizations become self-empowering when their capabilities
              continuously evolve. They no longer rely solely on individual
              knowledge. They continuously develop the conditions for their own
              improvement.
            </p>
            <p className="website-platform-conclusion-thesis">
              This is the direct precursor of{" "}
              <TheoryTerm href={theoryLinks.resilience}>
                Organizational Resilience
              </TheoryTerm>
              .
            </p>
            <p className="website-platform-conclusion-final">
              The goal is not better documentation. The goal is not another AI
              platform. The goal is an organization that turns self-understanding
              into intelligence, intelligence into capabilities and capabilities
              into self-empowerment.
            </p>
            <p className="website-platform-final-statement">
              Organizations that continuously empower themselves become
              increasingly resilient.
            </p>
          </div>
        </div>
      </section>
      <PlatformEditorialExperience />
    </WebsiteArchitecturePage>
  );
}
