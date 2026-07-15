import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: { useAsTitle: "name", group: "Content" },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", admin: { description: "e.g. Managing Director" } },
    { name: "bio", type: "textarea" },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "linkedin", type: "text" },
  ],
};
