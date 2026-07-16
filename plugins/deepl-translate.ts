import type { Config, Field, Plugin } from "payload";

const component =
  "@/components/admin/DeepLTranslateButton#DeepLTranslateButton";

const excludedNames = new Set([
  "sourceId",
  "sourceKey",
  "adminTitle",
  "href",
  "url",
  "videoUrl",
  "linkedin",
  "bodyHtml",
]);

function enhanceFields(fields: Field[], inheritedLocalized = false): Field[] {
  return fields.map((original) => {
    const field = { ...original } as unknown as Record<string, unknown>;
    const ownLocalized = field.localized === true;
    const localized = inheritedLocalized || ownLocalized;

    if (
      localized &&
      typeof field.name === "string" &&
      (field.type === "text" || field.type === "textarea") &&
      !excludedNames.has(field.name)
    ) {
      const admin = {
        ...((field.admin as Record<string, unknown> | undefined) ?? {}),
      };
      const components = {
        ...((admin.components as Record<string, unknown> | undefined) ?? {}),
      };
      components.afterInput = [
        ...((components.afterInput as unknown[] | undefined) ?? []),
        component,
      ];
      admin.components = components;
      field.admin = admin;
    }

    if (Array.isArray(field.fields)) {
      field.fields = enhanceFields(field.fields as Field[], localized);
    }
    if (Array.isArray(field.blocks)) {
      field.blocks = (
        field.blocks as Array<Record<string, unknown>>
      ).map((block) => ({
        ...block,
        fields: Array.isArray(block.fields)
          ? enhanceFields(block.fields as Field[], localized)
          : undefined,
      }));
    }
    if (Array.isArray(field.tabs)) {
      field.tabs = (field.tabs as Array<Record<string, unknown>>).map((tab) => ({
        ...tab,
        fields: Array.isArray(tab.fields)
          ? enhanceFields(tab.fields as Field[], localized)
          : undefined,
      }));
    }

    return field as unknown as Field;
  });
}

/**
 * Injects a DeepL action after every localized text and textarea input across
 * collections, globals and localized blocks.
 */
export const deeplTranslation = (): Plugin => (config: Config): Config => ({
  ...config,
  collections: config.collections?.map((collection) => ({
    ...collection,
    fields: enhanceFields(collection.fields),
  })),
  globals: config.globals?.map((global) => ({
    ...global,
    fields: enhanceFields(global.fields),
  })),
});
