"use client";

import { ChevronDownIcon } from "lucide-react";
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
    <div className="flex gap-3 border-b pb-4">
      <Avatar className="size-10 shrink-0 border sm:size-12">
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
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold">
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
          <p className="text-muted-foreground text-sm">{period}</p>
        </div>
        {subtitle && <p className="text-sm">{subtitle}</p>}
        {description && (
          <>
            <button
              type="button"
              aria-label={`Details for ${title}`}
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => setExpanded(!expanded)}
              className="text-link inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"
            >
              Details{" "}
              <ChevronDownIcon
                aria-hidden="true"
                className={`size-4 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
            <p
              id={id}
              hidden={!expanded}
              className="text-muted-foreground text-sm leading-relaxed"
            >
              {description}
            </p>
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
