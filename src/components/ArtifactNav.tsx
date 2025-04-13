import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

const artifacts = [
  { name: 'Timer', path: '/timer', version: 'v1' },
  { name: 'Timer', path: '/timer.v2', version: 'v2' },
  { name: 'Counter', path: '/counter', version: 'v1' },
  { name: 'Binary Compare Swatch', path: '/binary-compare-swatch', version: 'v1' },
];

// Group artifacts by name
const artifactGroups = artifacts.reduce(
  (acc, artifact) => {
    if (!acc[artifact.name]) {
      acc[artifact.name] = [];
    }
    acc[artifact.name].push(artifact);
    return acc;
  },
  {} as Record<string, typeof artifacts>
);

export function ArtifactNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-background border-border fixed top-0 right-0 left-0 z-50 border-b p-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-4">
          {Object.entries(artifactGroups).map(([name, versions]) => (
            <div key={name} className="flex items-center gap-1">
              {versions.map(({ path, version }) => (
                <Button
                  key={path}
                  variant={currentPath === path ? 'default' : 'ghost'}
                  onClick={() => navigate(path)}
                  size="sm"
                >
                  {name}
                  <span className="ml-1 text-xs opacity-60">{version}</span>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
