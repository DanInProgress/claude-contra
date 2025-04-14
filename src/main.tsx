// Move these declarations to the top of the file
// Define the artifact group types
import { ArtifactGroup, ArtifactVersion } from '@/types/artifacts';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ArtifactProvider } from '@/lib/ArtifactContext';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import App from './App';
import '@/styles/index.css';

// Import all artifact files (using the new versioned structure)
const artifactImports = import.meta.glob('./artifacts/**/v*/index.tsx', { eager: false });

// Helper to get artifact name from path
function getArtifactName(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 3]; // Format: ./artifacts/name/v*/index.tsx
}

// Helper to get version from path
function getVersion(path: string): string {
  const match = path.match(/v(\d+)/);
  return match ? match[1] : '1';
}

// Group artifacts by name and version
const artifactGroups = Object.entries(artifactImports).reduce(
  (acc, [path, importFn]) => {
    const name = getArtifactName(path);
    const version = getVersion(path);
    const isVersioned = true; // All artifacts should be versioned now

    if (!acc[name]) {
      acc[name] = {
        versions: [],
        isVersioned,
      };
    }

    acc[name].versions.push({
      path: `/artifacts/${name}/v${version}`,
      version: `v${version}`,
      importFn,
    });

    // Sort versions in descending order
    acc[name].versions.sort((a, b) => parseInt(b.version.slice(1)) - parseInt(a.version.slice(1)));

    return acc;
  },
  {} as Record<string, ArtifactGroup>
);

// Make artifactGroups available globally for the sidebar
if (typeof window !== 'undefined') {
  window.artifactGroups = artifactGroups;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ArtifactProvider>
        <TooltipProvider>
          <App />
          <Toaster />
        </TooltipProvider>
      </ArtifactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
