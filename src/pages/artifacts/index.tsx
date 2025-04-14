import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export function ArtifactsPage() {
  // Get artifact groups from the global window object
  const artifactGroups = window.artifactGroups || {};

  // Get actual artifact names that exist in the system
  const availableArtifacts = Object.keys(artifactGroups);

  // Filter categories to only include artifacts that actually exist
  const categories: Record<string, string[]> = {
    Interactive: ['Counter', 'Timer'].filter((name) => artifactGroups[name]),
    Visualization: ['Binary Compare Swatch'].filter((name) => artifactGroups[name]),
    All: availableArtifacts,
  };

  return (
    // Removed global padding, handled by layout
    <div className="max-w-4xl">
      {/* Using font-heading for H1 */}
      <h1 className="text-foreground mb-8 font-[--font-heading] text-3xl font-bold">
        ⊹ Let's create something
      </h1>
      <p className="text-muted-foreground mb-6">
        Browse these examples to see what's possible when we work together. Each artifact shows a
        different way I can help.
      </p>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList>
          {Object.keys(categories).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category} ({categories[category].length})
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categories).map(([category, artifactNames]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artifactNames.map((name) => {
                // Skip if this artifact doesn't exist (though our filter above should prevent this)
                if (!artifactGroups[name]) return null;

                const { versions } = artifactGroups[name];
                return (
                  // Applying consistent card styles
                  <div
                    key={name}
                    className="border-border bg-card rounded-lg border p-6 shadow-[--shadow]"
                  >
                    {/* Using font-heading for H2 */}
                    <h2 className="text-card-foreground mb-3 font-[--font-heading] text-xl font-semibold">
                      ⊹{' '}
                      {name === 'Counter'
                        ? 'Click Counter'
                        : name === 'Timer'
                          ? 'Time Tracker'
                          : name}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {name === 'Counter'
                        ? 'Count on me. A simple yet satisfying way to keep track of numbers that matter to you.'
                        : name === 'Timer'
                          ? 'Every second counts. A clean, intuitive timer for when you need to measure the moments.'
                          : `A helpful ${name.toLowerCase()} to make your experience better.`}
                    </p>
                    <div className="space-y-2">
                      {versions.map(({ path, version }) => (
                        <Link
                          key={version}
                          to={path}
                          className="bg-primary/10 text-primary-foreground hover:bg-primary/20 inline-block rounded-md border border-transparent px-3 py-1 text-sm font-medium"
                        >
                          {version}
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

export default ArtifactsPage;
