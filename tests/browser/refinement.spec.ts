import { expect, test } from "@playwright/test";

test("intro actions have distinct surfaces and comfortable touch targets", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator("#hero");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText(
    "Hi, I'm Vedant 👋"
  );
  const work = hero.getByRole("link", { name: "View work", exact: true });
  const email = hero.getByRole("link", { name: "Email me", exact: true });
  expect(
    await work.evaluate((element) => getComputedStyle(element).backgroundColor)
  ).not.toBe("rgba(0, 0, 0, 0)");
  const boxes = await Promise.all([work.boundingBox(), email.boundingBox()]);
  for (const box of boxes) {
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await expect(email).toHaveAttribute(
    "href",
    "mailto:vedantanand.in@gmail.com"
  );
  await work.click();
  await expect(page).toHaveURL(/#projects$/);
});

test("section and project typography keep a consistent readable hierarchy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const sizes = await page
    .locator("main h2")
    .evaluateAll((elements) =>
      elements.map((element) =>
        Number(getComputedStyle(element).fontSize.replace("px", ""))
      )
    );
  for (const size of sizes) {
    expect(size).toBeLessThanOrEqual(32);
  }
  const titles = await page.locator("#projects h3").evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return (
        Number(style.lineHeight.replace("px", "")) /
        Number(style.fontSize.replace("px", ""))
      );
    })
  );
  for (const ratio of titles) {
    expect(ratio).toBeGreaterThanOrEqual(1.3);
  }
});

test("tooltips wait for intent then appear promptly across navigation", async ({
  page,
}) => {
  await page.goto("/");
  const details = page.getByRole("button", {
    name: "Details for Timelock Protocol",
    exact: true,
  });
  await details.click();
  await expect(details).toHaveAttribute("aria-expanded", "true");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await nav.getByRole("link", { name: "Home", exact: true }).hover();
  await page.waitForTimeout(120);
  await expect(page.getByRole("tooltip")).toBeHidden();
  await expect(page.getByRole("tooltip")).toHaveText("Home");
  await nav.getByRole("link", { name: "Work", exact: true }).hover();
  await expect(page.getByRole("tooltip")).toHaveText("Work", { timeout: 200 });
  const animations = await page
    .getByRole("tooltip")
    .evaluate((element) => element.getAnimations().length);
  expect(animations).toBe(0);
});

test("section entrances stay short and avoid blur rendering", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const timing = await page.locator(".blur-fade").evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        duration: Number(style.animationDuration.replace("s", "")),
        delay: Number(style.animationDelay.replace("s", "")),
        keys: element
          .getAnimations()
          .flatMap(
            (animation) =>
              (animation.effect as KeyframeEffect)?.getKeyframes() || []
          ),
      };
    })
  );
  for (const reveal of timing) {
    expect(reveal.duration).toBeLessThanOrEqual(0.25);
    expect(reveal.delay).toBeLessThanOrEqual(0.08);
    for (const frame of reveal.keys) {
      expect(frame.filter || "none").toBe("none");
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  const states = await page.locator(".blur-fade").evaluateAll((elements) =>
    elements.map((element) => ({
      opacity: getComputedStyle(element).opacity,
      transform: getComputedStyle(element).transform,
      animation: getComputedStyle(element).animationName,
    }))
  );
  for (const state of states) {
    expect(state).toEqual({
      opacity: "1",
      transform: "none",
      animation: "none",
    });
  }
});

test("press feedback is subtle and reduced motion keeps controls still", async ({
  page,
}) => {
  await page.goto("/");
  const action = page
    .locator("#hero")
    .getByRole("link", { name: "View work", exact: true });
  await action.hover();
  await page.mouse.down();
  await expect
    .poll(() =>
      action.evaluate((element) => getComputedStyle(element).transform)
    )
    .not.toBe("none");
  const scale = await action.evaluate(
    (element) => new DOMMatrix(getComputedStyle(element).transform).a
  );
  expect(scale).toBeGreaterThanOrEqual(0.95);
  expect(scale).toBeLessThan(1);
  await page.mouse.move(5, 5);
  await page.mouse.up();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await action.hover();
  await page.mouse.down();
  expect(
    await action.evaluate((element) => getComputedStyle(element).transform)
  ).toBe("none");
  await page.mouse.move(5, 5);
  await page.mouse.up();
});

test("keyboard disclosure reveals readable experience immediately", async ({
  page,
}) => {
  await page.goto("/");
  const details = page.getByRole("button", {
    name: "Details for Timelock Protocol",
    exact: true,
  });
  await details.click();
  await expect(details).toHaveAttribute("aria-expanded", "true");
  await details.click();
  await expect(details).toHaveAttribute("aria-expanded", "false");
  await details.focus();
  await page.keyboard.press("Space");
  await expect(details).toHaveAttribute("aria-expanded", "true");
  const state = await page.evaluate(() => {
    const button = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Details for Timelock Protocol"]'
    );
    const panel = document.querySelector(
      `#${CSS.escape(button?.getAttribute("aria-controls") || "missing")}`
    );
    const content = panel?.querySelector("p");
    return {
      opacity: content && getComputedStyle(content).opacity,
      fullyVisible:
        panel &&
        [panel, ...panel.querySelectorAll("*")].every(
          (element) => getComputedStyle(element).opacity === "1"
        ),
      animations: panel
        ?.getAnimations({ subtree: true })
        .filter((animation) => animation.playState === "running").length,
    };
  });
  expect(state.opacity).toBe("1");
  expect(state.fullyVisible).toBe(true);
  expect(state.animations).toBe(0);
  await page.keyboard.press("Space");
  await expect(details).toHaveAttribute("aria-expanded", "false");
});
