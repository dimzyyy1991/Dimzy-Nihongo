import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { stories } from "@/content/stories";
import { AudioButton, speakJp } from "@/components/audio-button";
import { levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";
import { Clock, BookOpen, ChevronLeft, Play } from "lucide-react";

export const Route = createFileRoute("/reader")({
  head: () => ({
    meta: [
      { title: "Bacaan Bertahap — Cerita Pendek Bahasa Jepang" },
      { name: "description", content: "Cerita pendek bahasa Jepang per level JLPT dengan romaji, audio, dan terjemahan Indonesia." },
      { property: "og:title", content: "Bacaan Bertahap — Dimzy Nihongo" },
      { property: "og:description", content: "Latih membaca dengan cerita pendek per level." },
    ],
  }),
  component: ReaderPage,
});

function ReaderPage() {
  const [activeLevel, setActiveLevel] = useState<JlptLevel | "ALL">("ALL");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeLevel === "ALL" ? stories : stories.filter((s) => s.level === activeLevel);
  const open = openId ? stories.find((s) => s.id === openId) : null;

  if (open) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <button
          onClick={() => setOpenId(null)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Kembali ke daftar
        </button>
        <div className="mt-6">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
            {open.level}
          </span>
          <h1 className="mt-3 font-jp text-3xl font-bold text-foreground sm:text-4xl">{open.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{open.titleId} · {open.minutes} menit</p>
          <button
            onClick={() => speakJp(open.paragraphs.map((p) => p.jp).join(" "))}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40"
          >
            <Play className="h-3.5 w-3.5" /> Baca seluruh cerita
          </button>
        </div>
        <div className="mt-8 space-y-5">
          {open.paragraphs.map((p, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <AudioButton text={p.jp} className="mt-1 shrink-0" />
                <div>
                  <p className="font-jp text-lg leading-relaxed text-foreground">{p.jp}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.romaji}</p>
                  <p className="mt-2 text-sm text-foreground">{p.meaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">読み物</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Bacaan Bertahap</h1>
        <p className="mt-3 text-muted-foreground">Cerita pendek dengan audio, romaji, dan terjemahan.</p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {(["ALL", ...levelOrder] as const).map((lv) => (
            <button
              key={lv}
              onClick={() => setActiveLevel(lv)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeLevel === lv ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lv === "ALL" ? "Semua" : lv}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <button
            key={s.id}
            onClick={() => setOpenId(s.id)}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{s.emoji}</span>
              <span className="inline-flex rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-primary">
                {s.level}
              </span>
            </div>
            <h3 className="mt-4 font-jp text-xl font-bold text-foreground">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.titleId}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {s.minutes} mnt</span>
              <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" /> {s.paragraphs.length} paragraf</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
