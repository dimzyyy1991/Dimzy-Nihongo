import { createFileRoute, Link } from "@tanstack/react-router";
import { katakana } from "@/content/kana";
import { KanaTable } from "@/components/kana-table";

export const Route = createFileRoute("/kana/katakana")({
  head: () => ({
    meta: [
      { title: "Katakana Lengkap — Dimzy Nihongo" },
      { name: "description", content: "Tabel Katakana lengkap dengan 46 karakter untuk kata serapan asing." },
      { property: "og:title", content: "Katakana Lengkap — Dimzy Nihongo" },
      { property: "og:description", content: "Pelajari semua 46 karakter Katakana." },
    ],
  }),
  component: KatakanaPage,
});

function KatakanaPage() {
  return (
    <div>
      <KanaTable rows={katakana} />
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
