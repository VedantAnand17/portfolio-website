import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans, Outfit as FontDisplay } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = FontDisplay({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: 'Vedant Anand - Full stack Blockchain Developer & Innovator',
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Vedant",
    "Vedant Anand",
    "Full Stack Developer",
    "Blockchain Developer",
    "Web3 Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Portfolio",
    "Zero-Knowledge Proofs",
    "Solidity",
    "Rust",
    "Docker",
    "Git",
    "Open Source",
    "Hackathons",
    "Veri Doc",
    "Mavik Labs",
  ],
  authors: [{ name: DATA.name, url: "https://github.com/vedantanand17" }],
  creator: DATA.name,
  publisher: DATA.name,
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    images: [
      {
        url: `${DATA.url}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} Portfolio Preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - Full Stack Blockchain Developer`,
    description: DATA.description,
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
    google: "tJAGFJGKh1oBdcxgebVw1ChPsb0uWLOcY86FsFJBeV0", // Add your Google verification code
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
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
