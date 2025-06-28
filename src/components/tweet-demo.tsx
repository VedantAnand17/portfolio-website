import { TweetCard } from "@/components/magicui/tweet-card";
// import { ClientTweetCard } from "@/components/magicui/client-tweet-card";

/**
 * <TweetCard /> (Server Side Only) - Better for SEO and initial load performance
 * <ClientTweetCard /> (Client Side Only) - Better for dynamic interactions
 */
export function TweetDemo() {
  return (
    <div className="space-y-4">
      {/* Server-side rendered tweet - Better for SEO */}
      <TweetCard id="1668408059125702661" />
      
      {/* Client-side rendered tweet - For dynamic use cases */}
      {/* <ClientTweetCard id="1668408059125702661" /> */}
    </div>
  );
}
