
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











/* ==================== SERVICES SECTION ==================== */
.services {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: #ffffff;
}

.services .section-title {
    color: #ffffff;
}

.services .section-subtitle {
    color: rgba(255, 255, 255, 0.8);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.service-card {
    background-color: var(--primary-light);
    padding: 40px 30px;
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.service-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 0;
    background: linear-gradient(180deg, var(--accent-lightest) 0%, var(--accent-light) 100%);
    transition: all 0.3s ease;
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(21, 7, 52, 0.4);
    background-color: rgba(15, 37, 87, 0.8);
}

.service-card:hover::before {
    height: 100%;
}

.service-icon {
    font-size: 40px;
    margin-bottom: 20px;
    color: var(--accent);
    display: block;
}

.service-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #ffffff;
}

.service-desc {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 20px;
    line-height: 1.6;
}

/* ==================== CARDS - IMPROVED TEXT CONTRAST ==================== */
.service-card,
.team-member,
.testimonial-item,
.automation-card,
.solution-card {
    background: #ffffff;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 30px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(21, 7, 52, 0.08);
}

.service-card:hover,
.automation-card:hover,
.solution-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(21, 7, 52, 0.15);
    border-color: var(--accent-light);
}

/* Card Text Styles - MUCH BETTER CONTRAST */
.service-card h3,
.automation-card h3,
.solution-card h3,
.team-member h3 {
    color: var(--primary) !important;    /* Dark navy for headings */
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 15px;
}

.service-card p,
.automation-card p,
.solution-card p,
.team-member p {
    color: var(--text-dark) !important;  /* Much darker text */
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 15px;
}

.service-card .service-description,
.automation-card .description,
.solution-card .description {
    color: var(--text-medium) !important; /* Darker medium gray */
    font-size: 0.95rem;
}

/* Icons in Cards */
.service-icon,
.contact-icon {
    color: var(--accent);
    background: rgba(55, 120, 194, 0.1);
    padding: 15px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
}

/* Highlighted Cards */
.automation-card.highlighted,
.solution-card.highlighted {
    border: 2px solid var(--accent);
    background: linear-gradient(135deg, rgba(55, 120, 194, 0.05) 0%, rgba(75, 159, 225, 0.05) 100%);
}





/* ==================== FORMS ==================== */
.contact-form {
    background: #ffffff;
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(21, 7, 52, 0.1);
}

.form-control {
    background: #ffffff;
    border: 2px solid var(--border-light);
    color: var(--text-dark);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 1rem;
    transition: all 0.3s ease;
    width: 100%;
}

.form-control:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(55, 120, 194, 0.1);
    outline: none;
}

.form-control::placeholder {
    color: var(--text-light);
}

/* ==================== FOOTER ==================== */
footer {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: #ffffff;
    padding: 60px 0 30px;
}

.footer-widget h3 {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 20px;
    position: relative;
}

.footer-widget h3::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--accent-lightest);
}

.footer-link {
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    text-decoration: none;
}

.footer-link:hover {
    color: var(--accent-lightest);
}

