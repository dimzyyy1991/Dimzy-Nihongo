import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";

export const Route = createFileRoute("/grammar")({
  head: () => ({
    meta: [
      { title: "Tata Bahasa Jepang per Level — Dimzy Nihongo" },
      { name: "description", content: "Pelajari pola tata bahasa bahasa Jepang dari N5 hingga N1 dengan contoh kalimat dan terjemahan." },
      { property: "og:title", content: "Tata Bahasa Jepang per Level — Dimzy Nihongo" },
      { property: "og:description", content: "Pola tata bahasa bertahap untuk semua level JLPT." },
    ],
  }),
  component: GrammarPage,
});

function GrammarPage() {
  const [active, setActive] = useState<JlptLevel>("N5");
  const list = levels[active].grammar;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">文法</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Tata Bahasa</h1>
        <p className="mt-3 text-muted-foreground">Pola kunci untuk setiap level JLPT.</p>
      </div>

      <div className="mt-8 flex justify-center">
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
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {list.map((g) => (
          <div key={g.pattern} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-soft)]">
            <div className="font-jp text-xl font-bold text-primary">{g.pattern}</div>
            <div className="mt-1 text-sm font-semibold text-foreground">{g.meaning}</div>
            <div className="mt-4 rounded-xl bg-muted/60 p-4">
              <div className="font-jp text-lg text-foreground">{g.example}</div>
              <div className="mt-2 text-sm text-muted-foreground">{g.exampleMeaning}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
