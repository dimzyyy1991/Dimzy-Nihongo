import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";
import { AudioButton } from "@/components/audio-button";

export const Route = createFileRoute("/vocabulary")({
  head: () => ({
    meta: [
      { title: "Kosakata Jepang per Level — Dimzy Nihongo" },
      { name: "description", content: "Ribuan kosakata bahasa Jepang dikelompokkan per tema dan level JLPT." },
      { property: "og:title", content: "Kosakata Jepang per Level — Dimzy Nihongo" },
      { property: "og:description", content: "Pelajari kosakata Jepang berdasarkan tema dan level." },
    ],
  }),
  component: VocabPage,
});

function VocabPage() {
  const [active, setActive] = useState<JlptLevel>("N5");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(levels[active].vocabulary.map((v) => v.category));
    return Array.from(set);
  }, [active]);

  const filtered = levels[active].vocabulary.filter(
    (v) =>
      !query ||
      v.jp.includes(query) ||
      v.romaji.toLowerCase().includes(query.toLowerCase()) ||
      v.meaning.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">語彙</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Kosakata</h1>
        <p className="mt-3 text-muted-foreground">Dikelompokkan per tema dan level JLPT.</p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {levelOrder.map((lv) => (
            <button
              key={lv}
              onClick={() => setActive(lv)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                active === lv ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lv}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Cari kosakata..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-primary sm:w-72"
        />
      </div>

      <div className="mt-8 space-y-8">
        {categories.map((cat) => {
          const items = filtered.filter((v) => v.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">{cat}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((v) => (
                  <div key={v.jp} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
                    <AudioButton text={v.jp} className="mt-1 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-jp text-xl font-bold text-foreground">{v.jp}</div>
                      <div className="text-xs text-muted-foreground">{v.romaji}</div>
                      <div className="mt-2 text-sm text-foreground">{v.meaning}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
