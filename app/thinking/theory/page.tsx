import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../../website-architecture";

export const metadata: Metadata = {
  title: "Theory | aiio",
  description: "The digital theory of Organizational Intelligence is currently being prepared.",
};

const chapters = [
  "Prologue",
  "Observation",
  "The Missing Layer",
  "Organizational Understanding",
  "Organizational Intelligence",
  "Organizational Capabilities",
  "Organizational Resilience",
  "Self-Enabling Organizations",
  "Why Now",
  "Transformation of Consulting",
  "Organizational Memory",
  "Emergence",
  "Organizational Intelligence Model",
] as const;

export default function TheoryPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="THEORY"
      intro="The digital theory is currently being prepared."
      title="Organizational Intelligence"
    >
      <section className="theory-book-section" aria-label="Theory book layout">
        <div className="website-page-shell theory-book-grid">
          <aside className="theory-toc" aria-label="Table of contents">
            <p className="website-eyebrow">Contents</p>
            <nav>
              <ol>
                {chapters.map((chapter, index) => (
                  <li key={chapter}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {chapter}
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="theory-reading-area">
            {chapters.map((chapter) => (
              <section className="theory-chapter-placeholder" key={chapter}>
                <h2>{chapter}</h2>
              </section>
            ))}
          </article>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
