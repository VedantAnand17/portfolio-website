import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

// Wrangler accepts comments and trailing commas; this file uses trailing commas only.
test("all portfolio hosts deploy to the correct Cloudflare account", async () => {
  const source = await readFile("wrangler.jsonc", "utf-8");
  const config = JSON.parse(
    source.replaceAll(/,\s*(?<closing>[}\]])/g, "$<closing>")
  );
  assert.equal(config.account_id, "d5addfff98319ee236259e234106087d");
  assert.equal(config.workers_dev, true);
  assert.deepEqual(
    config.routes
      .map(({ pattern, custom_domain }) => [pattern, custom_domain])
      .sort(),
    ["vedant-dev.com", "www.vedant-dev.com", "v3dant.com", "www.v3dant.com"]
      .map((hostname) => [hostname, true])
      .sort()
  );
});

test("Workers Logs keep every invocation and feed Issues for error reports", async () => {
  const source = await readFile("wrangler.jsonc", "utf-8");
  const config = JSON.parse(
    source.replaceAll(/,\s*(?<closing>[}\]])/g, "$<closing>")
  );
  assert.deepEqual(config.observability, {
    enabled: true,
    head_sampling_rate: 1,
    redact_query_string: true,
    issues: { enabled: true },
  });
  const [limiter] = config.ratelimits;
  assert.equal(limiter.name, "ERROR_REPORTS_LIMITER");
  assert.deepEqual(limiter.simple, { limit: 60, period: 60 });
});

test("the production app has no Vercel analytics dependency or mount", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  assert.equal(pkg.dependencies["@vercel/analytics"], undefined);
  const layout = await readFile("src/layouts/layout.astro", "utf-8");
  assert.doesNotMatch(layout, /AnalyticsWrapper|@vercel/);
});
