<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Dependency upgrades

- The `overrides` block pins `@types/react` and `@types/react-dom`. npm requires an override and its direct dependency to share the exact same spec string, so bump both together in `package.json` before running `npm install <pkg>@latest` (a bare `@latest` spec like `19.2.5` conflicts with an override written as `^19.2.5`).
- The project opts out of React Compiler linting in `oxlint.config.ts`. oxlint renamed that rule over time (`react/react-compiler` became the `react/purity`, `react/set-state-in-effect`, and `react/todo` family under ultracite 7.10.7); keep the family disabled when upgrading oxlint/ultracite.

## Cloudflare deployment

- Cloudflare deploys this site as a Worker via `@opennextjs/cloudflare` (`wrangler.jsonc`, `open-next.config.ts`). Do not use `@cloudflare/next-on-pages`: it only supports Next.js 13/14 (peer range `next <=15.5.2`) and cannot build this Next.js 16 app.
- Workers Builds trigger semantics (Cloudflare dashboard, Workers Builds Configuration): the "Deploy command" runs only on production-branch (`main`) builds and must promote to production traffic - it is set to `npm install && npm run deploy`. The "Version command" (`npx wrangler versions upload`) runs on non-production branches and only uploads a preview version; green PR-branch checks therefore never update production. Historical pitfall: the deploy command was `npx wrangler versions upload` at one point, which let builds pass while production stayed on a 10-month-old deployment. When touching build settings, confirm what a `main` build will actually run.
- The production site is Vercel (`www.vedant-dev.com`); the Worker (`portfolio-website.bhaisahbsahb.workers.dev`) is the Cloudflare path. Keep both deployable.
- The legacy Cloudflare Pages project "portfolio-website" (account `d5addfff98319ee236259e234106087d`) is retired: its Git integration has `deployments_enabled: false` (set via the Pages API) so it no longer builds or posts failing PR checks. If it ever needs to go away, delete the project in the dashboard; do not re-enable its builds.
- The `src/data/blog.ts` data layer reads `content/*.mdx` with Node `fs` at request time, so the worker needs the static-assets incremental cache and its cache assets (copied into `.open-next/assets` by `scripts/opennext-workers-build.mjs` or by `opennextjs-cloudflare deploy/preview/upload`). Verify with `npm run preview` before deploying.

## Maintaining this file

- Keep this file for knowledge useful to almost every future agent session in this project.
- Do not repeat what the codebase already shows; point to the authoritative file or command instead.
- Prefer rewriting or pruning existing entries over appending new ones.
- When updating this file, preserve this bar for all agents and keep entries concise.
