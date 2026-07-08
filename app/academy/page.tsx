import type { Metadata } from "next";
import Link from "next/link";
import { BrandIllustration } from "../../components/brand/BrandIllustration";
import {
  EditorialCard,
  EditorialCTAGroup,
  EditorialGrid,
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
} from "../../components/brand/BrandCanonFoundation";
import { EditorialJumpArrow } from "../../components/brand/EditorialJumpArrow";
import type { EditorialSectionNavigatorItem } from "../../components/brand/EditorialSectionNavigator";
import { ExecutiveCTA } from "../../components/brand/ExecutiveCTA";
import { MainHeader } from "../main-navigation";

export const metadata: Metadata = {
  title: "Academy | aiio",
  description:
    "The aiio Academy teaches leaders and organizations how to learn, apply and master Organizational Intelligence.",
};

const academySectionNavigator: EditorialSectionNavigatorItem[] = [
  { id: "academy-hero", label: "Hero" },
  { id: "academy-learning-path", label: "Learning Path" },
  { id: "academy-formats", label: "Continue Learning" },
  { id: "start", label: "Start" },
];

const learningModules = [
  {
    module: "Foundation",
    tone: "foundation",
    title: "Understand Organizational Reality",
    titleLines: ["Understand", "Organizational Reality"],
    copy:
      "Learn how organizations become understandable by documenting structures, responsibilities, processes and knowledge.",
    product: "ProcessCollector™",
    outcome: "You understand how organizational reality becomes visible.",
  },
  {
    module: "Understanding",
    tone: "understanding",
    title: "Build Organizational Self-Understanding",
    titleLines: ["Build Organizational", "Self-Understanding"],
    copy:
      "Learn how connected organizational reality becomes continuous Organizational Self-Understanding.",
    product: "ProcessMagnet™",
    outcome: "You understand how organizations continuously interpret themselves.",
  },
  {
    module: "Application",
    tone: "application",
    title: "Transform Understanding into Organizational Capabilities",
    titleLines: ["Transform Understanding", "into Organizational", "Capabilities"],
    copy:
      "Learn how Organizational Intelligence becomes reusable organizational capabilities that people and AI can apply.",
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

const learningFormats = [
  {
    title: "Tutorials",
    copy: "Structured learning modules for teams building a shared foundation.",
  },
  {
    title: "Executive Sessions",
    copy: "Focused formats for leaders who need to understand the discipline and its implications.",
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
            <h1>Learn Organizational Intelligence.</h1>
            <p>
              Organizational Intelligence is not a feature to activate.
            </p>
            <p>
              It is an organizational capability that leaders, teams and AI
              systems continuously develop together.
            </p>
            <p>
              The Academy combines tutorials, executive sessions, practical
              examples and applied learning into one continuous learning
              experience.
            </p>
            <EditorialCTAGroup className="academy-actions" aria-label="Academy actions">
              <Link className="button" href="#academy-learning-path">
                Start Learning <EditorialJumpArrow />
              </Link>
              <Link className="button secondary" href="/live-demo/kontakt">
                Request a Demo <EditorialJumpArrow />
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
          eyebrow="Learning Path"
          title="From Understanding to Organizational Capability."
          lead={
            <>
              Every learning module builds on the previous one. Together they
              explain how organizations continuously develop Organizational
              Intelligence.
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
              <Link className="academy-text-link" href="#academy-formats">
                View Module <span aria-hidden="true">-&gt;</span>
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
          eyebrow="Continue Learning"
          title="Choose the learning format that fits your role."
          lead={
            <>
              Choose the learning format that best fits your role and
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
        copy="Every organization learns differently. The capability they develop is always the same. Organizational Intelligence."
        headline="Start building Organizational Intelligence."
        primary={{ href: "/live-demo/kontakt", label: "Request a Demo" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
      />

      <EditorialNavigation
        ariaLabel="Academy sections"
        sections={academySectionNavigator}
      />
    </main>
  );
}
