
document.addEventListener('DOMContentLoaded', function() {
// --- DATA SIMULATION ---
let jobSeekers = [
{ id: 1, name: "Priya Sharma", email: "priya.s@example.com", phone: "9876543210", joined: "2025-08-20" },
{ id: 2, name: "Rohan Patel", email: "rohan.p@example.com", phone: "9876543211", joined: "2025-08-18" },
{ id: 3, name: "Anjali Singh", email: "anjali.s@example.com", phone: "9876543212", joined: "2025-08-15" },
{ id: 4, name: "Sameer Khan", email: "sameer.k@example.com", phone: "9876543213", joined: "2025-08-12" },
{ id: 5, name: "Aditi Joshi", email: "aditi.j@example.com", phone: "9876543214", joined: "2025-08-10" },
];

let companies = [
{ id: 101, name: "Tech Solutions Inc.", industry: "Technology", location: "Bengaluru", joined: "2025-07-01" },
{ id: 102, name: "Innovate Co.", industry: "Fintech", location: "Mumbai", joined: "2025-07-05" },
{ id: 103, name: "HealthFirst", industry: "Healthcare", location: "Delhi", joined: "2025-07-10" },
{ id: 104, name: "MarketBridge", industry: "Marketing", location: "Pune", joined: "2025-07-15" }
];

let jobs = [
{ id: 201, title: "Senior Frontend Developer", company: "Tech Solutions Inc." },
{ id: 202, title: "Project Manager", company: "Innovate Co." },
{ id: 203, title: "Data Analyst", company: "MarketBridge" },
{ id: 204, title: "Medical Researcher", company: "HealthFirst" }
];

let applications = [
{ seekerId: 1, jobId: 201, date: "2025-08-21" },
{ seekerId: 2, jobId: 202, date: "2025-08-21" },
{ seekerId: 3, jobId: 201, date: "2025-08-20" },
{ seekerId: 4, jobId: 204, date: "2025-08-19" },
{ seekerId: 5, jobId: 201, date: "2025-08-18" },
{ seekerId: 1, jobId: 202, date: "2025-08-17" },
];

const totalHired = 458;

// --- STATE MANAGEMENT ---
let currentEditId = null;

// --- UI ELEMENTS ---
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const overlay = document.getElementById('sidebar-overlay');

const seekerSearch = document.getElementById('seeker-search');
const companySearch = document.getElementById('company-search');
const jobSearch = document.getElementById('job-search');

// --- MOBILE SIDEBAR LOGIC ---
menuToggle.addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('active'); });
overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); });

// --- VIEW & NAVIGATION LOGIC ---
function showView(viewId) {
views.forEach(v => v.classList.remove('active'));
document.getElementById(viewId).classList.add('active');

const isFormActive = viewId.includes('-form-');
const isApplicantsView = viewId === 'applicants-view';

navLinks.forEach(l => {
    const linkView = l.getAttribute('data-view');
    let mainViewId = viewId.replace('-form-view', '-view');

    const isActive = (linkView === mainViewId) || (isApplicantsView && linkView === 'jobs-view');
    l.classList.toggle('active', isActive);
});

if (window.innerWidth <= 992) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
}
}

navLinks.forEach(link => {
link.addEventListener('click', e => {
    e.preventDefault();
    showView(link.getAttribute('data-view'));
});
});

// --- FORM MANAGEMENT ---
function showSeekerForm(seekerId = null) {
document.getElementById('seeker-form').reset();
currentEditId = seekerId;
if (seekerId) {
    const seeker = jobSeekers.find(s => s.id === seekerId);
    document.getElementById('seeker-form-title').textContent = 'Edit Job Seeker';
    document.getElementById('seeker-id-input').value = seeker.id;
    document.getElementById('seeker-name').value = seeker.name;
    document.getElementById('seeker-email').value = seeker.email;
    document.getElementById('seeker-phone').value = seeker.phone;
} else {
    document.getElementById('seeker-form-title').textContent = 'Add New Job Seeker';
    document.getElementById('seeker-id-input').value = '';
}
showView('seeker-form-view');
}

