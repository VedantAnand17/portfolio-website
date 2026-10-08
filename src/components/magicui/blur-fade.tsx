"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  blur?: string;
}

// CSS enhances server-rendered content and also works without JavaScript.
export default function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !window.IntersectionObserver) {
      return;
    }
    const bounds = element.getBoundingClientRect();
    if (bounds.top < innerHeight && bounds.bottom > 0) {
      return;
    }
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          delete element.dataset.reveal;
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(element);
    const reveal = () => {
      if (preference.matches) {
        delete element.dataset.reveal;
        observer.disconnect();
      }
    };
    preference.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", reveal);
      delete element.dataset.reveal;
    };
  }, []);
  return (
    <div
      ref={ref}
      className={cn("blur-fade", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-duration": `${duration}s`,
          "--reveal-offset": `${yOffset}px`,
          "--reveal-blur": blur,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
