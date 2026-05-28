import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, PenTool, MessageSquare } from "lucide-react";
import { levels, levelOrder } from "@/content/levels";

export const Route = createFileRoute("/levels")({
  head: () => ({
    meta: [
      { title: "Level JLPT N5 – N1 — Dimzy Nihongo" },
      { name: "description", content: "Jelajahi semua level JLPT dari N5 hingga N1, dengan estimasi waktu belajar, jumlah kanji, kosakata, dan pola tata bahasa." },
      { property: "og:title", content: "Level JLPT N5 – N1 — Dimzy Nihongo" },
      { property: "og:description", content: "Pilih level Anda dan mulai belajar bahasa Jepang dengan kurikulum terstruktur." },
    ],
  }),
  component: LevelsPage,
});

function LevelsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">レベル</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Semua Level JLPT
        </h1>
        <p className="mt-4 text-muted-foreground">
          Dari N5 (pemula) hingga N1 (setara native). Pilih level Anda dan lihat detail
          materi serta jumlah konten yang akan Anda kuasai.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {levelOrder.map((lv, idx) => {
          const level = levels[lv];
          return (
            <Link
              key={lv}
              to="/levels/$level"
              params={{ level: lv }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-sakura)]"
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/50 blur-2xl transition-opacity group-hover:opacity-70" />
              <div className="relative flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tahap {idx + 1} dari 5
                  </span>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold text-primary">{lv}</span>
                    <span className="text-sm font-medium text-foreground">{level.tagline}</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {level.description}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Stat icon={PenTool} label="Kanji" value={level.kanjiCount} />
                <Stat icon={BookOpen} label="Kosakata" value={level.vocabCount} />
                <Stat icon={MessageSquare} label="Grammar" value={level.grammarCount} />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Estimasi: <span className="text-foreground">{level.hours}</span>
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline">
                  Lihat detail
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof BookOpen; label: string; value: number }) {
  return (
    <div className="rounded-xl bg-muted/60 p-3">
      <Icon className="h-4 w-4 text-primary" />
      <div className="mt-1.5 text-lg font-bold text-foreground">{value.toLocaleString()}</div>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
