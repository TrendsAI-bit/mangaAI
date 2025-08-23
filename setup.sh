#!/bin/bash

echo "🎨 AI Comic Studio - アメ (Ame) Adventures Setup"
echo "================================================"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    echo "# Add your OpenAI API key here" > .env.local
    echo "OPENAI_API_KEY=sk-your-api-key-here" >> .env.local
    echo "✅ Created .env.local - Please add your OpenAI API key!"
else
    echo "✅ .env.local already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🚀 Setup complete! To start the development server:"
echo "   npm run dev"
echo ""
echo "📖 Don't forget to:"
echo "   1. Add your OpenAI API key to .env.local"
echo "   2. Visit http://localhost:3000"
echo ""
echo "🎭 Ready to create comics with アメ (Ame)!"
