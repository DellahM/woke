
   <!-- Blog Section - Modified for CMS -->
<section id="blog" class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Latest News</h2>
            <p class="section-subtitle">Stay updated with our latest articles and industry insights</p>
        </div>
        
        <!-- CMS-Powered Blog Posts Container -->
        <div class="portfolio-grid" id="blog-posts-container">
            <!-- Fallback Content (will be replaced if JavaScript works) -->
            <div class="portfolio-item">
                <img src="/images/placeholder-blog1.jpg" alt="Web Development Trends" 
                     class="portfolio-img" width="400" height="300" loading="lazy">
                <div class="portfolio-overlay">
                    <p class="portfolio-category">Technology</p>
                    <h3 class="portfolio-title">The Rise of AI in Web Development</h3>
                    <a href="/blog/ai-web-development" class="btn btn-outline">Read More</a>
                </div>
            </div>
            
           <div class="portfolio-item">
                    <img src="/api/placeholder/400/300" alt="Blog Post" class="portfolio-img">
                    <div class="portfolio-overlay">
                        <p class="portfolio-category">Business</p>
                        <h3 class="portfolio-title">Digital Transformation in Kenya</h3>
                        <a href="#" class="btn btn-outline">Read More</a>
                    </div>
                </div>
            
            
             <div class="portfolio-item">
                    <img src="/api/placeholder/400/300" alt="Blog Post" class="portfolio-img">
                    <div class="portfolio-overlay">
                        <p class="portfolio-category">Design</p>
                        <h3 class="portfolio-title">UX Trends for 2025</h3>
                        <a href="#" class="btn btn-outline">Read More</a>
                    </div>
                </div>
            </div>
        </div>
            
            <!-- Additional fallback items as needed -->
        </div>
        
        <!-- CMS Admin Button (visible only when logged in) -->
        <div id="cms-admin" style="text-align: center; margin-top: 2rem; display: none;">
            <a href="/admin/" class="btn">Add New Post</a>
        </div>
    </div>
</section> \



my json loads post structure   
{
  "title": "",
  "slug": "unique-url-friendly-name",
  "date": "YYYY-MM-DD",
  "author": "",
  "excerpt": "1-2 sentence preview",
  "content": "<p>Full content with HTML tags</p>",
  "category": "",
  "tags": [],
  "image": "/images/blog/filename.jpg",
  "featured": false,
  "reading_time": "X min"
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Starting initialization...');
    initializeApp();
});

function initializeApp() {
    console.log('📱 Initializing app components...');
    initMobileMenu();
    initScrollEffects();
    initPortfolioFiltering();
    initContactForm();
    initSmoothScrolling();
    
    // Debug: Check if blog elements exist
    const blogSection = document.getElementById('blog');
    const blogSliderContainer = document.getElementById('blog-slider-container');
    
    console.log('🔍 Blog section found:', !!blogSection);
    console.log('🔍 Blog slider container found:', !!blogSliderContainer);
    
    if (blogSliderContainer) {
        console.log('📝 Loading blog posts...');
        loadBlogPosts();
    } else {
        console.error('❌ Blog slider container not found in DOM');
    }
    
    loadProjects();
    loadTeam();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });

        // Close menu when clicking a link
        document.querySelectorAll('#nav-menu a, nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
}