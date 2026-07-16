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
    useAsTitle: "adminTitle",
    group: "Content",
    defaultColumns: ["adminTitle", "category", "publishedAt", "_status"],
    listSearchableFields: ["adminTitle", "title", "slug"],
    components: {
      edit: {
        beforeDocumentControls: [
          "@/components/admin/ReloadPreviewButton#ReloadPreviewButton",
        ],
      },
    },
    livePreview: {
      url: ({ data, locale }) =>
        `/${locale?.code ?? "en"}/blog/${data?.slug ?? ""}?preview=1`,
    },
    preview: (data, { locale }) =>
      `/${locale ?? "en"}/blog/${data?.slug ?? ""}`,
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
    {
      name: "adminTitle",
      type: "text",
      required: true,
      index: true,
      admin: {
        description:
          "Locale-neutral editor label. This does not appear on the website.",
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
    { name: "excerpt", type: "textarea", required: true, localized: true },
    {
      name: "readingTime",
      type: "text",
      localized: true,
      admin: { description: "e.g. '5 min read' / '5 Min. Lesezeit'." },
    },
    { name: "category", type: "relationship", relationTo: "categories", localized: true },
    {
      name: "authors",
      type: "relationship",
      relationTo: "authors",
      hasMany: true,
      localized: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "theme",
      type: "relationship",
      relationTo: "themes",
      admin: { position: "sidebar" },
    },
    { name: "heroImage", type: "upload", relationTo: "media", localized: true },
    {
      name: "heroImageUrl",
      type: "text",
      localized: true,
      admin: { description: "Legacy hero image path (e.g. /blog/...). Used until media is migrated to Blob." },
    },
    { name: "heroImageAlt", type: "text", localized: true },
    {
      name: "body",
      type: "richText",
      localized: true,
      admin: {
        description: "Structured body for natively-authored posts. Optional when bodyHtml is set.",
      },
    },
    {
      name: "bodyHtml",
      type: "textarea",
      localized: true,
      admin: {
        description: "Imported/legacy HTML body. Rendered as-is when the richText body is empty.",
      },
    },
    {
      name: "seo",
      type: "group",
      localized: true,
      admin: { position: "sidebar" },
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
        { name: "noIndex", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "translationComplete",
      type: "checkbox",
      localized: true,
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
