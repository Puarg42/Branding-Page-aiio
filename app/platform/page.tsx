import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  CapabilityTeaserGrid,
  WebsiteArchitecturePage,
  type CapabilityTeaser,
} from "../website-architecture";
import { BrandIllustration } from "../../components/brand/BrandIllustration";
import { PlatformEditorialExperience } from "./platform-editorial-experience";

export const metadata: Metadata = {
  title: "Platform | aiio",
  description:
    "One Organizational Intelligence System for organizations that continuously understand, develop and evolve.",
};

const capabilities: CapabilityTeaser[] = [
  {
    title: "Understand\nYour\nOrganization",
    copy:
      "Create a human-readable representation of your organization so teams can see its structure, responsibilities and decisions clearly.",
    illustrationVariant: "BC201",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Build\nOrganizational\nSelf-Understanding",
    copy:
      "Connect organizational reality into self-understanding so your organization can interpret its structures, relationships and decisions.",
    illustrationVariant: "BC202",
    product: "ProcessMagnet",
    quote:
      "A library stores knowledge. Understanding begins when every piece of knowledge becomes connected.",
    href: "#processmagnet",
  },
  {
    title: "Enable\nOrganizational\nCapabilities",
    copy:
      "Turn self-understanding into capabilities your organization can repeat, improve and trust in daily execution.",
    illustrationVariant: "BC203",
    product: "ProcessForge",
    quote:
      "A recipe doesn't cook dinner. A capability turns knowledge into repeatable execution.",
    href: "#processforge",
  },
  {
    title: "Continuously Evolve\nYour\nOrganization",
    copy:
      "Use goals, scenarios and operational reality to evolve capabilities and strengthen resilience under change.",
    illustrationVariant: "BC204",
    product: "DataForge",
    quote:
      "Organizations don't become resilient by standing still. They become resilient by continuously evolving their capabilities.",
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

const theoryLinks = {
  capabilities: "/thinking/theory#6-organizational-capabilities",
  intelligence: "/thinking/theory#5-organizational-intelligence",
  resilience: "/thinking/theory#7-organizational-resilience",
  selfUnderstanding: "/thinking/theory#3-organizations-cannot-understand-themselves",
} as const;

function TheoryTerm({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <span className="platform-theory-term">
      {children}
      <Link
        aria-label={`Read theoretical foundation for ${children}`}
        className="platform-theory-indicator"
        href={href}
        title="Read theoretical foundation"
      >
        ↗ Theory
      </Link>
    </span>
  );
}

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      heroId="platform-hero"
      intro="Organizations need more than disconnected software. They need a system that turns organizational reality into understanding, understanding into capabilities and capabilities into continuous evolution."
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
              <p className="website-eyebrow">The System</p>
              <h2>
                <TheoryTerm href={theoryLinks.intelligence}>
                  Organizational Intelligence
                </TheoryTerm>{" "}
                emerges through four capabilities.
              </h2>
              <p>
                <TheoryTerm href={theoryLinks.intelligence}>
                  Organizational Intelligence
                </TheoryTerm>{" "}
                does not emerge from isolated tools.
                It emerges when four capabilities work together: understanding
                the organization, developing{" "}
                <TheoryTerm href={theoryLinks.selfUnderstanding}>
                  Organizational Self-Understanding
                </TheoryTerm>
                , enabling{" "}
                <TheoryTerm href={theoryLinks.capabilities}>
                  organizational capabilities
                </TheoryTerm>{" "}
                and driving continuous
                evolution. Together, they form one Organizational Intelligence
                System.
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
            <p className="website-eyebrow">Outcome</p>
            <h2>
              The outcome is{" "}
              <TheoryTerm href={theoryLinks.resilience}>
                organizational resilience
              </TheoryTerm>
              .
            </h2>
            <p>
              The outcome is not another software platform.
            </p>
            <p>
              The outcome is an organization that continuously understands
              itself, develops new capabilities and increasingly empowers itself
              to adapt, improve and respond to change.
            </p>
            <div
              aria-label="Organizational Intelligence outcome hierarchy"
              className="website-platform-outcome-ladder"
            >
              <div>
                <span>Level 1</span>
                <strong>
                  <TheoryTerm href={theoryLinks.selfUnderstanding}>
                    Organizational Self-Understanding
                  </TheoryTerm>
                </strong>
              </div>
              <div>
                <span>Level 2</span>
                <strong>
                  <TheoryTerm href={theoryLinks.intelligence}>
                    Organizational Intelligence
                  </TheoryTerm>
                </strong>
              </div>
              <div>
                <span>Level 3</span>
                <strong>
                  <TheoryTerm href={theoryLinks.capabilities}>
                    Organizational Capabilities
                  </TheoryTerm>
                </strong>
              </div>
              <div>
                <span>Business Outcome</span>
                <strong>
                  <TheoryTerm href={theoryLinks.resilience}>
                    Organizational Resilience
                  </TheoryTerm>
                </strong>
              </div>
            </div>
            <p>
              Organizations that continuously understand themselves gradually
              become self-empowering. They no longer rely solely on individual
              knowledge. They continuously develop new organizational
              capabilities.
            </p>
            <p className="website-platform-conclusion-thesis">
              This is the foundation of{" "}
              <TheoryTerm href={theoryLinks.resilience}>
                Organizational Resilience
              </TheoryTerm>
              .
            </p>
            <p className="website-platform-conclusion-final">
              The goal is not better documentation. The goal is not another AI
              platform. The goal is an organization that continuously
              understands itself, develops new capabilities and becomes
              increasingly resilient.
            </p>
            <p className="website-platform-final-statement">
              Organizations that truly understand themselves continuously
              develop new capabilities&mdash;and become increasingly resilient.
            </p>
          </div>
        </div>
      </section>
      <PlatformEditorialExperience />
    </WebsiteArchitecturePage>
  );
}
