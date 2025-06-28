"use client";

import { useEffect, useState } from "react";
import { getTweet, type Tweet } from "react-tweet/api";
import { MagicTweet, TweetSkeleton, TweetNotFound } from "./tweet-card";

interface ClientTweetCardProps {
  id: string;
  className?: string;
  fallback?: React.ReactNode;
  onError?: (error: any) => void;
}

export const ClientTweetCard = ({
  id,
  className,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: ClientTweetCardProps) => {
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        setLoading(true);
        const tweetData = await getTweet(id);
        if (tweetData) {
          setTweet(tweetData);
        } else {
          setError(new Error("Tweet not found"));
        }
      } catch (err) {
        setError(err);
        if (onError) {
          onError(err);
        } else {
          console.error("Failed to fetch tweet:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTweet();
    }
  }, [id, onError]);

  if (loading) {
    return fallback;
  }

  if (error || !tweet) {
    return <TweetNotFound className={className} {...props} />;
  }

  return <MagicTweet tweet={tweet} className={className} {...props} />;
};
