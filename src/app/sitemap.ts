import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DATA.url;

  // Get all blog posts
  const posts = await getBlogPosts();

  // Static pages
  const staticPages = [
    {
      changeFrequency: "weekly" as const,
      lastModified: new Date(),
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: "weekly" as const,
      lastModified: new Date(),
      priority: 0.8,
      url: `${baseUrl}/blog`,
    },
  ];

  // Blog post pages
  const blogPages = posts.map((post) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(post.metadata.publishedAt),
    priority: 0.6,
    url: `${baseUrl}/blog/${post.slug}`,
  }));

  return [...staticPages, ...blogPages];
}
