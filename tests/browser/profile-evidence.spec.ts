import { expect, test } from "@playwright/test";

test("biography connects community references to the same person", async ({
  page,
  request,
}) => {
  await page.goto("/about");
  await Promise.all(
    ["https://gsoc.owaspblt.org/", "https://www.owasptiet.com/team"].map(
      async (href) => {
        await expect(
          page.getByRole("main").locator(`a[href="${href}"]`)
        ).toBeVisible();
      }
    )
  );
  const person = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent || "{}"))
        .find((node) => node["@type"] === "Person")
    );
  expect(
    person.subjectOf.map((reference: { url: string }) => reference.url)
  ).toEqual(
    expect.arrayContaining([
      "https://gsoc.owaspblt.org/",
      "https://www.owasptiet.com/team",
    ])
  );
  const llms = await request.get("/llms.txt");
  expect(await llms.text()).toContain("https://gsoc.owaspblt.org/");
});

test("readers can follow the author and his x402 writing between pages", async ({
  page,
}) => {
  await page.goto("/blog");
  await page
    .getByRole("main")
    .getByRole("link", { name: "Vedant Anand", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await page
    .getByRole("link", {
      name: "Building payment APIs for AI agents with x402",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/blog\/x402-agentic-commerce$/);
});

test("homepage gives readers a direct path to original x402 writing", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "How I build payment APIs for AI agents with x402",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/blog\/x402-agentic-commerce$/);
});

test("hackathons lead with the ETHGlobal Mumbai win and its showcase", async ({
  page,
}) => {
  await page.goto("/");
  const hackathons = page.locator("#hackathons");
  const firstEntry = hackathons.locator("li").first();
  await expect(firstEntry).toContainText("ETHGlobal Mumbai 2026 (Winner)");
  await expect(firstEntry).toContainText("GTMmaxing");
  await expect(
    firstEntry.locator(
      'a[href="https://ethglobal.com/showcase/gtmmaxing-com-b61fq"]'
    )
  ).toBeVisible();
});

test("posts section leads with the ETHGlobal Mumbai win tweet", async ({
  page,
}) => {
  await page.goto("/");
  const posts = page.locator("#posts");
  await expect(
    posts.locator('a[href$="/status/2119469968970625032"]').first()
  ).toBeAttached();
  await expect(posts).not.toContainText("from June 2025");
});
