import type { CollectionConfig } from "payload";
import { revalidatePublicationsChange, revalidatePublicationsDelete } from "../lib/cms/revalidate";
import { isAuthenticated, publishedOrAuthenticated } from "./access";

/**
 * Thought-leadership publications (the editorial home of "Thinking"/Blog).
 * Drafts + versions are enabled so editors can preview before publishing.
 */
export const Publications: CollectionConfig = {
  slug: "publications",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
    livePreview: {
      url: ({ data }) => `/blog/${data?.slug ?? ""}`,
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 25,
  },
  hooks: {
    afterChange: [revalidatePublicationsChange],
    afterDelete: [revalidatePublicationsDelete],
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
    },
    {
      name: "sourceId",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Stable identifier from the original source; used for idempotent imports.",
      },
    },
    { name: "excerpt", type: "textarea", required: true },
    { name: "readingTime", type: "text", admin: { description: "e.g. '5 min read'." } },
    { name: "category", type: "relationship", relationTo: "categories" },
    { name: "authors", type: "relationship", relationTo: "authors", hasMany: true },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    { name: "heroImage", type: "upload", relationTo: "media" },
    {
      name: "heroImageUrl",
      type: "text",
      admin: { description: "Legacy hero image path (e.g. /blog/...). Used until media is migrated to Blob." },
    },
    { name: "heroImageAlt", type: "text" },
    {
      name: "body",
      type: "richText",
      admin: {
        description: "Structured body for natively-authored posts. Optional when bodyHtml is set.",
      },
    },
    {
      name: "bodyHtml",
      type: "textarea",
      admin: {
        description: "Imported/legacy HTML body. Rendered as-is when the richText body is empty.",
      },
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
