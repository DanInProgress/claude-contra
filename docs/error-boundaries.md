# Error Boundary System for Claude Artifacts

This document explains how the error boundary system works in the Claude Contra project, particularly for handling errors in AI-generated artifacts.

## Overview

The project implements a robust error boundary system that automatically isolates failures in AI-generated artifact components, preventing the entire application from crashing when a single artifact has an error.

## Key Components

### 1. ArtifactErrorBoundary

The core error boundary component (`src/components/ArtifactErrorBoundary.tsx`) is a class component that:

- Catches render/lifecycle errors within its child component tree
- Shows a user-friendly error message with details
- Provides an option to reload the page
- Preserves the rest of the application's functionality
- Shows the specific artifact name/version with the error

### 2. ArtifactLoader System

The `ArtifactLoader` system (`src/components/ArtifactLoader.tsx`) automatically wraps all dynamically loaded artifacts with error boundaries:

- Handles dynamic imports for artifact components
- Wraps each artifact with the appropriate error boundary
- Provides loading states with Suspense
- Creates route configurations with error handling built-in

### 3. Route Generation

The App component uses the `createArtifactRoute` helper to generate routes that automatically include error boundaries for each artifact:

```tsx
// Generate artifact routes with automatic error boundaries
const artifactRoutes = Object.entries(artifactImports).map(([path, importFn]) => {
  const routeConfig = createArtifactRoute(path, importFn);
  return (
    <Route
      key={routeConfig.key}
      path={`/artifacts/${routeConfig.path}`}
      element={routeConfig.element}
    />
  );
});
```

## How It Works

1. **Automatic Protection**: All artifacts loaded through the routing system are automatically wrapped with error boundaries
2. **Isolation**: Errors in one artifact don't affect others or the main application
3. **Detailed Reporting**: Error messages include stack traces to help debug issues
4. **Graceful Recovery**: Users can reload or navigate away from problematic artifacts

## Testing the System

The Counter v1 artifact includes a "Trigger Error" button that intentionally causes a runtime error. When clicked:

1. The error is caught by the error boundary
2. An error card is displayed with details
3. The rest of the application continues to function

## Manual Error Boundary Usage

For components not loaded through the router, you can use the `withErrorBoundary` HOC:

```tsx
import { withErrorBoundary } from '@/components/withErrorBoundary';

function MyComponent() {
  // Component implementation
}

export default withErrorBoundary(MyComponent, 'my-component');
```

However, this is rarely needed since the routing system handles most cases automatically.

## Benefits for Claude-Generated Artifacts

This system is particularly valuable when dealing with Claude-generated artifacts:

1. **Resilience**: Handles unexpected issues in generated code
2. **Debugging**: Provides clear error information for fixing issues
3. **Isolation**: Prevents one problematic artifact from affecting others
4. **User Experience**: Maintains overall application usability despite errors

## Architecture Decisions

1. We use class components for error boundaries because React doesn't yet fully support error boundaries in functional components
2. The automatic wrapping approach removes the need to manually add error handling to each artifact
3. The artifactId naming convention helps identify which specific version of an artifact has an issue 