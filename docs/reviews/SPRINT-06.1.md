# SPRINT 06.1 - Hero Brand Integration

## Objective

Complete the Hero by integrating BC-001 Organizational Mind as atmospheric depth without changing navigation, copy, typography, CTA placement, margins or the overall composition.

## Integration Approach

BC-001 is integrated through the existing Hero visual layer and controlled through CSS only. The asset is not presented as a poster or explanatory illustration. It is masked, darkened and positioned as a spatial background presence so the typography remains the primary visual event.

## Crop Strategy

- Desktop: right-weighted crop with the semantic sphere and selected structures visible in the right half of the Hero.
- Tablet: wider crop shifted further right with reduced opacity to preserve reading priority.
- Mobile: narrow discovery crop with very low opacity, positioned as atmosphere rather than content.

## Opacity Strategy

The desktop Hero uses a restrained low-opacity image layer combined with dark overlays and soft masks. Tablet and mobile reduce opacity further. The intent is that visitors first notice the headline, then gradually discover the Brand Canon in the background.

## Responsive Behaviour

Desktop, tablet and mobile use separate size, position, opacity and object-position rules. The Hero layout itself was not changed. The integration adapts the crop of BC-001 rather than scaling one desktop composition down.

## Review Package

Generated in `/docs/reviews/sprint-06.1/`:

- `01-hero-desktop-final.png`
- `02-hero-tablet-final.png`
- `03-hero-mobile-final.png`
- `04-hero-detail.png`
- `05-before-after.png`
- `06-hero-overlay.png`

## Known Issues

- The mobile Hero headline remains very large and can crop long words on narrow viewports. This existed outside the scope of this sprint and was intentionally not changed.
- The before/after board uses the latest available pre-integration Hero review screenshot as its baseline.

## Recommendations

- Review the mobile Hero headline in a dedicated mobile typography sprint.
- If the integrated Hero feels too visual during live review, reduce the desktop image opacity slightly.
- Keep BC-001 as the only Hero asset to preserve Brand Canon discipline.
