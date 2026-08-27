<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Dependency upgrades

- The `overrides` block pins `@types/react` and `@types/react-dom`. npm requires an override and its direct dependency to share the exact same spec string, so bump both together in `package.json` before running `npm install <pkg>@latest` (a bare `@latest` spec like `19.2.5` conflicts with an override written as `^19.2.5`).
- The project opts out of React Compiler linting in `oxlint.config.ts`. oxlint renamed that rule over time (`react/react-compiler` became the `react/purity`, `react/set-state-in-effect`, and `react/todo` family under ultracite 7.10.7); keep the family disabled when upgrading oxlint/ultracite.

## Maintaining this file

- Keep this file for knowledge useful to almost every future agent session in this project.
- Do not repeat what the codebase already shows; point to the authoritative file or command instead.
- Prefer rewriting or pruning existing entries over appending new ones.
- When updating this file, preserve this bar for all agents and keep entries concise.
