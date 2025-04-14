import React, { useEffect, useState } from 'react';

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
          setTimerState(prev => ({ ...prev, time: elapsedSeconds }));
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
    setTimerState(prev => {
      const isRunning = !prev.isRunning;
      const lastStartTime = isRunning ? Date.now() - prev.time * 1000 : null;
      return {
        ...prev,
        isRunning,
        lastStartTime: isRunning ? (prev.lastStartTime || Date.now()) : prev.lastStartTime
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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background p-6 font-primary">
      <div className="rounded-lg border border-border bg-card p-8 shadow-sm w-full max-w-sm">
        <h1 className="text-center text-xl font-medium text-foreground mb-4">Timer (v2)</h1>
        <div className="mb-8 text-center font-mono text-7xl font-medium text-foreground tracking-tight">
          {formatTime(timerState.time)}
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggleTimer}
            className={`inline-flex items-center rounded-md border px-6 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95 transition-all 
              ${
                timerState.isRunning
                  ? 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
          >
            {timerState.isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            disabled={timerState.isRunning || timerState.time === 0}
            className="inline-flex items-center rounded-md border border-border bg-card px-6 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:bg-secondary hover:text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Reset
          </button>
        </div>
        {timerState.lastStartTime && timerState.isRunning && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Started at: {new Date(timerState.lastStartTime).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
