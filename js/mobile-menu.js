// ==================== MOBILE MENU FUNCTIONALITY ==================== //
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');
    
    if (mobileMenuToggle && navMenu) {
        // Ensure menu is closed on page load
        navMenu.classList.remove('show');
        
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('show');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = navMenu.classList.contains('show');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
            
            // Change hamburger icon to X when menu is open
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
            }
        });
        
        // Close menu when clicking navigation links
        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                // Reset hamburger icon
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('show');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                // Reset hamburger icon
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Close menu on window resize to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('show');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                // Reset hamburger icon
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollEffects(); // If you want header scroll styling
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

// ==================== SMOOTH SCROLLING FOR ANCHOR LINKS ==================== //
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== INITIALIZE ALL FUNCTIONS ==================== //
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollEffects();
    initSmoothScrolling();
    
    console.log('Mobile menu and navigation initialized');
});

// Fallback initialization for browsers that don't support DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initScrollEffects();
        initSmoothScrolling();
    });
} else {
    initMobileMenu();
    initScrollEffects();
    initSmoothScrolling();
}
