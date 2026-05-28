import { useEffect, useState, useCallback } from "react";

interface StreakState {
  current: number;
  best: number;
  lastDate: string | null; // YYYY-MM-DD
  totalDays: number;
}

const KEY = "dimzy-streak";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00").getTime();
  const db = new Date(b + "T00:00:00").getTime();
  return Math.round((db - da) / 86400000);
}

function load(): StreakState {
  if (typeof window === "undefined") return { current: 0, best: 0, lastDate: null, totalDays: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as StreakState;
  } catch {}
  return { current: 0, best: 0, lastDate: null, totalDays: 0 };
}

export function useStreak() {
  const [state, setState] = useState<StreakState>(() => load());

  useEffect(() => {
    setState(load());
  }, []);

  const checkIn = useCallback(() => {
    setState((prev) => {
      const t = today();
      if (prev.lastDate === t) return prev;
      let current = 1;
      if (prev.lastDate) {
        const diff = daysBetween(prev.lastDate, t);
        if (diff === 1) current = prev.current + 1;
        else current = 1;
      }
      const next: StreakState = {
        current,
        best: Math.max(prev.best, current),
        lastDate: t,
        totalDays: prev.totalDays + 1,
      };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isActiveToday = state.lastDate === today();

  return { ...state, isActiveToday, checkIn };
}
