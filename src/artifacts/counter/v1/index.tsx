import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-background font-primary flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
      <div className="border-border bg-card w-full max-w-md rounded-lg border p-8 shadow-sm">
        <h1 className="text-foreground mb-4 text-xl font-medium">Simple Counter</h1>
        <p className="text-foreground mb-6 text-center text-4xl font-semibold">{count}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => setCount(count - 1)} variant="outline">
            Decrement
          </Button>
          <Button onClick={() => setCount(count + 1)}>Increment</Button>
        </div>
      </div>
    </div>
  );
}
