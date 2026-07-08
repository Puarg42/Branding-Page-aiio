import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(rootDir, "docs", "00_FOUNDATION", "AIIO_OPERATING_SYSTEM.md");
const outputPath = path.join(
  rootDir,
  "app",
  "thinking",
  "theory",
  "theory-content.generated.ts",
);
const checkMode = process.argv.includes("--check");
const arrowDown = "\u2193";
const arrowRight = "\u21ba";

const modelLabels = new Set([
  "Conceptual Evolution",
  "Conceptual Interpretation",
  "Conceptual Model",
  "Conceptual Progression",
  "Conceptual Relationship",
]);

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTheoryText(value) {
  return value
    .replace(/\r\n/g, "\n")
    .replaceAll("â†“", arrowDown)
    .replaceAll("â†º", arrowRight)
    .replaceAll("Ã¢â€ â€œ", arrowDown)
    .replaceAll("Ã¢â€ Âº", arrowRight);
}

function isModelStart(chunks, index) {
  const current = chunks[index];
  const upcoming = chunks.slice(index + 1, index + 5);

  return (
    (modelLabels.has(current) || isModelLine(current)) &&
    (!/[.!?]$/.test(current) &&
      upcoming.some((line) => line === arrowDown || line === "+" || line === arrowRight))
  );
}

function isModelLine(line) {
  return (
    line === "+" ||
    line === arrowDown ||
    line === arrowRight ||
    modelLabels.has(line) ||
    (!/[.!?]$/.test(line) && line.length <= 86) ||
    /^".+"$/.test(line)
  );
}

function stripStrongMarkers(value) {
  return value.replace(/^\*\*/, "").replace(/\*\*$/, "");
}

function isStrongStatement(value) {
  return value.startsWith("**") && value.endsWith("**");
}

function shouldFlushParagraph(buffer, chunks, index) {
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

function pushParagraph(blocks, buffer) {
  if (buffer.length === 0) {
    return;
  }

  blocks.push({
    text: buffer.join(" "),
    type: "paragraph",
  });
  buffer.length = 0;
}

function getCanonicalTheoryChapterId(title, fallbackId) {
  const titleWithoutNumber = title.replace(/^\d+\.\s*/, "");
  const canonicalIds = {
    "Reference Architecture for Organizational Intelligence": "reference-architecture-for-organizational-intelligence",
    "The Missing Capability": "2-the-missing-layer",
    "Organizational Capabilities": "organizational-capabilities",
    "Organizational Intelligence": "organizational-intelligence",
    "Organizational Resilience": "organizational-resilience",
    "Organizational Self-Empowering": "organizational-self-empowering",
    "Organizational Self-Empowerment": "organizational-self-empowering",
    "Organizational Self-Understanding": "organizational-self-understanding",
    "Organizational Understanding": "organizational-understanding",
    "Self-Empowering Organization": "organizational-self-empowering",
    "Self-Empowering Organizations": "organizational-self-empowering",
  };

  return canonicalIds[titleWithoutNumber] ?? fallbackId;
}

function getDisplayTheoryChapterTitle(title) {
  return title.replace(/^\d+\.\s*/, "");
}

function getTheoryChapters() {
  const source = normalizeTheoryText(readFileSync(sourcePath, "utf8"));

  return source
    .split(/^# /m)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const [titleLine, ...contentLines] = section.split("\n");
      const sourceTitle = titleLine.trim();
      const title = getDisplayTheoryChapterTitle(sourceTitle);
      const chunks = contentLines
        .join("\n")
        .split(/\n{2,}/)
        .map((chunk) => chunk.trim())
        .filter(Boolean)
        .filter((chunk) => chunk !== "--------------------------------------------------");
      const blocks = [];
      const paragraphBuffer = [];

      for (let index = 0; index < chunks.length; index += 1) {
        const chunk = chunks[index];

        if (isModelStart(chunks, index)) {
          pushParagraph(blocks, paragraphBuffer);

          const lines = [];

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
        id: getCanonicalTheoryChapterId(sourceTitle, slugify(sourceTitle)),
        title,
      };
    });
}

const generated = `/* This file is generated by scripts/compile-theory.mjs. Do not edit manually. */

export const theoryChapters = ${JSON.stringify(getTheoryChapters(), null, 2)} as const;
`;

if (checkMode) {
  const current = readFileSync(outputPath, "utf8");

  if (current !== generated) {
    console.error("Theory content is stale. Run npm run theory:compile.");
    process.exit(1);
  }

  console.log("Theory content is up to date.");
} else {
  writeFileSync(outputPath, generated);
  console.log(`Generated ${path.relative(rootDir, outputPath)}`);
}
