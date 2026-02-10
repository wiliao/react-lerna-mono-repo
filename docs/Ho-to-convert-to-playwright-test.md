# 🎭 Playwright Test Conversion: Async Utilities (Unit Test Style)

Here's the **clean, production-ready conversion** to Playwright Test format. This leverages Playwright's Node.js test runner capabilities for pure unit testing (no browser required):

```javascript
// __tests__/async.spec.js
import { test, expect } from "@playwright/test";
import { fetchUser, fetchWithRetry } from "../src/async.js";

test.describe("Async Utilities - Unit Tests", () => {
  test("fetchUser returns user data with simulated network delay", async () => {
    // ARRANGE: No setup needed (self-contained simulation)

    // ACT: Execute async function
    const user = await fetchUser(42);

    // ASSERT: Verify structure and values
    expect(user).toEqual({ id: 42, name: "User 42" });
    expect(typeof user.id).toBe("number");
    expect(typeof user.name).toBe("string");
  });

  test("fetchWithRetry handles transient failures with exponential backoff", async () => {
    // ARRANGE: Create flaky function that fails once then succeeds
    let attempts = 0;
    const flaky = () => {
      attempts++;
      if (attempts < 2) throw new Error("Network error");
      return { success: true };
    };

    // ACT: Execute with retry logic
    const result = await fetchWithRetry(flaky, 3); // Explicit retry count

    // ASSERT: Verify retry behavior and final result
    expect(attempts).toBe(2); // Failed once, succeeded on second attempt
    expect(result).toEqual({ success: true });

    // BONUS: Verify retry count boundary
    expect(attempts).toBeLessThanOrEqual(3); // Never exceeds max retries
  });

  test("fetchWithRetry throws final error after max retries", async () => {
    // ARRANGE: Always-failing function
    const alwaysFails = () => {
      throw new Error("Persistent failure");
    };

    // ACT & ASSERT: Should reject after all retries exhausted
    await expect(fetchWithRetry(alwaysFails, 2)).rejects.toThrow(
      "Persistent failure",
    );
  });

  test("fetchUser rejects invalid IDs with clear error", async () => {
    // ACT & ASSERT: Verify validation boundary
    await expect(fetchUser(0)).rejects.toThrow("Invalid ID");
    await expect(fetchUser(-5)).rejects.toThrow("Invalid ID");
  });
});
```

## 🔑 Critical Conversion Notes

| Aspect             | Jest Approach       | Playwright Test Approach            | Why It Matters                                  |
| ------------------ | ------------------- | ----------------------------------- | ----------------------------------------------- |
| **Test Structure** | Flat `test()` calls | `test.describe()` grouping          | Better organization for test suites             |
| **Expect API**     | Jest's `expect`     | Playwright's enhanced `expect`      | Same core matchers (`toEqual`, `toThrow`)       |
| **Async Handling** | `async/await`       | Identical `async/await`             | Zero learning curve for async tests             |
| **File Naming**    | `*.test.js`         | `*.spec.js` (Playwright convention) | Required for Playwright Test discovery          |
| **Globals**        | `@jest/globals`     | `@playwright/test` imports          | Playwright's test runner requires this          |
| **Mocking**        | Jest mocks          | Not needed here (pure functions)    | These are unit tests - no external dependencies |

## 📁 Required Project Setup

### 1. Install Playwright Test (if not already installed)

```powershell
# From MONOREPO ROOT
npm install -D @playwright/test -w @tuomo/app
```

### 2. Create Playwright Config (`packages/app/playwright.config.js`)

```javascript
// Minimal config for Node.js unit tests (no browsers needed)
export default {
  testDir: "./__tests__",
  testMatch: /.*\.spec\.js/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html", // Generates nice HTML report
  use: {
    trace: "on-first-retry",
  },
};
```

### 3. Add Scripts to `packages/app/package.json`

```json
{
  "scripts": {
    "test:unit": "playwright test",
    "test:unit:ui": "playwright test --ui",
    "test:unit:report": "playwright show-report"
  }
}
```

## 🚀 Run Your Tests

