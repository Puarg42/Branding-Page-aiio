# Editorial Overrides

The aiio Branding Website uses two foundation layers:

1. Brand Canon
2. Editorial Overrides

Both are official. They serve different purposes.

## Brand Canon

Brand Canon contains reusable rules and components.

It defines the shared design system for the website.

Examples:

- EditorialEyebrow
- EditorialHero
- EditorialSectionHeader
- EditorialContent
- Typography
- Grid
- Section spacing
- Cards
- Buttons
- Navigation
- Responsive behavior
- Design tokens
- Color system

Brand Canon should be used whenever a visual decision is meant to be reusable across pages.

## Editorial Overrides

Editorial Overrides contain intentional page-specific art direction.

They are not Brand Canon violations.

An Editorial Override exists when a page needs a deliberate visual difference to support its narrative role, emotional tone, or publication model.

Future standardization must preserve documented Editorial Overrides unless a sprint explicitly changes them.

## Current Editorial Overrides

### Home

- The Hero is intentionally larger and more iconic than standard editorial heroes. It acts as the executive symbol of Organizational Intelligence, not as a generic page opening.
- The Missing Capability section intentionally uses the dedicated Brand Canon illustration BC005. It must not show temporary UI placeholders, blank image containers, substitute diagrams, dashboards, or generic UI graphics.
- Enterprise Trust intentionally differs from ordinary editorial sections to create emotional trust before customer references. Its composition may use a more immersive trust rhythm while preserving canonical typography and eyebrow behavior.
- The Monday Morning sequence intentionally behaves as editorial scrollytelling rather than a standard content section.

### Platform

- The Platform page may use stronger editorial system choreography than ordinary pages because it explains the Organizational Intelligence System.
- The Platform journey is the canonical four-capability journey pattern and may use specialized alignment, progression, and illustration treatment.
- The Platform explanation may use sticky or persistent editorial navigation patterns where they support comprehension.
- Platform storytelling can be theory-aware, but the business value remains primary.

### Theory

- Theory is a digital publication, not a standard website page.
- Theory intentionally does not use the right-side Editorial Section Navigator because it has its own left-side chapter navigation.
- The Theory Hero is integrated into the editorial composition and may use a large background illustration.
- Theory typography, spacing, and chapter rhythm may differ from standard marketing pages to preserve the reading experience.

### Business Impact

- Business Impact intentionally leads with business value before customer references.
- Proof and customer context should support the category narrative, not replace it.

### Academy

- Academy uses learning-oriented visual storytelling.
- Its hero and section rhythm may differ where needed to communicate education, progression, and institutional learning rather than product marketing.

### Brand Canon Review And Foundation Pages

- Foundation, review, and Brand Canon pages may use more systematic layouts when the purpose is governance, auditability, or reference.
- These pages should still use the Brand Canon components where practical, but their information architecture can be denser than editorial marketing pages.

## Override Rules

Editorial Overrides must never be normalized automatically.

Future refactoring may standardize:

- typography implementation
- CSS structure
- components
- spacing implementation
- tokens
- accessibility behavior
- responsive behavior

However, it must preserve the documented visual intention.

Only a sprint explicitly targeting an Editorial Override may change that override.

## Implementation Notes

Use code comments sparingly.

Only annotate genuine Editorial Overrides where future cleanup could accidentally remove intentional art direction.

Recommended comment pattern:

```css
/*
Editorial Override

Reason:
This section intentionally differs from the standard Brand Canon rhythm.

Do not normalize unless a sprint explicitly targets this override.
*/
```

Do not flood code with comments. The foundation document is the primary source of truth.

## Future Sprint Rule

Future implementation sprints must follow this order:

1. Respect Editorial Overrides.
2. Apply Brand Canon.
3. Implement requested changes.

Never perform "cleanup" or "standardization" that removes documented Editorial Overrides.

The Brand Canon defines the system.

Editorial Overrides protect intentional art direction.
