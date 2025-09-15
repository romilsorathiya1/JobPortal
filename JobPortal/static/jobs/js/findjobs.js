document.addEventListener('DOMContentLoaded', function() {
    const jobsData = [
        // Updated Job 1
        { id: 1, title: 'Software Engineer, Backend', company: 'Google', logo: 'https://logo.clearbit.com/google.com', location: 'Mountain View, CA', tags: ['Go', 'Distributed Systems'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Senior Level', companySize: '1001+', salary: 180000, postedAgo: '1 day ago', postedTimestamp: new Date().setDate(new Date().getDate() - 1) },
        // Updated Job 2
        { id: 2, title: 'Cloud Solutions Architect', company: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', location: 'Redmond, WA', tags: ['Azure', 'Cloud'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Senior Level', companySize: '1001+', salary: 165000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 3
        { id: 3, title: 'iOS Developer', company: 'Apple', logo: 'https://logo.clearbit.com/apple.com', location: 'Cupertino, CA', tags: ['Swift', 'iOS'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 175000, postedAgo: '4 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 4) },
        // Updated Job 4
        { id: 4, title: 'DevOps Engineer', company: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', location: 'Seattle, WA', tags: ['AWS', 'CI/CD'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 155000, postedAgo: '5 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 5) },
        // Updated Job 5
        { id: 5, title: 'Senior Data Engineer', company: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com', location: 'Los Gatos, CA', tags: ['Spark', 'ETL'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Senior Level', companySize: '1001+', salary: 195000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 6
        { id: 6, title: 'Frontend Developer', company: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com', location: 'New York, NY', tags: ['React', 'JavaScript'], jobType: 'Full-time', industry: 'Finance', experienceLevel: 'Mid Level', companySize: '201-1000', salary: 160000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 7
        { id: 7, title: 'UX/UI Designer', company: 'Figma', logo: 'https://logo.clearbit.com/figma.com', location: 'San Francisco, CA', tags: ['Remote Option', 'Figma'], jobType: 'Full-time', industry: 'Design', experienceLevel: 'Mid Level', companySize: '201-1000', salary: 140000, postedAgo: '5 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 5) },
        // Updated Job 8
        { id: 8, title: 'Project Manager', company: 'Atlassian', logo: 'https://logo.clearbit.com/atlassian.com', location: 'Chicago, IL', tags: ['Agile', 'Jira'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Senior Level', companySize: '1001+', salary: 130000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 9
        { id: 9, title: 'Data Scientist', company: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com', location: 'Boston, MA', tags: ['Python', 'Machine Learning'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 170000, postedAgo: '3 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 3) },
        // Updated Job 10
        { id: 10, title: 'Backend Engineer', company: 'Twilio', logo: 'https://logo.clearbit.com/twilio.com', location: 'Remote', tags: ['Node.js', 'AWS'], jobType: 'Remote', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 150000, postedAgo: '8 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 8) },
        // Updated Job 11
        { id: 11, title: 'HR Manager', company: 'HubSpot', logo: 'https://logo.clearbit.com/hubspot.com', location: 'Austin, TX', tags: ['Recruiting', 'Onboarding'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Senior Level', companySize: '1001+', salary: 95000, postedAgo: '10 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 10) },
        // Updated Job 12
        { id: 12, title: 'Product Manager', company: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com', location: 'San Francisco, CA', tags: ['SaaS', 'Product Strategy'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Director', companySize: '1001+', salary: 185000, postedAgo: '1 day ago', postedTimestamp: new Date().setDate(new Date().getDate() - 1) },
        // Updated Job 13
        { id: 13, title: 'Digital Marketing Specialist', company: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com', location: 'New York, NY', tags: ['SEO', 'SEM'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Entry Level', companySize: '1001+', salary: 85000, postedAgo: '3 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 3) },
        // Updated Job 14
        { id: 14, title: 'Operations Manager', company: 'Uber', logo: 'https://logo.clearbit.com/uber.com', location: 'Chicago, IL', tags: ['Logistics', 'Strategy'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 110000, postedAgo: '6 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 6) },
        // Updated Job 15
        { id: 15, title: 'Content Strategist', company: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com', location: 'Remote', tags: ['Content Marketing', 'Writing'], jobType: 'Contract', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 90000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 16
        { id: 16, title: 'Security Engineer', company: 'Slack', logo: 'https://logo.clearbit.com/slack.com', location: 'Denver, CO', tags: ['Cybersecurity', 'InfoSec'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 160000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 17
        { id: 17, title: 'QA Automation Engineer', company: 'Dropbox', logo: 'https://logo.clearbit.com/dropbox.com', location: 'Austin, TX', tags: ['Selenium', 'Testing'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Entry Level', companySize: '1001+', salary: 125000, postedAgo: '4 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 4) },
        // Updated Job 18
        { id: 18, title: 'Machine Learning Engineer', company: 'LinkedIn', logo: 'https://logo.clearbit.com/linkedin.com', location: 'Sunnyvale, CA', tags: ['AI', 'NLP'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Senior Level', companySize: '1001+', salary: 190000, postedAgo: '5 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 5) },
        // Updated Job 19
        { id: 19, title: 'Hardware Engineer', company: 'Intel', logo: 'https://logo.clearbit.com/intel.com', location: 'Hillsboro, OR', tags: ['VLSI', 'Semiconductors'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 145000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 20
        { id: 20, title: 'Database Administrator', company: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com', location: 'Reston, VA', tags: ['SQL', 'Database Management'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 120000, postedAgo: '2 weeks ago', postedTimestamp: new Date().setDate(new Date().getDate() - 14) },
        // Updated Job 21
        { id: 21, title: 'Network Engineer', company: 'Cisco', logo: 'https://logo.clearbit.com/cisco.com', location: 'San Jose, CA', tags: ['Networking', 'CCNA'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 135000, postedAgo: '3 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 3) },
        // Updated Job 22
        { id: 22, title: 'Blockchain Developer', company: 'IBM', logo: 'https://logo.clearbit.com/ibm.com', location: 'Armonk, NY', tags: ['Blockchain', 'Hyperledger'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Senior Level', companySize: '1001+', salary: 155000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 23
        { id: 23, title: 'Ruby on Rails Developer', company: 'Shopify', logo: 'https://logo.clearbit.com/shopify.com', location: 'Remote', tags: ['Ruby', 'Rails'], jobType: 'Remote', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 165000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 24
        { id: 24, title: 'Mobile Engineer (Android)', company: 'Square', logo: 'https://logo.clearbit.com/square.com', location: 'Atlanta, GA', tags: ['Kotlin', 'Android'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 158000, postedAgo: '5 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 5) },
        // Updated Job 25
        { id: 25, title: 'Content Moderator', company: 'Twitter', logo: 'https://logo.clearbit.com/twitter.com', location: 'Dublin, Ireland', tags: ['Social Media', 'Policy'], jobType: 'Contract', industry: 'Technology', experienceLevel: 'Entry Level', companySize: '1001+', salary: 55000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 26
        { id: 26, title: 'Visual Designer', company: 'Pinterest', logo: 'https://logo.clearbit.com/pinterest.com', location: 'San Francisco, CA', tags: ['Graphic Design', 'UI'], jobType: 'Full-time', industry: 'Design', experienceLevel: 'Mid Level', companySize: '1001+', salary: 115000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 27
        { id: 27, title: 'Data Analyst', company: 'Lyft', logo: 'https://logo.clearbit.com/lyft.com', location: 'New York, NY', tags: ['SQL', 'Tableau'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Entry Level', companySize: '1001+', salary: 105000, postedAgo: '4 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 4) },
        { id: 28, title: 'AR Engineer', company: 'Snap', logo: 'https://logo.clearbit.com/snap.com', location: 'Los Angeles, CA', tags: ['AR/VR', 'Computer Vision'], jobType: 'Full-time', industry: 'Technology', experienceLevel: 'Mid Level', companySize: '1001+', salary: 175000, postedAgo: '6 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 6) },
        { id: 29, title: 'Customer Support Representative', company: 'Zoom', logo: 'https://logo.clearbit.com/zoom.us', location: 'Remote', tags: ['Communication'], jobType: 'Part-time', industry: 'Technology', experienceLevel: 'Entry Level', companySize: '1001+', salary: 48000, postedAgo: '1 day ago', postedTimestamp: new Date().setDate(new Date().getDate() - 1) },
        // Updated Job 30
        { id: 30, title: 'Retail Sales Associate', company: 'T-Mobile', logo: 'https://logo.clearbit.com/t-mobile.com', location: 'Miami, FL', tags: ['Sales', 'Retail'], jobType: 'Part-time', industry: 'Retail', experienceLevel: 'Entry Level', companySize: '1001+', salary: 38000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 31
        { id: 31, title: 'Supply Chain Analyst', company: 'Walmart', logo: 'https://logo.clearbit.com/walmart.com', location: 'Bentonville, AR', tags: ['Logistics', 'Supply Chain'], jobType: 'Full-time', industry: 'Retail', experienceLevel: 'Mid Level', companySize: '1001+', salary: 82000, postedAgo: '5 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 5) },
        // Updated Job 32
        { id: 32, title: 'Accountant', company: 'Costco', logo: 'https://logo.clearbit.com/costco.com', location: 'Issaquah, WA', tags: ['Accounting'], jobType: 'Full-time', industry: 'Retail', experienceLevel: 'Entry Level', companySize: '1001+', salary: 78000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 33
        { id: 33, title: 'Financial Advisor', company: 'Wells Fargo', logo: 'https://logo.clearbit.com/wellsfargo.com', location: 'Charlotte, NC', tags: ['Wealth Management'], jobType: 'Full-time', industry: 'Finance', experienceLevel: 'Mid Level', companySize: '1001+', salary: 92000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 34
        { id: 34, title: 'Investment Banking Analyst', company: 'Goldman Sachs', logo: 'https://logo.clearbit.com/goldmansachs.com', location: 'New York, NY', tags: ['Investment Banking'], jobType: 'Full-time', industry: 'Finance', experienceLevel: 'Entry Level', companySize: '1001+', salary: 115000, postedAgo: '3 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 3) },
        // Updated Job 35
        { id: 35, title: 'Animator', company: 'Disney', logo: 'https://logo.clearbit.com/disney.com', location: 'Burbank, CA', tags: ['Animation', 'Creative'], jobType: 'Full-time', industry: 'Entertainment', experienceLevel: 'Mid Level', companySize: '1001+', salary: 98000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 36
        { id: 36, title: 'Aerospace Engineer', company: 'NASA', logo: 'https://logo.clearbit.com/nasa.gov', location: 'Houston, TX', tags: ['Aerospace'], jobType: 'Full-time', industry: 'Aerospace', experienceLevel: 'Senior Level', companySize: '1001+', salary: 125000, postedAgo: '2 weeks ago', postedTimestamp: new Date().setDate(new Date().getDate() - 14) },
        // Updated Job 37
        { id: 37, title: 'Mechanical Engineer', company: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com', location: 'Palo Alto, CA', tags: ['Mechanical'], jobType: 'Full-time', industry: 'Automotive', experienceLevel: 'Mid Level', companySize: '1001+', salary: 130000, postedAgo: '4 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 4) },
        // Updated Job 38
        { id: 38, title: 'Automotive Technician', company: 'Ford', logo: 'https://logo.clearbit.com/ford.com', location: 'Dearborn, MI', tags: ['Automotive', 'Technician'], jobType: 'Full-time', industry: 'Automotive', experienceLevel: 'Entry Level', companySize: '1001+', salary: 60000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 39
        { id: 39, title: 'Structural Analyst Engineer', company: 'Boeing', logo: 'https://logo.clearbit.com/boeing.com', location: 'Everett, WA', tags: ['Aerospace'], jobType: 'Full-time', industry: 'Aerospace', experienceLevel: 'Mid Level', companySize: '1001+', salary: 118000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 40
        { id: 40, title: 'Systems Engineer', company: 'Lockheed Martin', logo: 'https://logo.clearbit.com/lockheedmartin.com', location: 'Bethesda, MD', tags: ['Systems'], jobType: 'Full-time', industry: 'Aerospace', experienceLevel: 'Senior Level', companySize: '1001+', salary: 122000, postedAgo: '5 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 5) },
        // Updated Job 41
        { id: 41, title: 'Healthcare Data Analyst', company: 'UnitedHealth Group', logo: 'https://logo.clearbit.com/unitedhealthgroup.com', location: 'Minnetonka, MN', tags: ['Data Analysis'], jobType: 'Full-time', industry: 'Healthcare', experienceLevel: 'Mid Level', companySize: '1001+', salary: 93000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 42
        { id: 42, title: 'Clinical Research Associate', company: 'Pfizer', logo: 'https://logo.clearbit.com/pfizer.com', location: 'New York, NY', tags: ['Research'], jobType: 'Full-time', industry: 'Healthcare', experienceLevel: 'Entry Level', companySize: '1001+', salary: 88000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 43
        { id: 43, title: 'Private Banker', company: 'JPMorgan Chase', logo: 'https://logo.clearbit.com/jpmorganchase.com', location: 'Chicago, IL', tags: ['Banking'], jobType: 'Full-time', industry: 'Finance', experienceLevel: 'Mid Level', companySize: '1001+', salary: 130000, postedAgo: '4 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 4) },
        // Updated Job 44
        { id: 44, title: 'Brand Manager', company: 'Procter & Gamble', logo: 'https://logo.clearbit.com/pg.com', location: 'Cincinnati, OH', tags: ['Brand Management'], jobType: 'Full-time', industry: 'Consumer Goods', experienceLevel: 'Senior Level', companySize: '1001+', salary: 112000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        // Updated Job 45
        { id: 45, title: 'Marketing Coordinator', company: 'Coca-Cola', logo: 'https://logo.clearbit.com/cocacola.com', location: 'Atlanta, GA', tags: ['Coordination'], jobType: 'Full-time', industry: 'Consumer Goods', experienceLevel: 'Entry Level', companySize: '1001+', salary: 65000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) },
        // Updated Job 46
        { id: 46, title: 'Footwear Designer', company: 'Nike', logo: 'https://logo.clearbit.com/nike.com', location: 'Beaverton, OR', tags: ['Footwear'], jobType: 'Full-time', industry: 'Retail', experienceLevel: 'Mid Level', companySize: '1001+', salary: 95000, postedAgo: '5 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 5) },
        // Updated Job 47
        { id: 47, title: 'Barista', company: 'Starbucks', logo: 'https://logo.clearbit.com/starbucks.com', location: 'Seattle, WA', tags: ['Customer Service'], jobType: 'Part-time', industry: 'Food Service', experienceLevel: 'Entry Level', companySize: '1001+', salary: 35000, postedAgo: '1 day ago', postedTimestamp: new Date().setDate(new Date().getDate() - 1) },
        { id: 48, title: 'Crew Member', company: 'McDonald\'s', logo: 'https://logo.clearbit.com/mcdonalds.com', location: 'Chicago, IL', tags: ['Team Member'], jobType: 'Part-time', industry: 'Food Service', experienceLevel: 'Entry Level', companySize: '1001+', salary: 32000, postedAgo: '3 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 3) },
        { id: 49, title: 'Sales Associate', company: 'The Home Depot', logo: 'https://logo.clearbit.com/homedepot.com', location: 'Atlanta, GA', tags: ['Sales'], jobType: 'Full-time', industry: 'Retail', experienceLevel: 'Entry Level', companySize: '1001+', salary: 42000, postedAgo: '1 week ago', postedTimestamp: new Date().setDate(new Date().getDate() - 7) },
        { id: 50, title: 'Customer Service Associate', company: 'Lowe\'s', logo: 'https://logo.clearbit.com/lowes.com', location: 'Mooresville, NC', tags: ['Customer Service'], jobType: 'Part-time', industry: 'Retail', experienceLevel: 'Entry Level', companySize: '1001+', salary: 40000, postedAgo: '2 days ago', postedTimestamp: new Date().setDate(new Date().getDate() - 2) }
    ];

    const jobListingsContainer = document.getElementById('job-listings');
    const paginationContainer = document.getElementById('pagination');
    const resultsCountDisplay = document.getElementById('results-count-display');
    const mobileResultsCount = document.getElementById('mobile-results-count');

    const keywordsInput = document.getElementById('keywords');
    const locationInput = document.getElementById('location');
    const jobTypeContainer = document.getElementById('job-type');
    const experienceLevelSelect = document.getElementById('experience-level');
    const salaryRange = document.getElementById('salary-range');
    const salaryValue = document.getElementById('salary-value');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const sortSelect = document.getElementById('sort-options');

    const industryTypeContainer = document.getElementById('industry-type'); // Added for industry filter
    const companySizeContainer = document.getElementById('company-size'); // Added for company size filter


    let currentPage = 1;
    const jobsPerPage = 10;
    let currentFilteredJobs = [...jobsData];

    const createJobCard = (job) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <div class="job-card-header">
                <img src="${job.logo}" alt="${job.company} Logo" class="logo">
                <div class="info">
                    <h3>${job.title}</h3>
                    <span class="company">${job.company}</span>
                </div>
            </div>
            <div class="details">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-briefcase"></i> ${job.jobType}</span>
                <span><i class="fas fa-dollar-sign"></i> $${(job.salary / 1000)}k</span>
            </div>
            <div class="tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="job-card-footer">
                <span class="posted-date">Posted ${job.postedAgo}</span>
                <a href="#" class="btn-apply">Apply Now</a>
            </div>
        `;
        return jobCard;
    };

    const updateResultsCount = (totalJobs, pageJobs) => {
        const start = (currentPage - 1) * jobsPerPage + 1;
        const end = start + pageJobs.length - 1;
        const desktopText = totalJobs === 0 ? 'No jobs found' : `Showing <b>${start}-${end}</b> of <b>${totalJobs}</b> jobs`;
        const mobileText = totalJobs === 0 ? '' : `<b>${totalJobs}</b> jobs found`;

        resultsCountDisplay.innerHTML = desktopText;
        mobileResultsCount.innerHTML = mobileText;
    };

    const displayPage = (page) => {
        currentPage = page;
        jobListingsContainer.innerHTML = '';

        const paginatedJobs = currentFilteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
        paginatedJobs.forEach(job => jobListingsContainer.appendChild(createJobCard(job)));

        updateResultsCount(currentFilteredJobs.length, paginatedJobs);
        setupPagination();
    };

    const setupPagination = () => {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(currentFilteredJobs.length / jobsPerPage);
        if (pageCount <= 1) return;

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => {
                displayPage(i);
                // Scroll to top of job listings when changing page
                window.scrollTo({ top: jobListingsContainer.offsetTop - 100, behavior: 'smooth' });
            });
            paginationContainer.appendChild(btn);
        }
    };

    const updateDisplay = () => {
        const keywords = keywordsInput.value.toLowerCase();
        const location = locationInput.value.toLowerCase();
        const selectedJobTypes = Array.from(jobTypeContainer.querySelectorAll('input:checked')).map(cb => cb.value);
        const experienceLevel = experienceLevelSelect.value;
        const minSalary = parseInt(salaryRange.value) * 1000;
        const selectedIndustries = Array.from(industryTypeContainer.querySelectorAll('input:checked')).map(cb => cb.value); // New
        const selectedCompanySizes = Array.from(companySizeContainer.querySelectorAll('input:checked')).map(cb => cb.value); // New

        currentFilteredJobs = jobsData.filter(job => {
            const jobText = `${job.title} ${job.company} ${job.tags.join(' ')}`.toLowerCase();
            return jobText.includes(keywords) &&
                   job.location.toLowerCase().includes(location) &&
                   (selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType)) &&
                   (!experienceLevel || job.experienceLevel === experienceLevel) && // !!! Changed from job.experience
                   job.salary >= minSalary &&
                   (selectedIndustries.length === 0 || selectedIndustries.includes(job.industry)) && // !!! Changed from job.category to job.industry for filter matching
                   (selectedCompanySizes.length === 0 || selectedCompanySizes.includes(job.companySize));
        });

        const sortOption = sortSelect.value;
        if (sortOption === 'date') currentFilteredJobs.sort((a, b) => b.postedTimestamp - a.postedTimestamp);
        if (sortOption === 'salary') currentFilteredJobs.sort((a, b) => b.salary - a.salary);

        displayPage(1);
    };

    // Event listeners for filters and search inputs
    [keywordsInput, locationInput, salaryRange, sortSelect].forEach(input => {
        const eventType = ['range', 'text'].includes(input.type) ? 'input' : 'change';
        input.addEventListener(eventType, updateDisplay);
    });

    // Event listeners for checkbox groups
    [jobTypeContainer, industryTypeContainer, companySizeContainer].forEach(container => {
        container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', updateDisplay);
        });
    });

    // Event listener for custom select (experience level)
    experienceLevelSelect.addEventListener('change', updateDisplay);


    salaryRange.addEventListener('input', () => salaryValue.textContent = `$${salaryRange.value}k`);
    resetFiltersBtn.addEventListener('click', () => {
        document.querySelectorAll('aside input:not([type="range"])').forEach(input => input.value = '');
        document.querySelectorAll('aside input[type="checkbox"]').forEach(cb => cb.checked = false);
        experienceLevelSelect.value = ''; // Reset actual select value
        salaryRange.value = 0;
        salaryValue.textContent = `$0k`;
        sortSelect.value = 'relevance';
        // Manually update the custom select displays for clarity
        document.querySelectorAll('.custom-select-wrapper select').forEach(select => {
             // Find the custom select associated with this native select
            const customSelectElement = select.closest('.custom-select-wrapper').querySelector('.custom-select');
            if (customSelectElement) {
                const triggerText = customSelectElement.querySelector('.custom-select__trigger span');
                const firstOption = customSelectElement.querySelector('.custom-select__option');
                if (firstOption) {
                    firstOption.classList.add('selected');
                    triggerText.textContent = firstOption.textContent;
                }
                customSelectElement.classList.remove('open');
            }
        });

        updateDisplay();
    });

    // --- Custom Select Dropdown (for experience level and sort by) ---
    // This logic creates the custom dropdowns from the native <select> elements
    const initializeCustomSelect = (selectElementId) => {
        const selectElement = document.getElementById(selectElementId);
        if (!selectElement) return;

        const customSelectWrapper = selectElement.parentElement; // Assuming wrapper is parent
        let customSelect = customSelectWrapper.querySelector('.custom-select');

        // If custom select doesn't exist, create it (for native <select>s)
        if (!customSelect) {
            customSelect = document.createElement('div');
            customSelect.className = 'custom-select';
            const trigger = document.createElement('div');
            trigger.className = 'custom-select__trigger';
            const triggerSpan = document.createElement('span');
            trigger.appendChild(triggerSpan);
            const optionsContainer = document.createElement('ul');
            optionsContainer.className = 'custom-select__options';

            customSelect.append(trigger, optionsContainer);
            customSelectWrapper.append(customSelect);
        }

        const trigger = customSelect.querySelector('.custom-select__trigger');
        const triggerSpan = trigger.querySelector('span');
        const optionsContainer = customSelect.querySelector('.custom-select__options');
        optionsContainer.innerHTML = ''; // Clear existing options if re-initializing

        const updateCustomSelect = () => {
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            triggerSpan.textContent = selectedOption.textContent;
            optionsContainer.querySelectorAll('.custom-select__option').forEach(opt => {
                opt.classList.toggle('selected', opt.dataset.value === selectedOption.value);
            });
        };

        Array.from(selectElement.options).forEach(option => {
            const li = document.createElement('li');
            li.className = 'custom-select__option';
            li.textContent = option.textContent;
            li.dataset.value = option.value;
            if (option.selected) li.classList.add('selected');
            optionsContainer.appendChild(li);
            li.addEventListener('click', e => {
                e.stopPropagation();
                selectElement.value = li.dataset.value; // Update native select
                updateCustomSelect(); // Update custom select display
                customSelect.classList.remove('open');
                selectElement.dispatchEvent(new Event('change')); // Trigger native select change event
            });
        });

        trigger.addEventListener('click', e => {
            e.stopPropagation();
            customSelect.classList.toggle('open');
            // Close other open selects
            document.querySelectorAll('.custom-select.open').forEach(otherSelect => {
                if (otherSelect !== customSelect) {
                    otherSelect.classList.remove('open');
                }
            });
        });

        updateCustomSelect(); // Set initial display
    };

    // Initialize custom selects on load
    initializeCustomSelect('sort-options');
    initializeCustomSelect('experience-level');

    window.addEventListener('click', e => {
        document.querySelectorAll('.custom-select.open').forEach(select => {
            if (!select.contains(e.target)) select.classList.remove('open');
        });
    });


    // --- Mobile Filters & Menu Toggle ---
    // const mobileMenuToggle = document.getElementById('mobile-menu-toggle'); // Handled in base.js now
    // const mainNav = document.getElementById('main-nav'); // Handled in base.js now
    // mobileMenuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));

    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const filtersSidebar = document.getElementById('filters-sidebar');
    const backdrop = document.getElementById('backdrop');

    const toggleFilters = () => {
        filtersSidebar.classList.toggle('open');
        backdrop.classList.toggle('active');
    };

    mobileFilterBtn.addEventListener('click', toggleFilters);
    backdrop.addEventListener('click', toggleFilters);


    updateDisplay(); // Initial display of jobs
});