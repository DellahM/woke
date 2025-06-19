// Mobile Menu Toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-menu').classList.toggle('show');
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Portfolio Filtering
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

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Smooth Scrolling
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
            document.getElementById('nav-menu').classList.remove('show');
        }
    });
});


// Ensure menu closes after selection
document.querySelectorAll('nav ul li a').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('nav-menu').classList.remove('show');
  });
});





// Load blog posts
function loadBlogPosts() {
    fetch('/_posts/blog/')
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById('blog-posts');
            posts.slice(0, 3).forEach(post => {
                container.innerHTML += `
                    <div class="portfolio-item">
                        <img src="${post.image}" alt="Blog Post" class="portfolio-img">
                        <div class="portfolio-overlay">
                            <p class="portfolio-category">${post.category}</p>
                            <h3 class="portfolio-title">${post.title}</h3>
                            <a href="/blog/${post.slug}" class="btn btn-outline">Read More</a>
                        </div>
                    </div>
                `;
            });
        });
}

// Load projects
function loadProjects() {
    fetch('/_data/projects/')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            projects.forEach(project => {
                container.innerHTML += `
                    <div class="project-card" data-category="${project.category}">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}">
                            <div class="project-tag">${project.category}</div>
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${project.title}</h3>
                            <div class="project-meta">
                                <div class="project-client">
                                    <span>👤</span> ${project.client}
                                </div>
                                <div class="project-date">
                                    <span>📅</span> ${new Date(project.date).toLocaleDateString()}
                                </div>
                            </div>
                            <p class="project-desc">${project.description}</p>
                            <div class="project-details">
                                ${project.technologies.map(tech => `<span class="project-detail-item">${tech}</span>`).join('')}
                            </div>
                            <div class="project-links">
                                <a href="${project.url}" target="_blank" class="btn">Visit Website</a>
                                <a href="#" class="btn btn-outline">Case Study</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

// Load team members
function loadTeam() {
    fetch('/_data/team/')
        .then(response => response.json())
        .then(team => {
            const container = document.getElementById('team-grid');
            team.forEach(member => {
                container.innerHTML += `
                    <div class="team-member">
                        <img src="${member.photo}" alt="Team Member" class="member-img">
                        <div class="member-info">
                            <h3 class="member-name">${member.name}</h3>
                            <p class="member-position">${member.position}</p>
                            <p>${member.bio.substring(0, 100)}...</p>
                            <div class="member-social">
                                ${member.social.map(s => `<a href="${s.url}" class="social-link">${s.platform.substring(0,1)}</a>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('blog-posts')) loadBlogPosts();
    if (document.getElementById('projects-container')) loadProjects();
    if (document.getElementById('team-grid')) loadTeam();
});

