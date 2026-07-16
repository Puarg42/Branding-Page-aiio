/**
 * Idempotently migrates every existing content route into Payload Pages.
 *
 * Existing English flagship pages become EN documents with DE localized slugs
 * that fall back to the EN layout until a human translation is supplied.
 * Existing German resource/legal/layer pages become DE documents.
 */
import { createHash } from "node:crypto";
import { getPayload } from "payload";
import config from "../payload.config";
import { capabilitySpine } from "../content/capability-spine";
import { resourcePages } from "../app/(frontend)/resource-pages";
import { layers } from "../app/(frontend)/site-content";
import {
  companyAwards,
  companyExperts,
  companyLeadership,
  companyPrinciples,
  storyMilestones,
} from "../app/(frontend)/company/page";
import { partnerRoles } from "../app/(frontend)/partners/page";
import {
  learningFormats,
  learningModules,
} from "../app/(frontend)/academy/page";
import type { Locale } from "../lib/i18n/config";

const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");
const migrationVersion = "cms-parity-v2";

function hash(value: unknown) {
  return createHash("sha256")
    .update(JSON.stringify(value))
    .digest("hex");
}

type AnyBlock = Record<string, unknown> & { blockType: string };
type PageSeed = {
  sourceKey: string;
  pageType?: string;
  locales: Partial<
    Record<
      Locale,
      {
        title: string;
        slug: string;
        layout?: AnyBlock[];
        description?: string;
        translationComplete?: boolean;
      }
    >
  >;
};

const cta = (locale: Locale): AnyBlock => ({
  blockType: "cta",
  eyebrow: locale === "de" ? "Start" : "Start",
  heading:
    locale === "de"
      ? "Beginnen Sie mit dem richtigen Gespräch."
      : "Start with the right conversation.",
  copy:
    locale === "de"
      ? "Gemeinsam klären wir, wo Organizational Intelligence Wert schafft."
      : "Explore where Organizational Intelligence can create value in your organization.",
  primaryCta: {
    type: "external",
    label: locale === "de" ? "Gespräch starten" : "Request a conversation",
    url: locale === "de" ? "/gespraech" : "/conversation",
  },
  secondaryCta: {
    type: "external",
    label: locale === "de" ? "Plattform entdecken" : "Explore the platform",
    url: locale === "de" ? "/plattform" : "/platform",
  },
});

