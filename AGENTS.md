# Repository Guidelines

## Project Structure & Module Organization
- **`src/`** – All TypeScript source code.
  - `components/` holds reusable UI components (Vue or React). 
  - `utils/` contains helper functions and shared logic.
- **`tests/`** – Jest unit tests. File names end with `.spec.ts`.
- **`public/`** – Static assets such as images, fonts, and icons.

## Build, Test, and Development Commands
- `npm run build` – Transpiles TypeScript to JavaScript and outputs to `dist/`.
- `npm test` – Runs Jest tests. Use `npm test --coverage` for a coverage report in `coverage/`.
- `npm start` – Launches the development server on `http://localhost:3000`.
  For HTTPS during development, run `npm run dev:secure`.

## Coding Style & Naming Conventions
- Indentation: **2 spaces**; no tabs.
- File names: lowercase with hyphens (e.g., `user-service.ts`).
- Component names: PascalCase (e.g., `UserProfile.vue`).
- Variables/functions: camelCase. Constants: `UPPER_SNAKE_CASE`.
- Run `npm run lint:fix` to auto‑format and lint with ESLint + Prettier.

## Testing Guidelines
- Framework: **Jest** (TypeScript support).
- Test files must match `*.spec.ts`. They should live alongside the module they test or in `tests/`.
- Minimum coverage target: **80 %**. Verify with `npm test --coverage`.

## Commit & Pull Request Guidelines
- Follow **Conventional Commits** (e.g., `feat: add login page`).
- Include a concise description and link any related issue (`#123`).
- For UI changes, attach screenshots in the PR body. Store design assets under `public/`.

## Security & Configuration Tips
- Reference `.env.example` to set environment variables.
- Do **not** commit secrets or credentials.