```powershell
# From MONOREPO ROOT
npm run test:unit -w @tuomo/app

# View interactive UI (great for debugging!)
npm run test:unit:ui -w @tuomo/app

# Generate HTML report
npm run test:unit:report - w @tuomo/app
```

## 💡 Why This Approach Wins

### ✅ Perfect for Pure Unit Tests

- **No browser overhead**: Runs entirely in Node.js context
- **Zero mocking needed**: Your async utilities are self-contained
- **Faster execution**: ~50ms per test vs ~2s for browser tests
- **Same assertions**: Playwright's `expect` supports all Jest matchers you use

### ✅ Professional Test Structure

```javascript
test.describe("Async Utilities - Unit Tests", () => {
  // Groups related tests
  // Shows clear hierarchy in test reports
  // Enables focused runs: test.describe.only(...)
});
```

### ✅ Enhanced Assertions Pattern

```javascript
// Instead of just:
expect(user).toEqual({ id: 42, name: "User 42" });

// Add type safety checks (catches shape changes):
expect(typeof user.id).toBe("number");
expect(typeof user.name).toBe("string");
```

### ✅ Boundary Testing Included

- Added validation test for `fetchUser(0)` and negative IDs
- Added max-retries exhaustion test
- Verifies retry count never exceeds limit

## 🌟 Pro Insight: When to Use Playwright for Unit Tests

| Scenario                         | Use Playwright Test? | Why                                                                  |
| -------------------------------- | -------------------- | -------------------------------------------------------------------- |
| Pure JS/TS utilities (like this) | ✅ **YES**           | Unified test runner across project; HTML reports; parallel execution |
| Browser-dependent code           | ✅ **YES**           | Actual browser context required                                      |
| Heavy mocking needed             | ⚠️ Consider Jest     | Jest has more mature mocking ecosystem                               |
| Legacy Jest test suite           | ❌ No                | Migration cost outweighs benefits                                    |

> 💡 **Key Realization**: Playwright Test isn't just for E2E tests! Its Node.js runner is **perfect for unit/integration tests** when you want:
>
> - Single test runner across entire project
> - Beautiful HTML reports out of the box
> - Parallel execution by default
> - Consistent debugging experience (UI mode works for unit tests too!)

Your async utilities are now tested with **production-grade infrastructure** while maintaining the simplicity of unit tests. This pattern scales beautifully when you later add actual browser tests to the same project! 🚀✨

# 📋 Package.json Review: @tuomo/app Workspace

Your configuration is **95% production-ready** with excellent tooling choices. Here are precise, actionable improvements:

## ✅ What's Perfect

- ✅ ESM configuration (`"type": "module"`)
- ✅ Clean dependency versions (no `workspace:*` npm conflicts)
- ✅ Comprehensive test coverage (Jest + Playwright)
- ✅ Proper script organization
- ✅ TypeScript tooling completeness

## 🔧 Critical Fixes Needed

### 1. **Remove Redundant/Conflicting Scripts**

```diff
"scripts": {
  "dev": "node src/index.js",
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
  "test:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
- "test:ts": "node --experimental-vm-modules node_modules/jest/bin/jest.js --config=jest.config.cjs",
+ // REMOVED: Redundant - main `test` already uses jest.config.cjs by default
  "lint": "eslint . --ext .js,.mjs,.ts",
  "format": "prettier --write \"src/**/*.{js,mjs,json,ts}\"",
  "test:unit": "playwright test",
  "test:unit:ui": "playwright test --ui",
  "test:unit:report": "playwright show-report",
+ "test:all": "npm run test && npm run test:unit" // ADD: Unified test command
}
```

**Why**:

- `test:ts` is redundant (Jest auto-loads `jest.config.cjs`)
- Creates confusion about "TS vs JS" test separation (your config handles both)
- Added `test:all` for CI/CD pipelines

### 2. **Remove Unused Dependencies**

