import type { Field } from "payload";

/**
 * Localized link label with either an internal CMS document reference or an
 * external URL. Internal references are resolved to the target document's
 * localized slug by the frontend.
 */
export function linkField(
  name = "link",
  options: { localized?: boolean; required?: boolean } = {},
): Field {
  return {
    name,
    type: "group",
    localized: options.localized ?? true,
    required: options.required,
    fields: [
      {
        name: "type",
        type: "radio",
        defaultValue: "internal",
        options: [
          { label: "Internal", value: "internal" },
          { label: "External", value: "external" },
        ],
        required: true,
      },
      { name: "label", type: "text", required: options.required ?? false },
      {
        name: "reference",
        type: "relationship",
        relationTo: ["pages", "publications"],
        admin: { condition: (_, siblingData) => siblingData?.type === "internal" },
      },
      {
        name: "url",
        type: "text",
        admin: { condition: (_, siblingData) => siblingData?.type === "external" },
      },
      {
        name: "newTab",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  };
}
