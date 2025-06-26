// ==================== MOBILE MENU & NAVIGATION ==================== //
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    // Ensure menu is closed on page load
    navMenu.classList.remove('show');
    
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      
      // Optional: Toggle aria-expanded for accessibility
      const isExpanded = navMenu.classList.contains('show');
      this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking links
    document.querySelectorAll('#nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Call this early in your initialization
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  // Your other initialization code...
});


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



// Simple blog loader - will work even if JavaScript fails
document.addEventListener('DOMContentLoaded', function() {
  // First check if we have hardcoded posts already
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid || blogGrid.children.length > 0) return;

  // If no hardcoded posts, try to load from JSON
  loadBlogPosts();
});

async function loadBlogPosts() {
  try {
    const response = await fetch('/data/blog/posts.json');
    const posts = await response.json();
    displayBlogPosts(posts.slice(0, 2)); // Show only 2 latest
  } catch (error) {
    console.log('Using hardcoded posts instead');
    // The hardcoded HTML will remain visible
  }
}

function displayBlogPosts(posts) {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return;

  blogGrid.innerHTML = posts.map(post => `
    <div class="blog-card">
      <div class="blog-card-image">
        <img src="${post.image || 'images/placeholder-blog.jpg'}" 
             alt="${post.title}" 
             loading="lazy"
             onerror="this.src='images/placeholder-blog.jpg'">
      </div>
      <div class="blog-card-content">
        <span class="blog-category">${post.category || 'General'}</span>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <a href="/blog/${post.slug}" class="read-more">Read More →</a>
      </div>
    </div>
  `).join('');
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





