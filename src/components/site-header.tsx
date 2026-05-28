import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Flame, Search, Bookmark, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-provider";
import { useStreak } from "@/hooks/use-streak";

const navItems = [
  { to: "/", label: "Beranda" },
  { to: "/levels", label: "Level" },
  { to: "/kana", label: "Kana" },
  { to: "/kanji", label: "Kanji" },
  { to: "/grammar", label: "Tata Bahasa" },
  { to: "/vocabulary", label: "Kosakata" },
  { to: "/topics", label: "Frasa" },
  { to: "/sentences", label: "Kalimat" },
  { to: "/reader", label: "Bacaan" },
  { to: "/practice", label: "Latihan" },
  { to: "/review", label: "Review" },
  { to: "/exam", label: "Ujian" },
  { to: "/tools", label: "Alat" },
  { to: "/bookmarks", label: "Favorit" },
  { to: "/achievements", label: "Pencapaian" },
  { to: "/ebooks", label: "Ebook" },
  { to: "/about", label: "Tentang" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { current, isActiveToday } = useStreak();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-jp text-lg font-bold shadow-[var(--shadow-sakura)]">
            桜
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-foreground">Dimzy Nihongo</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              日本語学習
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-foreground bg-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/search" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground" title="Cari materi" aria-label="Cari">
            <Search className="h-4 w-4" />
          </Link>
          {current > 0 && (
            <Link
              to="/achievements"
              className={`inline-flex h-9 items-center gap-1 rounded-full border px-2.5 text-xs font-bold transition-colors ${
                isActiveToday
                  ? "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                  : "border-border bg-card text-muted-foreground"
              }`}
              title={`Streak ${current} hari${isActiveToday ? " — sudah belajar hari ini" : " — belum belajar hari ini"}`}
            >
              <Flame className="h-3.5 w-3.5" />
              {current}
            </Link>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground xl:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background xl:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-1 p-2 sm:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                activeProps={{ className: "text-foreground bg-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
