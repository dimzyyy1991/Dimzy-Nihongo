import type { KanaChar } from "@/content/kana";

export function KanaTable({ rows }: { rows: KanaChar[][] }) {
  return (
    <div className="overflow-x-auto">
      <div className="mx-auto grid max-w-2xl grid-cols-5 gap-2">
        {rows.flat().map((c, i) =>
          c.char ? (
            <div
              key={i}
              className="group flex aspect-square flex-col items-center justify-center rounded-xl border border-border bg-card p-2 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-accent"
            >
              <span className="font-jp text-3xl font-bold text-foreground sm:text-4xl">{c.char}</span>
              <span className="mt-1 text-xs font-medium text-muted-foreground">{c.romaji}</span>
            </div>
          ) : (
            <div key={i} className="aspect-square rounded-xl border border-dashed border-border/40" />
          )
        )}
      </div>
    </div>
  );
}
