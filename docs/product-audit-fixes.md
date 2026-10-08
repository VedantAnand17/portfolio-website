# Product audit fixes

Review date: 8 October 2026. Scope: portfolio, blog, mobile layout, accessibility, public profile files, and deployment builds.

## Changes

| Audit items | Change |
| --- | --- |
| 1 | Missing article lookup returns null. Both page rendering and metadata use `notFound()`. The error page links to Home and Blog. |
| 2–6 | Replaced incomplete transaction snippets with a runnable, local v2 quote example. Corrected USDC, fees, deadlines, callback validation, oracle guidance, and v3 SDK integration steps. The browser suite executes the published code. |
| 7–11 | Corrected liquidity risk, `L`, real and virtual reserves, fee activity, and range-order reversal. Removed unsupported APR forecasts. Set the v4 launch date to 31 January 2025. |
| 12 | Syntax colors and code backgrounds follow the selected site theme. |
| 13, 17 | Restored the original greeting, compact rows, centered section titles, card hover effects, spring cursor, floating dock, and blur reveals. Native cursors stay available until the effect loads, over controls, on touch devices, and on small screens. Cursor and dock effects respond to reduced-motion changes. CSS disables decorative animation in reduced-motion mode. |
| 14–18 | Added one main title per page, main and navigation landmarks, a skip link, native disclosure buttons, and hidden collapsed descriptions. Hackathon entries use H3. Company links are separate from Details buttons. |
| 19 | Contact links use colors tested at a minimum contrast ratio of 4.5:1 in light mode. |
| 20 | Removed three diagrams from the article because they contained incorrect financial claims. Kept the four original PNG URLs available for legacy links, as the user requested; this legacy access is intentional. The article now uses a responsive WebP banner with dimensions, lazy loading, and async decoding. Its 960 px file is about 23 KB. |
| 21 | Home content, contact details, and selected X links render on the server. Work descriptions have a no-JavaScript fallback. |
| 22–27 | Stacked the mobile introduction. Added Email and View work actions, a direct link to the projects while keeping the original section order, labeled navigation, current-location state, readable project text, and 44 px project actions. |
| 28–30 | Corrected completed-role dates and tense. Added project roles and evidence links. Removed unsupported visitor totals, yield language, and performance claims. Kept the four merged x402 PRs. |
| 31–32 | Replaced the contact rejection sentence with a clear invitation. Restored rich X embeds with one shared script. Embeds follow the selected theme. Loaded embeds have no extra caption links. Server-rendered cards show a Read post on X link when widgets fail or JavaScript is disabled. |
| 33–36 | Added blog-specific metadata, valid sharing-image fallback, article summaries, reading times, update dates, related links, consistent names, and readable dates. Removed the missing-module promise. |
| 37 | Use `https://www.vedant-dev.com` as canonical. Live apex hosting already redirects there. App redirects for the apex and v3dant aliases preserve paths and queries. The Worker hostname stays independent. |
| Maintenance | Rewrote the README to match the code. Removed the retired Winter of Blockchain link. Updated both public LLM profile files and humans.txt. |

## Personal information

The existing profile data remains the source for roles and dates. Public LinkedIn results confirmed GSoC mentorship and HackMoney work. The official nyx showcase confirms the ENS track result. Direct X access was restricted during review. Unverified numerical claims were removed instead of replaced with estimates.

Evidence:

- [LinkedIn profile](https://www.linkedin.com/in/vedantanand17)
- [nyx on ETHGlobal](https://ethglobal.com/showcase/nyx-byzxt)
- [Bags](https://www.getbags.app/)
- [x402 PR #3051](https://github.com/x402-foundation/x402/pull/3051)

## Dependencies

Updated dependencies to remove the known advisory paths. Keep Next.js on the patched 16.3 release line for compatibility with the Cloudflare adapter. The lint preset is pinned to 7.10.2 because later presets introduce an unpatched glob dependency. The config removes its obsolete compiler-rule name and keeps the project's existing React Compiler opt-out. A selector-parser override and a shared sharp override use patched versions. Markdown frontmatter now uses YAML directly.

## Verification

Final validation passed: a fresh production build passed; Playwright passed 22/22 against a fresh Next.js production server and 22/22 against a fresh Cloudflare Worker preview; and two targeted Node behavior tests passed. Coverage includes HTTP 404 responses for `/blog/` followed by a 260-character slug and for `/blog/%00`, plus an HTTP 200 response for the canonical host. Next emitted prerender-cache write warnings for the malformed and overlong inputs, but their public responses remained 404 and no assertions failed. The selected legacy PNG URLs remain available, the authorized public claims remain unchanged, and the work badges are restored. Typecheck, formatting and lint, and the production profile test also passed. The dependency audit returned zero known advisories; this design restoration did not change dependencies. Checks use direct commands. The no-mistakes gate was cancelled at the user’s request and is disabled in AGENTS.md.
