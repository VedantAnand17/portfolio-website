import assert from "node:assert/strict";
import test from "node:test";

import { handleErrorReport } from "../src/lib/error-collector.ts";

test("same-origin browser error becomes a sanitized, untrusted error log", async () => {
  const logs = [];
  const response = await handleErrorReport(
    new Request("https://portfolio.test/api/errors", {
      method: "POST",
      headers: {
        origin: "https://portfolio.test",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        source: "browser",
        message:
          "Fetch https://example.com/user?token=secret failed for name@example.com",
        stack:
          "Error: token=private\n at https://portfolio.test/app.js?key=secret:1:2",
        path: "/blog?email=private@example.com",
        cookie: "secret",
      }),
    }),
    { log: (...args) => logs.push(args) }
  );
  assert.equal(response.status, 204);
  assert.equal(logs.length, 1);
  assert.ok(logs[0][0] instanceof Error);
  const output =
    JSON.stringify(logs[0][1]) + logs[0][0].message + logs[0][0].stack;
  assert.ok(!output.includes("secret"));
  assert.ok(!output.includes("private"));
  assert.ok(!output.includes("name@example.com"));
  assert.equal(logs[0][1].source, "browser");
  assert.equal(logs[0][1].path, "/blog");
});

test("rejects foreign-origin, originless, and non-POST reports without logging", async () => {
  const body = JSON.stringify({ message: "forged" });
  await Promise.all(
    [
      [
        { method: "POST", headers: { origin: "https://attacker.test" }, body },
        403,
      ],
      [{ method: "POST", body }, 403],
      [
        { method: "PUT", headers: { origin: "https://portfolio.test" }, body },
        405,
      ],
    ].map(async ([init, status]) => {
      let logged = false;
      const response = await handleErrorReport(
        new Request("https://portfolio.test/api/errors", init),
        {
          log: () => {
            logged = true;
          },
        }
      );
      assert.equal(response.status, status);
      assert.equal(logged, false);
    })
  );
});

test("bounds payloads and rejects invalid reports without raising an exception", async () => {
  await Promise.all(
    [
      ["{", 400],
      ["null", 400],
      ["{}", 400],
      ['{"message":123}', 400],
      [JSON.stringify({ message: "x".repeat(9000) }), 413],
    ].map(async ([body, expected]) => {
      let logged = false;
      const response = await handleErrorReport(
        new Request("https://portfolio.test/api/errors", {
          method: "POST",
          headers: {
            origin: "https://portfolio.test",
            "content-type": "application/json",
          },
          body,
        }),
        {
          log: () => {
            logged = true;
          },
        }
      );
      assert.equal(response.status, expected);
      assert.equal(logged, false);
    })
  );
});

test("rate-limited browser reports are rejected before logging", async () => {
  const response = await handleErrorReport(
    new Request("https://portfolio.test/api/errors", {
      method: "POST",
      headers: { origin: "https://portfolio.test" },
      body: JSON.stringify({ message: "token=secret failure" }),
    }),
    {
      log: () => assert.fail("rate limited"),
      limit: async () => false,
    }
  );
  assert.equal(response.status, 429);
});

test("redacts bearer credentials, JWTs, and URL usernames from error messages", async () => {
  let logged;
  const response = await handleErrorReport(
    new Request("https://portfolio.test/api/errors", {
      method: "POST",
      headers: {
        origin: "https://portfolio.test",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message:
          "Authorization: Bearer top-secret https://user:password@api.example.com/path?key=hidden eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSJ9.signature",
      }),
    }),
    {
      log: (error) => {
        logged = error.message;
      },
    }
  );
  assert.equal(response.status, 204);
  for (const privateValue of [
    "top-secret",
    "user:password",
    "hidden",
    "eyJhbGci",
  ]) {
    assert.ok(!logged.includes(privateValue));
  }
});
