# Brand Canon Visual Review Screenshots

This folder contains the repeatable visual review workflow for the aiio Branding Website.

## Command

Run:

```bash
npm run brand-review
```

Alias:

```bash
npm run review
```

The command starts a local Next preview automatically unless `REVIEW_BASE_URL` is set.

## Viewport

All screenshots use one desktop viewport:

- Width: `1440px`
- Height: `900px`
- Device scale factor: `1`
- Color scheme: dark

Override when needed:

```bash
REVIEW_VIEWPORT_WIDTH=1440 REVIEW_VIEWPORT_HEIGHT=900 REVIEW_DEVICE_SCALE_FACTOR=1 npm run brand-review
```

## Output Structure

Screenshots are written to:

```text
review-screenshots/
  <commit-sha>/
    home/
      home-00-full-page.png
      home-01-hero.png
      ...
    platform/
      platform-00-full-page.png
      platform-01-hero.png
      ...
    manifest.json
```

The output folder defaults to the current short Git commit SHA. Set `REVIEW_OUTPUT_ID` to use a custom folder name.

## Naming Convention

Files follow this pattern:

```text
<page>-00-full-page.png
<page>-<section-number>-<section-name>.png
```

Section screenshots are captured from natural semantic section IDs. Missing sections are skipped rather than cropped arbitrarily.

Very long pages skip the single full-page PNG when the document height exceeds `REVIEW_MAX_FULL_PAGE_HEIGHT` (default `18000px`) and rely on natural section screenshots instead. Very long sections are split into numbered parts inside the same semantic section boundary.

## Pages Covered

- Home: `/`
- Platform: `/platform`
- Thinking: `/thinking`
- Theory: `/thinking/theory`
- Business Impact: `/success-stories`
- Academy: `/academy`
- Partners: `/partners`
- Company: `/company`
- Get Started: `/live-demo/kontakt`

## Footer Menu Coverage

The export also covers footer-linked and footer-adjacent resource pages so legacy pages do not escape the Brand Canon review.

The script collects internal links from the rendered footer at runtime. Every internal footer link that resolves to an existing route is captured automatically. External footer links are not captured; they are listed in the generated `manifest.json` under `externalFooterLinks`.

The following currently available footer/resource routes are explicitly included as review pages:

- Contact: `/contact`
- Kontakt: `/kontakt`
- Download Center: `/downloadcenter`
- Services: `/services`
- Support: `/support`
- Press: `/presse`
- Legal Notice / Impressum: `/impressum`
- Privacy: `/datenschutz`

Current external footer links:

- LinkedIn: `https://www.linkedin.com/company/aiio-gmbh/`

## Animation Handling

The script waits for fonts and images, then pauses CSS animations and transitions before capture. This keeps logo marquees, hero motion, floating effects and scroll transitions in static review states.

## Browser Setup

The script uses Playwright. If no browser is available, run:

```bash
npx playwright install chromium
```

On Windows, the script also attempts to use Microsoft Edge automatically.
