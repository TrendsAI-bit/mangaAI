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
    const enhancedPrompt = `${AME_CHARACTER.imagePrompt}. ${prompt}. Comic panel style, clean lines, consistent character design. The character must be exactly: ${AME_CHARACTER.detailedDesign.body}, ${AME_CHARACTER.detailedDesign.eyes}, ${AME_CHARACTER.detailedDesign.mouth}, ${AME_CHARACTER.detailedDesign.limbs}, ${AME_CHARACTER.detailedDesign.posture}, ${AME_CHARACTER.detailedDesign.features}, ${AME_CHARACTER.detailedDesign.style}, ${AME_CHARACTER.detailedDesign.proportions}. The character should look like a fluffy black cat turned into a frog, with fur-like texture and webbed feet. IMPORTANT: The character must have the exact same design in every panel - black fluffy body, oversized round white eyes with black pupils, tiny pink triangle nose-like mouth, thin limbs with webbed frog feet spread out in front, sitting upright like a cat.`;

    const img = await client.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: size || "1024x1024",
      quality: "standard",
      n: 1
    });

    const imageData = img.data?.[0];
    if (!imageData) throw new Error("No image returned");
    
    // DALL-E 3 returns URLs, not base64
    if (imageData.url) {
      return NextResponse.json({ url: imageData.url });
    } else {
      throw new Error("No image URL returned");
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
