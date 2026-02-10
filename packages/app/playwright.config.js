// Minimal config for Node.js unit tests
export default {
  testDir: "./tests", // ✅ Point to NEW directory
  testMatch: /.*\.spec\.[jt]s/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
};
