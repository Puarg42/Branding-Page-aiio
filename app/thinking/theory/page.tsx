import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../../website-architecture";

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
      type: "paragraph";
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
    .replaceAll("â†º", "↺");
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

      for (let index = 0; index < chunks.length; index += 1) {
        const chunk = chunks[index];

        if (isModelStart(chunks, index)) {
          const lines: string[] = [];

          while (index < chunks.length && isModelLine(chunks[index])) {
            lines.push(chunks[index]);
            index += 1;
          }

          blocks.push({ lines, type: "model" });
          index -= 1;
          continue;
        }

        blocks.push({ text: chunk, type: "paragraph" });
      }

      return {
        blocks,
        id: slugify(title),
        title,
      };
    });
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

const chapters = getTheoryChapters();

export default function TheoryPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="THEORY"
      intro="A long-form reading experience for the emerging theory of Organizational Intelligence."
      title="Organizational Intelligence"
    >
      <section className="theory-book-section" aria-label="Theory book layout">
        <div className="website-page-shell theory-book-grid">
          <aside className="theory-toc" aria-label="Table of contents">
            <p className="website-eyebrow">Contents</p>
            <nav>
              <ol>
                {chapters.map((chapter, index) => (
                  <li key={chapter.id}>
                    <a href={`#${chapter.id}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="theory-toc-title">{chapter.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="theory-reading-area">
            {chapters.map((chapter) => (
              <section className="theory-chapter-placeholder" id={chapter.id} key={chapter.id}>
                <h2>{chapter.title}</h2>
                {chapter.blocks.map((block, index) =>
                  block.type === "model" ? (
                    <div className="theory-formula" key={`${chapter.id}-model-${index}`}>
                      {block.lines.map((line, lineIndex) => (
                        <span key={`${chapter.id}-model-${index}-${lineIndex}`}>{line}</span>
                      ))}
                    </div>
                  ) : (
                    <p key={`${chapter.id}-paragraph-${index}`}>{renderInline(block.text)}</p>
                  ),
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
