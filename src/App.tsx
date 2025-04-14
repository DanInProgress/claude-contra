import { Routes, Route } from 'react-router-dom';
import { ArtifactProvider } from '@/lib/ArtifactContext';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BreadcrumbNavigation } from '@/components/shared/breadcrumb-navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { createArtifactRoute } from '@/components/ArtifactLoader';

// Import pages
import HomePage from '@/pages/home';
import ArtifactsPage from '@/pages/artifacts';
import ResearchPage from '@/pages/research';
import DemosPage from '@/pages/demos';

// Import artifact components lazily and generate routes
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

function App() {
  return (
    <ArtifactProvider>
      <TooltipProvider>
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
        <Toaster />
      </TooltipProvider>
    </ArtifactProvider>
  );
}

export default App;
