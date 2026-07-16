import { describe, expect, it } from "vitest";
import {
  assertLocale,
  localeFromPath,
  withLocale,
} from "../../lib/i18n/config";

describe("i18n routing helpers", () => {
  it("detects supported locale prefixes", () => {
    expect(localeFromPath("/en/platform")).toBe("en");
    expect(localeFromPath("/de/plattform")).toBe("de");
    expect(localeFromPath("/platform")).toBeNull();
  });

  it("prefixes internal links once and leaves external links untouched", () => {
    expect(withLocale("de", "/plattform")).toBe("/de/plattform");
    expect(withLocale("en", "/en/platform")).toBe("/en/platform");
    expect(withLocale("en", "https://example.com")).toBe("https://example.com");
  });

  it("rejects unsupported locales", () => {
    expect(() => assertLocale("fr")).toThrow("Unsupported locale");
  });
});
