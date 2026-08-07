import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/google-analytics";
import { StructuredData, WebsiteStructuredData } from "@/components/structured-data";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans, Outfit as FontDisplay } from "next/font/google";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { SmoothCursorWrapper } from "@/components/smooth-cursor-wrapper";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
  preload: true,
});

const fontDisplay = FontDisplay({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: 'Vedant Anand - Agentic Payments & x402 Engineer | Solidity + Full-Stack TypeScript | Available for Contract Work',
    template: `%s | ${DATA.name} - Agentic Payments & x402 Engineer`,
  },
  description: "Vedant Anand builds payment infrastructure for AI agents. Co-founder of Bags, an agentic commerce platform charging AI agents per API call over x402, backed by Founders Inc. and Superteam. Three merged pull requests to the x402 protocol. Solidity, Next.js and TypeScript. Available now for contract and part-time work.",
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
  authors: [{ name: DATA.name, url: "https://github.com/vedantanand17" }],
  creator: DATA.name,
  publisher: DATA.name,
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: `${DATA.name} - Agentic Payments & x402 Engineer`,
    description: "I build payment infrastructure for AI agents. Co-founder of Bags (agentic commerce over x402, backed by Founders Inc. and Superteam), three merged PRs to the x402 protocol, production Solidity and full-stack TypeScript. Available for contract work now.",
    url: DATA.url,
    siteName: `${DATA.name} - Portfolio`,
    images: [
      {
        url: `${DATA.url}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Agentic Payments & x402 Engineer, available for contract work`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - Agentic Payments & x402 Engineer`,
    description: "I build payment infrastructure for AI agents. Co-founder of Bags (agentic commerce over x402), three merged PRs to the x402 protocol, production Solidity and full-stack TypeScript. Available for contract work now.",
    site: "@vedantsx",
    creator: "@vedantsx",
    images: [`${DATA.url}/og-image.webp`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: `/favicon.ico` }],
  },
  verification: {
    google: "ICMF45n16z_LIoSylPf_GKvDz_ZAk3rD1sw7W73Yqcw", // Add your Google verification code
    yandex: "",
  },
  category: "Technology",
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
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
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
