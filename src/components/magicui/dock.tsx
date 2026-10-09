import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Dock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border p-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DockIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
