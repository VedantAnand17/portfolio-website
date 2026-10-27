# Vedant Anand's portfolio

A personal portfolio and technical blog built with Astro 7, React 19 islands, TypeScript, and Tailwind CSS 4. Pages and articles are generated as HTML at build time. React hydrates the navigation, experience disclosures, and X embeds.

## Run locally

Use Node.js 22.12 or later (CI uses Node.js 24).

```sh
npm ci
npm run dev
```

Open http://localhost:4321. For a local Cloudflare Worker preview, use `npm run preview` and open http://localhost:8787. `npm run start` serves an existing build on port 3100 for production tests.

## Content

- Edit `src/data/resume.tsx` for project, work, and contact information, and `src/data/profile.ts` for shared biography and identity metadata.
- `/llms.txt` and `/.well-known/llms.txt` are generated from those data files. Update `public/humans.txt` when profile facts change.
- Add Markdown articles under `content/` with `.mdx` filenames. The renderer supports Markdown, not executable MDX components. Rebuild to publish content changes.
- Frontmatter requires `title`, `publishedAt` (YYYY-MM-DD), and `summary`. Optional fields are `updatedAt` and `image` (a public asset path).
- Start the article body at heading level 2; the page supplies the main title.
- Shared metadata, fonts, and analytics live in `src/layouts/layout.astro`; colors and article styles live in `src/styles/global.css`.
- Set `PUBLIC_GA_ID` to override the default Google Analytics ID. The previous `NEXT_PUBLIC_GA_ID` is accepted during migration.

The concentrated-liquidity banner has 480 px and 960 px WebP versions. The Markdown transform in `src/data/blog.ts` supplies its dimensions and responsive sources.

## Verify

```sh
npx playwright install chromium
npm run typecheck
npm run check
npm test
```

`npm test` builds the site with a temporary escaping regression article, tests it in Chromium through the local Worker, and runs the Node tests. The temporary source is restored or removed after the build. Deployment always builds again from real content, so the test article is never deployed by `npm run deploy`.

`npm run test:e2e` exercises Astro's development server. To test an existing Worker preview instead:

```sh
TEST_BASE_URL=http://127.0.0.1:8787 npm run test:e2e
```

External previews skip the synthetic source-fixture test, which requires a local test build or development server.

The suite covers routes, redirects, custom 404s, keyboard controls, mobile layouts, themes, metadata, article images, JSON-LD escaping, and the published quote example. Production tests prepare their fixture at build time because the deployed site has no runtime filesystem.

## Deploy

The Cloudflare Worker serves `dist/` using the `ASSETS` binding in `wrangler.jsonc`. `src/worker.ts` handles canonical-host and legacy-path redirects before serving assets. The canonical domain is https://www.vedant-dev.com; the apex and both v3dant.com hosts redirect to it, preserving paths and queries.

```sh
npm run deploy
```

**Cloudflare Workers Builds** uses these commands:

- Build command: `npm run build`
- Deploy command (main): `npx wrangler deploy`
- Version command (other branches): `npx wrangler versions upload`

The deploy/version commands consume the existing `dist/` output. Dashboard build settings are not controlled by `wrangler.jsonc`.

OpenNext, Next.js runtime image optimization, and runtime article filesystem access have been removed. Project previews use Astro's build-time image pipeline to generate responsive WebP sources; their original public URLs remain available. Fonts and the PNG social card are generated or bundled at build time. `/opengraph-image` redirects to `/opengraph-image.png`.

Browser error reporting and Workers Issues are described in `docs/error-monitoring.md`.

GitHub Actions verifies changes. Cloudflare Workers Builds owns deployment; the legacy EC2 deploy workflow is retired. The old Cloudflare Pages project remains disabled, and Vercel Git deployment remains disconnected.

## Contact

[Portfolio](https://www.vedant-dev.com) · [X](https://x.com/vedantsx) · [Email](mailto:vedantanand.in@gmail.com)
