"use client";

import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("react-markdown"), {
  ssr: false,
  loading: () => <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">Loading...</div>,
});

interface MarkdownWrapperProps {
  children: string;
  className?: string;
}

export function MarkdownWrapper({ children, className }: MarkdownWrapperProps) {
  return <Markdown className={className}>{children}</Markdown>;
}
