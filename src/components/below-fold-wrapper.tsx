"use client";

import dynamic from "next/dynamic";

const BelowFoldSections = dynamic(
  () => import("@/components/below-fold-sections").then((m) => m.BelowFoldSections),
  { ssr: false }
);

export function BelowFoldSectionsWrapper() {
  return <BelowFoldSections />;
}
