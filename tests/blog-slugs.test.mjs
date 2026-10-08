import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { unlink, writeFile } from "node:fs/promises";
import { test } from "node:test";
import path from "node:path";

const fixturePath = path.join(process.cwd(), "content", "ReleaseNotes.mdx");
const fixture = `---
title: "Release Notes"
publishedAt: "2026-10-08"
summary: "A mixed-case slug fixture."
---

## Update

This temporary article verifies filename handling.
`;

test("mixed-case article slugs load and list without allowing traversal", async () => {
  await writeFile(fixturePath, fixture);
  try {
    const child = spawn(
      process.execPath,
      [
        "--experimental-strip-types",
        "--input-type=module",
        "-e",
        `
          import { getBlogPosts, getPost } from "./src/data/blog.ts";
          const post = await getPost("ReleaseNotes");
          const posts = await getBlogPosts();
          const traversal = await getPost("../README");
          if (
            !post ||
            post.slug !== "ReleaseNotes" ||
            !posts.some((item) => item.slug === "ReleaseNotes") ||
            traversal !== null
          ) {
            process.exitCode = 1;
          }
        `,
      ],
      { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"] }
    );
    let output = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => (output += chunk));
    child.stderr.setEncoding("utf8").on("data", (chunk) => (output += chunk));
    const [code] = await once(child, "exit");
    assert.equal(code, 0, output);
  } finally {
    await unlink(fixturePath);
  }
});
