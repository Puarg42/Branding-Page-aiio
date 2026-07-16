import type { Block } from "payload";
import { linkField } from "../fields/link";

const ctaGroup = (name: string) => linkField(name, { localized: false });

/** Statement hero. */
export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "subheading", type: "textarea" },
    ctaGroup("primaryCta"),
    ctaGroup("secondaryCta"),
  ],
};

/** Long-form rich text. */
export const ProseBlock: Block = {
  slug: "prose",
  interfaceName: "ProseBlock",
  labels: { singular: "Prose", plural: "Prose" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "content", type: "richText", required: true },
  ],
};

/** Grid of feature/value cards. */
export const FeatureGridBlock: Block = {
  slug: "featureGrid",
  interfaceName: "FeatureGridBlock",
  labels: { singular: "Feature grid", plural: "Feature grids" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "copy", type: "textarea" },
      ],
    },
  ],
};

/** Closing call to action. */
export const CTABlock: Block = {
  slug: "cta",
  interfaceName: "CTABlock",
  labels: { singular: "CTA", plural: "CTAs" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "copy", type: "textarea" },
    ctaGroup("primaryCta"),
    ctaGroup("secondaryCta"),
  ],
};

export const StatementBlock: Block = {
  slug: "statement",
  interfaceName: "StatementBlock",
  labels: { singular: "Statement", plural: "Statements" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "copy", type: "textarea" },
    {
      name: "tone",
      type: "select",
      defaultValue: "light",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Accent", value: "accent" },
      ],
    },
  ],
};

export const MediaBlock: Block = {
  slug: "media",
  interfaceName: "MediaBlock",
  labels: { singular: "Media", plural: "Media" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "videoUrl", type: "text" },
    { name: "caption", type: "textarea" },
  ],
};

export const LeadFormBlock: Block = {
  slug: "leadForm",
  interfaceName: "LeadFormBlock",
  labels: { singular: "Lead form", plural: "Lead forms" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "copy", type: "textarea" },
    { name: "buttonLabel", type: "text" },
    { name: "topic", type: "text" },
  ],
};

/**
 * Interactive/code-owned sections exposed as reusable CMS modules. Editors can
 * place/reorder them without duplicating their implementation.
 */
export const ModuleBlock: Block = {
  slug: "module",
  interfaceName: "ModuleBlock",
  labels: { singular: "Interactive module", plural: "Interactive modules" },
  fields: [
    {
      name: "module",
      type: "select",
      required: true,
      options: [
        { label: "Organizational reality check", value: "realityCheck" },
        { label: "Category evolution", value: "categoryEvolution" },
        { label: "Capability journey", value: "capabilityJourney" },
        { label: "Trust logo marquee", value: "trustLogos" },
        { label: "Brand illustration", value: "brandIllustration" },
        { label: "Theory reader entry", value: "theoryReader" },
        { label: "Success stories", value: "successStories" },
      ],
    },
    { name: "heading", type: "text" },
    { name: "copy", type: "textarea" },
    {
      name: "illustrationVariant",
      type: "select",
      options: [
        { label: "BC-001", value: "BC-001" },
        { label: "BC-002", value: "BC-002" },
        { label: "BC-005", value: "BC-005" },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.module === "brandIllustration",
      },
    },
  ],
};

const experienceModule = (
  slug: string,
  interfaceName: string,
  label: string,
  fields: Block["fields"] = [],
): Block => ({
  slug,
  interfaceName,
  labels: { singular: label, plural: label },
  fields: [
    { name: "heading", type: "text" },
    { name: "copy", type: "textarea" },
    ...fields,
  ],
});

