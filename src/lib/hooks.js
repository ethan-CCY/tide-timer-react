import { useEffect, useRef, useState } from "react";

/**
 * A smooth ticker based on requestAnimationFrame.
 * It avoids interval drift by computing "now - start".
 */
export function useRafTicker(isRunning, onTick) {
  const rafId = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    let mounted = true;

    const loop = (t) => {
      if (!mounted) return;
      onTick(t);
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isRunning, onTick]);
}

/**
 * Stopwatch: elapsedMs increases while running. Pause/resume supported.
 */
export function useStopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const startRef = useRef(0);
  const baseRef = useRef(0);

  const start = () => {
    if (isRunning) return;
    startRef.current = performance.now();
    setIsRunning(true);
  };

  const pause = () => {
    if (!isRunning) return;
    baseRef.current = baseRef.current + (performance.now() - startRef.current);
    setIsRunning(false);
    setElapsedMs(baseRef.current);
  };

  const reset = () => {
    baseRef.current = 0;
    startRef.current = performance.now();
    setElapsedMs(0);
  };

  useRafTicker(isRunning, (t) => {
    const elapsed = baseRef.current + (t - startRef.current);
    setElapsedMs(elapsed);
  });

  return {
    isRunning,
    elapsedMs,
    start,
    pause,
    reset,
    setIsRunning,
    _setElapsedMs: setElapsedMs, // for advanced tweaks
  };
}

/**
 * Countdown: remainingMs decreases to 0 while running. Pause/resume supported.
 * totalMs can be changed while stopped.
 */
export function useCountdown(initialTotalMs = 5 * 60 * 1000) {
  const [isRunning, setIsRunning] = useState(false);
  const [totalMs, setTotalMs] = useState(initialTotalMs);
  const [remainingMs, setRemainingMs] = useState(initialTotalMs);

  const startRef = useRef(0);
  const baseRemainingRef = useRef(initialTotalMs);

  const start = () => {
    if (isRunning) return;
    // If user changed totalMs while stopped, sync baseRemaining
    baseRemainingRef.current = remainingMs;
    startRef.current = performance.now();
    setIsRunning(true);
  };

  const pause = () => {
    if (!isRunning) return;
    const spent = performance.now() - startRef.current;
    const next = Math.max(0, baseRemainingRef.current - spent);
    baseRemainingRef.current = next;
    setIsRunning(false);
    setRemainingMs(next);
  };

  const reset = () => {
    baseRemainingRef.current = totalMs;
    startRef.current = performance.now();
    setRemainingMs(totalMs);
  };

  const setTotalWhileStopped = (ms) => {
    if (isRunning) return;
    const clamped = Math.max(1000, ms);
    setTotalMs(clamped);
    baseRemainingRef.current = clamped;
    setRemainingMs(clamped);
  };

  useRafTicker(isRunning, (t) => {
    const spent = t - startRef.current;
    const next = Math.max(0, baseRemainingRef.current - spent);
    setRemainingMs(next);
    if (next === 0) {
      // auto stop when finished
      setIsRunning(false);
      baseRemainingRef.current = 0;
    }
  });

  return {
    isRunning,
    totalMs,
    remainingMs,
    start,
    pause,
    reset,
    setTotalWhileStopped,
  };
}
