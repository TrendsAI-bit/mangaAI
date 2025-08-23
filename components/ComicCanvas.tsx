"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { clsx } from "clsx";
import { AME_CHARACTER } from "@/lib/character";

export default function ComicCanvas({ comic, images, onReroll }: any) {
  const ref = useRef<HTMLDivElement>(null);

  async function exportPng() {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2 });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; 
    a.download = `${comic.title.replace(/\s+/g, "-")}-${AME_CHARACTER.name}.png`; 
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{comic.title}</h2>
          <p className="text-sm text-gray-600">Featuring {AME_CHARACTER.name}</p>
        </div>
        <button onClick={exportPng} className="px-3 py-1 rounded bg-black text-white hover:bg-gray-800 transition-colors">
          Export PNG
        </button>
      </div>
      <p className="opacity-70">{comic.logline}</p>
      <div ref={ref} className="grid md:grid-cols-3 gap-4">
        {comic.panels.map((p: any, idx: number) => (
          <div key={p.id} className={clsx("border rounded p-2 space-y-2 bg-white shadow-sm")}>
            <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden rounded">
              {images[idx] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[idx]} alt={p.caption} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm opacity-60">Generating image…</span>
              )}
            </div>
            <div className="text-sm">
              <p className="font-medium">{p.caption}</p>
              {p.dialogue?.map((d:any, i:number) => (
                <p key={i}><strong>{d.speaker}:</strong> {d.text}</p>
              ))}
            </div>
            <button onClick={() => onReroll(idx)} className="text-xs underline hover:no-underline">
              Re‑roll image (if character doesn't look like アメ)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
