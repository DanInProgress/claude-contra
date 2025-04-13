import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-4xl font-bold">Welcome</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
      </div>
    </div>
  );
}

export default App;
