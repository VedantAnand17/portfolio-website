# Error monitoring

<!-- prettier-ignore -->
Cloudflare Workers Issues groups uncaught Worker exceptions, failed invocations, HTTP 5xx responses, and error-level console logs.
The `observability` settings in `wrangler.jsonc` enable Issues, retain every invocation in Workers Logs, and redact invocation query strings.

<!-- prettier-ignore -->
`src/scripts/error-monitoring.ts` runs on every page through `src/layouts/layout.astro`.
It reports uncaught browser errors and unhandled promise rejections to the same-origin `/api/errors` route.
React errors caught by the shared error boundary use the same reporter.
Reports are deduplicated and capped at 20 distinct errors per browser per minute.
Transport is best effort when a visitor is offline, blocks telemetry, or hits a rate limit.

<!-- prettier-ignore -->
`src/worker.ts` handles `/api/errors` before asset lookup and logs each accepted report with `console.error`, which feeds Issues.
The `ERROR_REPORTS_LIMITER` binding caps reports at 60 per minute per Cloudflare location to bound unauthenticated telemetry abuse.
Logged reports are marked `source: browser` and must be treated as untrusted input.

## Data handling

<!-- prettier-ignore -->
The collector accepts only same-origin `POST` requests, bounds request bodies to 8 KiB, and records only the message, name, stack, and path.
It strips URL credentials, query strings, fragments, bearer tokens, JWTs, credential assignments, and email addresses from those fields.
It does not collect request bodies, headers, cookies, user identifiers, or arbitrary report fields.
Avoid putting secrets into application errors; automatic redaction cannot recognize every possible sensitive string.

## Verification

<!-- prettier-ignore -->
Run `npm run preview`, open http://localhost:8787, and throw a labeled error from the browser console.
`/api/errors` should return 204 and the Wrangler output should show the redacted report.
After deploying, repeat the check on the production site and confirm the report appears in Cloudflare Workers Logs and Issues.
Synthetic error reports create real Issues; resolve them after verifying collection.
