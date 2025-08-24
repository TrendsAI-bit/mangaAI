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

    // Enhance the prompt with character consistency based on reference image
    const enhancedPrompt = `Create an image that is an exact replica of the reference character ${AME_CHARACTER.name} from the image "${AME_CHARACTER.referenceImage}". ${AME_CHARACTER.imagePrompt}. ${prompt}. Comic panel style, clean lines, consistent character design. The character must be exactly: ${AME_CHARACTER.detailedDesign.body}, ${AME_CHARACTER.detailedDesign.eyes}, ${AME_CHARACTER.detailedDesign.mouth}, ${AME_CHARACTER.detailedDesign.limbs}, ${AME_CHARACTER.detailedDesign.posture}, ${AME_CHARACTER.detailedDesign.features}, ${AME_CHARACTER.detailedDesign.style}, ${AME_CHARACTER.detailedDesign.proportions}. The character should look exactly like the reference image in every panel - same proportions, same style, same cute fluffy black frog appearance.`;

    const img = await client.images.generate({
      model: "gpt-image-1",
      prompt: enhancedPrompt,
      size: size || "1024x1024",
      quality: "high",
      n: 1
    });

    const imageData = img.data?.[0];
    if (!imageData) throw new Error("No image returned");
    
    console.log("Image data received:", JSON.stringify(imageData, null, 2));
    
    // GPT-4o returns base64, DALL-E 3 returns URLs
    if (imageData.b64_json) {
      return NextResponse.json({ b64: imageData.b64_json });
    } else if (imageData.url) {
      return NextResponse.json({ url: imageData.url });
    } else {
      console.log("Available image data keys:", Object.keys(imageData));
      throw new Error("No image data returned");
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
