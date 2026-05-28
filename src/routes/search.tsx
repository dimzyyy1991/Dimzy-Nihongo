import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { levels, levelOrder } from "@/content/levels";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Cari Materi — Dimzy Nihongo" },
      { name: "description", content: "Cari kanji, kosakata, tata bahasa, dan kalimat di seluruh materi Dimzy Nihongo." },
    ],
  }),
  component: SearchPage,
});

interface Hit { type: "kanji" | "vocab" | "grammar" | "sentence"; level: string; jp: string; reading?: string; meaning: string; }

function buildIndex(): Hit[] {
  const out: Hit[] = [];
  for (const l of levelOrder) {
    const d = levels[l];
    d.kanji.forEach((k) => out.push({ type: "kanji", level: l, jp: k.kanji, reading: `${k.on} / ${k.kun}`, meaning: k.meaning }));
    d.vocabulary.forEach((v) => out.push({ type: "vocab", level: l, jp: v.jp, reading: v.romaji, meaning: v.meaning }));
    d.grammar.forEach((g) => out.push({ type: "grammar", level: l, jp: g.pattern, meaning: g.meaning }));
    d.sentences.forEach((s) => out.push({ type: "sentence", level: l, jp: s.jp, reading: s.romaji, meaning: s.meaning }));
  }
  return out;
}

const typeLabel = { kanji: "Kanji", vocab: "Kosakata", grammar: "Tata Bahasa", sentence: "Kalimat" };

function SearchPage() {
  const [q, setQ] = useState("");
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return index.filter((h) =>
      h.jp.toLowerCase().includes(s) ||
      (h.reading?.toLowerCase().includes(s) ?? false) ||
      h.meaning.toLowerCase().includes(s)
    ).slice(0, 200);
  }, [q, index]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Cari Materi</h1>
        <p className="mt-2 text-muted-foreground">Cari di seluruh kanji, kosakata, tata bahasa, dan kalimat.</p>
      </header>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ketik kanji, romaji, atau arti dalam bahasa Indonesia…"
          className="w-full rounded-xl border border-border bg-card py-4 pl-12 pr-4 text-lg focus:border-primary focus:outline-none"
        />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{q ? `${results.length} hasil` : `${index.length} item terindeks`}</p>

      <div className="mt-4 space-y-2">
        {results.map((h, i) => (
          <div key={i} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{typeLabel[h.type]}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{h.level}</span>
              </div>
              <p className="mt-2 font-jp text-2xl text-foreground">{h.jp}</p>
              {h.reading && <p className="font-jp text-sm text-muted-foreground">{h.reading}</p>}
              <p className="text-sm text-foreground">{h.meaning}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
