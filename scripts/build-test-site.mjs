import { spawnSync } from "node:child_process";
import { readFile, unlink, writeFile } from "node:fs/promises";

// Build the escaping regression fixture before testing the static production site.
const filename = new URL(
  "../content/seo-jsonld-escape-fixture.mdx",
  import.meta.url
);
let previous;
try {
  previous = await readFile(filename);
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}
try {
  await writeFile(
    filename,
    `---\ntitle: '</script><script>window.seoInjection=true</script>'\npublishedAt: "2026-10-15"\nsummary: "Escaping regression fixture"\n---\n\nA temporary test article.\n`
  );
  const result = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
  if (result.error) {
    throw result.error;
  }
  process.exitCode = result.status ?? 1;
} finally {
  await (previous ? writeFile(filename, previous) : unlink(filename));
}
