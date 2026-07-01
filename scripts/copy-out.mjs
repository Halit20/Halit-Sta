// Runs automatically after `next build` (see "postbuild" in package.json).
// Moves the static export from out/ to the project root so index.html
// can be opened directly from the main folder.
import { cpSync, rmSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, "out");

if (!existsSync(out)) {
  console.error("out/ not found — run `next build` first.");
  process.exit(1);
}

// Remove the previous build's _next so stale chunks don't accumulate.
rmSync(path.join(root, "_next"), { recursive: true, force: true });

for (const entry of readdirSync(out)) {
  cpSync(path.join(out, entry), path.join(root, entry), { recursive: true });
}
rmSync(out, { recursive: true, force: true });

console.log("Static site copied to project root; out/ removed.");
