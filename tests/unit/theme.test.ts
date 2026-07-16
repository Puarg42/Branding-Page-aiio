import { describe, expect, it } from "vitest";
import { isValidOKLCH } from "../../fields/oklch";
import { themeStyle } from "../../lib/cms/theme";

describe("theme tokens", () => {
  it("accepts valid OKLCH and rejects arbitrary CSS", () => {
    expect(isValidOKLCH("oklch(42% 0.15 305)")).toBe(true);
    expect(isValidOKLCH("red; background:url(javascript:alert(1))")).toBe(false);
  });

  it("maps only known theme tokens to semantic CSS variables", () => {
    const style = themeStyle({
      slug: "test",
      colors: {
        paper: "oklch(97% 0.008 310)",
        accent: "oklch(42% 0.15 305)",
        arbitrary: "red",
      },
      shape: { radiusCard: 12 },
    });
    expect(style["--color-paper"]).toBe("oklch(97% 0.008 310)");
    expect(style["--color-accent"]).toBe("oklch(42% 0.15 305)");
    expect(style["--radius-card"]).toBe("12px");
    expect(style).not.toHaveProperty("--arbitrary");
  });
});
