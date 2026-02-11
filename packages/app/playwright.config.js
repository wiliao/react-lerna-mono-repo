// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for E2E browser tests and API tests
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.@(js|ts)",

  // Execution
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30000,

  // CI/CD
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // Reporting - ✅ FIXED
  reporter: process.env.CI
    ? [["html", { outputFolder: "playwright-report" }], ["list"], ["github"]]
    : [["html", { outputFolder: "playwright-report" }], ["list"]],

  // Output
  outputDir: "test-results",

  // Shared settings for all projects
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: process.env.CI ? "retain-on-failure" : "off",
  },

  // Test projects
  projects: [
    {
      name: "api",
      testMatch: "**/api/**/*.spec.@(js|ts)",
      use: {
        baseURL: process.env.API_URL || "http://localhost:3000/api",
      },
    },
    {
      name: "chromium",
      testMatch: "**/e2e/**/*.spec.@(js|ts)",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testMatch: "**/e2e/**/*.spec.@(js|ts)",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testMatch: "**/e2e/**/*.spec.@(js|ts)",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
