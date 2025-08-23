import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { AME_CHARACTER } from "@/lib/character";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const client = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
    const { prompt, size } = await req.json();

    // Enhance the prompt with character consistency
    const enhancedPrompt = `${AME_CHARACTER.imagePrompt}. ${prompt}. Comic panel style, clean lines, consistent character design.`;

    const img = await client.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: size || "1024x1024",
      quality: "standard",
      n: 1
    });

    const imageData = img.data?.[0];
    if (!imageData) throw new Error("No image returned");
    
    // Check if we have base64 data or URL
    if (imageData.b64_json) {
      return NextResponse.json({ b64: imageData.b64_json });
    } else if (imageData.url) {
      return NextResponse.json({ url: imageData.url });
    } else {
      throw new Error("No image data returned");
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
