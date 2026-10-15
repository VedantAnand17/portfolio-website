import { getBlogPosts, postPath } from "@/data/blog";
import { PROFILE } from "@/data/profile";
import { DATA } from "@/data/resume";

async function sitemap() {
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

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");

export async function GET() {
  const entries = await sitemap();

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map((entry) => `<url><loc>${escape(entry.url)}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod><changefreq>${entry.changeFrequency}</changefreq><priority>${entry.priority}</priority></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
}
