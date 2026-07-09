import { execFileSync, spawn } from "node:child_process";
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const viewports = [
  {
    deviceScaleFactor: 1,
    height: Number(process.env.REVIEW_DESKTOP_HEIGHT ?? 900),
    isMobile: false,
    name: "desktop",
    width: Number(process.env.REVIEW_DESKTOP_WIDTH ?? 1440),
  },
  {
    deviceScaleFactor: 1,
    hasTouch: true,
    height: Number(process.env.REVIEW_MOBILE_HEIGHT ?? 844),
    isMobile: true,
    name: "mobile",
    width: Number(process.env.REVIEW_MOBILE_WIDTH ?? 390),
  },
];

const defaultPort = Number(process.env.REVIEW_PORT ?? 3007);
const discoveryLimit = Number(process.env.REVIEW_DISCOVERY_LIMIT ?? 160);
const maxSectionHeight = Number(process.env.REVIEW_MAX_SECTION_HEIGHT ?? 2600);
const outputRoot = path.resolve("review");
const dryRun = process.argv.includes("--dry-run");

const configuredPages = [
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
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizePagePath(pagePath) {
  const url = new URL(pagePath, "http://review.local");
  const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";
  return normalizedPath;
}

function pageNameFromPath(pagePath) {
  const normalizedPath = normalizePagePath(pagePath);

  if (normalizedPath === "/") {
    return "home";
  }

  return sanitizeFilename(normalizedPath.replace(/^\//, ""));
}

function hasFileExtension(pagePath) {
  return /\.[a-z0-9]+$/i.test(normalizePagePath(pagePath));
}

function isReviewablePath(pagePath) {
  const normalizedPath = normalizePagePath(pagePath);

  if (
    normalizedPath.startsWith("/_next") ||
    normalizedPath.startsWith("/api") ||
    normalizedPath.includes("/.")
  ) {
    return false;
  }

  return !hasFileExtension(normalizedPath);
}

function mergePageConfigs(...pageGroups) {
  const pages = new Map();

  for (const pageGroup of pageGroups) {
    for (const pageConfig of pageGroup) {
      const key = normalizePagePath(pageConfig.path);

      if (!isReviewablePath(key) || pages.has(key)) {
        continue;
      }

      pages.set(key, {
        autoSections: false,
        discoverySources: [],
        sections: [],
        ...pageConfig,
        path: key,
      });
    }
  }

  return Array.from(pages.values()).sort((a, b) => {
    if (a.path === "/") {
      return -1;
    }
    if (b.path === "/") {
      return 1;
    }
    return a.path.localeCompare(b.path);
  });
}

async function collectAppPageRoutes(appDir = path.resolve("app")) {
  const routes = [];

  async function walk(currentDir, segments = []) {
    let entries = [];

    try {
      entries = await readdir(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    if (entries.some((entry) => entry.isFile() && entry.name === "page.tsx")) {
      const routeSegments = segments.filter(
        (segment) => !segment.startsWith("(") && !segment.startsWith("_"),
      );
      routes.push(`/${routeSegments.join("/")}`.replace(/\/+$/, "") || "/");
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      if (entry.name.startsWith("_") || entry.name === "node_modules") {
        continue;
      }

      await walk(path.join(currentDir, entry.name), [...segments, entry.name]);
    }
  }

  await walk(appDir);
  return routes.filter(isReviewablePath);
}

function configuredPageForPath(pagePath) {
  return configuredPages.find((pageConfig) => normalizePagePath(pageConfig.path) === pagePath);
}

function pageConfigFromPath(pagePath, discoverySource) {
  const configuredPage = configuredPageForPath(pagePath);

  if (configuredPage) {
    return {
      ...configuredPage,
      discoverySources: Array.from(
        new Set([...(configuredPage.discoverySources ?? ["configured"]), discoverySource]),
      ),
    };
  }

  return {
    autoSections: true,
    discoverySources: [discoverySource],
    name: pageNameFromPath(pagePath),
    path: pagePath,
    sections: [],
  };
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
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        animation-play-state: paused !important;
        scroll-behavior: auto !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
      }

      .trust-reference-marquee-track {
        transform: translate3d(0, 0, 0) !important;
      }

      html,
      body {
        caret-color: transparent !important;
        scrollbar-width: none !important;
      }

      html::-webkit-scrollbar,
      body::-webkit-scrollbar {
        display: none !important;
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
      width: Math.ceil(html.clientWidth),
    };
  });
}

async function getSectionClip(page, id, viewportWidth) {
  if (id === "__document__") {
    const metrics = await getDocumentMetrics(page);

    return {
      height: metrics.height,
      width: Math.min(metrics.width, viewportWidth),
      x: 0,
      y: 0,
    };
  }

  return page.evaluate(
    ({ sectionId, width }) => {
      const element = document.getElementById(sectionId);

      if (!element) {
        return null;
      }

      const rect = element.getBoundingClientRect();

      return {
        height: Math.max(1, Math.ceil(rect.height)),
        width,
        x: 0,
        y: Math.max(0, Math.floor(rect.top + window.scrollY)),
      };
    },
    { sectionId: id, width: viewportWidth },
  );
}

async function getSemanticSections(page, fallbackPageName) {
  const sections = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll("main section[id]"));
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

  return [["__document__", fallbackPageName]];
}

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

async function captureSection(page, pageOutputDir, pageName, viewportConfig, index, [id, label]) {
  const clip = await getSectionClip(page, id, viewportConfig.width);
  const metrics = await getDocumentMetrics(page);

  if (!clip) {
    return [];
  }

  await page.evaluate((top) => window.scrollTo(0, top), clip.y);
  await page.waitForTimeout(150);

  const safeLabel = sanitizeFilename(label) || "section";
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
        width: Math.floor(Math.min(clip.width, metrics.width, viewportConfig.width)),
        x: Math.floor(clip.x),
        y: Math.floor(chunkY),
      },
    });

    files.push({
      file: toPosixPath(path.relative(outputRoot, filePath)),
      label,
      sectionId: id,
    });
  }

  return files;
}