export const RealityCheckBlock = experienceModule(
  "realityCheck",
  "RealityCheckBlock",
  "Organizational reality check",
);
export const CategoryEvolutionBlock = experienceModule(
  "categoryEvolution",
  "CategoryEvolutionBlock",
  "Category evolution",
);
export const CapabilityJourneyBlock = experienceModule(
  "capabilityJourney",
  "CapabilityJourneyBlock",
  "Capability journey",
);
export const TrustLogosBlock = experienceModule(
  "trustLogos",
  "TrustLogosBlock",
  "Trust logo marquee",
);
export const BrandIllustrationBlock = experienceModule(
  "brandIllustration",
  "BrandIllustrationBlock",
  "Brand illustration",
  [
    {
      name: "variant",
      type: "select",
      required: true,
      defaultValue: "BC-002",
      options: ["BC-001", "BC-002", "BC-005"],
    },
  ],
);
export const TheoryReaderBlock = experienceModule(
  "theoryReader",
  "TheoryReaderBlock",
  "Theory reader entry",
);
export const SuccessStoriesBlock = experienceModule(
  "successStories",
  "SuccessStoriesBlock",
  "Success stories",
);

export const HeroMediaBlock: Block = {
  slug: "heroMedia",
  interfaceName: "HeroMediaBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text", required: true },
    { name: "subheading", type: "textarea" },
    { name: "media", type: "upload", relationTo: "media" },
    { name: "legacyImageUrl", type: "text" },
    { name: "alt", type: "text" },
    ctaGroup("primaryCta"),
    ctaGroup("secondaryCta"),
  ],
};

export const CardGridBlock: Block = {
  slug: "cardGrid",
  interfaceName: "CardGridBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "cards",
      type: "array",
      minRows: 1,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "copy", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "legacyImageUrl", type: "text" },
        { name: "imageAlt", type: "text" },
        linkField("link", { localized: false }),
        {
          name: "kind",
          type: "select",
          defaultValue: "standard",
          options: ["standard", "evidence", "capability", "resource"],
        },
      ],
    },
  ],
};

export const FAQBlock: Block = {
  slug: "faq",
  interfaceName: "FAQBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "richText", required: true },
      ],
    },
  ],
};

export const TimelineBlock: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "milestones",
      type: "array",
      fields: [
        { name: "date", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "copy", type: "textarea" },
        { name: "media", type: "upload", relationTo: "media" },
      ],
    },
  ],
};

export const PeopleBlock: Block = {
  slug: "people",
  interfaceName: "PeopleBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "people",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text" },
        { name: "bio", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "legacyImageUrl", type: "text" },
        linkField("profileLink", { localized: false }),
      ],
    },
  ],
};

export const AwardsProofBlock: Block = {
  slug: "awardsProof",
  interfaceName: "AwardsProofBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "issuer", type: "text" },
        { name: "year", type: "text" },
        { name: "evidence", type: "textarea" },
        { name: "logo", type: "upload", relationTo: "media" },
        { name: "legacyImageUrl", type: "text" },
        linkField("sourceLink", { localized: false }),
      ],
    },
  ],
};

export const LinkListBlock: Block = {
  slug: "linkList",
  interfaceName: "LinkListBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "links",
      type: "array",
      fields: [linkField("link", { localized: false, required: true })],
    },
  ],
};

export const OutcomeListBlock: Block = {
  slug: "outcomeList",
  interfaceName: "OutcomeListBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "copy", type: "textarea", required: true },
      ],
    },
  ],
};

export const RelatedPagesBlock: Block = {
  slug: "relatedPages",
  interfaceName: "RelatedPagesBlock",
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "pages",
      type: "relationship",
      relationTo: "pages",
      hasMany: true,
    },
  ],
};

export const SectionNavigationBlock: Block = {
  slug: "sectionNavigation",
  interfaceName: "SectionNavigationBlock",
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "anchor", type: "text", required: true },
      ],
    },
  ],
};

export const pageBlocks = [
  HeroBlock,
  HeroMediaBlock,
  ProseBlock,
  FeatureGridBlock,
  CardGridBlock,
  FAQBlock,
  TimelineBlock,
  PeopleBlock,
  AwardsProofBlock,
  LinkListBlock,
  OutcomeListBlock,
  RelatedPagesBlock,
  SectionNavigationBlock,
  StatementBlock,
  MediaBlock,
  LeadFormBlock,
  RealityCheckBlock,
  CategoryEvolutionBlock,
  CapabilityJourneyBlock,
  TrustLogosBlock,
  BrandIllustrationBlock,
  TheoryReaderBlock,
  SuccessStoriesBlock,
  CTABlock,
];
