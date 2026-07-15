# Setup & Operations Runbook

This project is a Next.js 16 site with Payload CMS embedded, deployed on Vercel
with Neon Postgres and Vercel Blob.

## One-command bootstrap

```bash
npm install
npm run bootstrap
```

`npm run bootstrap` is idempotent and resumable. It:

1. Verifies the Vercel CLI and that you are logged in (`vercel login`).
2. Links the repo to a Vercel project (`vercel link`) — you choose team/project.
3. Installs the **Neon Postgres** Marketplace integration.
4. Creates a **Vercel Blob** store for media.
5. Generates `PAYLOAD_SECRET` and stores it in Vercel (dev/preview/prod).
6. Pulls env vars into `.env.local`.
7. Creates the initial Payload migration (first run) and applies migrations.
8. Seeds baseline records (categories, site settings, first admin).

### What automation cannot do for you

- Authenticate your Vercel account (`vercel login`).
- Pick the team/project (first run of `vercel link`).
- Accept provider **billing/consent** in the Marketplace dashboard.

If provisioning is still in progress, Neon can take 1–3 minutes; just re-run
`npm run bootstrap` — completed steps are detected and skipped.

## First admin

Set these in `.env.local` before the seed step (bootstrap runs the seed for
you), then remove/rotate them after first login:

```bash
PAYLOAD_BOOTSTRAP_ADMIN_EMAIL=you@aiio.de
PAYLOAD_BOOTSTRAP_ADMIN_PASSWORD=<temporary strong password>
```

Admin panel: <http://localhost:3000/admin> (or `/admin` in production).

## Environments & databases

| Environment | Database | Migrations | Seed |
| --- | --- | --- | --- |
| Production | Neon production branch | `payload migrate` in `ci:build` | manual, once |
| Preview | Neon preview branch (or dedicated preview DB) | on deploy | optional |
| Test | disposable DB (`.env.test.local`, name contains `test`) | `db:reset:test` | per run |

Preview builds must never migrate or seed production. Configure a separate
Neon branch/database for preview in the Vercel project settings.

## Migrations

```bash
npm run db:migrate:create   # after changing collections/globals
npm run db:migrate          # apply pending migrations
npm run db:status           # show migration status
```

Migration files live in `migrations/` and are committed. The Vercel build
(`npm run ci:build`) runs `payload migrate` automatically when a database URL is
present, before `next build`.

## Rollback / disaster recovery

1. Before a production migration, create a **Neon branch** (point-in-time
   restore point) from the Neon dashboard.
2. To roll back application code, redeploy the previous Vercel deployment.
3. To roll back schema, apply a compatible **down** migration or restore the
   Neon branch. Never use destructive schema push in production.

## Media

Uploads go to Vercel Blob (`BLOB_READ_WRITE_TOKEN`). No files are written to the
serverless filesystem. If the token is absent, the Blob plugin is disabled and
uploads are unavailable — provision Blob via bootstrap.

## Local development without Vercel

You can run the site (marketing pages) without a database. The admin and any
CMS-backed routes require `DATABASE_URL`/`POSTGRES_URL` and `PAYLOAD_SECRET`.
Provide them in `.env.local` (see `.env.example`).