async function capturePage(page, baseUrl, pageConfig, viewportConfig) {
  const pageOutputDir = path.join(outputRoot, "images", viewportConfig.name, pageConfig.name);
  await mkdir(pageOutputDir, { recursive: true });

  const response = await page.goto(new URL(pageConfig.path, baseUrl).toString(), {
    waitUntil: "networkidle",
  });

  if (!response || response.status() >= 400) {
    return {
      error: `Route returned HTTP ${response?.status() ?? "unknown"}`,
      screenshots: [],
      title: pageConfig.name,
    };
  }

  await waitForStablePage(page);

  const title = await page.title();
  const sections = pageConfig.autoSections
    ? await getSemanticSections(page, pageConfig.name)
    : pageConfig.sections;
  const screenshots = [];

  for (const [sectionIndex, section] of sections.entries()) {
    const files = await captureSection(
      page,
      pageOutputDir,
      pageConfig.name,
      viewportConfig,
      sectionIndex + 1,
      section,
    );

    screenshots.push(...files);
  }

  return {
    screenshots,
    title,
  };
}

function getLinksFromPage(page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]")).map((anchor) => ({
      href: anchor.getAttribute("href") ?? "",
      label:
        anchor.textContent?.replace(/\s+/g, " ").trim() ||
        anchor.getAttribute("aria-label") ||
        "Internal link",
    })),
  );
}

function classifyLinks(rawLinks, baseUrl) {
  const base = new URL(baseUrl);
  const internal = [];
  const external = [];

  for (const link of rawLinks) {
    const href = link.href.trim();

    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    const target = new URL(href, baseUrl);

    if (target.origin === base.origin) {
      const normalizedPath = normalizePagePath(target.pathname);

      if (isReviewablePath(normalizedPath)) {
        internal.push({
          label: link.label,
          path: normalizedPath,
        });
      }
    } else {
      external.push({
        label: link.label,
        url: target.toString(),
      });
    }
  }

  return { external, internal };
}

