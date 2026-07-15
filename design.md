# Design — aiio

Locked design system for the aiio website. Every frontend change reads this file
first and defers to it. `app/(frontend)/styles/tokens.css` is the executable source of
truth; this document is the human-readable contract. Amend intentionally — the
file is the rule, not a suggestion. The word "aiio" is always lowercase.

## System

- **Genre** · editorial / modern-minimal. Calm, high-end, category-defining —
  closer to a research publisher than a generic SaaS landing page.
- **Visual thesis** · "An organization that understands itself." Structured
  clarity, generous negative space, restrained motion, real evidence over hype.
- **Dual surface** · a light editorial paper surface (`--color-paper`) and a
  dark brand-canon surface (`--color-canvas-dark`) used deliberately per
  section — never mixed arbitrarily within one band.
- **Anchor** · brand purple `--color-accent` with a single accent per view;
  capability tones (`--tone-*`) are reserved for the four-level spine only.

## Tokens (canonical — see `app/(frontend)/styles/tokens.css`)

- **Color** · semantic OKLCH tokens: `--color-paper*`, `--color-ink*`,
  `--color-canvas-dark`, `--color-on-dark*`, `--color-accent*`, `--color-focus`,
  `--tone-{collector,magnet,forge,dataforge}`, `--color-success`,
  `--color-danger`. No raw hex or `rgb()` in components.
- **Type** · `--font-display` (Chillax) + `--font-body` (system sans). Scale:
  `--text-xs … --text-hero`, fluid via `clamp()`. Line-height tokens
  `--leading-{tight,snug,body}`.
- **Space** · 4-pt scale `--space-3xs … --space-2xl` plus `--space-section`.
  Layout: `--measure` (line length), `--shell-max`, `--gutter`.
- **Radius** · `--radius-{input,card,panel,pill}`.
- **Motion** · `--ease-{standard,out,in}`, `--dur-{fast,base,slow}`.
- **Layering** · `--z-{base,raised,sticky,header,overlay,modal}`.

## Typography

- Display face **Chillax** (600/700) for h1–h3 and statement lines only.
- Body in the system sans stack for paragraphs, labels, and UI.
- Hero headline ≤ 7 words / ≤ 50 chars where authored; size by length using the
  scale (`--text-hero` for short statements, step down for longer copy).
- Measure capped at `--measure`; never edge-to-edge body text on wide screens.

## Page archetypes

Shared visual language, distinct structural jobs. Do **not** collapse every page
into hero → 3 cards → CTA.

| Archetype | Used by | Structural signature |
| --- | --- | --- |
| Category manifesto | Home | Statement hero, argument bands, capability spine, one closing CTA |
| Long-form publication | Thinking / Theory | Sticky contents, reading progress, chaptered document |
| Platform workbench | Platform | Capability ladder + system diagram + theory links (one ladder, not three) |
| Evidence-led story | Success Stories | Challenge → action → result with real proof; no invented metrics |
| Institutional narrative | Company | Leadership, panel, recognition; calm, sourced |
| Focused conversion | live-demo/kontakt | Single primary action, minimal distraction, trust band |
| Resource | factory routes | Consistent hero + section + optional form; differentiate high-value routes |

New page families are recorded under `## Variants` before use.

## CTA voice

- **Primary** · "Request a conversation" → `/live-demo/kontakt`. Filled accent,
  `--radius-pill`.
- **Secondary** · "Explore the platform" → `/platform`. Ghost/outline, same
  radius. One primary CTA per view; secondary is visually subordinate.
- Do not introduce new CTA labels for the same two intents.

## Imagery & evidence

- Brand-canon illustrations (`BrandIllustration`) are the signature visual — keep
  them; do not replace with generic stock.
- Use `next/image` with explicit `sizes`/aspect ratio, AVIF/WebP, stable
  placeholders. No layout shift.
- **Honest content only**: never fabricate metrics, customer logos, testimonials,
  or "trusted by / measurable" claims. Use real proof, a labelled placeholder,
  or a different structure.

## Motion stance

- Restrained and narrative: at most 1–2 reveal primitives per view, staggered
  gently. Animate `transform`/`opacity` only.
- Timing/easing come from tokens. No scroll-jacking, no ornamental parallax by
  default. Focus rings appear instantly (never animated).
- Full `prefers-reduced-motion` support: spatial motion collapses to ≤150 ms
  opacity crossfade (tokens already zero out durations).

## Interaction & component contracts

Every interactive component ships all eight states: default · hover ·
`:focus-visible` · `:active` · disabled · loading · error · success. Touch
targets ≥ 44px. Buttons never reflow surrounding layout on press.

Shared primitives (composed, not duplicated per page):
- `components/navigation/SmartLink` — internal/external link behavior.
- `components/brand/*` — `EditorialHero`, `EditorialSection`, `EditorialCard`,
  `JourneyCard`, `ExecutiveCTA`, `BrandIllustration`, `EditorialEyebrow`.
- Capability content: `content/capability-spine.ts` (one source for home,
  platform, academy).

## Responsive & accessibility

- Verified at 320 / 375 / 414 / 768 / 1024 / 1440 px. No horizontal overflow
  (`overflow-x: clip` on root). No two-line clickable text.
- WCAG AA contrast (≥ 4.5:1 text, ≥ 3:1 large/UI). Visible focus ring at
  `--color-focus`. Semantic headings, one `h1` per page, skip-friendly landmarks.
- Color is never the only signal.

## Anti-patterns (reject in review)

- Generic AI aesthetics: purple-gradient-on-white hero, evenly timid palettes,
  Inter/Roboto defaults used as the brand face.
- Wall of identical cards; repeating the same section rhythm across pages.
- Uppercase eyebrow/kicker on every block (cap 1–2 per page).
- Fake browser/phone/IDE chrome; re-drawn UI frames.
- Invented metrics, logos, or testimonials.
- Raw hex/`rgb()`/one-off font-families/radii/animation curves inside component
  files — lift into tokens instead.

## Variants

_None yet. Record legitimate per-family deviations here (paper band, accent, or
display treatment) rather than overriding tokens locally._

## Migration

`globals.css` still holds the legacy `--bc-*` and brand variables plus ~17k lines
of page CSS. These are being migrated into `app/(frontend)/styles/tokens.css` and co-located
CSS Modules incrementally; new work uses the canonical tokens above.
