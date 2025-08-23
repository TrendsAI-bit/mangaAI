export const AME_CHARACTER = {
  name: "アメ (Ame)",
  description: "A cute, fluffy black creature with big round eyes, a tiny beak-like mouth, and a round fuzzy body. Ame is curious, adventurous, and always ready for new experiences.",
  visualStyle: "cute cartoon style, simple flat colors, round edges, minimal details, consistent character proportions, Studio Ghibli-inspired chibi design",
  personality: "Curious, brave, sometimes naive but always determined. Ame speaks in simple, direct sentences and often expresses wonder at new discoveries.",
  abilities: "Can hop around, puff into smoke when surprised, and has a natural ability to make friends with other creatures.",
  catchphrases: ["Ame!", "Wow!", "Let's go!", "What's this?"],
  imagePrompt: "cute fluffy black creature with big round eyes, tiny beak-like mouth, round fuzzy body, simple cartoon style, minimal details, consistent character design, Studio Ghibli-inspired, chibi proportions, black silhouette with white eyes, no complex features"
};

export const CHARACTER_PROMPT = `
Main Character: ${AME_CHARACTER.name}
Description: ${AME_CHARACTER.description}
Visual Style: ${AME_CHARACTER.visualStyle}
Personality: ${AME_CHARACTER.personality}
Abilities: ${AME_CHARACTER.abilities}

Every story must feature ${AME_CHARACTER.name} as the main protagonist. The character should be drawn consistently with big round eyes, a tiny beak, and a fluffy black round body. The art style should be cute and cartoon-like with simple colors and clean lines.
`;