async function discoverRuntimeLinks(page, baseUrl, seedPaths) {
  const queue = [...seedPaths];
  const visited = new Set();
  const discovered = new Map();
  const externalLinks = new Map();
  const skipped = [];

  while (queue.length > 0 && visited.size < discoveryLimit) {
    const currentPath = normalizePagePath(queue.shift());

    if (visited.has(currentPath) || !isReviewablePath(currentPath)) {
      continue;
    }

    visited.add(currentPath);

    let response = null;

    try {
      response = await page.goto(new URL(currentPath, baseUrl).toString(), {
        waitUntil: "domcontentloaded",
      });
      await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => undefined);
    } catch (error) {
      skipped.push({
        path: currentPath,
        reason: error instanceof Error ? error.message : String(error),
      });
      continue;
    }

    const contentType = response?.headers()["content-type"] ?? "";

    if (!response || response.status() >= 400 || !contentType.includes("text/html")) {
      skipped.push({
        path: currentPath,
        reason: `Route returned ${response?.status() ?? "unknown"} ${contentType}`,
      });
      continue;
    }

    discovered.set(currentPath, currentPath);

    const rawLinks = await getLinksFromPage(page);
    const { external, internal } = classifyLinks(rawLinks, baseUrl);

    for (const externalLink of external) {
      externalLinks.set(externalLink.url, externalLink);
    }

    for (const internalLink of internal) {
      if (!visited.has(internalLink.path) && !queue.includes(internalLink.path)) {
        queue.push(internalLink.path);
      }
    }
  }

  return {
    externalLinks: Array.from(externalLinks.values()).sort((a, b) => a.url.localeCompare(b.url)),
    paths: Array.from(discovered.keys()),
    skipped,
  };
}

async function prepareOutput() {
  await mkdir(outputRoot, { recursive: true });
  await rm(path.join(outputRoot, "images"), { force: true, recursive: true });
  await rm(path.join(outputRoot, "videos"), { force: true, recursive: true });
  await rm(path.join(outputRoot, "index.html"), { force: true });
  await rm(path.join(outputRoot, "manifest.json"), { force: true });
  await mkdir(path.join(outputRoot, "images", "desktop"), { recursive: true });
  await mkdir(path.join(outputRoot, "images", "mobile"), { recursive: true });
  await mkdir(path.join(outputRoot, "videos"), { recursive: true });
}

