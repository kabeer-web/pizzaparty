import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Scans every source file for withdrawn menu content.
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const files = [...walk("src"), ...walk("plugins"), "index.html", "README.md"];

test("no Supreme / deal 08, 09, 12 / outdated counts anywhere in source", () => {
  const bad = [/supreme/i, /deal[\s-]*0?8\b/i, /deal[\s-]*0?9\b/i, /deal[\s-]*12\b/i, /\b12 (pizza |ready-made )?deals/i, /\bsix flavours/i, /\b6 flavours/i];
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    for (const re of bad) {
      // README documents the removal, tests are excluded by path
      if (f === "README.md") continue;
      assert.doesNotMatch(text, re, `${f} matches ${re}`);
    }
  }
});
