## Astro

- Articles are rendered at build time from `content/*.mdx` by `src/data/blog.ts`; publishing a content change requires a new build.
- Keep browser state shared across React islands in `src/lib/theme.ts`; React context does not cross island boundaries.
- Astro's current checker supports TypeScript 5/6. Check its peer range before upgrading TypeScript.

## Dependency upgrades

- The `overrides` block pins `@types/react` and `@types/react-dom`. npm requires an override and its direct dependency to share the exact same spec string, so bump both together in `package.json` before running `npm install <pkg>@latest` (a bare `@latest` spec like `19.2.5` conflicts with an override written as `^19.2.5`).
- The project opts out of React Compiler linting in `oxlint.config.ts`. oxlint renamed that rule over time (`react/react-compiler` became the `react/purity`, `react/set-state-in-effect`, and `react/todo` family under ultracite 7.10.7); keep the family disabled when upgrading oxlint/ultracite.

## Cloudflare deployment

- Deploy the static Astro output through `wrangler.jsonc` and `src/worker.ts`. Alias redirects must run before asset lookup (`run_worker_first`); all four production hosts stay on this Worker.
- Workers Builds uses `npm run build`, then `npx wrangler deploy` on main or `npx wrangler versions upload` on preview branches. The dashboard's former OpenNext deploy command must be replaced before merging the Astro migration. Build settings are external to the repo.
- `scripts/preview.mjs` disables Wrangler's origin inference so local alias tests preserve the incoming hostname. The CLI otherwise rewrites every request to the first configured domain.
- The legacy Cloudflare Pages project `portfolio-website` (account `d5addfff98319ee236259e234106087d`) has `deployments_enabled: false`; keep its builds disabled. Vercel Git integration and the legacy EC2 workflow are retired.
- `npm test` generates a temporary security fixture in `dist/`; deploy with `npm run deploy` to rebuild from actual content first. See README.md for verification and deployment commands.

## Maintaining this file

- Keep this file for knowledge useful to almost every future agent session in this project.
- Do not repeat what the codebase already shows; point to the authoritative file or command instead.
- Prefer rewriting or pruning existing entries over appending new ones.
- When updating this file, preserve this bar for all agents and keep entries concise.

## Validation

Use direct tests, typecheck, and browser checks. Do not run the no-mistakes gate for this project.
