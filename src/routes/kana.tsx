import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/kana")({
  head: () => ({
    meta: [
      { title: "Hiragana & Katakana — Dimzy Nihongo" },
      { name: "description", content: "Pelajari Hiragana dan Katakana — dua sistem aksara dasar bahasa Jepang — dengan tabel lengkap dan latihan." },
      { property: "og:title", content: "Hiragana & Katakana — Dimzy Nihongo" },
      { property: "og:description", content: "Tabel lengkap dan latihan Hiragana & Katakana." },
    ],
  }),
  component: KanaLayout,
});

function KanaLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname === "/kana" || pathname === "/kana/";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">仮名</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Hiragana & Katakana
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Dua sistem aksara dasar yang wajib dikuasai sebelum melangkah ke kanji.
        </p>

        <div className="mt-6 inline-flex rounded-full border border-border bg-card p-1">
          <TabLink to="/kana/hiragana">ひらがな Hiragana</TabLink>
          <TabLink to="/kana/katakana">カタカナ Katakana</TabLink>
        </div>
      </div>

      <div className="mt-10">
        {isIndex ? <KanaIntro /> : <Outlet />}
      </div>
    </div>
  );
}

function TabLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      activeProps={{ className: "bg-primary text-primary-foreground" }}
    >
      {children}
    </Link>
  );
}

function KanaIntro() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Link to="/kana/hiragana" className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-sakura)]">
        <div className="font-jp text-6xl font-bold text-primary">あ い う</div>
        <h2 className="mt-4 text-2xl font-bold">Hiragana</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          46 karakter dasar untuk menulis kata asli Jepang, partikel, dan akhiran kata kerja.
        </p>
        <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">Mulai →</span>
      </Link>
      <Link to="/kana/katakana" className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-sakura)]">
        <div className="font-jp text-6xl font-bold text-primary">ア イ ウ</div>
        <h2 className="mt-4 text-2xl font-bold">Katakana</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          46 karakter untuk menulis kata serapan asing, nama, dan onomatopoeia.
        </p>
        <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">Mulai →</span>
      </Link>
    </div>
  );
}
