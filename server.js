import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Import RAG components
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: '../.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Security middleware
if (isProduction) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "wss:", "ws:"]
      }
    }
  }));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 100 : 1000, // limit each IP
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  }
});

app.use('/api/', limiter);

// Basic middleware
app.use(cors({
  origin: isProduction ? process.env.ALLOWED_ORIGINS?.split(',') || false : true
}));
app.use(express.json({ limit: '10mb' }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: isProduction ? '1d' : 0,
  etag: true
}));

// Request logging
if (isProduction) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Initialize AI components
const ai = new GoogleGenAI({});
let embeddings, pinecone, pineconeIndex;

// Initialize RAG components with retry logic
async function initializeRAG() {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      if (process.env.GEMINI_API_KEY) {
        embeddings = new GoogleGenerativeAIEmbeddings({
          apiKey: process.env.GEMINI_API_KEY,
          model: 'text-embedding-004',
        });
      }

      if (process.env.PINECONE_API_KEY && process.env.PINECONE_INDEX_NAME) {
        pinecone = new Pinecone({
          apiKey: process.env.PINECONE_API_KEY
        });
        pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
      }

      console.log('✅ RAG components initialized successfully');
      break;
    } catch (error) {
      retryCount++;
      console.error(`❌ Error initializing RAG components (attempt ${retryCount}):`, error.message);

      if (retryCount === maxRetries) {
        console.warn('⚠️ RAG initialization failed. Running in demo mode.');
        break;
      }

      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000 * retryCount));
    }
  }
}

// Sample DSA data for visualization
const sampleData = {
  documents: [
    {
      id: 1,
      title: "Arrays and Time Complexity",
      content: "Arrays are fundamental data structures that store elements in contiguous memory locations. They provide O(1) access time for elements when the index is known. However, insertion and deletion operations can be O(n) in the worst case.",
      chunks: [
        "Arrays are fundamental data structures that store elements in contiguous memory locations.",
        "They provide O(1) access time for elements when the index is known.",
        "However, insertion and deletion operations can be O(n) in the worst case."
      ]
    },
    {
      id: 2,
      title: "Binary Search Algorithm",
      content: "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half. Time complexity: O(log n). The algorithm compares the target value to the middle element of the array.",
      chunks: [
        "Binary search is an efficient algorithm for finding an item from a sorted list of items.",
        "It works by repeatedly dividing the search interval in half. Time complexity: O(log n).",
        "The algorithm compares the target value to the middle element of the array."
      ]
    },
    {
      id: 3,
      title: "Hash Tables and Hash Functions",
      content: "Hash tables use hash functions to compute an index into an array of buckets or slots. They provide average O(1) time complexity for insertions, deletions, and lookups. Collision handling is important for maintaining performance.",
      chunks: [
        "Hash tables use hash functions to compute an index into an array of buckets or slots.",
        "They provide average O(1) time complexity for insertions, deletions, and lookups.",
        "Collision handling is important for maintaining performance."
      ]
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get sample data for visualization
app.get('/api/sample-data', (req, res) => {
  res.json(sampleData);
});

// API endpoint to simulate document processing
app.post('/api/process-document', async (req, res) => {
  const { documentId } = req.body;
  const document = sampleData.documents.find(doc => doc.id === parseInt(documentId));

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  try {
    // Simulate chunking process
    const chunks = document.chunks.map((chunk, index) => ({
      id: `${documentId}-${index}`,
      content: chunk,
      vector: generateMockVector() // In real implementation, this would be actual embeddings
    }));

    res.json({
      documentId,
      title: document.title,
      chunks,
      processingSteps: [
        { step: 'Document Loading', completed: true, duration: 1000 },
        { step: 'Text Chunking', completed: true, duration: 1500 },
        { step: 'Vector Embedding', completed: true, duration: 2000 },
        { step: 'Database Storage', completed: true, duration: 1000 }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: 'Processing failed', details: error.message });
  }
});

// API endpoint for live RAG query with enhanced error handling
app.post('/api/query', async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({
      error: 'Question is required and must be a non-empty string',
      code: 'INVALID_INPUT'
    });
  }

  if (question.length > 1000) {
    return res.status(400).json({
      error: 'Question too long. Maximum 1000 characters allowed.',
      code: 'QUESTION_TOO_LONG'
    });
  }

  try {
    const startTime = Date.now();

    // Step 1: Generate embeddings for the query
    let queryVector;
    try {
      queryVector = embeddings ? await embeddings.embedQuery(question) : generateMockVector();
    } catch (embeddingError) {
      console.error('Embedding error:', embeddingError);
      queryVector = generateMockVector();
    }

    // Step 2: Search similar vectors
    let searchResults;
    try {
      if (pineconeIndex) {
        searchResults = await pineconeIndex.query({
          topK: 3,
          vector: queryVector,
          includeMetadata: true,
        });
      } else {
        throw new Error('Pinecone not available');
      }
    } catch (searchError) {
      console.error('Search error:', searchError);
      // Mock search results
      searchResults = {
        matches: sampleData.documents.slice(0, 3).map((doc, index) => ({
          id: doc.id.toString(),
          score: 0.9 - (index * 0.1),
          metadata: { text: doc.content }
        }))
      };
    }

    // Step 3: Prepare context
    const context = searchResults.matches.map(match => match.metadata.text).join("\n\n---\n\n");

    // Step 4: Generate response
    let response;
    try {
      if (ai && process.env.GEMINI_API_KEY) {
        const aiResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: [{
            role: 'user',
            parts: [{ text: question }]
          }],
          config: {
            systemInstruction: `You are a Data Structure and Algorithm Expert.
                        Answer the user's question based on the provided context.
                        If the answer is not in the context, say "I could not find the answer in the provided document."
                        Keep your answers clear, concise, and educational.
                        
                        Context: ${context}`,
            maxOutputTokens: 500,
            temperature: 0.7
          }
        });
        response = aiResponse.text;
      } else {
        throw new Error('AI model not available');
      }
    } catch (aiError) {
      console.error('AI generation error:', aiError);
      response = generateMockResponse(question, context);
    }

    const processingTime = Date.now() - startTime;

    res.json({
      question,
      queryVector: queryVector.slice(0, 8), // Show only first 8 dimensions
      searchResults: searchResults.matches.map(match => ({
        id: match.id,
        score: match.score,
        content: match.metadata.text.substring(0, 100) + '...'
      })),
      context: context.substring(0, 500) + '...',
      response,
      metadata: {
        processingTimeMs: processingTime,
        vectorDimensions: queryVector.length,
        contextLength: context.length,
        timestamp: new Date().toISOString()
      },
      processingSteps: [
        { step: 'Query Embedding', completed: true, duration: Math.min(processingTime * 0.1, 500) },
        { step: 'Vector Search', completed: true, duration: Math.min(processingTime * 0.3, 800) },
        { step: 'Context Retrieval', completed: true, duration: Math.min(processingTime * 0.1, 300) },
        { step: 'Response Generation', completed: true, duration: Math.min(processingTime * 0.5, 1200) }
      ]
    });

  } catch (error) {
    console.error('Query processing error:', error);
    res.status(500).json({
      error: 'Query processing failed',
      details: isProduction ? 'Internal server error' : error.message,
      code: 'PROCESSING_ERROR',
      timestamp: new Date().toISOString()
    });
  }
});

