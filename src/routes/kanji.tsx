import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";

export const Route = createFileRoute("/kanji")({
  head: () => ({
    meta: [
      { title: "Kanji per Level JLPT — Dimzy Nihongo" },
      { name: "description", content: "Ribuan kanji dikelompokkan per level JLPT, lengkap dengan onyomi, kunyomi, arti, dan contoh." },
      { property: "og:title", content: "Kanji per Level JLPT — Dimzy Nihongo" },
      { property: "og:description", content: "Pelajari kanji N5 sampai N1 secara terstruktur." },
    ],
  }),
  component: KanjiPage,
});

function KanjiPage() {
  const [active, setActive] = useState<JlptLevel>("N5");
  const [query, setQuery] = useState("");

  const list = levels[active].kanji.filter((k) =>
    !query ||
    k.kanji.includes(query) ||
    k.meaning.toLowerCase().includes(query.toLowerCase()) ||
    k.on.toLowerCase().includes(query.toLowerCase()) ||
    k.kun.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">漢字</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Kanji</h1>
        <p className="mt-3 text-muted-foreground">Pilih level, telusuri kanji.</p>
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
          placeholder="Cari kanji, arti, on/kun..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-primary sm:w-72"
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((k) => (
          <div key={k.kanji} className="rounded-xl border border-border bg-card p-4 transition-transform hover:scale-[1.02] hover:border-primary/40">
            <div className="flex items-start gap-4">
              <span className="font-jp text-6xl font-bold text-primary">{k.kanji}</span>
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold text-foreground">{k.meaning}</div>
                <div className="mt-1 text-xs text-muted-foreground">音 {k.on} · 訓 {k.kun}</div>
                <div className="mt-2 text-xs text-foreground/80">{k.example}</div>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground">Tidak ada kanji yang cocok.</p>
        )}
      </div>
    </div>
  );
}
