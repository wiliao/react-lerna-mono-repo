For a **JavaScript practice package**, your current `package.json` works but can be significantly improved for modern development and learning. Here's the optimized version with explanations:

---

### ✅ Recommended `package.json` for Learning

```json
{
  "name": "@tuomo/app",
  "version": "0.1.0",
  "description": "JavaScript concepts playground",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "dev": "node src/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .js,.mjs",
    "format": "prettier --write \"src/**/*.{js,mjs,json}\""
  },
  "dependencies": {
    "@tuomo/common": "workspace:*"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-environment-node": "^29.7.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0",
    "@types/jest": "^29.5.12"
  },
  "keywords": ["javascript", "practice", "concepts"],
  "author": "Your Name",
  "license": "MIT"
}
```

---

### 🔑 Key Improvements & Why They Matter for Learning

| Change                       | Why It Matters for Practice                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`"type": "module"`**       | ✅ Enables modern `import/export` syntax (ESM)<br>❌ Avoids legacy `require()` confusion<br>💡 _Critical for learning modern JS_ |
| **`"main": "src/index.js"`** | ✅ Encourages proper project structure<br>❌ Prevents dumping everything in root                                                 |
| **Added `dev` script**       | ✅ Quick feedback loop: `npm run dev` to test concepts instantly                                                                 |
| **Jest + watch mode**        | ✅ Learn TDD: `npm test:watch` auto-runs tests on save<br>💡 Essential for practicing algorithms/data structures                 |
| **ESLint + Prettier**        | ✅ Learn industry-standard code quality tools<br>❌ Avoids developing bad habits                                                 |
| **`@tuomo/common` dep**      | ✅ Practice importing shared utilities from your monorepo<br>💡 Real-world module composition                                    |
| **MIT license**              | ✅ More permissive than ISC for learning/sharing                                                                                 |

---

### 📂 Recommended Project Structure

```bash
packages/app/
├── src/
│   ├── index.js          # Entry point (import concepts here)
│   ├── closures.js       # Practice closures
│   ├── promises.js       # Async/await practice
│   ├── classes.js        # OOP concepts
│   └── utils/            # Helper functions
├── __tests__/
│   ├── closures.test.js
│   └── promises.test.js
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

---

### ⚙️ Minimal Setup Commands (Run in `packages/app`)

```powershell
# 1. Install dev tooling
npm install --save-dev jest jest-environment-node eslint prettier @types/jest

# 2. Add production dependency on your shared code
npm install @tuomo/common

# 3. Create basic ESLint config (.eslintrc.cjs)
echo "module.exports = {
  env: { es2021: true, node: true },
  extends: 'eslint:recommended',
  parserOptions: { ecmaVersion: 'latest' },
  rules: { 'no-console': 'off' }
};" > .eslintrc.cjs

# 4. Create Prettier config (.prettierrc)
echo "{
  \"semi\": true,
  \"singleQuote\": true,
  \"tabWidth\": 2,
  \"trailingComma\": \"es5\"
}" > .prettierrc
```

---

### 💡 Learning Workflow Example

```javascript
// src/closures.js
export function createCounter() {
  let count = 0;
  return () => ++count;
}

// __tests__/closures.test.js
import { createCounter } from "../src/closures.js";

test("counter increments", () => {
  const counter = createCounter();
  expect(counter()).toBe(1);
  expect(counter()).toBe(2);
});
```

Run tests instantly:

```powershell
npm test:watch  # Auto-runs on file save!
```

---

### ⚠️ Critical: ESM Gotchas to Learn

Since you're using `"type": "module"`, practice these real-world patterns:

| CommonJS (Old)           | ESM (Modern)                             | Why It Matters            |
| ------------------------ | ---------------------------------------- | ------------------------- |
| `const x = require('y')` | `import x from 'y'`                      | Syntax difference         |
| `module.exports = x`     | `export default x`                       | Export patterns           |
| `.js` files work         | `.js` requires `"type": "module"`        | File extension rules      |
| `__dirname` available    | Use `import.meta.url` + `path.dirname()` | Path handling differences |

---

### 🚀 Final Recommendation

**Yes – update your `package.json`** with the version above. This setup:

✅ Teaches **modern JavaScript** (ESM) not legacy patterns  
✅ Includes **essential tooling** (testing/linting) you'll use professionally  
✅ Leverages your **monorepo structure** (`@tuomo/common`)  
✅ Scales from simple concepts → complex projects  
✅ Avoids "toy project" pitfalls that create bad habits

This isn't over-engineering – it's **professional scaffolding for deliberate practice**. You'll thank yourself when learning async patterns, modules, or testing! 😊

> 💡 **Pro tip**: Start with 1 concept per file (`closures.js`, `promises.js`), write tests FIRST, then implement. This builds muscle memory for real development workflows.

## How to run test

#### From MONOREPO ROOT (critical!)

npm test -w @tuomo/app -- **tests**/async.test.js

npm test -w @tuomo/app -- **tests**/array-methods.test.js

npx lerna run test --scope=@tuomo/app -- -- **tests**/array-methods.test.js --no-cache --verbose

node --experimental-vm-modules ./packages/app/node_modules/jest/bin/jest.js ./packages/app/**tests**/array-methods.test.js --no-cache
