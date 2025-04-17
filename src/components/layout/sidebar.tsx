import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, Sparkles, Microscope, FlaskConical, ChevronRight } from 'lucide-react';

// Define types for artifacts
interface ArtifactVersion {
  path: string;
  version: string;
}

interface ArtifactGroup {
  versions: ArtifactVersion[];
  isVersioned: boolean;
}

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  // Get artifacts from the window object
  const artifactGroups: Record<string, ArtifactGroup> =
    typeof window !== 'undefined' ? window.artifactGroups || {} : {};

  // Check if we're in the artifacts section
  const isArtifactsRoute = pathname.startsWith('/artifacts');

  // Get the current artifact name if we're on an artifact page
  const currentArtifactName = isArtifactsRoute ? pathname.split('/')[2] : '';

  // Main navigation items
  const mainNavItems = [
    {
      title: 'Home',
      href: '/',
      icon: Home,
    },
    {
      title: 'Creative Space',
      href: '/artifacts',
      icon: Sparkles,
    },
    {
      title: 'Research',
      href: '/research',
      icon: Microscope,
    },
    {
      title: 'Demos',
      href: '/demos',
      icon: FlaskConical,
    },
  ];

  return (
    <div className="bg-background flex size-full h-screen max-w-60 min-w-14 flex-col border-r p-4">
      <div className="flex items-center gap-2 px-2">
        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
          <span className="text-primary-foreground text-xs font-bold">CC</span>
        </div>
        <span className="text-lg font-semibold">Claude Contra</span>
      </div>

      <Separator className="my-4" />

      <nav className="flex flex-1 flex-col">
        <div className="flex flex-col gap-1">
          {mainNavItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                className={cn('justify-start', isActive && 'font-medium')}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="mr-2 size-4" />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Show artifacts list when in artifacts section */}
        {isArtifactsRoute && Object.keys(artifactGroups).length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="text-muted-foreground mb-2 px-2 text-xs font-medium">Artifacts</div>
            <div className="flex flex-col gap-1">
              {Object.entries(artifactGroups).map(([name, group]) => {
                const isActive = name.toLowerCase() === currentArtifactName?.toLowerCase();
                const firstVersionPath = group.versions[0]?.path;

                return (
                  <Button
                    key={name}
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn('justify-between', isActive && 'font-medium')}
                    asChild
                  >
                    <Link to={firstVersionPath}>
                      <span>{name}</span>
                      {group.versions.length > 1 && <ChevronRight className="size-4" />}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </>
        )}

        {/* Show versions when viewing a specific artifact */}
        {isArtifactsRoute && currentArtifactName && artifactGroups[currentArtifactName] && (
          <>
            <Separator className="my-4" />
            <div className="text-muted-foreground mb-2 px-2 text-xs font-medium">Versions</div>
            <div className="flex flex-col gap-1">
              {artifactGroups[currentArtifactName].versions.map((version) => {
                const isActive = pathname === version.path;

                return (
                  <Button
                    key={version.path}
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn('justify-start', isActive && 'font-medium')}
                    asChild
                  >
                    <Link to={version.path}>{version.version}</Link>
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </nav>

      <div className="mt-auto">
        <Separator className="my-4" />
        <div className="flex flex-col gap-1">
          <div className="px-2 py-1.5">
            <p className="text-muted-foreground text-xs">
              <span className="font-medium">Claude Contra</span> — v0.1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
