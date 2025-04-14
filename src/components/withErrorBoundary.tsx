import React, { ComponentType } from 'react';
import { ArtifactErrorBoundary } from './ArtifactErrorBoundary';

/**
 * A higher-order component that wraps the provided component with an ArtifactErrorBoundary.
 * 
 * NOTE: This HOC is primarily for manual wrapping of components. Artifact components loaded
 * through the router are automatically wrapped with error boundaries by the ArtifactLoader system.
 * 
 * Use this HOC only in special cases where you need to manually wrap a component that is not
 * being loaded through the standard artifact routing system.
 * 
 * @param Component - The component to wrap
 * @param artifactId - The ID of the artifact for error reporting
 * @returns A wrapped component with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  artifactId: string
): React.FC<P> {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WrappedComponent: React.FC<P> = (props) => (
    <ArtifactErrorBoundary artifactId={artifactId}>
      <Component {...props} />
    </ArtifactErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;
  
  return WrappedComponent;
} 