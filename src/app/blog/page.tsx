import Link from "next/link";

import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";

export const metadata = {
  description: "My thoughts on software development, life, and more.",
  title: "Blog",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="mb-8 text-2xl font-medium tracking-tighter">Blogs</h1>
      </BlurFade>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground mb-4">
            No blog posts yet. Check back soon for updates!
          </p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-md px-4 py-2 transition-colors"
          >
            Go Home
          </Link>
        </div>
      ) : (
        posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="mb-4 flex flex-col space-y-1 rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-900/50"
                href={`/blog/${post.slug}`}
              >
                <div className="flex w-full flex-col">
                  <p className="font-medium tracking-tight">
                    {post.metadata.title}
                  </p>
                  <p className="text-muted-foreground h-6 text-xs">
                    {post.metadata.publishedAt}
                  </p>
                </div>
              </Link>
            </BlurFade>
          ))
      )}
    </section>
  );
}
