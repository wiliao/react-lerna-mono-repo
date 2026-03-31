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
    "^.+\\.jsx?$": "babel-jest", // ✅ Now uses babel.config.cjs
  },

  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["js", "ts", "json", "node"],

  testPathIgnorePatterns: ["/node_modules/", "/tests/"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};