function showCompanyForm(companyId = null) {
document.getElementById('company-form').reset();
currentEditId = companyId;
if (companyId) {
    const company = companies.find(c => c.id === companyId);
    document.getElementById('company-form-title').textContent = 'Edit Company';
    document.getElementById('company-id-input').value = company.id;
    document.getElementById('company-name').value = company.name;
    document.getElementById('company-industry').value = company.industry;
    document.getElementById('company-location').value = company.location;
} else {
    document.getElementById('company-form-title').textContent = 'Add New Company';
    document.getElementById('company-id-input').value = '';
}
showView('company-form-view');
}

function showJobForm(jobId = null) {
document.getElementById('job-form').reset();
populateCompanyOptions();
currentEditId = jobId;
if (jobId) {
    const job = jobs.find(j => j.id === jobId);
    document.getElementById('job-form-title').textContent = 'Edit Job';
    document.getElementById('job-id-input').value = job.id;
    document.getElementById('job-title').value = job.title;
    
    setCustomSelectValue('job-company-select', job.company, document.getElementById('job-company-hidden'));
} else {
    document.getElementById('job-form-title').textContent = 'Post New Job';
    document.getElementById('job-id-input').value = '';
    
    setCustomSelectValue('job-company-select', '', document.getElementById('job-company-hidden'), 'Select a company...');
}
showView('job-form-view');
}

function showApplicantsView(jobId) {
const job = jobs.find(j => j.id === jobId);
if (!job) return;

const jobApplications = applications.filter(app => app.jobId === jobId);
const applicantsDetails = jobApplications.map(app => {
    const seeker = jobSeekers.find(s => s.id === app.seekerId);
    return { ...seeker, appliedOn: app.date };
});

document.getElementById('applicants-page-title').textContent = `Applicants for ${job.title}`;
document.getElementById('applicants-job-title').textContent = job.title;
document.getElementById('applicants-job-count').textContent = `${applicantsDetails.length} applicant(s) found.`;

const tableBody = document.getElementById('applicants-table-body');
if (applicantsDetails.length > 0) {
    tableBody.innerHTML = applicantsDetails
        .map(s => `<tr>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.phone}</td>
            <td>${s.appliedOn}</td>
        </tr>`)
        .join('');
} else {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px;">No applicants found for this job.</td></tr>`;
}
showView('applicants-view');
}

function populateCompanyOptions() {
const optionsContainer = document.querySelector('#job-company-select .custom-select__options');
optionsContainer.innerHTML = companies.map(c => `<li class="custom-select__option" data-value="${c.name}">${c.name}</li>`).join('');
}

// --- CUSTOM SELECT LOGIC ---
function setupCustomSelect(selectId, hiddenInput, callback) {
const selectElement = document.getElementById(selectId);
if (!selectElement) return;
const trigger = selectElement.querySelector('.custom-select__trigger');
const optionsList = selectElement.querySelector('.custom-select__options');

trigger.addEventListener('click', () => selectElement.classList.toggle('open'));

optionsList.addEventListener('click', (e) => {
    if(e.target.classList.contains('custom-select__option')) {
        const option = e.target;
        const selectedValue = option.dataset.value;
        setCustomSelectValue(selectId, selectedValue, hiddenInput);
        selectElement.classList.remove('open');
        if(callback) callback(selectedValue);
    }
});

window.addEventListener('click', (e) => {
    if (!selectElement.contains(e.target)) selectElement.classList.remove('open');
});
}

function setCustomSelectValue(selectId, value, hiddenInput, placeholder = '') {
const selectElement = document.getElementById(selectId);
if (!selectElement) return;
const triggerText = selectElement.querySelector('.custom-select__trigger span');
const options = selectElement.querySelectorAll('.custom-select__option');
let valueSet = false;

hiddenInput.value = value;

options.forEach(option => {
    option.classList.remove('selected');
    if (option.dataset.value === value) {
        option.classList.add('selected');
        triggerText.textContent = option.textContent;
        valueSet = true;
    }
});

if (!valueSet) {
        triggerText.textContent = placeholder || (options[0] ? options[0].textContent : '');
        if (!placeholder) {
            if (options[0]) options[0].classList.add('selected');
            hiddenInput.value = options[0] ? options[0].dataset.value : '';
        }
}
}

