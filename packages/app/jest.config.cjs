/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "./tsconfig.json",
        diagnostics: { warnOnly: true, ignoreCodes: [151002] },
      },
    ],
    "^.+\\.jsx?$": ["babel-jest", { configFile: false }],
  },
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // CRITICAL: Prevent Jest from discovering Playwright tests
  testPathIgnorePatterns: ["/node_modules/", "/tests/"],

  // Test patterns (now safe with ignore pattern above)
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};
