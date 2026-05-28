import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Brain, Layers } from "lucide-react";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Latihan Bahasa Jepang — Dimzy Nihongo" },
      { name: "description", content: "Latih kemampuan bahasa Jepang Anda dengan kuis interaktif dan flashcards." },
      { property: "og:title", content: "Latihan Bahasa Jepang — Dimzy Nihongo" },
      { property: "og:description", content: "Kuis dan flashcards interaktif untuk semua level JLPT." },
    ],
  }),
  component: PracticeLayout,
});

function PracticeLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname === "/practice" || pathname === "/practice/";

  if (!isIndex) return <Outlet />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">練習</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Latihan</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Uji dan perkuat ingatan Anda. Skor disimpan otomatis di perangkat Anda.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link to="/practice/quiz" className="group rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-sakura)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
            <Brain className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-bold">Kuis Pilihan Ganda</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Uji pemahaman kosakata Anda dengan kuis cepat. Skor dan streak tersimpan.
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-primary group-hover:underline">Mulai kuis →</span>
        </Link>
        <Link to="/practice/flashcards" className="group rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-sakura)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
            <Layers className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-bold">Flashcards</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Belajar kosakata dengan kartu putar. Tandai yang sudah Anda kuasai.
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-primary group-hover:underline">Buka flashcards →</span>
        </Link>
      </div>
    </div>
  );
}
