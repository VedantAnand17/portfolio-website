"use client";

import dynamic from "next/dynamic";

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => m.Analytics),
  { ssr: false }
);

export function AnalyticsWrapper() {
  return <Analytics />;
}
