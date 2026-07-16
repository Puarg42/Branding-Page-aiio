#!/usr/bin/env node
// Production/CI build entry.
//
// Order of operations:
//   1. Run pending Payload database migrations, but ONLY when a database URL is
//      present. This keeps the first deployment (before Neon is provisioned)
//      from failing, and guarantees migrations run automatically once the
//      database exists.
//   2. Build the Next.js application.
//
// Migrations are intentionally never destructive here; `payload migrate` only
// applies committed migration files that have not yet run.

import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

// Keep the Payload admin import map in sync with the config so the admin never
// renders blank due to a stale/empty map. No database required.
run("npx", ["payload", "generate:importmap"]);

if (databaseUrl) {
  console.log("[ci-build] Database detected — running Payload migrations.");
  run("npx", ["payload", "migrate"]);
} else {
  console.warn(
    "[ci-build] No DATABASE_URL/POSTGRES_URL set — skipping migrations. " +
      "Provision the database (npm run bootstrap) before enabling CMS-backed routes.",
  );
}

run("npx", ["next", "build"]);
