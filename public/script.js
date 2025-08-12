// Sample DSA data for demonstrations
const dsaData = {
  chunks: [
    {
      id: 1,
      content: "Arrays are fundamental data structures that store elements in contiguous memory locations. They provide O(1) access time for elements when the index is known.",
      vector: [0.12, -0.34, 0.56, -0.78, 0.23, -0.45, 0.67, -0.89]
    },
    {
      id: 2,
      content: "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half. Time complexity: O(log n).",
      vector: [0.89, -0.12, 0.34, -0.56, 0.78, -0.23, 0.45, -0.67]
    },
    {
      id: 3,
      content: "Hash tables use hash functions to compute an index into an array of buckets or slots. They provide average O(1) time complexity for insertions, deletions, and lookups.",
      vector: [0.45, -0.67, 0.89, -0.12, 0.34, -0.56, 0.78, -0.23]
    },
    {
      id: 4,
      content: "Binary trees are hierarchical data structures where each node has at most two children. They are used for efficient searching, sorting, and organizing data.",
      vector: [0.23, -0.45, 0.67, -0.89, 0.12, -0.34, 0.56, -0.78]
    },
    {
      id: 5,
      content: "Merge sort is a divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them. Time complexity: O(n log n).",
      vector: [0.67, -0.89, 0.12, -0.34, 0.56, -0.78, 0.23, -0.45]
    }
  ],
  responses: {
    "What is the time complexity of binary search?": "Binary search has a time complexity of O(log n). This is because the algorithm repeatedly divides the search interval in half, reducing the search space exponentially with each comparison.",
    "How do hash tables work?": "Hash tables use hash functions to map keys to array indices. When you want to store or retrieve a value, the hash function computes an index, and the value is stored or retrieved from that position. This provides O(1) average time complexity.",
    "What are the advantages of arrays?": "Arrays provide several advantages: O(1) access time when index is known, efficient memory usage due to contiguous storage, cache-friendly access patterns, and simple implementation.",
    "Explain binary trees": "Binary trees are hierarchical data structures where each node has at most two children (left and right). They're used for efficient searching, sorting, and organizing data with various tree traversal methods."
  }
};

// Global state
let currentDemo = null;
let isProcessing = false;
let animationQueue = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
  showLoadingScreen();
  setTimeout(() => {
    hideLoadingScreen();
    initializeTabs();
    startOverviewAnimation();
    initializeTooltips();
    initializeParticles();
  }, 3000);
});

// Loading screen management
function showLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="close-btn">
            <i class="fas fa-times"></i>
        </button>
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => notification.classList.add('show'), 100);

  // Auto remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };
  return icons[type] || icons.info;
}

// Enhanced tooltip system
function initializeTooltips() {
  const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
  elementsWithTooltips.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
}

function showTooltip(event) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = event.target.dataset.tooltip;
  document.body.appendChild(tooltip);

  const rect = event.target.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

  setTimeout(() => tooltip.classList.add('show'), 100);
}

function hideTooltip() {
  const tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach(tooltip => {
    tooltip.classList.remove('show');
    setTimeout(() => tooltip.remove(), 200);
  });
}

// Particle background system
function initializeParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  for (let i = 0; i < 50; i++) {
    particles.push(createParticle());
  }
  animate();

  window.addEventListener('resize', resizeCanvas);
}

// Tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      const tabId = this.dataset.tab;

      // Remove active class from all tabs and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Add active class to clicked tab and corresponding pane
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');

      // Start animations for specific tabs
      if (tabId === 'overview') {
        startOverviewAnimation();
      }
    });
  });
}

// Overview tab animations
function startOverviewAnimation() {
  const flowSteps = document.querySelectorAll('.flow-step');

  flowSteps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('active');
      setTimeout(() => {
        step.classList.remove('active');
      }, 1000);
    }, index * 1200);
  });
}

