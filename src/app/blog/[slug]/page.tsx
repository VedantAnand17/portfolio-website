import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogBreadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/structured-data";
import { getBlogPosts, getPost, postPath } from "@/data/blog";
import { PROFILE } from "@/data/profile";
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
  const ogImage = image ? `${DATA.url}${image}` : PROFILE.socialImageUrl;

  return {
    alternates: {
      canonical: `${DATA.url}${postPath(post.slug)}`,
    },
    description,
    openGraph: {
      description,
      images: [
        {
          url: ogImage,
        },
      ],
      modifiedTime: post.metadata.updatedAt,
      authors: [PROFILE.aboutUrl],
      siteName: DATA.name,
      publishedTime,
      title,
      type: "article",
      url: `${DATA.url}${postPath(post.slug)}`,
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
    <main id="main-content" tabIndex={-1}>
      <BlogBreadcrumb title={post.metadata.title} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${DATA.url}${postPath(post.slug)}#article`,
          author: {
            "@type": "Person",
            "@id": PROFILE.personId,
            name: DATA.name,
            url: PROFILE.aboutUrl,
          },
          publisher: { "@id": PROFILE.personId },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${DATA.url}${postPath(post.slug)}`,
          },
          isPartOf: { "@id": PROFILE.websiteId },
          inLanguage: "en",
          dateModified: post.metadata.updatedAt || post.metadata.publishedAt,
          datePublished: post.metadata.publishedAt,
          description: post.metadata.summary,
          headline: post.metadata.title,
          image: post.metadata.image
            ? `${DATA.url}${post.metadata.image}`
            : PROFILE.socialImageUrl,
          url: `${DATA.url}${postPath(post.slug)}`,
        }}
      />
      <h1 className="title max-w-[650px] text-2xl font-medium tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mt-2 mb-8 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          By{" "}
          <Link
            href="/about"
            rel="author"
            className="text-link underline underline-offset-4"
          >
            {DATA.name}
          </Link>{" "}
          ·{" "}
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
