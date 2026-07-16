import { getPayload } from "payload";
import config from "../payload.config";

const requiredPages = [
  "home",
  "platform",
  "thinking",
  "company",
  "partners",
  "academy",
  "success-stories",
  "conversation",
];

async function main() {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: "pages",
    limit: 500,
    depth: 0,
    overrideAccess: true,
  });
  const keys = new Set(pages.docs.map((page) => page.sourceKey).filter(Boolean));
  const missing = requiredPages.filter((key) => !keys.has(key));
  const invalid = pages.docs.filter(
    (page) =>
      !page.sourceKey ||
      !page.adminTitle ||
      !page.migrationStatus ||
      page.layout.length === 0,
  );
  const [headerEN, headerDE] = await Promise.all([
    payload.findGlobal({ slug: "header", locale: "en", fallbackLocale: false }),
    payload.findGlobal({ slug: "header", locale: "de", fallbackLocale: false }),
  ]);
  const theory = await payload.count({ collection: "theory-publications" });

  if (
    missing.length ||
    invalid.length ||
    theory.totalDocs === 0 ||
    !headerEN.navItems?.length ||
    !headerDE.navItems?.length
  ) {
    console.error("CMS content verification failed.");
    if (missing.length) console.error(`Missing required sourceKeys: ${missing.join(", ")}`);
    if (invalid.length) {
      console.error(
        `Invalid pages: ${invalid.map((page) => page.sourceKey || page.id).join(", ")}`,
      );
    }
    if (!headerEN.navItems?.length) console.error("English navigation is empty.");
    if (!headerDE.navItems?.length) console.error("German navigation is empty.");
    if (theory.totalDocs === 0) console.error("Theory publication is missing.");
    process.exit(1);
  }

  console.log(
    `CMS content verified: ${pages.totalDocs} pages, theory and EN/DE navigation present.`,
  );
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
