// Move these declarations to the top of the file
// Define the artifact group types
interface ArtifactVersion {
  path: string;
  version: string;
  importFn: () => Promise<any>;
}

interface ArtifactGroup {
  versions: ArtifactVersion[];
  isVersioned: boolean;
}

// Extend the Window interface
declare global {
  interface Window {
    artifactGroups: Record<string, ArtifactGroup>;
  }
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ArtifactProvider } from './lib/ArtifactContext';
import { Skeleton } from './components/ui/skeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './components/ui/breadcrumb';
import { Toaster } from './components/ui/sonner';
import { SidebarProvider, SidebarInset } from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import './index.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

// Import all artifact files
const versionedArtifacts = import.meta.glob('./artifacts/**/index.tsx', { eager: false });
const legacyArtifacts = import.meta.glob('./artifacts/*.tsx', { eager: false });

// Helper to get artifact name from path
function getArtifactName(path: string): string {
  const baseName = path.split('/').pop()?.replace('.tsx', '') || '';
  return baseName.split('.')[0];
}

// Helper to get version from path
function getVersion(path: string): string {
  const match = path.match(/v(\d+)/);
  return match ? match[1] : '1';
}

// Group artifacts by name and version
const artifactGroups = Object.entries({
  ...versionedArtifacts,
  ...legacyArtifacts,
}).reduce(
  (acc, [path, importFn]) => {
    const name = getArtifactName(path);
    const version = getVersion(path);
    const isVersioned = path.includes('/v');

    if (!acc[name]) {
      acc[name] = {
        versions: [],
        isVersioned,
      };
    }

    acc[name].versions.push({
      path: isVersioned ? `/artifacts/${name}/v${version}` : `/artifacts/${name}`,
      version: `v${version}`,
      importFn,
    });

    // Sort versions in descending order
    acc[name].versions.sort((a, b) => parseInt(b.version.slice(1)) - parseInt(a.version.slice(1)));

    return acc;
  },
  {} as Record<
    string,
    {
      versions: Array<{
        path: string;
        version: string;
        importFn: () => Promise<any>;
      }>;
      isVersioned: boolean;
    }
  >
);

// Make artifactGroups available globally for the sidebar
if (typeof window !== 'undefined') {
  window.artifactGroups = artifactGroups;
}

