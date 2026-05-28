import { createFileRoute, Link } from "@tanstack/react-router";
import { hiragana } from "@/content/kana";
import { KanaTable } from "@/components/kana-table";

export const Route = createFileRoute("/kana/hiragana")({
  head: () => ({
    meta: [
      { title: "Hiragana Lengkap — Dimzy Nihongo" },
      { name: "description", content: "Tabel Hiragana lengkap dengan 46 karakter dasar bahasa Jepang." },
      { property: "og:title", content: "Hiragana Lengkap — Dimzy Nihongo" },
      { property: "og:description", content: "Pelajari semua 46 karakter Hiragana dengan tabel interaktif." },
    ],
  }),
  component: HiraganaPage,
});

function HiraganaPage() {
  return (
    <div>
      <KanaTable rows={hiragana} />
      <div className="mt-8 text-center">
        <Link
          to="/practice/flashcards"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Latih dengan Flashcards
        </Link>
      </div>
    </div>
  );
}
