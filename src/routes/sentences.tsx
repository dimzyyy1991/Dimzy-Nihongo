import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";
import { AudioButton } from "@/components/audio-button";

export const Route = createFileRoute("/sentences")({
  head: () => ({
    meta: [
      { title: "Contoh Kalimat Bahasa Jepang per Level — Dimzy Nihongo" },
      { name: "description", content: "Ratusan contoh kalimat bahasa Jepang dengan romaji dan terjemahan Indonesia, dikelompokkan per level JLPT." },
      { property: "og:title", content: "Contoh Kalimat Bahasa Jepang — Dimzy Nihongo" },
      { property: "og:description", content: "Belajar bahasa Jepang lewat kalimat asli untuk setiap level JLPT." },
    ],
  }),
  component: SentencesPage,
});

function SentencesPage() {
  const [active, setActive] = useState<JlptLevel>("N5");
  const [query, setQuery] = useState("");

  const list = levels[active].sentences.filter(
    (s) =>
      !query ||
      s.jp.includes(query) ||
      s.romaji.toLowerCase().includes(query.toLowerCase()) ||
      s.meaning.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">例文</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Contoh Kalimat</h1>
        <p className="mt-3 text-muted-foreground">
          Belajar lewat kalimat asli — lengkap dengan romaji dan arti.
        </p>
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
          placeholder="Cari kalimat..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-primary sm:w-72"
        />
      </div>

      <div className="mt-8 space-y-3">
        {list.map((s, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
            <AudioButton text={s.jp} className="mt-1 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-jp text-lg font-semibold text-foreground sm:text-xl">{s.jp}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.romaji}</p>
              <p className="mt-2 text-sm text-foreground">{s.meaning}</p>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">Tidak ada kalimat yang cocok.</p>
        )}
      </div>
    </div>
  );
}
