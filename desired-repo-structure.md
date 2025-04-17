# Desired Repository Structure

This document outlines the ideal structure for the Claude Contra project, focusing on clear organization of components, artifacts, and supporting code, following ShadCN and Tailwind CSS v4 best practices. This structure aims to facilitate both the documentation aspect and the showcasing of distinct Claude-assisted artifacts.

## Project Overview

Claude Contra is a documentation and showcase project that demonstrates creative uses of Claude.ai. The project contains:

- A documentation website built with React, Vite, TypeScript, shadcn/ui, and Tailwind CSS v4.
- A collection of "artifacts" - single-file experiments created with Claude's assistance.
- Supporting research and documentation.

## Desired Directory Structure

```
/public                  // Static assets served directly
  /images
  /fonts
  /...

/src
  /components            // React components for the site UI
    /ui                  // shadcn/ui components (installed here via CLI)
      button.tsx
      input.tsx
      ...
    /layout              // Layout components (e.g., Sidebar, Header, Footer)
    /nav                 // Navigation-specific components
    /shared              // Common components used across multiple pages/features

  /artifacts             // Claude-assisted experimental components (self-contained)
    /timer               // Specific artifact type
      /v1                // Version 1 implementation
        index.tsx        // Single-file implementation (React component)
      /v2                // Version 2 implementation
        index.tsx
    /counter
      /v1
        index.tsx
    /binary-compare-swatch
      /v1
        index.tsx
    /todo                // Example: New todo artifact
      /v1
        index.tsx

  /lib                   // Utilities, hooks, and shared code
    /utils.ts            // General utility functions (e.g., cn from shadcn)
    /ArtifactContext.tsx // Example: Context for managing artifacts
    /hooks/              // Custom React hooks (e.g., useArtifactData)

  /pages                 // Route components (or views) for the site
    /home                // Home page content and logic
      index.tsx
    /artifacts           // Artifacts listing/gallery page
      index.tsx
    /research            // Research findings page
      index.tsx
    /demos               // Demo showcase page
      index.tsx

  /styles                // Global styles and Tailwind configuration
    /index.css           // Main CSS entry point, includes Tailwind directives (@tailwind, @theme)

  /types                 // TypeScript type definitions
    /index.ts            // Shared types across the application
    /artifacts.ts        // Artifact-specific types

  App.tsx                // Main application component (routing setup)
  main.tsx               // Application entry point (renders App)
  vite-env.d.ts          // Vite environment types

components.json          // shadcn/ui CLI configuration file
postcss.config.js        // PostCSS configuration (if needed beyond Vite/Tailwind plugin)
vite.config.ts           // Vite build configuration (incl. Tailwind plugin)
tsconfig.json            // TypeScript configuration (base)
tsconfig.app.json        // TypeScript configuration (app-specific, Vite)
package.json             // Project dependencies and scripts
README.md                // Project documentation
```

## Key Organizational Principles

### Component Organization (Following ShadCN)

- **UI Components**: Raw shadcn/ui components are installed directly into `/src/components/ui` by the `pnpm dlx shadcn@latest add [component]` command. Do not manually edit these unless necessary; prefer composition.
- **Layout Components**: Site-wide structure components (header, footer, sidebar) reside in `/src/components/layout`.
- **Navigation**: Components specifically for navigation menus, breadcrumbs, etc., are in `/src/components/nav`.
- **Shared Components**: Common, reusable components used across different features or pages are placed in `/src/components/shared`.

### Artifact Structure

- Each distinct artifact resides in its own directory under `/src/artifacts`. This separation supports the project goal of clearly showcasing individual experiments.
- Versions (`/v1`, `/v2`) allow tracking iterations of each artifact.
- Each version aims to be a self-contained `index.tsx` React component.
- Artifacts should minimize external dependencies from the main site structure, treating `/lib` as permissible but avoiding direct coupling with `/pages` or specific layout components.

### Application Logic & Utilities

- Shared utility functions, especially the `cn` utility from shadcn/ui, are in `/src/lib/utils.ts`.
- Global state or context providers (like `ArtifactContext`) live in `/src/lib`.
- Custom React hooks are organized within `/src/lib/hooks`.

### Content and Routing

- Page-level components mapping to application routes are located in `/src/pages`. Each page directory typically contains an `index.tsx`. This clear structure supports the documentation aspect of the site.
- Static assets like images and fonts are placed in the `/public` directory.

### Styling (Tailwind CSS v4)

- Global styles and Tailwind CSS v4 configuration are managed in `/src/styles/index.css`.
- Tailwind's base, components, and utilities layers are included via `@tailwind` directives.
- Theme customizations (colors, fonts, spacing, etc.) are defined using the `@theme` directive within this CSS file, replacing the need for `tailwind.config.js`.
- Component-specific styles should primarily use Tailwind utility classes.

### Configuration

