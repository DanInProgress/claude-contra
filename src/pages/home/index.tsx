import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    // Removed min-h-screen and global padding, handled by layout
    <div className="max-w-7xl">
      <div className="mb-8">
        <h2 className="text-muted-foreground mb-2 text-sm font-medium">⊹ Back at it!</h2>
        {/* Using font-heading for H1 */}
        <h1 className="text-foreground mb-10 font-[--font-heading] text-4xl font-bold">
          Hello there. I'm Claude, ready to help with your questions, creative projects, or just a
          good conversation.
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="border-border bg-card rounded-lg border p-6 shadow-[--shadow]">
          {/* Using font-heading for H2 */}
          <h2 className="text-card-foreground mb-4 font-[--font-heading] text-2xl font-semibold">
            ⊹ Creative Space
          </h2>
          <p className="text-muted-foreground mb-6">
            Check out these interactive examples to see what's possible when we collaborate. What
            would you like to make today?
          </p>
          <Link
            to="/artifacts"
            // Applying consistent button styles
            className="bg-accent hover:bg-accent/90 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 active:scale-95"
          >
            Let's create
          </Link>
        </div>
        <div className="border-border bg-card rounded-lg border p-6 shadow-[--shadow]">
          {/* Using font-heading for H2 */}
          <h2 className="text-card-foreground mb-4 font-[--font-heading] text-2xl font-semibold">
            ⊹ Helpful Hints
          </h2>
          <p className="text-muted-foreground mb-6">
            Learn simple ways to make our conversations more productive, with tips for clear
            communication and better results.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
