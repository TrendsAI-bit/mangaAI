import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ComicSchema } from "@/lib/schemas";
import { CHARACTER_PROMPT, AME_CHARACTER } from "@/lib/character";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { idea, style } = await req.json();
    const system = `You are a comics writer and storyboarder specializing in cute, family-friendly stories. 
    
${CHARACTER_PROMPT}

Output must strictly follow the provided JSON schema. Create engaging, simple stories that showcase ${AME_CHARACTER.name}'s personality and abilities.`;

    const schema = ComicSchema;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: `Story idea: ${idea}\nTarget visual style: ${style || "manga, clean lines, expressive chibi, cute cartoon style"}.` }
      ],
      text: {
        format: {
          type: "json_schema",
          json_schema: {
            name: "Comic",
            schema: schema,
            strict: true
          }
        }
      }
    });

    const text = response.output_text || "";
    const parsed = JSON.parse(text);
    const validated = schema.parse(parsed);

    return NextResponse.json(validated);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 400 });
  }
}
