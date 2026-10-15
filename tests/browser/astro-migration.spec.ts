import { expect, test } from "@playwright/test";

test("static hackathon cards retain their logo images without hydration", async ({
  page,
}) => {
  await page.goto("/");
  const logo = page.locator('#hackathons img[src="/ethglobal.png"]');
  await expect(logo).toHaveCount(1);
  await logo.scrollIntoViewIfNeeded();
  await expect(logo).toHaveJSProperty("complete", true);
  expect(
    await logo.evaluate((image) => (image as HTMLImageElement).naturalWidth)
  ).toBeGreaterThan(0);
});

test("project previews keep responsive sources and bounded image downloads", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const previews = page.locator("#projects img");
  await expect(previews).toHaveCount(5);
  const images = await previews.all();
  await Promise.all(
    images.map(async (image) => {
      await expect(image).toHaveAttribute("srcset", /300w.*600w/);
      const response = await request.get(
        (await image.getAttribute("src")) || "/missing"
      );
      expect(response.status()).toBe(200);
      const body = await response.body();
      expect(body.length).toBeLessThan(180_000);
    })
  );
});

test("theme preferences stay in sync across open pages", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const biography = await context.newPage();
  await biography.goto("/about");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(biography.locator("html")).toHaveClass(/dark/);
  await biography
    .getByRole("button", { name: "Switch to light theme" })
    .click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

test("island buttons wait for hydration instead of accepting inactive clicks", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Switch to dark theme" })
  ).toBeDisabled();
  await expect(
    page.getByRole("button", {
      name: "Details for Timelock Protocol",
      exact: true,
    })
  ).toBeDisabled();
  await context.close();
});
