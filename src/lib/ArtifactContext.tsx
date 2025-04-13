import { createContext, useContext, useReducer, ReactNode } from 'react';

type State = Record<string, any>;
type Action = { type: 'SET_STATE'; artifactId: string; state: any };

const ArtifactContext = createContext<{
  state: State;
  setState: (artifactId: string, state: any) => void;
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

  return (
    <ArtifactContext.Provider value={{ state, setState }}>{children}</ArtifactContext.Provider>
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
