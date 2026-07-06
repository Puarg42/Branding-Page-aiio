import { spawn } from "node:child_process";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const viewport = {
  width: Number(process.env.REVIEW_VIEWPORT_WIDTH ?? 1440),
  height: Number(process.env.REVIEW_VIEWPORT_HEIGHT ?? 900),
};
const deviceScaleFactor = Number(process.env.REVIEW_DEVICE_SCALE_FACTOR ?? 1);
const defaultPort = Number(process.env.REVIEW_PORT ?? 3007);
const maxFullPageHeight = Number(process.env.REVIEW_MAX_FULL_PAGE_HEIGHT ?? 18000);
const maxSectionHeight = Number(process.env.REVIEW_MAX_SECTION_HEIGHT ?? 2600);
const outputRoot = path.resolve("review-screenshots");
const dryRun = process.argv.includes("--dry-run");

const coreReviewPages = [
  {
    name: "home",
    path: "/",
    sections: [
      ["home-hero", "hero"],
      ["monday-morning", "monday"],
      ["problem", "problem"],
      ["category-evolution", "why-now"],
      ["organizational-intelligence", "missing-capability"],
      ["capabilities", "journey"],
      ["architektur", "system"],
      ["self-empowering-organization", "outcome"],
      ["trust", "trust"],
    ],
  },
  {
    name: "platform",
    path: "/platform",
    sections: [
      ["platform-hero", "hero"],
      ["platform-missing-capability", "missing-capability"],
      ["platform-journey", "journey"],
      ["capability-layer", "system"],
      ["platform-outcome", "outcome"],
    ],
  },
  {
    name: "thinking",
    path: "/thinking",
    sections: [
      ["thinking-hero", "hero"],
      ["journal", "journal"],
      ["publication", "publication"],
    ],
  },
  {
    name: "theory",
    path: "/thinking/theory",
    sections: [
      ["theory-hero", "hero"],
      ["prologue", "prologue"],
      ["observation", "observation"],
      ["the-missing-layer", "missing-layer"],
      ["organizational-understanding", "organizational-understanding"],
      ["organizational-intelligence", "organizational-intelligence"],
      ["organizational-capabilities", "organizational-capabilities"],
      ["organizational-resilience", "organizational-resilience"],
    ],
  },
  {
    name: "business-impact",
    path: "/success-stories",
    sections: [
      ["business-impact-hero", "hero"],
      ["business-impact-landscape", "challenges"],
      ["business-impact-scenarios", "proof"],
      ["business-impact-insight", "insight"],
      ["business-impact-closing", "outcome"],
    ],
  },
  {
    name: "academy",
    path: "/academy",
    sections: [
      ["academy-hero", "hero"],
      ["academy-journey", "learning-journey"],
      ["academy-resources", "learning-resources"],
      ["academy-live", "live-learning"],
      ["academy-thinking", "continue-thinking"],
    ],
  },
  {
    name: "partners",
    path: "/partners",
    sections: [
      ["partners-hero", "hero"],
      ["partners-ecosystem", "ecosystem"],
      ["partners-model", "model"],
      ["partners-contact", "contact"],
    ],
  },
  {
    name: "company",
    path: "/company",
    sections: [
      ["company-hero", "hero"],
      ["company-mission", "mission"],
      ["company-principles", "principles"],
    ],
  },
  {
    name: "get-started",
    path: "/live-demo/kontakt",
    sections: [
      ["request-demo-hero", "hero"],
      ["request-demo-expectations", "expectations"],
      ["request-demo-form", "request"],
    ],
  },
];

const footerResourcePages = [
  {
    name: "contact",
    path: "/contact",
    autoSections: true,
  },
  {
    name: "kontakt",
    path: "/kontakt",
    autoSections: true,
  },
  {
    name: "download-center",
    path: "/downloadcenter",
    autoSections: true,
  },
  {
    name: "services",
    path: "/services",
    autoSections: true,
  },
  {
    name: "support",
    path: "/support",
    autoSections: true,
  },
  {
    name: "press",
    path: "/presse",
    autoSections: true,
  },
  {
    name: "legal-notice",
    path: "/impressum",
    sections: [
      ["impressum-hero", "hero"],
      ["impressum-content", "legal-content"],
    ],
  },
  {
    name: "privacy",
    path: "/datenschutz",
    sections: [
      ["datenschutz-hero", "hero"],
      ["datenschutz-content", "privacy-content"],
    ],
  },
];

