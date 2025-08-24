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
    <div className="min-h-screen gradient-bg">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full sparkle opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full sparkle opacity-40" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-white rounded-full sparkle opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-white rounded-full sparkle opacity-30" style={{animationDelay: '1.5s'}}></div>
      </div>

      <main className="relative max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <header className="text-center space-y-6 pt-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src="/asset/アメ (Ame).png" 
                alt={AME_CHARACTER.name}
                className="w-20 h-20 rounded-full object-cover floating shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-black">
                ✨
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                Ame Manga AI
              </h1>
              <p className="text-xl text-white/90 font-medium">
                Starring {AME_CHARACTER.name}
              </p>
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-lg text-white/90 leading-relaxed">
              ✨ Write a story idea and watch {AME_CHARACTER.name} come to life in a beautiful manga! 
              Our AI will create panels, captions, dialogue, and generate artwork featuring your favorite fluffy character.
            </p>
          </div>
        </header>

        {/* Input Section */}
        <section className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input 
              value={idea} 
              onChange={e => setIdea(e.target.value)} 
              placeholder="What adventure should Ame go on?" 
              className="col-span-2 p-4 rounded-xl text-lg border-0 bg-white/90 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            <button 
              onClick={generate} 
              disabled={loading} 
              className="p-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>🎨 Generate Manga</span>
                </div>
              )}
            </button>
          </div>
          
          <input 
            value={style} 
            onChange={e => setStyle(e.target.value)} 
            placeholder="Visual style for アメ (Ame) character (optional)" 
            className="w-full p-4 rounded-xl text-lg border-0 bg-white/90 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          />
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="text-white font-semibold mb-2">Character-Driven</h3>
            <p className="text-white/80 text-sm">Every story features {AME_CHARACTER.name} as the main protagonist</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
            <p className="text-white/80 text-sm">GPT-4o generates stories and artwork with perfect consistency</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-white font-semibold mb-2">Beautiful Art</h3>
            <p className="text-white/80 text-sm">Export your manga as high-quality PNG images</p>
          </div>
        </section>

        {/* Comic Display */}
        {comic && (
          <div className="glass-effect rounded-2xl p-6">
            <ComicCanvas comic={comic} images={images} onReroll={reroll} />
          </div>
        )}
      </main>
    </div>
  );
}
