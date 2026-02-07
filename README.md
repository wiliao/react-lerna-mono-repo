# React Monorepo with Lerna & Copilot Practice

A modern monorepo setup using **Lerna**, **React**, and **TypeScript** for practicing collaborative development, package management, and leveraging **GitHub Copilot** for AI-powered coding assistance.

## 🚀 Features

- **Monorepo powered by Lerna** – manage multiple packages in a single repository
- **React with TypeScript** – type-safe, scalable frontend applications
- **GitHub Copilot integration** – explore AI-assisted development workflows
- **Shared components & utilities** – promote code reuse across projects
- **Pre-configured scripts** – build, test, and lint with ease

## 📦 Project Structure

```
react-lerna-mono-repo/
├── packages/
│   ├── app/                # Main React application
│   ├── web/                # Shared UI components
│   └── common/             # Shared utilities and helpers
├── lerna.json              # Lerna configuration
├── package.json            # Root workspace configuration
└── README.md               # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- Lerna installed globally (optional, using `npx` is fine)
- GitHub Copilot access

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-lerna-mono-repo.git
   cd react-lerna-mono-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Bootstrap packages (using Lerna):
   ```bash
   npx lerna bootstrap
   ```

### Development

- Start all packages in development mode:

  ```bash
  npx lerna run start --parallel
  ```

- Build all packages:

  ```bash
  npx lerna run build
  ```

- Run tests:
  ```bash
  npx lerna run test
  ```

## 🤖 Using GitHub Copilot

This repository is designed to help you explore and practice using **GitHub Copilot**. Some suggested exercises:

- Generate React components from natural language prompts
- Write unit tests with Copilot suggestions
- Refactor shared utilities across packages
- Automate repetitive monorepo tasks with scripts

## 📖 Learn More

- [Lerna Documentation](https://lerna.js.org/)
- [React Documentation](https://reactjs.org/)
- [GitHub Copilot](https://copilot.github.com/)
- [Monorepo Explained](https://monorepo.tools/)

## 📄 License

MIT

# From Qwen3-Max

## AFTER CLONING OR ADDING NEW DEPENDENCIES:

npm install # ← Replaces ALL "lerna bootstrap" usage

## DAILY DEVELOPMENT:

npx lerna run dev # Runs "dev" script across all packages
npx lerna run build --scope=@tuomo/web # Build specific package
npx lerna version # Bump versions
npx lerna publish # Publish packages

## VERIFY WORKSPACES (anytime):

npm ls --workspaces # ✅ Your working command
npm query ":workspace" # Alternative (npm v8.15+)

## Update package.json to include scripts

npm install # Installs deps + links workspaces
npm run dev # Starts all dev servers in parallel

## Upgrade lerna

### 1. Upgrade Lerna at ROOT level (critical for monorepos)

npm install lerna@8.2.4 --save-dev

### 2. Verify the update

npx lerna --version

### Should output: 8.2.4

### 3. Confirm package.json updated

Get-Content package.json | ConvertFrom-Json | Select-Object -ExpandProperty devDependencies | Select-Object lerna

### Should show: "lerna": "^8.2.4"

## Steps to confirm

### 1. Confirm version

npx lerna --version

### 2. Verify workspace detection still works

npx lerna ls

### Expected output:

### @tuomo/common

### @tuomo/web

### (and @tuomo/app if you created it)

### 3. Test a workflow command

npx lerna run build --dry-run

## Step-by-Step: Add @tuomo/app Package

### 1. Create package directory

mkdir packages\app

### 2. Initialize minimal package.json WITH CORRECT SCOPE

cd packages\app
npm init -y

### 3. FIX critical fields (PowerShell one-liner):

$json = Get-Content package.json | ConvertFrom-Json; $json.name = "@tuomo/app"; $json.version = "0.1.0"; $json | ConvertTo-Json -Depth 10 | Set-Content package.json

### 4. Return to root and link workspace

cd ../..
npm install

## How to reset environment

### 1. Delete corrupted node_modules and lockfile
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

### 2. Clear npm cache (optional but recommended)
npm cache clean --force

### 3. Reinstall dependencies CORRECTLY
npm install
