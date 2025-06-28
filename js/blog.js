// blog.js - Fixed version for your post linking
document.addEventListener('DOMContentLoaded', function() {
  if (!document.querySelector('.blog-section')) return;
  
  initBlog();
});

async function initBlog() {
  try {
    const posts = await loadPosts();
    renderPosts(posts);
    initFeatures();
  } catch (error) {
    console.error("Blog initialization failed:", error);
    showErrorUI();
  }
}

// ==================== DATA LOADING ====================
async function loadPosts() {
  try {
    const response = await fetch('/data/blog/posts.json');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to load posts');
  } catch (error) {
    console.error('Error loading posts:', error);
    return []; // Return empty array if fetch fails
  }
}

// ==================== RENDERING ====================
function renderPosts(posts) {
  const container = document.getElementById('blog-grid');
  if (!container) return;

  container.innerHTML = posts.length ? 
    posts.map(post => createPostHTML(post)).join('') : 
    noPostsHTML();
}

function createPostHTML(post) {
  return `
    <article class="blog-post" 
             data-categories="${post.categories?.join(',') || ''}"
             data-searchable="${post.title.toLowerCase()} ${post.excerpt.toLowerCase()}">
      <div class="blog-post-image">
        ${post.category ? `<span class="blog-category">${post.category}</span>` : ''}
        <img src="${post.image}" alt="${post.title}" loading="lazy">
      </div>
      <div class="blog-post-content">
        <div class="blog-post-meta">
          <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
          ${post.author ? `<span><i class="far fa-user"></i> ${post.author}</span>` : ''}
        </div>
        <h3><a href="posts/${post.slug}.html">${post.title}</a></h3>
        <p class="blog-post-excerpt">${post.excerpt}</p>
        <a href="posts/${post.slug}.html" class="read-more-btn">Read More</a>
      </div>
    </article>
  `;
}

function noPostsHTML() {
  return `
    <div class="no-posts">
      <i class="fas fa-newspaper"></i>
      <h3>No Posts Yet</h3>
      <p>Check back soon for new content!</p>
    </div>
  `;
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
  } catch {
    return dateString;
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
}

function filterPosts(category) {
  const posts = document.querySelectorAll('.blog-post');
  let visibleCount = 0;
  
  posts.forEach(post => {
    const matches = category === 'all' || 
                   post.dataset.categories.includes(category.toLowerCase());
    post.style.display = matches ? 'block' : 'none';
    if (matches) visibleCount++;
  });
  
  updateResultsCount(visibleCount, `filtered by "${category}"`);
}

function searchPosts(term) {
  const posts = document.querySelectorAll('.blog-post');
  let visibleCount = 0;
  
  posts.forEach(post => {
    const matches = term === '' || post.dataset.searchable.includes(term);
    post.style.display = matches ? 'block' : 'none';
    if (matches) visibleCount++;
  });
  
  updateResultsCount(visibleCount, term ? `for "${term}"` : '');
}

function updateResultsCount(count, context) {
  let resultsInfo = document.querySelector('.search-results-info');
  if (!resultsInfo) {
    resultsInfo = document.createElement('div');
    resultsInfo.className = 'search-results-info';
    document.getElementById('blog-grid').before(resultsInfo);
  }
  resultsInfo.innerHTML = context ? 
    `<p>Showing ${count} result${count !== 1 ? 's' : ''} ${context}</p>` : '';
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
      <p>Please check your posts.json file and try again.</p>
      <button class="btn retry-btn">Retry</button>
    </div>
  `;

  container.querySelector('.retry-btn').addEventListener('click', initBlog);
}