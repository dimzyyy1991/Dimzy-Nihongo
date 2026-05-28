import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { topics } from "@/content/topics";
import { AudioButton } from "@/components/audio-button";

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "Kosakata Tematik — Frasa Praktis Bahasa Jepang" },
      { name: "description", content: "Frasa praktis bahasa Jepang per situasi: restoran, transportasi, belanja, kantor, darurat, dan lainnya." },
      { property: "og:title", content: "Kosakata Tematik — Dimzy Nihongo" },
      { property: "og:description", content: "Frasa siap pakai untuk situasi nyata." },
    ],
  }),
  component: TopicsPage,
});

function TopicsPage() {
  const [active, setActive] = useState(topics[0].id);
  const current = topics.find((t) => t.id === active) ?? topics[0];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">場面別</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Frasa per Situasi</h1>
        <p className="mt-3 text-muted-foreground">Frasa siap pakai untuk situasi nyata sehari-hari.</p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === t.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            <span>{t.emoji}</span>
            <span>{t.title}</span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-sm text-muted-foreground">{current.description}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {current.phrases.map((p, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
              <AudioButton text={p.jp} className="mt-1 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-jp text-lg font-semibold text-foreground">{p.jp}</p>
                <p className="text-xs text-muted-foreground">{p.romaji}</p>
                <p className="mt-1 text-sm text-foreground">{p.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
