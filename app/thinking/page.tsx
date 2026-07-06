import type { Metadata } from "next";
import {
  EditorialCard,
  EditorialSection,
  EditorialSectionHeader,
} from "../../components/brand/BrandCanonFoundation";
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
      <EditorialSection
        className="website-architecture-section thinking-journal-section"
        id="journal"
        shellClassName="website-page-shell"
      >
          <EditorialSectionHeader
            className="website-section-heading"
            eyebrow="Theory Journal"
            title="What has changed recently at Theory?"
          />

          <div className="thinking-journal-list">
            {theoryJournalEntries.map((entry) => (
              <EditorialCard className="thinking-journal-entry" key={entry.version}>
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
              </EditorialCard>
            ))}
          </div>
      </EditorialSection>

      <EditorialSection
        className="website-architecture-section thinking-publication-section"
        id="publication"
        shellClassName="website-page-shell thinking-publication-grid"
      >
          <EditorialCard className="thinking-publication-card">
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
          </EditorialCard>
      </EditorialSection>
    </WebsiteArchitecturePage>
  );
}
