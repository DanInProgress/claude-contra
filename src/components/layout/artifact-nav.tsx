import { useNavigate, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from './ui/navigation-menu';

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

  const handleNavigate = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="bg-background border-border fixed top-0 right-0 left-0 z-50 border-b">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <NavigationMenu>
          <NavigationMenuList>
            {Object.entries(artifactGroups).map(([name, versions]) => (
              <NavigationMenuItem key={name} className="flex items-center gap-1">
                {versions.map(({ path, version }) => (
                  <NavigationMenuLink
                    key={path}
                    href={path}
                    onClick={handleNavigate(path)}
                    className="rounded-md px-4 py-2"
                    data-active={currentPath === path}
                  >
                    {name}
                    <span className="ml-1 text-xs opacity-60">Try {version}</span>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
