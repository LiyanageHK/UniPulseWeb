document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (!searchInput || !searchResults) return;

  const searchData = [
    { title: "Home", url: "index.html", keywords: "home, main, intro, university, freshers, modules", desc: "UniPulse AI-Based Social Integration Platform" },
    { title: "Domain", url: "domain.html", keywords: "domain, literature review, research gap, methodology, technologies", desc: "Research domain, methodology, and technology stack" },
    { title: "Milestones", url: "milestones.html", keywords: "milestones, timeline, progress, proposal, progress presentation", desc: "Project timeline and key milestones" },
    { title: "Documents", url: "documents.html", keywords: "documents, taf, research paper, project proposal, business model canvas", desc: "Official research documents and proposals" },
    { title: "Proposal Presentation Document", url: "documents.html", keywords: "proposal presentation document pdf final group", desc: "Final Project Proposal Document" },
    { title: "Slides", url: "slides.html", keywords: "slides, presentations, proposal presentation slides", desc: "Project presentation slides" },
    { title: "Proposal Presentation Slides", url: "slides.html", keywords: "proposal presentation slides", desc: "Slides for the proposal presentation" },
    { title: "About Us", url: "about.html", keywords: "about us, team, supervisor, hiruni, members", desc: "Research team and supervisors" },
    { title: "Contact Us", url: "contact.html", keywords: "contact, email, form, reach us", desc: "Get in touch with the team" }
  ];

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }

    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.keywords.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
      filtered.forEach(item => {
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'search-result-item';
        a.innerHTML = `
          <span class="search-result-title">${item.title}</span>
          <span class="search-result-desc">${item.desc}</span>
        `;
        searchResults.appendChild(a);
      });
      searchResults.classList.add('active');
    } else {
      searchResults.innerHTML = `
        <div class="search-result-item">
          <span class="search-result-desc">No results found for "${query}"</span>
        </div>
      `;
      searchResults.classList.add('active');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });
});