const englishPages: PageSeed[] = [
  {
    sourceKey: "home",
    pageType: "home",
    locales: {
      en: {
        title: "Home",
        slug: "home",
        translationComplete: true,
        description: "Build organizations that continuously understand themselves.",
        layout: [
          {
            blockType: "hero",
            heading: "The future belongs to organizations that understand themselves.",
            subheading:
              "aiio enables an organization to continuously understand itself, develop new capabilities and empower every person to make better decisions.",
            primaryCta: {
              type: "external",
              label: "Explore the platform",
              url: "/platform",
            },
            secondaryCta: {
              type: "external",
              label: "Request a conversation",
              url: "/conversation",
            },
          },
          { blockType: "trustLogos" },
          { blockType: "realityCheck" },
          { blockType: "categoryEvolution" },
          {
            blockType: "statement",
            eyebrow: "The missing capability",
            heading: "Continuous organizational self-understanding.",
            copy:
              "Organizations need a foundation that makes context continuously understandable before decisions depend on scattered memory.",
            tone: "dark",
          },
          {
            blockType: "brandIllustration",
            heading: "The Organizational Intelligence System.",
            copy:
              "It connects organizational reality, context, decisions and action into one foundation for continuous capability development.",
            variant: "BC-002",
          },
          { blockType: "capabilityJourney" },
          {
            blockType: "outcomeList",
            eyebrow: "Business impact",
            heading: "A more resilient organization creates better work.",
            items: [
              { copy: "Faster decisions." },
              { copy: "Less rework." },
              { copy: "Stronger execution." },
              { copy: "More resilience." },
            ],
          },
          {
            blockType: "cardGrid",
            eyebrow: "Enterprise trust",
            heading: "Built for complex, knowledge-intensive environments.",
            cards: [
              {
                title: "Enterprise complexity",
                copy: "For decisions that depend on context, ownership and operational reality.",
                kind: "evidence",
              },
              {
                title: "Organizational Intelligence",
                copy: "A category foundation for making organizational context continuously usable.",
                kind: "evidence",
              },
              {
                title: "People · Teams · AI",
                copy: "One shared organizational context for humans, teams and intelligent systems.",
                kind: "evidence",
              },
            ],
          },
          cta("en"),
        ],
      },
      de: {
        title: "Startseite",
        slug: "start",
        translationComplete: false,
      },
    },
  },
  {
    sourceKey: "platform",
    pageType: "platform",
    locales: {
      en: {
        title: "Platform",
        slug: "platform",
        translationComplete: true,
        description:
          "One Organizational Intelligence System with four complementary capabilities.",
        layout: [
          {
            blockType: "hero",
            eyebrow: "Platform",
            heading: "One system. Four organizational capabilities.",
            subheading:
              "From Organizational Memory to continuous self-understanding, activation and resilience.",
          },
          {
            blockType: "featureGrid",
            eyebrow: "The journey",
            heading: "How aiio creates organizational capabilities.",
            items: capabilitySpine.map((step) => ({
              title: step.title,
              copy: step.copy,
            })),
          },
          {
            blockType: "cardGrid",
            heading: "The system capabilities.",
            cards: [
              {
                title: "ProcessCollector",
                copy: "Build durable Organizational Memory.",
                link: { type: "external", label: "Explore", url: "/collector" },
                kind: "capability",
              },
              {
                title: "ProcessMagnet",
                copy: "Create continuous Organizational Self-Understanding.",
                link: { type: "external", label: "Explore", url: "/magnet" },
                kind: "capability",
              },
              {
                title: "ProcessForge",
                copy: "Turn understanding into reusable capabilities.",
                link: { type: "external", label: "Explore", url: "/forge" },
                kind: "capability",
              },
            ],
          },
          { blockType: "brandIllustration", variant: "BC-002" },
          {
            blockType: "statement",
            eyebrow: "Theory",
            heading: "The platform operationalizes Organizational Intelligence.",
            copy:
              "Every capability connects product architecture to the Theory of Organizational Intelligence.",
            tone: "dark",
          },
          cta("en"),
        ],
      },
      de: { title: "Plattform", slug: "plattform", translationComplete: false },
    },
  },
  {
    sourceKey: "thinking",
    pageType: "thinking",
    locales: {
      en: {
        title: "Thinking",
        slug: "thinking",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Thinking",
            heading: "A theory for organizations that want to understand themselves.",
          },
          { blockType: "theoryReader" },
          cta("en"),
        ],
      },
      de: { title: "Denken", slug: "denken", translationComplete: false },
    },
  },
  {
    sourceKey: "thinking-theory",
    pageType: "theory",
    locales: {
      en: {
        title: "Theory",
        slug: "thinking/theory",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Theory",
            heading: "The Theory of Organizational Intelligence.",
          },
          {
            blockType: "statement",
            heading: "A living theory.",
            copy:
              "The canonical theory reader remains a purpose-built module while its surrounding page and navigation are CMS-managed.",
            tone: "dark",
          },
        ],
      },
      de: {
        title: "Theorie",
        slug: "denken/theorie",
        translationComplete: false,
      },
    },
  },
  {
    sourceKey: "company",
    pageType: "company",
    locales: {
      en: {
        title: "Company",
        slug: "company",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Company",
            heading: "We believe organizations can understand themselves.",
          },
          {
            blockType: "outcomeList",
            heading: "What guides us.",
            items: companyPrinciples.map((copy) => ({ copy })),
          },
          {
            blockType: "timeline",
            heading: "From process knowledge to Organizational Intelligence.",
            milestones: storyMilestones.map((item) => ({
              date: item.year,
              title: item.label,
              copy: item.text,
            })),
          },
          {
            blockType: "people",
            heading: "Leadership",
            people: companyLeadership.map((person) => ({
              name: person.name,
              role: person.role,
              bio: `${person.responsibility}. ${person.profile}`,
              legacyImageUrl: person.image,
            })),
          },
          {
            blockType: "people",
            heading: "Expert panel",
            people: companyExperts.map((person) => ({
              name: person.name,
              role: `${person.role} · ${person.expertise}`,
              bio: person.contribution,
              legacyImageUrl: person.image,
            })),
          },
          {
            blockType: "awardsProof",
            heading: "Recognition",
            items: companyAwards.map((award) => ({
              title: award.label,
              evidence: "meta" in award ? award.meta : award.alt,
              legacyImageUrl: award.image,
            })),
          },
          cta("en"),
        ],
      },
      de: {
        title: "Unternehmen",
        slug: "unternehmen",
        translationComplete: false,
      },
    },
  },
  {
    sourceKey: "partners",
    locales: {
      en: {
        title: "Partners",
        slug: "partners",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Partners",
            heading: "Build Organizational Intelligence together.",
          },
          {
            blockType: "cardGrid",
            heading: "Partner architecture",
            cards: partnerRoles.map((role) => ({
              title: role.title,
              copy:
                typeof role.purpose === "string"
                  ? role.purpose
                  : "Guide organizations as Organizational Intelligence becomes an operating principle.",
              kind: "capability",
            })),
          },
          cta("en"),
        ],
      },
      de: { title: "Partner", slug: "partner", translationComplete: false },
    },
  },
  {
    sourceKey: "academy",
    locales: {
      en: {
        title: "Academy",
        slug: "academy",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Academy",
            heading: "Learn how Organizational Intelligence becomes capability.",
          },
          {
            blockType: "cardGrid",
            heading: "Learning modules",
            cards: learningModules.map((module) => ({
              title: module.title,
              copy: `${module.copy} ${module.outcome}`,
              kind: "capability",
            })),
          },
          {
            blockType: "cardGrid",
            heading: "Learning formats",
            cards: learningFormats.map((format) => ({
              title: format.title,
              copy: format.copy,
              kind: "resource",
            })),
          },
          cta("en"),
        ],
      },
      de: { title: "Akademie", slug: "akademie", translationComplete: false },
    },
  },
  {
    sourceKey: "success-stories",
    locales: {
      en: {
        title: "Business Impact",
        slug: "success-stories",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Business Impact",
            heading: "Evidence from complex organizations.",
          },
          { blockType: "successStories", heading: "Customer outcomes." },
          cta("en"),
        ],
      },
      de: {
        title: "Wirkung",
        slug: "erfolgsgeschichten",
        translationComplete: false,
      },
    },
  },
  {
    sourceKey: "conversation",
    pageType: "conversion",
    locales: {
      en: {
        title: "Request a conversation",
        slug: "conversation",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Start",
            heading: "Start with the right conversation.",
            subheading:
              "Tell us what you want to understand, build or evaluate.",
          },
          {
            blockType: "leadForm",
            heading: "Tell us what you want to understand.",
            buttonLabel: "Request a conversation",
          },
        ],
      },
      de: {
        title: "Gespräch starten",
        slug: "gespraech",
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: "Start",
            heading: "Beginnen Sie mit dem richtigen Gespräch.",
            subheading:
              "Erzählen Sie uns, was Sie verstehen, aufbauen oder bewerten möchten.",
          },
          {
            blockType: "leadForm",
            heading: "Worum geht es?",
            buttonLabel: "Gespräch anfragen",
          },
        ],
      },
    },
  },
  {
    sourceKey: "theme-showcase",
    locales: {
      en: {
        title: "Theme Showcase",
        slug: "theme-showcase",
        translationComplete: true,
        layout: [
          {
            blockType: "heroMedia",
            eyebrow: "Theme preview",
            heading: "Real content, every visual primitive.",
            subheading:
              "A representative page for validating typography, color, surfaces, components and interactions.",
          },
          {
            blockType: "cardGrid",
            heading: "Cards and evidence",
            cards: [
              { title: "Standard card", copy: "Short representative copy.", kind: "standard" },
              { title: "Evidence card", copy: "A longer proof-oriented content sample.", kind: "evidence" },
              { title: "Capability card", copy: "Shows category and product language.", kind: "capability" },
            ],
          },
          {
            blockType: "statement",
            heading: "Light surface statement",
            copy: "Body copy demonstrates text hierarchy and measure.",
            tone: "light",
          },
          {
            blockType: "statement",
            heading: "Dark surface statement",
            copy: "Dark-mode contrast is validated independently.",
            tone: "dark",
          },
          {
            blockType: "outcomeList",
            heading: "Structured outcomes",
            items: [
              { title: "Clarity", copy: "Content remains readable." },
              { title: "Capability", copy: "Hierarchy remains intentional." },
            ],
          },
          cta("en"),
        ],
      },
    },
  },
];

