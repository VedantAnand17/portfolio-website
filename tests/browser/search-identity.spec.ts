import { unlink, writeFile } from "node:fs/promises";

import { expect, test } from "@playwright/test";

// A browser must visit its routes and links in sequence.
/* oxlint-disable no-await-in-loop */

test("homepage identifies Vedant Anand and connects visitors to his biography", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hi, I'm Vedant Anand 👋"
  );
  await expect(page).toHaveTitle(
    "Vedant Anand | x402 Maintainer & Agentic Commerce Builder"
  );
  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute("content", /x402.*maintainer/i);
  await expect(description).toHaveAttribute("content", /Bags/);
  await expect(description).toHaveAttribute("content", /Google Summer of Code/);
  const descriptionText = await description.getAttribute("content");
  expect(descriptionText?.length).toBeLessThanOrEqual(180);
  await page
    .getByRole("link", { name: "About Vedant Anand", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Vedant Anand"
  );
});

test("author biography is readable without JavaScript and links one coherent person", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 320, height: 812 },
  });
  const page = await context.newPage();
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Vedant Anand"
  );
  await expect(
    page.getByText(/x402 contributor and maintainer/).first()
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Google Summer of Code mentorship" })
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.vedant-dev.com/about"
  );
  const graph = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts.flatMap((script) => {
        const data = JSON.parse(script.textContent || "{}");
        return data["@graph"] || [data];
      })
    );
  const person = graph.find((node) => node["@type"] === "Person");
  expect(person["@id"]).toBe("https://www.vedant-dev.com/#person");
  expect(person.name).toBe("Vedant Anand");
  expect(person.sameAs).toEqual(
    expect.arrayContaining([
      "https://github.com/vedantanand17",
      "https://linkedin.com/in/vedantanand17",
      "https://x.com/vedantsx",
    ])
  );
  expect(person.alternateName).toEqual(
    expect.arrayContaining(["Vedant", "VedantAnand17", "vedantsx"])
  );
  const profile = graph.find((node) => node["@type"] === "ProfilePage");
  expect(profile.mainEntity["@id"]).toBe(person["@id"]);
  expect(profile.mainEntity.name).toBe(person.name);
  expect(profile.isPartOf["@id"]).toBe("https://www.vedant-dev.com/#website");
  for (const url of person.sameAs) {
    await expect(page.locator(`main a[href="${url}"]`)).toBeVisible();
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(320);
  await context.close();
});

test("articles credit the same author and keep JSON-LD inert", async ({
  page,
}) => {
  await page.goto("/blog/uniswap-guide");
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "Vedant Anand", exact: true })
  ).toHaveAttribute("href", "/about");
  const article = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent || "{}"))
        .find((data) => data["@type"] === "BlogPosting")
    );
  expect(article.author["@id"]).toBe("https://www.vedant-dev.com/#person");
  expect(article.author.url).toBe("https://www.vedant-dev.com/about");
  expect(article.publisher["@id"]).toBe(article.author["@id"]);
  expect(article.mainEntityOfPage["@id"]).toBe(
    "https://www.vedant-dev.com/blog/uniswap-guide"
  );
  expect(article.dateModified).toBe("2026-10-08");
  await expect(page.locator('meta[property="article:author"]')).toHaveAttribute(
    "content",
    "https://www.vedant-dev.com/about"
  );
});

test("article JSON-LD keeps a script-like headline inert", async ({ page }) => {
  const slug = "seo-jsonld-escape-fixture";
  const filename = new URL(`../../content/${slug}.mdx`, import.meta.url);
  const title = "</script><script>window.seoInjection=true</script>";
  await writeFile(
    filename,
    `---\ntitle: '${title}'\npublishedAt: "2026-10-15"\nsummary: "Escaping regression fixture"\n---\n\nA temporary test article.\n`
  );
  try {
    await page.goto(`/blog/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    expect(await page.evaluate(() => "seoInjection" in window)).toBe(false);
    const headline = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll(
        (scripts) =>
          scripts
            .map((script) => JSON.parse(script.textContent || "{}"))
            .find((data) => data["@type"] === "BlogPosting")?.headline
      );
    expect(headline).toBe(title);
  } finally {
    await unlink(filename);
  }
});

test("discovery files publish consistent identity and truthful sitemap dates", async ({
  request,
  page,
}) => {
  const llms = await request.get("/llms.txt");
  const alias = await request.get("/.well-known/llms.txt");
  expect(llms.status()).toBe(200);
  expect(alias.status()).toBe(200);
  const text = await llms.text();
  expect(text).toContain("x402 contributor and maintainer");
  expect(text).toContain("https://www.vedant-dev.com/about");
  expect(text).toContain("Google Summer of Code 2026");
  expect(await alias.text()).toBe(text);
  expect(text).not.toMatch(/100,000|AI training|rank.*first/i);

  const response = await request.get("/sitemap.xml");
  const entries = await page.evaluate(
    (xml) => {
      const document = new DOMParser().parseFromString(xml, "application/xml");
      return [...document.querySelectorAll("url")].map((url) => ({
        loc: url.querySelector("loc")?.textContent,
        date: url.querySelector("lastmod")?.textContent,
      }));
    },
    await response.text()
  );
  expect(
    entries.find((entry) => entry.loc === "https://www.vedant-dev.com/about")
      ?.date
  ).toMatch(/^2026-10-15/);
  expect(
    entries.find((entry) => entry.loc === "https://www.vedant-dev.com")?.date
  ).toMatch(/^2026-10-15T00:00:00/);
  expect(
    entries.find(
      (entry) => entry.loc === "https://www.vedant-dev.com/blog/uniswap-guide"
    )?.date
  ).toMatch(/^2026-10-08/);
  for (const entry of entries) {
    expect(entry.loc).toMatch(/^https:\/\/www\.vedant-dev\.com/);
    const entryResponse = await request.get(new URL(entry.loc || "").pathname);
    expect(entryResponse.status()).toBe(200);
  }
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    "Sitemap: https://www.vedant-dev.com/sitemap.xml"
  );
});

test("x402 article exposes original contribution evidence with its author", async ({
  page,
}) => {
  await page.goto("/blog");
  await page
    .getByRole("link", {
      name: /Building payment APIs for AI agents with x402/,
    })
    .click();
  await expect(page).toHaveURL(/\/blog\/x402-agentic-commerce$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Building payment APIs for AI agents with x402"
  );
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "Vedant Anand", exact: true })
  ).toHaveAttribute("href", "/about");
  await expect(
    page.locator(
      'article a[href="https://github.com/x402-foundation/x402/pull/3051"]'
    )
  ).toBeVisible();
  await expect(
    page.locator('article a[href="https://www.getbags.app/"]')
  ).toBeVisible();
});

test("social previews and humans file identify current professional roles", async ({
  request,
  page,
}) => {
  const humans = await request.get("/humans.txt");
  expect(await humans.text()).toContain("x402 contributor and maintainer");
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  for (const route of ["/", "/about", "/blog", "/blog/x402-agentic-commerce"]) {
    await page.goto(route);
    await expect(
      page.locator('meta[property="og:image"]').first()
    ).toHaveAttribute(
      "content",
      /https:\/\/www\.vedant-dev\.com\/opengraph-image/
    );
    await expect(
      page.locator('meta[name="twitter:image"]').first()
    ).toHaveAttribute(
      "content",
      /https:\/\/www\.vedant-dev\.com\/opengraph-image/
    );
  }
});
