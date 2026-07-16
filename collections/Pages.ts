import type { CollectionConfig } from "payload";
import { pageBlocks } from "../blocks";
import { revalidatePagesChange, revalidatePagesDelete } from "../lib/cms/revalidate";
import { isAuthenticated, publishedOrAuthenticated } from "./access";

/**
 * Block-composed marketing pages. Editors assemble a page from a constrained
 * set of blocks (hero, prose, feature grid, CTA); the frontend renders them
 * through a single template (components/blocks/RenderBlocks).
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "slug", "_status"],
    livePreview: {
      url: ({ data }) => `/${data?.slug ?? ""}`,
    },
  },
  versions: {
    drafts: { autosave: true },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [revalidatePagesChange],
    afterDelete: [revalidatePagesDelete],
  },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: "sourceKey",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Stable migration key; not shown in URLs.",
      },
    },
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      localized: true,
      admin: {
        description:
          "Localized path without locale prefix, e.g. 'platform' (EN) / 'plattform' (DE). Nested paths are allowed.",
      },
    },
    {
      name: "pageType",
      type: "select",
      defaultValue: "standard",
      admin: { position: "sidebar" },
      options: [
        { label: "Standard", value: "standard" },
        { label: "Home", value: "home" },
        { label: "Platform", value: "platform" },
        { label: "Thinking", value: "thinking" },
        { label: "Theory", value: "theory" },
        { label: "Company", value: "company" },
        { label: "Legal", value: "legal" },
        { label: "Conversion", value: "conversion" },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      required: true,
      minRows: 1,
      blocks: pageBlocks,
      localized: true,
    },
    {
      name: "seo",
      type: "group",
      localized: true,
      admin: { position: "sidebar" },
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: { description: "Locale-specific social preview image." },
        },
        { name: "noIndex", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "translationComplete",
      type: "checkbox",
      localized: true,
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Mark only after a human has reviewed this locale.",
      },
    },
  ],
};
