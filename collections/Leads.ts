import type { CollectionConfig } from "payload";
import { isAdmin } from "./access";

/**
 * Lead submissions from the site's forms. Records are created server-side by
 * the lead route handler using `overrideAccess`, so public REST create is
 * intentionally disabled to prevent spam. Only admins can read/manage leads.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    group: "Operations",
    defaultColumns: ["name", "email", "company", "topic", "createdAt"],
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true, index: true },
    { name: "company", type: "text" },
    { name: "topic", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "source",
      type: "text",
      admin: { description: "Form/route the lead came from, e.g. /live-demo/kontakt." },
    },
    {
      name: "consent",
      type: "checkbox",
      required: true,
      admin: { description: "Explicit consent captured at submission time." },
    },
    {
      name: "consentText",
      type: "textarea",
      admin: { description: "Exact consent copy shown to the user (audit trail)." },
    },
  ],
};
