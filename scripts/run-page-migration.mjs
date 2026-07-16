#!/usr/bin/env node
import { rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

const output = "scripts/.migrate-pages.bundle.mjs";
const cssOutput = "scripts/.migrate-pages.bundle.css";
const passthrough = process.argv.slice(2);

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

try {
  run("node_modules/.bin/esbuild", [
    "scripts/migrate-pages-to-cms.ts",
    "--bundle",
    "--platform=node",
    "--format=esm",
    "--packages=external",
    "--alias:next/cache=next/cache.js",
    "--alias:next/link=next/link.js",
    "--alias:next/navigation=next/navigation.js",
    "--alias:next/headers=next/headers.js",
    "--loader:.css=empty",
    `--outfile=${output}`,
  ]);
  run("node_modules/.bin/dotenv", [
    "-e",
    ".env.local",
    "--",
    "node",
    output,
    ...passthrough,
  ]);
} finally {
  rmSync(output, { force: true });
  rmSync(cssOutput, { force: true });
}
