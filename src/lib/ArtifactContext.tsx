import { createContext, useContext, useReducer, ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type State = Record<string, any>;
type Action = { type: 'SET_STATE'; artifactId: string; state: any };

// Dialog context for confirmation popups
type ConfirmDialogState = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
};

const initialConfirmState: ConfirmDialogState = {
  isOpen: false,
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: () => {},
};

const ArtifactContext = createContext<{
  state: State;
  setState: (artifactId: string, state: any) => void;
  notify: (message: string, options?: { type?: 'default' | 'success' | 'error' | 'info' | 'warning'; description?: string }) => void;
  confirm: (options: Omit<ConfirmDialogState, 'isOpen'>) => void;
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

// Confirmation Dialog Component
function ConfirmationDialog({ 
  isOpen, 
  title, 
  description, 
  confirmText, 
  cancelText, 
  onConfirm, 
  onClose 
}: ConfirmDialogState & { onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>{cancelText}</Button>
          <Button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ArtifactProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(artifactReducer, {});
  const [confirmState, setConfirmState] = useState<ConfirmDialogState>(initialConfirmState);

  const setState = (artifactId: string, newState: any) => {
    dispatch({ type: 'SET_STATE', artifactId, state: newState });
  };

  const notify = (message: string, options?: { type?: 'default' | 'success' | 'error' | 'info' | 'warning'; description?: string }) => {
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

  const confirm = (options: Omit<ConfirmDialogState, 'isOpen'>) => {
    setConfirmState({ ...options, isOpen: true });
  };

  const closeConfirm = () => {
    setConfirmState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ArtifactContext.Provider value={{ state, setState, notify, confirm }}>
      {children}
      <ConfirmationDialog {...confirmState} onClose={closeConfirm} />
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

export function useConfirm() {
  const context = useContext(ArtifactContext);
  if (!context) {
    throw new Error('useConfirm must be used within an ArtifactProvider');
  }

  return context.confirm;
}
