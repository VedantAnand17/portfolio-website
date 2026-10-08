import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function actionLabel(type: string, title: string) {
  if (type === "Website") {
    return `Visit ${title}`;
  }
  if (type === "Source") {
    return `Source for ${title}`;
  }
  return `${type} for ${title}`;
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    label?: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border transition-shadow duration-300 ease-out hover:shadow-lg">
      <Link
        href={href || links?.[0]?.href || "/#projects"}
        aria-label={`View ${title}`}
        className={`relative block aspect-video cursor-pointer bg-black ${className ?? ""}`}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            title={`${title} project demonstration video`}
            className="pointer-events-none h-full w-full object-contain object-center"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={`${title} project screenshot showing the application interface and features`}
            fill
            className="object-contain object-center"
            sizes="(max-width: 639px) calc(100vw - 32px), 300px"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        )}
      </Link>
      <CardHeader className="px-4 pt-4">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base sm:min-h-12">{title}</CardTitle>
          <p className="text-muted-foreground text-sm">{dates}</p>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm leading-relaxed text-pretty">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-4">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link
                href={link?.href}
                aria-label={actionLabel(link.type, title)}
                title={link.label ? link.type : undefined}
                className="bg-primary text-primary-foreground inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium"
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">{link.icon}</span>
                  {link.label ?? link.type}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
