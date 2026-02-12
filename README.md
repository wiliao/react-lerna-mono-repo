# React Monorepo with Lerna & TypeScript

A modern monorepo setup using **Lerna**, **React**, and **TypeScript** for practicing collaborative development, package management, and comprehensive testing strategies with **Jest** and **Playwright**.

[![Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://reactjs.org/)

## 🚀 Features

- **Monorepo Architecture** – Lerna manages multiple packages in a single repository
- **Type-Safe Development** – React with TypeScript for scalable applications
- **Comprehensive Testing** – Jest for unit tests, Playwright for E2E/API tests
- **Shared Packages** – Promote code reuse with common utilities and components
- **Modern Tooling** – ESLint, Prettier, and automated workflows
- **Optimized Scripts** – Pre-configured commands for build, test, lint, and format

## 📦 Project Structure

```
react-lerna-mono-repo-Test-Code-Review/
├── packages/
│   ├── app/                    # Main application package
│   │   ├── __tests__/         # Jest unit tests
│   │   ├── tests/             # Playwright E2E/API tests
│   │   │   ├── api/          # API tests
│   │   │   └── e2e/          # Browser E2E tests
│   │   ├── src/              # Application source code
│   │   └── package.json
│   ├── common/                # Shared utilities and helpers
│   │   ├── src/
│   │   └── package.json
│   └── web/                   # Shared UI components
│       ├── src/
│       └── package.json
├── lerna.json                 # Lerna configuration
├── package.json               # Root workspace configuration
├── TESTING_GUIDE.md          # Comprehensive testing documentation
└── README.md                  # This file
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 16+ (18+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git** for version control

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/react-lerna-mono-repo.git
   cd react-lerna-mono-repo-Test-Code-Review
   ```

2. **Install all dependencies:**

   ```bash
   npm install
   ```

   This command:
   - Installs root dependencies
   - Links workspace packages automatically
   - Sets up all package dependencies

3. **Verify installation:**

   ```bash
   npx lerna ls
   ```

   Expected output:
   ```
   @tuomo/app
   @tuomo/common
   @tuomo/web
   ```

## 🔥 Development

### Start Development Servers

Run all packages in parallel:

```bash
npm run dev
```

Or run specific package:

```bash
npx lerna run dev --scope=@tuomo/app
```

### Build All Packages

```bash
npm run build
```

Build specific package:

```bash
npx lerna run build --scope=@tuomo/web
```

## 🧪 Testing

### Quick Start

```bash
# Run all Jest tests
npm run test

# Run all Playwright tests
npm run test:e2e

# Run only app package tests
npm run test:app
```

### Detailed Testing Commands

**Jest Unit Tests:**

```bash
npm run test                    # Run all tests
npm run test:watch             # Watch mode
npm run test:coverage          # With coverage report
npm run test:app:clean         # Clean cache and run
```

**Playwright E2E/API Tests:**

```bash
npm run test:e2e               # Run all E2E tests
npx lerna run test:e2e:ui --scope=@tuomo/app    # UI mode (recommended)
npx lerna run test:e2e:headed --scope=@tuomo/app # Headed mode
npx lerna run test:e2e:debug --scope=@tuomo/app  # Debug mode
```

📖 **See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing documentation**

### Current Test Coverage

- **Jest Tests:** 8 suites, 25 tests (packages/app)
- **Playwright Tests:** 4 API tests (packages/app)

## 🎨 Code Quality

### Linting

```bash
npm run lint                   # Check all packages
npm run lint:fix              # Auto-fix issues
```

### Formatting

```bash
npm run format                # Format all files
npm run format:check          # Check formatting
```

## 🧹 Maintenance

### Clean Up

```bash
npm run clean                 # Clean cache, coverage, reports
npm run clean:cache          # Clean only cache
npm run clean:coverage       # Clean only coverage reports
npm run clean:playwright     # Clean only Playwright reports
```

### Reset Environment

If you encounter issues:

```bash
npm run clean:all            # Remove all node_modules
npm install                  # Reinstall everything
```

Or use the recommended command:

```bash
npm run clean:install        # Clean + reinstall in one step
```

## 📊 Lerna Commands

### Package Management

```bash
npx lerna ls                 # List all packages
npx lerna ls --long          # Detailed package info
npx lerna ls --graph         # Dependency graph
npm run lerna:check          # List + graph combined
```

### Version & Publish

```bash
npx lerna version            # Bump package versions
npx lerna publish            # Publish to npm registry
npx lerna changed            # Show changed packages
```

## 📝 Package Scripts Reference

### Root Level Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all packages in parallel |
| `npm run build` | Build all packages |
| `npm run test` | Run all Jest tests |
| `npm run test:e2e` | Run all Playwright tests |
| `npm run test:app` | Run tests for app package only |
| `npm run lint` | Lint all packages |
| `npm run format` | Format all files with Prettier |
| `npm run clean` | Clean cache and reports |
| `npm run lerna:check` | Verify workspace configuration |

### App Package Scripts

```bash
cd packages/app

npm run dev                  # Start dev server
npm run build               # Build TypeScript
npm run test                # Run Jest tests
npm run test:e2e            # Run Playwright tests
npm run test:e2e:ui         # Playwright UI mode
npm run lint                # Lint code
npm run format              # Format code
```

## 🏗️ Architecture

### Package Dependencies

```
@tuomo/app
├── @tuomo/common    (utilities & helpers)
└── @tuomo/web       (UI components)

@tuomo/web
└── @tuomo/common

@tuomo/common
└── (no dependencies)
```

### Technology Stack

- **Build Tool:** Lerna 8.2.4
- **Language:** TypeScript 5.x
- **Framework:** React 18.x
- **Testing:** Jest + Playwright
- **Linting:** ESLint
- **Formatting:** Prettier
- **Package Manager:** npm (with workspaces)

## 🔧 Troubleshooting

### Common Issues

**1. Lerna commands not working**

```bash
# Verify Lerna version
npx lerna --version

# Should output: 8.2.4
```

**2. Workspace packages not linked**

```bash
# Re-install to relink workspaces
npm install
```

**3. Tests not running**

```bash
# Clear cache and retry
npm run clean
npm run test
```

**4. Import errors between packages**

```bash
# Verify package names match in package.json
npx lerna ls

# Check imports use correct scope
import { something } from '@tuomo/common'
```

**5. Playwright tests not found**

```bash
# Ensure tests are in correct directories:
# - packages/app/tests/api/*.spec.js
# - packages/app/tests/e2e/*.spec.js
```

### Cache Issues

If experiencing unexplained errors:

```bash
# Full reset
npm run clean:install

# Or manual reset
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🧑‍💻 Development Workflow

### Adding a New Package

```bash
# 1. Create package directory
mkdir packages/new-package

# 2. Initialize package.json
cd packages/new-package
npm init -y

# 3. Update package.json with correct scope
# Change "name": "new-package" to "name": "@tuomo/new-package"

# 4. Return to root and install
cd ../..
npm install
```

### Test-Driven Development (TDD)

```bash
# 1. Write failing test first
test('my feature', () => {
  expect(myFunction()).toBe(expected);
});

# 2. Implement minimal code to pass
export const myFunction = () => expected;

# 3. Refactor with confidence
# Tests guard against breaking changes
```

### Adding Dependencies

**For workspace package:**

```bash
cd packages/app
npm install package-name
```

**For root (dev dependencies):**

```bash
npm install -D package-name
```

**Link workspace packages:**

```bash
cd packages/app
npm install @tuomo/common@*
```

## 📚 Learn More

- [Lerna Documentation](https://lerna.js.org/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Monorepo Tools](https://monorepo.tools/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm run test && npm run test:e2e`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

MIT

---

**Last Updated:** February 11, 2026

**Lerna Version:** 8.2.4 | **Node Version:** 16+ | **TypeScript Version:** 5.x
