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
│   ├── ui/                 # Shared UI components
│   └── utils/              # Shared utilities and helpers
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
