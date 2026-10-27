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

const report = () =>
  new Request("https://www.vedant-dev.com/api/errors", {
    method: "POST",
    headers: { origin: "https://www.vedant-dev.com" },
    body: JSON.stringify({ message: "UI failed", path: "/blog?x=1" }),
  });

test("Worker logs same-origin browser error reports and rate-limits them", async (t) => {
  const { default: worker } = await import("../src/worker.ts");
  t.mock.method(console, "error", () => {
    /* Captured by Node mock tracker. */
  });
  const keys = [];
  const env = {
    ERROR_REPORTS_LIMITER: {
      limit: async ({ key }) => {
        keys.push(key);
        return { success: keys.length === 1 };
      },
    },
  };
  const accepted = await worker.fetch(report(), env);
  assert.equal(accepted.status, 204);
  const limited = await worker.fetch(report(), env);
  assert.equal(limited.status, 429);
  assert.deepEqual(keys, [
    "portfolio-browser-errors",
    "portfolio-browser-errors",
  ]);
  assert.equal(console.error.mock.calls.length, 1);
  assert.equal(console.error.mock.calls[0].arguments[1].path, "/blog");
});
