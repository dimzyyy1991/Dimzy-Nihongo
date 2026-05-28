import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel, VocabEntry } from "@/content/types";
import { useStreak } from "@/hooks/use-streak";
import { useStats } from "@/hooks/use-stats";
import { AudioButton } from "@/components/audio-button";
import { Flame, Trophy, Calendar, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review Harian — Streak & SRS Bahasa Jepang" },
      { name: "description", content: "Latihan harian dengan kartu spaced repetition. Jaga streak belajar bahasa Jepang Anda." },
      { property: "og:title", content: "Review Harian — Dimzy Nihongo" },
      { property: "og:description", content: "Jaga konsistensi belajar dengan review harian dan streak." },
    ],
  }),
  component: ReviewPage,
});

const DAILY = 15;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ReviewPage() {
  const streak = useStreak();
  const { incReview } = useStats();
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [started, setStarted] = useState(false);
  const [cards, setCards] = useState<VocabEntry[]>([]);
  const [idx, setIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<{ easy: number; hard: number }>({ easy: 0, hard: 0 });

  const start = () => {
    const pool = levels[level].vocabulary;
    const picked = shuffle(pool).slice(0, Math.min(DAILY, pool.length));
    setCards(picked);
    setIdx(0);
    setShowAnswer(false);
    setResults({ easy: 0, hard: 0 });
    setStarted(true);
  };

  const grade = (easy: boolean) => {
    setResults((r) => ({ easy: r.easy + (easy ? 1 : 0), hard: r.hard + (easy ? 0 : 1) }));
    incReview(1);
    if (idx + 1 >= cards.length) {
      streak.checkIn();
      setIdx(cards.length); // signal done
    } else {
      setIdx(idx + 1);
      setShowAnswer(false);
    }
  };

  const done = started && idx >= cards.length;
  const current = started && !done ? cards[idx] : null;

  const lastDateDisplay = useMemo(() => {
    if (!streak.lastDate) return "—";
    return new Date(streak.lastDate + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [streak.lastDate]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">毎日復習</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Review Harian</h1>
        <p className="mt-3 text-muted-foreground">{DAILY} kartu per hari — jaga streak Anda.</p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <Flame className="mx-auto h-5 w-5 text-orange-500" />
          <div className="mt-2 text-2xl font-extrabold text-foreground">{streak.current}</div>
          <div className="text-xs text-muted-foreground">Hari berturut</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <Trophy className="mx-auto h-5 w-5 text-amber-500" />
          <div className="mt-2 text-2xl font-extrabold text-foreground">{streak.best}</div>
          <div className="text-xs text-muted-foreground">Rekor terbaik</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <Calendar className="mx-auto h-5 w-5 text-primary" />
          <div className="mt-2 text-2xl font-extrabold text-foreground">{streak.totalDays}</div>
          <div className="text-xs text-muted-foreground">Total sesi</div>
        </div>
      </div>

      {streak.isActiveToday && (
        <p className="mt-4 text-center text-xs text-emerald-600 dark:text-emerald-400">
          ✓ Anda sudah belajar hari ini ({lastDateDisplay})
        </p>
      )}

      {!started && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-8 text-center">
          <p className="text-sm font-semibold text-muted-foreground">Pilih level</p>
          <div className="mt-3 inline-flex rounded-full border border-border bg-background p-1">
            {levelOrder.map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  level === lv ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lv}
              </button>
            ))}
          </div>
          <button
            onClick={start}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sakura)] hover:bg-primary/90"
          >
            Mulai Review Hari Ini
          </button>
        </div>
      )}

      {current && (
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{idx + 1} / {cards.length}</span>
            <span>{level}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((idx) / cards.length) * 100}%` }}
            />
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
            <div className="flex justify-center">
              <AudioButton text={current.jp} />
            </div>
            <p className="mt-4 font-jp text-5xl font-bold text-foreground sm:text-6xl">{current.jp}</p>
            <p className="mt-3 text-sm text-muted-foreground">{current.romaji}</p>

            {showAnswer ? (
              <>
                <div className="mx-auto mt-6 max-w-sm rounded-xl bg-accent p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Arti</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{current.meaning}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{current.category}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => grade(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent"
                  >
                    <ThumbsDown className="h-4 w-4" /> Sulit
                  </button>
                  <button
                    onClick={() => grade(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <ThumbsUp className="h-4 w-4" /> Mudah
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="mt-8 inline-flex rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Tampilkan Arti
              </button>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-10 text-center">
          <p className="font-jp text-4xl">🎉</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">Selesai!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mudah: <span className="font-semibold text-foreground">{results.easy}</span> · Sulit:{" "}
            <span className="font-semibold text-foreground">{results.hard}</span>
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-bold text-orange-600 dark:text-orange-400">
            <Flame className="h-4 w-4" /> Streak: {streak.current} hari
          </p>
          <div className="mt-6">
            <button
              onClick={() => setStarted(false)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent"
            >
              <RotateCcw className="h-4 w-4" /> Sesi baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
