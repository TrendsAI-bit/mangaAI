# Ame Manga AI - アメ (Ame) Adventures

A Next.js application that generates manga featuring your favorite character アメ (Ame)! Write a story idea and watch as AI creates a complete manga with panels, captions, dialogue, and beautiful artwork based on the reference image.

## Features

- **Character-Driven Stories**: Every manga features アメ (Ame) as the main protagonist
- **AI-Powered Generation**: Uses OpenAI's GPT-4 and GPT-4o for story and image creation
- **Interactive Interface**: Re-roll images, edit text, and export manga as PNG
- **Reference Image-Based**: All character generation is based on the actual アメ (Ame) reference image
- **Consistent Character Design**: Maintains アメ (Ame)'s unique appearance across all panels
- **Beautiful UI**: Clean, modern interface with Tailwind CSS

## Character: アメ (Ame)

アメ (Ame) is a cute, fluffy black creature with:
- Big round eyes
- Tiny beak-like mouth  
- Round fuzzy body
- Curious and adventurous personality
- Ability to hop around and make friends

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** + **React**
- **Tailwind CSS** for styling
- **OpenAI API** (GPT-4 + DALL-E 3)
- **Zod** for schema validation
- **html2canvas** for PNG export

## Setup

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Enter a story idea** - Describe what adventure アメ (Ame) should go on
2. **Choose a visual style** (optional) - Customize the art style
3. **Click "Generate Comic"** - Watch as AI creates your story
4. **Interact with panels** - Re-roll images or export the comic
5. **Download your comic** - Save as PNG for sharing

## Project Structure

```
comicAI/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # Story generation API
│   │   └── image/route.ts       # Image generation API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── components/
│   └── ComicCanvas.tsx          # Comic display component
├── lib/
│   ├── character.ts             # アメ (Ame) character definition
│   └── schemas.ts               # Zod schemas
├── public/
│   └── asset/
│       └── アメ (Ame).png       # Character image
└── package.json
```

## API Endpoints

- `POST /api/generate` - Generates comic story with structured JSON
- `POST /api/image` - Generates panel artwork with character consistency

## Character Integration

The app is specifically designed around アメ (Ame) with:
- Consistent character prompts in image generation
- Character personality in story generation
- Visual style guidelines for artwork
- Character-specific dialogue patterns

## Future Enhancements

- Multi-page comics
- PDF export
- Character customization
- Story templates
- Community sharing
- Character voice generation

## License

MIT License - feel free to use and modify!

---

Made with ❤️ for アメ (Ame) fans everywhere!