// Enhanced Socket.IO with error handling and rate limiting
const socketConnections = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id} from ${socket.handshake.address}`);

  // Track connection for rate limiting
  socketConnections.set(socket.id, {
    connectTime: Date.now(),
    requestCount: 0,
    lastRequest: Date.now()
  });

  // Rate limiting for socket events
  const rateLimitSocket = (eventName, limit = 5, windowMs = 60000) => {
    return (callback) => {
      const connection = socketConnections.get(socket.id);
      if (!connection) return;

      const now = Date.now();
      if (now - connection.lastRequest > windowMs) {
        connection.requestCount = 0;
      }

      connection.requestCount++;
      connection.lastRequest = now;

      if (connection.requestCount > limit) {
        socket.emit('rate-limit-exceeded', {
          message: `Too many ${eventName} requests. Please wait before trying again.`,
          retryAfter: windowMs
        });
        return;
      }

      callback();
    };
  };

  socket.on('start-indexing-demo', rateLimitSocket('indexing-demo', 3)(async (data) => {
    try {
      const { documentId } = data || {};

      // Emit processing steps in real-time with enhanced feedback
      const steps = [
        { step: 'loading', message: 'Loading PDF document...', duration: 2000, icon: 'file-pdf' },
        { step: 'chunking', message: 'Splitting text into chunks...', duration: 3000, icon: 'cut' },
        { step: 'embedding', message: 'Generating vector embeddings...', duration: 2500, icon: 'vector-square' },
        { step: 'storage', message: 'Storing vectors in database...', duration: 2000, icon: 'database' }
      ];

      for (const stepInfo of steps) {
        socket.emit('processing-step', {
          step: stepInfo.step,
          message: stepInfo.message,
          icon: stepInfo.icon,
          status: 'processing',
          timestamp: new Date().toISOString()
        });

        // Simulate processing time with progress updates
        const progressInterval = setInterval(() => {
          socket.emit('step-progress', {
            step: stepInfo.step,
            progress: Math.random() * 100
          });
        }, 200);

        await new Promise(resolve => setTimeout(resolve, stepInfo.duration));

        clearInterval(progressInterval);

        socket.emit('processing-step', {
          step: stepInfo.step,
          message: stepInfo.message,
          icon: stepInfo.icon,
          status: 'completed',
          timestamp: new Date().toISOString()
        });
      }

      socket.emit('indexing-complete', {
        documentId: documentId || 'sample-doc',
        totalSteps: steps.length,
        completedAt: new Date().toISOString(),
        summary: 'Document successfully processed and indexed into vector database'
      });
    } catch (error) {
      console.error('Indexing demo error:', error);
      socket.emit('demo-error', {
        type: 'indexing',
        message: 'An error occurred during the indexing demonstration',
        timestamp: new Date().toISOString()
      });
    }
  }));

  socket.on('start-query-demo', rateLimitSocket('query-demo', 5)(async (data) => {
    try {
      const { question } = data || {};

      if (!question || question.length > 500) {
        socket.emit('demo-error', {
          type: 'query',
          message: 'Invalid question provided',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const steps = [
        { step: 'embedding', message: 'Converting query to vector...', duration: 1000, icon: 'vector-square' },
        { step: 'search', message: 'Searching similar vectors...', duration: 1500, icon: 'search' },
        { step: 'retrieval', message: 'Retrieving relevant context...', duration: 800, icon: 'download' },
        { step: 'generation', message: 'Generating AI response...', duration: 2000, icon: 'brain' }
      ];

      for (const stepInfo of steps) {
        socket.emit('query-step', {
          step: stepInfo.step,
          message: stepInfo.message,
          icon: stepInfo.icon,
          status: 'processing',
          timestamp: new Date().toISOString()
        });

        await new Promise(resolve => setTimeout(resolve, stepInfo.duration));

        socket.emit('query-step', {
          step: stepInfo.step,
          message: stepInfo.message,
          icon: stepInfo.icon,
          status: 'completed',
          timestamp: new Date().toISOString()
        });
      }

      // Send final result with enhanced data
      const mockResponse = generateMockResponse(question);
      socket.emit('query-complete', {
        question,
        response: mockResponse,
        metadata: {
          processingTime: steps.reduce((sum, step) => sum + step.duration, 0),
          stepsCompleted: steps.length,
          confidence: 0.85 + Math.random() * 0.1,
          sources: ['Document chunk 1', 'Document chunk 2', 'Document chunk 3']
        },
        completedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Query demo error:', error);
      socket.emit('demo-error', {
        type: 'query',
        message: 'An error occurred during the query demonstration',
        timestamp: new Date().toISOString()
      });
    }
  }));

  socket.on('disconnect', (reason) => {
    console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    socketConnections.delete(socket.id);
  });

  socket.on('error', (error) => {
    console.error(`Socket error for ${socket.id}:`, error);
  });
});

// Utility functions
function generateMockVector(dimension = 8) {
  return Array.from({ length: dimension }, () => (Math.random() - 0.5) * 2);
}

function generateMockResponse(question, context = '') {
  const responses = {
    'binary search': 'Binary search has O(log n) time complexity. It works by repeatedly dividing the search interval in half.',
    'hash table': 'Hash tables provide O(1) average time complexity for insertions, deletions, and lookups using hash functions.',
    'array': 'Arrays provide O(1) access time when the index is known, but insertions and deletions can be O(n).',
    'time complexity': 'Time complexity describes how the runtime of an algorithm grows with input size.'
  };

  const lowercaseQuestion = question.toLowerCase();
  for (const [key, value] of Object.entries(responses)) {
    if (lowercaseQuestion.includes(key)) {
      return value;
    }
  }

  return 'Based on the provided context about data structures and algorithms, I can help answer questions about arrays, search algorithms, hash tables, and time complexity analysis.';
}

// Enhanced error handling and graceful shutdown
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Initialize and start server with enhanced error handling
async function startServer() {
  try {
    await initializeRAG();

    server.listen(PORT, () => {
      console.log(`🚀 RAG Visualizer Server running on http://localhost:${PORT}`);
      console.log(`📚 Access the interactive learning platform at http://localhost:${PORT}`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`⚡ Features: ${embeddings ? '✅' : '❌'} Embeddings, ${pineconeIndex ? '✅' : '❌'} Vector DB`);

      if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  GEMINI_API_KEY not found - running in demo mode');
      }
      if (!process.env.PINECONE_API_KEY) {
        console.warn('⚠️  PINECONE_API_KEY not found - using mock data');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
