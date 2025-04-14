import { Routes, Route } from 'react-router-dom';
import { ArtifactProvider } from '@/lib/ArtifactContext';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BreadcrumbNavigation } from '@/components/shared/breadcrumb-navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Suspense, lazy } from 'react';

// Import pages
import HomePage from '@/pages/home';
import ArtifactsPage from '@/pages/artifacts';
import ResearchPage from '@/pages/research';
import DemosPage from '@/pages/demos';

// Create a component loader with suspense fallback
function ArtifactLoadingSkeleton() {
  return (
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
}

// Import artifact components lazily
const artifactImports = import.meta.glob('./artifacts/**/v*/index.tsx', { eager: false });

// Group artifacts by name and version
function getArtifactName(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 3]; // Format: ./artifacts/name/v*/index.tsx
}

function getVersion(path: string): string {
  const match = path.match(/v(\d+)/);
  return match ? match[1] : '1';
}

// Create artifact routes
const artifactRoutes = Object.entries(artifactImports).map(([path, importFn]) => {
  const name = getArtifactName(path);
  const version = getVersion(path);
  const Component = lazy(importFn as any);

  return (
    <Route
      key={`${name}-v${version}`}
      path={`/artifacts/${name}/v${version}`}
      element={
        <Suspense fallback={<ArtifactLoadingSkeleton />}>
          <Component />
        </Suspense>
      }
    />
  );
});

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-auto p-6">
          <BreadcrumbNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artifacts" element={<ArtifactsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/demos" element={<DemosPage />} />
            {artifactRoutes}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
