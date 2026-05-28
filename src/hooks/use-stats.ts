import { useEffect, useState, useCallback } from "react";

const KEY = "dimzy-stats";

interface Stats {
  examsTaken: number;
  reviewsDone: number;
}

function load(): Stats {
  if (typeof window === "undefined") return { examsTaken: 0, reviewsDone: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Stats;
  } catch {}
  return { examsTaken: 0, reviewsDone: 0 };
}

function save(s: Stats) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
    window.dispatchEvent(new Event("dimzy-stats-changed"));
  } catch {}
}

export function useStats() {
  const [stats, setStats] = useState<Stats>(() => load());

  useEffect(() => {
    setStats(load());
    const h = () => setStats(load());
    window.addEventListener("dimzy-stats-changed", h);
    return () => window.removeEventListener("dimzy-stats-changed", h);
  }, []);

  const incExam = useCallback(() => {
    const s = load();
    save({ ...s, examsTaken: s.examsTaken + 1 });
  }, []);
  const incReview = useCallback((n = 1) => {
    const s = load();
    save({ ...s, reviewsDone: s.reviewsDone + n });
  }, []);

  return { ...stats, incExam, incReview };
}
