// ==================== IMPROVED MOBILE MENU ==================== //
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const icon = mobileMenuToggle?.querySelector('i');

  if (mobileMenuToggle && navMenu) {
    navMenu.classList.remove('show');

    mobileMenuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      navMenu.classList.toggle('show');

      const isExpanded = navMenu.classList.contains('show');
      this.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';

      // Toggle icon
      if (icon) {
        icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    document.querySelectorAll('#nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (icon) icon.className = 'fas fa-bars';
      });
    });

    document.addEventListener('click', e => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (icon) icon.className = 'fas fa-bars';
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }
}

// ==================== HEADER SCROLL EFFECT ==================== //
function initScrollEffects() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
}

// ==================== INITIALIZATION ==================== //
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollEffects();
});

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
                         onerror="this.src='images/placeholder-project.jpg'" />
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





