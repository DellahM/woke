// blog.js - Fixed for your JSON structure
document.addEventListener('DOMContentLoaded', function() {
  if (!document.querySelector('.blog-section')) return;
  
  // Initialize blog
  initBlog();
});

async function initBlog() {
  try {
    // Load posts using your JSON structure
    const posts = await loadPosts();
    
    // Render posts
    renderPosts(posts);
    
    // Initialize interactive features
    initFeatures();
    
    console.log('Blog initialized successfully with', posts.length, 'posts');
    
  } catch (error) {
    console.error("Blog initialization failed:", error);
    showErrorUI();
  }
}

// ==================== DATA LOADING ====================

async function loadPosts() {
  try {
    // Try to load from posts.json first (easier approach)
    const response = await fetch('/data/blog/posts.json');
    if (response.ok) {
      const posts = await response.json();
      return posts;
    }
    
    // Fallback: Load from index.json + individual posts
    return await loadPostsFromIndex();
    
  } catch (error) {
    console.error('Error loading posts:', error);
    // Return empty array if both methods fail
    return [];
  }
}

async function loadPostsFromIndex() {
  try {
    // Load the index file
    const indexResponse = await fetch('/data/blog/index.json');
    if (!indexResponse.ok) throw new Error('Failed to load index');
    
    const index = await indexResponse.json();
    
    // Load individual post files
    const posts = await Promise.all(
      index.posts.map(async (postId) => {
        try {
          const postResponse = await fetch(`/data/blog/${postId}.json`);
          if (postResponse.ok) {
            return await postResponse.json();
          }
          return null;
        } catch (error) {
          console.warn(`Failed to load post: ${postId}`, error);
          return null;
        }
      })
    );
    
    // Filter out failed loads
    return posts.filter(post => post !== null);
    
  } catch (error) {
    console.error('Error loading posts from index:', error);
    return [];
  }
}

// ==================== RENDERING ====================

function renderPosts(posts) {
  const container = document.getElementById('blog-grid');
  
  if (!container) {
    console.error('Blog container not found');
    return;
  }

  // Clear loading spinner
  container.innerHTML = '';

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="no-posts">
        <i class="fas fa-newspaper"></i>
        <h3>No Posts Yet</h3>
        <p>We're working on some great content. Check back soon!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = posts.map(post => `
    <article class="blog-post" 
             data-categories="${post.categories?.join(',') || ''}"
             data-searchable="${post.title.toLowerCase()} ${post.excerpt.toLowerCase()}"
             data-post-id="${post.id}">
      <div class="blog-post-image">
        ${post.category ? `<span class="blog-category">${post.category}</span>` : ''}
        <img src="${post.image}" alt="${post.title}" loading="lazy" 
             onerror="this.src='images/placeholder-blog.jpg'">
      </div>
      <div class="blog-post-content">
        <div class="blog-post-meta">
          <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
          ${post.author ? `<span><i class="far fa-user"></i> ${post.author}</span>` : ''}
          ${post.readTime ? `<span><i class="far fa-clock"></i> ${post.readTime}</span>` : ''}
        </div>
        <h3><a href="/blog/${post.slug}">${post.title}</a></h3>
        <p class="blog-post-excerpt">${post.excerpt}</p>
        ${post.tags?.length ? `<div class="post-tags">${renderTags(post.tags)}</div>` : ''}
        <a href="/blog/${post.slug}" class="read-more-btn">Read More</a>
      </div>
    </article>
  `).join('');

  // Show pagination if there are posts
  const pagination = document.querySelector('.blog-pagination');
  if (pagination && posts.length > 0) {
    pagination.style.display = 'flex';
  }
}

function renderTags(tags) {
  return tags.map(tag => `<a href="/blog/tag/${tag}" class="tag">#${tag}</a>`).join('');
}

function formatDate(dateString) {
  if (!dateString) return 'No date';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
}

// ==================== INTERACTIVITY ====================