// Document Indexing Demo with enhanced animations
function startIndexingDemo() {
  if (isProcessing) {
    showNotification('Demo is already running. Please wait for it to complete.', 'warning');
    return;
  }

  isProcessing = true;
  showNotification('Starting document indexing demonstration...', 'info');

  resetIndexingDemo();

  const stages = [
    { id: 'loading-stage', duration: 2000, message: 'Loading PDF document...' },
    { id: 'chunking-stage', duration: 3000, message: 'Splitting text into chunks...' },
    { id: 'embedding-stage', duration: 2500, message: 'Generating vector embeddings...' },
    { id: 'storage-stage', duration: 2000, message: 'Storing vectors in database...' }
  ];

  let currentStage = 0;

  function nextStage() {
    if (currentStage < stages.length) {
      const stage = stages[currentStage];
      const stageElement = document.getElementById(stage.id);

      // Add loading indicator
      addLoadingIndicator(stageElement, stage.message);

      // Animate stage activation
      setTimeout(() => {
        stageElement.classList.add('active');
        removeLoadingIndicator(stageElement);
      }, 500);

      // Execute stage-specific animations
      setTimeout(() => {
        switch (stage.id) {
          case 'loading-stage':
            animateDocumentLoading();
            break;
          case 'chunking-stage':
            animateChunking();
            break;
          case 'embedding-stage':
            animateEmbedding();
            break;
          case 'storage-stage':
            animateStorage();
            break;
        }
      }, 800);

      currentStage++;
      setTimeout(nextStage, stage.duration);
    } else {
      isProcessing = false;
      showNotification('Document indexing demonstration completed!', 'success');
      addCompletionAnimation();
    }
  }

  nextStage();
}

function addLoadingIndicator(element, message) {
  const indicator = document.createElement('div');
  indicator.className = 'stage-loading';
  indicator.innerHTML = `
        <div class="loading-spinner-small"></div>
        <span>${message}</span>
    `;
  element.appendChild(indicator);
}

function removeLoadingIndicator(element) {
  const indicator = element.querySelector('.stage-loading');
  if (indicator) {
    indicator.style.opacity = '0';
    setTimeout(() => indicator.remove(), 300);
  }
}

