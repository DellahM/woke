// Utility Functions
const CMSLoader = {
    sanitize: (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    showError: (elementId) => {
        document.getElementById(elementId).style.display = 'block';
        document.getElementById(elementId.replace('-error', '-loading')).style.display = 'none';
    },
    
    init: function() {
        if (document.getElementById('projects-container')) this.loadProjects();
        if (document.getElementById('blog-posts-container')) this.loadBlogPosts();
        if (document.getElementById('team-members-container')) this.loadTeam();
    },
    
    loadProjects: async function() {
        try {
            const response = await fetch('/_data/projects/index.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const projects = await response.json();
            let html = '';
            
            projects.forEach(project => {
                html += `
                    <div class="project-card" data-category="${this.sanitize(project.category)}">
                        <div class="project-image">
                            <img src="${this.sanitize(project.image)}" alt="${this.sanitize(project.title)}" loading="lazy">
                            <div class="project-tag">${this.sanitize(project.category)}</div>
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${this.sanitize(project.title)}</h3>
                            <div class="project-meta">
                                <div class="project-client">
                                    <span>👤</span> ${this.sanitize(project.client || 'Private Client')}
                                </div>
                                <div class="project-date">
                                    <span>📅</span> ${this.formatDate(project.date)}
                                </div>
                            </div>
                            <p class="project-desc">${this.sanitize(project.description)}</p>
                            <div class="project-details">
                                ${project.technologies.map(tech => 
                                    `<span class="project-detail-item">${this.sanitize(tech)}</span>`
                                ).join('')}
                            </div>
                            <div class="project-links">
                                ${project.url ? `<a href="${this.sanitize(project.url)}" target="_blank" class="btn">Visit Website</a>` : ''}
                                <a href="/projects/${this.sanitize(project.slug)}" class="btn btn-outline">Case Study</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            document.getElementById('projects-container').innerHTML = html;
            document.getElementById('loading-projects').style.display = 'none';
            
            // Update subtitle with count
            const subtitle = document.getElementById('dynamic-subtitle');
            if (subtitle) {
                subtitle.textContent = `Showing ${projects.length} projects across various industries`;
            }
            
        } catch (error) {
            console.error('Project load error:', error);
            this.showError('projects-error');
        }
    },
    
    loadBlogPosts: async function() {
        try {
            const response = await fetch('/_posts/blog/index.json');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const posts = await response.json();
            let html = '';
            
            posts.slice(0, 3).forEach(post => {
                html += `
                    <div class="portfolio-item">
                        <img src="${this.sanitize(post.image)}" alt="${this.sanitize(post.title)}" class="portfolio-img" loading="lazy">
                        <div class="portfolio-overlay">
                            <p class="portfolio-category">${this.sanitize(post.category)}</p>
                            <h3 class="portfolio-title">${this.sanitize(post.title)}</h3>
                            <a href="/blog/${this.sanitize(post.slug)}" class="btn btn-outline">Read More</a>
                        </div>
                    </div>
                `;
            });
            
            document.getElementById('blog-posts-container').innerHTML = html;
            document.getElementById('blog-loading').style.display = 'none';
            
        } catch (error) {
            console.error('Blog load error:', error);
            this.showError('blog-error');
        }
    },
    
    loadTeam: async function() {
        // Similar structure for team loading
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => CMSLoader.init());