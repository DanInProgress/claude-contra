export interface ArtifactVersion {
  path: string;
  version: string;
  importFn: () => Promise<any>;
}

export interface ArtifactGroup {
  versions: ArtifactVersion[];
  isVersioned: boolean;
}

// Extend the Window interface for the global artifactGroups object
declare global {
  interface Window {
    artifactGroups: Record<string, ArtifactGroup>;
  }
}
