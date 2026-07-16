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

export const pageBlocks = [
  HeroBlock,
  ProseBlock,
  FeatureGridBlock,
  StatementBlock,
  MediaBlock,
  LeadFormBlock,
  ModuleBlock,
  CTABlock,
];
