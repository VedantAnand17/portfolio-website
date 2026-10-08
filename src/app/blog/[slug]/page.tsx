import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogBreadcrumb } from "@/components/breadcrumb";
import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og-image.webp`;

  return {
    alternates: {
      canonical: `${DATA.url}/blog/${post.slug}`,
    },
    description,
    openGraph: {
      description,
      images: [
        {
          url: ogImage,
        },
      ],
      publishedTime,
      title,
      type: "article",
      url: `${DATA.url}/blog/${post.slug}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [ogImage],
      title,
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main id="main-content">
      <BlogBreadcrumb title={post.metadata.title} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            author: {
              "@type": "Person",
              name: DATA.name,
            },
            dateModified: post.metadata.updatedAt || post.metadata.publishedAt,
            datePublished: post.metadata.publishedAt,
            description: post.metadata.summary,
            headline: post.metadata.title,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og-image.webp`,
            url: `${DATA.url}/blog/${post.slug}`,
          }),
        }}
      />
      <h1 className="title max-w-[650px] text-2xl font-medium tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mt-2 mb-8 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>{" "}
          · {post.readingMinutes} min read
          {post.metadata.updatedAt && (
            <>
              {" "}
              · Updated{" "}
              <time dateTime={post.metadata.updatedAt}>
                {formatDate(post.metadata.updatedAt)}
              </time>
            </>
          )}
        </p>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      />
    </main>
  );
}
