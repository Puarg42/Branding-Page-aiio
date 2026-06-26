# Section Visibility Audit RC-02

Purpose

Verify that all intended Branding Page V1 sections are rendered, visible, reachable by scrolling and integrated in the correct homepage order.

Scope

- Branch: `feature/category-design-v1`
- Page: `/`
- Check date: 2026-06-26
- Scope limitation: visibility and integration only. No redesign, no new content and no narrative rewrite.

Verification

- Confirmed the homepage renders all expected section markers in the correct order.
- Confirmed each major section has a stable section element or footer landmark.
- Confirmed restored sections have responsive CSS and no section-level opacity or z-index rule that keeps them hidden.
- Confirmed desktop and mobile visibility through source, responsive CSS and rendered homepage marker order.

| Section | Status | Issue | Fix |
| --- | --- | --- | --- |
| 1. Hero | Visible | None found. | No fix required. |
| 2. Problem | Visible | None found. | No fix required. |
| 3. Missing Layer | Visible | None found. | No fix required. |
| 4. A New Kind of Organization | Fixed | Implemented section copy existed, but the section was not rendered in the homepage sequence. | Reintegrated the section into `app/page.tsx` with the stable anchor `self-enabling-organization` and restored visible responsive styles. |
| 5. Imagine | Fixed | Implemented section copy existed, but the section was not rendered in the homepage sequence. | Reintegrated the section into `app/page.tsx` with the stable anchor `imagine` and restored visible responsive styles. |
| 6. CEO Moment | Visible | None found. | No fix required. |
| 7. Organization Mirror | Visible | None found. | No fix required. |
| 8. Built around Organizational Intelligence | Visible | None found. | No fix required. |
| 9. Category Evolution | Visible | None found. | No fix required. |
| 10. Why Now | Fixed | Implemented section copy existed, but the section was not rendered in the homepage sequence. | Reintegrated the section into `app/page.tsx` with the stable anchor `why-now` and restored visible responsive styles. |
| 11. Capabilities / From Understanding to Capability | Visible | None found. | No fix required. |
| 12. Company / Why aiio exists | Fixed | The company purpose story was available as a separate company page, but not present in the homepage sequence before the footer. | Added a restrained homepage company purpose section using the existing "Why aiio exists" content and the stable anchor `company`. |
| 13. Closing Footer | Visible | None found. | No fix required. |

Rendered Order Check

| Order | Section | Marker |
| --- | --- | --- |
| 1 | Hero | `The future belongs to organizations that understand themselves.` |
| 2 | Problem | `Organizations are losing themselves.` |
| 3 | Missing Layer | `The missing layer is not more software. It is Organizational Intelligence.` |
| 4 | A New Kind of Organization | `The next generation will not be defined by AI alone.` |
| 5 | Imagine | `Imagine an organization that never loses its knowledge.` |
| 6 | CEO Moment | `Your most experienced expert retires.` |
| 7 | Organization Mirror | `Every organization already contains intelligence.` |
| 8 | Built around Organizational Intelligence | `One foundation for organizational self-understanding.` |
| 9 | Category Evolution | `Every technological revolution required new infrastructure.` |
| 10 | Why Now | `Why Now?` |
| 11 | Capabilities | `Understanding becomes capability.` |
| 12 | Company | `Why aiio exists` |
| 13 | Closing Footer | `Every organization has knowledge.` |

Validation

- `npm run lint`
- `npm run build:vercel`
- `npm run build`
- Local rendered homepage marker-order check against `http://localhost:3000/`

Remaining Visibility Notes

- No intended Branding Page V1 section is missing from the homepage sequence.
- No intended Branding Page V1 section is blocked by section-level hidden opacity, z-index or overflow behavior.
- The OIS section retains the existing legacy anchor `architektur`; it is stable and was not renamed to avoid changing navigation behavior.
