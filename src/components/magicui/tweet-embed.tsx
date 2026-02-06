"use client";

import { useEffect, useRef } from "react";

interface TweetEmbedProps {
  tweetId: string;
  className?: string;
}

export function TweetEmbed({ tweetId, className = "" }: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <blockquote className="twitter-tweet" data-conversation="none">
        <a href={`https://twitter.com/i/status/${tweetId}`}></a>
      </blockquote>
    </div>
  );
}
