import type { MetadataRoute } from "next";

import { getBlogPosts, postPath } from "@/data/blog";
import { PROFILE } from "@/data/profile";
import { DATA } from "@/data/resume";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DATA.url;

  // Get all blog posts
  const posts = await getBlogPosts();

  // Static pages
  const staticPages = [
    {
      changeFrequency: "weekly" as const,
      lastModified: new Date(PROFILE.updatedAt),
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: "weekly" as const,
      lastModified: new Date(
        Math.max(
          ...posts.map((post) =>
            new Date(
              post.metadata.updatedAt ?? post.metadata.publishedAt
            ).getTime()
          ),
          new Date(PROFILE.updatedAt).getTime()
        )
      ),
      priority: 0.8,
      url: `${baseUrl}/blog`,
    },
    {
      changeFrequency: "monthly" as const,
      lastModified: new Date(PROFILE.updatedAt),
      priority: 0.9,
      url: PROFILE.aboutUrl,
    },
  ];

  // Blog post pages
  const blogPages = posts.map((post) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(
      post.metadata.updatedAt ?? post.metadata.publishedAt
    ),
    priority: 0.6,
    url: `${baseUrl}${postPath(post.slug)}`,
  }));

  return [...staticPages, ...blogPages];
}
