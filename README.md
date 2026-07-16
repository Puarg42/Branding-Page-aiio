# aiio website

Thought-leadership website for aiio (Organizational Intelligence). Built with
Next.js 16 (App Router, React Server Components) and Payload CMS, deployed on
Vercel with Neon Postgres and Vercel Blob.

## Stack

- **Framework**: Next.js 16 App Router + React 19 (native `next` toolchain)
- **CMS / backend**: Payload 3 embedded in the same app (admin at `/admin`)
- **Database**: Neon Postgres (`@payloadcms/db-vercel-postgres`)
- **Media**: Vercel Blob (`@payloadcms/storage-vercel-blob`)
- **Styling**: Tailwind v4 + design tokens (`app/(frontend)/styles/tokens.css`, `design.md`)
- **Hosting**: Vercel

## Prerequisites

- Node.js `>=20.9.0` (repo pins `22` via `.nvmrc`; Vercel builds on 22)
- A Vercel account with CLI access for automated provisioning

## Quick start (local)

```bash
npm install
cp .env.example .env.local   # then fill in values, or run the bootstrap below
npm run dev                  # http://localhost:3000  (admin at /admin)
```

## Automated setup (Vercel + database + storage)

`npm run bootstrap` links the project, provisions Neon Postgres and Vercel Blob
through the Vercel Marketplace, generates `PAYLOAD_SECRET`, pulls environment
variables, runs migrations, and seeds required records. It is safe to re-run.

```bash
npm run bootstrap
```

The script stops for the one step automation cannot bypass: choosing the Vercel
team/project and accepting any provider billing consent in the dashboard. See
`docs/SETUP.md` for the full runbook.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (`next build`) |
| `npm run ci:build` | Vercel build: theory check + migrate (if DB present) + build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Playwright smoke tests |
| `npm run db:migrate` | Apply pending Payload migrations |
| `npm run db:migrate:create` | Create a new migration from schema changes |
| `npm run db:seed` | Idempotently seed roles, settings, redirects |
| `npm run generate:types` | Regenerate `payload-types.ts` |
| `npm run content:verify` | Verify required CMS pages, theory and navigation |
| `npm run content:migrate-pages -- --dry-run` | Preview non-clobbering legacy → CMS migration |
| `npm run content:migrate-pages` | Apply migration to pending/parity-review pages |
| `npm run content:import-theory` | Import the archived theory fixture into Payload |
| `npm run db:checkpoint` | Create a Neon pre-release branch (requires `NEON_API_KEY`) |
| `npm run test:budgets` | Enforce CSS/global stylesheet budgets |

## Structure

- `app/` — App Router routes (site) and Payload admin/API route groups
- `components/` — brand primitives, sections, and shared UI
- `content/` — typed content sources that back the marketing pages
- `payload.config.ts` + `collections/` — CMS schema
- `scripts/` — bootstrap, migration, seed, and content-import tooling
- `design.md` + `app/(frontend)/styles/tokens.css` — locked design system
- `docs/` — architecture and setup documentation

The word "aiio" is always written in lowercase.
