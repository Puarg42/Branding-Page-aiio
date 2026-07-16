import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const collections = [
    "users",
    "media",
    "pages",
    "authors",
    "categories",
    "publications",
    "success-stories",
    "leads",
  ] as const;
  for (const c of collections) {
    const { totalDocs } = await payload.count({ collection: c });
    console.log(`${c.padEnd(18)} ${totalDocs}`);
  }
  for (const collection of ["pages", "publications"] as const) {
    const missing = await payload.count({
      collection,
      where: { adminTitle: { exists: false } },
      overrideAccess: true,
    });
    console.log(`${`${collection} missing title`.padEnd(28)} ${missing.totalDocs}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
