# Brand Canon Foundation

The aiio Branding Website uses one editorial design system.

Platform is the current reference implementation. Other pages should not define their own interpretation of common editorial elements. They should compose the shared Brand Canon foundation.

## Components

Use the shared components in `components/brand/BrandCanonFoundation.tsx`.

- `EditorialHero`: primary page opening pattern.
- `EditorialEyebrow`: canonical section label.
- `EditorialSection`: shared section wrapper and vertical rhythm.
- `EditorialSectionHeader`: shared eyebrow, heading and lead pattern.
- `EditorialNavigation`: right-side section navigation wrapper.
- `EditorialClosing`: closing statement rhythm.
- `EditorialCTAGroup`: shared CTA spacing and wrapping.
- `JourneyCard`: capability journey card pattern.
- `ReferenceMarquee`: reference/logo motion container.
- `TrustRow`: enterprise trust row pattern.
- `EditorialCard`: shared card shell with anchored CTA area.
- `EditorialGrid`: shared responsive grid.

## Tokens

Design tokens live in two places:

- CSS custom properties in `app/globals.css`
- TypeScript reference object in `components/brand/design-tokens.ts`

The CSS variables are the source used by the website. The TypeScript object documents the same intent for future component work.

Token groups:

- Spacing: `--bc-space-*`
- Typography: `--bc-type-*`
- Radius: `--bc-radius-*`
- Border: `--bc-border-*`
- Surface: `--bc-color-surface*`
- Motion: `--bc-motion-*`, `--bc-ease-standard`
- Level colors: `--bc-level-collector`, `--bc-level-magnet`, `--bc-level-forge`, `--bc-level-dataforge`

## Eyebrow Rule

Every editorial eyebrow uses `EditorialEyebrow`.

Rules:

- uppercase
- Chillax
- violet accent
- consistent tracking
- consistent margin below
- left-aligned
- responsive through the same tokenized style

Do not create page-local eyebrow styles.

## Hero Rule

Primary editorial pages use `EditorialHero` or a local section that carries the shared `editorial-hero` class.

Standard rhythm:

1. optional visual
2. eyebrow
3. headline
4. lead
5. intro
6. CTA group

Do not invent new hero spacing for a page unless the page is a publication with its own navigation model, such as Theory.

## Card Rule

Cards use `EditorialCard` where possible.

Shared behavior:

- tokenized padding
- shared radius and border treatment
- flex column layout
- CTA slot anchored to the bottom
- text can wrap without overflowing
- responsive behavior comes from `EditorialGrid`

## Grid Rule

Use `EditorialGrid` for repeated editorial items.

Supported modes:

- `auto`
- `two`
- `three`
- `four`

Page-local grids should only exist when the composition is unique and cannot be expressed by the shared grid.

## Navigation Rule

Use `EditorialNavigation` for right-side section navigation.

Theory is the exception because it has its own left chapter navigation.

## Motion Rule

Motion uses the shared timing and easing tokens.

All motion must respect `prefers-reduced-motion`.

## Level Color Rule

Use the centralized level colors:

- Collector: graphite / gray
- ProcessMagnet: cyan
- ProcessForge: purple
- DataForge: amber

Do not introduce local capability colors.

## Implementation Principle

Future pages should compose the Brand Canon foundation first.

Only add a page-specific class when the page has a real editorial reason.

Business value leads. Theory proves. Product delivers. The visual system should support that hierarchy without becoming decorative.
