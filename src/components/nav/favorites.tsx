import { ArrowUpRight, Link, MoreHorizontal, StarOff, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

// Define the artifact interface
interface ArtifactVersion {
  path: string;
  version: string;
}

interface Favorite {
  name: string;
  url: string;
  emoji: string | React.ReactNode;
  versions?: ArtifactVersion[];
}

export function NavFavorites({
  favorites,
  currentArtifact = null,
  currentVersion = null,
}: {
  favorites: Favorite[];
  currentArtifact?: string | null;
  currentVersion?: string | null;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Artifacts</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map((item) => {
          // Check if this is the currently active artifact
          const isActive =
            !!currentArtifact && item.name.toLowerCase().includes(currentArtifact.toLowerCase());

          // Check if this artifact has versions
          const hasVersions = !!(item.versions && item.versions.length > 1);

          return (
            <Collapsible key={item.name} defaultOpen={isActive && hasVersions}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive && !hasVersions}>
                  <a href={item.url} title={item.name}>
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>

                {/* Only show versions dropdown if multiple versions exist */}
                {hasVersions && (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction
                      className="bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                      showOnHover={!isActive}
                    >
                      <ChevronRight />
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                )}

                {/* Version dropdown */}
                {hasVersions && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.versions?.map((version) => (
                        <SidebarMenuSubItem key={version.version}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive && currentVersion === version.version}
                          >
                            <a href={version.path}>
                              <span className="text-sm opacity-60">{version.version}</span>
                              <span>{item.name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
