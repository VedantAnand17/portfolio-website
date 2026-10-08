"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface Post {
  id: string;
  url: string;
  date: string;
}
interface Widgets {
  createTweet: (
    id: string,
    target: HTMLElement,
    options: {
      theme: string;
      dnt: boolean;
      conversation: string;
      width: number;
    }
  ) => Promise<HTMLElement | undefined>;
}

export function XPosts({
  posts,
  name,
  avatar,
}: {
  posts: Post[];
  name: string;
  avatar: string;
}) {
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const targets = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const widgets = (window as Window & { twttr?: { widgets?: Widgets } }).twttr
      ?.widgets;
    if (!ready || !widgets) {
      return;
    }
    setLoaded(new Set());
    const mounts = posts.map((post, index) => {
      const target = targets.current[index];
      if (!target) {
        return null;
      }
      const mount = document.createElement("div");
      target.replaceChildren(mount);
      widgets
        .createTweet(post.id, mount, {
          theme: resolvedTheme === "dark" ? "dark" : "light",
          dnt: true,
          conversation: "none",
          width: Math.min(550, target.clientWidth),
        })
        .then((widget) => {
          if (widget && mount.isConnected) {
            setLoaded((current) => new Set([...current, post.id]));
          }
        })
        .catch(() => mount.remove());
      return mount;
    });
    return () => {
      for (const mount of mounts) {
        mount?.remove();
      }
    };
  }, [posts, ready, resolvedTheme]);
  return (
    <>
      <Script
        id="x-post-widgets"
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((post, index) => (
          <li
            key={post.id}
            className={`bg-card min-w-0 rounded-xl ${loaded.has(post.id) ? "" : "border p-4 transition-shadow duration-300 hover:shadow-lg"}`}
          >
            <div
              hidden={loaded.has(post.id)}
              className="mb-3 flex items-center gap-3"
            >
              <Image
                src={avatar}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="size-10 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-muted-foreground text-xs">@vedantsx</p>
              </div>
              <span aria-hidden="true" className="text-lg">
                𝕏
              </span>
            </div>
            <div
              ref={(element) => {
                targets.current[index] = element;
              }}
              className="min-w-0 [&_iframe]:max-w-full"
            />
            <p
              hidden={loaded.has(post.id)}
              className="text-muted-foreground text-sm"
            >
              Learning Journey
            </p>
            <time
              hidden={loaded.has(post.id)}
              dateTime={post.date}
              className="text-muted-foreground mt-2 block text-xs"
            >
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(post.date))}
            </time>
            <a
              hidden={loaded.has(post.id)}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-2 inline-flex min-h-11 cursor-pointer items-center text-sm underline underline-offset-4"
            >
              Read post on X
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
