import { useArtifactState } from '@/lib/ArtifactContext';
import { Button } from '@/components/ui/button';

interface CounterState {
  count: number;
}

export default function CounterV1() {
  const [counterState, setCounterState] = useArtifactState<CounterState>('counter-v1', {
    count: 0,
  });

  const increment = () => {
    setCounterState({
      count: counterState.count + 1,
    });
  };

  const decrement = () => {
    setCounterState({
      count: counterState.count - 1,
    });
  };

  const reset = () => {
    setCounterState({
      count: 0,
    });
  };

  // For demo purposes, include a button that will trigger an error
  const triggerError = () => {
    // This will cause a type error because we're trying to access a property of undefined
    const undefinedObject: any = undefined;
    undefinedObject.someProperty.anotherProperty;
  };

  return (
    <div className="bg-background font-primary flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
      <div className="border-border bg-card w-full max-w-md rounded-lg border p-8 shadow-sm">
        <h1 className="text-foreground mb-4 text-xl font-medium">Simple Counter</h1>
        <p className="text-foreground mb-6 text-center text-4xl font-semibold">{counterState.count}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={decrement} variant="outline">
            Decrement
          </Button>
          <Button onClick={increment}>Increment</Button>
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={reset} variant="secondary" size="sm">
            Reset
          </Button>
        </div>
        <div className="mt-6 border-t pt-4">
          <p className="text-foreground-muted mb-2 text-sm">Error Boundary Demo</p>
          <Button 
            onClick={triggerError} 
            variant="destructive"
            size="sm"
          >
            Trigger Error
          </Button>
        </div>
      </div>
    </div>
  );
}
