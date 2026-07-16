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
    {
      name: "provider",
      type: "radio",
      required: true,
      defaultValue: "local",
      options: [
        { label: "Uploaded WOFF2", value: "local" },
        { label: "Google Fonts stylesheet", value: "google" },
      ],
    },
    { name: "cssFamily", type: "text", required: true },
    {
      name: "fallback",
      type: "text",
      required: true,
      defaultValue: "ui-sans-serif, system-ui, sans-serif",
    },
    {
      name: "googleFontsURL",
      label: "Google Fonts CSS URL",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.provider === "google",
        description:
          "Paste a fonts.googleapis.com/css or /css2 URL including weights and display=swap.",
      },
      validate: (
        value: string | null | undefined,
        { siblingData }: { siblingData?: Record<string, unknown> },
      ) => {
        if (siblingData?.provider !== "google") return true;
        if (!value) return "A Google Fonts URL is required.";
        try {
          const url = new URL(value);
          return url.protocol === "https:" &&
            url.hostname === "fonts.googleapis.com" &&
            (url.pathname === "/css" || url.pathname === "/css2")
            ? true
            : "Use an HTTPS fonts.googleapis.com/css or /css2 URL.";
        } catch {
          return "Enter a valid Google Fonts stylesheet URL.";
        }
      },
    },
    {
      name: "files",
      type: "array",
      admin: {
        condition: (_, siblingData) => siblingData?.provider === "local",
      },
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
