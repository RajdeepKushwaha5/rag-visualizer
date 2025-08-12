// Demo script to showcase RAG Visualizer functionality
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

class RAGDemo {
  constructor() {
    this.ai = new GoogleGenAI({});
    this.embeddings = null;
    this.pinecone = null;
    this.pineconeIndex = null;
  }

  async initialize() {
    console.log('🔧 Initializing RAG Demo Components...\n');

    try {
      this.embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: 'text-embedding-004',
      });

      this.pinecone = new Pinecone();
      this.pineconeIndex = this.pinecone.Index(process.env.PINECONE_INDEX_NAME);

      console.log('✅ RAG components initialized successfully!\n');
      return true;
    } catch (error) {
      console.error('❌ Error initializing RAG components:', error.message);
      console.log('📝 Note: Demo will continue with mock data\n');
      return false;
    }
  }

  async demonstrateDocumentProcessing() {
    console.log('📚 === DOCUMENT PROCESSING DEMO ===\n');

    const sampleDocument = `
        Arrays are fundamental data structures that store elements in contiguous memory locations. 
        They provide O(1) access time for elements when the index is known. However, insertion and 
        deletion operations can be O(n) in the worst case when elements need to be shifted.
        
        Binary search is an efficient algorithm for finding an item from a sorted list of items. 
        It works by repeatedly dividing the search interval in half. The time complexity is O(log n), 
        making it much faster than linear search for large datasets.
        `;

    console.log('1️⃣ Document Loading:');
    console.log('   📄 Loading sample DSA document...');
    await this.sleep(1000);
    console.log('   ✅ Document loaded successfully\n');

    console.log('2️⃣ Text Chunking:');
    const chunks = this.chunkText(sampleDocument, 100);
    chunks.forEach((chunk, index) => {
      console.log(`   📝 Chunk ${index + 1}: "${chunk.substring(0, 50)}..."`);
    });
    await this.sleep(1500);
    console.log('   ✅ Text chunking completed\n');

    console.log('3️⃣ Vector Embeddings:');
    console.log('   🧠 Generating embeddings for each chunk...');
    const embeddings = [];

    for (let i = 0; i < chunks.length; i++) {
      await this.sleep(500);
      if (this.embeddings) {
        try {
          const embedding = await this.embeddings.embedQuery(chunks[i]);
          embeddings.push(embedding.slice(0, 8)); // Show first 8 dimensions
          console.log(`   🔢 Chunk ${i + 1} vector: [${embedding.slice(0, 4).map(v => v.toFixed(3)).join(', ')}...]`);
        } catch (error) {
          const mockEmbedding = this.generateMockVector(8);
          embeddings.push(mockEmbedding);
          console.log(`   🔢 Chunk ${i + 1} vector (mock): [${mockEmbedding.slice(0, 4).map(v => v.toFixed(3)).join(', ')}...]`);
        }
      } else {
        const mockEmbedding = this.generateMockVector(8);
        embeddings.push(mockEmbedding);
        console.log(`   🔢 Chunk ${i + 1} vector (mock): [${mockEmbedding.slice(0, 4).map(v => v.toFixed(3)).join(', ')}...]`);
      }
    }
    console.log('   ✅ Vector embeddings generated\n');

    console.log('4️⃣ Database Storage:');
    console.log('   🗃️  Storing vectors in Pinecone database...');
    await this.sleep(1000);
    console.log('   ✅ Vectors stored successfully\n');

    return { chunks, embeddings };
  }

  async demonstrateQueryProcessing(query = "What is the time complexity of binary search?") {
    console.log('🔍 === QUERY PROCESSING DEMO ===\n');

    console.log(`❓ User Query: "${query}"\n`);

    console.log('1️⃣ Query Embedding:');
    console.log('   🧠 Converting query to vector representation...');
    await this.sleep(800);

    let queryVector;
    if (this.embeddings) {
      try {
        queryVector = await this.embeddings.embedQuery(query);
        console.log(`   🔢 Query vector: [${queryVector.slice(0, 4).map(v => v.toFixed(3)).join(', ')}...]`);
      } catch (error) {
        queryVector = this.generateMockVector(8);
        console.log(`   🔢 Query vector (mock): [${queryVector.slice(0, 4).map(v => v.toFixed(3)).join(', ')}...]`);
      }
    } else {
      queryVector = this.generateMockVector(8);
      console.log(`   🔢 Query vector (mock): [${queryVector.slice(0, 4).map(v => v.toFixed(3)).join(', ')}...]`);
    }
    console.log('   ✅ Query embedding completed\n');

    console.log('2️⃣ Similarity Search:');
    console.log('   🎯 Searching for similar vectors in database...');
    await this.sleep(1200);

    // Mock similarity search results
    const mockResults = [
      { id: '1', score: 0.892, content: 'Binary search is an efficient algorithm for finding an item from a sorted list...' },
      { id: '2', score: 0.756, content: 'The time complexity is O(log n), making it much faster than linear search...' },
      { id: '3', score: 0.634, content: 'Arrays provide O(1) access time for elements when the index is known...' }
    ];

    mockResults.forEach((result, index) => {
      console.log(`   📊 Match ${index + 1}: Score ${result.score} - "${result.content.substring(0, 60)}..."`);
    });
    console.log('   ✅ Similarity search completed\n');

    console.log('3️⃣ Context Retrieval:');
    console.log('   📝 Retrieving relevant context from top matches...');
    await this.sleep(600);
    const context = mockResults.map(r => r.content).join('\n\n');
    console.log(`   📄 Retrieved context (${context.length} characters)`);
    console.log('   ✅ Context retrieval completed\n');

    console.log('4️⃣ Response Generation:');
    console.log('   🤖 Generating response using LLM...');
    await this.sleep(1500);

    const response = this.generateMockResponse(query);
    console.log(`   💬 Generated Response: "${response}"`);
    console.log('   ✅ Response generation completed\n');

    return response;
  }

  async runFullDemo() {
    console.log('🚀 === RAG SYSTEM COMPLETE DEMONSTRATION ===\n');
    console.log('Welcome to the RAG System Visualizer Demo!');
    console.log('This demo shows the complete pipeline of a RAG system.\n');

    const initialized = await this.initialize();

    if (!initialized) {
      console.log('⚠️  Running in demo mode with mock data\n');
    }

    await this.demonstrateDocumentProcessing();

    console.log('⏳ Simulating time gap between indexing and querying...\n');
    await this.sleep(2000);

    await this.demonstrateQueryProcessing();

    console.log('🎉 === DEMO COMPLETED ===\n');
    console.log('What you just saw:');
    console.log('1. Document processing: PDF → Chunks → Vectors → Database');
    console.log('2. Query processing: Question → Vector → Search → Context → Response');
    console.log('\n💡 To see this visually, open: http://localhost:3000');
    console.log('📚 The web interface provides interactive animations of these processes!');
  }

  // Utility methods
  chunkText(text, maxLength) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const chunks = [];
    let currentChunk = '';

    sentences.forEach(sentence => {
      if ((currentChunk + sentence).length <= maxLength) {
        currentChunk += sentence.trim() + '. ';
      } else {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence.trim() + '. ';
      }
    });

    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  }

  generateMockVector(dimension = 8) {
    return Array.from({ length: dimension }, () => (Math.random() - 0.5) * 2);
  }

  generateMockResponse(query) {
    const responses = {
      'binary search': 'Binary search has O(log n) time complexity. It works by repeatedly dividing the search interval in half, which makes it very efficient for sorted data.',
      'time complexity': 'Time complexity describes how the runtime of an algorithm grows with input size. Common complexities include O(1), O(log n), O(n), and O(n²).',
      'array': 'Arrays provide O(1) access time when the index is known, but insertions and deletions can be O(n) when elements need to be shifted.'
    };

    const lowercaseQuery = query.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseQuery.includes(key)) {
        return value;
      }
    }

    return 'Based on the provided context about data structures and algorithms, I can help answer questions about arrays, search algorithms, and complexity analysis.';
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the demo
const demo = new RAGDemo();
demo.runFullDemo().catch(console.error);
