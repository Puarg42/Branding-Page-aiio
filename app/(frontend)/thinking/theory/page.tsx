import type { Metadata } from "next";
import {
  EditorialProgression,
  type EditorialProgressionItem,
} from "@/components/brand/EditorialProgression";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { ExecutiveCTA } from "@/components/brand/ExecutiveCTA";
import { theoryChapters } from "./theory-content.generated";
import { TheorySidebar } from "./theory-sidebar";

export const metadata: Metadata = {
  alternates: { canonical: "/thinking/theory" },
  title: "Theory | aiio",
  description: "Read the digital theory of Organizational Intelligence.",
};

const arrowDown = "\u2193";
const arrowRight = "\u21ba";

const modelLabels = new Set([
  "Conceptual Distinction",
  "Conceptual Evolution",
  "Conceptual Interpretation",
  "Conceptual Model",
  "Conceptual Progression",
  "Conceptual Relationship",
]);

function renderOpeningSentence(text: string, isOpening: boolean) {
  if (!isOpening) {
    return text;
  }

  const match = text.match(/^(.+?[.!?])(\s+.*)?$/);

  if (!match) {
    return <span className="theory-opening-sentence">{text}</span>;
  }

  return (
    <>
      <span className="theory-opening-sentence">{match[1]}</span>
      {match[2] ?? ""}
    </>
  );
}

function getTheoryModelTone(value: string): EditorialProgressionItem["tone"] {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("data") ||
    normalized.includes("information") ||
    normalized.includes("knowledge") ||
    normalized.includes("experience")
  ) {
    return "graphite";
  }

  if (
    normalized.includes("understanding") ||
    normalized.includes("memory") ||
    normalized.includes("context")
  ) {
    return "cyan";
  }

  if (
    normalized.includes("intelligence") ||
    normalized.includes("action") ||
    normalized.includes("capabilit")
  ) {
    return "purple";
  }

  if (
    normalized.includes("resilience") ||
    normalized.includes("self-empowering") ||
    normalized.includes("evolution") ||
    normalized.includes("improvement")
  ) {
    return "amber";
  }

  return "white";
}

function getTheoryModelItems(lines: readonly string[]): EditorialProgressionItem[] {
  const items: EditorialProgressionItem[] = [];
  let connectorBefore = arrowDown;

  lines.forEach((line) => {
    if (modelLabels.has(line)) {
      return;
    }

    if (line === "+" || line === arrowDown || line === arrowRight) {
      connectorBefore = line === "+" ? "+" : line === arrowRight ? arrowRight : arrowDown;
      return;
    }

    items.push({
      connectorBefore: items.length === 0 ? undefined : connectorBefore,
      label: line,
      tone: getTheoryModelTone(line),
    });
    connectorBefore = arrowDown;
  });

  return items;
}

function getTheoryModelTitle(lines: readonly string[]) {
  const title = lines.find((line) => modelLabels.has(line));

  return title ? `${title}:` : "Conceptual Model:";
}

function isCircularTheoryModel(lines: readonly string[]) {
  return lines.some((line) => line === arrowRight) &&
    lines.some((line) => line.toLowerCase().includes("creates new knowledge"));
}

const chapters = theoryChapters;
const sidebarChapters = chapters.map(({ id, title }) => ({ id, title }));

export default function TheoryPage() {
  return (
    <main className="theory-book-page">
      <div className="theory-book-layout">
        <TheorySidebar chapters={sidebarChapters} />

        <div className="theory-book-main">
          <section className="theory-book-hero" id="theory-hero" aria-label="Theory introduction">
            <div className="theory-book-hero-artwork" aria-hidden="true">
              <img
                alt=""
                className="theory-book-hero-image"
                loading="eager"
                src="/brand-canon/001-organizational-mind-theory-neu.png"
              />
              <div className="theory-book-hero-shade" />
            </div>
            <div className="theory-book-hero-content">
              <EditorialEyebrow>Theory</EditorialEyebrow>
              <h1>Organizational Intelligence</h1>
              <p>The Theory of Organizational Intelligence</p>
            </div>
          </section>

          <article className="theory-reading-area" aria-label="Theory chapters">
            {chapters.map((chapter, chapterIndex) => (
              <section className="theory-chapter" id={chapter.id} key={chapter.id}>
                <div className="theory-chapter-marker">
                  <span>{`T${String(chapterIndex).padStart(2, "0")}`}</span>
                  <i aria-hidden="true" />
                </div>
                <h2>{chapter.title}</h2>
                <div className="theory-chapter-body">
                  {chapter.blocks.map((block, index) => {
                    const firstTextBlockIndex = chapter.blocks.findIndex(
                      (chapterBlock) => chapterBlock.type !== "model",
                    );
                    const openingClassName = index === firstTextBlockIndex ? " is-opening" : "";

                    return block.type === "model" ? (
                      <div
                        className={`theory-formula-shell${
                          isCircularTheoryModel(block.lines) ? " is-circular" : ""
                        }`}
                        key={`${chapter.id}-model-${index}`}
                      >
                        <p className="theory-formula-heading">
                          {getTheoryModelTitle(block.lines)}
                        </p>
                        <EditorialProgression
                          ariaLabel={`${chapter.title} conceptual model`}
                          className="theory-formula"
                          items={getTheoryModelItems(block.lines)}
                        />
                      </div>
                    ) : block.type === "quote" ? (
                      <blockquote className={openingClassName.trim()} key={`${chapter.id}-quote-${index}`}>
                        <span aria-hidden="true">&ldquo;</span>
                        <p>{block.text}</p>
                      </blockquote>
                    ) : (
                      <p className={openingClassName.trim()} key={`${chapter.id}-paragraph-${index}`}>
                        {renderOpeningSentence(block.text, Boolean(openingClassName))}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </article>
          <ExecutiveCTA
            copy="See how Organizational Intelligence becomes operational inside real organizations."
            headline="Turn theory into organizational reality."
            primary={{ href: "/live-demo/kontakt", label: "Request a conversation" }}
            secondary={{ href: "/platform", label: "Explore the Platform" }}
          />
        </div>
      </div>
    </main>
  );
}
