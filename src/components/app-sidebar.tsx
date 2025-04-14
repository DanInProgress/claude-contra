import * as React from "react"
import {
  Home,
  MessageCircleQuestion,
  Settings2,
  Sparkles,
  FileText,
  FlaskConical,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Define types for our artifacts
interface ArtifactVersion {
  path: string;
  version: string;
  importFn: () => Promise<any>;
}

interface ArtifactGroup {
  versions: ArtifactVersion[];
  isVersioned: boolean;
}

// Get artifacts from the window object (populated in main.tsx)
declare global {
  interface Window {
    artifactGroups: Record<string, ArtifactGroup>;
  }
}

// Helper function to get appropriate icon for artifact type
function getArtifactIcon(name: string): string {
  const iconMap: Record<string, string> = {
    "Counter": "🔢",
    "Timer": "⏱️",
    "Binary Compare Swatch": "🔀",
    // Add more as needed
  };
  
  return iconMap[name] || "⊹";
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const currentPath = location.pathname;
  const artifactGroups = window.artifactGroups || {};
  
  // Determine if we're currently viewing an artifact
  const isViewingArtifact = currentPath.includes('/artifacts/');
  
  // Get current artifact and version if we're viewing one
  let currentArtifact: string | null = null;
  let currentVersion: string | null = null;
  
  if (isViewingArtifact) {
    const pathParts = currentPath.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      currentArtifact = pathParts[1];
      if (pathParts.length >= 3 && pathParts[2].startsWith('v')) {
        currentVersion = pathParts[2];
      }
    }
  }
  
  // Convert artifacts to favorites format
  const artifactFavorites = Object.entries(artifactGroups).map(([name, artifact]) => ({
    name: name === "Counter" ? "Click Counter" : 
          name === "Timer" ? "Time Tracker" : 
          name === "Binary Compare Swatch" ? "Color Compare" : name,
    url: artifact.versions[0].path, // Link to the latest version
    emoji: getArtifactIcon(name),
    versions: artifact.versions,
  }));
  
  // Main navigation items
  const navMain = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: currentPath === "/"
    },
    {
      title: "Creative Space",
      url: "/artifacts",
      icon: Sparkles,
      isActive: currentPath === "/artifacts" || isViewingArtifact
    },
    {
      title: "Research Findings",
      url: "/research",
      icon: FileText,
      isActive: currentPath === "/research"
    },
    {
      title: "Cheeky Demos",
      url: "/demos",
      icon: FlaskConical,
      isActive: currentPath === "/demos"
    },
  ];
  
  // Helper navigation items
  const navSecondary = [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ];
  
  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader>
        <div className="p-2">
          <Link to="/" className="flex items-center gap-2 p-2 text-xl font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">C</div>
            <span className="font-[--font-heading]">Claude Contra</span>
          </Link>
        </div>
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* Only show artifacts when we're in the artifacts section */}
        {(currentPath === "/artifacts" || isViewingArtifact) && (
          <NavFavorites favorites={artifactFavorites} currentArtifact={currentArtifact} currentVersion={currentVersion} />
        )}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
