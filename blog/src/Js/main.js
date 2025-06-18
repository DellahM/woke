// Load blog posts from Netlify CMS
async function loadBlogPosts() {
    try {
        const response = await fetch('/.netlify/functions/posts');
        const posts = await response.json();
        
        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Get featured posts (first 3)
        const featuredPosts = posts.slice(0, 3);
        const allPosts = posts.slice(3);
        
        // Render featured posts
        const featuredContainer = document.getElementById('featuredPosts');
        featuredPosts.forEach(post => {
            featuredContainer.innerHTML += createPostCard(post, true);
        });
        
        // Render all posts
        const allPostsContainer = document.getElementById('allPosts');
        allPosts.forEach(post => {
            allPostsContainer.innerHTML += createPostCard(post, false);
        });
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Create HTML for a post card
function createPostCard(post, isFeatured) {
    return `
        <article class="post-card ${isFeatured ? 'featured' : ''}">
            <div class="post-card-image">
                <img src="${post.image || '/static/img/blog-default.jpg'}" alt="${post.title}">
            </div>
            <div class="post-card-content">
                <span class="post-card-date">${new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</span>
                <h3 class="post-card-title">
                    <a href="/blog/${post.slug}">${post.title}</a>
                </h3>
                <p class="post-card-excerpt">${post.excerpt || ''}</p>
                ${post.category ? `<span class="post-card-category">${post.category}</span>` : ''}
            </div>
        </article>
    `;
}

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});