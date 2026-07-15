/*
 * Reset the test database to a clean, fully-migrated state.
 * Run via `npm run db:reset:test` (injects .env.test.local through dotenv-cli).
 *
 * Guards against pointing at a non-test database.
 */
import { spawnSync } from "node:child_process";

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

if (!url) {
  console.error("No test database URL found. Create .env.test.local with DATABASE_URL/POSTGRES_URL.");
  process.exit(1);
}

if (!/test/i.test(url)) {
  console.error(
    "Refusing to reset: the database URL does not look like a test database " +
      "(expected 'test' in the connection string). Aborting for safety.",
  );
  process.exit(1);
}

const result = spawnSync("npx", ["payload", "migrate:fresh", "--force"], { stdio: "inherit" });
process.exit(result.status ?? 0);
