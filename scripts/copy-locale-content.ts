/**
 * Copy localized DE content into empty EN slots without overwriting existing
 * English content. Safe and idempotent.
 *
 * Copied Pages/Publications remain `translationComplete: false` so editors can
 * distinguish fallback copies from human-reviewed translations.
 *
 * Run: dotenv -e .env.local -- tsx scripts/copy-locale-content.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

const sourceLocale = "de" as const;
const targetLocale = "en" as const;

type Collection =
  | "pages"
  | "publications"
  | "categories"
  | "authors"
  | "media"
  | "success-stories";

type Rule = {
  collection: Collection;
  sentinel: string;
  fields: string[];
  markIncomplete?: boolean;
};

const rules: Rule[] = [
  {
    collection: "pages",
    sentinel: "title",
    fields: ["title", "slug", "layout", "seo"],
    markIncomplete: true,
  },
  {
    collection: "publications",
    sentinel: "title",
    fields: [
      "title",
      "slug",
      "excerpt",
      "readingTime",
      "category",
      "authors",
      "heroImage",
      "heroImageUrl",
      "heroImageAlt",
      "body",
      "bodyHtml",
      "seo",
    ],
    markIncomplete: true,
  },
  {
    collection: "categories",
    sentinel: "title",
    fields: ["title", "slug"],
  },
  {
    collection: "authors",
    sentinel: "role",
    fields: ["role", "bio", "avatar"],
  },
  {
    collection: "media",
    sentinel: "alt",
    fields: ["alt", "caption", "video"],
  },
  {
    collection: "success-stories",
    sentinel: "slug",
    fields: [
      "industry",
      "slug",
      "challenge",
      "action",
      "result",
      "proofPoints",
      "logo",
    ],
  },
];

function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

function cloneLocalizedValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(cloneLocalizedValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
        .map(([key, child]) => [key, cloneLocalizedValue(child)]),
    );
  }
  return value;
}

function pick(source: Record<string, unknown>, fields: string[]) {
  return Object.fromEntries(
    fields
      .filter((field) => !isEmpty(source[field]))
      .map((field) => [field, cloneLocalizedValue(source[field])]),
  );
}

async function copyCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  rule: Rule,
) {
  let page = 1;
  let copied = 0;
  let skipped = 0;

  while (true) {
    const source = await payload.find({
      collection: rule.collection,
      locale: sourceLocale,
      fallbackLocale: false,
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    });

    for (const sourceDoc of source.docs as unknown as Array<
      Record<string, unknown>
    >) {
      const id = sourceDoc.id as number;
      const targetDoc = (await payload.findByID({
        collection: rule.collection,
        id,
        locale: targetLocale,
        fallbackLocale: false,
        depth: 0,
        overrideAccess: true,
      })) as unknown as Record<string, unknown>;

      if (!isEmpty(targetDoc[rule.sentinel])) {
        skipped += 1;
        continue;
      }

      const data: Record<string, unknown> = pick(sourceDoc, rule.fields);
      if (rule.markIncomplete) data.translationComplete = false;
      if (Object.keys(data).length === 0) {
        skipped += 1;
        continue;
      }

      await payload.update({
        collection: rule.collection,
        id,
        locale: targetLocale,
        data: data as never,
        overrideAccess: true,
      });
      copied += 1;
    }

    if (!source.hasNextPage) break;
    page += 1;
  }

  return { copied, skipped };
}

async function copyGlobal(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: "header" | "footer" | "site-settings",
  sentinel: string,
  fields: string[],
) {
  const [source, target] = await Promise.all([
    payload.findGlobal({
      slug,
      locale: sourceLocale,
      fallbackLocale: false,
      depth: 0,
    }),
    payload.findGlobal({
      slug,
      locale: targetLocale,
      fallbackLocale: false,
      depth: 0,
    }),
  ]);
  const targetRecord = target as unknown as Record<string, unknown>;
  if (!isEmpty(targetRecord[sentinel])) return { copied: 0, skipped: 1 };
  await payload.updateGlobal({
    slug,
    locale: targetLocale,
    data: pick(source as unknown as Record<string, unknown>, fields) as never,
  });
  return { copied: 1, skipped: 0 };
}

async function main() {
  const payload = await getPayload({ config });
  let total = 0;

  for (const rule of rules) {
    const result = await copyCollection(payload, rule);
    total += result.copied;
    console.log(
      `${rule.collection}: ${result.copied} copied, ${result.skipped} preserved`,
    );
  }

  for (const global of [
    { slug: "header" as const, sentinel: "navItems", fields: ["navItems"] },
    {
      slug: "footer" as const,
      sentinel: "navItems",
      fields: ["navItems", "legalItems"],
    },
    {
      slug: "site-settings" as const,
      sentinel: "primaryCta",
      fields: ["primaryCta", "secondaryCta", "announcement"],
    },
  ]) {
    const result = await copyGlobal(
      payload,
      global.slug,
      global.sentinel,
      global.fields,
    );
    total += result.copied;
    console.log(
      `${global.slug}: ${result.copied} copied, ${result.skipped} preserved`,
    );
  }

  console.log(`Done: ${total} localized records copied DE → EN.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
