#!/usr/bin/env node
/*
 * Automated project bootstrap for the aiio website.
 *
 * Provisions everything the app needs on Vercel, in a safe, resumable order:
 *   1. Verify the Vercel CLI is installed and authenticated.
 *   2. Link this repo to a Vercel project (stops for your explicit choice).
 *   3. Provision Neon Postgres via the Vercel Marketplace integration.
 *   4. Provision a Vercel Blob store for media.
 *   5. Generate and store PAYLOAD_SECRET (never printed).
 *   6. Pull environment variables into .env.local.
 *   7. Create the initial Payload migration (if none) and apply migrations.
 *   8. Seed required records (roles, site settings, first admin).
 *
 * Every step detects existing state and is safe to re-run. The script never
 * prints secret values. It cannot bypass Vercel auth, team/project selection,
 * or provider billing consent — it will stop and tell you what to do.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import crypto from "node:crypto";

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function step(msg) {
  console.log(`\n${c.bold}${c.cyan}▶ ${msg}${c.reset}`);
}
function ok(msg) {
  console.log(`${c.green}✓${c.reset} ${msg}`);
}
function warn(msg) {
  console.log(`${c.yellow}!${c.reset} ${msg}`);
}
function fail(msg) {
  console.error(`${c.red}✗ ${msg}${c.reset}`);
}

function run(command, args, options = {}) {
  return spawnSync(command, args, { stdio: "inherit", shell: false, ...options });
}
function capture(command, args) {
  const r = spawnSync(command, args, { encoding: "utf8", shell: false });
  return { status: r.status ?? 1, out: (r.stdout || "").trim(), err: (r.stderr || "").trim() };
}

function envFileHasKey(key) {
  if (!existsSync(".env.local")) return false;
  const content = readFileSync(".env.local", "utf8");
  return new RegExp(`^${key}=.+`, "m").test(content);
}

function abort(message) {
  fail(message);
  process.exit(1);
}

// 1. Vercel CLI + auth --------------------------------------------------------
step("Checking Vercel CLI and authentication");
if (capture("vercel", ["--version"]).status !== 0) {
  abort("Vercel CLI not found. Install it with: npm i -g vercel");
}
const who = capture("vercel", ["whoami"]);
if (who.status !== 0) {
  warn("Not logged in to Vercel.");
  console.log("Run `vercel login`, then re-run `npm run bootstrap`.");
  process.exit(1);
}
ok(`Authenticated as ${who.out}`);

// 2. Link project -------------------------------------------------------------
step("Linking the Vercel project");
if (existsSync(".vercel/project.json")) {
  ok("Project already linked (.vercel/project.json present).");
} else {
  warn("Project not linked. Launching `vercel link` (choose the team + project).");
  const linked = run("vercel", ["link"]);
  if (linked.status !== 0 || !existsSync(".vercel/project.json")) {
    abort("Linking did not complete. Re-run once the project is selected.");
  }
  ok("Project linked.");
}

// 3. Neon Postgres ------------------------------------------------------------
step("Provisioning Neon Postgres (Vercel Marketplace)");
const integrations = capture("vercel", ["integration", "list"]);
if (/neon/i.test(integrations.out)) {
  ok("Neon integration already installed.");
} else {
  warn("Installing the Neon integration. Accept any billing/consent prompts in the browser.");
  run("vercel", ["integration", "add", "neon"]);
  console.log("If the CLI handed off to the dashboard, finish there, then re-run bootstrap.");
}

// 4. Vercel Blob --------------------------------------------------------------
step("Provisioning Vercel Blob storage");
const stores = capture("vercel", ["blob", "list-stores", "--all"]);
if (stores.status === 0 && /aiio-media/.test(stores.out)) {
  ok("Blob store 'aiio-media' already exists.");
} else {
  warn("Creating a public Blob store named 'aiio-media'.");
  run("vercel", ["blob", "create-store", "aiio-media", "--access", "public", "--yes"]);
}

// 5. PAYLOAD_SECRET -----------------------------------------------------------
step("Ensuring PAYLOAD_SECRET is set on Vercel");
const envList = capture("vercel", ["env", "ls"]);
if (/PAYLOAD_SECRET/.test(envList.out)) {
  ok("PAYLOAD_SECRET already present in Vercel env.");
} else {
  const secret = crypto.randomBytes(32).toString("base64url");
  for (const target of ["development", "preview", "production"]) {
    const r = spawnSync("vercel", ["env", "add", "PAYLOAD_SECRET", target], {
      input: `${secret}\n`,
      encoding: "utf8",
    });
    if (r.status !== 0) warn(`Could not set PAYLOAD_SECRET for ${target} (may already exist).`);
  }
  ok("PAYLOAD_SECRET generated and stored (value not shown).");
}

// 6. Pull env -----------------------------------------------------------------
step("Pulling environment variables into .env.local");
warn("Provisioning can take 1–3 minutes; if keys are missing, wait and re-run.");
run("vercel", ["env", "pull", ".env.local", "--yes"]);
const dbReady = envFileHasKey("POSTGRES_URL") || envFileHasKey("DATABASE_URL");
if (!dbReady) {
  abort("Database URL not present yet. Wait for Neon to finish provisioning, then re-run bootstrap.");
}
ok("Environment variables pulled.");

// 7. Migrations ---------------------------------------------------------------
step("Applying database migrations");
const hasMigration = existsSync("migrations") &&
  spawnSync("bash", ["-lc", "ls migrations/*.ts 2>/dev/null | head -1"], { encoding: "utf8" }).stdout.trim();
if (!hasMigration) {
  warn("No migrations yet — creating the initial migration from the Payload schema.");
  run("npx", ["dotenv", "-e", ".env.local", "--", "payload", "migrate:create", "initial"]);
  warn("Commit the new migrations/ files so CI can apply them on deploy.");
}
run("npx", ["dotenv", "-e", ".env.local", "--", "payload", "migrate"]);
ok("Migrations applied.");

// 8. Seed ---------------------------------------------------------------------
step("Seeding required records");
if (!envFileHasKey("PAYLOAD_BOOTSTRAP_ADMIN_EMAIL")) {
  warn(
    "PAYLOAD_BOOTSTRAP_ADMIN_EMAIL / PAYLOAD_BOOTSTRAP_ADMIN_PASSWORD not set — " +
      "skipping first-admin creation. Add them to .env.local and re-run `npm run db:seed`.",
  );
}
run("npx", ["dotenv", "-e", ".env.local", "--", "tsx", "scripts/seed.ts"]);

// 9. Fresh-environment content ------------------------------------------------
step("Ensuring required CMS content exists");
const pageCheck = spawnSync(
  "npx",
  ["dotenv", "-e", ".env.local", "--", "tsx", "scripts/has-pages.ts"],
  { stdio: "ignore", shell: false },
);
if (pageCheck.status !== 0) {
  warn("No Pages found — running the idempotent initial content migration.");
  run("npm", ["run", "content:migrate-pages"]);
  run("npm", ["run", "content:import-theory"]);
} else {
  ok("Pages already exist — preserving editor-owned CMS content.");
}
run("npm", ["run", "content:verify"]);

console.log(`\n${c.bold}${c.green}Bootstrap complete.${c.reset}`);
console.log("Next: `npm run dev` and open http://localhost:3000/admin");
console.log("Remember to rotate/remove the temporary bootstrap admin password after first login.");