// Breadcrumb navigation component
function BreadcrumbNavigation() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Only show breadcrumbs if we're not on the home page
  if (pathSegments.length === 0) return null;
  
  // Generate breadcrumb items from path segments
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      
      {pathSegments.map((segment, index) => {
        // Skip rendering "v1", "v2" etc. as separate breadcrumb items
        if (segment.startsWith('v') && !isNaN(parseInt(segment.substring(1)))) {
          return null;
        }
        
        const isLast = index === pathSegments.length - 1 || 
          (index === pathSegments.length - 2 && pathSegments[index + 1].startsWith('v'));
        
        // Build the href by joining segments up to the current one
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        
        // Capitalize the segment and replace hyphens with spaces
        const displayText = segment.charAt(0).toUpperCase() + 
          segment.slice(1).replace(/-/g, ' ');
          
        // Add the version to the last item if applicable
        let versionText = '';
        if (isLast && index + 1 < pathSegments.length && pathSegments[index + 1].startsWith('v')) {
          versionText = ` (${pathSegments[index + 1]})`;
        }
        
        return (
          <React.Fragment key={segment}>
            {isLast ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{displayText}{versionText}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
}

// Artifact loading skeleton component
function ArtifactLoadingSkeleton() {
  return (
    <div className="space-y-4 p-10">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="mt-8 space-y-3">
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
}

function RootWelcomePage() {
  return (
    // Removed min-h-screen and global padding, handled by layout
    <div className="max-w-7xl">
      <div className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">⊹ Back at it!</h2>
        {/* Using font-heading for H1 */}
        <h1 className="mb-10 text-4xl font-bold font-[--font-heading] text-foreground">Hello there. I'm Claude, ready to help with your questions, creative projects, or just a good conversation.</h1>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-[--shadow]">
          {/* Using font-heading for H2 */}
          <h2 className="mb-4 text-2xl font-semibold font-[--font-heading] text-card-foreground">⊹ Creative Space</h2>
          <p className="mb-6 text-muted-foreground">
            Check out these interactive examples to see what's possible when we collaborate. What would you like to make today?
          </p>
          <Link
            to="/artifacts"
            // Applying consistent button styles
            className="inline-flex items-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-accent/90 active:scale-95"
          >
            Let's create
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-[--shadow]">
           {/* Using font-heading for H2 */}
          <h2 className="mb-4 text-2xl font-semibold font-[--font-heading] text-card-foreground">⊹ Helpful Hints</h2>
          <p className="mb-6 text-muted-foreground">
            Learn simple ways to make our conversations more productive, with tips for clear communication and better results.
          </p>
        </div>
      </div>
    </div>
  );
}

function ArtifactsWelcomePage() {
  // Group artifacts by category with proper type
  const categories: Record<string, string[]> = {
    "Interactive": ["Counter", "Timer"],
    "Visualization": ["Binary Compare Swatch"],
    "All": Object.keys(artifactGroups)
  };

  return (
    // Removed global padding, handled by layout
    <div className="max-w-4xl">
       {/* Using font-heading for H1 */}
      <h1 className="mb-8 text-3xl font-bold font-[--font-heading] text-foreground">⊹ Let's create something</h1>
      <p className="mb-6 text-muted-foreground">Browse these examples to see what's possible when we work together. Each artifact shows a different way I can help.</p>
      
      <Tabs defaultValue="All" className="mb-8">
        <TabsList>
          {Object.keys(categories).map(category => (
            <TabsTrigger key={category} value={category}>
              {category} ({categories[category].length})
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.entries(categories).map(([category, artifactNames]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artifactNames.map(name => {
                const { versions } = artifactGroups[name];
                return (
                  // Applying consistent card styles
                  <div key={name} className="rounded-lg border border-border bg-card p-6 shadow-[--shadow]">
                     {/* Using font-heading for H2 */}
                    <h2 className="mb-3 text-xl font-semibold font-[--font-heading] text-card-foreground">⊹ {name === "Counter" ? "Click Counter" : name === "Timer" ? "Time Tracker" : name}</h2>
                    <p className="mb-4 text-muted-foreground">
                      {name === "Counter"
                        ? "Count on me. A simple yet satisfying way to keep track of numbers that matter to you."
                        : name === "Timer"
                          ? "Every second counts. A clean, intuitive timer for when you need to measure the moments."
                          : `A helpful ${name.toLowerCase()} to make your experience better.`}
                    </p>
                    <div className="space-y-2">
                      {versions.map(({ path, version }) => (
                        <Link
                          key={path}
                          to={path}
                          className="flex items-center text-sm text-primary hover:text-primary/80 hover:underline font-medium transition-colors duration-150 active:scale-95"
                        >
                          <span className="mr-1">→</span> Try {version}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// Placeholder components for future routes
function ResearchPage() { 
  return <div className="max-w-4xl">
    <h1 className="mb-8 text-3xl font-bold font-[--font-heading] text-foreground">⊹ Research Findings</h1>
    <p className="text-muted-foreground">Insights and analysis coming soon. We're carefully reviewing the data!</p>
  </div>; 
}

function DemosPage() { 
  return <div className="max-w-4xl">
    <h1 className="mb-8 text-3xl font-bold font-[--font-heading] text-foreground">⊹ Cheeky Demos</h1>
    <p className="text-muted-foreground">Interactive experiments are being calibrated. Prepare for gentle amusement.</p>
  </div>; 
}

// Main App component using the new sidebar component
function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="p-6 lg:p-8">
            <BreadcrumbNavigation />
            <Routes>
              <Route path="/" element={<RootWelcomePage />} />
              <Route path="/artifacts" element={<ArtifactsWelcomePage />} />
              <Route path="/research" element={<ResearchPage />} /> 
              <Route path="/demos" element={<DemosPage />} /> 
              {/* Dynamically create routes for each artifact version using lazy loading */}
              {Object.values(artifactGroups)
                .flatMap(({ versions }) => versions)
                .map(({ path, importFn }) => {
                  // Use React.lazy for dynamic imports
                  const LazyComponent = React.lazy(() => 
                    importFn().then((module) => ({ default: module.default }))
                  );
                  return (
                    <Route 
                      key={path} 
                      path={path} 
                      element={
                        // Wrap lazy component in Suspense with improved loading skeleton
                        <React.Suspense fallback={<ArtifactLoadingSkeleton />}>
                          <LazyComponent />
                        </React.Suspense>
                      }
                    />
                  );
                })}
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ArtifactProvider>
      <App />
      <Toaster />
    </ArtifactProvider>
  </React.StrictMode>,
);
