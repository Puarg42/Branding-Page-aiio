import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CapabilityTeaserGrid,
  WebsiteArchitecturePage,
  type CapabilityTeaser,
} from "../website-architecture";
import { EditorialSection } from "../../components/brand/BrandCanonFoundation";
import { BrandIllustration } from "../../components/brand/BrandIllustration";
import { EditorialEyebrow } from "../../components/brand/EditorialEyebrow";
import { EditorialReferenceMarker } from "../../components/brand/EditorialReferenceMarker";
import { EditorialProgression } from "../../components/brand/EditorialProgression";
import { ExecutiveCTA } from "../../components/brand/ExecutiveCTA";
import { TheoryLink } from "../../components/brand/TheoryLink";
import { TrustLogoMarquee } from "../../components/brand/TrustLogoMarquee";
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
  memory: canonicalTheoryLinks.organizationalMemory,
  resilience: canonicalTheoryLinks.organizationalResilience,
  selfEmpowerment: canonicalTheoryLinks.organizationalSelfEmpowerment,
  selfUnderstanding: canonicalTheoryLinks.organizationalSelfUnderstanding,
} as const;

const capabilities: CapabilityTeaser[] = [
  {
    title: "Understand Your Organization",
    copy:
      "ProcessCollector models structures, responsibilities, rules and process logic into a human-readable representation people and AI can work from.",
    illustrationVariant: "BC201",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Develop Organizational Intelligence",
    copy: (
      <>
        ProcessMagnet makes organizational reality continuously interpretable by
        connecting signals from people, systems, documents and operations into
        one coherent context.
      </>
    ),
    illustrationVariant: "BC202",
    product: "ProcessMagnet",
    quote:
      "A library stores knowledge. Understanding begins when every piece of organizational reality becomes connected.",
    href: "#processmagnet",
  },
  {
    title: "Forge Organizational Capabilities",
    copy: (
      <>
        ProcessForge turns interpreted context into reusable behavior:
        decisions, workflows, assistants and execution patterns people and AI
        can apply.
      </>
    ),
    illustrationVariant: "BC203",
    product: "ProcessForge",
    quote:
      "Knowledge alone changes nothing. Capabilities transform intelligence into repeatable organizational action.",
    href: "#processforge",
  },
  {
    title: "Enable Organizational Self-Empowerment",
    copy:
      "DataForge feeds goals, scenarios, KPIs and operational feedback back into the system so those behaviors improve continuously.",
    illustrationVariant: "BC204",
    product: "DataForge",
    quote:
      "Resilience emerges when capabilities continuously improve against reality.",
    href: "#dataforge",
  },
];

const capabilitySpine = [
  {
    eyebrow: "Level 1",
    label: (
      <TheoryTerm href={theoryLinks.memory}>
        Organizational Memory
      </TheoryTerm>
    ),
    tone: "graphite",
  },
  {
    eyebrow: "Level 2",
    label: (
      <TheoryTerm href={theoryLinks.intelligence}>
        Organizational Intelligence
      </TheoryTerm>
    ),
    tone: "cyan",
  },
  {
    eyebrow: "Level 3",
    label: (
      <TheoryTerm href={theoryLinks.capabilities}>
        Organizational Capabilities
      </TheoryTerm>
    ),
    tone: "purple",
  },
  {
    eyebrow: "Level 4",
    label: (
      <TheoryTerm href={theoryLinks.selfEmpowerment}>
        Organizational Self-Empowerment
      </TheoryTerm>
    ),
    tone: "amber",
  },
  {
    eyebrow: "Business Outcome",
    label: (
      <TheoryTerm href={theoryLinks.resilience}>
        Organizational Resilience
      </TheoryTerm>
    ),
    tone: "white",
  },
] as const;

