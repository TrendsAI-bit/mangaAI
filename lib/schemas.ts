import { z } from "zod";

export const PanelSchema = z.object({
  id: z.string(),
  prompt: z.string().min(10).describe("Concise visual prompt for image generation"),
  caption: z.string().default(""),
  dialogue: z.array(z.object({ speaker: z.string(), text: z.string() })).default([])
});

export const ComicSchema = z.object({
  title: z.string(),
  logline: z.string(),
  panels: z.array(PanelSchema).min(3).max(12)
});

export type Comic = z.infer<typeof ComicSchema>;
export type Panel = z.infer<typeof PanelSchema>;
