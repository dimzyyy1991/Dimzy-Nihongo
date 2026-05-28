import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X, RefreshCw } from "lucide-react";
import { verbs, conjugate, formLabels, type ConjForm } from "@/content/conjugation";

export const Route = createFileRoute("/tools/conjugation")({
  head: () => ({
    meta: [
      { title: "Drill Konjugasi Kata Kerja — Dimzy Nihongo" },
      { name: "description", content: "Latih konjugasi kata kerja Jepang: masu, nai, ta, te, potensial, volitional, pasif, kausatif." },
    ],
  }),
  component: ConjugationDrill,
});

const allForms: ConjForm[] = ["masu", "nai", "ta", "te", "potential", "volitional", "passive", "causative"];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function makeQ(activeForms: ConjForm[]) {
  const v = pick(verbs);
  const f = pick(activeForms);
  return { verb: v, form: f, answer: conjugate(v, f) };
}

function ConjugationDrill() {
  const [activeForms, setActiveForms] = useState<ConjForm[]>(["masu", "nai", "ta", "te"]);
  const [q, setQ] = useState(() => makeQ(["masu", "nai", "ta", "te"]));
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  function check() {
    if (!input.trim()) return;
    const ok = input.trim() === q.answer;
    setResult(ok ? "correct" : "wrong");
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
  }
  function nextQ() {
    setQ(makeQ(activeForms.length ? activeForms : allForms));
    setInput("");
    setResult(null);
  }
  function toggleForm(f: ConjForm) {
    setActiveForms((prev) => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Drill Konjugasi</h1>
        <p className="mt-2 text-muted-foreground">Ubah kata kerja ke bentuk yang diminta.</p>
      </header>

      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bentuk aktif</p>
        <div className="flex flex-wrap gap-2">
          {allForms.map((f) => (
            <button key={f} onClick={() => toggleForm(f)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${activeForms.includes(f) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}>
              {formLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Ubah <span className="font-bold text-foreground">{formLabels[q.form]}</span> dari:</p>
        <p className="mt-4 font-jp text-5xl text-foreground">{q.verb.dict}</p>
        <p className="mt-1 text-sm text-muted-foreground">{q.verb.reading} — {q.verb.meaning} ({q.verb.group})</p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") result ? nextQ() : check(); }}
          placeholder="Ketik jawaban (kana)…"
          className="mt-6 w-full rounded-md border border-border bg-background px-4 py-3 text-center font-jp text-2xl focus:border-primary focus:outline-none"
          disabled={result !== null}
          autoFocus
        />

        {result === "correct" && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-600 dark:text-green-400">
            <Check className="h-4 w-4" /> Benar!
          </div>
        )}
        {result === "wrong" && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400">
            <X className="h-4 w-4" /> Jawaban: <span className="font-jp">{q.answer}</span>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-2">
          {!result ? (
            <button onClick={check} className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Cek</button>
          ) : (
            <button onClick={nextQ} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <RefreshCw className="h-4 w-4" /> Soal berikutnya
            </button>
          )}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">Skor: <span className="font-semibold text-foreground">{score.right} / {score.total}</span></p>
      </div>
    </div>
  );
}
