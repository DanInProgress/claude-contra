# Todo Artifact Example

This document provides an example of how a new Todo artifact should be implemented following our desired project structure.

## Directory Structure

```
/src
  /artifacts
    /todo
      /v1
        index.tsx        // Implementation of Todo v1
```

## Implementation Example

```tsx
// src/artifacts/todo/v1/index.tsx

import React, { useState } from 'react';
import { useArtifactState } from '@/lib/ArtifactContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define the Todo item interface
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

// Define the state interface
interface TodoState {
  items: TodoItem[];
  inputValue: string;
}

export default function TodoV1() {
  // Use the ArtifactContext to persist state
  const [todoState, setTodoState] = useArtifactState<TodoState>('todo-v1', {
    items: [],
    inputValue: '',
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoState({
      ...todoState,
      inputValue: e.target.value,
    });
  };

  // Add a new todo
  const addTodo = () => {
    if (!todoState.inputValue.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: todoState.inputValue,
      completed: false,
    };

    setTodoState({
      items: [...todoState.items, newTodo],
      inputValue: '',
    });
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodoState({
      ...todoState,
      items: todoState.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    });
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodoState({
      ...todoState,
      items: todoState.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="bg-background flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
      <div className="border-border bg-card w-full max-w-md rounded-lg border p-6 shadow-sm">
        <h1 className="text-foreground mb-6 text-2xl font-semibold">Todo List</h1>

        {/* Input and Add button */}
        <div className="mb-4 flex gap-2">
          <Input
            type="text"
            value={todoState.inputValue}
            onChange={handleInputChange}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo}>Add</Button>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {todoState.items.length === 0 ? (
            <p className="text-muted-foreground text-center">No tasks yet. Add one above!</p>
          ) : (
            todoState.items.map((item) => (
              <div
                key={item.id}
                className="border-border flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTodo(item.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span
                    className={`${item.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                  >
                    {item.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(item.id)}
                  className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Status */}
        {todoState.items.length > 0 && (
          <div className="text-muted-foreground mt-4 text-sm">
            <p>
              {todoState.items.filter((item) => item.completed).length} of {todoState.items.length}{' '}
              tasks completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## Key Implementation Features

1. **Self-contained component**: The entire artifact is contained within a single file
2. **TypeScript interfaces**: Using TypeScript interfaces for proper type safety
3. **State management**: Using the ArtifactContext for persistent state
4. **shadcn/ui components**: Leveraging existing UI components like Button and Input
5. **Consistent styling**: Using Tailwind CSS for styling consistent with the project
6. **Semantic structure**: Clear organization with logical component sections
7. **Export default**: Exporting the component as default for lazy loading

## Usage in Routes

In `main.tsx`, this component will be automatically discovered and imported:

```tsx
// This will automatically find src/artifacts/todo/v1/index.tsx
const versionedArtifacts = import.meta.glob('./artifacts/**/index.tsx', { eager: false });
```

And then displayed in the artifacts list and routed to when selected.
