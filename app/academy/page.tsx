import type { Metadata } from "next";
import Link from "next/link";
import { BrandIllustration } from "../../components/brand/BrandIllustration";
import { EditorialEyebrow } from "../../components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "../../components/brand/EditorialJumpArrow";
import {
  EditorialSectionNavigator,
  type EditorialSectionNavigatorItem,
} from "../../components/brand/EditorialSectionNavigator";
import { MainHeader } from "../main-navigation";

export const metadata: Metadata = {
  title: "Academy | aiio",
  description:
    "The aiio Academy teaches organizations how to build Organizational Intelligence through the Organizational Intelligence System.",
};

const academySectionNavigator: EditorialSectionNavigatorItem[] = [
  { id: "academy-hero", label: "Hero" },
  { id: "academy-journey", label: "Learning Journey" },
  { id: "academy-resources", label: "Learning Resources" },
  { id: "academy-live", label: "Live Learning" },
  { id: "academy-thinking", label: "Continue in Thinking" },
];

const learningJourney = [
  {
    level: "Level 1",
    title: "Understand Your Organization",
    product: "ProcessCollector",
    copy:
      "Learn how to create a human-readable representation of how your organization works, where responsibilities live and how process logic becomes understandable.",
    href: "#academy-resource-beginner",
  },
  {
    level: "Level 2",
    title: "Build Organizational Intelligence",
    product: "ProcessMagnet",
    copy:
      "Learn how organizational reality becomes connected context so people, teams and intelligent systems can reason from the same understanding.",
    href: "#academy-resource-intermediate",
  },
  {
    level: "Level 3",
    title: "Forge Organizational Capabilities",
    product: "ProcessForge",
    copy:
      "Learn how understanding turns into reusable organizational capabilities that support better decisions, coordinated action and daily execution.",
    href: "#academy-resource-advanced",
  },
  {
    level: "Level 4",
    title: "Enable Organizational Self-Empowerment",
    product: "DataForge",
    copy:
      "Learn how goals, scenarios and operational reality help organizations improve continuously and become more resilient over time.",
    href: "#academy-resource-continuous",
  },
] as const;

const learningResources = [
  {
    id: "academy-resource-beginner",
    stage: "Beginner",
    title: "Start with organizational representation.",
    copy:
      "Short learning modules help teams understand the foundations of process landscapes, responsibilities, documentation and organizational source code.",
    items: ["Academy Basics", "Process models", "Responsibilities", "Documentation"],
  },
  {
    id: "academy-resource-intermediate",
    stage: "Intermediate",
    title: "Connect context across the organization.",
    copy:
      "Practical examples show how existing structures, documents and operational inputs become shared organizational understanding.",
    items: ["Context mapping", "Operational inputs", "Patterns", "Team learning"],
  },
  {
    id: "academy-resource-advanced",
    stage: "Advanced",
    title: "Turn understanding into capability.",
    copy:
      "Advanced sessions focus on decision quality, capability design, coordinated action and the transition from knowledge to organizational intelligence.",
    items: ["Capability design", "Decision support", "Execution patterns", "Improvement loops"],
  },
  {
    id: "academy-resource-continuous",
    stage: "Continuous Learning",
    title: "Keep the discipline alive.",
    copy:
      "New sessions, recordings and practical examples help teams keep pace as the Organizational Intelligence System evolves.",
    items: ["New releases", "Executive formats", "Office hours", "Community sessions"],
  },
] as const;

const liveLearningFormats = [
  "Live Webinars",
  "Executive Sessions",
  "Workshops",
  "Office Hours",
  "Community Events",
] as const;

export default function AcademyPage() {
  return (
    <main className="academy-page">
      <MainHeader variant="solid" />

      <section className="academy-hero" id="academy-hero">
        <div className="academy-shell">
          <div className="academy-hero-visual" aria-hidden="true">
            <BrandIllustration decorative priority variant="BC-004" />
          </div>

          <div className="academy-hero-copy">
            <EditorialEyebrow>Academy</EditorialEyebrow>
            <h1>Learn Organizational Intelligence.</h1>
            <p>
              From understanding your organization to continuously developing
              Organizational Intelligence.
            </p>
            <p>
              This Academy combines tutorials, live sessions, practical examples
              and executive knowledge into one continuous learning experience.
            </p>
            <div className="academy-actions" aria-label="Academy actions">
              <Link className="button" href="#academy-journey">
                Start Learning <EditorialJumpArrow />
              </Link>
              <Link className="button secondary" href="/platform">
                Explore the Platform <EditorialJumpArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="academy-section academy-journey-section" id="academy-journey">
        <div className="academy-shell">
          <div className="academy-section-heading">
            <EditorialEyebrow>Learning Journey</EditorialEyebrow>
            <h2>How organizations learn Organizational Intelligence.</h2>
            <p>
              The Academy follows the same path organizations take when they build
              Organizational Intelligence: from understanding how work happens to
              developing capabilities that improve how decisions are made.
            </p>
          </div>

          <div className="academy-journey-grid">
            {learningJourney.map((level, index) => (
              <article className="academy-journey-card" key={level.title}>
                <span className="academy-level-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="academy-level-label">{level.level}</p>
                <h3>{level.title}</h3>
                <p className="academy-powered">
                  Powered by <strong>{level.product}</strong>
                </p>
                <p>{level.copy}</p>
                <Link className="academy-text-link" href={level.href}>
                  View learning resources <EditorialJumpArrow />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-resources-section" id="academy-resources">
        <div className="academy-shell">
          <div className="academy-section-heading">
            <EditorialEyebrow>Learning Resources</EditorialEyebrow>
            <h2>Existing Academy content, organized by learning maturity.</h2>
            <p>
              The tutorials remain available. They are now organized around the
              learning outcomes that help teams build Organizational Intelligence.
            </p>
          </div>

          <div className="academy-resource-grid">
            {learningResources.map((resource) => (
              <article className="academy-resource-card" id={resource.id} key={resource.stage}>
                <p className="academy-resource-stage">{resource.stage}</p>
                <h3>{resource.title}</h3>
                <p>{resource.copy}</p>
                <ul>
                  {resource.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-live-section" id="academy-live">
        <div className="academy-shell academy-live-grid">
          <div className="academy-section-heading">
            <EditorialEyebrow>Live Learning</EditorialEyebrow>
            <h2>Learning becomes stronger when people work through real questions.</h2>
            <p>
              Live formats connect executive context, implementation practice and
              continuous learning. They help organizations apply the discipline to
              their own reality instead of only watching product instruction.
            </p>
          </div>

          <div className="academy-live-panel">
            {liveLearningFormats.map((format) => (
              <div className="academy-live-item" key={format}>
                <span aria-hidden="true" />
                <p>{format}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="academy-section academy-thinking-section" id="academy-thinking">
        <div className="academy-shell academy-thinking-panel">
          <EditorialEyebrow>Continue in Thinking</EditorialEyebrow>
          <h2>The Academy teaches. Thinking explains.</h2>
          <p>
            Continue your learning through the Theory, whitepapers, research and
            Organizational Intelligence articles that explain the management
            discipline behind the system.
          </p>
          <div className="academy-actions" aria-label="Academy Thinking actions">
            <Link className="button" href="/thinking/theory">
              Read the Theory <EditorialJumpArrow />
            </Link>
            <Link className="button secondary" href="/thinking">
              Visit Thinking <EditorialJumpArrow />
            </Link>
          </div>
        </div>
      </section>

      <EditorialSectionNavigator
        ariaLabel="Academy sections"
        sections={academySectionNavigator}
      />
    </main>
  );
}