function initFeatures() {
  // Category filtering
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterPosts(btn.dataset.filter);
      setActiveFilter(btn);
    });
  });

  // Search functionality
  const searchInput = document.querySelector('.blog-search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchPosts(e.target.value.toLowerCase());
    });
  }

  // Search form submission
  const searchForm = document.querySelector('.blog-search');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchTerm = searchForm.querySelector('input').value.toLowerCase();
      searchPosts(searchTerm);
    });
  }

  // Tag clicks
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag')) {
      e.preventDefault();
      const tagName = e.target.textContent.replace('#', '');
      filterPosts(tagName);
    }
  });
}

function filterPosts(category) {
  const posts = document.querySelectorAll('.blog-post');
  let visibleCount = 0;
  
  posts.forEach(post => {
    const categories = post.dataset.categories.toLowerCase();
    const matches = category === 'all' || 
                   categories.includes(category.toLowerCase());
    
    post.style.display = matches ? 'block' : 'none';
    if (matches) visibleCount++;
  });
  
  // Update results count
  updateResultsCount(visibleCount, `filtered by "${category}"`);
}

function searchPosts(term) {
  const posts = document.querySelectorAll('.blog-post');
  let visibleCount = 0;
  
  posts.forEach(post => {
    const searchable = post.dataset.searchable;
    const matches = term === '' || searchable.includes(term);
    
    post.style.display = matches ? 'block' : 'none';
    if (matches) visibleCount++;
  });
  
  // Update results count
  updateResultsCount(visibleCount, term ? `for "${term}"` : '');
}

function updateResultsCount(count, context) {
  let resultsInfo = document.querySelector('.search-results-info');
  
  if (!resultsInfo) {
    resultsInfo = document.createElement('div');
    resultsInfo.className = 'search-results-info';
    const container = document.getElementById('blog-grid');
    container.parentNode.insertBefore(resultsInfo, container);
  }
  
  if (context) {
    resultsInfo.innerHTML = `<p>Showing ${count} result${count !== 1 ? 's' : ''} ${context}</p>`;
    resultsInfo.style.display = 'block';
  } else {
    resultsInfo.style.display = 'none';
  }
}

function setActiveFilter(activeBtn) {
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.classList.toggle('active', btn === activeBtn);
  });
}

// ==================== ERROR HANDLING ====================

function showErrorUI() {
  const container = document.getElementById('blog-grid');
  
  if (!container) return;

  container.innerHTML = `
    <div class="blog-error">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Couldn't Load Blog Posts</h3>
      <p>We're having trouble loading content. Please check that your JSON files exist and are properly formatted.</p>
      <button class="btn retry-btn">Retry</button>
    </div>
  `;

  container.querySelector('.retry-btn').addEventListener('click', initBlog);
}

// ==================== UTILITY FUNCTIONS ====================

// Function to add a new post (for testing)
function addSamplePost() {
  const samplePost = {
    id: 'sample-post',
    title: 'Sample Blog Post',
    excerpt: 'This is a sample post to test your blog functionality.',
    image: 'images/placeholder-blog.jpg',
    category: 'Testing',
    categories: ['testing', 'sample'],
    date: new Date().toISOString().split('T')[0],
    author: 'System',
    slug: 'sample-blog-post',
    tags: ['sample', 'test'],
    readTime: '2 min read'
  };
  
  renderPosts([samplePost]);
  initFeatures();
}

// Debug function to check JSON files
async function debugBlogData() {
  console.log('=== Blog Debug Info ===');
  
  try {
    // Check posts.json
    const postsResponse = await fetch('/data/blog/posts.json');
    console.log('posts.json status:', postsResponse.status);
    if (postsResponse.ok) {
      const posts = await postsResponse.json();
      console.log('posts.json data:', posts);
    }
  } catch (error) {
    console.log('posts.json error:', error);
  }
  
  try {
    // Check index.json
    const indexResponse = await fetch('/data/blog/index.json');
    console.log('index.json status:', indexResponse.status);
    if (indexResponse.ok) {
      const index = await indexResponse.json();
      console.log('index.json data:', index);
    }
  } catch (error) {
    console.log('index.json error:', error);
  }
}

// Make debug function available globally
window.debugBlogData = debugBlogData;
window.addSamplePost = addSamplePost;