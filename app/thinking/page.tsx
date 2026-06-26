import type { Metadata } from "next";
import Link from "next/link";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Thinking | aiio",
  description:
    "The public home for the Theory of Organizational Intelligence and the future of organizations.",
};

const researchTopics = [
  "The Theory of Organizational Intelligence",
  "Organizational Understanding",
  "Organizational Memory",
  "Organizational Capabilities",
  "Organizational Resilience",
  "Self-Enabling Organizations",
] as const;

const essays = [
  "Why BPM was never the destination",
  "The Future of Consulting",
  "Why Organizational Memory matters",
  "The emergence of Organizational Understanding",
  "Decision Quality as the new management KPI",
] as const;

const whitepapers = [
  "Executive publications",
  "Industry papers",
  "Partner papers",
] as const;

function TopicGrid({
  eyebrow,
  title,
  topics,
}: {
  eyebrow: string;
  title: string;
  topics: readonly string[];
}) {
  return (
    <section className="website-architecture-section">
      <div className="website-page-shell">
        <div className="website-section-heading">
          <p className="website-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="website-architecture-grid">
          {topics.map((topic) => (
            <article className="website-architecture-card" key={topic}>
              <h3>{topic}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ThinkingPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Thinking"
      intro="The emergence of Artificial Intelligence changes far more than software. For the first time, organizations can continuously understand themselves. This creates an entirely new management discipline: Organizational Intelligence."
      title="Ideas shape organizations. Organizations shape the future."
    >
      <section className="website-architecture-section" id="theory">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Core Thesis</p>
            <h2>
              The defining innovation of the AI era is not that machines become
              intelligent.
            </h2>
          </div>
          <div className="website-contact-panel">
            <p>
              It is that organizations can finally become understandable.
              Organizational Intelligence describes how organizations
              continuously develop better understanding, better decisions and
              continuously evolving organizational capabilities.
            </p>
            <Link
              className="website-text-link"
              href="https://github.com/Puarg42/Branding-Page-aiio/blob/feature/category-design-v1/docs/00_FOUNDATION/AIIO_OPERATING_SYSTEM.md"
            >
              Read the Theory <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <TopicGrid eyebrow="Research" title="The discipline begins here." topics={researchTopics} />
      <TopicGrid eyebrow="Essays" title="Essays on the future of organizations." topics={essays} />
      <TopicGrid eyebrow="Whitepapers" title="Publications for executives, industries and partners." topics={whitepapers} />

      <section className="website-contact-section">
        <div className="website-page-shell">
          <div className="website-contact-panel">
            <p className="website-eyebrow">Podcast</p>
            <h2>The Organizational Intelligence Podcast</h2>
            <p>Conversations about the future of organizations.</p>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