// --- SEARCH / FILTER LOGIC ---
seekerSearch.addEventListener('input', () => renderTables());
companySearch.addEventListener('input', () => renderTables());
jobSearch.addEventListener('input', () => renderTables());

// --- RENDER FUNCTIONS ---
function renderDashboardStats() {
document.getElementById('total-seekers').textContent = jobSeekers.length.toLocaleString();
document.getElementById('total-companies').textContent = companies.length.toLocaleString();
document.getElementById('total-jobs').textContent = jobs.length.toLocaleString();
document.getElementById('total-hired').textContent = totalHired.toLocaleString();
}

function renderTables() {
// Filtered tables
const seekerQuery = seekerSearch.value.toLowerCase();
document.getElementById('seekers-table-body').innerHTML = jobSeekers
    .filter(s => s.name.toLowerCase().includes(seekerQuery) || s.email.toLowerCase().includes(seekerQuery))
    .map(s => `<tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.phone}</td>
        <td>${s.joined}</td>
        <td class="action-buttons">
            <button title="Edit" class="edit-btn" data-type="seeker" data-id="${s.id}"><i class="fas fa-edit"></i></button>
            <button title="Delete" class="delete-seeker-btn" data-id="${s.id}"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>`).join('');

const companyQuery = companySearch.value.toLowerCase();
document.getElementById('companies-table-body').innerHTML = companies
    .filter(c => c.name.toLowerCase().includes(companyQuery) || c.industry.toLowerCase().includes(companyQuery))
    .map(c => `<tr>
        <td>${c.name}</td>
        <td>${c.industry}</td>
        <td>${c.location}</td>
        <td>${c.joined}</td>
        <td class="action-buttons">
            <button title="Edit" class="edit-btn" data-type="company" data-id="${c.id}"><i class="fas fa-edit"></i></button>
            <button title="Delete" class="delete-company-btn" data-id="${c.id}"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>`).join('');

const jobQuery = jobSearch.value.toLowerCase();
document.getElementById('jobs-table-body').innerHTML = jobs
    .filter(j => j.title.toLowerCase().includes(jobQuery) || j.company.toLowerCase().includes(jobQuery))
    .map(j => {
        const applicantCount = applications.filter(app => app.jobId === j.id).length;
        return `<tr>
            <td>${j.title}</td>
            <td>${j.company}</td>
            <td>${applicantCount}</td>
            <td class="action-buttons">
                <button title="View Applicants" class="view-applicants-btn" data-id="${j.id}"><i class="fas fa-users"></i></button>
                <button title="Edit" class="edit-btn" data-type="job" data-id="${j.id}"><i class="fas fa-edit"></i></button>
                <button title="Delete" class="delete-job-btn" data-id="${j.id}"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`;
    }).join('');
}

// --- CHART.JS INITIALIZATION ---
function initializeCharts() {
const growthCtx = document.getElementById('growthChart').getContext('2d');
new Chart(growthCtx, { type: 'line', data: { labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], datasets: [{ label: 'New Job Seekers', data: [120, 190, 300, 500, 290, 400], borderColor: 'var(--success-color)', backgroundColor: 'rgba(46, 204, 113, 0.1)', fill: true, tension: 0.3 }, { label: 'New Companies', data: [20, 35, 40, 60, 55, 70], borderColor: 'var(--danger-color)', backgroundColor: 'rgba(231, 76, 60, 0.1)', fill: true, tension: 0.3 }] }, options: { responsive: true, scales: { y: { beginAtZero: true } } } });
}

// --- GLOBAL UPDATE FUNCTION ---
function updateAllUI() {
renderDashboardStats();
renderTables();
}

// --- EVENT LISTENERS ---
document.getElementById('add-seeker-btn').addEventListener('click', () => showSeekerForm());
document.getElementById('add-company-btn').addEventListener('click', () => showCompanyForm());
document.getElementById('add-job-btn').addEventListener('click', () => showJobForm());
document.getElementById('back-to-jobs-btn').addEventListener('click', () => showView('jobs-view'));

document.getElementById('cancel-seeker-form').addEventListener('click', () => showView('seekers-view'));
document.getElementById('cancel-company-form').addEventListener('click', () => showView('companies-view'));
document.getElementById('cancel-job-form').addEventListener('click', () => showView('jobs-view'));

