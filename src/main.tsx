import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link, Outlet, useLocation } from 'react-router-dom';
import { ArtifactProvider } from './lib/ArtifactContext';
import './index.css';

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

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
}

function VersionDropdown({
  name,
  versions,
}: {
  name: string;
  versions: Array<{
    path: string;
    version: string;
  }>;
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${
          versions.some((v) => location.pathname === v.path)
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        {name}
        <span className="ml-1 text-xs opacity-60">
          {versions.find((v) => location.pathname === v.path)?.version || versions[0].version}
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 rounded-md bg-white shadow-lg">
          {versions.map(({ path, version }) => (
            <NavLink key={path} to={path}>
              {version}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function RootWelcomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">Welcome to Claude Contra</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Artifacts</h2>
            <p className="mb-4 text-gray-600">
              A collection of interactive components and experiments.
            </p>
            <Link
              to="/artifacts"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              View Artifacts
            </Link>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Coming Soon</h2>
            <p className="mb-4 text-gray-600">More sections and features will be added here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArtifactsWelcomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Artifact Gallery</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(artifactGroups).map(([name, { versions }]) => (
          <div key={name} className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">{name}</h2>
            <div className="space-y-2">
              {versions.map(({ path, version }) => (
                <Link
                  key={path}
                  to={path}
                  className="block text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {version}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtifactsLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/artifacts">Artifacts</NavLink>
            </div>
            <div className="flex space-x-4">
              {Object.entries(artifactGroups).map(([name, { versions, isVersioned }]) => (
                <div key={name} className="flex items-center space-x-1">
                  {isVersioned ? (
                    <VersionDropdown name={name} versions={versions} />
                  ) : (
                    <NavLink to={versions[0].path}>{name}</NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

// Create routes from artifacts
const artifactRoutes = Object.entries(artifactGroups).flatMap(([_, { versions }]) =>
  versions.map(({ path, importFn }) => {
    const LazyComponent = React.lazy(() =>
      importFn().then((mod) => ({
        default: (mod as any).default,
      }))
    );

    return {
      path: path.replace('/artifacts/', ''), // Remove /artifacts/ prefix for router
      element: (
        <React.Suspense
          fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}
        >
          <LazyComponent />
        </React.Suspense>
      ),
    };
  })
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootWelcomePage />,
  },
  {
    path: '/artifacts',
    element: <ArtifactsLayout />,
    children: [
      {
        index: true,
        element: <ArtifactsWelcomePage />,
      },
      ...artifactRoutes,
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ArtifactProvider>
      <RouterProvider router={router} />
    </ArtifactProvider>
  </React.StrictMode>
);
