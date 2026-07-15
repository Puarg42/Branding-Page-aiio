/*
 * Idempotent seed: safe to run repeatedly.
 *
 *  - Creates the first admin user from PAYLOAD_BOOTSTRAP_ADMIN_EMAIL /
 *    PAYLOAD_BOOTSTRAP_ADMIN_PASSWORD when no users exist yet.
 *  - Ensures baseline categories exist (by slug).
 *  - Ensures the SiteSettings global has sane defaults.
 *
 * Run via `npm run db:seed` (which injects .env.local through dotenv-cli).
 */
import { getPayload } from "payload";
import config from "../payload.config";
import {
  DEFAULT_FOOTER_LEGAL,
  DEFAULT_FOOTER_NAV,
  DEFAULT_HEADER_NAV,
} from "../lib/cms/navigation";

const baselineCategories = [
  { title: "Organizational Intelligence", slug: "organizational-intelligence" },
  { title: "Category & Strategy", slug: "category-strategy" },
  { title: "Product & Platform", slug: "product-platform" },
];

async function seed() {
  const payload = await getPayload({ config });

  // 1. First admin -----------------------------------------------------------
  const existingUsers = await payload.count({ collection: "users" });
  const adminEmail = process.env.PAYLOAD_BOOTSTRAP_ADMIN_EMAIL;
  const adminPassword = process.env.PAYLOAD_BOOTSTRAP_ADMIN_PASSWORD;

  if (existingUsers.totalDocs === 0) {
    if (adminEmail && adminPassword) {
      await payload.create({
        collection: "users",
        data: { email: adminEmail, password: adminPassword, name: "aiio Admin", role: "admin" },
      });
      payload.logger.info(`Created first admin user: ${adminEmail}`);
    } else {
      payload.logger.warn(
        "No users exist and PAYLOAD_BOOTSTRAP_ADMIN_EMAIL/PASSWORD are unset — skipping admin creation.",
      );
    }
  } else {
    payload.logger.info("Users already exist — skipping admin creation.");
  }

  // 2. Categories (idempotent by slug) ---------------------------------------
  for (const category of baselineCategories) {
    const found = await payload.find({
      collection: "categories",
      where: { slug: { equals: category.slug } },
      limit: 1,
    });
    if (found.totalDocs === 0) {
      await payload.create({ collection: "categories", data: category });
      payload.logger.info(`Seeded category: ${category.slug}`);
    }
  }

  // 3. Site settings defaults -------------------------------------------------
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      primaryCta: { label: "Request a conversation", href: "/live-demo/kontakt" },
      secondaryCta: { label: "Explore the platform", href: "/platform" },
    },
  });
  payload.logger.info("Ensured site-settings defaults.");

  // 4. Navigation globals (header + footer) ----------------------------------
  await payload.updateGlobal({
    slug: "header",
    data: { navItems: DEFAULT_HEADER_NAV },
  });
  await payload.updateGlobal({
    slug: "footer",
    data: { navItems: DEFAULT_FOOTER_NAV, legalItems: DEFAULT_FOOTER_LEGAL },
  });
  payload.logger.info("Ensured header/footer navigation.");

  payload.logger.info("Seed complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
