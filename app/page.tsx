"use client";
import { useState } from "react";
import ComicCanvas from "@/components/ComicCanvas";
import { AME_CHARACTER } from "@/lib/character";

type Comic = { 
  title: string; 
  logline: string; 
  panels: { 
    id: string; 
    prompt: string; 
    caption: string; 
    dialogue: { speaker: string; text: string; }[] 
  }[] 
};

export default function Page() {
  const [idea, setIdea] = useState("Ame the fluffy frog discovers a magical pond");
  const [style, setStyle] = useState("cute cartoon-style black fluffy frog, messy fur texture like scruffy black cat, oversized round white eyes, tiny pink triangle nose-like mouth, webbed frog feet, hand-painted soft whimsical style");
  const [comic, setComic] = useState<Comic | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", { 
        method: "POST", 
        body: JSON.stringify({ idea, style }) 
      });
      const data: Comic = await res.json();
      if ((data as any).error) throw new Error((data as any).error);
      setComic(data);
      
      // Generate images per panel
      const outs: string[] = [];
      for (const p of data.panels) {
        const img = await fetch("/api/image", { 
          method: "POST", 
          body: JSON.stringify({ 
            prompt: `${style}. ${p.prompt}. Comic panel style, consistent character design.` 
          }) 
        });
        const imgData = await img.json();
        if (imgData.error) {
          console.error("Image generation error:", imgData.error);
          outs.push(""); // Add empty string for failed image
        } else {
          // Handle both base64 and URL formats
          if (imgData.b64) {
            outs.push(`data:image/png;base64,${imgData.b64}`);
          } else if (imgData.url) {
            outs.push(imgData.url);
          } else {
            console.error("No image data returned");
            outs.push(""); // Add empty string for failed image
          }
        }
        setImages([...outs]);
      }
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function reroll(idx: number) {
    if (!comic) return;
    const p = comic.panels[idx];
    const img = await fetch("/api/image", { 
      method: "POST", 
      body: JSON.stringify({ 
        prompt: `${style}. ${p.prompt}. Comic panel style, consistent character design.` 
      }) 
    });
    const imgData = await img.json();
    const next = images.slice(); 
    if (imgData.error) {
      console.error("Image generation error:", imgData.error);
      next[idx] = ""; // Clear failed image
    } else {
      // Handle both base64 and URL formats
      if (imgData.b64) {
        next[idx] = `data:image/png;base64,${imgData.b64}`;
      } else if (imgData.url) {
        next[idx] = imgData.url;
      } else {
        console.error("No image data returned for reroll");
        next[idx] = ""; // Clear failed image
      }
    }
    setImages(next);
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="space-y-4 text-center">
        <div className="flex items-center justify-center space-x-3">
          <img 
            src="/asset/アメ (Ame).png" 
            alt={AME_CHARACTER.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold">AI Comic Studio</h1>
            <p className="text-lg text-gray-600">Starring {AME_CHARACTER.name}</p>
          </div>
        </div>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Write a story idea and watch {AME_CHARACTER.name} come to life in a beautiful comic! 
          Our AI will create panels, captions, dialogue, and generate artwork featuring your favorite fluffy character.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto">
        <input 
          value={idea} 
          onChange={e => setIdea(e.target.value)} 
          placeholder="What adventure should Ame go on?" 
          className="border p-3 rounded col-span-2 text-lg"
        />
        <button 
          onClick={generate} 
          disabled={loading} 
          className="rounded bg-black text-white px-6 py-3 text-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating comic..." : "Generate Comic"}
        </button>
        <input 
          value={style} 
          onChange={e => setStyle(e.target.value)} 
          placeholder="Visual style for アメ (Ame) character (optional)" 
          className="border p-3 rounded md:col-span-3"
        />
      </section>

      {comic && <ComicCanvas comic={comic} images={images} onReroll={reroll} />}
    </main>
  );
}
