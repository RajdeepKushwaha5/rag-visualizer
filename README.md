<<<<<<< HEAD
# 🧠 RAG System Visualizer

<div align="center">

![RAG Visualizer Logo](https://img.shields.io/badge/RAG-Visualizer-blue?style=for-the-badge&logo=brain&logoColor=white)

**An Interactive Educational Platform for Learning Retrieval-Augmented Generation (RAG)**

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge)](https://your-vercel-domain.vercel.app)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RajdeepKushwaha5/rag-visualizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*Learn how Retrieval-Augmented Generation works through visual animations and hands-on demonstrations*

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🎥 Demo](#-demo)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Installation](#️-installation)
- [🔑 API Configuration](#-api-configuration)
- [📁 Project Structure](#-project-structure)
- [🎯 Usage Guide](#-usage-guide)
- [🌐 Deployment](#-deployment)
- [🛠️ Technology Stack](#️-technology-stack)
- [📚 Educational Content](#-educational-content)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🌟 Features

### 🎭 Interactive Learning Experience
- **🔄 Real-time Animations**: Watch RAG processes unfold step-by-step
- **📊 Visual Data Flow**: See how documents transform into searchable vectors
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **📱 Mobile Friendly**: Works seamlessly across all devices

### 🧠 Educational Components
- **📖 RAG Overview**: Comprehensive introduction to RAG concepts
- **🗂️ Document Indexing**: Visual demonstration of document processing
- **🔍 Query Processing**: Step-by-step query resolution walkthrough
- **💬 Live Chat Demo**: Try the RAG system with your own questions

### 🔧 Technical Features
- **⚡ Real RAG Backend**: Powered by Google Gemini AI and Pinecone
- **🔐 Production Ready**: Security headers, rate limiting, and error handling
- **🌐 WebSocket Support**: Real-time updates and monitoring
- **📈 Performance Optimized**: Fast loading and smooth interactions

---

## 🎥 Demo

### 🖼️ Screenshots

| Overview Tab | Document Indexing | Query Processing | Live Demo |
|:------------:|:----------------:|:---------------:|:---------:|
| ![Overview](https://via.placeholder.com/200x120/667eea/white?text=Overview) | ![Indexing](https://via.placeholder.com/200x120/f093fb/white?text=Indexing) | ![Processing](https://via.placeholder.com/200x120/11998e/white?text=Processing) | ![Demo](https://via.placeholder.com/200x120/fc466b/white?text=Live+Demo) |

### 🎮 Interactive Features
- **Visual Animations**: See each step of the RAG pipeline
- **Process Monitoring**: Real-time status updates
- **Educational Tooltips**: Learn as you explore
- **Responsive Design**: Perfect on desktop, tablet, and mobile

---

## 🚀 Quick Start

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RajdeepKushwaha5/rag-visualizer)

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/RajdeepKushwaha5/rag-visualizer.git
cd rag-visualizer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start the development server
npm start

# Open your browser
# Navigate to http://localhost:3000
```

---

## ⚙️ Installation

### Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Node.js** | 18.0+ | JavaScript runtime |
| **npm** | 8.0+ | Package manager |
| **Google Gemini API** | Latest | AI embeddings & generation |
| **Pinecone** | Latest | Vector database |

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RajdeepKushwaha5/rag-visualizer.git
   cd rag-visualizer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys (see next section)
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Verify Installation**
   - Open http://localhost:3000
   - Check health endpoint: http://localhost:3000/health

---

## 🔑 API Configuration

### Required API Keys

#### 🤖 Google Gemini AI API Key

1. **Get API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Click "Get API Key" → "Create API Key"
   - Copy the generated key

2. **Add to Environment**:
   ```bash
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

#### 🗃️ Pinecone Vector Database

1. **Setup Pinecone**:
   - Sign up at [Pinecone.io](https://pinecone.io/)
   - Create a new project
   - Create an index with these settings:
     - **Name**: `rajdeepsingh` (or your preferred name)
     - **Dimensions**: `768`
     - **Metric**: `cosine`

2. **Get API Key**:
   - Navigate to "API Keys" in your Pinecone dashboard
   - Copy your API key

3. **Add to Environment**:
   ```bash
   PINECONE_API_KEY=your_actual_pinecone_api_key_here
   PINECONE_INDEX_NAME=rajdeepsingh
   ```

### Environment Variables Reference

```bash
# Core Configuration
GEMINI_API_KEY=your_gemini_api_key           # Required
PINECONE_API_KEY=your_pinecone_api_key       # Required
PINECONE_INDEX_NAME=your_index_name          # Required
NODE_ENV=development                         # development/production
PORT=3000                                    # Server port

# Optional Configuration
ALLOWED_ORIGINS=http://localhost:3000        # CORS origins
MAX_RETRIES=3                                # API retry count
REQUEST_TIMEOUT=30000                        # Request timeout (ms)
```

---

## 📁 Project Structure

```
rag-visualizer/
├── 📂 public/                   # Static frontend files
│   ├── 📄 index.html           # Main HTML template
│   ├── 🎨 styles.css           # Styling and animations
│   └── ⚡ script.js            # Frontend JavaScript
├── 🖥️ server.js                # Express.js backend server
├── 🎮 demo.js                  # Demo script for testing
├── ⚙️ vercel.json              # Vercel deployment config
├── 📋 DEPLOYMENT_GUIDE.md      # Detailed deployment guide
├── 🔐 .env.example             # Environment variables template
├── 🚫 .gitignore               # Git ignore rules
├── 📦 package.json             # Dependencies and scripts
└── 📖 README.md                # This file
```

### Key Files Explained

| File | Purpose | Description |
|------|---------|-------------|
| `public/index.html` | Frontend | Main HTML with 4 educational tabs |
| `public/styles.css` | Styling | CSS animations and responsive design |
| `public/script.js` | Interactivity | Frontend logic and animations |
| `server.js` | Backend | Express server with RAG implementation |
| `demo.js` | Testing | Standalone demo of RAG functionality |
| `vercel.json` | Deployment | Vercel platform configuration |

---

## 🎯 Usage Guide

### 📚 Educational Tabs

#### 1. **Overview Tab** - RAG Fundamentals
- **Purpose**: Introduction to RAG concepts
- **Features**: Interactive cards with animations
- **Learning**: Understand the complete RAG workflow

#### 2. **Document Indexing Tab** - Data Processing
- **Purpose**: See how documents become searchable
- **Demo**: PDF → Chunks → Vectors → Database
- **Features**: Step-by-step animations with monitoring

#### 3. **Query Processing Tab** - Query Resolution
- **Purpose**: Understand how questions are answered
- **Demo**: Query → Embedding → Search → Context → Response
- **Features**: Real-time similarity search visualization

#### 4. **Try It Live Tab** - Hands-on Experience
- **Purpose**: Interactive RAG system
- **Features**: 
  - Real-time chat interface
  - Process monitoring
  - Suggested queries
  - Response analysis

### 🎮 Interactive Features

- **🎭 Animations**: Visual feedback for all processes
- **📊 Monitoring**: Real-time status updates
- **💡 Tooltips**: Contextual help and explanations
- **📱 Responsive**: Optimized for all screen sizes

---

## 🌐 Deployment

### Quick Deploy Options

| Platform | Status | Deploy Button |
|----------|--------|---------------|
| **Vercel** | ✅ Supported | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RajdeepKushwaha5/rag-visualizer) |
| **Netlify** | ✅ Supported | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RajdeepKushwaha5/rag-visualizer) |

### Manual Deployment

1. **Prepare for Deployment**
   ```bash
   # Ensure environment variables are set
   # Commit all changes
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel Deployment**
   - Import repository in Vercel dashboard
   - Add environment variables
   - Deploy automatically

3. **Environment Variables for Production**
   ```bash
   GEMINI_API_KEY=your_production_key
   PINECONE_API_KEY=your_production_key
   PINECONE_INDEX_NAME=your_production_index
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-domain.vercel.app
   ```

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| **HTML5** | Structure | Latest |
| **CSS3** | Styling & Animations | Latest |
| **JavaScript ES6+** | Interactivity | Latest |
| **Font Awesome** | Icons | 6.0+ |
| **Google Fonts** | Typography | Latest |

### Backend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 18.0+ |
| **Express.js** | Web Framework | 4.18+ |
| **Socket.IO** | Real-time Communication | 4.7+ |
| **Helmet** | Security Headers | 7.2+ |
| **Express Rate Limit** | API Protection | 7.5+ |

### AI & Database
| Service | Purpose | Features |
|---------|---------|----------|
| **Google Gemini AI** | Text Embeddings & Generation | High-quality embeddings |
| **Pinecone** | Vector Database | Scalable similarity search |
| **LangChain** | AI Framework | Streamlined AI workflows |

### Development & Deployment
| Tool | Purpose | Benefits |
|------|---------|----------|
| **Vercel** | Hosting Platform | Serverless deployment |
| **Git** | Version Control | Change tracking |
| **npm** | Package Management | Dependency management |

---

## 📚 Educational Content

### 🎓 Learning Objectives

After using this platform, learners will understand:

1. **RAG Fundamentals**
   - What is Retrieval-Augmented Generation?
   - Why is RAG important in AI?
   - How does RAG improve LLM responses?

2. **Technical Implementation**
   - Document processing and chunking strategies
   - Vector embeddings and similarity search
   - Context retrieval and response generation

3. **Practical Applications**
   - When to use RAG systems
   - Best practices for implementation
   - Common challenges and solutions

### 📖 Educational Flow

```
Start: Overview → Concept Introduction → Document Indexing Demo → 
Query Processing Demo → Hands-on Practice → Complete Understanding
```

### 🏆 Learning Outcomes

- **Conceptual Understanding**: Grasp RAG fundamentals
- **Technical Knowledge**: Understand implementation details
- **Practical Skills**: Ability to build RAG systems
- **Critical Thinking**: Evaluate RAG system performance

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Reporting Issues

1. Check existing issues first
2. Use the issue template
3. Provide detailed reproduction steps
4. Include screenshots if applicable

### 💡 Suggesting Features

1. Open a feature request issue
2. Describe the use case
3. Explain the benefits
4. Provide examples if possible

### 🔧 Contributing Code

1. **Fork the repository**
   ```bash
   git fork https://github.com/RajdeepKushwaha5/rag-visualizer.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

### 📝 Development Guidelines

- **Code Style**: Follow existing patterns
- **Documentation**: Update README for new features
- **Testing**: Test all functionality before submitting
- **Responsive Design**: Ensure mobile compatibility

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ **Commercial Use**: Use in commercial applications
- ✅ **Modification**: Modify the source code
- ✅ **Distribution**: Distribute the software
- ✅ **Private Use**: Use in private projects
- ❗ **Liability**: No liability from authors
- ❗ **Warranty**: No warranty provided

---

## 👨‍💻 Author

<div align="center">

### **Rajdeep Singh Kushwaha**

*Full Stack Developer & AI Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-RajdeepKushwaha5-black?style=for-the-badge&logo=github)](https://github.com/RajdeepKushwaha5)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/rajdeep-singh-b658a833a/)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1da1f2?style=for-the-badge&logo=twitter)](https://x.com/rajdeeptwts)
[![Medium](https://img.shields.io/badge/Medium-Read-black?style=for-the-badge&logo=medium)](https://medium.com/@rajdeep01)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:rajdeepsingh10789@gmail.com)

</div>

### 🌟 About the Author

Passionate about creating interactive educational experiences and exploring the frontiers of AI technology. Building tools that make complex concepts accessible to everyone.

**Specialties**: Full Stack Development, AI/ML, Educational Technology, Interactive Visualizations

---

## 🙏 Acknowledgments

- **Google AI** for providing the Gemini API
- **Pinecone** for vector database services
- **LangChain** for AI framework integration
- **Vercel** for hosting platform
- **Open Source Community** for inspiration and support

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/RajdeepKushwaha5/rag-visualizer?style=social)
![GitHub forks](https://img.shields.io/github/forks/RajdeepKushwaha5/rag-visualizer?style=social)
![GitHub issues](https://img.shields.io/github/issues/RajdeepKushwaha5/rag-visualizer)
![GitHub license](https://img.shields.io/github/license/RajdeepKushwaha5/rag-visualizer)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**Made with ❤️ for the AI learning community**

</div>
