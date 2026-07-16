import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    // Files are stored in Vercel Blob (see payload.config plugins); no local
    // filesystem writes in production.
    mimeTypes: ["image/*", "application/pdf", "font/woff2", "application/font-woff2"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Describe the image for screen readers and SEO." },
    },
    { name: "caption", type: "text", localized: true },
    {
      name: "video",
      type: "group",
      localized: true,
      fields: [
        { name: "url", type: "text" },
        { name: "poster", type: "upload", relationTo: "media" },
        { name: "transcript", type: "textarea" },
      ],
    },
  ],
};
