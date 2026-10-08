import fs from "node:fs";
import path from "node:path";

import type { Element, Root } from "hast";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { parse } from "yaml";

function visitArticleImages(node: Root | Element) {
  if (
    node.type === "element" &&
    node.tagName === "img" &&
    node.properties.src === "/blog/concentrated-liquidity/banner-960.webp"
  ) {
    Object.assign(node.properties, {
      width: 960,
      height: 320,
      loading: "lazy",
      decoding: "async",
      srcSet:
        "/blog/concentrated-liquidity/banner-480.webp 480w, /blog/concentrated-liquidity/banner-960.webp 960w",
      sizes: "(max-width: 640px) calc(100vw - 32px), 624px",
    });
  }
  for (const child of node.children) {
    if (child.type === "element") {
      visitArticleImages(child);
    }
  }
}

function articleImages() {
  return visitArticleImages;
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(articleImages)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        dark: "min-dark",
        light: "min-light",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  let source: string;
  try {
    source = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
  const parts =
    /^---\r?\n(?<frontmatter>[\s\S]*?)\r?\n---\r?\n(?<body>[\s\S]*)$/.exec(
      source
    );
  if (!parts?.groups) {
    throw new Error(`Missing frontmatter: ${slug}`);
  }
  const metadata = parse(parts.groups.frontmatter);
  if (
    typeof metadata?.title !== "string" ||
    typeof metadata?.summary !== "string" ||
    typeof metadata?.publishedAt !== "string"
  ) {
    throw new TypeError(`Invalid article metadata: ${slug}`);
  }
  const rawContent = parts.groups.body;
  const content = await markdownToHTML(rawContent);
  return {
    metadata,
    readingMinutes: Math.max(
      1,
      Math.ceil(rawContent.trim().split(/\s+/).length / 200)
    ),
    slug,
    source: content,
  };
}

async function getAllPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const post = await getPost(slug);
      if (!post) {
        throw new Error(`Missing article: ${slug}`);
      }
      return post;
    })
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
