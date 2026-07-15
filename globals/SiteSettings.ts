import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../collections/access";

/** Editable site-wide settings (announcement bar, primary CTA copy, etc.). */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Admin" },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      name: "primaryCta",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Request a conversation" },
        { name: "href", type: "text", defaultValue: "/live-demo/kontakt" },
      ],
    },
    {
      name: "secondaryCta",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "Explore the platform" },
        { name: "href", type: "text", defaultValue: "/platform" },
      ],
    },
    {
      name: "announcement",
      type: "text",
      admin: { description: "Optional site-wide announcement. Leave empty to hide." },
    },
  ],
};
