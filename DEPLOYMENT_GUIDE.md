# 🚀 RAG Visualizer Deployment Guide

## Prerequisites

1. **GitHub Account**: [Sign up at github.com](https://github.com)
2. **Vercel Account**: [Sign up at vercel.com](https://vercel.com)
3. **API Keys**: 
   - Google Gemini AI API Key
   - Pinecone Vector Database API Key

## Step-by-Step Deployment Process

### 🔧 **Step 1: Setup API Keys**

#### Get Google Gemini AI API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the API key (save it securely)

#### Get Pinecone API Key:
1. Go to [Pinecone.io](https://pinecone.io/)
2. Sign up for a free account
3. Create a new project
4. Go to "API Keys" section
5. Copy your API key
6. Create a new index (name it: `rag-visualizer-index`)

### 📁 **Step 2: Create GitHub Repository**

1. **Initialize Git Repository:**
   ```bash
   cd "d:\CA GenAI\Day08\rag-visualizer"
   git init
   git add .
   git commit -m "Initial commit: RAG Visualizer project"
   ```

2. **Create GitHub Repository:**
   - Go to [GitHub](https://github.com)
   - Click "New Repository"
   - Name: `rag-visualizer`
   - Description: `Interactive RAG System Visualizer for Learning`
   - Make it **Public** (for free Vercel deployment)
   - Don't initialize with README (we already have files)
   - Click "Create Repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/rag-visualizer.git
   git branch -M main
   git push -u origin main
   ```

### 🌐 **Step 3: Deploy to Vercel**

1. **Connect GitHub to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your `rag-visualizer` repository

2. **Configure Deployment:**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (default)
   - **Build Command**: Leave empty or `npm run build`
   - **Output Directory**: `public`
   - **Install Command**: `npm install`

3. **Set Environment Variables:**
   In Vercel project settings, add these environment variables:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key
   PINECONE_API_KEY=your_actual_pinecone_api_key
   PINECONE_INDEX_NAME=rag-visualizer-index
   NODE_ENV=production
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at: `https://your-project-name.vercel.app`

### ⚙️ **Step 4: Verify Deployment**

1. **Check Health Endpoint:**
   - Visit: `https://your-project-name.vercel.app/health`
   - Should return: `{"status": "healthy", "timestamp": "..."}`

2. **Test Main Application:**
   - Visit: `https://your-project-name.vercel.app`
   - All tabs should load properly
   - Try the "Try It Live" feature

### 🔄 **Step 5: Continuous Deployment**

Once set up, any push to your `main` branch will automatically trigger a new deployment.

```bash
# Make changes to your code
git add .
git commit -m "Updated feature X"
git push origin main
# Vercel will automatically deploy the changes
```

## 🛠️ Troubleshooting

### Common Issues:

1. **API Keys Not Working:**
   - Verify environment variables are set correctly in Vercel
   - Check that API keys are valid and have proper permissions

2. **Build Failures:**
   - Check Vercel build logs
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

3. **Static Files Not Loading:**
   - Ensure files are in the `public` directory
   - Check vercel.json configuration

4. **CORS Issues:**
   - Update ALLOWED_ORIGINS environment variable
   - Include your Vercel domain

### Logs and Monitoring:
- **Vercel Logs**: Dashboard > Project > Functions tab
- **Real-time Logs**: `vercel logs --follow`

## 📋 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini AI API key |
| `PINECONE_API_KEY` | Yes | Pinecone vector database API key |
| `PINECONE_INDEX_NAME` | Yes | Pinecone index name |
| `NODE_ENV` | Yes | Set to 'production' |
| `ALLOWED_ORIGINS` | No | Comma-separated allowed origins |

## 🎯 Production Optimizations

The deployed version includes:
- ✅ Security headers with Helmet
- ✅ Rate limiting for API protection
- ✅ CORS configuration
- ✅ Error handling and logging
- ✅ Health check endpoint
- ✅ Graceful shutdown handling
- ✅ Static file optimization

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Review GitHub repository structure

Your RAG Visualizer will be live and accessible to users worldwide! 🌍
