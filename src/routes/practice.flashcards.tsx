import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";

export const Route = createFileRoute("/practice/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards Bahasa Jepang — Dimzy Nihongo" },
      { name: "description", content: "Pelajari kosakata Jepang dengan flashcards interaktif yang bisa diputar." },
      { property: "og:title", content: "Flashcards Bahasa Jepang — Dimzy Nihongo" },
      { property: "og:description", content: "Kartu belajar interaktif untuk kosakata Jepang." },
    ],
  }),
  component: FlashcardsPage,
});

function FlashcardsPage() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const cards = useMemo(() => levels[level].vocabulary, [level]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[idx];

  function next() { setFlipped(false); setIdx((i) => (i + 1) % cards.length); }
  function prev() { setFlipped(false); setIdx((i) => (i - 1 + cards.length) % cards.length); }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">単語カード</p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Flashcards</h1>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {levelOrder.map((lv) => (
            <button
              key={lv}
              onClick={() => { setLevel(lv); setIdx(0); setFlipped(false); }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                level === lv ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lv}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Kartu {idx + 1} dari {cards.length}
      </p>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="mt-6 flex h-72 w-full flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center transition-all hover:border-primary/40 hover:shadow-[var(--shadow-sakura)]"
      >
        {!flipped ? (
          <>
            <p className="font-jp text-6xl font-bold text-foreground sm:text-7xl">{card.jp}</p>
            <p className="mt-3 text-sm text-muted-foreground">Klik untuk membalik</p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{card.romaji}</p>
            <p className="mt-3 text-3xl font-bold text-primary">{card.meaning}</p>
            <span className="mt-4 rounded-full bg-accent px-3 py-1 text-xs">{card.category}</span>
          </>
        )}
      </button>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={prev} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent">
          <ArrowLeft className="h-4 w-4" /> Sebelumnya
        </button>
        <button onClick={() => setFlipped((f) => !f)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <RotateCw className="h-4 w-4" /> Balik
        </button>
        <button onClick={next} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-accent">
          Berikutnya <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
