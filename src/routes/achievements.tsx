import { createFileRoute } from "@tanstack/react-router";
import { badgeDefs } from "@/content/badges";
import { useStreak } from "@/hooks/use-streak";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useStats } from "@/hooks/use-stats";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Pencapaian / Badges — Dimzy Nihongo" },
      { name: "description", content: "Kumpulkan badge dengan menyelesaikan milestone belajar bahasa Jepang." },
    ],
  }),
  component: Achievements,
});

function Achievements() {
  const { current, best, totalDays } = useStreak();
  const { items } = useBookmarks();
  const { examsTaken, reviewsDone } = useStats();
  const stats = { streak: current, totalDays, bookmarks: items.length, examsTaken, reviewsDone };
  const unlocked = badgeDefs.filter((b) => b.check(stats));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Pencapaian</h1>
        <p className="mt-2 text-muted-foreground">{unlocked.length} dari {badgeDefs.length} badge terbuka.</p>
      </header>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { l: "Streak", v: current },
          { l: "Rekor", v: best },
          { l: "Hari Total", v: totalDays },
          { l: "Favorit", v: items.length },
          { l: "Ujian", v: examsTaken },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-extrabold text-primary">{s.v}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {badgeDefs.map((b) => {
          const got = b.check(stats);
          return (
            <div key={b.id} className={`rounded-2xl border p-5 transition-opacity ${got ? "border-primary/40 bg-primary/5" : "border-border bg-card opacity-60"}`}>
              <div className="flex items-start gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${got ? "bg-primary/15" : "bg-muted grayscale"}`}>{b.icon}</div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{b.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{b.desc}</p>
                  {got && <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-primary">Terbuka</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
