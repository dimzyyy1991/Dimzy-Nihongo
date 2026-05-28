import { createFileRoute } from "@tanstack/react-router";
import { counters } from "@/content/counters";
import { AudioButton } from "@/components/audio-button";

export const Route = createFileRoute("/tools/counters")({
  head: () => ({
    meta: [
      { title: "Counter Words (Josuushi) — Dimzy Nihongo" },
      { name: "description", content: "Pelajari kata penghitung Jepang: 人, 匹, 枚, 本, 冊, 台, dan lainnya beserta bacaannya." },
    ],
  }),
  component: CountersPage,
});

function CountersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Counter Words / 助数詞</h1>
        <p className="mt-2 text-muted-foreground">Kata penghitung khusus untuk objek berbeda di bahasa Jepang.</p>
      </header>

      <div className="space-y-4">
        {counters.map((c) => (
          <div key={c.kanji} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-jp text-5xl text-foreground">{c.kanji}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.reading} — {c.use}</p>
              </div>
              <AudioButton text={c.kanji} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {c.examples.map((ex) => (
                <div key={ex.n} className="rounded-md border border-border bg-background px-3 py-2 text-center">
                  <p className="font-jp text-lg text-foreground">{ex.n}{c.kanji}</p>
                  <p className="font-jp text-xs text-muted-foreground">{ex.reading}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
