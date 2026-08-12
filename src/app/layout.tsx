import type { Metadata } from "next";
import { Inter as FontSans, Outfit as FontDisplay } from "next/font/google";

import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { GoogleAnalytics } from "@/components/google-analytics";
import Navbar from "@/components/navbar";
import { SmoothCursorWrapper } from "@/components/smooth-cursor-wrapper";
import {
  StructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({
  adjustFontFallback: true,
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fontDisplay = FontDisplay({
  adjustFontFallback: true,
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  alternates: {
    canonical: DATA.url,
  },
  authors: [{ name: DATA.name, url: "https://github.com/vedantanand17" }],
  category: "Technology",
  creator: DATA.name,
  description:
    "Vedant Anand builds payment infrastructure for AI agents. Co-founder of Bags, an agentic commerce platform charging AI agents per API call over x402, backed by Founders Inc. and Superteam. Three merged pull requests to the x402 protocol. Solidity, Next.js and TypeScript. Available now for contract and part-time work.",
  icons: {
    icon: [{ url: `/favicon.ico` }],
  },
  keywords: [
    "Vedant Anand",
    "x402",
    "x402 developer",
    "agentic commerce",
    "agentic payments",
    "AI agent payments",
    "stablecoin payments",
    "USDC payments",
    "pay-per-call API",
    "Solidity Developer",
    "Smart Contracts",
    "Full Stack Developer",
    "Blockchain Developer",
    "Web3 Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Rust Developer",
    "Contract Developer",
    "Freelance Developer",
    "Protocol Research",
    "Zero-Knowledge Proofs",
    "DApp Development",
    "Open Source",
    "Bags",
    "AgentPay",
    "Superteam",
    "Founders Inc",
    "Canopy",
    "Timelock Protocol",
    "Veri Doc",
    "Mavik Labs",
    "Thapar University",
    "India Developer",
  ],
  metadataBase: new URL(DATA.url),
  openGraph: {
    description:
      "I build payment infrastructure for AI agents. Co-founder of Bags (agentic commerce over x402, backed by Founders Inc. and Superteam), three merged PRs to the x402 protocol, production Solidity and full-stack TypeScript.",
    images: [
      {
        url: `${DATA.url}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Agentic Payments & x402 Engineer`,
      },
    ],
    locale: "en_US",
    siteName: `${DATA.name} - Portfolio`,
    title: `${DATA.name} - Agentic Payments & x402 Engineer`,
    type: "website",
    url: DATA.url,
  },
  publisher: DATA.name,
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      noimageindex: false,
    },
    index: true,
    nocache: false,
  },
  title: {
    default:
      "Vedant Anand - Agentic Payments & x402 Engineer | Solidity + Full-Stack TypeScript | Available for Contract Work",
    template: `%s | ${DATA.name} - Agentic Payments & x402 Engineer`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@vedantsx",
    description:
      "I build payment infrastructure for AI agents. Co-founder of Bags (agentic commerce over x402), three merged PRs to the x402 protocol, production Solidity and full-stack TypeScript.",
    images: [`${DATA.url}/og-image.webp`],
    site: "@vedantsx",
    title: `${DATA.name} - Agentic Payments & x402 Engineer`,
  },
  verification: {
    google: "ICMF45n16z_LIoSylPf_GKvDz_ZAk3rD1sw7W73Yqcw", // Add your Google verification code
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/vedantpfp.webp" as="image" />
        <GoogleAnalytics />
        <StructuredData />
        <WebsiteStructuredData />
      </head>
      <body
        className={cn(
          "bg-background mx-auto min-h-screen max-w-2xl px-6 py-12 font-sans antialiased sm:py-24",
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
            {/* Professional smooth cursor - only visible on desktop */}
            <SmoothCursorWrapper />
            <AnalyticsWrapper />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