function buildReadme({ externalLinks }) {
  const externalList =
    externalLinks.length > 0
      ? externalLinks.map((link) => `- ${link.label}: ${link.url}`).join("\n")
      : "- None discovered.";

  return `# aiio Release Review Package

This folder contains the generated visual review package for the aiio Branding Website.

## Command

\`\`\`bash
npm run review
\`\`\`

The command starts a local Next preview automatically unless \`REVIEW_BASE_URL\` is set.

## Viewports

- Desktop: 1440 x 900
- Mobile: 390 x 844
- Device scale factor: 1
- Color scheme: dark

## Output

\`\`\`text
review/
  images/
    desktop/
    mobile/
  videos/
  index.html
  manifest.json
  README.md
\`\`\`

## Naming Convention

Screenshots follow this pattern:

\`\`\`text
<page>/<page>-<section-number>-<section-name>.png
\`\`\`

Screenshots are section-based. The exporter avoids extremely long full-page images and splits very tall sections into numbered parts.

## Coverage

The exporter combines:

- configured editorial pages
- filesystem discovery from \`app/**/page.tsx\`
- runtime link discovery from internal anchors
- main navigation links
- footer navigation links
- CTA links
- resource page links

Internal routes are captured when they resolve to HTML pages. External links are listed but not captured.

## External Links Excluded From Capture

${externalList}

## Manifest

\`review/manifest.json\` records timestamp, viewport configuration, page titles, routes, screenshots and skipped routes.

## Gallery

\`review/index.html\` is a static gallery for visual review. It groups screenshots by viewport and page.

## Animation Handling

The exporter waits for fonts and images, then pauses CSS animations and transitions before capture. This creates a canonical static review state for marquees, hero motion, floating effects and scroll decorations.
`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildGallery(manifest) {
  const pages = manifest.pages
    .map((page) => {
      const viewportBlocks = viewports
        .map((viewportConfig) => {
          const screenshots = page.viewports[viewportConfig.name]?.screenshots ?? [];

          if (screenshots.length === 0) {
            return "";
          }

          const imageMarkup = screenshots
            .map(
              (screenshot) => `
                <figure>
                  <img alt="${escapeHtml(page.name)} ${escapeHtml(screenshot.label)}" loading="lazy" src="${escapeHtml(screenshot.file)}" />
                  <figcaption>${escapeHtml(screenshot.label)}</figcaption>
                </figure>`,
            )
            .join("");

          return `
            <section class="viewport-block">
              <h3>${escapeHtml(viewportConfig.name)}</h3>
              <div class="image-grid">${imageMarkup}</div>
            </section>`;
        })
        .join("");

      return `
        <article class="page-group">
          <header>
            <p>${escapeHtml(page.route)}</p>
            <h2>${escapeHtml(page.title || page.name)}</h2>
          </header>
          ${viewportBlocks}
        </article>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>aiio Release Review</title>
    <style>
      :root {
        color: #17141d;
        background: #ffffff;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      body {
        margin: 0;
        background: #ffffff;
      }

      .shell {
        margin: 0 auto;
        max-width: 1440px;
        padding: 48px 32px 80px;
      }

      .intro {
        border-bottom: 1px solid #e7e3ed;
        margin-bottom: 40px;
        padding-bottom: 28px;
      }

      .intro p,
      .page-group header p {
        color: #6f687a;
        font-size: 13px;
        letter-spacing: .08em;
        margin: 0 0 10px;
        text-transform: uppercase;
      }

      h1,
      h2,
      h3 {
        letter-spacing: 0;
        line-height: 1.05;
        margin: 0;
      }

      h1 {
        font-size: clamp(40px, 6vw, 84px);
      }

      h2 {
        font-size: clamp(28px, 4vw, 48px);
      }

      h3 {
        border-top: 1px solid #ece8f2;
        color: #5a328a;
        font-size: 14px;
        letter-spacing: .08em;
        margin-top: 32px;
        padding-top: 24px;
        text-transform: uppercase;
      }

      .page-group {
        border-bottom: 1px solid #e7e3ed;
        margin-bottom: 56px;
        padding-bottom: 56px;
      }

      .page-group header {
        margin-bottom: 24px;
      }

      .image-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      }

      figure {
        background: #f7f5fa;
        border: 1px solid #e8e4ef;
        margin: 0;
        padding: 12px;
      }

      img {
        background: #08080c;
        display: block;
        height: auto;
        width: 100%;
      }

      figcaption {
        color: #514a5e;
        font-size: 13px;
        margin-top: 10px;
      }

      @media (max-width: 720px) {
        .shell {
          padding: 32px 18px 56px;
        }

        .image-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="intro">
        <p>aiio Brand Canon Review</p>
        <h1>Release Review Package</h1>
      </section>
      ${pages}
    </main>
  </body>
</html>
`;
}

async function getDirectorySize(dir) {
  let total = 0;

  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        total += await getDirectorySize(entryPath);
      } else {
        total += (await stat(entryPath)).size;
      }
    }
  } catch {
    return total;
  }

  return total;
}

