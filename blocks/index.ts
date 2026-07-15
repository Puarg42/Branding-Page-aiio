import type { Block } from "payload";

const ctaGroup = (name: string) => ({
  name,
  type: "group" as const,
  fields: [
    { name: "label", type: "text" as const },
    { name: "href", type: "text" as const },
  ],
});

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

export const pageBlocks = [HeroBlock, ProseBlock, FeatureGridBlock, CTABlock];