type ResourceData = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage?: string;
  heroImageAlt?: string;
  sections: Array<{
    eyebrow?: string;
    title: string;
    copy?: string;
    items?: string[];
    cards?: Array<{
      title: string;
      text: string;
      image?: string;
      href?: string;
      linkLabel?: string;
    }>;
  }>;
  form?: { title: string; copy: string; buttonLabel: string };
};

const resourceSlugMap: Record<string, string> = {
  "click-demos": "click-demos",
  dokumentation: "dokumentation",
  downloadcenter: "downloadcenter",
  facts: "fakten",
  kontakt: "kontakt",
  "partner-finden": "partner-finden",
  presse: "presse",
  pricing: "preise",
  "release-notes": "release-notes",
  services: "services",
  support: "support",
  testen: "kostenlose-testversion/anmelden",
  "product-news": "plattform/produktneuigkeiten",
  datenschutz: "datenschutz",
  impressum: "impressum",
};

function resourceSeeds(): PageSeed[] {
  const records = resourcePages as unknown as Record<string, ResourceData>;
  return Object.entries(resourceSlugMap)
    .filter(([key]) => records[key])
    .map(([key, slug]) => {
      const page = records[key];
      const layout: AnyBlock[] = [
        {
          blockType: page.heroImage ? "heroMedia" : "hero",
          eyebrow: page.eyebrow,
          heading: page.title,
          subheading: page.intro,
          legacyImageUrl: page.heroImage,
          alt: page.heroImageAlt,
        },
        ...page.sections.map((section) =>
          section.cards?.length
            ? {
                blockType: "cardGrid",
                eyebrow: section.eyebrow,
                heading: section.title,
                cards: section.cards.map((card) => ({
                  title: card.title,
                  copy: card.text,
                  legacyImageUrl: card.image,
                  link: card.href
                    ? {
                        type: "external",
                        label: card.linkLabel ?? "Mehr erfahren",
                        url: card.href,
                      }
                    : undefined,
                  kind: "resource",
                })),
              }
            : section.items?.length
              ? {
                  blockType: "outcomeList",
                  eyebrow: section.eyebrow,
                  heading: section.title,
                  items: section.items.map((item) => ({ copy: item })),
                }
            : {
                blockType: "statement",
                eyebrow: section.eyebrow,
                heading: section.title,
                copy: section.copy,
                tone: "light",
              },
        ),
      ];
      if (page.form) {
        layout.push({
          blockType: "leadForm",
          heading: page.form.title,
          copy: page.form.copy,
          buttonLabel: page.form.buttonLabel,
        });
      }
      return {
        sourceKey: `resource-${key}`,
        pageType: key === "datenschutz" || key === "impressum" ? "legal" : "standard",
        locales: {
          de: {
            title: page.title,
            slug,
            description: page.intro,
            translationComplete: true,
            layout,
          },
        },
      };
    });
}

