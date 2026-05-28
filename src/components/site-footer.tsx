import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-jp text-lg font-bold text-primary-foreground">
                桜
              </span>
              <span className="text-base font-bold">Dimzy Nihongo</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Platform belajar bahasa Jepang lengkap dari N5 hingga N1. Kuasai kana, kanji,
              kosakata, tata bahasa, dan latihan interaktif — semua di satu tempat.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Belajar</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/kana" className="hover:text-foreground">Hiragana & Katakana</Link></li>
              <li><Link to="/kanji" className="hover:text-foreground">Kanji</Link></li>
              <li><Link to="/grammar" className="hover:text-foreground">Tata Bahasa</Link></li>
              <li><Link to="/vocabulary" className="hover:text-foreground">Kosakata</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Latihan</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/practice/quiz" className="hover:text-foreground">Kuis</Link></li>
              <li><Link to="/practice/flashcards" className="hover:text-foreground">Flashcards</Link></li>
              <li><Link to="/levels" className="hover:text-foreground">Level JLPT</Link></li>
              <li><Link to="/about" className="hover:text-foreground">Tentang Kami</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Dimzy Nihongo. Belajar bahasa Jepang dengan cinta.</p>
          <p className="font-jp">頑張ってください！</p>
        </div>
      </div>
    </footer>
  );
}
