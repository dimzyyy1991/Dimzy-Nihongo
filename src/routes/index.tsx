import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, GraduationCap, Sparkles, Target, Layers, Trophy, Headphones, Flame, FileText, ClipboardCheck } from "lucide-react";
import { levels, levelOrder } from "@/content/levels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dimzy Nihongo — Belajar Bahasa Jepang dari N5 hingga N1" },
      { name: "description", content: "Mulai perjalanan bahasa Jepang Anda dengan kurikulum terstruktur, latihan interaktif, dan materi lengkap dari pemula hingga ahli." },
      { property: "og:title", content: "Dimzy Nihongo — Belajar Bahasa Jepang" },
      { property: "og:description", content: "Kuasai bahasa Jepang dari N5 sampai N1 dengan materi terstruktur dan latihan interaktif." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Lengkap N5 — N1
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Belajar Bahasa Jepang,
              <br />
              <span className="bg-gradient-to-r from-primary to-rose-500 bg-clip-text text-transparent">
                dari nol hingga fasih.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Dimzy Nihongo memandu Anda melewati setiap tahapan JLPT dengan kurikulum
              terstruktur, kana interaktif, ribuan kanji, dan latihan yang menyenangkan.
            </p>
            <p className="mt-4 font-jp text-2xl text-foreground/80">
              ようこそ、日本語の世界へ。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/levels"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sakura)] transition-transform hover:scale-105"
              >
                Mulai Belajar
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/kana/hiragana"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Pelajari Hiragana
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { label: "Level JLPT", value: "5" },
              { label: "Kanji", value: "2000+" },
              { label: "Kosakata", value: "10k+" },
              { label: "Pola tata bahasa", value: "800+" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center backdrop-blur">
                <div className="text-3xl font-extrabold text-primary">{s.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Semua yang Anda butuhkan untuk fasih
          </h2>
          <p className="mt-3 text-muted-foreground">
            Materi terstruktur dan latihan interaktif yang mengikuti standar JLPT resmi.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: BookOpen, title: "Kana Interaktif", desc: "Pelajari Hiragana dan Katakana dengan tabel lengkap dan latihan kartu." },
            { icon: Layers, title: "Kanji per Level", desc: "Ribuan kanji dikelompokkan per level JLPT dengan onyomi, kunyomi, dan contoh." },
            { icon: GraduationCap, title: "Tata Bahasa Bertahap", desc: "Pola tata bahasa dari yang paling dasar hingga ekspresi tingkat ahli." },
            { icon: Target, title: "Kosakata Tematik", desc: "Kosakata diorganisir per tema agar mudah diingat dan diaplikasikan." },
            { icon: Trophy, title: "Kuis & Flashcards", desc: "Uji pemahaman dengan kuis interaktif dan flashcards bergaya SRS." },
            { icon: Sparkles, title: "Progres Tersimpan", desc: "Kemajuan Anda otomatis tersimpan di perangkat tanpa perlu akun." },
          ].map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[var(--shadow-soft)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-transform group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Levels roadmap */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Jalur belajar Anda
            </h2>
            <p className="mt-3 text-muted-foreground">
              Lima level JLPT, dari pemula sampai ahli. Pilih di mana Anda ingin memulai.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {levelOrder.map((lv, idx) => {
              const level = levels[lv];
              return (
                <Link
                  key={lv}
                  to="/levels/$level"
                  params={{ level: lv }}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-sakura)]"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Tahap {idx + 1}
                  </span>
                  <span className="mt-2 text-4xl font-extrabold text-primary">{lv}</span>
                  <span className="mt-2 text-sm font-medium text-foreground">{level.tagline}</span>
                  <span className="mt-4 text-xs text-muted-foreground">{level.hours} belajar</span>
                  <ArrowRight className="absolute right-5 top-5 h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/levels"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Lihat semua level <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* New tools */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Alat baru untuk belajar lebih konsisten
            </h2>
            <p className="mt-3 text-muted-foreground">
              Review harian, simulasi ujian, bacaan bertahap, dan audio pengucapan.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { to: "/review", icon: Flame, title: "Review Harian", desc: "Jaga streak dengan 15 kartu sehari." },
              { to: "/exam", icon: ClipboardCheck, title: "Simulasi JLPT", desc: "Mock test bertimer + analisis hasil." },
              { to: "/reader", icon: FileText, title: "Bacaan Bertahap", desc: "Cerita pendek dengan audio & romaji." },
              { to: "/topics", icon: Headphones, title: "Frasa Tematik", desc: "Frasa praktis untuk situasi nyata." },
            ].map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition-transform group-hover:scale-110">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Buka <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ebook CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 sm:px-12">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/30 blur-2xl" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <BookOpen className="h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Bosan belajar? Baca ebook bahasa Jepang
            </h2>
            <p className="mt-3 text-muted-foreground">
              Koleksi buku teks, grammar, kanji, dan materi JLPT yang bisa kamu baca kapan saja.
              Unduh gratis dari sumber terbuka.
            </p>
            <Link
              to="/ebooks"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-sakura)] transition-transform hover:scale-105"
            >
              Jelajahi Ebook <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-rose-600 px-6 py-16 text-center text-primary-foreground sm:px-12">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <p className="font-jp text-3xl opacity-90">始めましょう</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Siap memulai perjalanan Anda?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
            Mulai dari Hiragana hari ini dan rasakan sendiri seberapa cepat Anda bisa membaca Jepang.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/kana/hiragana"
              className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-transform hover:scale-105"
            >
              Mulai dengan Hiragana <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/practice/quiz"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-white/10"
            >
              Coba Kuis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
