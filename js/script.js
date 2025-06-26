// ==================== MOBILE MENU & NAVIGATION ==================== //

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

// ==================== HEADER SCROLL EFFECT ==================== //

function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// ==================== PORTFOLIO FILTERING ==================== //

function initPortfolioFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ==================== CONTACT FORM ==================== //

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}

// ==================== SMOOTH SCROLLING ==================== //

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
}

// ==================== BLOG FUNCTIONALITY ==================== //

async function loadBlogPosts() {
    console.log('📰 Starting loadBlogPosts function...');
    
    const blogSliderContainer = document.getElementById('blog-slider-container');
    if (!blogSliderContainer) {
        console.error('❌ Blog slider container not found');
        return;
    }

    try {
        // Show loading state
        console.log('⏳ Showing loading state...');
        showBlogLoading();
        
        // Try to load posts.json first (single file approach)
        console.log('📄 Trying to load from posts.json...');
        let posts = await loadPostsFromSingleFile();
        
        // If that fails, try the index + individual files approach
        if (!posts || posts.length === 0) {
            console.log('📋 Trying to load from index + individual files...');
            posts = await loadPostsFromIndex();
        }
        
        console.log('✅ Final posts loaded:', posts);
        
        // If we have posts, initialize the slider
        if (posts && posts.length > 0) {
            console.log('🎠 Initializing blog slider with', posts.length, 'posts...');
            initBlogSlider(posts);
        } else {
            console.warn('⚠️ No posts found, showing error...');
            showBlogError('No blog posts found');
        }
        
    } catch (error) {
        console.error('💥 Error loading blog posts:', error);
        showBlogError('Failed to load blog posts: ' + error.message);
    }
}

async function loadPostsFromSingleFile() {
    try {
        console.log('🔍 Fetching /data/blog/posts.json...');
        const response = await fetch('/data/blog/posts.json');
        console.log('📡 Response status:', response.status, response.statusText);
        
        if (response.ok) {
            const posts = await response.json();
            console.log('📊 Raw posts data:', posts);
            
            // Check if it's an array or single object
            if (Array.isArray(posts)) {
                console.log('✅ Posts is an array with', posts.length, 'items');
                return posts;
            } else {
                console.log('🔧 Posts is a single object, converting to array...');
                return [posts]; // Convert single object to array
            }
        } else {
            console.log('❌ Failed to load posts.json:', response.status);
            return null;
        }
    } catch (error) {
        console.warn('⚠️ Failed to load from posts.json:', error);
        return null;
    }
}

async function loadPostsFromIndex() {
    try {
        console.log('🔍 Fetching /data/blog/index.json...');
        // Load the index file
        const indexResponse = await fetch('/data/blog/index.json');
        console.log('📡 Index response status:', indexResponse.status);
        
        if (!indexResponse.ok) throw new Error('Failed to load index');
        
        const index = await indexResponse.json();
        console.log('📋 Loaded index:', index);
        
        // Load individual post files - try both naming conventions
        const posts = await Promise.all(
            index.posts.map(async (postId) => {
                try {
                    console.log(`🔍 Loading post: ${postId}...`);
                    
                    // First try postId.json (e.g., post1.json)
                    let postResponse = await fetch(`/data/blog/${postId}.json`);
                    console.log(`📡 ${postId}.json response:`, postResponse.status);
                    
                    // If that fails, try postsId.json (e.g., posts1.json) - your current naming
                    if (!postResponse.ok) {
                        const alternativeId = postId.replace('post', 'posts');
                        console.log(`🔄 Trying alternative: ${alternativeId}.json...`);
                        postResponse = await fetch(`/data/blog/${alternativeId}.json`);
                        console.log(`📡 ${alternativeId}.json response:`, postResponse.status);
                    }
                    
                    if (postResponse.ok) {
                        const post = await postResponse.json();
                        console.log(`✅ Loaded post: ${postId}`, post);
                        return post;
                    } else {
                        console.warn(`❌ Failed to load post: ${postId}`);
                        return null;
                    }
                } catch (error) {
                    console.warn(`💥 Error loading post: ${postId}`, error);
                    return null;
                }
            })
        );
        
        // Filter out failed loads
        const validPosts = posts.filter(post => post !== null);
        console.log('✅ Valid posts loaded:', validPosts.length, validPosts);
        return validPosts;
        
    } catch (error) {
        console.error('💥 Error loading posts from index:', error);
        return [];
    }
}

function showBlogLoading() {
    const container = document.getElementById('blog-slider-container');
    if (container) {
        console.log('⏳ Displaying loading spinner...');
        container.innerHTML = '<div class="loading-spinner">Loading blog posts...</div>';
    }
}

function showBlogError(message) {
    const container = document.getElementById('blog-slider-container');
    if (container) {
        console.log('❌ Displaying error message:', message);
        container.innerHTML = `
            <div class="blog-error" style="text-align: center; padding: 2rem; color: #666;">
                <p style="margin-bottom: 1rem;">⚠️ ${message}</p>
                <button onclick="loadBlogPosts()" class="btn btn-outline" style="padding: 0.5rem 1rem; border: 1px solid #ccc; background: white; cursor: pointer;">Try Again</button>
            </div>
        `;
    }
}

