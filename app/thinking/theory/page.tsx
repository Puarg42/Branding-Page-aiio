import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { TheorySidebar } from "./theory-sidebar";

export const metadata: Metadata = {
  title: "Theory | aiio",
  description: "Read the digital theory of Organizational Intelligence.",
};

type TheoryBlock =
  | {
      lines: string[];
      type: "model";
    }
  | {
      text: string;
      type: "paragraph" | "quote";
    };

type TheoryChapter = {
  blocks: TheoryBlock[];
  id: string;
  title: string;
};

const modelLabels = new Set([
  "Conceptual Evolution",
  "Conceptual Interpretation",
  "Conceptual Model",
  "Conceptual Progression",
  "Conceptual Relationship",
]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTheoryText(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replaceAll("â†“", "↓")
    .replaceAll("â†º", "↺")
    .replaceAll("Ã¢â€ â€œ", "↓")
    .replaceAll("Ã¢â€ Âº", "↺");
}

function isModelStart(chunks: string[], index: number) {
  const current = chunks[index];
  const upcoming = chunks.slice(index + 1, index + 5);

  return (
    modelLabels.has(current) ||
    (!/[.!?]$/.test(current) &&
      upcoming.some((line) => line === "↓" || line === "+" || line === "↺"))
  );
}

function isModelLine(line: string) {
  return (
    line === "+" ||
    line === "↓" ||
    line === "↺" ||
    modelLabels.has(line) ||
    (!/[.!?]$/.test(line) && line.length <= 86) ||
    /^".+"$/.test(line)
  );
}

function stripStrongMarkers(value: string) {
  return value.replace(/^\*\*/, "").replace(/\*\*$/, "");
}

function isStrongStatement(value: string) {
  return value.startsWith("**") && value.endsWith("**");
}

function shouldFlushParagraph(buffer: string[], chunks: string[], index: number) {
  const text = buffer.join(" ");
  const next = chunks[index + 1];

  if (!next) {
    return true;
  }

  if (text.length >= 360) {
    return true;
  }

  if (buffer.length >= 3 && text.length >= 220) {
    return true;
  }

  if (isModelStart(chunks, index + 1) || isStrongStatement(next)) {
    return true;
  }

  return false;
}

function pushParagraph(blocks: TheoryBlock[], buffer: string[]) {
  if (buffer.length === 0) {
    return;
  }

  blocks.push({
    text: buffer.join(" "),
    type: "paragraph",
  });
  buffer.length = 0;
}

function getTheoryChapters(): TheoryChapter[] {
  const sourcePath = path.join(process.cwd(), "docs", "00_FOUNDATION", "AIIO_OPERATING_SYSTEM.md");
  const source = normalizeTheoryText(readFileSync(sourcePath, "utf8"));

  return source
    .split(/^# /m)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const [titleLine, ...contentLines] = section.split("\n");
      const title = titleLine.trim();
      const chunks = contentLines
        .join("\n")
        .split(/\n{2,}/)
        .map((chunk) => chunk.trim())
        .filter(Boolean)
        .filter((chunk) => chunk !== "--------------------------------------------------");
      const blocks: TheoryBlock[] = [];
      const paragraphBuffer: string[] = [];

      for (let index = 0; index < chunks.length; index += 1) {
        const chunk = chunks[index];

        if (isModelStart(chunks, index)) {
          pushParagraph(blocks, paragraphBuffer);

          const lines: string[] = [];

          while (index < chunks.length && isModelLine(chunks[index])) {
            lines.push(chunks[index]);
            index += 1;
          }

          blocks.push({ lines, type: "model" });
          index -= 1;
          continue;
        }

        if (isStrongStatement(chunk)) {
          pushParagraph(blocks, paragraphBuffer);
          blocks.push({ text: stripStrongMarkers(chunk), type: "quote" });
          continue;
        }

        paragraphBuffer.push(chunk);

        if (shouldFlushParagraph(paragraphBuffer, chunks, index)) {
          pushParagraph(blocks, paragraphBuffer);
        }
      }

      pushParagraph(blocks, paragraphBuffer);

      if (title === "Prologue" && blocks[0]?.type === "paragraph") {
        blocks[0] = {
          text: blocks[0].text,
          type: "quote",
        };
      }

      return {
        blocks,
        id: slugify(title),
        title,
      };
    });
}

const chapters = getTheoryChapters();
const sidebarChapters = chapters.map(({ id, title }) => ({ id, title }));

export default function TheoryPage() {
  return (
    <main className="theory-book-page">
      <div className="theory-book-layout">
        <TheorySidebar chapters={sidebarChapters} />

        <div className="theory-book-main">
          <section className="theory-book-hero" aria-label="Theory introduction">
            <div className="theory-book-hero-content">
              <p className="theory-sidebar-eyebrow">Theory</p>
              <h1>Organizational Intelligence</h1>
              <p>A Theory of Organizational Understanding</p>
            </div>
            <div className="theory-book-hero-artwork" aria-hidden="true">
              <img
                alt=""
                className="theory-book-hero-image"
                loading="eager"
                src="/brand-canon/001-organizational-mind-theory.png"
              />
              <div className="theory-book-hero-shade" />
            </div>
          </section>

          <article className="theory-reading-area" aria-label="Theory chapters">
            {chapters.map((chapter, chapterIndex) => (
              <section className="theory-chapter" id={chapter.id} key={chapter.id}>
                <div className="theory-chapter-marker">
                  <span>{String(chapterIndex + 1).padStart(2, "0")}</span>
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
                      <div className="theory-formula" key={`${chapter.id}-model-${index}`}>
                        {block.lines.map((line, lineIndex) => (
                          <span key={`${chapter.id}-model-${index}-${lineIndex}`}>{line}</span>
                        ))}
                      </div>
                    ) : block.type === "quote" ? (
                      <blockquote className={openingClassName.trim()} key={`${chapter.id}-quote-${index}`}>
                        <span aria-hidden="true">&ldquo;</span>
                        <p>{block.text}</p>
                      </blockquote>
                    ) : (
                      <p className={openingClassName.trim()} key={`${chapter.id}-paragraph-${index}`}>
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
