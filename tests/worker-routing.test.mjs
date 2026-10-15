import assert from "node:assert/strict";
import { test } from "node:test";

test("Worker preserves paths and queries while canonicalizing every alias", async () => {
  const { default: worker } = await import("../src/worker.ts");
  await Promise.all(
    ["v3dant.com", "www.v3dant.com", "vedant-dev.com"].flatMap((hostname) =>
      [
        "/?from=alias",
        "/blog?from=alias",
        "/blog/uniswap-guide?from=alias",
      ].map(async (path) => {
        const response = await worker.fetch(
          new Request(`https://${hostname}${path}`),
          {}
        );
        assert.equal(response.status, 308);
        assert.equal(
          response.headers.get("location"),
          `https://www.vedant-dev.com${path}`
        );
      })
    )
  );
});
