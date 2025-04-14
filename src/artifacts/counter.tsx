import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background p-6 font-primary">
      <div className="rounded-lg border border-border bg-card p-8 shadow-sm w-full max-w-md">
        <h1 className="text-xl font-medium text-foreground mb-4">Simple Counter</h1>
        <p className="text-center text-4xl font-semibold text-foreground mb-6">{count}</p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setCount(count - 1)}
            variant="outline"
          >
            Decrement
          </Button>
          <Button
            onClick={() => setCount(count + 1)}
          >
            Increment
          </Button>
        </div>
      </div>
    </div>
  );
}