// Blog Slider Functionality
function initBlogSlider(posts) {
    console.log('🎠 Initializing blog slider with posts:', posts);
    
    const slider = document.querySelector('.blog-slider');
    const container = document.getElementById('blog-slider-container');
    const dotsContainer = document.querySelector('.blog-slider-dots');
    
    console.log('🔍 Slider elements found:');
    console.log('  - slider:', !!slider);
    console.log('  - container:', !!container);
    console.log('  - dotsContainer:', !!dotsContainer);
    
    if (!slider || !container || !posts.length) {
        const errorMsg = 'Unable to initialize blog slider';
        console.error('❌', errorMsg);
        showBlogError(errorMsg);
        return;
    }
    
    let currentIndex = 0;
    const slideCount = Math.min(posts.length, 3); // Show max 3 slides
    
    console.log('🎯 Creating', slideCount, 'slides...');
    
    // Clear existing content
    container.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';
    
    // Create slides
    posts.slice(0, 3).forEach((post, index) => {
        console.log(`🎨 Creating slide ${index + 1} for post:`, post.title);
        
        const slideDiv = document.createElement('div');
        slideDiv.className = 'blog-slide';
        slideDiv.innerHTML = `
            <div class="portfolio-item">
                <img src="${post.image || 'images/placeholder-blog.jpg'}" 
                     alt="${post.title || 'Blog Post'}" 
                     class="portfolio-img" 
                     loading="lazy"
                     onerror="this.src='images/placeholder-blog.jpg'; console.log('Image failed to load:', this.src);">
                <div class="portfolio-overlay">
                    <p class="portfolio-category">${post.category || 'Blog'}</p>
                    <h3 class="portfolio-title">${post.title || 'Untitled Post'}</h3>
                    <a href="/blog/${post.slug || post.id || '#'}" class="btn btn-outline">Read More</a>
                </div>
            </div>
        `;
        container.appendChild(slideDiv);
    });
    
    // Create dots if container exists
    if (dotsContainer) {
        console.log('🔘 Creating navigation dots...');
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('blog-slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    const dots = document.querySelectorAll('.blog-slider-dot');
    
    // Update slider position
    function updateSlider() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Navigation functions
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Event listeners for navigation arrows
    const nextBtn = document.querySelector('.blog-slider-next');
    const prevBtn = document.querySelector('.blog-slider-prev');
    
    console.log('🎮 Setting up navigation controls:');
    console.log('  - nextBtn:', !!nextBtn);
    console.log('  - prevBtn:', !!prevBtn);
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance (optional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        slideInterval = setInterval(nextSlide, 5000);
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }
    
    // Initialize first slide
    updateSlider();
    console.log('✅ Blog slider initialized successfully!');
}

// ==================== PROJECTS FUNCTIONALITY ==================== //

async function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    try {
        const response = await fetch('/data/projects.json');
        if (!response.ok) throw new Error('Failed to load projects');
        
        const projects = await response.json();
        container.innerHTML = '';
        
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-card';
            projectDiv.setAttribute('data-category', project.category || '');
            projectDiv.innerHTML = `
                <div class="project-image">
                    <img src="${project.image || 'images/placeholder-project.jpg'}" 
                         alt="${project.title || 'Project'}"
                         onerror="this.src='images/placeholder-project.jpg'">
                    <div class="project-tag">${project.category || 'Project'}</div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title || 'Untitled Project'}</h3>
                    <div class="project-meta">
                        <div class="project-client">
                            <span>👤</span> ${project.client || 'Client'}
                        </div>
                        <div class="project-date">
                            <span>📅</span> ${project.date ? new Date(project.date).toLocaleDateString() : 'Date'}
                        </div>
                    </div>
                    <p class="project-desc">${project.description || 'Project description'}</p>
                    <div class="project-details">
                        ${(project.technologies || []).map(tech => `<span class="project-detail-item">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.url || '#'}" target="_blank" class="btn">Visit Website</a>
                        <a href="#" class="btn btn-outline">Case Study</a>
                    </div>
                </div>
            `;
            container.appendChild(projectDiv);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        if (container) {
            container.innerHTML = '<p>Unable to load projects at this time.</p>';
        }
    }
}

// ==================== TEAM FUNCTIONALITY ==================== //

async function loadTeam() {
    const container = document.getElementById('team-grid');
    if (!container) return;
    
    try {
        const response = await fetch('/data/team.json');
        if (!response.ok) throw new Error('Failed to load team');
        
        const team = await response.json();
        container.innerHTML = '';
        
        team.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'team-member';
            memberDiv.innerHTML = `
                <img src="${member.photo || 'images/placeholder-avatar.jpg'}" 
                     alt="${member.name || 'Team Member'}" 
                     class="member-img"
                     onerror="this.src='images/placeholder-avatar.jpg'">
                <div class="member-info">
                    <h3 class="member-name">${member.name || 'Team Member'}</h3>
                    <p class="member-position">${member.position || 'Position'}</p>
                    <p>${(member.bio || 'Bio').substring(0, 100)}...</p>
                    <div class="member-social">
                        ${(member.social || []).map(s => 
                            `<a href="${s.url || '#'}" class="social-link" target="_blank">${(s.platform || 'Social').substring(0,1)}</a>`
                        ).join('')}
                    </div>
                </div>
            `;
            container.appendChild(memberDiv);
        });
    } catch (error) {
        console.error('Error loading team:', error);
        if (container) {
            container.innerHTML = '<p>Unable to load team information at this time.</p>';
        }
    }
}

// ==================== UTILITY FUNCTIONS ==================== //

// Make functions available globally for debugging
window.loadBlogPosts = loadBlogPosts;
window.loadProjects = loadProjects;
window.loadTeam = loadTeam;

// Debug function to manually test blog loading
window.debugBlog = function() {
    console.log('🔧 Manual blog debug triggered...');
    loadBlogPosts();
};

console.log('📋 Script loaded. Available debug commands:');
console.log('  - debugBlog() - manually trigger blog loading');
console.log('  - loadBlogPosts() - reload blog posts');