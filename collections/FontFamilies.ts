import type { CollectionConfig } from "payload";
import { isAuthenticated } from "./access";

export const FontFamilies: CollectionConfig = {
  slug: "font-families",
  admin: { useAsTitle: "name", group: "Design" },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    { name: "cssFamily", type: "text", required: true },
    {
      name: "fallback",
      type: "text",
      required: true,
      defaultValue: "ui-sans-serif, system-ui, sans-serif",
    },
    {
      name: "files",
      type: "array",
      fields: [
        { name: "file", type: "upload", relationTo: "media", required: true },
        { name: "weight", type: "text", required: true, defaultValue: "400" },
        {
          name: "style",
          type: "select",
          defaultValue: "normal",
          options: ["normal", "italic"],
        },
      ],
    },
  ],
};