const platformSectionNavigator = [
  { id: "platform-hero", label: "Hero" },
  { id: "platform-missing-capability", label: "Missing Capability" },
  { id: "platform-journey", label: "Journey" },
  { id: "capability-layer", label: "The System" },
  { id: "platform-outcome", label: "Outcome" },
  { id: "start", label: "Start" },
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
      heroId="platform-hero"
      heroVisual={
        <BrandIllustration
          className="website-platform-hero-artwork"
          decorative={false}
          interactive
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
          Organizational reality becomes Organizational Memory, memory becomes
          Organizational Self-Understanding, self-understanding becomes{" "}
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
      <TrustLogoMarquee />
      <EditorialSection
        className="website-architecture-section website-platform-missing-section"
        id="platform-missing-capability"
        shellClassName="website-page-shell"
      >
          <div className="website-platform-missing-layout">
            <div className="website-section-heading website-platform-missing-copy">
              <EditorialEyebrow>The Missing Capability</EditorialEyebrow>
              <h2>
                Organizations already collect more than they can continuously
                understand.
              </h2>
              <p>
                They collect information, documents, processes and AI. Yet they
                still struggle to preserve organizational reality as memory and
                turn it into continuous self-understanding.
              </p>
              <p className="website-platform-missing-thesis">
                The missing capability is not more information. It is continuous{" "}
                <TheoryTerm href={theoryLinks.selfUnderstanding}>
                  Organizational Self-Understanding
                </TheoryTerm>
                .
              </p>
            </div>
            <ol className="website-platform-capability-spine" aria-label="Capability evolution">
              {capabilitySpine.map((item, index) => (
                <li data-tone={item.tone} key={index}>
                  <span>{item.eyebrow}</span>
                  <strong>{item.label}</strong>
                </li>
              ))}
            </ol>
          </div>
      </EditorialSection>
      <CapabilityTeaserGrid capabilities={capabilities} sectionId="platform-journey" />
      <EditorialSection
        className="website-architecture-section website-platform-system-section"
        id="capability-layer"
        shellClassName="website-page-shell"
      >
          <div className="website-platform-system-layout">
            <div className="website-section-heading website-platform-system-copy">
              <EditorialEyebrow>The System</EditorialEyebrow>
              <h2>
                One system turns organizational reality into continuously
                evolving capability.
              </h2>
              <p>
                The four capabilities do not work as isolated tools. They form
                one Organizational Intelligence System that connects reality,
                memory, self-understanding, capability development and
                continuous evolution.
              </p>
              <p>
                <strong>ProcessCollector</strong> makes the organization readable.{" "}
                <strong>ProcessMagnet</strong> builds organizational intelligence.{" "}
                <strong>ProcessForge</strong> turns that intelligence into
                capabilities. <strong>DataForge</strong> evolves those capabilities
                against operational reality.
              </p>
            </div>
            <div className="website-capability-layer-visual">
              <BrandIllustration decorative={false} interactive variant="BC-002" />
            </div>
          </div>
      </EditorialSection>
      <EditorialSection
        className="website-architecture-section website-platform-outcome-section"
        id="platform-outcome"
        shellClassName="website-page-shell"
      >
          <div className="website-platform-conclusion">
            <EditorialEyebrow>The Impact</EditorialEyebrow>
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
                    "Your organization preserves context, decisions and relationships as a trusted organizational memory.",
                  label: "Organizational Memory",
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
                  meta: (
                    <>
                      Level 3 ·
                      <br />
                      PROCESSFORGE
                    </>
                  ),
                  tone: "purple",
                },
                {
                  description:
                    "Your organization continuously develops and improves its own capabilities.",
                  label: (
                    <TheoryTerm href={theoryLinks.selfEmpowerment}>
                      Organizational Self-Empowerment
                    </TheoryTerm>
                  ),
                  meta: (
                    <>
                      Level 4 ·
                      <br />
                      DATAFORGE
                    </>
                  ),
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
              organization&apos;s ability to improve.
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
              <TheoryTerm href={theoryLinks.selfEmpowerment}>
                Organizational Self-Empowerment
              </TheoryTerm>.
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
      </EditorialSection>
      <ExecutiveCTA
        copy="Experience how the Organizational Intelligence System connects your organizational reality into one continuously evolving foundation."
        headline="See Organizational Intelligence in action."
        primary={{ href: "/live-demo/kontakt", label: "Request a conversation" }}
        secondary={{ href: "/thinking/theory", label: "Explore the Theory" }}
      />
      <PlatformEditorialExperience />
    </WebsiteArchitecturePage>
  );
}
