import { expect, test } from "@playwright/test";

test("missing articles return a useful 404 for visitors and crawlers", async ({
  request,
  page,
}) => {
  const response = await request.get("/blog/does-not-exist");
  expect(response.status()).toBe(404);
  const malformed = await request.get("/blog/%00");
  expect(malformed.status()).toBe(404);
  const longSlug = await request.get(`/blog/${"a".repeat(260)}`);
  expect(longSlug.status()).toBe(404);
  await page.goto("/blog/does-not-exist");
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" })
  ).toBeVisible();
  await expect(
    page.getByRole("main").getByRole("link", { name: "Read the blog" })
  ).toHaveAttribute("href", "/blog");
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]')
  ).toHaveAttribute("content", /noindex/);
});

test("home content works without JavaScript and fits a narrow screen", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 320, height: 740 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hi, I'm Vedant 👋"
  );
  await expect(
    page.getByText("Available for contract and part-time work.", {
      exact: true,
    })
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Email me", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Get in Touch", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" })
  ).toBeVisible();
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await skipLink.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(320);
  await expect(
    page.getByRole("link", { name: "View work", exact: true })
  ).toHaveAttribute("href", "#projects");
  await context.close();
});

test("experience details support Space and preserve company links", async ({
  page,
}) => {
  await page.goto("/");
  const details = page.getByRole("button", {
    name: "Details for Timelock Protocol",
    exact: true,
  });
  await expect(details).toHaveAttribute("aria-expanded", "false");
  await details.focus();
  await page.keyboard.press("Space");
  await expect(details).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText(
      "Developed Solidity contracts for a DeFi options protocol.",
      { exact: true }
    )
  ).toBeVisible();
  await page.keyboard.press("Space");
  await expect(details).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByText(
      "Developed Solidity contracts for a DeFi options protocol.",
      { exact: true }
    )
  ).toBeHidden();
  await expect(
    page
      .locator("#work")
      .getByRole("link", { name: "Timelock Protocol", exact: true })
  ).toHaveAttribute("href", "https://timelock.trade");
});

test("work experience badges are visible in rendered output", async ({
  page,
}) => {
  await page.goto("/");
  const work = page.locator("#work");
  await expect(work.getByText("Mentor", { exact: true })).toHaveCount(2);
  await expect(work.getByText("x402", { exact: true })).toHaveCount(1);
  await expect(work.getByText("DeFi", { exact: true })).toHaveCount(1);
  await expect(work.getByText("Founder", { exact: true })).toHaveCount(1);
});

test("project actions are readable touch targets with project-specific names", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const action = page
    .locator("#projects")
    .getByRole("link", { name: "Source for AgentPay", exact: true });
  await expect(action).toBeVisible();
  const box = await action.boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
  expect(
    await action.evaluate((el) =>
      Number(getComputedStyle(el).fontSize.replace("px", ""))
    )
  ).toBeGreaterThanOrEqual(14);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(375);
});

test("project previews show full centered images in a consistent frame", async ({
  page,
}) => {
  await page.goto("/");
  const images = page.locator("#projects img");
  await expect(images).toHaveCount(5);
  const previews = await images.evaluateAll((elements) =>
    elements.map((image) => {
      const box = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      return {
        ratio: box.width / box.height,
        fit: style.objectFit,
        position: style.objectPosition,
      };
    })
  );
  for (const preview of previews) {
    expect(preview.ratio).toBeCloseTo(16 / 9, 1);
    expect(preview.fit).toBe("contain");
    expect(preview.position).toBe("50% 50%");
  }
});

test("project summaries stay compact and keep all contribution links", async ({
  page,
}) => {
  await page.goto("/");
  const projects = page.locator("#projects");
  const cards = projects.locator(".border").filter({ has: page.locator("h3") });
  const summaries = await cards.locator(".prose").allTextContents();
  for (const summary of summaries) {
    expect(summary.trim().split(/\s+/).length).toBeLessThanOrEqual(35);
  }
  await Promise.all(
    [3051, 2344, 2278, 731].map(async (number) => {
      const link = projects.locator(
        `a[href="https://github.com/x402-foundation/x402/pull/${number}"]`
      );
      await expect(link).toHaveText(`PR #${number}`);
      await expect(link).toHaveAccessibleName(
        new RegExp(`PR #${number}.*for x402`)
      );
    })
  );
  const firstRow = await cards.evaluateAll((elements) =>
    elements.slice(0, 2).map((card) => card.getBoundingClientRect().height)
  );
  for (const height of firstRow) {
    expect(height).toBeLessThan(560);
  }
  const dates = await cards.evaluateAll((elements) =>
    elements.slice(0, 2).map((card) => {
      const date = card.querySelector("h3 + p");
      if (!date) {
        throw new Error("Project date is missing");
      }
      return date.getBoundingClientRect().top;
    })
  );
  expect(Math.abs(dates[0] - dates[1])).toBeLessThan(1);
});

