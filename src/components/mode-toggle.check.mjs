/**
 * Regression check: ModeToggle must keep setTheme when a parent
 * (TooltipTrigger asChild) passes its own onClick via props.
 *
 * Run: node src/components/mode-toggle.check.mjs
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const src = readFileSync(
  path.join(import.meta.dirname, "mode-toggle.tsx"),
  "utf-8"
);

assert.match(
  src,
  /\(\{\s*onClick,\s*\.\.\.props\s*\}/,
  "ModeToggle must destructure onClick out of props so asChild parents cannot wipe it"
);

assert.match(
  src,
  /onClick=\{\(e\)\s*=>\s*\{[\s\S]*?setTheme\([\s\S]*?onClick\?\.\(e\)/,
  "ModeToggle onClick must call setTheme and then the parent onClick"
);

assert.doesNotMatch(
  src,
  /onClick=\{\(\)\s*=>\s*setTheme[\s\S]*?\{\.\.\.props\}/,
  "Do not put {...props} after a bare setTheme onClick — that overwrites it"
);

console.log("mode-toggle.check.mjs: ok");
