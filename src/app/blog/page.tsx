import type { Metadata } from "next";
import Link from "next/link";

import { getBlogPosts, postPath } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: `${DATA.url}/blog` },
  title: "Blog",
  description: "Notes on DeFi, Uniswap, and payment infrastructure.",
  openGraph: {
    title: "Blog | Vedant Anand",
    description: "Notes on DeFi, Uniswap, and payment infrastructure.",
    url: `${DATA.url}/blog`,
    images: [`${DATA.url}/og-image.webp`],
  },
  twitter: {
    title: "Blog | Vedant Anand",
    description: "Notes on DeFi, Uniswap, and payment infrastructure.",
    images: [`${DATA.url}/og-image.webp`],
  },
};

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
  return (
    <main id="main-content" className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-muted-foreground">
        Notes on DeFi, Uniswap, and payment infrastructure.
      </p>
      {posts.length === 0 ? (
        <p>
          No articles yet.{" "}
          <Link href="/" className="text-link underline">
            Go home
          </Link>
        </p>
      ) : (
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                className="hover:bg-muted block space-y-2 rounded-lg py-5"
                href={postPath(post.slug)}
              >
                <h2 className="text-lg font-semibold">{post.metadata.title}</h2>
                <p className="text-muted-foreground text-sm">
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDate(post.metadata.publishedAt)}
                  </time>{" "}
                  · {post.readingMinutes} min read
                </p>
                <p className="text-muted-foreground">{post.metadata.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
