import { z } from "zod";

export const AME_CHARACTER = {
  name: "アメ (Ame)",
  description: "A cute cartoon-style black fluffy frog with messy fur texture like a scruffy black cat, oversized round white eyes, and a tiny pink triangle nose-like mouth. Ame is curious, adventurous, and always ready for new experiences.",
  visualStyle: "cute cartoon style, simple flat colors, round edges, minimal details, consistent character proportions, Studio Ghibli-inspired chibi design",
  personality: "Curious, brave, sometimes naive but always determined. Ame speaks in simple, direct sentences and often expresses wonder at new discoveries.",
  abilities: "Can hop around, puff into smoke when surprised, and has a natural ability to make friends with other creatures.",
  catchphrases: ["Ame!", "Wow!", "Let's go!", "What's this?"],
  imagePrompt: "cute cartoon-style black fluffy frog sitting upright, with messy fur texture like a scruffy black cat, oversized round white eyes with small black pupils, tiny pink triangle nose-like mouth, slightly fluffy outline, thin limbs with webbed frog feet spread out in front, hand-painted soft whimsical style, clean white background, adorable slightly goofy expressive",
  detailedDesign: {
    body: "Black fluffy frog sitting upright, with messy fur texture like a scruffy black cat, slightly fluffy outline",
    eyes: "Oversized round white eyes with small black pupils, very expressive and cute",
    mouth: "Tiny pink triangle nose-like mouth, small and simple",
    limbs: "Thin limbs with webbed frog feet spread out in front",
    posture: "Sitting upright like a cat, keeping scruffy charm",
    features: "Fur-like texture (not smooth-skinned), minimal details",
    style: "Hand-painted soft whimsical style, clean white background, adorable slightly goofy expressive",
    proportions: "Exaggerated round eyes for cuteness, fluffy black cat turned into frog"
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