function addCompletionAnimation() {
  const container = document.querySelector('.indexing-stages');
  const completion = document.createElement('div');
  completion.className = 'completion-animation';
  completion.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Indexing Complete!</h3>
        <p>Your document has been successfully processed and stored in the vector database.</p>
    `;
  container.appendChild(completion);

  setTimeout(() => completion.classList.add('show'), 100);
  setTimeout(() => {
    completion.classList.remove('show');
    setTimeout(() => completion.remove(), 500);
  }, 3000);
}

function resetIndexingDemo() {
  const stages = document.querySelectorAll('.stage');
  stages.forEach(stage => stage.classList.remove('active'));

  // Clear generated content
  document.getElementById('chunks-grid').innerHTML = '';
  document.getElementById('vector-viz').innerHTML = '';
  document.getElementById('vectors-list').innerHTML = '';
}

function animateDocumentLoading() {
  const document = document.getElementById('pdf-doc');
  document.classList.add('processing');

  setTimeout(() => {
    document.classList.remove('processing');
  }, 1500);
}

function animateChunking() {
  const chunksGrid = document.getElementById('chunks-grid');

  dsaData.chunks.forEach((chunk, index) => {
    setTimeout(() => {
      const chunkElement = createChunkElement(chunk, index);
      chunksGrid.appendChild(chunkElement);

      setTimeout(() => {
        chunkElement.classList.add('animate');
      }, 100);
    }, index * 400);
  });
}

function createChunkElement(chunk, index) {
  const chunkElement = document.createElement('div');
  chunkElement.className = 'chunk';
  chunkElement.innerHTML = `
        <div class="chunk-header">Chunk ${index + 1}</div>
        <div class="chunk-content">${chunk.content.substring(0, 100)}...</div>
    `;
  return chunkElement;
}

function animateEmbedding() {
  const vectorViz = document.getElementById('vector-viz');
  const sampleVector = dsaData.chunks[0].vector;

  sampleVector.forEach((value, index) => {
    setTimeout(() => {
      const vectorElement = document.createElement('div');
      vectorElement.className = 'vector-value';
      vectorElement.textContent = value.toFixed(2);
      vectorElement.style.animationDelay = `${index * 0.1}s`;
      vectorViz.appendChild(vectorElement);
    }, index * 100);
  });
}

function animateStorage() {
  const vectorsList = document.getElementById('vectors-list');

  dsaData.chunks.forEach((chunk, index) => {
    setTimeout(() => {
      const vectorItem = document.createElement('div');
      vectorItem.className = 'vector-item';
      vectorItem.style.animationDelay = `${index * 0.2}s`;
      vectorItem.innerHTML = `
                <div class="vector-item-header">Vector ${index + 1}</div>
                <div class="vector-item-preview">${chunk.content.substring(0, 60)}...</div>
            `;
      vectorsList.appendChild(vectorItem);
    }, index * 300);
  });
}

// Enhanced query processing with better animations
function startQueryDemo() {
  if (isProcessing) {
    showNotification('Demo is already running. Please wait for it to complete.', 'warning');
    return;
  }

  isProcessing = true;
  const query = document.getElementById('user-query').value;

  if (!query.trim()) {
    showNotification('Please enter a question before processing.', 'warning');
    isProcessing = false;
    return;
  }

  showNotification(`Processing query: "${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"`, 'info');
  resetQueryDemo();

  const stages = [
    { id: 'query-embedding-stage', duration: 2000, message: 'Converting query to vector...' },
    { id: 'similarity-stage', duration: 3000, message: 'Searching for similar content...' },
    { id: 'retrieval-stage', duration: 2000, message: 'Retrieving relevant context...' },
    { id: 'generation-stage', duration: 2500, message: 'Generating AI response...' }
  ];

  let currentStage = 0;

  function nextStage() {
    if (currentStage < stages.length) {
      const stage = stages[currentStage];
      const stageElement = document.getElementById(stage.id);

      // Add progress indicator
      addProgressIndicator(stageElement, stage.message, currentStage + 1, stages.length);

      setTimeout(() => {
        stageElement.classList.add('active');
        removeProgressIndicator(stageElement);
      }, 500);

      // Execute stage-specific animations
      setTimeout(() => {
        switch (stage.id) {
          case 'query-embedding-stage':
            animateQueryEmbedding(query);
            break;
          case 'similarity-stage':
            animateSimilaritySearch(query);
            break;
          case 'retrieval-stage':
            animateContextRetrieval(query);
            break;
          case 'generation-stage':
            animateResponseGeneration(query);
            break;
        }
      }, 800);

      currentStage++;
      setTimeout(nextStage, stage.duration);
    } else {
      isProcessing = false;
      showNotification('Query processing completed successfully!', 'success');
      addQueryCompletionAnimation();
    }
  }

  nextStage();
}

function addProgressIndicator(element, message, current, total) {
  const indicator = document.createElement('div');
  indicator.className = 'progress-indicator';
  indicator.innerHTML = `
        <div class="progress-info">
            <div class="loading-spinner-small"></div>
            <span>${message}</span>
            <div class="step-counter">${current}/${total}</div>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${(current / total) * 100}%"></div>
        </div>
    `;
  element.appendChild(indicator);
}

function removeProgressIndicator(element) {
  const indicator = element.querySelector('.progress-indicator');
  if (indicator) {
    indicator.style.opacity = '0';
    setTimeout(() => indicator.remove(), 300);
  }
}

function addQueryCompletionAnimation() {
  const container = document.querySelector('.query-stages');
  const completion = document.createElement('div');
  completion.className = 'query-completion';
  completion.innerHTML = `
        <div class="completion-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Query Processed Successfully!</h3>
            <p>Your question has been processed through the complete RAG pipeline.</p>
            <div class="completion-stats">
                <div class="stat">
                    <i class="fas fa-vector-square"></i>
                    <span>Vector Generated</span>
                </div>
                <div class="stat">
                    <i class="fas fa-search"></i>
                    <span>Similar Content Found</span>
                </div>
                <div class="stat">
                    <i class="fas fa-brain"></i>
                    <span>AI Response Created</span>
                </div>
            </div>
        </div>
    `;
  container.appendChild(completion);

  setTimeout(() => completion.classList.add('show'), 100);
  setTimeout(() => {
    completion.classList.remove('show');
    setTimeout(() => completion.remove(), 500);
  }, 4000);
}

// Enhanced suggestion system
function setQuery(query) {
  const queryInput = document.getElementById('user-query');
  queryInput.value = query;
  queryInput.focus();

  // Add highlight animation
  queryInput.style.background = 'rgba(102, 126, 234, 0.1)';
  setTimeout(() => {
    queryInput.style.background = 'white';
  }, 500);

  showNotification(`Query set: "${query}"`, 'info', 2000);
}

function resetQueryDemo() {
  const stages = document.querySelectorAll('.query-stage');
  stages.forEach(stage => stage.classList.remove('active'));

  // Clear generated content
  document.getElementById('query-text').textContent = '';
  document.getElementById('query-vector').innerHTML = '';
  document.getElementById('stored-vectors').innerHTML = '';
  document.getElementById('retrieved-context').innerHTML = '';
  document.getElementById('combined-input').innerHTML = '';
  document.getElementById('final-response').innerHTML = '';
}

function animateQueryEmbedding(query) {
  // Update query text
  document.getElementById('query-text').textContent = `"${query}"`;

  // Generate and display query vector
  const queryVector = document.getElementById('query-vector');
  const sampleVector = [0.76, -0.23, 0.45, -0.67, 0.89, -0.12, 0.34, -0.56];

  queryVector.innerHTML = '<div style="font-weight: 600; margin-bottom: 10px;">Query Vector:</div>';
  const vectorContainer = document.createElement('div');
  vectorContainer.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px;';

  sampleVector.forEach((value, index) => {
    setTimeout(() => {
      const vectorElement = document.createElement('div');
      vectorElement.style.cssText = `
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 8px;
                border-radius: 4px;
                text-align: center;
                font-size: 0.8rem;
                opacity: 0;
                animation: fadeInUp 0.3s ease forwards;
            `;
      vectorElement.textContent = value.toFixed(2);
      vectorContainer.appendChild(vectorElement);
    }, index * 100);
  });

  queryVector.appendChild(vectorContainer);
}

function animateSimilaritySearch(query) {
  const storedVectors = document.getElementById('stored-vectors');

  // Calculate similarity scores (mock calculation)
  const vectorsWithScores = dsaData.chunks.map(chunk => ({
    ...chunk,
    similarity: Math.random() * 0.4 + 0.6 // Random score between 0.6-1.0
  })).sort((a, b) => b.similarity - a.similarity);

  vectorsWithScores.forEach((vector, index) => {
    setTimeout(() => {
      const vectorElement = document.createElement('div');
      vectorElement.className = 'stored-vector';

      if (index < 3) { // Top 3 matches
        vectorElement.classList.add('matching');
      }

      vectorElement.innerHTML = `
                <div class="similarity-score">Similarity: ${vector.similarity.toFixed(3)}</div>
                <div class="vector-content">${vector.content.substring(0, 80)}...</div>
            `;

      storedVectors.appendChild(vectorElement);
    }, index * 200);
  });
}

function animateContextRetrieval(query) {
  const retrievedContext = document.getElementById('retrieved-context');

  // Get top 3 matching chunks
  const topChunks = dsaData.chunks.slice(0, 3);

  topChunks.forEach((chunk, index) => {
    setTimeout(() => {
      const contextChunk = document.createElement('div');
      contextChunk.className = 'context-chunk';
      contextChunk.style.animationDelay = `${index * 0.2}s`;
      contextChunk.innerHTML = `
                <div class="context-chunk-header">Retrieved Context ${index + 1}</div>
                <div>${chunk.content}</div>
            `;
      retrievedContext.appendChild(contextChunk);
    }, index * 300);
  });
}

function animateResponseGeneration(query) {
  // Show combined input
  const combinedInput = document.getElementById('combined-input');
  combinedInput.innerHTML = `
        <strong>Context:</strong> Arrays are fundamental data structures... Binary search is an efficient algorithm...<br><br>
        <strong>Query:</strong> ${query}
    `;

  // Show final response
  setTimeout(() => {
    const finalResponse = document.getElementById('final-response');
    const response = dsaData.responses[query] || "Based on the provided context, I can help answer questions about data structures and algorithms. Please ask a specific question about the topics covered in the document.";

    // Typewriter effect
    let i = 0;
    const typeWriter = () => {
      if (i < response.length) {
        finalResponse.textContent += response.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    };
    typeWriter();
  }, 1000);
}

// Interactive Chat Functionality
function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const message = chatInput.value.trim();

  if (!message || isProcessing) return;

  isProcessing = true;
  addMessageToChat(message, 'user');
  chatInput.value = '';

  // Simulate processing steps
  simulateProcessingSteps().then(() => {
    const response = dsaData.responses[message] || generateGenericResponse(message);
    addMessageToChat(response, 'bot');
    isProcessing = false;
  });
}

function addMessageToChat(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}-message`;

  const icon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
  messageElement.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateProcessingSteps() {
  const steps = ['monitor-embedding', 'monitor-search', 'monitor-retrieval', 'monitor-generation'];
  const stepNames = ['Query Embedding', 'Vector Search', 'Context Retrieval', 'Response Generation'];

  return new Promise((resolve) => {
    let currentStep = 0;

    function processStep() {
      if (currentStep < steps.length) {
        const stepElement = document.getElementById(steps[currentStep]);
        const statusElement = stepElement.querySelector('.status');

        statusElement.textContent = 'Processing';
        statusElement.className = 'status processing';

        setTimeout(() => {
          statusElement.textContent = 'Completed';
          statusElement.className = 'status completed';

          currentStep++;
          setTimeout(processStep, 300);
        }, 800);
      } else {
        // Reset all steps after completion
        setTimeout(() => {
          steps.forEach(step => {
            const statusElement = document.getElementById(step).querySelector('.status');
            statusElement.textContent = 'Idle';
            statusElement.className = 'status idle';
          });
          resolve();
        }, 1000);
      }
    }

    processStep();
  });
}

function generateGenericResponse(query) {
  const genericResponses = [
    "That's an interesting question about data structures and algorithms. Based on the document context, I can provide information about arrays, trees, sorting algorithms, and search techniques.",
    "I'd be happy to help with your DSA question. The document covers fundamental concepts like time complexity, space complexity, and various algorithmic approaches.",
    "Great question! The knowledge base includes information about efficient algorithms, data structure implementations, and performance analysis techniques."
  ];

  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Chat input event listener
document.addEventListener('DOMContentLoaded', function () {
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// Utility functions for animations
function fadeIn(element, duration = 300) {
  element.style.opacity = '0';
  element.style.display = 'block';

  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = Math.min(progress / duration, 1);

    if (progress < duration) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

function slideIn(element, direction = 'left', duration = 300) {
  const transform = direction === 'left' ? 'translateX(-100%)' : 'translateY(-100%)';
  element.style.transform = transform;
  element.style.display = 'block';

  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percentage = Math.min(progress / duration, 1);

    if (direction === 'left') {
      element.style.transform = `translateX(${-100 + (percentage * 100)}%)`;
    } else {
      element.style.transform = `translateY(${-100 + (percentage * 100)}%)`;
    }

    if (progress < duration) {
      requestAnimationFrame(step);
    } else {
      element.style.transform = 'translate(0)';
    }
  }
  requestAnimationFrame(step);
}

// Auto-start overview animation when page loads
setTimeout(startOverviewAnimation, 1000);

// Footer Enhancement Functionality
function initializeFooter() {
  // Add intersection observer for footer animations
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Trigger counter animation for stats
        animateCounters();

        // Start typing animation for name
        startTypingAnimation();
      }
    });
  }, {
    threshold: 0.3
  });

  const footer = document.querySelector('.footer');
  if (footer) {
    footerObserver.observe(footer);
  }

  // Add click effects to social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Create ripple effect
      createRippleEffect(this, e);

      // Show notification for external links
      if (this.href.startsWith('http')) {
        showNotification(`Opening ${this.querySelector('.tooltip').textContent}...`, 'info');
      }
    });

    // Add hover sound effect (visual feedback)
    link.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
    });

    link.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
  });

  // Add parallax effect to floating particles
  window.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.5;
      const xOffset = (x - 0.5) * speed * 10;
      const yOffset = (y - 0.5) * speed * 10;

      particle.style.transform += ` translate(${xOffset}px, ${yOffset}px)`;
    });
  });
}

