import type { Metadata } from "next";
import { EditorialJumpArrow } from "../../components/brand/EditorialJumpArrow";
import { TheoryLink } from "../../components/brand/TheoryLink";
import { WebsiteArchitecturePage } from "../website-architecture";
import { theoryJournalEntries, theoryPublication } from "./publication-model";

export const metadata: Metadata = {
  title: "Thinking | aiio",
  description:
    "The living Theory Journal for Organizational Intelligence and the evolution of organizational self-understanding.",
};

const thinkingSectionNavigator = [
  { id: "thinking-hero", label: "Hero" },
  { id: "journal", label: "Journal" },
  { id: "publication", label: "Publication" },
] as const;

export default function ThinkingPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Thinking"
      heroActions={
        <TheoryLink className="website-text-link" href="/thinking/theory">
          Read the current Theory <EditorialJumpArrow />
        </TheoryLink>
      }
      heroId="thinking-hero"
      intro="Thinking is the public journal of the Theory of Organizational Intelligence. It records what changed, why it matters and which chapters were affected."
      sectionNavigator={thinkingSectionNavigator}
      sectionNavigatorLabel="Thinking sections"
      title="The Theory behind aiio's Organizational Intelligence System"
    >
      <section className="website-architecture-section thinking-journal-section" id="journal">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Theory Journal</p>
            <h2>What has changed recently at Theory?</h2>
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

            <TheoryLink className="website-text-link" href="/thinking/theory">
              Read the current Theory <EditorialJumpArrow />
            </TheoryLink>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
