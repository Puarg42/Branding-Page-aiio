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
  DEFAULT_FOOTER_LEGAL_DE,
  DEFAULT_FOOTER_NAV,
  DEFAULT_FOOTER_NAV_DE,
  DEFAULT_HEADER_NAV,
  DEFAULT_HEADER_NAV_DE,
} from "../lib/cms/navigation";
import { capabilitySpine } from "../content/capability-spine";

/** Minimal valid Lexical editor state from a plain paragraph. */
function richTextParagraph(text: string) {
  return {
    root: {
      type: "root",
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          direction: "ltr" as const,
          format: "" as const,
          indent: 0,
          version: 1,
          children: [{ type: "text", detail: 0, format: 0, mode: "normal", style: "", text, version: 1 }],
        },
      ],
    },
  };
}

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

  // 3. Pixel-neutral default theme -------------------------------------------
  const existingTheme = await payload.find({
    collection: "themes",
    where: { slug: { equals: "editorial-default" } },
    limit: 1,
    overrideAccess: true,
  });
  const themeData = {
    name: "Editorial Default",
    slug: "editorial-default",
    description: "Pixel-neutral theme seeded from the current aiio design tokens.",
    colors: {
      paper: "oklch(97% 0.008 310)",
      paper2: "oklch(95% 0.014 310)",
      ink: "oklch(22% 0.006 260)",
      ink2: "oklch(46% 0.02 315)",
      rule: "oklch(84% 0.03 305)",
      canvasDark: "oklch(11% 0.012 290)",
      onDark: "oklch(100% 0 0)",
      accent: "oklch(42% 0.15 305)",
      accentStrong: "oklch(34% 0.13 305)",
      accentInk: "oklch(100% 0 0)",
      focus: "oklch(72% 0.14 300)",
      success: "oklch(62% 0.15 150)",
      danger: "oklch(58% 0.2 25)",
      collector: "oklch(80% 0.008 265)",
      magnet: "oklch(78% 0.13 205)",
      forge: "oklch(62% 0.19 292)",
      dataforge: "oklch(80% 0.15 70)",
    },
    shape: { radiusInput: 10, radiusCard: 18, radiusPanel: 28, ruleWidth: 1 },
    motion: { fast: 180, base: 280, slow: 520, easing: "standard" as const },
    _status: "published" as const,
  };
  const theme = existingTheme.docs[0]
    ? await payload.update({
        collection: "themes",
        id: existingTheme.docs[0].id,
        data: themeData,
        overrideAccess: true,
      })
    : await payload.create({
        collection: "themes",
        data: themeData,
        overrideAccess: true,
      });

  const showcase = await payload.find({
    collection: "pages",
    where: { sourceKey: { equals: "theme-showcase" } },
    limit: 1,
    overrideAccess: true,
  });
  if (showcase.docs[0]) {
    await payload.update({
      collection: "pages",
      id: showcase.docs[0].id,
      data: { theme: theme.id },
      overrideAccess: true,
    });
  }

  // 4. Site settings defaults -------------------------------------------------
  await payload.updateGlobal({
    slug: "site-settings",
    locale: "en",
    data: {
      defaultTheme: theme.id,
      primaryCta: { label: "Request a conversation", href: "/conversation" },
      secondaryCta: { label: "Explore the platform", href: "/platform" },
    },
  });
  await payload.updateGlobal({
    slug: "site-settings",
    locale: "de",
    data: {
      defaultTheme: theme.id,
      primaryCta: { label: "Gespräch starten", href: "/gespraech" },
      secondaryCta: { label: "Plattform entdecken", href: "/plattform" },
    },
  });
  payload.logger.info("Ensured site-settings defaults.");

  await payload.updateGlobal({
    slug: "blog-settings",
    locale: "en",
    data: {
      eyebrow: "Blog & News",
      heading: "Insights for organizations that want to understand themselves.",
      intro:
        "Articles, product news and field notes on Organizational Intelligence and the evolution of work.",
      latestHeading: "The latest from aiio.",
      archiveHeading: "All Blog & News entries.",
      readLabel: "Read article",
      allLabel: "All",
      ctaHeading: "Follow the evolution of Organizational Intelligence.",
      ctaCopy:
        "For executive briefings, product updates or media requests, talk to the aiio team directly.",
    },
  });
  await payload.updateGlobal({
    slug: "blog-settings",
    locale: "de",
    data: {
      eyebrow: "Blog & News",
      heading: "Impulse für Organisationen, die sich selbst verstehen wollen.",
      intro:
        "Artikel, Produktneuigkeiten und Perspektiven zu Organizational Intelligence und der Zukunft der Arbeit.",
      latestHeading: "Neu bei aiio.",
      archiveHeading: "Alle Beiträge.",
      readLabel: "Artikel lesen",
      allLabel: "Alle",
      ctaHeading: "Verfolgen Sie die Entwicklung von Organizational Intelligence.",
      ctaCopy:
        "Für Briefings, Produktupdates oder Presseanfragen sprechen Sie direkt mit dem aiio Team.",
    },
  });

  // 4. Navigation globals (header + footer) ----------------------------------
  await payload.updateGlobal({
    slug: "header",
    locale: "en",
    data: { navItems: DEFAULT_HEADER_NAV },
  });
  await payload.updateGlobal({
    slug: "header",
    locale: "de",
    data: { navItems: DEFAULT_HEADER_NAV_DE },
  });
  await payload.updateGlobal({
    slug: "footer",
    locale: "en",
    data: { navItems: DEFAULT_FOOTER_NAV, legalItems: DEFAULT_FOOTER_LEGAL },
  });
  await payload.updateGlobal({
    slug: "footer",
    locale: "de",
    data: {
      navItems: DEFAULT_FOOTER_NAV_DE,
      legalItems: DEFAULT_FOOTER_LEGAL_DE,
    },
  });
  payload.logger.info("Ensured header/footer navigation.");

  // 5. Example block-composed page (idempotent by slug) ----------------------
  const pageSlug = "overview";
  const existingPage = await payload.find({
    collection: "pages",
    where: { slug: { equals: pageSlug } },
    limit: 1,
    overrideAccess: true,
  });
  if (existingPage.totalDocs === 0) {
    await payload.create({
      collection: "pages",
      overrideAccess: true,
      data: {
        adminTitle: "Overview",
        title: "Overview",
        slug: pageSlug,
        _status: "published",
        layout: [
          {
            blockType: "hero",
            eyebrow: "Overview",
            heading: "Organizational Intelligence, with system.",
            subheading:
              "aiio enables an organization to continuously understand itself, develop new capabilities and empower every person to make better decisions.",
            primaryCta: {
              type: "external",
              label: "Request a conversation",
              url: "/live-demo/kontakt",
            },
            secondaryCta: {
              type: "external",
              label: "Explore the platform",
              url: "/platform",
            },
          },
          {
            blockType: "featureGrid",
            eyebrow: "The capability",
            heading: "From memory to resilience.",
            items: capabilitySpine.map((step) => ({ title: step.title, copy: step.copy })),
          },
          {
            blockType: "prose",
            heading: "Why the category exists",
            content: richTextParagraph(
              "Organizations collect information, document processes and introduce AI, yet still struggle to turn all of this into coordinated action — not because information is missing, but because continuous organizational self-understanding is.",
            ),
          },
          {
            blockType: "cta",
            eyebrow: "Start",
            heading: "Start with the right conversation.",
            copy: "Explore where Organizational Intelligence can create value in your organization.",
            primaryCta: {
              type: "external",
              label: "Request a conversation",
              url: "/live-demo/kontakt",
            },
            secondaryCta: {
              type: "external",
              label: "Explore the platform",
              url: "/platform",
            },
          },
        ],
        seo: {
          title: "Overview | aiio",
          description:
            "How aiio turns organizational reality into continuous understanding and capability.",
        },
      },
    });
    payload.logger.info(`Seeded example page: /${pageSlug}`);
  } else {
    await payload.update({
      collection: "pages",
      id: existingPage.docs[0].id,
      data: {
        sourceKey: "overview",
        migrationStatus: "complete",
        migrationVersion: "seed-v1",
        legacySource: "scripts/seed.ts#overview",
      },
      overrideAccess: true,
    });
    payload.logger.info("Example page already exists — marked editor-owned.");
  }

  payload.logger.info("Seed complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
