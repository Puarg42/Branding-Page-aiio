import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = path.resolve("app/(frontend)");
const allowlist = new Set([
  "page.tsx",
  "about-us/page.tsx",
  "platform/page.tsx",
  "thinking/page.tsx",
  "thinking/theory/page.tsx",
  "live-demo/kontakt/page.tsx",
  "layer-page.tsx",
  "legal-page.tsx",
  "[locale]/blog/page.tsx",
  "[locale]/blog/[slug]/page.tsx",
  "[locale]/error.tsx",
  "blog/page.tsx",
  "capability-journey.tsx",
  "category-reinforcement.tsx",
  "editor/page.tsx",
  "thinking/theory/theory-sidebar.tsx",
]);

const failures: string[] = [];

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const file = path.join(dir, name);
    if (statSync(file).isDirectory()) walk(file);
    else if (file.endsWith(".tsx")) check(file);
  }
}

function check(file: string) {
  const relative = path.relative(root, file);
  if (allowlist.has(relative)) return;
  const source = readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node: ts.Node) {
    if (ts.isJsxText(node) && node.text.trim().length > 40) {
      failures.push(`${relative}:${ast.getLineAndCharacterOfPosition(node.pos).line + 1}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

walk(root);
if (failures.length) {
  console.error("Hardcoded marketing copy found outside the legacy allowlist:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Hardcoded-copy guard passed (${allowlist.size} legacy files allowlisted).`);
