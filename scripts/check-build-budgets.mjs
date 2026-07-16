import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const globals = readFileSync("app/(frontend)/globals.css", "utf8");
const globalLines = globals.split("\n").length;
const maxGlobalLines = 17_100;

function files(dir, extension) {
  const result = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) result.push(...files(full, extension));
      else if (full.endsWith(extension)) result.push(full);
    }
  } catch {
    // Build output may not exist yet.
  }
  return result;
}

const cssFiles = files(".next/static", ".css");
const cssBytes = cssFiles.reduce((total, file) => total + statSync(file).size, 0);
const maxCSSBytes = 1_500_000;

const failures = [];
if (globalLines > maxGlobalLines) {
  failures.push(`globals.css ${globalLines} lines exceeds ${maxGlobalLines}`);
}
if (cssBytes > maxCSSBytes) {
  failures.push(`built CSS ${cssBytes} bytes exceeds ${maxCSSBytes}`);
}

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exit(1);
}
console.log(
  `Build budgets pass: globals.css ${globalLines}/${maxGlobalLines} lines; ` +
    `CSS ${cssBytes}/${maxCSSBytes} bytes.`,
);