async function main() {
  const outputId = getOutputId();
  const baseUrl = process.env.REVIEW_BASE_URL ?? `http://127.0.0.1:${defaultPort}`;
  const appRoutes = await collectAppPageRoutes();
  const configuredRoutes = configuredPages.map((pageConfig) => pageConfig.path);
  const seedPaths = Array.from(new Set(["/", ...configuredRoutes, ...appRoutes])).filter(
    isReviewablePath,
  );

  if (dryRun) {
    const previewPages = mergePageConfigs(
      configuredPages.map((pageConfig) => ({
        ...pageConfig,
        discoverySources: ["configured"],
      })),
      appRoutes.map((pagePath) => pageConfigFromPath(pagePath, "filesystem")),
    );

    console.log(
      JSON.stringify(
        {
          outputRoot,
          pages: previewPages.map(({ autoSections, name, path: pagePath, sections }) => ({
            autoSections,
            name,
            path: pagePath,
            sections: sections.map(([id, label]) => ({ id, label })),
          })),
          seedPaths,
          viewports,
        },
        null,
        2,
      ),
    );
    return;
  }

  let server = null;
  let browser = null;
  let discoveryContext = null;

  if (!process.env.REVIEW_BASE_URL) {
    server = startLocalServer(defaultPort);
  }

  try {
    await waitForUrl(baseUrl);
    await prepareOutput();

    browser = await withBrowser();
    discoveryContext = await browser.newContext({
      colorScheme: "dark",
      deviceScaleFactor: 1,
      viewport: {
        height: viewports[0].height,
        width: viewports[0].width,
      },
    });

    const discoveryPage = await discoveryContext.newPage();
    const discovery = await discoverRuntimeLinks(discoveryPage, baseUrl, seedPaths);

    await discoveryContext.close();
    discoveryContext = null;

    const reviewPages = mergePageConfigs(
      configuredPages.map((pageConfig) => ({
        ...pageConfig,
        discoverySources: ["configured"],
      })),
      appRoutes.map((pagePath) => pageConfigFromPath(pagePath, "filesystem")),
      discovery.paths.map((pagePath) => pageConfigFromPath(pagePath, "runtime-link")),
    );

    const manifest = {
      baseUrl,
      createdAt: new Date().toISOString(),
      externalLinks: discovery.externalLinks,
      outputId,
      pages: [],
      skippedPages: discovery.skipped,
      videos: [],
      viewports: viewports.map(({ deviceScaleFactor, height, name, width }) => ({
        deviceScaleFactor,
        height,
        name,
        width,
      })),
    };

    for (const viewportConfig of viewports) {
      const context = await browser.newContext({
        colorScheme: "dark",
        deviceScaleFactor: viewportConfig.deviceScaleFactor,
        hasTouch: Boolean(viewportConfig.hasTouch),
        isMobile: viewportConfig.isMobile,
        viewport: {
          height: viewportConfig.height,
          width: viewportConfig.width,
        },
      });
      const page = await context.newPage();

      for (const pageConfig of reviewPages) {
        let pageEntry = manifest.pages.find((entry) => entry.route === pageConfig.path);

        if (!pageEntry) {
          pageEntry = {
            discoverySources: pageConfig.discoverySources ?? [],
            name: pageConfig.name,
            route: pageConfig.path,
            title: pageConfig.name,
            viewports: {},
          };
          manifest.pages.push(pageEntry);
        }

        const result = await capturePage(page, baseUrl, pageConfig, viewportConfig);
        pageEntry.title = result.title || pageEntry.title;
        pageEntry.viewports[viewportConfig.name] = {
          error: result.error,
          screenshots: result.screenshots,
          viewport: {
            deviceScaleFactor: viewportConfig.deviceScaleFactor,
            height: viewportConfig.height,
            width: viewportConfig.width,
          },
        };

        console.log(`Captured ${pageConfig.name} (${viewportConfig.name})`);
      }

      await context.close();
    }

    manifest.pages.sort((a, b) => {
      if (a.route === "/") {
        return -1;
      }
      if (b.route === "/") {
        return 1;
      }
      return a.route.localeCompare(b.route);
    });

    await writeFile(path.join(outputRoot, "manifest.json"), JSON.stringify(manifest, null, 2));
    await writeFile(path.join(outputRoot, "index.html"), buildGallery(manifest));
    await writeFile(path.join(outputRoot, "README.md"), buildReadme(manifest));

    const size = await getDirectorySize(path.join(outputRoot, "images"));
    console.log(
      `Review package written to ${outputRoot} (${manifest.pages.length} pages, ${Math.round(
        size / 1024 / 1024,
      )} MB of screenshots).`,
    );
  } finally {
    if (discoveryContext) {
      await discoveryContext.close();
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
