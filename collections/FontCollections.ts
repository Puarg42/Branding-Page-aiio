import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access";

/**
 * A coordinated typography system. Themes can select one collection, then
 * optionally override individual roles.
 */
export const FontCollections: CollectionConfig = {
  slug: "font-collections",
  admin: {
    useAsTitle: "name",
    group: "Design",
    defaultColumns: ["name", "display", "body", "mono"],
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    { name: "description", type: "textarea" },
    {
      name: "display",
      type: "relationship",
      relationTo: "font-families",
      required: true,
    },
    {
      name: "body",
      type: "relationship",
      relationTo: "font-families",
      required: true,
    },
    {
      name: "mono",
      type: "relationship",
      relationTo: "font-families",
    },
  ],
};