function getOutputId() {
  if (process.env.REVIEW_OUTPUT_ID) {
    return process.env.REVIEW_OUTPUT_ID;
  }

  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function sanitizeFilename(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePagePath(pagePath) {
  const url = new URL(pagePath, "http://review.local");
  const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";
  return `${normalizedPath}${url.search}`;
}

function pageNameFromPath(pagePath) {
  const normalizedPath = normalizePagePath(pagePath);

  if (normalizedPath === "/") {
    return "home";
  }

  return sanitizeFilename(normalizedPath.replace(/^\//, ""));
}

function mergePageConfigs(...pageGroups) {
  const pages = new Map();

  for (const pageGroup of pageGroups) {
    for (const pageConfig of pageGroup) {
      const key = normalizePagePath(pageConfig.path);

      if (!pages.has(key)) {
        pages.set(key, {
          autoSections: false,
          sections: [],
          ...pageConfig,
          path: key,
        });
      }
    }
  }

  return Array.from(pages.values());
}

async function waitForUrl(url, timeoutMs = 60000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok || response.status < 500) {
        return;
      }
    } catch {
      // The local server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function startLocalServer(port) {
  const nextBin = path.resolve("node_modules", "next", "dist", "bin", "next");
  const server = spawn(
    process.execPath,
    [nextBin, "dev", "-p", String(port), "-H", "127.0.0.1"],
    {
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stdout.on("data", (chunk) => process.stdout.write(chunk));
  server.stderr.on("data", (chunk) => process.stderr.write(chunk));

  return server;
}

async function collectFooterLinks(page, baseUrl) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await waitForStablePage(page);

  const rawLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll("footer a[href]")).map((anchor) => ({
      href: anchor.getAttribute("href") ?? "",
      label:
        anchor.textContent?.replace(/\s+/g, " ").trim() ||
        anchor.getAttribute("aria-label") ||
        "Footer link",
    })),
  );

  const base = new URL(baseUrl);
  const internal = [];
  const external = [];
  const seenInternal = new Set();
  const seenExternal = new Set();

  for (const link of rawLinks) {
    const href = link.href.trim();

    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    const target = new URL(href, baseUrl);

    if (target.origin === base.origin) {
      const normalizedPath = normalizePagePath(`${target.pathname}${target.search}`);

      if (!seenInternal.has(normalizedPath)) {
        seenInternal.add(normalizedPath);
        internal.push({
          label: link.label,
          path: normalizedPath,
        });
      }
    } else if (!seenExternal.has(target.toString())) {
      seenExternal.add(target.toString());
      external.push({
        label: link.label,
        url: target.toString(),
      });
    }
  }

  return { external, internal };
}

async function routeExists(baseUrl, pagePath) {
  try {
    const response = await fetch(new URL(pagePath, baseUrl), { cache: "no-store" });
    return response.status < 400;
  } catch {
    return false;
  }
}

async function withBrowser() {
  const candidates = process.env.PLAYWRIGHT_CHANNEL
    ? [{ channel: process.env.PLAYWRIGHT_CHANNEL }]
    : [
        {},
        ...(process.platform === "win32" ? [{ channel: "msedge" }] : []),
        { channel: "chrome" },
      ];

  const failures = [];

  for (const candidate of candidates) {
    try {
      return await chromium.launch({
        headless: true,
        ...candidate,
      });
    } catch (error) {
      failures.push(
        `${candidate.channel ?? "bundled chromium"}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  throw new Error(
    [
      "Unable to launch a Playwright browser.",
      "Run `npx playwright install chromium` or set PLAYWRIGHT_CHANNEL=msedge/chrome.",
      ...failures,
    ].join("\n"),
  );
}

async function waitForStablePage(page) {
  await page.evaluate(async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }

    const images = Array.from(document.images);
    images.forEach((image) => {
      image.loading = "eager";
    });

    await Promise.race(
      [
        Promise.all(
          images.map(async (image) => {
            if (!image.complete) {
              await new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              });
            }

            if (typeof image.decode === "function") {
              await image.decode().catch(() => undefined);
            }
          }),
        ),
        new Promise((resolve) => setTimeout(resolve, 8000)),
      ],
    );
  });

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }

      .trust-reference-marquee-track {
        transform: translate3d(0, 0, 0) !important;
      }

      html {
        caret-color: transparent !important;
      }
    `,
  });

  await page.waitForTimeout(700);
}

async function getDocumentMetrics(page) {
  return page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;

    return {
      height: Math.ceil(
        Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
        ),
      ),
      width: Math.ceil(Math.max(html.clientWidth, body.scrollWidth, html.scrollWidth)),
    };
  });
}

