import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X, RefreshCw } from "lucide-react";
import { particleQuestions } from "@/content/particles";

export const Route = createFileRoute("/tools/particles")({
  head: () => ({
    meta: [
      { title: "Latihan Partikel — Dimzy Nihongo" },
      { name: "description", content: "Kuis memilih partikel Jepang yang tepat: は, が, を, に, で, へ, と, も, dll." },
    ],
  }),
  component: ParticleQuiz,
});

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function ParticleQuiz() {
  const [pool, setPool] = useState(() => shuffle(particleQuestions));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const q = pool[idx];

  function pick(opt: string) {
    if (picked) return;
    setPicked(opt);
    setScore((s) => ({ right: s.right + (opt === q.answer ? 1 : 0), total: s.total + 1 }));
  }
  function next() {
    if (idx + 1 >= pool.length) {
      setPool(shuffle(particleQuestions));
      setIdx(0);
    } else setIdx(idx + 1);
    setPicked(null);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Latihan Partikel</h1>
        <p className="mt-2 text-muted-foreground">Pilih partikel yang tepat untuk melengkapi kalimat.</p>
      </header>

      <div className="rounded-2xl border border-border bg-card p-8">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Soal {idx + 1}</p>
        <p className="mt-3 font-jp text-3xl leading-relaxed text-foreground">
          {q.sentence.split("___").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={`mx-1 inline-block min-w-[2.5rem] rounded-md border-2 border-dashed px-2 py-0.5 text-center ${picked ? (picked === q.answer ? "border-green-500 text-green-600" : "border-red-500 text-red-600") : "border-muted-foreground/40"}`}>
                  {picked ?? "?"}
                </span>
              )}
            </span>
          ))}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Arti: {q.meaning}</p>
        <p className="mt-1 text-xs text-muted-foreground">Petunjuk: {q.hint}</p>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {q.options.map((o) => {
            const isAnswer = o === q.answer;
            const isPicked = o === picked;
            let cls = "border-border bg-background hover:bg-accent";
            if (picked) {
              if (isAnswer) cls = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
              else if (isPicked) cls = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
              else cls = "border-border bg-background opacity-60";
            }
            return (
              <button key={o} onClick={() => pick(o)} disabled={!!picked}
                className={`rounded-md border px-4 py-3 font-jp text-2xl font-semibold transition-colors ${cls}`}>
                {o}
              </button>
            );
          })}
        </div>

        {picked && (
          <div className="mt-6 flex items-center justify-between">
            <div className={`inline-flex items-center gap-2 text-sm font-semibold ${picked === q.answer ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {picked === q.answer ? <><Check className="h-4 w-4" /> Tepat sekali!</> : <><X className="h-4 w-4" /> Jawaban: <span className="font-jp">{q.answer}</span></>}
            </div>
            <button onClick={next} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <RefreshCw className="h-4 w-4" /> Lanjut
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">Skor: <span className="font-semibold text-foreground">{score.right} / {score.total}</span></p>
      </div>
    </div>
  );
}
