import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, Download, ExternalLink, Filter, Search, X } from "lucide-react";
import { ebooks, ebookCategories, ebookLevels } from "@/content/ebooks";

export const Route = createFileRoute("/ebooks")({
  head: () => ({
    meta: [
      { title: "Ebook Bahasa Jepang — Dimzy Nihongo" },
      { name: "description", content: "Koleksi ebook belajar bahasa Jepang dari berbagai sumber: buku teks, grammar, kanji, dan latihan JLPT. Unduh dan baca kapan saja." },
    ],
  }),
  component: EbooksPage,
});

function EbooksPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return ebooks.filter((book) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q) ||
        book.tags.some((t) => t.toLowerCase().includes(q)) ||
        (book.originalTitle && book.originalTitle.toLowerCase().includes(q));
      const matchesCategory = category === "all" || book.category === category;
      const matchesLevel = level === "all" || book.level === level;
      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [query, category, level]);

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) + (level !== "all" ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <BookOpen className="h-3.5 w-3.5" />
          Koleksi Buku Digital
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ebook Bahasa Jepang
        </h1>
        <p className="mt-3 text-muted-foreground">
          Kumpulan buku teks, grammar, kanji, dan materi JLPT untuk dibaca saat santai. Sumber dari{" "}
          <a
            href="https://welib.st/search?q=nihongo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            WeLib <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      </div>

      {/* Search & filters */}
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul, penulis, tag..."
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters || activeFiltersCount > 0
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-accent"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 flex flex-wrap gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {ebookCategories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      category === c.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Level JLPT</label>
              <div className="flex flex-wrap gap-2">
                {ebookLevels.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      level === l.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-2 text-xs text-muted-foreground">
          Menampilkan {filtered.length} dari {ebooks.length} buku
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((book) => (
          <div
            key={book.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={book.coverUrl}
                alt={book.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "";
                  (e.target as HTMLImageElement).className = "hidden";
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className = "flex h-full w-full items-center justify-center bg-accent text-primary";
                    fallback.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20'/></svg>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2">
                {book.level && book.level !== "general" && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {book.level}
                  </span>
                )}
                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {book.format}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground line-clamp-2">
                {book.title}
              </h3>
              {book.originalTitle && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1 font-jp">
                  {book.originalTitle}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                {book.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {book.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-[10px] text-muted-foreground">
                  {book.year} · {book.fileSize}
                </span>
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-sakura)] transition-transform hover:scale-105"
                >
                  <Download className="h-3.5 w-3.5" />
                  Buka
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mx-auto mt-20 max-w-md text-center">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">Tidak ada hasil</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Coba ubah kata kunci pencarian atau filter yang dipilih.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("all");
              setLevel("all");
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mx-auto mt-16 max-w-2xl rounded-xl border border-border bg-muted/30 p-5 text-center">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Ebook- ebook ini dikumpulkan dari sumber publik{" "}
          <a href="https://welib.st" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            WeLib
          </a>
          . Kami tidak menyimpan file di server kami. Setiap tautan mengarah ke halaman unduhan pihak ketiga.
          Gunakan untuk pembelajaran pribadi dan dukung penerbit dengan membeli buku asli jika memungkinkan.
        </p>
      </div>
    </div>
  );
}
