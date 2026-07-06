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
      "Create a trusted human-readable representation of your organization. Your organization becomes understandable to people, AI and management.",
    illustrationVariant: "BC201",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Develop\nOrganizational\nIntelligence",
    copy: (
      <>
        Continuously interpret organizational reality. Connect people, systems,
        documents, operational data, standards, market knowledge and experience
        into{" "}
        <TheoryTerm href={theoryLinks.intelligence}>
          Organizational Intelligence
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
        . Each capability creates reusable organizational behavior.
      </>
    ),
    illustrationVariant: "BC203",
    product: "ProcessForge",
    quote:
      "Knowledge alone changes nothing. Capabilities transform intelligence into repeatable organizational action.",
    href: "#processforge",
  },
  {
    title: "Enable\nOrganizational\nSelf-Empowerment",
    copy: (
      <>
        Continuously validate and evolve{" "}
        <TheoryTerm href={theoryLinks.capabilities}>
          organizational capabilities
        </TheoryTerm>{" "}
        through operational reality, KPIs, goals and scenarios. Your
        organization continuously improves its own capabilities.
      </>
    ),
    illustrationVariant: "BC204",
    product: "DataForge",
    quote:
      "Resilience emerges when capabilities continuously improve against reality.",
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
      heroLead={
        <>
          For organizations that continuously understand themselves, develop new
          capabilities and become resilient.
        </>
      }
      intro={
        <>
          Organizational reality continuously becomes self-understanding,
          self-understanding becomes{" "}
          <TheoryTerm href={theoryLinks.intelligence}>
            Organizational Intelligence
          </TheoryTerm>
          , intelligence becomes capabilities and capabilities become
          resilience.
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
            <h2>
              Every capability creates a measurable organizational outcome.
              The ultimate outcome is Organizational Resilience.
            </h2>
            <p>
              The outcome is not another software platform.
            </p>
            <p>
              Each platform capability creates immediate business value. Each
              outcome enables the next one. Only together do they create an
              organization that becomes more resilient under change.
            </p>
            <EditorialProgression
              ariaLabel="Organizational Intelligence outcome hierarchy"
              className="website-platform-outcome-ladder"
              items={[
                {
                  description:
                    "Your organization becomes understandable. People, AI and management share one trusted organizational representation.",
                  label: "Organizational Understanding",
                  meta: "Level 1 · ProcessCollector",
                  tone: "graphite",
                },
                {
                  description:
                    "Your organization continuously understands itself and interprets organizational reality.",
                  label: "Organizational Intelligence",
                  meta: "Level 2 · ProcessMagnet",
                  tone: "cyan",
                },
                {
                  description:
                    "Organizational Intelligence becomes reusable organizational capabilities.",
                  label: "Organizational Capabilities",
                  meta: "Level 3 · ProcessForge",
                  tone: "purple",
                },
                {
                  description:
                    "Your organization continuously develops and improves its own capabilities.",
                  label: "Organizational Self-Empowerment",
                  meta: "Level 4 · DataForge",
                  tone: "amber",
                },
                {
                  description:
                    "Organizations continuously adapt, improve and perform under change.",
                  label: "Organizational Resilience",
                  meta: "Ultimate Business Outcome",
                  tone: "white",
                },
              ]}
              orientation="horizontal"
            />
            <p>
              The ladder summarizes the customer journey. Every level creates a
              new organizational outcome, and every outcome increases the
              organization's ability to improve.
            </p>
            <p className="website-platform-conclusion-thesis">
              Organizational Resilience emerges from the combined effect of{" "}
              <TheoryTerm href={theoryLinks.intelligence}>
                Organizational Intelligence
              </TheoryTerm>
              ,{" "}
              <TheoryTerm href={theoryLinks.capabilities}>
                Organizational Capabilities
              </TheoryTerm>{" "}
              and{" "}
              Organizational Self-Empowerment.
            </p>
            <p className="website-platform-conclusion-final">
              The goal is not better documentation. The goal is not another AI
              platform. The goal is an organization that becomes understandable,
              develops intelligence, creates capabilities and improves under
              change.
            </p>
            <p className="website-platform-final-statement">
              Every capability creates value. Together, they create{" "}
              <TheoryTerm href={theoryLinks.resilience}>
                Organizational Resilience
              </TheoryTerm>
              .
            </p>
          </div>
        </div>
      </section>
      <PlatformEditorialExperience />
    </WebsiteArchitecturePage>
  );
}