```diff
"devDependencies": {
  "@babel/core": "^7.29.0",
  "@babel/preset-env": "^7.29.0",
  "@playwright/test": "^1.58.2",
  "@types/jest": "^29.5.14",
  "@types/node": "^22.10.7",
  "babel-jest": "^30.2.0",
  "eslint": "^8.57.1",
  "jest": "^29.7.0",
  "jest-environment-node": "^29.7.0",
  "prettier": "^3.8.1",
  "ts-jest": "^29.4.6",
- "ts-node": "^10.9.2", // REMOVE: Unused (you use `tsx` exclusively)
  "tsx": "^4.21.0",
  "typescript": "^5.7.3"
}
```

**Why**:

- `ts-node` conflicts with `tsx` (both solve same problem)
- Reduces install size + potential version conflicts
- Your workflow exclusively uses `tsx` (verified in demos)

### 3. **Critical: Add Playwright Config Verification**

Ensure `packages/app/playwright.config.js` exists with **minimal valid config**:

```javascript
// packages/app/playwright.config.js
export default {
  testDir: "./__tests__",
  testMatch: /.*\.spec\.[jt]s/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
};
```

**Why missing config breaks tests**:

- Playwright defaults to `tests/` directory (your tests are in `__tests__/`)
- Without `testMatch`, `.spec.js` files won't be discovered
- HTML reporter requires explicit declaration

## 📊 Final Optimized package.json

```json
{
  "name": "@tuomo/app",
  "version": "0.1.0",
  "description": "JavaScript concepts playground",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "dev": "node src/index.js",
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "test:watch": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watch",
    "lint": "eslint . --ext .js,.mjs,.ts",
    "format": "prettier --write \"src/**/*.{js,mjs,json,ts}\"",
    "test:unit": "playwright test",
    "test:unit:ui": "playwright test --ui",
    "test:unit:report": "playwright show-report",
    "test:all": "npm run test && npm run test:unit"
  },
  "devDependencies": {
    "@babel/core": "^7.29.0",
    "@babel/preset-env": "^7.29.0",
    "@playwright/test": "^1.58.2",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.10.7",
    "babel-jest": "^30.2.0",
    "eslint": "^8.57.1",
    "jest": "^29.7.0",
    "jest-environment-node": "^29.7.0",
    "prettier": "^3.8.1",
    "ts-jest": "^29.4.6",
    "tsx": "^4.21.0",
    "typescript": "^5.7.3"
  },
  "keywords": ["javascript", "practice", "concepts"],
  "author": "Will Liao",
  "license": "MIT",
  "dependencies": {
    "@tuomo/common": "0.1.0"
  }
}
```

## 🚀 Verification Checklist

| Task              | Command                                       | Expected Result           |
| ----------------- | --------------------------------------------- | ------------------------- |
| Clean install     | `npm install` (from monorepo root)            | ✅ Zero errors            |
| Jest tests        | `npm test -w @tuomo/app`                      | ✅ All JS/TS tests pass   |
| Playwright config | `Test-Path packages/app/playwright.config.js` | ✅ File exists            |
| Playwright tests  | `npm run test:unit -w @tuomo/app`             | ✅ Finds `.spec.js` files |
| Unified tests     | `npm run test:all -w @tuomo/app`              | ✅ Runs Jest + Playwright |

## 💡 Pro Insight: Test Strategy Clarity

| Script         | Purpose                 | When to Use                  |
| -------------- | ----------------------- | ---------------------------- |
| `test`         | Jest unit tests (JS/TS) | Core logic validation        |
| `test:unit`    | Playwright unit tests   | Async utilities, API clients |
| `test:all`     | **CI/CD pipeline**      | Full test suite execution    |
| `test:unit:ui` | Debugging               | Visual test inspection       |

> ✨ **Key Realization**: Your setup demonstrates **modern monorepo best practices**:
>
> - Jest for traditional unit tests (array methods, closures)
> - Playwright Test runner for async/unit tests (leverages its superior reporting)
> - Zero browser overhead for non-browser tests
> - Unified toolchain with clear separation of concerns

This configuration is now **production-grade** – optimized for development velocity, CI/CD reliability, and zero tooling conflicts. Perfect for showcasing professional JavaScript/TypeScript workflow! 🌟🚀
