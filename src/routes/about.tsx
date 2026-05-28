import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, BookOpen, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Tentang Dimzy Nihongo" },
      { name: "description", content: "Dimzy Nihongo adalah platform belajar bahasa Jepang lengkap dari N5 hingga N1 untuk pelajar Indonesia." },
      { property: "og:title", content: "Tentang Dimzy Nihongo" },
      { property: "og:description", content: "Misi kami: membuat bahasa Jepang mudah diakses untuk semua orang." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-jp text-sm font-semibold uppercase tracking-widest text-primary">私たちについて</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Tentang Dimzy Nihongo</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Platform belajar bahasa Jepang yang dirancang untuk membawa Anda dari nol
          hingga fasih — dengan cara yang menyenangkan dan terstruktur.
        </p>
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-gradient-to-br from-accent/30 to-card p-8 sm:p-12">
        <h2 className="text-2xl font-bold">Misi Kami</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Bahasa Jepang sering terasa menakutkan karena banyaknya aksara dan aturan. Dimzy
          Nihongo memecah setiap tahap JLPT menjadi langkah-langkah kecil yang bisa
          dipelajari setiap hari. Kami percaya konsistensi mengalahkan intensitas.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { icon: BookOpen, title: "Konten Terstruktur", desc: "Kurikulum mengikuti standar JLPT — dari N5 hingga N1." },
          { icon: Target, title: "Fokus Praktis", desc: "Setiap materi disertai contoh penggunaan yang nyata." },
          { icon: Sparkles, title: "Interaktif", desc: "Kuis, flashcards, dan tabel kana untuk pembelajaran aktif." },
          { icon: Heart, title: "Untuk Indonesia", desc: "Penjelasan dalam bahasa Indonesia dengan romaji untuk membantu." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-primary p-8 text-center text-primary-foreground">
        <p className="font-jp text-2xl">一歩ずつ</p>
        <h2 className="mt-2 text-2xl font-bold">Selangkah demi selangkah</h2>
        <p className="mt-2 text-primary-foreground/80">Mulai hari ini. Konsisten setiap hari. Hasilnya akan datang.</p>
        <Link to="/levels" className="mt-6 inline-flex rounded-xl bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:scale-105 transition-transform">
          Lihat Level JLPT
        </Link>
      </div>
    </div>
  );
}
