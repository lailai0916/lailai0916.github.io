import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { bucketStart } from '@site/src/utils/umamiSeries';

export type InsightsRange = 1 | 7 | 30 | 365;

export interface InsightsWindow {
  startAt: number;
  endAt: number;
}

type WindowGetter = (range: InsightsRange) => InsightsWindow;

interface WindowSnapshot {
  range: InsightsRange;
  minute: number;
  window: InsightsWindow;
}

const WindowContext = createContext<WindowGetter | null>(null);

export function rangeWindow(range: InsightsRange, endAt = Date.now()): InsightsWindow {
  const startAt = endAt - range * 24 * 60 * 60 * 1000;
  return {
    startAt: range === 365 ? bucketStart(new Date(startAt), 'week').getTime() : startAt,
    endAt,
  };
}

export function UmamiWindowProvider({ children }: { children: ReactNode }) {
  const snapshotRef = useRef<WindowSnapshot | null>(null);
  const batchRef = useRef<WindowSnapshot | null>(null);
  const getWindow = useCallback((range: InsightsRange): InsightsWindow => {
    const batch = batchRef.current;
    if (batch?.range === range) return batch.window;
    const now = Date.now();
    const minute = Math.floor(now / 60_000);
    let snapshot = snapshotRef.current;
    if (!snapshot || snapshot.range !== range || snapshot.minute !== minute) {
      snapshot = { range, minute, window: rangeWindow(range, now) };
      snapshotRef.current = snapshot;
    }
    // One effect flush shares a window even while the clock crosses a minute.
    batchRef.current = snapshot;
    queueMicrotask(() => {
      batchRef.current = null;
    });
    return snapshot.window;
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden) {
        snapshotRef.current = null;
        batchRef.current = null;
      }
    };
    // Reset before the data hooks handle the same visibility event.
    document.addEventListener('visibilitychange', onVisibility, true);
    return () => document.removeEventListener('visibilitychange', onVisibility, true);
  }, []);

  return <WindowContext.Provider value={getWindow}>{children}</WindowContext.Provider>;
}

export function useUmamiWindow(): WindowGetter {
  return useContext(WindowContext) ?? rangeWindow;
}
