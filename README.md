# Vedant Anand's portfolio

A personal portfolio and technical blog built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Run locally

Use Node.js 22.12 or later.

```sh
git clone https://github.com/VedantAnand17/portfolio-website.git
cd portfolio-website
npm ci
npm run dev
```

Open http://localhost:3000.

## Content

- Edit `src/data/resume.tsx` for project, work, and contact information.
- Update `public/llms.txt` and `public/humans.txt` when profile facts change. Keep the copy at `public/.well-known/llms.txt` in sync.
- Add Markdown articles under `content/` with `.mdx` filenames. The renderer supports Markdown, not executable MDX components.
- Use frontmatter fields `title`, `publishedAt` (YYYY-MM-DD), and `summary`. Optional fields are `updatedAt` and `image` (a public asset path).
- Start the article body at heading level 2. The page renders the main title.
- Define theme colors and article styles in `src/app/globals.css`.

The concentrated-liquidity banner has 480 px and 960 px WebP versions. The Markdown image transform in `src/data/blog.ts` supplies its dimensions and responsive sources. Add matching asset information when adding another article image.

## Verify

```sh
npm run typecheck
npm run check
npm run test:e2e
npm test
```

Install the test browser once with `npx playwright install chromium`. Browser tests cover HTTP errors, keyboard use, mobile layout, themes, metadata, article images, and the published quote example. `npm test` builds the application, checks the public x402 profile output, and runs the browser suite against a fresh production server on port 3100. Stop any development server on that port first.

To test a running production server or Worker preview, set `TEST_BASE_URL`:

```sh
TEST_BASE_URL=http://127.0.0.1:8787 npm run test:e2e
```

## Deploy

The canonical domain is https://www.vedant-dev.com. The apex host and both v3dant.com hosts redirect to it and preserve the path. The Cloudflare Worker hostname stays available for independent testing.

- Vercel uses the normal Next.js build.
- Cloudflare Workers uses `@opennextjs/cloudflare`, `open-next.config.ts`, and `wrangler.jsonc`.
- `npm run build` adapts the output for Workers only when `WORKERS_CI=1`.
- `npm run preview` builds and runs a local Worker preview. This step verifies the static-assets cache used by blog pages.
- Workers Builds must deploy the existing build with `npm install && npx opennextjs-cloudflare deploy` on main. Non-production branches upload preview versions.

See `AGENTS.md` for build constraints and the retired Cloudflare Pages project. The EC2 workflow is a separate legacy deployment path.

## Contact

[Portfolio](https://www.vedant-dev.com) · [X](https://x.com/vedantsx) · [Email](mailto:vedantanand.in@gmail.com)
