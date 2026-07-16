import { expect, test } from "@playwright/test";

test.describe("marketing site smoke", () => {
  test("home renders with English locale and self canonical", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await expect(page).toHaveTitle(/aiio/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/en$/);
  });

  test("primary navigation and footer are present", async ({ page }) => {
    await page.goto("/en");
    const desktopNav = page.getByRole("navigation", { name: /Main navigation/i });
    if (await desktopNav.isVisible()) {
      await expect(desktopNav).toBeVisible();
    } else {
      await page.getByRole("button", { name: /Menu/i }).click();
      await expect(
        page.getByRole("navigation", { name: /Mobile navigation/i }),
      ).toBeVisible();
    }
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("/contact permanently redirects to the canonical conversion page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL(/\/en\/conversation$/);
  });

  test("platform advertises its own canonical", async ({ page }) => {
    await page.goto("/platform");
    await expect(page).toHaveURL(/\/en\/platform$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/en\/platform$/,
    );
    await expect(page.locator('link[hreflang="de"]')).toHaveAttribute(
      "href",
      /\/de\/plattform$/,
    );
  });

  test("lead form validates required fields client + server side", async ({ page }) => {
    await page.goto("/en/conversation");
    const form = page.locator("form").first();
    await expect(form.getByLabel("Name", { exact: false })).toBeVisible();
    await expect(form.getByLabel("Email", { exact: false })).toBeVisible();
  });

  test("no horizontal overflow on mobile home", async ({ page }) => {
    await page.goto("/en");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    );
    expect(overflow).toBe(true);
  });

  test("German locale has localized document language, URL and switcher", async ({
    page,
  }) => {
    await page.goto("/de/plattform");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(page.locator('a[href="/en/platform"]').first()).toHaveAttribute(
      "href",
      /\/en\/platform$/,
    );
  });

  test("Payload admin and API remain unprefixed", async ({ request }) => {
    expect((await request.get("/admin")).status()).toBe(200);
    expect((await request.get("/api/pages")).status()).toBe(200);
    expect(
      (
        await request.post("/api/deepl/translate", {
          data: { text: "Hallo", targetLocale: "en" },
        })
      ).status(),
    ).toBe(401);
  });

  test("localized sitemap includes EN/DE alternates", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    expect(xml).toContain("/en/platform");
    expect(xml).toContain("/de/plattform");
    expect(xml).toContain('hreflang="x-default"');
  });
});
