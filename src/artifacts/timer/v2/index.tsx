import { useEffect, useState } from 'react';

interface TimerState {
  isRunning: boolean;
  time: number;
  lastStartTime: number | null;
}

export default function TimerV2() {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    time: 0,
    lastStartTime: null,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timerState.isRunning) {
      intervalId = setInterval(() => {
        if (timerState.lastStartTime) {
          const elapsedSeconds = Math.floor((Date.now() - timerState.lastStartTime) / 1000);
          setTimerState((prev) => ({ ...prev, time: elapsedSeconds }));
        }
      }, 100);
    } else if (!timerState.isRunning && timerState.time !== 0) {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerState.isRunning, timerState.lastStartTime]);
  const toggleTimer = () => {
    setTimerState((prev) => {
      const isRunning = !prev.isRunning;
      const lastStartTime = isRunning ? Date.now() - prev.time * 1000 : null;
      return {
        ...prev,
        isRunning,
        lastStartTime,
      };
    });
  };

  const resetTimer = () => {
    setTimerState({
      isRunning: false,
      time: 0,
      lastStartTime: null,
    });
  };

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-background font-primary flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
      <div className="border-border bg-card w-full max-w-sm rounded-lg border p-8 shadow-sm">
        <h1 className="text-foreground mb-4 text-center text-xl font-medium">Timer (v2)</h1>
        <div className="text-foreground mb-8 text-center font-mono text-7xl font-medium tracking-tight">
          {formatTime(timerState.time)}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`focus:ring-ring inline-flex items-center rounded-md border px-6 py-2 text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95 ${
              timerState.isRunning
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
            }`}
          >
            {timerState.isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            disabled={timerState.isRunning || timerState.time === 0}
            className="border-border bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground focus:ring-ring inline-flex items-center rounded-md border px-6 py-2 text-sm font-medium shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          >
            Reset
          </button>
        </div>
        {timerState.lastStartTime && timerState.isRunning && (
          <p className="text-muted-foreground mt-6 text-center text-xs">
            Started at: {new Date(timerState.lastStartTime).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
