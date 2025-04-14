# Artifact Loading System

This document explains the simplified architecture of the artifact loading system in Claude Contra.

## Overview

The artifact loading system provides a robust mechanism for:

1. Dynamically discovering and loading artifact components
2. Isolating errors to prevent application crashes
3. Supporting versioned artifacts
4. Facilitating navigation between artifacts
5. Displaying appropriate loading states
6. Managing isolated state per artifact

## Requirements

1. **Dynamic Artifact Discovery**
   - System automatically discovers artifact components in the codebase (e.g. `./artifacts/[artifact-name]/v[version]/index.tsx`)
   - Each artifact is identified by an artifactId (e.g. `timer.v1`)
   - Each discovered artifact is mapped to a corresponding route
   - Each artifact is a single React component (default export from index.tsx)

2. **Error Handling**
   - All artifacts are wrapped in error boundaries
   - Error boundaries catch rendering errors and prevent app crashes
   - Errors are isolated to specific artifactIds
   - Navigation away from errored artifacts is possible

3. **Navigation**
   - Users can navigate between artifacts via sidebar
   - Users can select different versions of artifacts
   - Selected version persists between navigations
   - UI displays the selected artifactId (e.g. `timer.v1`)

4. **Lazy Loading**
   - Artifacts are loaded lazily for performance
   - Loading states are displayed during loading
   - React Suspense handles async loading

5. **Versioning Support**
   - Multiple versions are supported (v1, v2, etc.)
   - Each version has its own route
   - Error states are isolated between versions
   - Navigation between versions is supported

6. **State Management**
   - State is isolated per artifactId
   - State persists during navigation
   - Error state persists consistently with regular state
   - Refreshing the page resets state

## Architecture

The system consists of three main components:

```
App.tsx
  ↓ (discovers artifacts via import.meta.glob)
  createArtifactRoute()
    ↓ (creates routes)
    ArtifactLoader
      ↓ (forces remount via URL path key)
      ArtifactErrorBoundary
        ↓ (catches errors)
        Lazy-loaded Artifact Component
```

### Discovery Process

Artifacts are discovered using Vite's glob import:

```tsx
// In App.tsx
const artifactRoutes = Object.entries(
  import.meta.glob('./artifacts/**/v*/index.tsx', { eager: false })
).map(([path, importFn]) => {
  const route = createArtifactRoute(path, importFn);
  return (
    <Route
      key={route.key}
      path={`/artifacts/${route.path}`}
      element={route.element}
    />
  );
});
```

## Key Components

### ArtifactLoader

Handles lazy loading and remounting:

```tsx
export const ArtifactLoader: React.FC<ArtifactLoaderProps> = ({ importFn, artifactId }) => {
  const location = useLocation();
  const ArtifactComponent = lazy(importFn);
  
  return (
    <React.Fragment key={`artifact-${location.pathname}`}>
      <ArtifactErrorBoundary artifactId={artifactId}>
        <Suspense fallback={<ArtifactLoadingSkeleton />}>
          <ArtifactComponent />
        </Suspense>
      </ArtifactErrorBoundary>
    </React.Fragment>
  );
};
```

### ArtifactErrorBoundary

Provides error isolation:

```tsx
export class ArtifactErrorBoundary extends Component<Props, State> {
  // Handle errors
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }
  
  // Reset error state when artifactId changes
  public componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.artifactId !== this.props.artifactId) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
    }
  }
  
  // Render either error UI or children
  public render() {
    if (this.state.hasError) {
      // Error display
      return <ErrorDisplay error={this.state.error} artifactId={this.props.artifactId} />;
    }
    return this.props.children;
  }
}
```

### ArtifactContext

Manages isolated state per artifact:

```tsx
export function useArtifactState<T>(artifactId: string, initialState: T): [T, (state: T) => void] {
  const context = useContext(ArtifactContext);
  const currentState = (context.state[artifactId] ?? initialState) as T;
  const setState = (newState: T) => context.setState(artifactId, newState);
  return [currentState, setState];
}
```

## Key Implementation Details

### URL-Based Remounting

The system uses URL path as a React key to force remounting:

```tsx
<React.Fragment key={`artifact-${location.pathname}`}>
  {/* Component tree */}
</React.Fragment>
```

This approach ensures:
- Each URL path gets a fresh component instance
- Error states don't persist between different artifacts
- State is properly reset when navigating to a different artifact

## Best Practices

1. **Path-based Remounting**: Always maintain the location-based key in ArtifactLoader
2. **Error Isolation**: Keep the error boundary between the URL key and the lazy-loaded component
3. **Component Hierarchy**: Maintain the Fragment → ErrorBoundary → Suspense → Component pattern
4. **State Isolation**: Use useArtifactState hook with the correct artifactId

## Requirements Fulfilled

The system addresses all the core requirements:

- **Dynamic Discovery**: Automatically finds all artifact components
- **Error Handling**: Isolates errors to specific artifacts with user-friendly messages
- **Navigation**: Supports moving between artifacts and versions without page reloads
- **Lazy Loading**: Improves performance and provides loading states 
- **Versioning**: Treats each version as a separate artifact with its own route
- **State Management**: Isolates state on a per-artifact basis 