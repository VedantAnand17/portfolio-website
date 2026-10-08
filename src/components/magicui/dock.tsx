"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const DockContext = createContext<{
  mouseX: MotionValue<number>;
  animate: boolean;
} | null>(null);

export function Dock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const query = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setAnimate(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const context = useMemo(() => ({ mouseX, animate }), [mouseX, animate]);
  return (
    <DockContext.Provider value={context}>
      <div
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex items-center gap-1 rounded-full border p-2",
          className
        )}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

export function DockIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const dock = useContext(DockContext);
  const fallback = useMotionValue(Infinity);
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(dock?.mouseX ?? fallback, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? value - bounds.x - bounds.width / 2 : Infinity;
  });
  const targetWidth = useTransform(distance, [-140, 0, 140], [44, 60, 44]);
  const width = useSpring(targetWidth, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  return (
    <motion.div
      ref={ref}
      style={{ width: dock?.animate ? width : 44 }}
      className={cn(
        "flex aspect-square shrink-0 items-center justify-center",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