- **`components.json`**: Essential for the `shadcn` CLI (invoked via `pnpm dlx shadcn@latest`) to manage component installation, paths, and aliases.
  - Must be correctly configured, usually via `pnpm dlx shadcn@latest init`.
  - **Crucially for Tailwind v4:** The `tailwind.config` field **must be left blank**.
  - Requires specific `aliases` entries (`utils`, `components`, `ui`, `lib`, `hooks`) that **must** align with your `tsconfig.json`/`tsconfig.app.json` and `vite.config.ts` path configurations.
  - Recommended settings for Vite: `style: "new-york"` (as `default` is deprecated), `rsc: false` (for client-side rendering), `tsx: true` (for TypeScript), `tailwind.cssVariables: true` (for standard shadcn/ui theming).
- **`vite.config.ts`**: Configures the Vite build tool.
  - Requires path alias setup (`resolve.alias`) matching `tsconfig.json` and `components.json`.
  - Should include the `@tailwindcss/vite` plugin for optimal Tailwind CSS v4 integration.
- **`postcss.config.js`**: Handles PostCSS plugins. With `@tailwindcss/vite` handling Tailwind, this is typically only needed for _other_ PostCSS transformations (e.g., specific browser prefixing beyond Vite's defaults, though often not required).
- **`tsconfig.json` / `tsconfig.app.json`**: Governs TypeScript compilation settings.
  - Requires `compilerOptions.baseUrl` and `compilerOptions.paths` configured to match `vite.config.ts` and `components.json` aliases (e.g., `"@/*": ["./src/*"]`). Vite requires this in both files.

## Compatibility and Best Practices

- This structure aligns with Vite's expectations for React + TypeScript projects.
- It adheres to shadcn/ui requirements (`components.json`, `/src/components/ui`, `/src/lib/utils.ts`) when using the CLI.
- It follows Tailwind CSS v4 best practices by centralizing configuration within `/src/styles/index.css` and utilizing the Vite plugin.
- Path aliases (`@/*`) must be consistently defined across `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, and `components.json` for reliable imports and CLI functionality.

## Migration Path

To transition to this structure:

1. Create the new directories (`/public`, `/src/*`, etc.).
2. Move existing components, pages, utils, hooks, styles, and assets to their new locations.
3. Run `pnpm dlx shadcn@latest init` to create/update `components.json`. Carefully answer the prompts, ensuring:
   - Style is `new-york`.
   - Tailwind config path is left _blank_.
   - CSS file path points to `src/styles/index.css`.
   - Base color is chosen (e.g., `neutral`, `zinc`).
   - CSS variables are enabled (`true`).
   - `rsc` is `false` (for Vite).
   - `tsx` is `true`.
   - Verify the generated `aliases` match your intended structure (e.g., `utils: "@/lib/utils"`, `components: "@/components"`, `ui: "@/components/ui"`, `lib: "@/lib"`, `hooks: "@/hooks"`). Adjust if needed.
4. Configure Tailwind CSS v4 within `/src/styles/index.css` using `@import "tailwindcss";` and `@theme { ... }` directives. Remove any old `tailwind.config.js` or `tailwind.config.ts`.
5. Update `tsconfig.json` and `tsconfig.app.json` with `baseUrl` and `paths` for aliases (e.g., `@/*`).
6. Update `vite.config.ts` to include the `tailwindcss()` plugin and matching `resolve.alias` configuration.
7. Refactor imports across the project to use the new paths/aliases (e.g., `import { Button } from '@/components/ui/button';`).
8. Re-install shadcn/ui components using `pnpm dlx shadcn@latest add [component]` to ensure they land in `/src/components/ui` and use the correct aliases specified in `components.json`.
9. Verify routing in `App.tsx` matches the new `/pages` structure.

## Key Learnings & Considerations

During the refinement of this structure, several key points emerged:

- **`components.json` is Crucial for CLI:** This file is not optional if using the `shadcn` CLI. Its accuracy, especially the `aliases`, is vital for component installation.
- **Tailwind v4 Config Location:** Configuration decisively moves from `tailwind.config.js` to within the main CSS file (`@theme`) for new projects adopting v4 standards. The `components.json` field `tailwind.config` _must_ be empty.
- **Vite Integration:** Using the dedicated `@tailwindcss/vite` plugin is preferred over relying solely on PostCSS configuration in `vite.config.ts`.
- **Alias Consistency:** Path aliases (`@/*`) require meticulous consistency across `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, and `components.json`.
- **ShadCN CLI Invocation:** The correct way to use the CLI is via `pnpm dlx shadcn@latest` (or `npx`, `yarn dlx`, `bunx`), not the old `shadcn-ui` command.
- **ShadCN Defaults:** Be aware of defaults (`style: "new-york"`, `rsc: false` for Vite, `cssVariables: true`) and how they align with project needs.

This updated structure provides a robust foundation for the Claude Contra project, balancing modern tooling best practices with the specific organizational needs of the application.
