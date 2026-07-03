import type { Metadata } from "next";
import Link from "next/link";
import { EditorialJumpArrow } from "../../components/brand/EditorialJumpArrow";
import { WebsiteArchitecturePage } from "../website-architecture";
import { theoryEditorialRules, theoryJournalEntries, theoryPublication } from "./publication-model";

export const metadata: Metadata = {
  title: "Thinking | aiio",
  description:
    "The living Theory Journal for Organizational Intelligence and the evolution of organizational self-understanding.",
};

const thinkingSectionNavigator = [
  { id: "thinking-hero", label: "Hero" },
  { id: "journal", label: "Journal" },
  { id: "publication", label: "Publication" },
  { id: "editorial-model", label: "Editorial" },
] as const;

export default function ThinkingPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Thinking"
      heroId="thinking-hero"
      intro="Thinking is the public journal of the Theory of Organizational Intelligence. It records what changed, why it matters and which chapters were affected."
      sectionNavigator={thinkingSectionNavigator}
      sectionNavigatorLabel="Thinking sections"
      title="The theory evolves in public."
    >
      <section className="website-architecture-section thinking-journal-section" id="journal">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Theory Journal</p>
            <h2>What changed in the theory?</h2>
          </div>

          <div className="thinking-journal-list">
            {theoryJournalEntries.map((entry) => (
              <article className="thinking-journal-entry" key={entry.version}>
                <div className="thinking-journal-entry-header">
                  <span>Version {entry.version}</span>
                  <time>{entry.date}</time>
                </div>

                <div className="thinking-journal-entry-body">
                  <div>
                    <p className="thinking-journal-label">New Core Thesis</p>
                    <h3>{entry.coreThesis}</h3>
                  </div>

                  <div className="thinking-journal-detail">
                    <p className="thinking-journal-label">Why it matters</p>
                    <p>{entry.whyItMatters}</p>
                  </div>

                  <div className="thinking-journal-detail">
                    <p className="thinking-journal-label">Affected Theory Chapters</p>
                    <ul>
                      {entry.affectedChapters.map((chapter) => (
                        <li key={chapter.id}>{chapter.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="website-architecture-section thinking-publication-section" id="publication">
        <div className="website-page-shell thinking-publication-grid">
          <div className="website-section-heading">
            <p className="website-eyebrow">Current Publication</p>
            <h2>The consolidated theory lives here.</h2>
          </div>

          <div className="thinking-publication-card">
            <div className="thinking-publication-meta">
              <span>{theoryPublication.title}</span>
              <span>{theoryPublication.version}</span>
              <span>{theoryPublication.edition}</span>
              <span>Last updated {theoryPublication.lastUpdated}</span>
              <span>{theoryPublication.readingTime}</span>
            </div>

            <p>
              Thinking documents the evolution. The Theory page contains the current consolidated
              state of the publication.
            </p>

            <Link className="website-text-link" href="/thinking/theory">
              Read the current Theory <EditorialJumpArrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="website-contact-section thinking-editorial-section" id="editorial-model">
        <div className="website-page-shell">
          <div className="website-contact-panel thinking-editorial-panel">
            <div>
              <p className="website-eyebrow">Editorial Model</p>
              <h2>Every revision has a visible trace.</h2>
            </div>

            <ol>
              {theoryEditorialRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
