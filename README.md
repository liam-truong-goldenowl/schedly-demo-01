# Schedy

Online Scheduling Application. Inspired by [Calendly](https://calendly.com/)

## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git** - [Download](https://git-scm.com/downloads)
- **Node.js** (v22.x or newer) - [Download](https://nodejs.org/en)
- **npm** (v10.x or newer) - Comes with Node.js

### Installation

Clone the repo

```sh
git clone git@github.com:liam-truong-goldenowl/nextjs-app-template.git
```

### Steps to Run Project

A step by step guide that will tell you how to get the development environment up and running.

1. Navigate to the project folder

   ```sh
   cd nextjs-app-template # Or your custom directory
   ```

1. Install NPM packages
   ```sh
   npm install
   ```
1. Set environment variables (if applicable)

   ```sh
   cp .env.example .env.local
   ```

1. Run development server
   ```sh
   npm run dev
   ```

### Steps to Run Design System (Storybook)

1. Navigate to the project folder

   ```sh
   cd nextjs-app-template # Or your custom directory
   ```

1. Install NPM packages
   ```sh
   npm install
   ```
1. Run Storybook
   ```sh
   npm run storybook
   ```

## Folder Structure

```sh
nextjs-app-template/
│
├── .github/                  # GitHub configuration files
├── .storybook/               # Storybook entry
├── .vscode/                  # VS Code config
├── messages/                 # i18n messages
├── next.config.ts            # Next.js config
├── vitest.config.ts          # Vitest config
├── postcss.config.mjs        # PostCSS config
├── eslint.config.mjs         # ESLint config
├── lint-staged.config.mjs    # lint-staged config
├── commitlint.config.js      # commit-lint config
├── lefthook.yml              # Lefthook config
├── .prettierrc               # Prettier config
├── public/                   # static assets (favicon, og-image, etc.)
└── src/
│   │
│   ├── app/                  # App Router entry
│   └── e2e/                  # Playwright/Cypress end-to-end tests
│   ├── i18n/                 # i18n folder
│   ├── modules/              # Isolated feature domains
│   ├── shared/               # Reusable assets – NO business logic
│   └── stories/              # Storybook stories for UI components
│   ├── styles/               # Tailwind layers, fonts, overrides
│   ├── tests/                # unit tests (e.g. Vitest or Jest)
├── tsconfig.json             # TypeScript config
├── README.md                 # README file
```

## Built With

The project is built with the following technologies:

- **[Next.js](https://nextjs.org/):** A React framework for building fast, scalable web applications with server-side rendering, static site generation, and API routes.
- **[React.js](https://react.dev/):** A popular JavaScript library for building user interfaces using a component-based architecture.
- **[TypeScript](https://www.typescriptlang.org/):** A strongly typed superset of JavaScript that adds static typing to improve code quality and maintainability.
- **[TailwindCSS](https://tailwindcss.com/):** A utility-first CSS framework for rapidly building custom, responsive user interfaces.
- **[shadcn/ui](https://ui.shadcn.com/):** A collection of accessible and customizable UI components built on top of Radix UI and TailwindCSS.
- **[Storybook](https://storybook.js.org/):** An open-source tool for developing, testing, and documenting UI components in isolation.

These tools provide a modern, robust foundation for developing scalable and maintainable web applications.

## Further Documentation

1. Next.js App Router Documentation: [Next.js Docs](https://nextjs.org/docs)
2. React.js Documentation: [React.js Docs](https://react.dev/reference/react)
3. TailwindCSS Documentation: [TailwindCSS Docs](https://tailwindcss.com/)
4. shadcn/ui Documentation: [shadcn/ui Docs](https://ui.shadcn.com/docs)
5. Storybook Documentation: [Storybook Docs](https://storybook.js.org/docs)
