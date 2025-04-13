import { useArtifactState } from '@/lib/ArtifactContext';
import { Button } from '@/components/ui/button';

export default function Counter() {
  const [count, setCount] = useArtifactState('counter', 0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Counter Artifact</h1>
        <p className="mb-4 text-xl">Count: {count}</p>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={() => setCount(count - 1)}>
            Decrement
          </Button>
          <Button variant="default" onClick={() => setCount(count + 1)}>
            Increment
          </Button>
        </div>
      </div>
    </div>
  );
}
