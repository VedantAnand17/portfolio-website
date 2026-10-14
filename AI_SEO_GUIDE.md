# Search and AI discovery

The portfolio's canonical origin is `https://www.vedant-dev.com`. The primary targets are Vedant Anand's full name and his work on x402, Bags, agentic commerce, and GSoC mentorship.

## Authoritative data

- `src/data/resume.tsx`: public projects, experience, education, and profile links.
- `src/data/profile.ts`: identity description, metadata, canonical biography URL, and the actual profile modification date.
- `src/lib/seo.ts`: stable Person/WebSite identifiers and safe JSON-LD serialization.

Keep visible content, metadata, and structured data consistent. The current maintainer role is user-confirmed and intentionally has no dedicated role link. Ongoing study is an educational affiliation, not alumni status.

## Public entry points

- `/`: portfolio with Vedant Anand's full name and linked biography.
- `/about`: canonical biography and article author page with ProfilePage markup.
- `/blog` and `/blog/[slug]`: authored technical articles with BlogPosting markup and visible dates.
- `/sitemap.xml`: canonical page URLs with meaningful content modification dates.
- `/robots.txt`: public crawl access, private/admin exclusions, and the canonical sitemap.
- `/llms.txt` and `/.well-known/llms.txt`: identical text generated from the profile, projects, and article data at build time.
- `/opengraph-image`: a build-time PNG used for identity-focused share previews; article-specific images remain available where supplied.
- `/humans.txt`: developer information.
- `/.well-known/security.txt`: security reporting contact.

`llms.txt` is an optional machine-readable summary. It is not an established ranking signal, an access-control mechanism, a training license, or a requirement for Google's AI features. The useful foundation is public server-rendered content, accurate attribution, canonical URLs, and genuine third-party evidence. Do not add obsolete AI plugin manifests or unsupported rich-result claims.

## Maintenance and verification

After changing biographical facts, update the corresponding public data and `PROFILE.updatedAt` to the real modification date. Article publication and update dates belong in frontmatter; do not set them to the current date just to appear fresh. The sitemap and both llms.txt routes pick up article/project changes during the build. Keep humans.txt synchronized when roles change.

Use `npm test`, `npm run typecheck`, and `npm run check`. The browser identity checks exercise public pages, metadata, shared entity IDs, script-safe article titles, mobile rendering without JavaScript, and discovery endpoints. Run `npm run preview` and verify the Worker routes before a Cloudflare deployment.

See [the audit and external-profile drafts](docs/search-visibility.md) for the dated Search Console baseline, external actions, and measurement queries. Google ranking and AI citations must be measured after publishing; passing markup validation or a Lighthouse audit does not establish either outcome.
