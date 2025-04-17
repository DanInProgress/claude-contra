import React, { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { ArtifactErrorBoundary } from './ArtifactErrorBoundary';

// Loading fallback component
const ArtifactLoadingSkeleton = () => (
  <div className="space-y-4 p-10">
    <div className="bg-muted h-8 w-3/4 animate-pulse"></div>
    <div className="bg-muted h-4 w-1/2 animate-pulse"></div>
    <div className="mt-8 space-y-3">
      <div className="bg-muted h-32 w-full animate-pulse rounded-lg"></div>
      <div className="flex gap-2">
        <div className="bg-muted h-10 w-20 animate-pulse"></div>
        <div className="bg-muted h-10 w-20 animate-pulse"></div>
      </div>
    </div>
  </div>
);

interface ArtifactLoaderProps {
  artifactId: string;
  importFn: () => Promise<any>;
}

/**
 * A component that dynamically loads an artifact and wraps it with error boundary
 */
export const ArtifactLoader: React.FC<ArtifactLoaderProps> = ({ importFn, artifactId }) => {
  // Get location to force remounting when URL changes
  const location = useLocation();
  
  // Create lazy component inline
  const ArtifactComponent = lazy(importFn);
  
  // The key on the Fragment forces a complete remount when the URL changes
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

/**
 * Helper function to get version from path
 */
export function getVersionFromPath(path: string): string {
  const match = path.match(/v(\d+)/);
  return match ? match[1] : '1';
}

/**
 * Helper function to get artifact name from path
 */
export function getArtifactNameFromPath(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 3]; // Format: ./artifacts/name/v*/index.tsx
}

/**
 * Creates a route component with proper error boundaries
 */
export function createArtifactRoute(path: string, importFn: () => Promise<any>): {
  path: string;
  element: React.ReactElement;
  key: string;
} {
  const name = getArtifactNameFromPath(path);
  const version = getVersionFromPath(path);
  const artifactId = `${name}.v${version}`;
  
  return {
    path: `${name}/v${version}`,
    key: artifactId,
    element: <ArtifactLoader artifactId={artifactId} importFn={importFn} />
  };
} 