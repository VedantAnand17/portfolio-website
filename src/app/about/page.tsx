import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/breadcrumb";
import { ProfileStructuredData } from "@/components/structured-data";
import { PROFILE } from "@/data/profile";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Vedant Anand",
  description: PROFILE.description,
  alternates: { canonical: PROFILE.aboutUrl },
  openGraph: {
    title: "About Vedant Anand | x402 & Agentic Commerce",
    description: PROFILE.description,
    url: PROFILE.aboutUrl,
    type: "profile",
    firstName: "Vedant",
    lastName: "Anand",
    username: "vedantsx",
    siteName: DATA.name,
    images: [PROFILE.socialImageUrl],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vedant Anand | x402 & Agentic Commerce",
    description: PROFILE.description,
    creator: "@vedantsx",
    images: [PROFILE.socialImageUrl],
  },
};

export default function AboutPage() {
  const contributions = DATA.projects.find(
    (project) => project.title === "x402 protocol contributions"
  );
  return (
    <main id="main-content" tabIndex={-1} className="space-y-8">
      <Breadcrumb items={[{ label: "About" }]} />
      <ProfileStructuredData />
      <header className="space-y-5 border-b pb-8">
        <Image
          src={DATA.avatarUrl}
          alt={DATA.name}
          width={96}
          height={96}
          priority
          className="rounded-full border"
        />
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {DATA.name}
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {PROFILE.description}
        </p>
        <p className="text-muted-foreground text-sm">
          Also known as Vedant, VedantAnand17 on GitHub, and @vedantsx on X.
          Based in {DATA.location}.
        </p>
      </header>
      <div className="prose dark:prose-invert max-w-full">
        <section aria-labelledby="commerce-heading">
          <h2 id="commerce-heading">Building agentic commerce at Bags</h2>
          <p>
            I co-founded <a href="https://www.getbags.app/">Bags</a> in February
            2026. Bags lets API providers charge AI agents per request using the
            x402 protocol and USDC payments. My work includes payment
            verification, payment records, and tax invoices. Bags is supported
            by Founders Inc., Canopy, and Superteam.
          </p>
          <p>
            Before Bags, I built{" "}
            <a href="https://agentpay.vedant-dev.com/">AgentPay</a>, a prototype
            for agents that pay for API calls over x402. I work with TypeScript,
            Next.js, Solidity, and stablecoin payment infrastructure.
          </p>
        </section>
        <section aria-labelledby="x402-heading">
          <h2 id="x402-heading">x402 open source work</h2>
          <p>
            I am an x402 contributor and maintainer. My contributions include
            fixes to the core resource server, permit-signing tests, ERC-20
            approval gas constants, and extensions documentation.
          </p>
          <p>Four merged pull requests to x402 document this work:</p>
          <ul>
            {contributions?.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.type}</a>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="mentorship-heading">
          <h2 id="mentorship-heading">Google Summer of Code mentorship</h2>
          <p>
            I mentored OWASP BLT contributors in Google Summer of Code 2026,
            from February through August 2026. I supported open source
            development and guided participants through the program.
          </p>
        </section>
        <section aria-labelledby="background-heading">
          <h2 id="background-heading">Engineering background</h2>
          <p>
            I study Electrical and Computer Engineering at Thapar Institute of
            Engineering and Technology, with expected graduation in 2027. I
            previously worked as a founding engineer at Timelock Protocol,
            building Solidity contracts for DeFi options, and as a full-stack
            blockchain developer at Mavik Labs.
          </p>
          <p>
            I also built VeriDoc, a document verification application using
            zero-knowledge proofs and Solidity. My hackathon work includes
            winning x402 Build Onchain in January 2026 and the ENS track at
            ETHGlobal HackMoney 2026 with nyx.
          </p>
          <p>
            <Link href="/#projects">Explore my projects</Link> or{" "}
            <Link href="/blog">read my technical articles</Link>.
          </p>
        </section>
        <section aria-labelledby="profiles-heading">
          <h2 id="profiles-heading">Find me online</h2>
          <ul>
            {PROFILE.socialProfiles.map((social) => (
              <li key={social.name}>
                <a href={social.url} rel="me">
                  {social.name}:{" "}
                  {social.name === "X" ? "@vedantsx" : "Vedant Anand"}
                </a>
              </li>
            ))}
          </ul>
          <p>
            For collaborations, contact{" "}
            <a href={`mailto:${DATA.contact.email}`}>{DATA.contact.email}</a>.
          </p>
        </section>
      </div>
      <p className="text-muted-foreground text-sm">
        Updated{" "}
        <time dateTime={PROFILE.updatedAt}>
          {formatDate(PROFILE.updatedAt)}
        </time>
      </p>
    </main>
  );
}
