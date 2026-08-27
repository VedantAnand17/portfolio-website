// Adapts the Next.js build output for Cloudflare Workers as part of
// `npm run build`, but only inside Cloudflare Workers Builds (which injects
// WORKERS_CI=1). Everywhere else (local dev, Vercel, EC2) this is a no-op so
// the Next.js build behaves exactly as before.
//
// `opennextjs-cloudflare build` re-runs the `build` script itself (with
// standalone output enabled), so the re-entrancy guard below prevents an
// infinite loop.
//
// The static-assets incremental cache (see open-next.config.ts) serves
// prerendered routes from the worker's bundled assets, so the cache produced
// by the OpenNext build must be copied into the assets directory before
// `wrangler deploy` runs. The opennextjs-cloudflare deploy/preview/upload
// commands do this themselves; this copy covers a plain `npx wrangler deploy`.
import { execSync } from "node:child_process";
import fs from "node:fs";

if (process.env.WORKERS_CI !== "1") {
  process.exit(0);
}
if (process.env.OPENNEXT_CF_WORKER_BUILD === "1") {
  process.exit(0);
}

execSync("npx opennextjs-cloudflare build", {
  stdio: "inherit",
  env: { ...process.env, OPENNEXT_CF_WORKER_BUILD: "1" },
});

const cacheDir = ".open-next/cache";
const cacheAssetsDir = ".open-next/assets/cdn-cgi/_next_cache";
if (fs.existsSync(cacheDir)) {
  fs.cpSync(cacheDir, cacheAssetsDir, { recursive: true });
  console.log("Populated Workers static assets cache.");
}
