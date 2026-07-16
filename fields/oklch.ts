import type { TextField } from "payload";

const oklch =
  /^oklch\(\s*(?:0(?:\.\d+)?|1(?:\.0+)?|\d{1,3}(?:\.\d+)?%)\s+(?:0(?:\.\d+)?|0?\.\d+)\s+(?:-?\d+(?:\.\d+)?)\s*(?:\/\s*(?:0(?:\.\d+)?|1(?:\.0+)?|\d{1,3}(?:\.\d+)?%))?\s*\)$/i;

export function oklchField(
  name: string,
  label: string,
  required = true,
): TextField {
  return {
    name,
    label,
    type: "text",
    required,
    validate: (value) =>
      !value || oklch.test(value)
        ? true
        : "Use valid OKLCH syntax, e.g. oklch(42% 0.15 305).",
    admin: {
      components: {
        afterInput: [
          "@/components/admin/OKLCHSwatch#OKLCHSwatch",
        ],
      },
    },
  };
}

export function isValidOKLCH(value: unknown): value is string {
  return typeof value === "string" && oklch.test(value);
}
