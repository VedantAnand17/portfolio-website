"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SmoothCursor = dynamic(
  () => import("@/components/ui/smooth-cursor").then((m) => m.SmoothCursor),
  { ssr: false }
);

export function SmoothCursorWrapper() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return enabled ? <SmoothCursor /> : null;
}
