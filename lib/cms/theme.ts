import { unstable_cache } from "next/cache";
import type { Locale } from "../i18n/config";
import { THEMES_TAG } from "./revalidate";

type ThemeRecord = Record<string, unknown> & {
  id?: number;
  slug?: string;
  colors?: Record<string, unknown>;
  typography?: Record<string, unknown>;
  shape?: Record<string, unknown>;
  motion?: Record<string, unknown>;
};

async function payloadClient() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  return getPayload({ config });
}

export const getDefaultTheme = unstable_cache(
  async (locale: Locale): Promise<ThemeRecord | null> => {
    if (process.env.THEME_SYSTEM_ENABLED !== "true") return null;
    try {
      const payload = await payloadClient();
      const settings = await payload.findGlobal({
        slug: "site-settings",
        locale,
        fallbackLocale: "en",
        depth: 3,
      });
      return settings.defaultTheme && typeof settings.defaultTheme === "object"
        ? (settings.defaultTheme as unknown as ThemeRecord)
        : null;
    } catch {
      return null;
    }
  },
  ["default-theme"],
  { tags: [THEMES_TAG], revalidate: 3600 },
);

export async function getPreviewTheme(
  id: string,
  requestHeaders: Headers,
): Promise<ThemeRecord | null> {
  if (process.env.THEME_SYSTEM_ENABLED !== "true") return null;
  try {
    const payload = await payloadClient();
    const { user } = await payload.auth({
      headers: requestHeaders,
      canSetHeaders: false,
    });
    if (!user) return null;
    return (await payload.findByID({
      collection: "themes",
      id,
      draft: true,
      depth: 3,
      overrideAccess: true,
    })) as unknown as ThemeRecord;
  } catch {
    return null;
  }
}

const colorMap: Record<string, string> = {
  paper: "--color-paper",
  paper2: "--color-paper-2",
  ink: "--color-ink",
  ink2: "--color-ink-2",
  rule: "--color-rule",
  canvasDark: "--color-canvas-dark",
  onDark: "--color-on-dark",
  accent: "--color-accent",
  accentStrong: "--color-accent-strong",
  accentInk: "--color-accent-ink",
  focus: "--color-focus",
  success: "--color-success",
  danger: "--color-danger",
  collector: "--tone-collector",
  magnet: "--tone-magnet",
  forge: "--tone-forge",
  dataforge: "--tone-dataforge",
};

function fontForRole(theme: ThemeRecord, role: string) {
  const typography = theme.typography ?? {};
  const direct = typography[role];
  if (direct && typeof direct === "object") return direct as Record<string, unknown>;
  const collection = typography.collection;
  if (collection && typeof collection === "object") {
    const inherited = (collection as Record<string, unknown>)[role];
    if (inherited && typeof inherited === "object") {
      return inherited as Record<string, unknown>;
    }
  }
  return null;
}

export function themeStyle(theme: ThemeRecord | null) {
  if (!theme) return {};
  const style: Record<string, string | number> = {};
  for (const [key, variable] of Object.entries(colorMap)) {
    const value = theme.colors?.[key];
    if (typeof value === "string" && value.startsWith("oklch(")) {
      style[variable] = value;
    }
  }
  const shape = theme.shape ?? {};
  if (typeof shape.radiusInput === "number") style["--radius-input"] = `${shape.radiusInput}px`;
  if (typeof shape.radiusCard === "number") style["--radius-card"] = `${shape.radiusCard}px`;
  if (typeof shape.radiusPanel === "number") style["--radius-panel"] = `${shape.radiusPanel}px`;
  const motion = theme.motion ?? {};
  if (typeof motion.fast === "number") style["--dur-fast"] = `${motion.fast}ms`;
  if (typeof motion.base === "number") style["--dur-base"] = `${motion.base}ms`;
  if (typeof motion.slow === "number") style["--dur-slow"] = `${motion.slow}ms`;
  for (const [role, variable] of [
    ["display", "--font-display"],
    ["body", "--font-body"],
    ["mono", "--font-mono"],
  ] as const) {
    const record = fontForRole(theme, role);
    if (record) {
      if (typeof record.cssFamily === "string") {
        const fallback =
          typeof record.fallback === "string" ? `, ${record.fallback}` : "";
        style[variable] = `"${record.cssFamily.replace(/"/g, "")}"${fallback}`;
      }
    }
  }
  return style;
}

export function themeFontCSS(theme: ThemeRecord | null) {
  if (!theme) return "";
  const rules: string[] = [];
  for (const role of ["display", "body", "mono"]) {
    const record = fontForRole(theme, role);
    if (!record || record.provider === "google") continue;
    const family =
      typeof record.cssFamily === "string"
        ? record.cssFamily.replace(/["{};]/g, "")
        : null;
    if (!family || !Array.isArray(record.files)) continue;
    for (const fileEntry of record.files as Array<Record<string, unknown>>) {
      const file = fileEntry.file;
      const url =
        file && typeof file === "object"
          ? (file as Record<string, unknown>).url
          : null;
      if (typeof url !== "string" || !url.startsWith("http")) continue;
      const weight =
        typeof fileEntry.weight === "string"
          ? fileEntry.weight.replace(/[^0-9 ]/g, "")
          : "400";
      const style = fileEntry.style === "italic" ? "italic" : "normal";
      rules.push(
        `@font-face{font-family:"${family}";src:url("${url}") format("woff2");font-weight:${weight};font-style:${style};font-display:swap;}`,
      );
    }
  }
  return rules.join("");
}

export function themeFontLinks(theme: ThemeRecord | null) {
  if (!theme) return [];
  return Array.from(
    new Set(
      ["display", "body", "mono"]
        .map((role) => fontForRole(theme, role))
        .filter(
          (font): font is Record<string, unknown> =>
            Boolean(
              font &&
                font.provider === "google" &&
                typeof font.googleFontsURL === "string",
            ),
        )
        .map((font) => font.googleFontsURL as string)
        .filter((url) => {
          try {
            const parsed = new URL(url);
            return (
              parsed.protocol === "https:" &&
              parsed.hostname === "fonts.googleapis.com" &&
              (parsed.pathname === "/css" || parsed.pathname === "/css2")
            );
          } catch {
            return false;
          }
        }),
    ),
  );
}

export type { ThemeRecord };
