import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Eraser, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { levels, levelOrder } from "@/content/levels";
import type { JlptLevel } from "@/content/types";

export const Route = createFileRoute("/tools/kanji-write")({
  head: () => ({
    meta: [
      { title: "Latihan Menulis Kanji — Dimzy Nihongo" },
      { name: "description", content: "Latih stroke order kanji dengan canvas di layar. Tulis kanji langsung dengan mouse atau jari." },
    ],
  }),
  component: KanjiWrite,
});

function KanjiWrite() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [idx, setIdx] = useState(0);
  const list = levels[level].kanji;
  const current = list[idx];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => clearCanvas(), [idx, level]);

  function clearCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1a1a1a";
    canvasRef.current!.setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }
  function end() {
    drawing.current = false;
  }

  const prev = () => setIdx((i) => (i - 1 + list.length) % list.length);
  const next = () => setIdx((i) => (i + 1) % list.length);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Latihan Menulis Kanji</h1>
        <p className="mt-2 text-muted-foreground">Tulis kanji di canvas. Bandingkan dengan referensi di sebelahnya.</p>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {levelOrder.map((l) => (
          <button
            key={l}
            onClick={() => { setLevel(l); setIdx(0); }}
            className={`rounded-md border px-3 py-1.5 text-sm font-semibold ${level === l ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-accent"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Referensi</p>
          <div className="flex aspect-square items-center justify-center rounded-xl bg-muted/40">
            <span className="font-jp text-[14rem] leading-none text-foreground">{current.kanji}</span>
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <p><span className="text-muted-foreground">On:</span> <span className="font-jp">{current.on}</span></p>
            <p><span className="text-muted-foreground">Kun:</span> <span className="font-jp">{current.kun}</span></p>
            <p><span className="text-muted-foreground">Arti:</span> {current.meaning}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tulis di sini</p>
          <div className="relative aspect-square rounded-xl bg-white">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-gray-300" />
            </div>
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full touch-none rounded-xl"
              onPointerDown={start}
              onPointerMove={move}
              onPointerUp={end}
              onPointerCancel={end}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={clearCanvas} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-accent">
              <Eraser className="h-4 w-4" /> Hapus
            </button>
            <button onClick={() => { clearCanvas(); }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold hover:bg-accent">
              <RotateCcw className="h-4 w-4" /> Coba lagi
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={prev} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
          <ChevronLeft className="h-4 w-4" /> Sebelumnya
        </button>
        <span className="text-sm text-muted-foreground">{idx + 1} / {list.length}</span>
        <button onClick={next} className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
          Berikutnya <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
