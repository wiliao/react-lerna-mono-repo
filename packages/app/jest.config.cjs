/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",

  // Transform configuration - handle JS and TS separately
  transform: {
    // TypeScript files: use ts-jest
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "./tsconfig.json",
        diagnostics: {
          warnOnly: true,
          ignoreCodes: [151002], // Suppress hybrid module kind warning
        },
      },
    ],
    // JavaScript files: use babel-jest for ESM compatibility
    "^.+\\.jsx?$": ["babel-jest", { configFile: false }],
  },

  // Handle ESM module resolution (.js imports should resolve to .ts/.js sources)
  moduleNameMapper: {
    "^(\\.\\/.+)\\.js$": "$1",
  },

  // Extensions Jest should resolve
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // Test file patterns
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // Only .ts needs explicit ESM treatment
  extensionsToTreatAsEsm: [".ts"],
};
