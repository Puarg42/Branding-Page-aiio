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
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL path segment, e.g. 'overview'. Reserved words: existing routes." },
    },
    {
      name: "layout",
      type: "blocks",
      required: true,
      minRows: 1,
      blocks: pageBlocks,
    },
    {
      name: "seo",
      type: "group",
      admin: { position: "sidebar" },
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
  ],
};
