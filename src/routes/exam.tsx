import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { examBank } from "@/content/exam-bank";
import { levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";
import { CheckCircle2, XCircle, Clock, RotateCcw } from "lucide-react";
import { useStats } from "@/hooks/use-stats";

export const Route = createFileRoute("/exam")({
  head: () => ({
    meta: [
      { title: "Simulasi Ujian JLPT — Mock Test N5–N1" },
      { name: "description", content: "Latihan ujian JLPT dengan timer dan analisis hasil per kategori (kosakata, kanji, tata bahasa)." },
      { property: "og:title", content: "Simulasi Ujian JLPT — Dimzy Nihongo" },
      { property: "og:description", content: "Uji kemampuan dengan format ujian JLPT mini." },
    ],
  }),
  component: ExamPage,
});

const DURATION = 5 * 60; // 5 minutes mini test

function ExamPage() {
  const [level, setLevel] = useState<JlptLevel | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(DURATION);
  const { incExam } = useStats();

  const questions = level ? examBank[level] : [];

  useEffect(() => { if (submitted) incExam(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [submitted]);

  useEffect(() => {
    if (!level || submitted) return;
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [level, submitted]);

  const stats = useMemo(() => {
    if (!questions.length) return null;
    let correct = 0;
    const byType: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q) => {
      byType[q.type] ??= { correct: 0, total: 0 };
      byType[q.type].total++;
      if (answers[q.id] === q.answer) {
        correct++;
        byType[q.type].correct++;
      }
    });
    return { correct, total: questions.length, byType };
  }, [questions, answers]);

  const reset = () => {
    setLevel(null);
    setAnswers({});
    setSubmitted(false);
    setSeconds(DURATION);
  };

  if (!level) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">模擬試験</p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Simulasi Ujian JLPT</h1>
          <p className="mt-3 text-muted-foreground">Pilih level — 10 soal · 5 menit · analisis per kategori.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-5">
          {levelOrder.map((lv) => (
            <button
              key={lv}
              onClick={() => setLevel(lv)}
              className="group rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-sakura)]"
            >
              <div className="text-3xl font-extrabold text-primary">{lv}</div>
              <div className="mt-2 text-xs text-muted-foreground">{examBank[lv].length} soal</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (submitted && stats) {
    const pct = Math.round((stats.correct / stats.total) * 100);
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Hasil — {level}</p>
          <p className="mt-2 text-6xl font-extrabold text-primary">{pct}%</p>
          <p className="mt-1 text-sm text-muted-foreground">{stats.correct} dari {stats.total} benar</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {Object.entries(stats.byType).map(([t, v]) => (
              <div key={t} className="rounded-xl border border-border bg-background p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
                <div className="mt-1 text-2xl font-bold text-foreground">
                  {v.correct}/{v.total}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={reset}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" /> Coba lagi
          </button>
        </div>
        <div className="mt-8 space-y-3">
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const isRight = userAns === q.answer;
            return (
              <div key={q.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-2">
                  {isRight ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {i + 1}. {q.question}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Jawaban benar: <span className="font-semibold text-foreground">{q.choices[q.answer]}</span>
                      {userAns !== undefined && !isRight && (
                        <> · Anda jawab: <span className="line-through">{q.choices[userAns]}</span></>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const answered = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="sticky top-16 z-30 -mx-4 mb-6 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="text-sm font-medium text-foreground">
          {level} · {answered}/{questions.length} dijawab
        </div>
        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${
          seconds < 60 ? "bg-destructive/15 text-destructive" : "bg-accent text-primary"
        }`}>
          <Clock className="h-3.5 w-3.5" /> {mm}:{ss}
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((q, i) => (
          <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground">
              {i + 1}. {q.question}
            </p>
            <div className="mt-3 grid gap-2">
              {q.choices.map((c, idx) => {
                const selected = answers[q.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setAnswers({ ...answers, [q.id]: idx })}
                    className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSubmitted(true)}
        className="mt-8 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sakura)] hover:bg-primary/90"
      >
        Selesai & Lihat Hasil
      </button>
    </div>
  );
}
