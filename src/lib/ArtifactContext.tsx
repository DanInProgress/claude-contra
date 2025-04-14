import { createContext, useContext, useReducer, ReactNode } from 'react';
import { toast } from 'sonner';

type State = Record<string, any>;
type Action = { type: 'SET_STATE'; artifactId: string; state: any };

const ArtifactContext = createContext<{
  state: State;
  setState: (artifactId: string, state: any) => void;
  notify: (
    message: string,
    options?: { type?: 'default' | 'success' | 'error' | 'info' | 'warning'; description?: string }
  ) => void;
} | null>(null);

function artifactReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        [action.artifactId]: action.state,
      };
    default:
      return state;
  }
}

export function ArtifactProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(artifactReducer, {});

  const setState = (artifactId: string, newState: any) => {
    dispatch({ type: 'SET_STATE', artifactId, state: newState });
  };

  const notify = (
    message: string,
    options?: { type?: 'default' | 'success' | 'error' | 'info' | 'warning'; description?: string }
  ) => {
    switch (options?.type) {
      case 'success':
        toast.success(message, { description: options.description });
        break;
      case 'error':
        toast.error(message, { description: options.description });
        break;
      case 'info':
        toast.info(message, { description: options.description });
        break;
      case 'warning':
        toast.warning(message, { description: options.description });
        break;
      default:
        toast(message, { description: options?.description });
    }
  };

  return (
    <ArtifactContext.Provider value={{ state, setState, notify }}>
      {children}
    </ArtifactContext.Provider>
  );
}

export function useArtifactState<T>(artifactId: string, initialState: T): [T, (state: T) => void] {
  const context = useContext(ArtifactContext);
  if (!context) {
    throw new Error('useArtifactState must be used within an ArtifactProvider');
  }

  const currentState = (context.state[artifactId] ?? initialState) as T;
  const setState = (newState: T) => context.setState(artifactId, newState);

  return [currentState, setState];
}

export function useNotify() {
  const context = useContext(ArtifactContext);
  if (!context) {
    throw new Error('useNotify must be used within an ArtifactProvider');
  }

  return context.notify;
}
