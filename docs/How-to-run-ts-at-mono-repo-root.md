# 🚀 How to Run TypeScript Files in Your Monorepo: Complete Guide

## ✅ Prerequisites Checklist
- [x] `tsx` installed globally (`npm install -g tsx`)
- [x] File saved as **UTF-8 without BOM** (VS Code: bottom-right status bar → "Save with Encoding" → UTF-8)
- [x] File exists at specified path
- [x] Running commands from **monorepo root** (`C:\Samples-08-react\react-lerna-mono-repo-Test-Code-Review`)

---

## 📌 Method 1: Direct Execution (Quick Testing)
```powershell
# From MONOREPO ROOT directory
npx tsx packages/app/src/your-file.ts
```
✅ **Best for**: Quick demos, one-off scripts  
⚠️ **Critical**: Must use **relative path from root**

---

## 📌 Method 2: Workspace Script (Recommended for Projects)
### Step 1: Add script to `packages/app/package.json`
```json
{
  "scripts": {
    "demo": "tsx src/array-concepts-demo.ts",
    "run:file": "tsx src/"
  }
}
```

### Step 2: Run from monorepo root
```powershell
# Run specific demo
npm run demo -w @tuomo/app

# Run any file (replace filename)
npm run run:file your-file.ts -w @tuomo/app
```
✅ **Best for**: Project files, consistent execution, CI/CD  
✅ **Advantages**: 
- Automatically runs from workspace context
- No path resolution issues
- Works with workspace dependencies

---

## 📌 Method 3: VS Code Task (Fastest Workflow)
Create `.vscode/tasks.json` in monorepo root:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run TS Demo",
      "type": "shell",
      "command": "npx tsx packages/app/src/array-concepts-demo.ts",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```
✅ **Usage**: `Ctrl+Shift+P` → "Run Task" → "Run TS Demo"  
✅ **Best for**: Daily development, instant feedback

---

## 🔑 Critical Path Rules
| Scenario | ✅ Correct | ❌ Wrong |
|----------|------------|----------|
| **Current Directory** | Monorepo root | Inside `packages/app` |
| **File Path** | `packages/app/src/file.ts` | `src/file.ts` (from root) |
| **Encoding** | UTF-8 (no BOM) | UTF-8 with BOM |
| **File Extension** | `.ts` | `.js` (won't compile TS) |

---

## 🚨 Common Errors & Fixes
| Error | Cause | Fix |
|-------|-------|-----|
| `ERR_MODULE_NOT_FOUND` | File doesn't exist OR wrong path | Verify path with `dir packages/app/src/` |
| `Unexpected ""` | UTF-8 BOM encoding | Save as UTF-8 (no BOM) in VS Code |
| `Cannot use import` | Missing `"type": "module"` | Add to `package.json` or use `.mts` |
| `Unknown file extension` | Using `node` instead of `tsx` | Always use `npx tsx` |
| `Cannot find module` | Running from package directory | **Always run from monorepo root** |

---

## 💡 Pro Workflow Recommendation
```powershell
# 1. Create file (VS Code auto-saves UTF-8)
code packages/app/src/interview-practice.ts

# 2. Add npm script (one-time setup)
# packages/app/package.json → "scripts": { "practice": "tsx src/interview-practice.ts" }

# 3. Run instantly from root
npm run practice -w @tuomo/app

# 4. For new files: duplicate script or use VS Code task
```

---

## 🌟 Why This Works in Your Setup
| Component | Role |
|-----------|------|
| **`tsx`** | Executes TS files directly (no compilation step) |
| **Monorepo root** | Resolves workspace dependencies correctly |
| **UTF-8 no BOM** | Prevents ESM parser errors |
| **Workspace script** | Handles Node.js ESM resolution properly |
| **`-w @tuomo/app`** | Tells Lerna/npm to run in specific workspace |

---

## ✅ Verification Command
```powershell
# From monorepo root - should show clean output
npx tsx packages/app/src/array-concepts-demo.ts
```
Expected:  
✅ No "module not found" errors  
✅ No "Unexpected BOM" errors  
✅ Full demo output with interview concepts  

> 💡 **Remember**:  
> **"Always run from root, always use relative paths, always save UTF-8 no BOM"**  
> This mantra solves 95% of TypeScript execution issues in monorepos! 🎯