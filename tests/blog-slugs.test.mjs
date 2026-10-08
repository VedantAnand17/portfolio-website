import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const fixturePaths = [
  path.join(process.cwd(), "content", "ReleaseNotes.mdx"),
  path.join(process.cwd(), "content", "Release?Notes.mdx"),
];
const fixture = (title) => `---
title: "${title}"
publishedAt: "2026-10-08"
summary: "A slug fixture."
---

## Update

This temporary article verifies filename handling.
`;

test("mixed-case and reserved article slugs generate safe links", async () => {
  const originalFixtures = await Promise.all(
    fixturePaths.map(async (fixturePath) => {
      try {
        return { fixturePath, source: await readFile(fixturePath) };
      } catch (error) {
        if (error.code === "ENOENT") {
          return { fixturePath, source: null };
        }
        throw error;
      }
    })
  );
  try {
    await Promise.all([
      writeFile(fixturePaths[0], fixture("Release Notes")),
      writeFile(fixturePaths[1], fixture("Release Notes With Punctuation")),
    ]);
    const child = spawn(
      process.execPath,
      [
        "--experimental-strip-types",
        "--input-type=module",
        "-e",
        `
          import { getBlogPosts, getPost, postPath } from "./src/data/blog.ts";
          const mixedCase = await getPost("ReleaseNotes");
          const reserved = await getPost("Release?Notes");
          const posts = await getBlogPosts();
          const traversal = await getPost("../README");
          if (
            !mixedCase ||
            mixedCase.slug !== "ReleaseNotes" ||
            !reserved ||
            reserved.slug !== "Release?Notes" ||
            !posts.some((item) => item.slug === "Release?Notes") ||
            postPath("Release?Notes") !== "/blog/Release%3FNotes" ||
            traversal !== null
          ) {
            process.exitCode = 1;
          }
        `,
      ],
      { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"] }
    );
    let output = "";
    child.stdout.setEncoding("utf-8").on("data", (chunk) => (output += chunk));
    child.stderr.setEncoding("utf-8").on("data", (chunk) => (output += chunk));
    const [code] = await once(child, "exit");
    assert.equal(code, 0, output);
  } finally {
    await Promise.all(
      originalFixtures.map(async ({ fixturePath, source }) => {
        if (source === null) {
          await unlink(fixturePath).catch((error) => {
            if (error.code !== "ENOENT") {
              throw error;
            }
          });
          return;
        }
        await writeFile(fixturePath, source);
      })
    );
  }
});
