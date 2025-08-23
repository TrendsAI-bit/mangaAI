import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { AME_CHARACTER } from "@/lib/character";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
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

    const b64 = img.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image returned");

    return NextResponse.json({ b64 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
