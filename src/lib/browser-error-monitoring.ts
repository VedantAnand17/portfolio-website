import type { ErrorReport } from "./error-collector.ts";
import { redact } from "./error-collector.ts";

type Browser = EventTarget & { location: { pathname: string } };
type Reporter = (report: ErrorReport) => Promise<unknown>;

async function sendReport(report: ErrorReport): Promise<void> {
  try {
    await fetch("/api/errors", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(report),
      keepalive: true,
    });
  } catch {
    // Reporting is best effort and must never create a rejected promise.
  }
}

interface MonitoringState {
  seen: Set<string>;
  started: number;
}

const monitoringState: MonitoringState = {
  seen: new Set(),
  started: Date.now(),
};

export function reportBrowserError(
  value: unknown,
  path = window.location.pathname,
  reporter: Reporter = sendReport,
  state: MonitoringState = monitoringState
): void {
  if (Date.now() - state.started >= 60_000) {
    state.seen.clear();
    state.started = Date.now();
  }
  const error = value instanceof Error ? value : new Error(String(value));
  const report: ErrorReport = {
    message: redact(error.message).slice(0, 1000),
    name: redact(error.name).slice(0, 100),
    stack: error.stack ? redact(error.stack).slice(0, 3000) : undefined,
    path: redact(path.split(/[?#]/)[0]).slice(0, 256),
  };
  const key = `${report.message}:${report.stack}:${report.path}`;
  if (state.seen.has(key) || state.seen.size >= 20) {
    return;
  }
  state.seen.add(key);
  try {
    Promise.resolve(reporter(report)).catch(() => {
      // A failed transport must not recursively report itself.
    });
  } catch {
    // Also tolerate synchronous failures in the reporting transport.
  }
}

export function installBrowserErrorMonitoring(
  browser: Browser,
  reporter: Reporter = sendReport
): void {
  browser.addEventListener("error", (event) => {
    const caught = event as ErrorEvent;
    if (caught.error || caught.message) {
      reportBrowserError(
        caught.error ?? caught.message,
        browser.location.pathname,
        reporter
      );
    }
  });
  browser.addEventListener("unhandledrejection", (event) => {
    reportBrowserError(
      (event as PromiseRejectionEvent).reason,
      browser.location.pathname,
      reporter
    );
  });
}
