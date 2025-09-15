
document.addEventListener('DOMContentLoaded', function() {
    // --- MOBILE MENU SCRIPT (from homepage) ---
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    if(menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
    }

    // --- CORE FUNCTIONALITY SCRIPT (from original companies page) ---
    const companiesData = [
        { id: 1, name: 'Google', logo: 'https://logo.clearbit.com/google.com', industry: 'Technology', location: 'Mountain View, CA', tagline: 'Organizing the world\'s information and making it universally accessible.', activeJobs: 132 },
        { id: 2, name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', industry: 'Technology', location: 'Redmond, WA', tagline: 'Empowering every person and every organization on the planet to achieve more.', activeJobs: 98 },
        { id: 3, name: 'Apple', logo: 'https://logo.clearbit.com/apple.com', industry: 'Technology', location: 'Cupertino, CA', tagline: 'Think Different. Creating innovative products that empower people.', activeJobs: 85 },
        { id: 4, name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', industry: 'Retail', location: 'Seattle, WA', tagline: 'From A to Z. The world\'s most customer-centric company.', activeJobs: 215 },
        { id: 5, name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com', industry: 'Technology', location: 'Los Gatos, CA', tagline: 'See What\'s Next. The leading streaming entertainment service.', activeJobs: 45 },
        { id: 6, name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', industry: 'Finance', location: 'San Francisco, CA', tagline: 'A technology company that builds economic infrastructure for the internet.', activeJobs: 33 },
        { id: 7, name: 'Figma', logo: 'https://logo.clearbit.com/figma.com', industry: 'Design', location: 'San Francisco, CA', tagline: 'The collaborative interface design tool. Nothing great is made alone.', activeJobs: 12 },
        { id: 8, name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com', industry: 'Technology', location: 'Stockholm, Sweden', tagline: 'Music for everyone. A digital music service that gives you access to millions of songs.', activeJobs: 28 },
        { id: 9, name: 'Pfizer', logo: 'https://logo.clearbit.com/pfizer.com', industry: 'Healthcare', location: 'New York, NY', tagline: 'Working together for a healthier world with breakthroughs that change patients\' lives.', activeJobs: 56 },
        { id: 10, name: 'Nike', logo: 'https://logo.clearbit.com/nike.com', industry: 'Retail', location: 'Beaverton, OR', tagline: 'Just Do It. Bringing inspiration and innovation to every athlete in the world.', activeJobs: 72 },
        { id: 11, name: 'Goldman Sachs', logo: 'https://logo.clearbit.com/goldmansachs.com', industry: 'Finance', location: 'New York, NY', tagline: 'A leading global financial institution that delivers a broad range of financial services.', activeJobs: 110 },
        { id: 12, name: 'Disney', logo: 'https://logo.clearbit.com/disney.com', industry: 'Design', location: 'Burbank, CA', tagline: 'The mission of The Walt Disney Company is to entertain, inform and inspire people.', activeJobs: 64 }
    ];

    const companyGrid = document.getElementById('company-grid');
    const paginationContainer = document.getElementById('pagination');
    const keywordInput = document.getElementById('company-keyword');
    const locationInput = document.getElementById('company-location');
    const industryInput = document.getElementById('company-industry'); // The hidden select

    let currentPage = 1;
    const companiesPerPage = 9;
    let currentFilteredCompanies = [...companiesData];

    const createCompanyCard = (company) => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <div class="company-card-header">
                <img src="${company.logo}" alt="${company.name} Logo" loading="lazy">
                <div>
                    <h3 class="company-name">${company.name}</h3>
                </div>
            </div>
            <p class="company-card-tagline">${company.tagline}</p>
            <div class="company-card-details">
                <span><i class="fas fa-briefcase"></i> ${company.industry}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${company.location}</span>
            </div>
            <div class="company-card-footer">
                <span class="active-jobs-count">${company.activeJobs} Active Jobs</span>
                <a href="#" class="btn-view-jobs">View Jobs</a>
            </div>
        `;
        return card;
    };

    const displayPage = (page) => {
        currentPage = page;
        if(!companyGrid) return;
        companyGrid.innerHTML = '';
        
        const start = (page - 1) * companiesPerPage;
        const end = start + companiesPerPage;
        const paginatedCompanies = currentFilteredCompanies.slice(start, end);

        paginatedCompanies.forEach(company => {
            companyGrid.appendChild(createCompanyCard(company));
        });
        
        setupPagination();
    };

    const setupPagination = () => {
        if(!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(currentFilteredCompanies.length / companiesPerPage);
        if (pageCount <= 1) return;

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => {
                displayPage(i);
                // Scroll to the top of the grid smoothly
                const gridTop = companyGrid.offsetTop;
                window.scrollTo({ top: gridTop - 100, behavior: 'smooth' });
            });
            paginationContainer.appendChild(btn);
        }
    };
    
    const updateDisplay = () => {
        const keyword = keywordInput.value.toLowerCase();
        const location = locationInput.value.toLowerCase();
        const industry = industryInput.value;

        currentFilteredCompanies = companiesData.filter(company => {
            const matchesKeyword = company.name.toLowerCase().includes(keyword);
            const matchesLocation = company.location.toLowerCase().includes(location);
            const matchesIndustry = !industry || company.industry === industry;
            return matchesKeyword && matchesLocation && matchesIndustry;
        });
        
        displayPage(1);
    };

    // Event Listeners for standard filters
    if(keywordInput) keywordInput.addEventListener('keyup', updateDisplay);
    if(locationInput) locationInput.addEventListener('keyup', updateDisplay);
    if(industryInput) industryInput.addEventListener('change', updateDisplay);

    // --- JavaScript for Custom Select ---
    const customSelect = document.getElementById('custom-industry-select');
    if(customSelect) {
        const trigger = customSelect.querySelector('.custom-select__trigger');
        const options = customSelect.querySelectorAll('.custom-select__option');
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelect.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const currentlySelected = customSelect.querySelector('.custom-select__option.selected');
                if (currentlySelected) {
                    currentlySelected.classList.remove('selected');
                }
                option.classList.add('selected');
                trigger.querySelector('span').textContent = option.textContent;
                industryInput.value = option.getAttribute('data-value');
                industryInput.dispatchEvent(new Event('change')); // Important to trigger the filter update
                customSelect.classList.remove('open');
            });
        });

        window.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    // Initial Load
    updateDisplay();
});
