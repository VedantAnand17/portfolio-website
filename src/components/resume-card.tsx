"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return (
    <div className="group relative flex min-h-12 gap-4">
      <Avatar className="size-12 shrink-0 border">
        <AvatarImage
          src={logoUrl}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          className="object-contain"
        />
        <AvatarFallback>{altText[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 space-y-1 py-1">
        <div
          className={`flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 ${description ? "pr-10" : ""}`}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="text-sm leading-none font-semibold">
              {href && href !== "#" ? (
                <Link
                  className="hover:underline"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h3>
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-xs tabular-nums sm:text-sm">
            {period}
          </p>
        </div>
        {subtitle && <p className="text-xs">{subtitle}</p>}
        {description && (
          <>
            <button
              type="button"
              aria-label={`Details for ${title}`}
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => setExpanded(!expanded)}
              className="pressable hover:bg-muted absolute top-0 right-0 inline-flex size-11 cursor-pointer items-center justify-center rounded-full"
            >
              <ChevronRightIcon
                aria-hidden="true"
                className={`size-4 ${expanded ? "rotate-90" : ""}`}
              />
            </button>
            <div id={id} hidden={!expanded}>
              <p className="text-muted-foreground pt-2 text-sm leading-relaxed">
                {description}
              </p>
            </div>
            <noscript>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </noscript>
          </>
        )}
      </div>
    </div>
  );
}
