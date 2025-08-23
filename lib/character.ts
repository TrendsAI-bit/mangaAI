import { z } from "zod";

export const AME_CHARACTER = {
  name: "アメ (Ame)",
  description: "A cute, fluffy black creature with big round eyes, a tiny beak-like mouth, and a round fuzzy body. Ame is curious, adventurous, and always ready for new experiences.",
  visualStyle: "cute cartoon style, simple flat colors, round edges, minimal details, consistent character proportions, Studio Ghibli-inspired chibi design",
  personality: "Curious, brave, sometimes naive but always determined. Ame speaks in simple, direct sentences and often expresses wonder at new discoveries.",
  abilities: "Can hop around, puff into smoke when surprised, and has a natural ability to make friends with other creatures.",
  catchphrases: ["Ame!", "Wow!", "Let's go!", "What's this?"],
  imagePrompt: "cute fluffy black creature with two large perfectly round white eyes with black pupils, tiny triangular pink beak-like mouth, round fuzzy body with subtle texture, four slender black stick-like limbs resembling frog legs with three-toed feet, squatting posture, simple cartoon style, minimal details, clean lines, no shadows or textures",
  detailedDesign: {
    body: "Round, fluffy black silhouette with subtle texture around edges suggesting fur, soft and fuzzy appearance",
    eyes: "Two large, perfectly round white eyes with solid black pupils positioned centrally, wide-eyed and innocent expression",
    mouth: "Tiny triangular pink beak-like mouth below and between the eyes, very small and simple",
    limbs: "Four slender black stick-like limbs resembling frog legs, bent at knees with three-toed feet splayed out",
    posture: "Squatting or sitting posture, body low to ground with limbs spread out for stability",
    features: "Minimal details, no nose, no ears, just the essential cute features",
    style: "Clean cartoon aesthetic, solid black body and limbs, bright white eyes and pink mouth, no shadows or textures",
    proportions: "Chibi proportions, simple and clean design"
  }
};

export const CHARACTER_PROMPT = `
Main Character: ${AME_CHARACTER.name}
Description: ${AME_CHARACTER.description}
Visual Style: ${AME_CHARACTER.visualStyle}
Personality: ${AME_CHARACTER.personality}
Abilities: ${AME_CHARACTER.abilities}

Character Design Specifications:
- Body: ${AME_CHARACTER.detailedDesign.body}
- Eyes: ${AME_CHARACTER.detailedDesign.eyes}
- Mouth: ${AME_CHARACTER.detailedDesign.mouth}
- Features: ${AME_CHARACTER.detailedDesign.features}
- Style: ${AME_CHARACTER.detailedDesign.style}
- Proportions: ${AME_CHARACTER.detailedDesign.proportions}

Every story must feature ${AME_CHARACTER.name} as the main protagonist. The character should be drawn consistently with big round eyes, a tiny beak, and a fluffy black round body. The art style should be cute and cartoon-like with simple colors and clean lines.
`;