function createRippleEffect(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(${x}px, ${y}px) scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;

  // Add ripple animation keyframes if not exists
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: translate(${x}px, ${y}px) scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function animateCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    const finalValue = stat.textContent;

    if (finalValue === '∞') {
      // Special animation for infinity symbol
      stat.style.animation = 'infinityPulse 2s ease-in-out infinite';
      return;
    }

    if (finalValue.includes('+')) {
      const targetNumber = parseInt(finalValue.replace('+', ''));
      animateNumber(stat, 0, targetNumber, 2000, '+');
    }
  });
}

function animateNumber(element, start, end, duration, suffix = '') {
  const startTime = Date.now();

  function updateNumber() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentNumber = Math.floor(start + (end - start) * easeOutQuart);

    element.textContent = currentNumber + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  updateNumber();
}

function startTypingAnimation() {
  const nameElement = document.querySelector('.developer-name');
  if (!nameElement || nameElement.classList.contains('typed')) return;

  const originalText = nameElement.textContent;
  nameElement.textContent = '';
  nameElement.classList.add('typed');

  let charIndex = 0;

  function typeChar() {
    if (charIndex < originalText.length) {
      nameElement.textContent += originalText[charIndex];
      charIndex++;

      // Vary typing speed for more natural feel
      const delay = Math.random() * 100 + 50;
      setTimeout(typeChar, delay);
    } else {
      // Add blinking cursor effect
      nameElement.style.borderRight = '3px solid #667eea';
      nameElement.style.animation = 'blink 1s infinite';

      // Remove cursor after a few blinks
      setTimeout(() => {
        nameElement.style.borderRight = 'none';
        nameElement.style.animation = 'none';
      }, 3000);
    }
  }

  typeChar();
}

// Add CSS for additional animations
function addFooterAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes infinityPulse {
      0%, 100% { 
        transform: scale(1) rotate(0deg);
        color: #f7fafc;
      }
      50% { 
        transform: scale(1.2) rotate(8deg);
        color: #667eea;
      }
    }
    
    @keyframes blink {
      0%, 50% { border-color: #667eea; }
      51%, 100% { border-color: transparent; }
    }
    
    .footer.animate-in .footer-left {
      animation: slideInLeft 1s ease-out;
    }
    
    .footer.animate-in .footer-right {
      animation: slideInRight 1s ease-out;
    }
    
    .social-link {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `;
  document.head.appendChild(style);
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializeFooter();
  addFooterAnimationStyles();
});

// Add smooth scrolling to footer links
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

addSmoothScrolling();