.footer-social a {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 10px;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.footer-social a:hover {
    background: var(--accent);
    color: #ffffff;
    transform: translateY(-2px);
}

/* ==================== PRICING & STATS ==================== */
.stat-number,
.hosting-price .amount,
.automation-pricing .price,
.solution-pricing .price {
    color: var(--accent);
    font-weight: 700;
    font-size: 2rem;
}

.profit-margin,
.margin-note {
    color: var(--success);
    font-weight: 600;
}

/* ==================== UTILITY CLASSES ==================== */
.text-primary { color: var(--primary) !important; }
.text-accent { color: var(--accent) !important; }
.text-dark { color: var(--text-dark) !important; }
.text-medium { color: var(--text-medium) !important; }
.bg-primary { background-color: var(--primary) !important; }
.bg-accent { background-color: var(--accent) !important; }
.border-accent { border-color: var(--accent) !important; }







/* ======================
   SECTION STYLES
   ====================== */

/* ======================
   ABOUT SECTION
   ====================== */

.about-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.about-text {
    width: 50%;
    padding-right: 50px;
    color: #e0e0e0; /* Better readability */
}

.about-image {
    width: 45%;
    position: relative;
}

.about-image::before {
    content: "";
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    border: 5px solid #28559a; /* Secondary (Medium blue) */
    z-index: -1;
}

.about-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.about-stats {
    display: flex;
    margin-top: 50px;
    flex-wrap: wrap;
}

.stat-item {
    margin-right: 40px;
    margin-bottom: 20px;
}

.stat-number {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 5px;
    color: #f4f7f4;
}

.stat-title {
    font-size: 16px;
    color: #b8b8b8; /* Improved from opacity: 0.7 */
}


<!-- Monetizable Services Section -->
<!--<section id="profit-services" class="section services">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">High-Profit Digital Services</h2>
            <p class="section-subtitle">Premium solutions generating recurring revenue for Kenyan businesses</p>
        </div>
        
        <div class="profit-tabs">
            <button class="tab-btn active" data-tab="tech">Tech Solutions</button>
            <button class="tab-btn" data-tab="marketing">Digital Marketing</button>
            <button class="tab-btn" data-tab="automation">Automation</button>
        </div>
        
        <!-- Tech Solutions Tab -->
       <!-- <div class="tab-content active" id="tech-tab">
            <div class="services-grid">
                <!-- Web Hosting -->
                <!--<div class="profit-card">
                    <div class="profit-icon">🖥️</div>
                    <h3>Web Hosting</h3>
                    <div class="profit-meta">
                        <span class="profit-price">KSh 1,999 - 9,999/month</span>
                        <span class="profit-margin">80% Margin</span>
                    </div>
                    <ul>
                        <li>✓ Reseller packages available</li>
                        <li>✓ Domain registration</li>
                        <li>✓ SSL certificates</li>
                    </ul>
                    <a href="#hosting" class="btn btn-small">View Packages</a>
                </div>
                
                <!-- Custom Software -->
              <!--  <div class="profit-card">
                    <div class="profit-icon">💻</div>
                    <h3>Custom Software</h3>
                    <div class="profit-meta">
                        <span class="profit-price">KSh 50,000 - 500,000+</span>
                        <span class="profit-margin">60-75% Margin</span>
                    </div>
                    <ul>
                        <li>✓ School Management Systems</li>
                        <li>✓ Hospital Management</li>
                        <li>✓ Custom CRM/ERP</li>
                    </ul>
                    <a href="#contact" class="btn btn-small">Get Quote</a>
                </div>
            </div>
        </div>
        
        <!-- Digital Marketing Tab -->
      <!-- <div class="tab-content" id="marketing-tab">
            <div class="services-grid">
                <!-- SEO Services -->
               <!-- <div class="profit-card">
                    <div class="profit-icon">🔍</div>
                    <h3>SEO Services</h3>
                    <div class="profit-meta">
                        <span class="profit-price">KSh 15,000 - 80,000/month</span>
                        <span class="profit-margin">70% Margin</span>
                    </div>
                    <ul>
                        <li>✓ Keyword research</li>
                        <li>✓ On-page optimization</li>
                        <li>✓ Monthly reporting</li>
                    </ul>
                    <a href="#contact" class="btn btn-small">Rank Higher</a>
                </div>
            
                <!-- Social Media Management -->
              <!--  <div class="profit-card">
                    <div class="profit-icon">📱</div>
                    <h3>Social Media Management</h3>
                    <div class="profit-meta">
                        <span class="profit-price">KSh 20,000 - 100,000/month</span>
                        <span class="profit-margin">65% Margin</span>
                    </div>
                    <ul>
                        <li>✓ Content creation</li>
                        <li>✓ Community management</li>
                        <li>✓ Ad campaign management</li>
                    </ul>
                    <a href="#contact" class="btn btn-small">Grow Followers</a>
                </div>
            </div>
        </div>
        
        <!-- Automation Tab -->
       <!--<div class="tab-content" id="automation-tab">
            <div class="services-grid">
                <!-- WhatsApp Automation -->
              <!-- <div class="profit-card">
                    <div class="profit-icon">🤖</div>
                    <h3>WhatsApp Automation</h3>
                    <div class="profit-meta">
                        <span class="profit-price">KSh 30,000 setup + KSh 5,000/month</span>
                        <span class="profit-margin">85% Margin</span>
                    </div>
                    <ul>
                        <li>✓ Official Business API</li>
                        <li>✓ Chatbot integration</li>
                        <li>✓ Bulk messaging</li>
                    </ul>
                    <a href="#contact" class="btn btn-small">Automate Now</a>
                </div>
                
                <!-- Email Marketing -->
              <!-- <div class="profit-card">
                    <div class="profit-icon">✉️</div>
                    <h3>Email Marketing</h3>
                    <div class="profit-meta">
                        <span class="profit-price">KSh 10,000 - 50,000/month</span>
                        <span class="profit-margin">75% Margin</span>
                    </div>
                    <ul>
                        <li>✓ Newsletter design</li>
                        <li>✓ Campaign management</li>
                        <li>✓ Analytics reporting</li>
                    </ul>
                    <a href="#contact" class="btn btn-small">Boost Sales</a>
                </div>
            </div>
        </div>
        
        <div class="profit-cta">
            <h3>Ready to add these services to your income streams?</h3>
            <p>We provide complete setup and training to launch these profitable services</p>
            <a href="#contact" class="btn btn-large">Schedule Consultation</a>
        </div>
    </div>