async function getSectionClip(page, id) {
  return page.evaluate((sectionId) => {
    const element = document.getElementById(sectionId);

    if (!element) {
      return null;
    }

    const rect = element.getBoundingClientRect();
    const html = document.documentElement;

    return {
      height: Math.max(1, Math.ceil(rect.height)),
      width: Math.ceil(Math.max(html.clientWidth, rect.width)),
      x: 0,
      y: Math.max(0, Math.floor(rect.top + window.scrollY)),
    };
  }, id);
}

async function getSemanticSections(page, fallbackPageName) {
  const sections = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("main section[id], main article[id]"));
    const seen = new Set();

    return elements
      .map((element) => {
        const id = element.id;

        if (!id || seen.has(id)) {
          return null;
        }

        seen.add(id);

        const labelSource =
          element.getAttribute("aria-label") ||
          element.querySelector(".eyebrow, .legal-eyebrow")?.textContent ||
          element.querySelector("h1, h2, h3")?.textContent ||
          id;

        return [id, labelSource.replace(/\s+/g, " ").trim()];
      })
      .filter(Boolean);
  });

  if (sections.length > 0) {
    return sections;
  }

  return [["__viewport__", fallbackPageName]];
}

async function captureSection(page, pageOutputDir, pageName, index, [id, label]) {
  const clip =
    id === "__viewport__"
      ? { height: viewport.height, width: viewport.width, x: 0, y: 0 }
      : await getSectionClip(page, id);
  const metrics = await getDocumentMetrics(page);

  if (!clip) {
    return [];
  }

  await page.evaluate((top) => window.scrollTo(0, top), clip.y);
  await page.waitForTimeout(150);

  const safeLabel = sanitizeFilename(label);
  const files = [];
  const availableHeight = Math.max(0, metrics.height - clip.y);
  const sectionHeight = Math.min(clip.height, availableHeight);
  const chunkCount = Math.ceil(sectionHeight / maxSectionHeight);

  if (sectionHeight <= 0) {
    return [];
  }

  for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex += 1) {
    const chunkY = clip.y + chunkIndex * maxSectionHeight;
    const chunkHeight = Math.min(maxSectionHeight, sectionHeight - chunkIndex * maxSectionHeight);
    const suffix =
      chunkCount > 1 ? `-part-${String(chunkIndex + 1).padStart(2, "0")}` : "";
    const fileName = `${pageName}-${String(index).padStart(2, "0")}-${safeLabel}${suffix}.png`;
    const filePath = path.join(pageOutputDir, fileName);

    await page.screenshot({
      fullPage: true,
      path: filePath,
      clip: {
        height: Math.max(1, Math.floor(chunkHeight)),
        width: Math.floor(Math.min(clip.width, metrics.width)),
        x: Math.floor(clip.x),
        y: Math.floor(chunkY),
      },
    });
    files.push(fileName);
  }

  return files;
}