test("blog pages have summaries, one main title, and valid social images", async ({
  page,
  request,
}) => {
  await page.goto("/blog");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.vedant-dev.com/blog"
  );
  await expect(page.getByText(/min read/).first()).toBeVisible();
  await expect(page.getByText(/fee model, version differences/)).toBeVisible();
  await page.getByRole("link", { name: /Understanding Uniswap/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Uniswap oracle guide", exact: true })
  ).toHaveAttribute(
    "href",
    "https://developers.uniswap.org/docs/sdks/v3/guides/price-oracle"
  );
  await expect(
    page.locator('meta[property="article:modified_time"]')
  ).toHaveAttribute("content", "2026-10-08");
  const images = await page
    .locator('meta[property="og:image"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("content")));
  expect(images.length).toBeGreaterThan(0);
  await Promise.all(
    [...new Set(images)].map(async (image) => {
      const response = await request.get(
        new URL(image || "http://invalid.local/").pathname
      );
      expect(response.status()).toBe(200);
    })
  );
});

test("article and listing dates stay absolute in public output", async ({
  page,
}) => {
  await page.goto("/blog");
  await expect(page.locator('time[datetime="2026-01-29"]')).toHaveText(
    "29 January 2026"
  );
  await expect(page.locator('time[datetime="2025-07-12"]')).toHaveText(
    "12 July 2025"
  );

  await page.goto("/blog/uniswap-guide");
  await expect(page.locator('time[datetime="2025-07-12"]')).toHaveText(
    "12 July 2025"
  );
  await expect(page.locator('time[datetime="2026-10-08"]')).toHaveText(
    "8 October 2026"
  );
});

test("public metadata and navigation use current semantics", async ({
  page,
  request,
}) => {
  const security = await request.get("/.well-known/security.txt");
  expect(await security.text()).toContain(
    "Canonical: https://www.vedant-dev.com/.well-known/security.txt"
  );

  const sitemap = await request.get("/sitemap.xml");
  const sitemapUrls = await page.evaluate(
    async (xml) => {
      const document = new DOMParser().parseFromString(xml, "application/xml");
      return [...document.querySelectorAll("url")].map((url) => ({
        lastmod: url.querySelector("lastmod")?.textContent,
        loc: url.querySelector("loc")?.textContent,
      }));
    },
    await sitemap.text()
  );
  expect(
    sitemapUrls.find(
      ({ loc }) =>
        loc === "https://www.vedant-dev.com/blog/concentrated-liquidity"
    )?.lastmod
  ).toMatch(/^2026-10-08/);

  await page.goto("/#contact");
  const navigation = page.getByRole("navigation", {
    name: "Main navigation",
  });
  await expect(
    navigation.getByRole("link", { name: "Contact" })
  ).toHaveAttribute("aria-current", "location");
  await page.goto("/blog");
  await expect(navigation.getByRole("link", { name: "Blog" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  await page.goto("/blog/uniswap-guide");
  await expect(navigation.getByRole("link", { name: "Blog" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  await page.goto("/blogger");
  await expect(
    navigation.getByRole("link", { name: "Blog" })
  ).not.toHaveAttribute("aria-current", "page");
});

test("published swap example computes fees and rejects invalid inputs", async ({
  page,
}) => {
  await page.goto("/blog/uniswap-guide");
  const example = page.locator("pre").filter({ hasText: "function quoteV2" });
  await expect(example).toHaveCount(1);
  const code = await example.locator("code").textContent();
  const results = await page.evaluate((source) => {
    // Execute the complete published example, including its declarations.
    // oxlint-disable-next-line no-new-func
    const run = new Function(
      `${source}; return { quoteV2, minimumOutput, deadlineSeconds };`
    );
    const { quoteV2, minimumOutput, deadlineSeconds } = run();
    let invalidRejected = false;
    try {
      quoteV2(0n, 1000n, 2000n);
    } catch {
      invalidRejected = true;
    }
    return {
      output: String(
        quoteV2(
          1_000_000_000_000_000_000n,
          1_000_000_000_000_000_000_000n,
          2_000_000_000_000n
        )
      ),
      minimum: String(minimumOutput(2_000_000_000n, 50n)),
      deadline: deadlineSeconds(1_700_000_000_000),
      invalidRejected,
    };
  }, code);
  expect(results).toEqual({
    output: "1992013962",
    minimum: "1990000000",
    deadline: 1_700_001_800,
    invalidRejected: true,
  });
});

test("article images load with dimensions and a mobile source", async ({
  page,
  request,
}) => {
  await page.goto("/blog/concentrated-liquidity");
  const image = page.locator("article img");
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveAttribute("width", /\d+/);
  await expect(image).toHaveAttribute("height", /\d+/);
  await expect(image).toHaveAttribute("srcset", /480w/);
  const src = await image.getAttribute("src");
  expect(src).toBeTruthy();
  const response = await request.get(src || "/missing-image");
  expect(response.status()).toBe(200);
  const body = await response.body();
  expect(body.length).toBeLessThan(180_000);
});

test("code follows the selected theme and contact links have readable contrast", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/blog/uniswap-guide");
  const code = page.locator("pre code span[style]").first();
  const light = await code.evaluate((el) => getComputedStyle(el).color);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  const dark = await code.evaluate((el) => getComputedStyle(el).color);
  expect(dark).not.toBe(light);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(code).toHaveCSS("color", light);
  await page.goto("/#contact");
  const ratio = await page
    .locator("#contact a")
    .first()
    .evaluate((el) => {
      // Browser callbacks are serialized; keep this helper in the browser context.
      // oxlint-disable-next-line unicorn/consistent-function-scoping
      function luminance(rgb: string) {
        const channels = (rgb.match(/\d+/g) ?? [])
          .slice(0, 3)
          .map(Number)
          .map((value) => {
            const c = value / 255;
            return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
        return (
          channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
        );
      }
      const foreground = luminance(getComputedStyle(el).color);
      const background = luminance(
        getComputedStyle(document.body).backgroundColor
      );
      return (
        (Math.max(foreground, background) + 0.05) /
        (Math.min(foreground, background) + 0.05)
      );
    });
  expect(ratio).toBeGreaterThanOrEqual(4.5);
  expect(
    await page.locator("body").evaluate((el) => getComputedStyle(el).cursor)
  ).not.toBe("none");
});

test("domain aliases redirect to the canonical URL and keep the path", async ({
  request,
}) => {
  const response = await request.get("/blog?from=alias", {
    headers: { Host: "v3dant.com" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe(
    "https://www.vedant-dev.com/blog?from=alias"
  );
});

test("domain alias homepages redirect without a literal path placeholder", async ({
  request,
}) => {
  await Promise.all(
    ["v3dant.com", "www.v3dant.com", "vedant-dev.com"].map(async (host) => {
      const response = await request.get("/?from=alias", {
        headers: { Host: host },
        maxRedirects: 0,
      });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(
        "https://www.vedant-dev.com/?from=alias"
      );
    })
  );
});

test("public profile files use the corrected project facts", async ({
  request,
}) => {
  await Promise.all(
    ["/llms.txt", "/.well-known/llms.txt", "/humans.txt"].map(async (route) => {
      const response = await request.get(route);
      expect(response.status()).toBe(200);
      const text = await response.text();
      expect(text).not.toMatch(
        /100,000|quantum-secured|500\+|900,000|maximizes LP yields/
      );
      expect(text).toContain("four merged pull requests");
    })
  );
});

// One browser page must navigate sequentially to test route and theme changes.
/* oxlint-disable no-await-in-loop */
test("every public page fits mobile widths in both themes", async ({
  page,
}) => {
  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 812 });
    for (const route of [
      "/",
      "/blog",
      "/blog/uniswap-guide",
      "/blog/concentrated-liquidity",
      "/blog/missing",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${route} at ${width}px`
      ).toBeLessThanOrEqual(width);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(width);
      await page.getByRole("button", { name: "Switch to light theme" }).click();
    }
  }
});

/* oxlint-enable no-await-in-loop */

test("canonical host serves the site without an alias loop", async ({
  request,
}) => {
  const response = await request.get("/blog", {
    headers: { Host: "www.vedant-dev.com" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(200);
});

// Images load lazily as this one page scrolls.
/* oxlint-disable no-await-in-loop */
test("home and article images show their content", async ({ page }) => {
  await page.goto("/");
  const images = page.locator("#hero img, #projects img");
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((el) => (el as HTMLImageElement).naturalWidth)
    ).toBeGreaterThan(0);
  }
  await page.goto("/blog/concentrated-liquidity");
  const banner = page.locator("article img");
  await banner.scrollIntoViewIfNeeded();
  await expect(banner).toHaveJSProperty("complete", true);
  expect(
    await banner.evaluate((el) => (el as HTMLImageElement).naturalWidth)
  ).toBeGreaterThan(0);
});

/* oxlint-enable no-await-in-loop */

test("original greeting and section hierarchy retain the portfolio character", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hi, I'm Vedant 👋"
  );
  await expect(
    page.getByRole("heading", {
      name: "Agentic payments, x402 and DeFi work",
      exact: true,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "I like building things", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Get in Touch", exact: true })
  ).toBeVisible();
});

test("dock magnification and cursor follow motion preferences", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const home = page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Home", exact: true });
  await expect(page.locator('[aria-label="Animated cursor"]')).toBeAttached();
  const initial = await home.boundingBox();
  await home.hover();
  await expect
    .poll(async () => {
      const box = await home.boundingBox();
      return box?.width ?? 0;
    })
    .toBeGreaterThan((initial?.width ?? 44) + 8);
  await page.mouse.move(40, 40);
  await expect(page.locator('[aria-label="Animated cursor"]')).toBeVisible();
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).cursor)
  ).toBe("none");
  await home.hover();
  await expect(page.locator('[aria-label="Animated cursor"]')).toBeHidden();
  expect(await home.evaluate((el) => getComputedStyle(el).cursor)).toBe(
    "pointer"
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(40, 40);
  await expect(page.locator('[aria-label="Animated cursor"]')).toBeHidden();
  await home.hover();
  await expect
    .poll(async () => {
      const box = await home.boundingBox();
      return Math.round(box?.width ?? 0);
    })
    .toBe(44);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.mouse.move(40, 40);
  await expect(page.locator('[aria-label="Animated cursor"]')).toBeHidden();
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).cursor)
  ).not.toBe("none");
});

test("experience rows stay compact and project cards respond to hover", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const row = page
    .locator("#work")
    .getByRole("heading", { name: "Timelock Protocol", exact: true })
    .locator("xpath=../../..");
  const rowBox = await row.boundingBox();
  expect(rowBox?.height).toBeLessThanOrEqual(76);
  const card = page
    .locator("#projects")
    .getByRole("heading", { name: "AgentPay", exact: true })
    .locator("xpath=../../..");
  const before = await card.evaluate((el) => getComputedStyle(el).boxShadow);
  await card.hover();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).boxShadow))
    .not.toBe(before);
});

test("selected X posts keep rich cards and readable fallbacks when widgets are blocked", async ({
  page,
}) => {
  await page.route("**/platform.twitter.com/**", (route) => route.abort());
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "From my Twitter", exact: true })
  ).toBeVisible();
  const posts = page.locator("#posts");
  await expect(
    posts.getByRole("link", { name: "Read post on X", exact: true })
  ).toHaveCount(4);
  await expect(posts.getByText("19 June 2025", { exact: true })).toBeVisible();
  await expect(posts.getByText("22 June 2025", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(320);
});

test("section reveals run when the visitor scrolls into view", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator("#hero").evaluate(async (element) => {
    await Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished)
    );
  });
  const heading = page.getByRole("heading", {
    name: "Agentic payments, x402 and DeFi work",
    exact: true,
  });
  const reveal = heading.locator("xpath=../../..");
  await expect
    .poll(() =>
      reveal.evaluate((element) => Number(getComputedStyle(element).opacity))
    )
    .toBe(0);
  await heading.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      reveal.evaluate((element) => Number(getComputedStyle(element).opacity))
    )
    .toBe(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const contact = page
    .getByRole("heading", { name: "Get in Touch", exact: true })
    .locator("xpath=..");
  expect(
    await contact.evaluate((element) =>
      Number(getComputedStyle(element).opacity)
    )
  ).toBe(1);
});

test("X widgets load once and follow the selected theme", async ({ page }) => {
  let scriptRequests = 0;
  await page.route("**/platform.twitter.com/widgets.js", (route) => {
    scriptRequests += 1;
    return route.fulfill({
      contentType: "application/javascript",
      body: `
      window.twttr = { widgets: { createTweet: async (id, target, options) => {
        const iframe = document.createElement('iframe');
        iframe.title = 'X post ' + id;
        iframe.dataset.theme = options.theme;
        iframe.width = options.width;
        iframe.height = '160';
        iframe.srcdoc = '<p>Embedded post</p>';
        target.append(iframe);
        return iframe;
      } } };
    `,
    });
  });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const frames = page.locator('#posts iframe[title^="X post"]');
  await expect(frames).toHaveCount(4);
  expect(scriptRequests).toBe(1);
  await expect(page.locator("#posts").getByRole("link")).toHaveCount(0);
  await expect(page.getByText(/^Development notes [1-4]$/)).toHaveCount(0);
  await expect(frames.first()).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(frames).toHaveCount(4);
  await expect(frames.first()).toHaveAttribute("data-theme", "dark");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(320);
});
