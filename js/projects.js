document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load projects data
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error("Failed to load projects");
    const projects = await response.json();

    // Get container element
    const container = document.getElementById('projects-container');
    
    // Render projects
    container.innerHTML = projects.map(project => `
      <div class="project-card" data-category="${project.categories.join(' ')}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <div class="project-tag">${project.categories[0]}</div>
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
            ${project.technologies.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.website}" target="_blank" class="btn">View Project</a>
          </div>
        </div>
      </div>
    `).join('');

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => 
          b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
          card.style.display = filter === 'all' || 
            card.dataset.category.includes(filter) ? 'block' : 'none';
        });
      });
    });

  } catch (error) {
    console.error(error);
    document.getElementById('projects-container').innerHTML = `
      <div class="error">
        <p>⚠️ Error loading projects. Please try again later.</p>
        <button onclick="location.reload()">Refresh</button>
      </div>
    `;
  }
});