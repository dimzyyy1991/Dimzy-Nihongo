import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, PenTool, MessageSquare, Clock } from "lucide-react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";

export const Route = createFileRoute("/levels/$level")({
  head: ({ params }) => ({
    meta: [
      { title: `JLPT ${params.level} — Dimzy Nihongo` },
      { name: "description", content: `Materi lengkap JLPT ${params.level}: kanji, kosakata, dan tata bahasa untuk level ini.` },
      { property: "og:title", content: `JLPT ${params.level} — Dimzy Nihongo` },
      { property: "og:description", content: `Pelajari semua materi JLPT ${params.level} di Dimzy Nihongo.` },
    ],
  }),
  loader: ({ params }) => {
    const lv = params.level.toUpperCase() as JlptLevel;
    if (!levelOrder.includes(lv)) throw notFound();
    return { level: lv };
  },
  component: LevelDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Level tidak ditemukan</h1>
      <Link to="/levels" className="mt-4 inline-block text-primary hover:underline">Kembali ke daftar level</Link>
    </div>
  ),
});

function LevelDetail() {
  const data = Route.useLoaderData() as { level: JlptLevel };
  const lv = data.level;
  const level = levels[lv];


  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/levels" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Semua level
      </Link>

      <div className="mt-6 rounded-3xl border border-border bg-gradient-to-br from-accent/40 to-background p-8 sm:p-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-jp text-xs uppercase tracking-widest text-primary">日本語能力試験</span>
            <h1 className="mt-1 text-5xl font-extrabold text-foreground sm:text-6xl">
              <span className="text-primary">{lv}</span>
            </h1>
            <p className="mt-2 text-lg font-medium text-foreground">{level.tagline}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-semibold">{level.hours}</span>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-muted-foreground">{level.description}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <SummaryCard icon={PenTool} label="Kanji" total={level.kanjiCount} preview={level.kanji.length} />
        <SummaryCard icon={BookOpen} label="Kosakata" total={level.vocabCount} preview={level.vocabulary.length} />
        <SummaryCard icon={MessageSquare} label="Tata Bahasa" total={level.grammarCount} preview={level.grammar.length} />
      </div>

      {/* Kanji */}
      <Section title="Kanji" subtitle={`${level.kanji.length} contoh dari total ${level.kanjiCount.toLocaleString()} kanji`}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {level.kanji.map((k) => (
            <div key={k.kanji} className="rounded-xl border border-border bg-card p-4 transition-transform hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <span className="font-jp text-5xl font-bold text-primary">{k.kanji}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-foreground">{k.meaning}</div>
                  <div className="mt-1 text-xs text-muted-foreground">音 {k.on} · 訓 {k.kun}</div>
                  <div className="mt-2 text-xs text-foreground/80">{k.example}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Vocabulary */}
      <Section title="Kosakata" subtitle={`${level.vocabulary.length} contoh dari total ${level.vocabCount.toLocaleString()} kosakata`}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Jepang</th>
                <th className="px-4 py-3">Romaji</th>
                <th className="px-4 py-3">Arti</th>
                <th className="hidden px-4 py-3 sm:table-cell">Kategori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {level.vocabulary.map((v) => (
                <tr key={v.jp} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-jp text-lg font-semibold text-foreground">{v.jp}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.romaji}</td>
                  <td className="px-4 py-3 text-foreground">{v.meaning}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">{v.category}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Grammar */}
      <Section title="Tata Bahasa" subtitle={`${level.grammar.length} pola kunci`}>
        <div className="grid gap-3 md:grid-cols-2">
          {level.grammar.map((g) => (
            <div key={g.pattern} className="rounded-xl border border-border bg-card p-5">
              <div className="font-jp text-lg font-bold text-primary">{g.pattern}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{g.meaning}</div>
              <div className="mt-3 rounded-lg bg-muted/60 p-3">
                <div className="font-jp text-base text-foreground">{g.example}</div>
                <div className="mt-1 text-xs text-muted-foreground">{g.exampleMeaning}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Navigation */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <PrevNext lv={lv} />
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, total, preview }: { icon: typeof BookOpen; label: string; total: number; preview: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <div className="mt-4 text-3xl font-extrabold text-foreground">{total.toLocaleString()}</div>
      <div className="text-xs text-muted-foreground">{preview} ditampilkan di halaman ini</div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function PrevNext({ lv }: { lv: JlptLevel }) {
  const idx = levelOrder.indexOf(lv);
  const prev = idx > 0 ? levelOrder[idx - 1] : null;
  const next = idx < levelOrder.length - 1 ? levelOrder[idx + 1] : null;
  return (
    <>
      <div>
        {prev && (
          <Link to="/levels/$level" params={{ level: prev }} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> {prev}
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link to="/levels/$level" params={{ level: next }} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Lanjut ke {next} →
          </Link>
        )}
      </div>
    </>
  );
}
