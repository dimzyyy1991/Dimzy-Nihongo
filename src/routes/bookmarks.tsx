import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark as BookmarkIcon, Trash2 } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { AudioButton } from "@/components/audio-button";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Favorit / Bookmark — Dimzy Nihongo" },
      { name: "description", content: "Daftar kanji, kosakata, tata bahasa, dan kalimat yang Anda tandai sebagai favorit." },
    ],
  }),
  component: Bookmarks,
});

const typeLabel = { kanji: "Kanji", vocab: "Kosakata", grammar: "Tata Bahasa", sentence: "Kalimat" } as const;

function Bookmarks() {
  const { items, toggle, clear } = useBookmarks();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Favorit Saya</h1>
          <p className="mt-2 text-muted-foreground">{items.length} item tersimpan untuk di-review.</p>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" /> Hapus semua
          </button>
        )}
      </header>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <BookmarkIcon className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 text-foreground">Belum ada favorit.</p>
          <p className="mt-1 text-sm text-muted-foreground">Tandai kanji, kosakata, atau kalimat dengan ikon bookmark untuk menyimpannya di sini.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link to="/kanji" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Jelajah Kanji</Link>
            <Link to="/vocabulary" className="rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">Jelajah Kosakata</Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((b) => (
            <div key={b.id} className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{typeLabel[b.type]}</span>
                  {b.level && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{b.level}</span>}
                </div>
                <p className="mt-2 font-jp text-2xl text-foreground">{b.jp}</p>
                {b.reading && <p className="font-jp text-sm text-muted-foreground">{b.reading}</p>}
                <p className="mt-1 text-sm text-foreground">{b.meaning}</p>
              </div>
              <div className="flex flex-col gap-2">
                <AudioButton text={b.jp} />
                <button onClick={() => toggle(b)} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-destructive" title="Hapus">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
