import type { Metadata } from "next";
import { Inter as FontSans, Outfit as FontDisplay } from "next/font/google";

import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { GoogleAnalytics } from "@/components/google-analytics";
import Navbar from "@/components/navbar";
import {
  StructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PROFILE } from "@/data/profile";
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
  authors: [{ name: DATA.name, url: PROFILE.aboutUrl }],
  category: "Technology",
  creator: DATA.name,
  description: PROFILE.description,
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
    "VeriDoc",
    "Mavik Labs",
    "Thapar University",
    "India Developer",
  ],
  metadataBase: new URL(DATA.url),
  openGraph: {
    description: PROFILE.description,
    images: [
      {
        url: PROFILE.socialImageUrl,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - x402 and agentic commerce`,
      },
    ],
    locale: "en_US",
    siteName: DATA.name,
    title: PROFILE.title,
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
    default: PROFILE.title,
    template: `%s | ${DATA.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@vedantsx",
    description: PROFILE.description,
    images: [PROFILE.socialImageUrl],
    site: "@vedantsx",
    title: PROFILE.title,
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
          "bg-background mx-auto min-h-screen max-w-2xl px-4 pt-10 pb-28 font-sans antialiased sm:px-6 sm:pt-20",
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <TooltipProvider
            delayDuration={350}
            skipDelayDuration={300}
            disableHoverableContent
          >
            <a
              href="#main-content"
              className="bg-background fixed top-3 left-3 z-50 -translate-y-20 rounded-md border p-3 focus:translate-y-0"
            >
              Skip to content
            </a>
            {children}
            <Navbar />
            <AnalyticsWrapper />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
