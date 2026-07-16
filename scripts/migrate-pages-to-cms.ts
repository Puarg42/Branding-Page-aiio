/**
 * Idempotently migrates every existing content route into Payload Pages.
 *
 * Existing English flagship pages become EN documents with DE localized slugs
 * that fall back to the EN layout until a human translation is supplied.
 * Existing German resource/legal/layer pages become DE documents.
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { capabilitySpine } from "../content/capability-spine";
import { resourcePages } from "../app/(frontend)/resource-pages";
import { layers } from "../app/(frontend)/site-content";
import type { Locale } from "../lib/i18n/config";

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
          { blockType: "module", module: "trustLogos" },
          { blockType: "module", module: "realityCheck" },
          { blockType: "module", module: "categoryEvolution" },
          {
            blockType: "statement",
            eyebrow: "The missing capability",
            heading: "Continuous organizational self-understanding.",
            copy:
              "Organizations need a foundation that makes context continuously understandable before decisions depend on scattered memory.",
            tone: "dark",
          },
          { blockType: "module", module: "capabilityJourney" },
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
          { blockType: "module", module: "brandIllustration", illustrationVariant: "BC-002" },
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
          { blockType: "module", module: "theoryReader" },
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
            blockType: "featureGrid",
            heading: "What guides us.",
            items: [
              { title: "Clarity", copy: "Make organizational reality understandable." },
              { title: "Capability", copy: "Turn understanding into repeatable action." },
              { title: "Resilience", copy: "Help organizations adapt with confidence." },
            ],
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
            blockType: "featureGrid",
            items: [
              { title: "Develop understanding", copy: "Connect expertise to organizational context." },
              { title: "Build capabilities", copy: "Turn insight into practical transformation." },
              { title: "Support evolution", copy: "Create durable customer capability." },
            ],
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
            blockType: "featureGrid",
            items: capabilitySpine.map((step) => ({
              title: step.title,
              copy: step.copy,
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
          { blockType: "module", module: "successStories", heading: "Customer outcomes." },
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
];

type ResourceData = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    eyebrow?: string;
    title: string;
    copy?: string;
    items?: string[];
    cards?: Array<{ title: string; text: string }>;
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
          blockType: "hero",
          eyebrow: page.eyebrow,
          heading: page.title,
          subheading: page.intro,
        },
        ...page.sections.map((section) =>
          section.cards?.length
            ? {
                blockType: "featureGrid",
                eyebrow: section.eyebrow,
                heading: section.title,
                items: section.cards.map((card) => ({
                  title: card.title,
                  copy: card.text,
                })),
              }
            : {
                blockType: "statement",
                eyebrow: section.eyebrow,
                heading: section.title,
                copy: section.copy ?? section.items?.join(" · "),
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
            blockType: "featureGrid",
            eyebrow: "Wirkung",
            heading: "Was dieser Baustein für die Organisation leistet.",
            items: layer.outcomes.map((outcome) => ({
              title: outcome,
              copy: "",
            })),
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

  let id = existing.docs[0]?.id;
  const entries = Object.entries(seed.locales) as Array<
    [Locale, NonNullable<PageSeed["locales"][Locale]>]
  >;

  for (const [locale, value] of entries) {
    const data = {
      sourceKey: seed.sourceKey,
      pageType: seed.pageType ?? "standard",
      title: value.title,
      slug: value.slug,
      ...(value.layout ? { layout: value.layout } : {}),
      seo: {
        title: `${value.title} | aiio`,
        description: value.description,
      },
      translationComplete: value.translationComplete ?? false,
      _status: "published" as const,
    };
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
        data: data as never,
        overrideAccess: true,
      });
      id = created.id;
    }
  }
  console.log(`upserted ${seed.sourceKey}`);
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

async function main() {
  const seeds = [...englishPages, ...resourceSeeds(), ...layerSeeds()];
  for (const seed of seeds) await upsert(seed);
  await seedReferencedNavigation();
  console.log(`Migrated ${seeds.length} page documents.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
