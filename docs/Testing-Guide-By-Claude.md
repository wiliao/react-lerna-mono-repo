# Testing Guide - Lerna Monorepo

## 📁 Project Structure

```
react-lerna-mono-repo-Test-Code-Review/
├── packages/
│   ├── app/
│   │   ├── __tests__/          # Jest unit tests
│   │   │   ├── array-methods.test.js
│   │   │   ├── array-methods.test.ts
│   │   │   ├── async.test.js
│   │   │   ├── closures.test.js
│   │   │   ├── currying.test.js
│   │   │   ├── destructuring.test.js
│   │   │   ├── import.test.js (skipped)
│   │   │   ├── promises.test.js
│   │   │   └── workspace.test.js
│   │   └── tests/              # Playwright E2E/API tests
│   │       ├── api/
│   │       │   └── async.spec.js
│   │       └── e2e/            # Future E2E tests
│   ├── common/                 # No tests yet
│   └── web/                    # No tests yet
└── package.json
```

---

## 🧪 Jest Tests (Unit Tests)

### Run All Jest Tests Across All Packages

```bash
npm run test
```

**Output:**
- ✅ @tuomo/common - placeholder
- ✅ @tuomo/web - placeholder  
- ✅ @tuomo/app - 8 test suites, 25 tests

### Run Only App Package Tests

```bash
npm run test:app
```

Or with Lerna directly:

```bash
npx lerna run test --scope=@tuomo/app
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Only Changed Tests

```bash
cd packages/app
npm run test:changed
```

### Run Tests Without Cache

```bash
npm run test:app:clean
```

Or:

```bash
cd packages/app
npm run test:no-cache
```

### Run Specific Test File

```bash
cd packages/app
npx jest __tests__/array-methods.test.js
```

---

## 🎭 Playwright Tests (E2E/API Tests)

### Run All Playwright Tests

From root:

```bash
npm run test:e2e
```

Or with Lerna:

```bash
npx lerna run test:e2e --scope=@tuomo/app
```

### Run with UI Mode (Recommended for Development)

```bash
cd packages/app
npm run test:e2e:ui
```

Or from root:

```bash
npx lerna run test:e2e:ui --scope=@tuomo/app
```

### Run in Headed Mode (See Browser)

```bash
cd packages/app
npm run test:e2e:headed
```

Or from root:

```bash
npx lerna run test:e2e:headed --scope=@tuomo/app
```

### Run with Debugger

```bash
cd packages/app
npm run test:e2e:debug
```

### Run Specific Browser

```bash
cd packages/app
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit
```

### Run API Tests Only

```bash
cd packages/app
npm run test:e2e:api
```

### Run Specific Test File

```bash
cd packages/app
npx playwright test tests/api/async.spec.js
```

With UI:

```bash
npx playwright test tests/api/async.spec.js --ui
```

### View Test Report

```bash
cd packages/app
npm run test:e2e:report
```

Or:

```bash
npx playwright show-report
```

### Generate Test Code (Record Actions)

```bash
cd packages/app
npm run test:e2e:codegen
```

---

## 🧹 Cleanup Commands

### Clean Test Cache

```bash
npm run clean:cache
```

### Clean Coverage Reports

```bash
npm run clean:coverage
```

### Clean Playwright Reports

```bash
npm run clean:playwright
```

### Clean ESLint Cache

```bash
npm run clean:eslint
```

### Clean Everything (Recommended Before Fresh Test Run)

```bash
npm run clean
```

### Clean All Node Modules

```bash
npm run clean:all
```

### Clean and Reinstall

```bash
npm run clean:install
```

---

## 🚀 Run All Tests (Jest + Playwright)

From the app package:

```bash
cd packages/app
npm run test:all
```

This runs both:
1. Jest unit tests
2. Playwright E2E tests

---

## 📊 Test Results Summary

### Current Jest Tests (packages/app)
- **Test Suites:** 8 passed, 1 skipped (9 total)
- **Tests:** 25 passed, 1 skipped (26 total)
- **Files:**
  - ✅ array-methods.test.js
  - ✅ array-methods.test.ts (TypeScript)
  - ✅ async.test.js
  - ✅ closures.test.js
  - ✅ currying.test.js
  - ✅ destructuring.test.js
  - ✅ promises.test.js
  - ✅ workspace.test.js
  - ⏭️ import.test.js (intentionally skipped with `test.skip()`)

### Current Playwright Tests (packages/app)
- **Test Suites:** 1 passed
- **Tests:** 4 passed
- **Files:**
  - ✅ tests/api/async.spec.js (4 API tests)

---

## 💡 Tips

1. **Use UI mode for debugging Playwright tests:**
   ```bash
   npm run test:e2e:ui
   ```

2. **Run Jest in watch mode during development:**
   ```bash
   npm run test:watch
   ```

3. **Check which packages Lerna will run tests on:**
   ```bash
   npm run lerna:check
   ```

4. **Clean cache if tests behave unexpectedly:**
   ```bash
   npm run clean
   ```

5. **View coverage reports:**
   ```bash
   npm run test:coverage
   # Then open: packages/app/coverage/lcov-report/index.html
   ```

---

## 🔧 Troubleshooting

### Jest Tests Not Running
```bash
# Clear cache and retry
npm run test:app:clean
```

### Playwright Tests Not Found
- Check test files are in `tests/api/` or `tests/e2e/` directories
- Verify files match pattern: `*.spec.js` or `*.spec.ts`

### Import Errors
- Check relative paths in imports
- For tests in `tests/api/`, use `../../src/` to import from src
- For tests in `tests/e2e/`, use `../../src/` to import from src

### Lerna Gets Stuck
- Ensure all packages have test scripts (even if placeholder)
- Use `--no-bail` flag to continue on errors

---

## 📝 Quick Reference

| Command | Description |
|---------|-------------|
| `npm run test` | Run all Jest tests |
| `npm run test:app` | Run Jest tests for app only |
| `npm run test:e2e` | Run all Playwright tests |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run test:coverage` | Run Jest with coverage |
| `npm run test:e2e:ui` | Run Playwright with UI |
| `npm run test:e2e:headed` | Run Playwright with visible browser |
| `npm run clean` | Clean all caches and reports |

---

**Last Updated:** February 11, 2026