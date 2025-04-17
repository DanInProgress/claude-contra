# Claude Contra

A documentation project showcasing creative and unconventional uses of Claude.ai, exploring the boundaries of what's possible with Anthropic's AI assistant. This repository contains a mix of AI-assisted generation, creative tweaks, and curated snippets.

## 🚀 Tech Stack

- ⚡ [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- ⚛️ [React](https://react.dev/) - UI Library
- 📝 [TypeScript](https://www.typescriptlang.org/) - Type Safety
- 🎨 [Tailwind CSS](https://tailwindcss.com/) v4 - Styling
- 🎭 [shadcn/ui](https://ui.shadcn.com/) - UI Components
- 📦 [PNPM](https://pnpm.io/) - Package Manager

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Preview production build
pnpm preview

# Add new shadcn/ui component
pnpm dlx shadcn@latest add [component-name]
```

## 📚 Project Structure

The project follows a modern structure optimized for Tailwind CSS v4 and shadcn/ui:

```
/src
  /components
    /ui                  // shadcn/ui components
    /layout              // Layout components
    /nav                 // Navigation-specific components
    /shared              // Common components used across multiple pages

  /artifacts             // Self-contained experiments
    /[artifact-name]
      /v1                // Version 1 implementation
        index.tsx        // Single-file implementation
      /v2                // Version 2 implementation (if applicable)
        index.tsx

  /lib                   // Utilities, hooks, and shared code
    /utils.ts            // Utility functions
    /hooks/              // Custom React hooks

  /pages                 // Route components
    /home
    /artifacts
    /research
    /demos

  /styles                // Global styles and Tailwind configuration
    /index.css           // Main CSS with @theme directive (Tailwind v4)

  /types                 // TypeScript type definitions
```

Each artifact is a self-contained component that demonstrates a specific Claude.ai capability, documented with:

- Concise description and goals
- Technical implementation details
- Results and sample output
- Code annotations and documentation

## 🎨 Tailwind CSS v4 Integration

This project uses Tailwind CSS v4 with several modern features:

- CSS-based configuration with `@theme inline` directive (no tailwind.config.js)
- OKLCH color space for improved color rendering
- The new `size-*` utility for width/height consistency
- Native CSS nesting and custom media queries
- Vite integration with `@tailwindcss/vite` plugin

ShadCN integration is configured via `components.json` with the "new-york" style preset.

## 🤝 Contributing

This project is a personal documentation space, but suggestions and ideas are welcome! Please note that this repository contains a mix of AI-generated content, creative adaptations, and curated snippets.

## 📝 License

This repository contains a mix of content with different origins. For my original contributions:

1. I waive all copyright and intellectual property rights, dedicating them to the public domain where possible.
2. Where public domain dedication isn't recognized, you may use my contributions under either:
   - MIT No Attribution (MIT-0) with Patent Grant, or
   - CC0 1.0 Universal Public Domain Dedication

For non-original content, the licensing status may vary. Please refer to the full [LICENSE.txt](LICENSE.txt) for complete details.
