import type { CollectionConfig } from "payload";
import { isAuthenticated, publishedOrAuthenticated } from "./access";

/**
 * Evidence-led customer stories (challenge -> action -> result). Proof fields
 * are optional on purpose: never fabricate metrics. Leave them empty rather
 * than inventing numbers.
 */
export const SuccessStories: CollectionConfig = {
  slug: "success-stories",
  admin: {
    useAsTitle: "customer",
    group: "Content",
    defaultColumns: ["customer", "industry", "_status"],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "customer", type: "text", required: true },
    { name: "industry", type: "text" },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "challenge", type: "textarea", required: true },
    { name: "action", type: "textarea", required: true },
    { name: "result", type: "textarea", required: true },
    {
      name: "proofPoints",
      type: "array",
      admin: {
        description: "Only verified metrics or quotes. Leave empty if none exist.",
      },
      fields: [
        { name: "metric", type: "text" },
        { name: "label", type: "text" },
        { name: "source", type: "text" },
      ],
    },
    { name: "logo", type: "upload", relationTo: "media" },
  ],
};
