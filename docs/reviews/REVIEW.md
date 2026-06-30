# Sprint 01A.2 Editorial Storytelling Review

## Scope

This review documents the editorial refinement of the first three homepage screens.

## What Changed

1. Reframed the Capability Journey as the emotional center of the homepage.
2. Changed the Capability Journey headline to answer the visitor question directly: "How organizations become intelligent."
3. Reduced product emphasis in the stack labels and replaced it with capability language.
4. Softened visual connection lines and glow intensity to reduce competing elements.
5. Increased whitespace around the Capability Model and the transition into the Platform section.
6. Reframed the Platform section so it explains the journey instead of introducing it.

## Modified Components

1. `app/capability-journey.tsx`
2. `app/visual-language.tsx`
3. `app/page.tsx`
4. `app/globals.css`

## Intentionally Left Untouched

1. Hero structure and copy
2. Existing illustrations
3. Navigation
4. Footer
5. Thinking pages
6. Company section
7. Product routes
8. Color and typography systems

## Validation Notes

1. Production build completed successfully.
2. Homepage order remains Hero, Capability Journey, Platform.
3. Hero remains an inspirational opening screen.
4. Capability Journey now reads more like one editorial progression.
5. Platform now explains how aiio enables the journey.
6. No new features or illustrations were introduced.
7. Review screenshots were regenerated at `1440 x 900` viewport, device scale factor `2`, dark mode.
8. Exported PNG widths were verified after saving:
   - `01-homepage-full.png`: `2880 x 62636`
   - `02-homepage-hero.png`: `2880 x 1800`
   - `03-homepage-capability-journey.png`: `2880 x 1800`
   - `04-homepage-platform.png`: `2880 x 1800`

## Remaining Design Limitations

1. The Capability Journey still contains product references inside the master architecture visual.
2. The Platform first viewport is intentionally quiet and text-led; the visual appears further down the section.
3. The Hero subline remains visually secondary because the Hero was intentionally left unchanged.

## Suggestions for the Next Sprint

1. Review whether product references inside the master architecture visual should be softened.
2. Consider a dedicated first-viewport composition for Platform if the visual should appear sooner.
3. Review mobile pacing after the desktop editorial rhythm is approved.

## Screenshots

1. `01-homepage-full.png`
2. `02-homepage-hero.png`
3. `03-homepage-capability-journey.png`
4. `04-homepage-platform.png`
