import { expect, test } from "@playwright/test";

const goldenRoutes = [
  ["home", "/en"],
  ["platform", "/en/platform"],
  ["company", "/en/company"],
  ["resource-privacy", "/de/datenschutz"],
  ["article", "/de/blog/ki-trends-2026"],
  ["theme-showcase", "/en/theme-showcase"],
] as const;

test.describe("golden page visual baseline", () => {
  for (const [name, route] of goldenRoutes) {
    test(`${name} matches approved rendering`, async ({ page }) => {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});
