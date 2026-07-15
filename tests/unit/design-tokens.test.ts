import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Design-system guard: CSS Modules (the modern, scoped styling layer) must use
 * design tokens, never raw hex/rgb/hsl colors. Legacy globals.css and the token
 * source are intentionally out of scope while the incremental migration runs.
 */
// Scope: new component CSS Modules. Legacy app modules (e.g.
// organizational-thought-space.module.css) are covered by the incremental
// globals migration, not this guard.
const roots = ["components"];
const rawColor = /#[0-9a-fA-F]{3,8}\b|\b(rgb|rgba|hsl|hsla)\(/;

function collectModuleCss(dir: string, acc: string[]) {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) collectModuleCss(full, acc);
    else if (entry.endsWith(".module.css")) acc.push(full);
  }
  return acc;
}

describe("CSS Modules use design tokens", () => {
  const files = roots.flatMap((root) => collectModuleCss(path.resolve(root), []));

  it("finds at least one CSS module to check", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`${path.relative(process.cwd(), file)} contains no raw colors`, () => {
      const offending = readFileSync(file, "utf8")
        .split("\n")
        .filter((line) => rawColor.test(line) && !line.trimStart().startsWith("/*"));
      expect(offending).toEqual([]);
    });
  }
});