function layerSeeds(): PageSeed[] {
  return layers.map((layer) => ({
    sourceKey: `layer-${layer.slug}`,
    locales: {
      de: {
        title: layer.product,
        slug: layer.slug,
        description: layer.headline,
        translationComplete: true,
        layout: [
          {
            blockType: "hero",
            eyebrow: layer.layerName,
            heading: layer.product,
            subheading: layer.headline,
          },
          {
            blockType: "statement",
            eyebrow: layer.stage,
            heading: layer.verb,
            copy: layer.detail,
            tone: "dark",
          },
          {
            blockType: "outcomeList",
            eyebrow: "Wirkung",
            heading: "Was dieser Baustein für die Organisation leistet.",
            items: layer.outcomes.map((outcome) => ({
              copy: outcome,
            })),
          },
          {
            blockType: "outcomeList",
            eyebrow: "Bausteine",
            heading: "Direkt anschlussfähig an das aiio Organizational Intelligence System.",
            items: layer.modules.map((module) => ({ copy: module })),
          },
          cta("de"),
        ],
      },
    },
  }));
}

async function upsert(seed: PageSeed) {
  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "pages",
    where: { sourceKey: { equals: seed.sourceKey } },
    limit: 1,
    overrideAccess: true,
  });

  const current = existing.docs[0];
  const sourceHash = hash(seed);
  if (current?.migrationStatus === "complete" && !force) {
    const conflict =
      current.sourceHash && current.sourceHash !== sourceHash
        ? " (source changed; editor-owned conflict)"
        : "";
    console.log(`skipped ${seed.sourceKey}: editor-owned${conflict}`);
    return { created: 0, updated: 0, skipped: 1 };
  }

  let id = current?.id;
  const entries = Object.entries(seed.locales) as Array<
    [Locale, NonNullable<PageSeed["locales"][Locale]>]
  >;

  for (const [locale, value] of entries) {
    const data = {
      adminTitle: value.title,
      sourceKey: seed.sourceKey,
      pageType: seed.pageType ?? "standard",
      migrationStatus: "parity-review",
      migrationVersion,
      sourceHash,
      legacySource: `scripts/migrate-pages-to-cms.ts#${seed.sourceKey}`,
      title: value.title,
      slug: value.slug,
      ...(value.layout ? { layout: value.layout } : {}),
      seo: {
        title: `${value.title} | aiio`,
        description: value.description,
      },
      translationComplete: value.translationComplete ?? false,
    };
    if (dryRun) {
      console.log(`${id ? "would update" : "would create"} ${seed.sourceKey}:${locale}`);
      continue;
    }
    if (id) {
      await payload.update({
        collection: "pages",
        id,
        locale,
        data: data as never,
        overrideAccess: true,
      });
    } else {
      const created = await payload.create({
        collection: "pages",
        locale,
        data: { ...data, _status: "published" } as never,
        overrideAccess: true,
      });
      id = created.id;
    }
  }
  console.log(`upserted ${seed.sourceKey}`);
  return { created: current ? 0 : 1, updated: current ? 1 : 0, skipped: 0 };
}

