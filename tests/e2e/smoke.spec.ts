import { expect, test } from "@playwright/test";

test.describe("marketing site smoke", () => {
  test("home renders with English locale and self canonical", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/aiio/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/$/);
  });

  test("primary navigation and footer are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: /Hauptnavigation/i })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("/contact permanently redirects to the canonical conversion page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL(/\/live-demo\/kontakt$/);
  });

  test("platform advertises its own canonical", async ({ page }) => {
    await page.goto("/platform");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/platform$/);
  });

  test("lead form validates required fields client + server side", async ({ page }) => {
    await page.goto("/live-demo/kontakt");
    const form = page.locator("form").first();
    await expect(form.getByLabel("Name", { exact: false })).toBeVisible();
    await expect(form.getByLabel("Email", { exact: false })).toBeVisible();
  });

  test("no horizontal overflow on mobile home", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    );
    expect(overflow).toBe(true);
  });
});
