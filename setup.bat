@echo off
REM RAG Visualizer Setup Script for Windows

echo 🚀 Setting up RAG Visualizer project...
echo =====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check if .env exists
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️ Please edit .env file with your API keys before starting the server
    echo.
    echo Required API Keys:
    echo 1. GEMINI_API_KEY - Get from https://aistudio.google.com/
    echo 2. PINECONE_API_KEY - Get from https://pinecone.io/
    echo 3. PINECONE_INDEX_NAME - Your Pinecone index name
) else (
    echo ✅ .env file already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Edit .env file with your API keys
echo 2. Run 'npm start' to start the server
echo 3. Open http://localhost:3000 in your browser
echo.
echo For deployment instructions, see DEPLOYMENT_GUIDE.md

pause
