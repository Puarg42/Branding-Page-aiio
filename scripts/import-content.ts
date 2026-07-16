/*
 * Deterministic, idempotent import of the existing file-based blog posts into
 * the Payload `publications` collection.
 *
 *   npm run content:import -- --dry-run   # report only, no writes
 *   npm run content:import                # upsert by sourceId (post slug)
 *
 * Legacy HTML bodies are stored verbatim in `bodyHtml` (rendered as-is on the
 * blog) rather than converted to Lexical — reliable and lossless for migrated
 * content. Hero images are skipped (media upload to Blob is a separate step).
 *
 * Requires a database (DATABASE_URL/POSTGRES_URL) and PAYLOAD_SECRET.
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { blogPosts } from "../app/(frontend)/blog/blog-posts";

const dryRun = process.argv.includes("--dry-run");
const importLocale = "de" as const;

function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function importContent() {
  const payload = await getPayload({ config });
  const summary = { created: 0, updated: 0, skippedImages: 0 };
  const categoryCache = new Map<string, number>();

  async function ensureCategory(title: string): Promise<number> {
    const slug = slugifyCategory(title);
    const cached = categoryCache.get(slug);
    if (cached !== undefined) return cached;

    const existing = await payload.find({
      collection: "categories",
      locale: importLocale,
      fallbackLocale: false,
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    });
    const id = existing.totalDocs
      ? (existing.docs[0].id as number)
      : ((await payload.create({
          collection: "categories",
          locale: importLocale,
          data: { title, slug },
          overrideAccess: true,
        }))
          .id as number);
    categoryCache.set(slug, id);
    return id;
  }

  for (const post of blogPosts) {
    const categoryId = post.category && !dryRun ? await ensureCategory(post.category) : undefined;
    if (post.heroImage) summary.skippedImages += 1;

    const data = {
      adminTitle: post.title,
      title: post.title,
      slug: post.slug,
      sourceId: post.slug,
      excerpt: post.excerpt,
      readingTime: post.readingTime,
      category: categoryId,
      publishedAt: post.date,
      heroImageUrl: post.heroImage,
      heroImageAlt: post.heroImageAlt,
      bodyHtml: post.contentHtml,
      translationComplete: true,
      seo: {
        title: post.seoTitle,
        description: post.seoDescription || post.excerpt,
      },
      _status: "published" as const,
    };

    const existing = await payload.find({
      collection: "publications",
      locale: importLocale,
      fallbackLocale: false,
      where: { sourceId: { equals: post.slug } },
      limit: 1,
      overrideAccess: true,
    });

    if (dryRun) {
      console.log(`${existing.totalDocs ? "update" : "create"}: ${post.slug}`);
      if (existing.totalDocs) summary.updated += 1;
      else summary.created += 1;
      continue;
    }

    if (existing.totalDocs) {
      await payload.update({
        collection: "publications",
        id: existing.docs[0].id,
        locale: importLocale,
        data,
        overrideAccess: true,
      });
      summary.updated += 1;
    } else {
      await payload.create({
        collection: "publications",
        locale: importLocale,
        data,
        overrideAccess: true,
      });
      summary.created += 1;
    }
  }

  console.log(
    `\nImport ${dryRun ? "(dry run) " : ""}complete: ` +
      `${summary.created} created, ${summary.updated} updated. ` +
      `${summary.skippedImages} hero images skipped (import media separately).`,
  );
  process.exit(0);
}

importContent().catch((error) => {
  console.error("Import failed:", error);
  process.exit(1);
});
