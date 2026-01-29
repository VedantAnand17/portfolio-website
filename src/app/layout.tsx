import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/google-analytics";
import { StructuredData, WebsiteStructuredData } from "@/components/structured-data";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans, Outfit as FontDisplay } from "next/font/google";
import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => m.Analytics),
  { ssr: false }
);
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
    default: 'Vedant Anand - Full Stack Developer | Blockchain & Web3 Expert | Freelance Software Development',
    template: `%s | ${DATA.name} - Full Stack Developer`,
  },
  description: "Vedant Anand is a skilled full-stack developer specializing in blockchain, Web3, and custom software development. Expert in React, Next.js, TypeScript, Solidity, and Rust. Available for freelance projects and consulting.",
  keywords: [
    "Vedant Anand",
    "Full Stack Developer",
    "Blockchain Developer",
    "Web3 Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Solidity Developer",
    "Rust Developer",
    "Freelance Developer",
    "Custom Software Development",
    "Zero-Knowledge Proofs",
    "Smart Contracts",
    "DApp Development",
    "Frontend Development",
    "Backend Development",
    "Portfolio",
    "Software Engineer",
    "Web Development",
    "Mobile Development",
    "Open Source",
    "Hackathons",
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
    title: `${DATA.name} - Full Stack Developer & Blockchain Expert`,
    description: "Vedant Anand is a skilled full-stack developer specializing in blockchain, Web3, and custom software development. Expert in React, Next.js, TypeScript, Solidity, and Rust.",
    url: DATA.url,
    siteName: `${DATA.name} - Portfolio`,
    images: [
      {
        url: `${DATA.url}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Full Stack Developer Portfolio Preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - Full Stack Developer & Blockchain Expert`,
    description: "Vedant Anand is a skilled full-stack developer specializing in blockchain, Web3, and custom software development. Expert in React, Next.js, TypeScript, Solidity, and Rust.",
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
  assets: [`${DATA.url}/public`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
            <div className="hidden md:block">
              <SmoothCursor />
            </div>
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
