# Vedant Anand search visibility

Audit date: 15 October 2026. Target canonical origin: https://www.vedant-dev.com.

## Evidence and baseline

The authenticated non-www Search Console property showed name-query impressions and clicks, but does not cover the complete canonical www host. The exact dated analytics baseline is retained in the local audit report outside this public repository.

That property had one indexed URL. Its sitemap was last read on 29 December 2025. `/blog` and `/blog/uniswap-guide` had mistakenly been submitted as sitemaps and each showed an error. The www URL-prefix property was absent. It was added and automatically verified using the existing HTML verification tag on 15 October 2026; `/sitemap.xml` was submitted successfully. Google said the new property's reporting data was still processing. Both mistaken HTML-page sitemap submissions were removed from the non-www property. The canonical www sitemap was read successfully on 15 October and initially discovered four existing pages; the new biography and x402 article join it after publishing.

The live portfolio and GitHub identify Vedant Anand as an agentic payments developer. The authenticated LinkedIn profile confirms Bags and GSoC 2026 with OWASP BLT; Thapar's institutional post also announced his mentorship. The authenticated X profile identifies him as founder of Bags and shows agentic commerce education posts. The current x402 maintainer role is confirmed by Vedant in this conversation; he requested no link for that role. The four contribution links evidence contributions, not a formal x402 Foundation employment relationship.

## Implemented site changes

- Full name in the homepage H1 and concise, consistent title and description.
- `/about` as the canonical biography and article author page, with visible roles, education, project evidence, and official social profiles.
- Stable Person and WebSite identifiers reused by ProfilePage and BlogPosting markup; ongoing study represented as affiliation, not alumni status.
- Visible article bylines, author URLs, publication/update dates, and safe JSON-LD serialization.
- An original x402 article grounded in Bags, AgentPay, and merged PR #3051, plus a generated identity share image.
- Canonical sitemap entries for all public pages, with content modification dates rather than a new timestamp on every build.
- Both llms.txt endpoints generated from the same profile, project, and article data. These are optional discovery aids; they are not established ranking signals and do not grant an AI training license.

## Consistent profile copy

These drafts are ready to apply to the external profiles. Profile edits and posts were not published as part of the site implementation.

LinkedIn headline:

> Co-founder at Bags | x402 contributor & maintainer | Agentic commerce & AI payments | GSoC 2026 mentor, OWASP BLT

LinkedIn About:

> I'm Vedant Anand, co-founder of Bags and an x402 contributor and maintainer. I build payment infrastructure that lets AI agents buy API responses using USDC. My work spans TypeScript, Solidity, payment verification, and developer integrations.
>
> At Bags, we help API providers charge agents per request over x402. Before Bags, I built AgentPay to explore agents paying for metered API calls. My public x402 contributions include core resource-server behavior, EIP-2612 permit-signing tests, ERC-20 approval gas constants, and extensions documentation.
>
> I mentored OWASP BLT contributors in Google Summer of Code 2026. I study Electrical and Computer Engineering at Thapar Institute of Engineering and Technology, with expected graduation in 2027.
>
> Projects and biography: https://www.vedant-dev.com/about Contact: vedantanand.in@gmail.com

X bio (within 160 characters):

> Co-founder @getbagsapp | x402 contributor & maintainer | Building agentic commerce & AI payments | GSoC 2026 mentor @ OWASP BLT

GitHub bio:

> Co-founder of Bags. x402 contributor & maintainer. Building agentic commerce and AI payments. GSoC 2026 mentor, OWASP BLT.

Use https://www.vedant-dev.com/ in the website field on each profile. The public GitHub bio/company and README currently describe Timelock work as current, while the portfolio says that role ended in February 2026; update that positioning when applying these drafts. A Bags team/about page and the OWASP BLT mentor listing can strengthen independent attribution by naming Vedant Anand and linking to the biography, where their maintainers agree. Do not create fake reviews, awards, accounts, or mentions.

## Measurement after publishing

Record the following queries at a consistent country/device setting: Vedant Anand, Vedant, Vedant Anand x402, Vedant Anand Bags, Vedant Anand agentic commerce, Vedant Anand GSoC, VedantAnand17, and vedantsx.

In Search Console, compare 28-day periods for clicks, impressions, CTR, and average position. Keep the non-www property for historical comparison and use the www property for canonical pages. A domain property can later consolidate subdomains using DNS verification. Inspect the homepage, biography, and x402 article and request indexing once the production URLs serve the new content. Submission does not guarantee indexing.

For AI search, run the same identity questions several times per engine. Record exact prompts, date, engine, mentions, citations, and factual accuracy. For example: "Who is Vedant Anand, the x402 contributor?", "Who co-founded Bags for agentic commerce?", and "What has Vedant Anand contributed to x402?" Report counts and sample sizes, not a score inferred from markup. No cross-platform AI citation baseline was measured in this session.

Review results after recrawling and again after four weeks. First-name queries are ambiguous; prioritize the full name and relevant professional contexts. No ranking, knowledge panel, or AI recommendation is guaranteed.

## Primary documentation

- [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)
- [Google profile-page markup](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google site names](https://developers.google.com/search/docs/appearance/site-names)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [OpenAI crawler purposes](https://developers.openai.com/api/docs/bots)
- [x402 resource-server contribution](https://github.com/x402-foundation/x402/pull/3051)

## Verification

Before implementation, browser tests failed for the missing biography, incomplete homepage identity, absent bylines, stale discovery files, missing article, and a script-like article title that executed through JSON-LD. After implementation, `npm test` passed both Node tests and all 38 production-browser tests; typecheck, lint, formatting, and diff whitespace checks passed. The existing malformed-slug tests still produce Next.js cache-write warnings for null-byte and overlong paths while returning the expected 404s. Lighthouse on the original live homepage scored 100 for technical SEO, accessibility, best practices, and agentic browsing; those scores do not measure name rankings.

Cloudflare verification: `npm run preview` built the Worker and served all new routes. Six browser checks passed against the local Worker, covering identity, author attribution, discovery files, the new article, and share previews. OpenNext emitted three dependency-copy warnings for hast/property-information packages but completed the bundle; the tested public Worker routes returned the expected content. The synthetic mutable-file injection fixture was exercised in the Node/Next production suite, not the bundled Worker.
