import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";
import { APIError } from "payload";
import { oklchField } from "../fields/oklch";
import {
  revalidateThemesChange,
  revalidateThemesDelete,
} from "../lib/cms/revalidate";
import { isAuthenticated, publishedOrAuthenticated } from "./access";

function lightness(value: unknown) {
  if (typeof value !== "string") return null;
  const match = value.match(/^oklch\(\s*(\d+(?:\.\d+)?)(%)?/i);
  if (!match) return null;
  const raw = Number(match[1]);
  return match[2] ? raw / 100 : raw;
}

const validateContrast: CollectionBeforeValidateHook = ({ data }) => {
  const colors = data?.colors as Record<string, unknown> | undefined;
  const paper = lightness(colors?.paper);
  const ink = lightness(colors?.ink);
  const canvas = lightness(colors?.canvasDark);
  const onDark = lightness(colors?.onDark);
  if (paper !== null && ink !== null && Math.abs(paper - ink) < 0.45) {
    throw new APIError("Theme paper/ink contrast is too low.", 400);
  }
  if (canvas !== null && onDark !== null && Math.abs(canvas - onDark) < 0.45) {
    throw new APIError("Theme dark-canvas contrast is too low.", 400);
  }
  return data;
};

export const Themes: CollectionConfig = {
  slug: "themes",
  admin: {
    useAsTitle: "name",
    group: "Design",
    defaultColumns: ["name", "slug", "_status"],
    livePreview: {
      url: ({ data, locale }) =>
        `/${locale?.code ?? "en"}/theme-showcase?previewTheme=${data?.id ?? ""}`,
    },
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 25 },
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    beforeValidate: [validateContrast],
    afterChange: [revalidateThemesChange],
    afterDelete: [revalidateThemesDelete],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "description", type: "textarea" },
    {
      name: "colors",
      type: "group",
      fields: [
        oklchField("paper", "Paper"),
        oklchField("paper2", "Paper 2"),
        oklchField("ink", "Ink"),
        oklchField("ink2", "Muted ink"),
        oklchField("rule", "Rules"),
        oklchField("canvasDark", "Dark canvas"),
        oklchField("onDark", "Text on dark"),
        oklchField("accent", "Accent"),
        oklchField("accentStrong", "Strong accent"),
        oklchField("accentInk", "Text on accent"),
        oklchField("focus", "Focus"),
        oklchField("success", "Success"),
        oklchField("danger", "Danger"),
        oklchField("collector", "Collector tone"),
        oklchField("magnet", "Magnet tone"),
        oklchField("forge", "Forge tone"),
        oklchField("dataforge", "DataForge tone"),
      ],
    },
    {
      name: "typography",
      type: "group",
      fields: [
        {
          name: "collection",
          type: "relationship",
          relationTo: "font-collections",
          admin: {
            description:
              "Optional coordinated Display/Body/Mono set. Individual roles below override it.",
          },
        },
        { name: "display", type: "relationship", relationTo: "font-families" },
        { name: "body", type: "relationship", relationTo: "font-families" },
        { name: "mono", type: "relationship", relationTo: "font-families" },
        { name: "heroScale", type: "number", defaultValue: 1 },
        { name: "bodyScale", type: "number", defaultValue: 1 },
      ],
    },
    {
      name: "shape",
      type: "group",
      fields: [
        { name: "radiusInput", type: "number", defaultValue: 10 },
        { name: "radiusCard", type: "number", defaultValue: 18 },
        { name: "radiusPanel", type: "number", defaultValue: 28 },
        { name: "ruleWidth", type: "number", defaultValue: 1 },
      ],
    },
    {
      name: "motion",
      type: "group",
      fields: [
        { name: "fast", type: "number", defaultValue: 180 },
        { name: "base", type: "number", defaultValue: 280 },
        { name: "slow", type: "number", defaultValue: 520 },
        {
          name: "easing",
          type: "select",
          defaultValue: "standard",
          options: ["standard", "expressive", "linear"],
        },
      ],
    },
  ],
};
