# Artifacts Directory

This directory contains all Claude-generated artifacts used in the project. Each artifact is automatically protected by an error boundary to ensure one problematic artifact won't crash the entire application.

## Directory Structure

Artifacts follow this organization pattern:

```
artifacts/
├── artifact-name/
│   ├── v1/
│   │   └── index.tsx      # First version of the artifact
│   └── v2/
│       └── index.tsx      # Second version of the artifact
└── another-artifact/
    └── v1/
        └── index.tsx
```

## Creating New Artifacts

1. Create a new directory for your artifact under `src/artifacts/` (use kebab-case)
2. Create a version subdirectory (start with `v1`)
3. Create an `index.tsx` file with your component

## Error Handling

All artifacts are automatically wrapped with error boundaries. You don't need to manually add error handling - the system handles it automatically. However, there are a few best practices:

### Best Practices

1. **Validate incoming data** - Check that props and state exist before using them
2. **Use conditional rendering** - Add null checks before rendering
3. **Add try/catch blocks** - For event handlers and API calls (error boundaries won't catch these)
4. **Use the artifact state system** - For persistent data across renders

### Example with Built-in Error Handling

```tsx
import { useArtifactState } from '@/lib/ArtifactContext';
import { Button } from '@/components/ui/button';

export default function MyArtifact() {
  // Use artifact state to maintain data across renders
  const [state, setState] = useArtifactState('my-artifact', {
    count: 0
  });
  
  // Handle events with try/catch (error boundaries won't catch these)
  const handleClick = () => {
    try {
      setState({ count: state.count + 1 });
    } catch (error) {
      console.error('Error in click handler:', error);
    }
  };
  
  return (
    <div>
      {/* Use conditional rendering for safety */}
      <p>Count: {state?.count ?? 0}</p>
      <Button onClick={handleClick}>Increment</Button>
    </div>
  );
}
```

## Testing Error Boundaries

To test the error boundary system, you can intentionally trigger an error:

```tsx
const triggerError = () => {
  // This will cause an error that gets caught by the boundary
  const undefinedObject: any = undefined;
  undefinedObject.someProperty.anotherProperty;
};

// Add a button to trigger the error
<Button onClick={triggerError} variant="destructive">
  Test Error Boundary
</Button>
```

## Importing from other Artifacts

When importing code from other artifacts, be aware that dynamic imports with path aliases (like `@/`) may not work correctly. Use relative imports instead.

## Further Documentation

For more details on the error boundary system, see the [error boundaries documentation](../docs/error-boundaries.md). 