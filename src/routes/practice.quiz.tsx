import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X, RotateCw, Trophy } from "lucide-react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel, VocabEntry } from "@/content/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const Route = createFileRoute("/practice/quiz")({
  head: () => ({
    meta: [
      { title: "Kuis Bahasa Jepang — Dimzy Nihongo" },
      { name: "description", content: "Uji pemahaman kosakata bahasa Jepang Anda dengan kuis pilihan ganda interaktif." },
      { property: "og:title", content: "Kuis Bahasa Jepang — Dimzy Nihongo" },
      { property: "og:description", content: "Latih kosakata Anda dengan kuis interaktif." },
    ],
  }),
  component: QuizPage,
});

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuestions(level: JlptLevel) {
  const pool = levels[level].vocabulary;
  return shuffle(pool).slice(0, Math.min(10, pool.length)).map((correct) => {
    const wrongs = shuffle(pool.filter((p) => p.jp !== correct.jp)).slice(0, 3);
    return { correct, options: shuffle([correct, ...wrongs]) as VocabEntry[] };
  });
}

function QuizPage() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [questions, setQuestions] = useState(() => buildQuestions("N5"));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorage("dimzy:quiz:best", 0);

  const q = questions[idx];
  const done = idx >= questions.length;

  function pick(jp: string) {
    if (picked) return;
    setPicked(jp);
    if (jp === q.correct.jp) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    if (idx + 1 >= questions.length) {
      if (score > bestScore) setBestScore(score);
    }
    setIdx((i) => i + 1);
  }

  function restart(lv: JlptLevel = level) {
    setLevel(lv);
    setQuestions(buildQuestions(lv));
    setIdx(0);
    setPicked(null);
    setScore(0);
  }

  if (done) {
    const final = score;
    if (final > bestScore) setBestScore(final);
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Trophy className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-extrabold">Selesai!</h1>
        <p className="mt-2 text-muted-foreground">
          Skor: <span className="text-2xl font-bold text-foreground">{final}</span> / {questions.length}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Skor tertinggi: {Math.max(bestScore, final)}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => restart(level)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <RotateCw className="h-4 w-4" /> Coba lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {levelOrder.map((lv) => (
            <button
              key={lv}
              onClick={() => restart(lv)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                level === lv ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lv}
            </button>
          ))}
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {idx + 1} / {questions.length} · skor {score}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Arti dari</p>
        <p className="mt-3 font-jp text-5xl font-bold text-foreground">{q.correct.jp}</p>
        <p className="mt-1 text-sm text-muted-foreground">{q.correct.romaji}</p>
      </div>

      <div className="mt-6 grid gap-3">
        {q.options.map((opt) => {
          const isCorrect = opt.jp === q.correct.jp;
          const isPicked = picked === opt.jp;
          let cls = "border-border bg-card hover:border-primary/40";
          if (picked) {
            if (isCorrect) cls = "border-green-500 bg-green-50 dark:bg-green-950";
            else if (isPicked) cls = "border-red-500 bg-red-50 dark:bg-red-950";
            else cls = "border-border bg-card opacity-50";
          }
          return (
            <button
              key={opt.jp}
              onClick={() => pick(opt.jp)}
              disabled={!!picked}
              className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm font-medium transition-colors ${cls}`}
            >
              <span>{opt.meaning}</span>
              {picked && isCorrect && <Check className="h-5 w-5 text-green-600" />}
              {picked && isPicked && !isCorrect && <X className="h-5 w-5 text-red-600" />}
            </button>
          );
        })}
      </div>

      {picked && (
        <button onClick={next} className="mt-6 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          {idx + 1 >= questions.length ? "Lihat hasil" : "Lanjut"}
        </button>
      )}
    </div>
  );
}
