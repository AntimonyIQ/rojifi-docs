# Rojifi REST API Documentation

Official documentation website for the Rojifi REST API built with React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

### Environment Configuration

This project uses environment variables to control content visibility. Pages in the documentation data marked with `status: 'DEV'` are only visible when the environment is set to development.

Create a `.env` file in the root directory (or set these variables in your shell):

**For Development (Shows all content including DEV status pages):**
```bash
VITE_DOCS_ENV=development
```

**For Production (Hides DEV status pages):**
```bash
VITE_DOCS_ENV=production
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build

Build for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

Preview the local production build:

```bash
npm run preview
```

## Project Structure

The documentation is data-driven, powered by a single TypeScript file that defines the structure, navigation, and content.

- `src/data/docs.ts`: The single source of truth for all documentation content. It defines versions, tabs (Guides, API Reference, SDKs), categories, and pages.
- `src/layouts/DocsLayout.tsx`: The main layout component handling the sidebar navigation, top tabs, version switching, and search functionality.
- `src/pages/DocsPage.tsx`: The generic page component that renders content based on the current route parameters (`version`, `tab`, `slug`).
- `src/App.tsx`: Handles routing logic and redirects (e.g., `/docs` -> `/docs/v1/guides/getting-started`).

## Technologies

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- Lucide React (Icons)

