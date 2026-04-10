# Tech Stack Documentation

## Project Overview
This project is a single-page React web application for Orena Solution, built with Vite and styled primarily with Tailwind CSS plus custom global CSS.

## Core Technologies
- **Runtime/Platform**: Node.js + npm
- **Frontend Library**: React `19.2.4`
- **DOM Renderer**: React DOM `19.2.4`
- **Routing**: React Router DOM `7.13.1`
- **Build Tool / Dev Server**: Vite `7.3.1`
- **Vite React Integration**: `@vitejs/plugin-react` `5.1.4`

## Styling Stack
- **Utility CSS Framework**: Tailwind CSS `3.4.1`
- **PostCSS Processor**: PostCSS `8.4.35`
- **Vendor Prefixing**: Autoprefixer `10.4.18`
- **Tailwind Forms Plugin**: `@tailwindcss/forms` `0.5.11` (installed)

### Styling Implementation Details
- Tailwind directives are imported in `src/index.css`:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`
- Custom global CSS includes:
  - Design tokens via CSS variables (green palette, text colors)
  - Animation keyframes (`bubbleFloat`, `floatY`)
  - Utility-like custom classes (`gradient-btn`, `card-shadow`, etc.)
- Google Font loaded through CSS `@import` for **Plus Jakarta Sans**.

## Configuration Files

### `vite.config.js`
- Uses `defineConfig` from Vite.
- Enables React plugin:
  - `plugins: [react()]`

### `tailwind.config.js`
- Content scanning targets:
  - `./index.html`
  - `./src/**/*.{js,ts,jsx,tsx}`
- Theme extension includes custom brand colors:
  - `orena-green-dark: #1E7F4F`
  - `orena-green-light: #7ED957`
- `plugins` currently set to an empty array.

### `postcss.config.js`
- Configured plugins:
  - `tailwindcss`
  - `autoprefixer`

## Application Architecture

### Entry Flow
1. `index.html` contains root mount point (`#root`) and loads `/src/main.jsx` as module script.
2. `src/main.jsx` bootstraps React with:
   - `ReactDOM.createRoot(...)`
   - `React.StrictMode`
   - App component import from `src/App.jsx`

### Routing Architecture
- Uses `BrowserRouter` from React Router.
- Route structure is centralized in `src/App.jsx`.
- Includes dedicated pages and nested About section routes.
- Includes a `ScrollToTop` helper component that resets scroll position on route changes.

### Component/Styling Pattern
- Mix of:
  - Tailwind utility classes in JSX
  - Inline style objects (extensively used in components like navbar)
  - Global classes from `src/index.css`

## Scripts and Commands
Defined in `package.json`:
- `npm run dev` -> Starts Vite development server
- `npm run build` -> Creates production build
- `npm run preview` -> Serves production build locally

## Dependency Classification (Current)
### `dependencies`
- `react-router-dom`

### `devDependencies`
- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `@tailwindcss/forms`

> Note: `react` and `react-dom` are commonly kept in `dependencies` for production apps, but in this project they are currently listed in `devDependencies`.

## Project Structure (High Level)
- `src/main.jsx` -> application bootstrap
- `src/App.jsx` -> app shell and route definitions
- `src/components/` -> reusable UI components
- `src/pages/` -> route-level page components
- `src/index.css` -> Tailwind directives + global custom CSS
- `public/` -> static assets served directly

## Additional Observations
- The repository also contains standalone/static HTML files (`about.html`, `blog.html`, etc.) in the root, likely legacy/static versions or marketing snapshots outside the Vite SPA flow.
- Current CSS order triggers a PostCSS warning because `@import` appears after Tailwind directives in `src/index.css`.

## Environment Notes
- This setup is currently JavaScript-based (`.jsx`) and does not include TypeScript configuration.
- No dedicated test framework configuration (such as Vitest/Jest/Cypress/Playwright) is currently present in `package.json` scripts.
