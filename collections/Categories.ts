import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "title", group: "Content" },
  access: {
    read: () => true,
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
      admin: { description: "URL-safe identifier, e.g. organizational-intelligence." },
    },
  ],
};