async function seedReferencedNavigation() {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: "pages",
    limit: 200,
    depth: 0,
    overrideAccess: true,
  });
  const ids = new Map(
    pages.docs
      .filter((page) => page.sourceKey)
      .map((page) => [page.sourceKey as string, page.id]),
  );
  const item = (key: string, label: string) => ({
    label,
    link: {
      type: "internal" as const,
      label,
      reference: { relationTo: "pages" as const, value: ids.get(key)! },
    },
  });
  const nav = {
    en: [
      item("home", "Home"),
      item("platform", "Platform"),
      item("success-stories", "Business Impact"),
      item("thinking", "Thinking"),
      item("partners", "Partners"),
      item("company", "Company"),
      item("conversation", "Get Started"),
    ],
    de: [
      item("home", "Start"),
      item("platform", "Plattform"),
      item("success-stories", "Wirkung"),
      item("thinking", "Denken"),
      item("partners", "Partner"),
      item("company", "Unternehmen"),
      item("conversation", "Gespräch starten"),
    ],
  };
  const legal = {
    en: [
      item("resource-datenschutz", "Privacy"),
      item("resource-impressum", "Legal"),
    ],
    de: [
      item("resource-datenschutz", "Datenschutz"),
      item("resource-impressum", "Impressum"),
    ],
  };
  for (const locale of ["en", "de"] as const) {
    await payload.updateGlobal({
      slug: "header",
      locale,
      data: { navItems: nav[locale] },
    });
    await payload.updateGlobal({
      slug: "footer",
      locale,
      data: {
        navItems: [...nav[locale].slice(1), item("academy", locale === "de" ? "Akademie" : "Academy")],
        legalItems: legal[locale],
      },
    });
  }
  console.log("seeded referenced localized navigation");
}

async function assignShowcaseTheme() {
  const payload = await getPayload({ config });
  const [themes, pages] = await Promise.all([
    payload.find({
      collection: "themes",
      where: { slug: { equals: "editorial-default" } },
      limit: 1,
      overrideAccess: true,
    }),
    payload.find({
      collection: "pages",
      where: { sourceKey: { equals: "theme-showcase" } },
      limit: 1,
      overrideAccess: true,
    }),
  ]);
  if (themes.docs[0] && pages.docs[0]) {
    await payload.update({
      collection: "pages",
      id: pages.docs[0].id,
      data: { theme: themes.docs[0].id },
      overrideAccess: true,
    });
    console.log("assigned editorial-default to theme showcase");
  }
}

async function main() {
  const seeds = [...englishPages, ...resourceSeeds(), ...layerSeeds()];
  const totals = { created: 0, updated: 0, skipped: 0 };
  for (const seed of seeds) {
    const result = await upsert(seed);
    totals.created += result.created;
    totals.updated += result.updated;
    totals.skipped += result.skipped;
  }
  if (!dryRun) {
    await seedReferencedNavigation();
    await assignShowcaseTheme();
  }
  console.log(
    `${dryRun ? "Dry run" : "Migration"}: ${totals.created} created, ` +
      `${totals.updated} updated, ${totals.skipped} editor-owned skipped.`,
  );
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
