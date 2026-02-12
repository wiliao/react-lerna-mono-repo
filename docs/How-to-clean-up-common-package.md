The `common` package currently looks like a full React app (created with CRA). Let's clean it up to be a **pure component library** with utilities.

## 🧹 Clean Up Common Package:

### Step 1: Remove Unnecessary Files

```bash
cd packages\common

# Remove app-specific files
Remove-Item src\App.css
Remove-Item src\App.test.tsx
Remove-Item src\App.tsx
Remove-Item src\index.css
Remove-Item src\index.tsx
Remove-Item src\logo.svg
Remove-Item src\react-app-env.d.ts
Remove-Item src\setupTests.ts

# Remove CRA directories
Remove-Item -Recurse public
Remove-Item -Recurse build -ErrorAction SilentlyContinue
```

### Step 2: Restructure src Directory

```bash
# Keep only components and version
# Your src should now have:
# src/
#   components/
#     Button.tsx
#   version.js
```

### Step 3: Create an Index File for Exports

**Create `packages/common/src/index.ts`:**

```typescript
// Export all components
export { Button } from "./components/Button";

// Export utilities
export { version } from "./version";
```

### Step 4: Update package.json

**Edit `packages/common/package.json`:**

```json
{
  "name": "@tuomo/common",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts",
  "files": ["src"],
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.1.0",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "typescript": "^5.7.3"
  },
  "scripts": {
    "test": "echo \"No tests yet\" && exit 0",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx}\"",
    "typecheck": "tsc --noEmit"
  }
}
```

### Step 5: Update tsconfig.json

**Edit `packages/common/tsconfig.json`:**

```jsonc
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "build"],
}
```

### Step 6: Verify Structure

```bash
# Your final structure should be:
dir src

# Expected output:
# components/
#   Button.tsx
# index.ts        ← New file
# version.js
```

## 📦 Final Structure:

```
packages/common/
├── src/
│   ├── components/
│   │   └── Button.tsx
│   ├── index.ts         ← Barrel export file
│   └── version.js
├── package.json         ← Updated
├── tsconfig.json       ← Updated
└── README.md
```

## ✅ Test the Cleanup:

```bash
# From common package
npm run typecheck

# Should compile without errors

# Test imports work from web package
cd ..\web
```

**Update imports in web package to use the new structure:**

```typescript
// Before
import { Button } from "@tuomo/common/src/components/Button";

// After
import { Button } from "@tuomo/common";
```

## 🚀 Complete Cleanup Script:

```bash
cd packages\common

# Remove files
Remove-Item src\App.css, src\App.test.tsx, src\App.tsx, src\index.css, src\index.tsx, src\logo.svg, src\react-app-env.d.ts, src\setupTests.ts -ErrorAction SilentlyContinue
Remove-Item -Recurse public, build -ErrorAction SilentlyContinue

# Create index.ts
@"
// Export all components
export { Button } from './components/Button';

// Export utilities
export { version } from './version';
"@ | Out-File -FilePath src\index.ts -Encoding utf8

# Verify
dir src
```

**Run this script and share the output to confirm the cleanup!**
