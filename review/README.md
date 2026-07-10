# aiio Release Review Package

This folder contains the generated visual review package for the aiio Branding Website.

## Command

```bash
npm run review
```

The command starts a local Next preview automatically unless `REVIEW_BASE_URL` is set.

## Viewports

- Desktop: 1440 x 900
- Mobile: 390 x 844
- Device scale factor: 1
- Color scheme: dark

## Output

```text
review/
  images/
    desktop/
    mobile/
  videos/
  index.html
  manifest.json
  README.md
```

## Naming Convention

Screenshots follow this pattern:

```text
<page>/<page>-<section-number>-<section-name>.png
```

Screenshots are section-based. The exporter avoids extremely long full-page images and splits very tall sections into numbered parts.

## Coverage

The exporter combines:

- configured editorial pages
- filesystem discovery from `app/**/page.tsx`
- runtime link discovery from internal anchors
- main navigation links
- footer navigation links
- CTA links
- resource page links

Internal routes are captured when they resolve to HTML pages. External links are listed but not captured.

## External Links Excluded From Capture

- ProcessMagnet ansehen: https://process-magnet.com/
- ProcessCollector ansehen: https://processcollector.com/
- ProcessForge ansehen: https://processforge.com/
- LinkedIn: https://www.linkedin.com/company/aiio-gmbh/

## Manifest

`review/manifest.json` records timestamp, viewport configuration, page titles, routes, screenshots and skipped routes.

## Gallery

`review/index.html` is a static gallery for visual review. It groups screenshots by viewport and page.

## Animation Handling

The exporter waits for fonts and images, then pauses CSS animations and transitions before capture. This creates a canonical static review state for marquees, hero motion, floating effects and scroll decorations.
