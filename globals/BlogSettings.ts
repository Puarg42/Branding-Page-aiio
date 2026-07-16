import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../collections/access";

export const BlogSettings: GlobalConfig = {
  slug: "blog-settings",
  admin: { group: "Content" },
  access: { read: () => true, update: isAuthenticated },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "heading", type: "text", localized: true, required: true },
    { name: "intro", type: "textarea", localized: true },
    { name: "latestHeading", type: "text", localized: true },
    { name: "archiveHeading", type: "text", localized: true },
    { name: "readLabel", type: "text", localized: true },
    { name: "allLabel", type: "text", localized: true },
    { name: "ctaHeading", type: "text", localized: true },
    { name: "ctaCopy", type: "textarea", localized: true },
  ],
};
