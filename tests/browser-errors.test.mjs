import assert from "node:assert/strict";
import test from "node:test";

import { installBrowserErrorMonitoring } from "../src/lib/browser-error-monitoring.ts";

test("browser errors and rejected promises report safely without affecting the page", async () => {
  const browser = new EventTarget();
  browser.location = { pathname: "/blog" };
  const reports = [];
  installBrowserErrorMonitoring(browser, async (report) =>
    reports.push(report)
  );
  const error = new Event("error");
  error.error = new Error("Broken UI token=secret");
  browser.dispatchEvent(error);
  const rejection = new Event("unhandledrejection");
  rejection.reason = new Error("Rejected promise");
  browser.dispatchEvent(rejection);
  browser.dispatchEvent(error);
  await Promise.resolve();
  assert.equal(reports.length, 2);
  assert.equal(reports[0].message, "Broken UI [redacted]");
  assert.equal(reports[1].message, "Rejected promise");
  assert.equal(reports[0].path, "/blog");
  assert.equal(error.defaultPrevented, false);
});
