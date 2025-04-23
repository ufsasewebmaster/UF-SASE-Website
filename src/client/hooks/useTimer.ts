import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tick = useCallback(() => {
    setSeconds((s) => {
      if (s <= 1) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setTimerRunning(false);
        return 0;
      }
      return s - 1;
    });
  }, []);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(tick, 1000);
    }
    if (seconds == 0) {
      setTimerRunning(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, tick]);

  const startTimer = (seconds: number) => {
    setTimerRunning(true);
    setSeconds(seconds);
  };
  const pauseTimer = () => setTimerRunning(false);
  const resumeTimer = () => setTimerRunning(true);
  const resetTimer = (to = 0) => {
    setSeconds(to);
    setTimerRunning(true);
  };
  return { seconds, timerRunning, startTimer, pauseTimer, resumeTimer, resetTimer };
}
