import { getPayload } from "payload";
import config from "../payload.config";
import { theoryChapters } from "./fixtures/theory-content";
import { theoryPublication } from "../app/(frontend)/thinking/publication-model";

async function main() {
  const payload = await getPayload({ config });
  const data = {
    adminTitle: "Theory of Organizational Intelligence",
    title: theoryPublication.title,
    version: theoryPublication.version,
    edition: theoryPublication.edition,
    readingTime: theoryPublication.readingTime,
    chapters: theoryChapters.map((chapter) => ({
      slug: chapter.id,
      title: chapter.title,
      blocks: chapter.blocks.map((block) => ({
        type: block.type,
        text: "text" in block ? block.text : undefined,
        lines:
          "lines" in block
            ? block.lines.map((line) => ({ text: line }))
            : undefined,
      })),
    })),
    sourceProvenance: "docs/00_FOUNDATION/AIIO_OPERATING_SYSTEM.md",
    translationComplete: true,
    _status: "published" as const,
  };
  const existing = await payload.find({
    collection: "theory-publications",
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) {
    await payload.update({
      collection: "theory-publications",
      id: existing.docs[0].id,
      locale: "en",
      data,
      overrideAccess: true,
    });
    console.log("Updated Payload theory publication.");
  } else {
    await payload.create({
      collection: "theory-publications",
      locale: "en",
      data,
      overrideAccess: true,
    });
    console.log("Created Payload theory publication.");
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
