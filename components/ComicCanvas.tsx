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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{comic.title}</h2>
          <p className="text-white/80">Ame Manga AI - Featuring {AME_CHARACTER.name}</p>
        </div>
        <button 
          onClick={exportPng} 
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          📥 Export PNG
        </button>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <p className="text-white/90 text-lg leading-relaxed">{comic.logline}</p>
      </div>
      
      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {comic.panels.map((p: any, idx: number) => (
          <div key={p.id} className={clsx("manga-panel bg-white rounded-xl p-4 space-y-4 shadow-lg")}>
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden rounded-lg border-2 border-gray-200">
              {images[idx] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[idx]} alt={p.caption} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600 font-medium">Generating image…</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-lg">{p.caption}</h3>
              <div className="space-y-2">
                {p.dialogue?.map((d:any, i:number) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm">
                      <span className="font-semibold text-purple-600">{d.speaker}:</span> 
                      <span className="text-gray-700 ml-2">{d.text}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => onReroll(idx)} 
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 text-sm"
            >
              🔄 Re-roll image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