// Form Submissions
document.getElementById('seeker-form').addEventListener('submit', e => {
e.preventDefault();
const id = document.getElementById('seeker-id-input').value;
const seekerData = { name: document.getElementById('seeker-name').value, email: document.getElementById('seeker-email').value, phone: document.getElementById('seeker-phone').value };
if (id) {
    const index = jobSeekers.findIndex(s => s.id == id);
    jobSeekers[index] = { ...jobSeekers[index], ...seekerData };
} else {
    jobSeekers.unshift({ id: Date.now(), ...seekerData, joined: new Date().toISOString().slice(0, 10) });
}
updateAllUI();
showView('seekers-view');
});

document.getElementById('company-form').addEventListener('submit', e => {
e.preventDefault();
const id = document.getElementById('company-id-input').value;
const companyData = { name: document.getElementById('company-name').value, industry: document.getElementById('company-industry').value, location: document.getElementById('company-location').value };
if (id) {
    const index = companies.findIndex(c => c.id == id);
    companies[index] = { ...companies[index], ...companyData };
} else {
    companies.unshift({ id: Date.now(), ...companyData, joined: new Date().toISOString().slice(0, 10) });
}
updateAllUI();
showView('companies-view');
});

document.getElementById('job-form').addEventListener('submit', e => {
e.preventDefault();
const id = document.getElementById('job-id-input').value;
const jobData = { 
    title: document.getElementById('job-title').value, 
    company: document.getElementById('job-company-hidden').value
};
if (id) {
    const index = jobs.findIndex(j => j.id == id);
    jobs[index] = { ...jobs[index], ...jobData };
} else {
    jobs.unshift({ id: Date.now(), ...jobData });
}
updateAllUI();
showView('jobs-view');
});

document.body.addEventListener('click', function(e) {
const btn = e.target.closest('button');
if (!btn) return;

// Edit buttons
if (btn.classList.contains('edit-btn')) {
    const type = btn.dataset.type;
    const id = parseInt(btn.dataset.id, 10);
    if (type === 'seeker') showSeekerForm(id);
    else if (type === 'company') showCompanyForm(id);
    else if (type === 'job') showJobForm(id);
}

// View applicants button
if (btn.classList.contains('view-applicants-btn')) {
    const id = parseInt(btn.dataset.id, 10);
    showApplicantsView(id);
}

// Delete job button
if (btn.classList.contains('delete-job-btn')) {
    const id = parseInt(btn.dataset.id, 10);
    const jobToDelete = jobs.find(j => j.id === id);
    if (confirm(`Are you sure you want to delete the job "${jobToDelete.title}"? This will also remove all associated applicants.`)) {
        jobs = jobs.filter(j => j.id !== id);
        applications = applications.filter(app => app.jobId !== id);
        updateAllUI();
    }
}

// Delete seeker button
if (btn.classList.contains('delete-seeker-btn')) {
    const id = parseInt(btn.dataset.id, 10);
    const seekerToDelete = jobSeekers.find(s => s.id === id);
    if (confirm(`Are you sure you want to delete the job seeker "${seekerToDelete.name}"? This will remove all their applications.`)) {
        jobSeekers = jobSeekers.filter(s => s.id !== id);
        applications = applications.filter(app => app.seekerId !== id);
        updateAllUI();
    }
}

// Delete company button
if (btn.classList.contains('delete-company-btn')) {
    const id = parseInt(btn.dataset.id, 10);
    const companyToDelete = companies.find(c => c.id === id);
    if (confirm(`Are you sure you want to delete the company "${companyToDelete.name}"? This will remove all associated jobs and their applications.`)) {
        const jobsFromCompany = jobs.filter(j => j.company === companyToDelete.name);
        const jobIdsFromCompany = jobsFromCompany.map(j => j.id);
        
        applications = applications.filter(app => !jobIdsFromCompany.includes(app.jobId));
        jobs = jobs.filter(j => j.company !== companyToDelete.name);
        companies = companies.filter(c => c.id !== id);
        updateAllUI();
    }
}
});

// --- INITIAL LOAD ---
updateAllUI();
initializeCharts();
setupCustomSelect('job-company-select', document.getElementById('job-company-hidden'));
});
