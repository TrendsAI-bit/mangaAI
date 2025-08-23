import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ComicSchema } from "@/lib/schemas";
import { CHARACTER_PROMPT, AME_CHARACTER } from "@/lib/character";

const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

if (!process.env.OPENAI_API_KEY) {
  return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
}

export async function POST(req: NextRequest) {
  try {
    const { idea, style } = await req.json();
    const system = `You are a comics writer and storyboarder specializing in cute, family-friendly stories. 
    
${CHARACTER_PROMPT}

You must respond with a valid JSON object that includes:
- "title": A catchy title for the comic
- "logline": A brief summary of the story
- "panels": An array of 3-6 panel objects, each with:
  - "id": A unique identifier
  - "prompt": A visual description for image generation
  - "caption": A brief caption for the panel
  - "dialogue": An array of dialogue objects with "speaker" and "text"

Create engaging, simple stories that showcase ${AME_CHARACTER.name}'s personality and abilities.`;

    const schema = ComicSchema;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Story idea: ${idea}\nTarget visual style: ${style || "manga, clean lines, expressive chibi, cute cartoon style"}.` }
      ],
      response_format: { type: "json_object" }
    });

    const text = response.choices[0]?.message?.content || "";
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 500 });
    }
    
    try {
      const validated = schema.parse(parsed);
      return NextResponse.json(validated);
    } catch (e) {
      console.error("Schema validation failed:", e);
      return NextResponse.json({ error: "AI response doesn't match expected format" }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
