import { expect, test } from "@playwright/test";

test("portfolio loads without requesting Vercel analytics", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Vedant Anand"
  );
  await page.waitForLoadState("networkidle");
  expect(
    requests.filter((url) =>
      /_vercel\/insights|va\.vercel-scripts\.com/.test(url)
    )
  ).toEqual([]);
});

test("v3dant alias identifies the same canonical portfolio", async ({
  page,
  request,
}) => {
  await page.goto("/about");
  await expect(page.getByText(/v3dant.com/)).toBeVisible();
  const website = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .flatMap((script) => {
          const data = JSON.parse(script.textContent || "{}");
          return data["@graph"] || [data];
        })
        .find((node) => node["@type"] === "WebSite")
    );
  expect(website.alternateName).toContain("v3dant.com");
  expect(website.url).toBe("https://www.vedant-dev.com/");
  const llms = await request.get("/llms.txt");
  expect(await llms.text()).toContain("v3dant.com");
});
