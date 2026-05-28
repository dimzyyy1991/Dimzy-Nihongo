import { createFileRoute, Link } from "@tanstack/react-router";
import { PenTool, Repeat, Puzzle, Hash, Timer } from "lucide-react";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Alat Belajar — Dimzy Nihongo" },
      { name: "description", content: "Kumpulan alat belajar interaktif: tulis kanji, konjugasi, partikel, counter, dan Pomodoro." },
    ],
  }),
  component: ToolsIndex,
});

const tools = [
  { to: "/tools/kanji-write" as const, icon: PenTool, title: "Tulis Kanji", desc: "Latih stroke order di canvas dengan referensi visual." },
  { to: "/tools/conjugation" as const, icon: Repeat, title: "Drill Konjugasi", desc: "Latih masu, nai, ta, te, potensial, volitional, pasif, kausatif." },
  { to: "/tools/particles" as const, icon: Puzzle, title: "Latihan Partikel", desc: "Pilih partikel yang tepat: は, が, を, に, で, へ…" },
  { to: "/tools/counters" as const, icon: Hash, title: "Counter Words", desc: "Pelajari josuushi: 人, 匹, 枚, 本, 冊…" },
  { to: "/tools/pomodoro" as const, icon: Timer, title: "Pomodoro", desc: "Timer 25 menit fokus belajar dengan jeda otomatis." },
];

function ToolsIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Alat Belajar</h1>
        <p className="mt-2 text-muted-foreground">Latihan interaktif untuk memperdalam pemahaman Anda.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
            <t.icon className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary">{t.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
