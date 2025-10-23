# Holydays

Holydays is a [Next.js](https://nextjs.org/) application built with React 19 and Tailwind CSS 4. It is configured with Turbopack for local development and production builds, and comes with linting, formatting, and testing scripts ready to use.

## Requirements

- Node.js 18 or newer
- Yarn 4 (enable via `corepack enable` if it is not already available)

## Getting Started

Install dependencies and launch the development server:

```bash
yarn install
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000). Hot reload is enabled, so changes under `src/` update automatically.

## Available Scripts

- `yarn dev` — start Next.js in development mode with Turbopack.
- `yarn build` — create an optimized production build.
- `yarn start` — run the production server (after `yarn build`).
- `yarn lint` — lint the project with ESLint.
- `yarn format` — format files using Prettier.
- `yarn test` — execute the Jest test suite (`jsdom` environment).

## Tech Stack

- [Next.js 15](https://nextjs.org/) with the App Router.
- [React 19](https://react.dev/) and [React DOM](https://react.dev/reference/react-dom).
- [Tailwind CSS 4](https://tailwindcss.com/) via the official PostCSS plugin.
- [TypeScript 5](https://www.typescriptlang.org/) for type safety.
- [ESLint 9](https://eslint.org/) and [Prettier 3](https://prettier.io/) for code quality.
- [Jest 30](https://jestjs.io/) and [Testing Library](https://testing-library.com/) for testing.

## Formatting & Linting

Run `yarn lint` to check the codebase. Use `yarn format` to apply Prettier formatting across the project. Both commands rely on the configuration in `eslint.config.mjs`, `.prettierrc.json`, and `.prettierignore`.

## Testing

The project is configured with Jest and Testing Library. Execute `yarn test` to run the test suite in the `jsdom` environment. Add test files alongside the components they cover using the `.test.ts` or `.test.tsx` suffix.

## Deployment

Generate a production build with `yarn build`, then start the server with `yarn start`. Any platform that supports Node.js 18+ can host the app; popular options include Vercel, AWS, and Netlify.
