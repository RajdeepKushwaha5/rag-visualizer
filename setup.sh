#!/bin/bash

# RAG Visualizer Setup Script
echo "🚀 Setting up RAG Visualizer project..."
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your API keys before starting the server"
    echo ""
    echo "Required API Keys:"
    echo "1. GEMINI_API_KEY - Get from https://aistudio.google.com/"
    echo "2. PINECONE_API_KEY - Get from https://pinecone.io/"
    echo "3. PINECONE_INDEX_NAME - Your Pinecone index name"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Run 'npm start' to start the server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For deployment instructions, see DEPLOYMENT_GUIDE.md"
