import type { Metadata } from "next";
import Link from "next/link";
import { BrandIllustration } from "@/components/brand/BrandIllustration";
import {
  EditorialCard,
  EditorialCTAGroup,
  EditorialGrid,
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialJumpArrow } from "@/components/brand/EditorialJumpArrow";
import type { EditorialSectionNavigatorItem } from "@/components/brand/EditorialSectionNavigator";
import { ExecutiveCTA } from "@/components/brand/ExecutiveCTA";
import { MainHeader } from "../main-navigation";

export const metadata: Metadata = {
  alternates: { canonical: "/academy" },
  title: "Academy | aiio",
  description:
    "The aiio Academy helps leaders and organizations develop Organizational Intelligence capabilities.",
};

const academySectionNavigator: EditorialSectionNavigatorItem[] = [
  { id: "academy-hero", label: "Hero" },
  { id: "academy-learning-path", label: "Capability Development" },
  { id: "academy-formats", label: "Continue Development" },
  { id: "start", label: "Start" },
];

export const learningModules = [
  {
    module: "Foundation",
    tone: "foundation",
    title: "Build Organizational Memory",
    titleLines: ["Build", "Organizational Memory"],
    copy:
      "Develop the capability to preserve structures, responsibilities, processes and knowledge as Organizational Memory.",
    product: "ProcessCollector™",
    outcome: "You understand how organizational reality becomes durable and reusable.",
  },
  {
    module: "Understanding",
    tone: "understanding",
    title: "Build Organizational Self-Understanding",
    titleLines: ["Build Organizational", "Self-Understanding"],
    copy:
      "Develop the capability to turn Organizational Memory into continuous Organizational Self-Understanding.",
    product: "ProcessMagnet™",
    outcome: "You understand how organizations continuously interpret themselves.",
  },
  {
    module: "Application",
    tone: "application",
    title: "Transform Intelligence into Organizational Capabilities",
    titleLines: ["Transform Intelligence", "into Organizational", "Capabilities"],
    copy:
      "Develop the capability to turn Organizational Intelligence into reusable organizational capabilities that people and AI can apply.",
    product: "ProcessForge™",
    outcome: "You understand how organizational capabilities are created.",
  },
  {
    module: "Mastery",
    tone: "mastery",
    title: "Create Self-Empowering Organizations",
    titleLines: ["Create Self-Empowering", "Organizations"],
    copy:
      "Learn how continuously evolving organizational capabilities enable organizations to become increasingly self-empowering and resilient.",
    product: "DataForge™",
    outcome:
      "You understand how Organizational Intelligence creates long-term organizational resilience.",
  },
] as const;

export const learningFormats = [
  {
    title: "Tutorials",
    copy: "Structured capability modules for teams building a shared foundation.",
  },
  {
    title: "Executive Sessions",
    copy: "Focused formats for leaders who need to develop the discipline and its implications.",
  },
  {
    title: "Practical Examples",
    copy: "Applied scenarios that connect Organizational Intelligence to real organizational situations.",
  },
  {
    title: "Articles",
    copy: "Editorial thinking that explains concepts, terminology and management implications.",
  },
  {
    title: "Live Learning",
    copy: "Sessions, workshops and office hours for questions that emerge during implementation.",
  },
] as const;

export default function AcademyPage() {
  return (
    <main className="academy-page">
      <MainHeader variant="solid" />

      <section className="academy-hero editorial-hero" id="academy-hero">
        <div className="academy-shell">
          <div className="academy-hero-copy">
            <BrandIllustration
              className="academy-hero-visual"
              decorative={false}
              interactive
              priority
              variant="BC-006"
            />
            <h1>Develop Organizational Intelligence capabilities.</h1>
            <p>
              Organizational Intelligence is not a feature to activate.
            </p>
            <p>
              It is a set of organizational capabilities that leaders, teams
              and AI systems continuously develop together.
            </p>
            <p>
              The Academy combines tutorials, executive sessions and practical
              examples into one continuous capability development experience.
            </p>
            <EditorialCTAGroup className="academy-actions" aria-label="Academy actions">
              <Link className="button" href="#academy-learning-path">
                Start Learning <EditorialJumpArrow />
              </Link>
              <Link className="button secondary" href="/live-demo/kontakt">
                Request a conversation <EditorialJumpArrow />
              </Link>
            </EditorialCTAGroup>
          </div>
        </div>
      </section>

      <EditorialSection
        className="academy-section academy-journey-section"
        id="academy-learning-path"
        shellClassName="academy-shell"
      >
        <EditorialSectionHeader
          className="academy-section-heading"
          eyebrow="Capability Development"
          title="From Organizational Memory to Organizational Capability."
          lead={
            <>
              Every capability module builds on the previous one. Together they
              explain how organizations develop Organizational Memory,
              Self-Understanding, Intelligence and Capabilities.
            </>
          }
        />

        <EditorialGrid className="academy-journey-grid" columns="four">
          {learningModules.map((module, index) => (
            <EditorialCard
              className="academy-journey-card"
              dataCapability={module.tone}
              key={module.title}
            >
              <div className="academy-module-header">
                <span className="academy-level-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="academy-level-label">{module.module}</p>
                <h3 aria-label={module.title}>
                  {module.titleLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
              </div>
              <p className="academy-module-copy">{module.copy}</p>
              <p className="academy-powered">
                Supported by <strong>{module.product}</strong>
              </p>
              <div className="academy-learning-outcome">
                <span>Learning Outcome</span>
                <p>{module.outcome}</p>
              </div>
              <Link className="website-text-link academy-module-cta" href="#academy-formats">
                View Module <EditorialJumpArrow />
              </Link>
            </EditorialCard>
          ))}
        </EditorialGrid>
      </EditorialSection>

      <EditorialSection
        className="academy-section academy-formats-section"
        id="academy-formats"
        shellClassName="academy-shell"
      >
        <EditorialSectionHeader
          className="academy-section-heading"
          eyebrow="Continue Development"
          title="Choose the capability development format that fits your role."
          lead={
            <>
              Choose the development format that best fits your role and
              organizational maturity.
            </>
          }
        />

        <EditorialGrid className="academy-format-grid">
          {learningFormats.map((format, index) => (
            <EditorialCard className="academy-format-card" key={format.title}>
              <span className="academy-level-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{format.title}</h3>
              <p>{format.copy}</p>
            </EditorialCard>
          ))}
        </EditorialGrid>
      </EditorialSection>
      <ExecutiveCTA
        copy="Every organization develops capability differently. The capability system they build is always the same: Organizational Intelligence."
        headline="Start developing Organizational Intelligence capabilities."
        primary={{ href: "/live-demo/kontakt", label: "Request a conversation" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
      />

      <EditorialNavigation
        ariaLabel="Academy sections"
        sections={academySectionNavigator}
      />
    </main>
  );
}
