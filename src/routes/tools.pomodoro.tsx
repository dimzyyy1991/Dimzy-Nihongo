import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

export const Route = createFileRoute("/tools/pomodoro")({
  head: () => ({
    meta: [
      { title: "Pomodoro Timer Belajar — Dimzy Nihongo" },
      { name: "description", content: "Timer Pomodoro 25 menit untuk fokus belajar bahasa Jepang dengan jeda otomatis." },
    ],
  }),
  component: Pomodoro,
});

type Mode = "focus" | "short" | "long";

function Pomodoro() {
  const [mode, setMode] = useState<Mode>("focus");
  const [durations, setDurations] = useState({ focus: 25, short: 5, long: 15 });
  const [secs, setSecs] = useState(durations.focus * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setSecs(durations[mode] * 60); setRunning(false); }, [mode, durations]);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) {
          setRunning(false);
          if (mode === "focus") setCompleted((c) => c + 1);
          try { new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=").play(); } catch {}
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running, mode]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const pct = ((durations[mode] * 60 - secs) / (durations[mode] * 60)) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Pomodoro Belajar</h1>
        <p className="mt-2 text-muted-foreground">Fokus 25 menit, istirahat singkat, ulang.</p>
      </header>

      <div className="mb-6 flex justify-center gap-1 rounded-lg border border-border bg-card p-1">
        {(["focus", "short", "long"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {m === "focus" ? "Fokus" : m === "short" ? "Istirahat" : "Istirahat Panjang"}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-12 text-center">
        <div className="relative mx-auto h-64 w-64">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted" strokeWidth="6" />
            <circle cx="50" cy="50" r="45" fill="none" className="stroke-primary" strokeWidth="6"
              strokeDasharray={2 * Math.PI * 45} strokeDashoffset={(2 * Math.PI * 45) * (1 - pct / 100)} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-mono text-6xl font-bold tabular-nums text-foreground">{mm}:{ss}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Sesi {completed + 1}</div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => setRunning((r) => !r)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            {running ? <><Pause className="h-4 w-4" /> Jeda</> : <><Play className="h-4 w-4" /> Mulai</>}
          </button>
          <button onClick={() => { setSecs(durations[mode] * 60); setRunning(false); }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-accent">
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">Pomodoro selesai: <span className="font-semibold text-foreground">{completed}</span></p>
      </div>

      <details className="mt-6 rounded-xl border border-border bg-card p-4">
        <summary className="cursor-pointer text-sm font-semibold text-foreground"><Settings className="mr-2 inline h-4 w-4" />Pengaturan durasi (menit)</summary>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {(["focus", "short", "long"] as const).map((m) => (
            <label key={m} className="text-xs">
              <span className="text-muted-foreground">{m}</span>
              <input type="number" min={1} max={120} value={durations[m]}
                onChange={(e) => setDurations((d) => ({ ...d, [m]: Number(e.target.value) || 1 }))}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </label>
          ))}
        </div>
      </details>
    </div>
  );
}
