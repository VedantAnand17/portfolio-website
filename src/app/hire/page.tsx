import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DATA } from "@/data/resume";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: "Hire Me — x402, Agentic Payments, Solidity & TypeScript",
  description:
    "Vedant Anand is available now for contract and part-time work: x402 and agentic payments integration, Solidity development and review, and protocol research. Published rate card, no negotiation required to get a number.",
  alternates: {
    canonical: `${DATA.url}/hire`,
  },
  openGraph: {
    title: `${DATA.name} — Available for contract work`,
    description:
      "x402 and agentic payments integration from $3,500. Solidity at $70/hour, full-stack TypeScript at $55/hour, protocol deep-dives at $900 a piece. Part-time retainers from $7,500/month.",
    url: `${DATA.url}/hire`,
    type: "profile",
    // openGraph is replaced wholesale, not merged, so the image has to be repeated here.
    images: [
      {
        url: `${DATA.url}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - available for contract work in agentic payments, x402 and Solidity`,
      },
    ],
  },
};

export default function HirePage() {
  const { hire } = DATA;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="availability" aria-labelledby="availability-heading">
        <div className="space-y-3">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Badge className="text-xs">{hire.status}</Badge>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1
              id="availability-heading"
              className="text-3xl font-bold tracking-tighter sm:text-5xl font-display"
            >
              Hire me
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-muted-foreground text-pretty">
              Available for contract and part-time work from {hire.since}.{" "}
              {hire.capacity} {hire.timezone} I graduate in 2027, which does not
              affect contract work — I am billing now, not looking for a start
              date.
            </p>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <p className="text-muted-foreground text-pretty">
              I build payment infrastructure for AI agents. I co-founded{" "}
              <Link href="/#work" className="text-blue-500 hover:underline">
                Bags
              </Link>
              , an agentic commerce platform that let any API charge AI agents
              per request over x402, and I have three merged pull requests in
              the{" "}
              <Link
                href="https://github.com/x402-foundation/x402/pulls?q=is%3Apr+author%3AVedantAnand17+is%3Amerged"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                x402 protocol repository
              </Link>{" "}
              itself. Underneath that is production Solidity on a DeFi options
              protocol and two years of paid full-stack TypeScript.
            </p>
          </BlurFade>
        </div>
      </section>

      <section id="rates" aria-labelledby="rates-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 id="rates-heading" className="text-xl font-bold">
              Rate card
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <ul className="divide-y divide-dashed border-y border-dashed">
              {hire.rates.map((rate) => (
                <li
                  key={rate.work}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 py-2 text-sm"
                >
                  <span>{rate.work}</span>
                  <span className="font-medium tabular-nums">{rate.rate}</span>
                </li>
              ))}
            </ul>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <p className="text-xs text-muted-foreground">
              Invoiced in USD or settled in USDC, whichever suits you. A UK
              client engaging a non-UK-resident contractor working entirely
              outside the UK has no IR35 determination and no PAYE to run.
            </p>
          </BlurFade>
        </div>
      </section>

      <section id="services" aria-labelledby="services-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 id="services-heading" className="text-xl font-bold">
              What you can hire me for
            </h2>
          </BlurFade>
          {hire.services.map((service, id) => (
            <BlurFade key={service.title} delay={BLUR_FADE_DELAY * 9 + id * 0.05}>
              <Card className="border">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{service.title}</CardTitle>
                  <p className="text-sm font-medium">{service.price}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground text-pretty">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <p className="text-xs text-muted-foreground">{hire.notDoing}</p>
          </BlurFade>
        </div>
      </section>

      <section id="proof" aria-labelledby="proof-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <h2 id="proof-heading" className="text-xl font-bold">
              Proof, not adjectives
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#projects" className="text-blue-500 hover:underline">
                  Bags
                </Link>{" "}
                — pay-per-call links that quoted a price, verified a USDC
                payment across four chains, then returned the API response.
                100,000+ cumulative visitors, backed by Founders Inc. and
                Superteam, part of the Canopy builder cohort. Wound down in 2026
                for lack of product-market fit.
              </li>
              <li>
                Three merged pull requests to the x402 protocol repository:{" "}
                <Link
                  href="https://github.com/x402-foundation/x402/pull/2344"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EIP-2612 permit-signing tests
                </Link>
                ,{" "}
                <Link
                  href="https://github.com/x402-foundation/x402/pull/2278"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ERC-20 approval gas constants
                </Link>{" "}
                and{" "}
                <Link
                  href="https://github.com/x402-foundation/x402/pull/731"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  extensions documentation
                </Link>
                .
              </li>
              <li>
                <Link
                  href="https://agentpay.vedant-dev.com/"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AgentPay
                </Link>{" "}
                — an agent that pays per request for sentiment analysis and
                trading signals over x402.
              </li>
              <li>
                Founding engineer at Timelock Protocol: Solidity for perpetual
                options and market making, with the trading interface in Next.js
                and TypeScript.
              </li>
            </ul>
          </BlurFade>
        </div>
      </section>

      <section id="book" aria-labelledby="book-heading">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <h2 id="book-heading" className="text-xl font-bold">
              How to hire me
            </h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <p className="text-sm text-muted-foreground text-pretty">
              Email{" "}
              <Link
                href={`mailto:${DATA.contact.email}`}
                className="text-blue-500 hover:underline"
              >
                {DATA.contact.email}
              </Link>{" "}
              with what you need built and roughly when. I usually reply within
              a day.
              {hire.bookingUrl ? (
                <>
                  {" "}
                  Or{" "}
                  <Link
                    href={hire.bookingUrl}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    book 30 minutes
                  </Link>
                  , free, no pitch.
                </>
              ) : null}
            </p>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
