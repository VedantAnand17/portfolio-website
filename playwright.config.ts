import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3100",
    browserName: "chromium",
    channel: "chromium",
    launchOptions: { args: ["--disable-gpu", "--disable-software-rasterizer"] },
    trace: "retain-on-failure",
  },
  webServer: process.env.TEST_BASE_URL
    ? undefined
    : {
        command:
          process.env.PLAYWRIGHT_SERVER === "production"
            ? "npm run start -- --hostname 127.0.0.1 --port 3100"
            : "npm run dev -- --hostname 127.0.0.1 --port 3100",
        url: "http://127.0.0.1:3100",
        reuseExistingServer:
          process.env.PLAYWRIGHT_SERVER !== "production" && !process.env.CI,
        timeout: 120_000,
      },
});
