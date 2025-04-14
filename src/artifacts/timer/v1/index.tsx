import { useEffect } from 'react';
import { useArtifactState } from '@/lib/ArtifactContext';
import { Button } from '@/components/ui/button';

interface TimerState {
  isRunning: boolean;
  time: number;
  lastStartTime: number | null;
}

export default function TimerV1() {

  throw new Error('!!Intentional Crashing!! This exists to show the error boundary for a specific artifact version in a folder');
  const [timerState, setTimerState] = useArtifactState<TimerState>('timer-v1', {
    isRunning: false,
    time: 0,
    lastStartTime: null,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timerState.isRunning) {
      intervalId = setInterval(() => {
        setTimerState({
          ...timerState,
          time: timerState.time + 1,
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerState.isRunning]);

  const toggleTimer = () => {
    setTimerState({
      ...timerState,
      isRunning: !timerState.isRunning,
      lastStartTime: !timerState.isRunning ? Date.now() : timerState.lastStartTime,
    });
  };

  const resetTimer = () => {
    setTimerState({
      isRunning: false,
      time: 0,
      lastStartTime: null,
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Timer Artifact (v1)</h1>
        <div className="mb-8 font-mono text-6xl">{formatTime(timerState.time)}</div>
        <div className="flex gap-4">
          <Button variant={timerState.isRunning ? 'destructive' : 'default'} onClick={toggleTimer}>
            {timerState.isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button variant="outline" onClick={resetTimer} disabled={timerState.isRunning}>
            Reset
          </Button>
        </div>
        {timerState.lastStartTime && (
          <p className="mt-4 text-sm text-gray-500">
            Started at: {new Date(timerState.lastStartTime).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
