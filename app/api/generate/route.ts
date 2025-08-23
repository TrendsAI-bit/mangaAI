import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ComicSchema } from "@/lib/schemas";
import { CHARACTER_PROMPT, AME_CHARACTER } from "@/lib/character";

const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build" 
});

export async function POST(req: NextRequest) {
  try {
    const { idea, style } = await req.json();
    const system = `You are a comics writer and storyboarder specializing in cute, family-friendly stories. 
    
${CHARACTER_PROMPT}

Output must strictly follow the provided JSON schema. Create engaging, simple stories that showcase ${AME_CHARACTER.name}'s personality and abilities.`;

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
    const parsed = JSON.parse(text);
    const validated = schema.parse(parsed);

    return NextResponse.json(validated);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
