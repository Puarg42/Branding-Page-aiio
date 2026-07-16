import type { CollectionConfig } from "payload";
import { isAuthenticated, publishedOrAuthenticated } from "./access";

export const TheoryPublications: CollectionConfig = {
  slug: "theory-publications",
  admin: {
    useAsTitle: "adminTitle",
    group: "Content",
    defaultColumns: ["adminTitle", "version", "_status"],
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 25 },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "adminTitle", type: "text", required: true },
    { name: "title", type: "text", localized: true, required: true },
    { name: "version", type: "text" },
    { name: "edition", type: "text", localized: true },
    { name: "readingTime", type: "text", localized: true },
    {
      name: "chapters",
      type: "array",
      localized: true,
      required: true,
      fields: [
        { name: "slug", type: "text", required: true },
        { name: "title", type: "text", required: true },
        {
          name: "blocks",
          type: "array",
          required: true,
          fields: [
            {
              name: "type",
              type: "select",
              required: true,
              options: ["paragraph", "quote", "model"],
            },
            { name: "text", type: "textarea" },
            {
              name: "lines",
              type: "array",
              fields: [{ name: "text", type: "text", required: true }],
            },
          ],
        },
      ],
    },
    { name: "sourceProvenance", type: "text", admin: { readOnly: true } },
    { name: "translationComplete", type: "checkbox", localized: true },
  ],
};