async function capturePage(page, baseUrl, pageConfig, outputDir) {
  const pageOutputDir = path.join(outputDir, pageConfig.name);
  await mkdir(pageOutputDir, { recursive: true });

  await page.goto(new URL(pageConfig.path, baseUrl).toString(), {
    waitUntil: "networkidle",
  });
  await waitForStablePage(page);

  const metrics = await getDocumentMetrics(page);
  let fullPageFile = null;

  if (metrics.height <= maxFullPageHeight) {
    fullPageFile = `${pageConfig.name}-00-full-page.png`;
    await page.screenshot({
      fullPage: true,
      path: path.join(pageOutputDir, fullPageFile),
    });
  } else {
    console.log(
      `Skipping full-page screenshot for ${pageConfig.name}; page height ${metrics.height}px exceeds ${maxFullPageHeight}px.`,
    );
  }

  const sections = pageConfig.autoSections
    ? await getSemanticSections(page, pageConfig.name)
    : pageConfig.sections;
  const sectionFiles = [];

  for (const [sectionIndex, section] of sections.entries()) {
    const files = await captureSection(
      page,
      pageOutputDir,
      pageConfig.name,
      sectionIndex + 1,
      section,
    );

    if (files.length > 0) {
      sectionFiles.push(...files);
    }
  }

  return {
    fullPage: fullPageFile,
    page: pageConfig.path,
    sections: sectionFiles,
  };
}

async function main() {
  const outputId = getOutputId();
  const outputDir = path.join(outputRoot, outputId);

  if (dryRun) {
    console.log(
      JSON.stringify(
        {
          deviceScaleFactor,
          maxFullPageHeight,
          maxSectionHeight,
          outputDir,
          pages: mergePageConfigs(coreReviewPages, footerResourcePages).map(
            ({ autoSections, name, path: pagePath, sections }) => ({
              name,
              path: pagePath,
              autoSections,
              sections: sections.map(([id, label]) => ({ id, label })),
            }),
          ),
          footerLinks: {
            note:
              "Footer links are collected at runtime. Internal routes are captured; external URLs are listed in manifest.json and skipped.",
          },
          viewport,
        },
        null,
        2,
      ),
    );
    return;
  }

  let server = null;
  const baseUrl = process.env.REVIEW_BASE_URL ?? `http://127.0.0.1:${defaultPort}`;

  if (!process.env.REVIEW_BASE_URL) {
    server = startLocalServer(defaultPort);
  }

  let browser = null;
  let context = null;
  const results = {};
  const skippedPages = [];
  let footerLinks = { external: [], internal: [] };

  try {
    await waitForUrl(baseUrl);
    await mkdir(outputDir, { recursive: true });

    browser = await withBrowser();
    context = await browser.newContext({
      colorScheme: "dark",
      deviceScaleFactor,
      viewport,
    });
    const page = await context.newPage();

    footerLinks = await collectFooterLinks(page, baseUrl);
    const footerPages = footerLinks.internal.map((link) => ({
      autoSections: true,
      name: pageNameFromPath(link.path),
      path: link.path,
    }));
    const reviewPages = mergePageConfigs(coreReviewPages, footerResourcePages, footerPages);

    for (const pageConfig of reviewPages) {
      if (!(await routeExists(baseUrl, pageConfig.path))) {
        skippedPages.push({
          name: pageConfig.name,
          path: pageConfig.path,
          reason: "Route returned 404 or could not be reached.",
        });
        console.log(`Skipped ${pageConfig.name}; route is not available.`);
        continue;
      }

      results[pageConfig.name] = await capturePage(page, baseUrl, pageConfig, outputDir);
      console.log(`Captured ${pageConfig.name}`);
    }

    await writeFile(
      path.join(outputDir, "manifest.json"),
      JSON.stringify(
        {
          baseUrl,
          createdAt: new Date().toISOString(),
          deviceScaleFactor,
          externalFooterLinks: footerLinks.external,
          internalFooterLinks: footerLinks.internal,
          outputId,
          pages: results,
          skippedPages,
          viewport,
        },
        null,
        2,
      ),
    );

    console.log(`Review screenshots written to ${outputDir}`);
  } finally {
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
