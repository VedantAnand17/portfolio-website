import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("Astro produces the public portfolio and articles as standalone HTML", async () => {
  const home = await readFile("dist/index.html", "utf-8");
  assert.ok(
    /Hi, I(?:&#39;|&#x27;|')m Vedant Anand/.test(home),
    "The generated homepage contains the greeting"
  );
  assert.match(home, /astro-island/);
  assert.doesNotMatch(
    home.match(/<h1\b[\s\S]*?<\/h1>/)?.[0] ?? "",
    /<script/,
    "The greeting contains only heading content"
  );
  assert.doesNotMatch(home, /__next|\/_next\//);
  await Promise.all(
    [
      "about",
      "blog",
      "blog/uniswap-guide",
      "blog/concentrated-liquidity",
      "blog/x402-agentic-commerce",
    ].map(async (route) => {
      const html = await readFile(`dist/${route}.html`, "utf-8");
      assert.match(html, /<main/);
      assert.match(html, /rel="canonical"/);
      assert.doesNotMatch(html, /__next|\/_next\//);
    })
  );
  const notFound = await readFile("dist/404.html", "utf-8");
  assert.match(notFound, /Page not found/);
  assert.match(notFound, /noindex/);
});
