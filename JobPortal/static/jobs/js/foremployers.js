
document.addEventListener('DOMContentLoaded', function() {
    // --- DATA SIMULATION ---
    let jobs = [
        { id: 1, title: "Senior Frontend Developer", posted: "Aug 15, 2025", status: "Active", views: 1204 },
        { id: 2, title: "UX/UI Designer", posted: "Aug 10, 2025", status: "Active", views: 856 },
        { id: 3, title: "Project Manager", posted: "Jul 28, 2025", status: "Closed", views: 2510 },
        { id: 4, title: "Backend Engineer", posted: "Aug 18, 2025", status: "Active", views: 530 }
    ];
    let applicants = [
        { id: 101, name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?u=priya", appliedForJobId: 1, date: "Aug 20, 2025", status: "Applied" },
        { id: 102, name: "Anjali Singh", avatar: "https://i.pravatar.cc/150?u=anjali", appliedForJobId: 1, date: "Aug 19, 2025", status: "Shortlisted" },
        { id: 103, name: "Rohan Patel", avatar: "https://i.pravatar.cc/150?u=rohan", appliedForJobId: 2, date: "Aug 18, 2025", status: "Applied" },
        { id: 104, name: "Sameer Khan", avatar: "https://i.pravatar.cc/150?u=sameer", appliedForJobId: 3, date: "Aug 01, 2025", status: "Hired" },
        { id: 105, name: "Neha Desai", avatar: "https://i.pravatar.cc/150?u=neha", appliedForJobId: 2, date: "Aug 15, 2025", status: "Rejected" },
        { id: 106, name: "Vikram Rathod", avatar: "https://i.pravatar.cc/150?u=vikram", appliedForJobId: 1, date: "Aug 21, 2025", status: "Applied" },
        { id: 107, name: "Aditi Joshi", avatar: "https://i.pravatar.cc/150?u=aditi", appliedForJobId: 4, date: "Aug 22, 2025", status: "Shortlisted" }
    ];

    // --- STATE MANAGEMENT ---
    let currentAllApplicantsFilter = 'All';
    let currentSelectedApplicantsFilter = 'All';
    let currentJobIdForView = null;

    // --- UI ELEMENTS ---
    const views = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    const jobForm = document.getElementById('job-form');
    // NEW: Mobile Sidebar Elements
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const dashboardSidebar = document.getElementById('dashboard-sidebar');
    const dashboardOverlay = document.getElementById('dashboard-overlay');
    
    // --- VIEW NAVIGATION LOGIC ---
    function showView(viewId) {
        if (viewId !== 'applicants-view') {
            currentJobIdForView = null;
        }

        views.forEach(view => view.classList.remove('active'));
        const viewToShow = document.getElementById(viewId);
        if(viewToShow) viewToShow.classList.add('active');

        const isJobFormView = viewId === 'job-form-view';
        navLinks.forEach(link => {
            const isApplicantsView = viewId === 'applicants-view' && link.dataset.view === 'jobs-view';
            let isActive = link.dataset.view === viewId || isApplicantsView || (isJobFormView && link.dataset.view === 'jobs-view');
            link.classList.toggle('active', isActive);
        });

        // NEW: Close sidebar on navigation
        if (dashboardSidebar.classList.contains('active')) {
            toggleSidebar();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showView(link.dataset.view);
        });
    });

    // --- DATA & RENDERING ---
    function updateDashboardStats() {
        document.getElementById('stat-active-jobs').textContent = jobs.filter(j => j.status === 'Active').length;
        document.getElementById('stat-total-applicants').textContent = applicants.length;
        document.getElementById('stat-pending-review').textContent = applicants.filter(a => a.status === 'Applied').length;
        document.getElementById('stat-selected').textContent = applicants.filter(a => a.status === 'Shortlisted').length;
        document.getElementById('stat-rejected').textContent = applicants.filter(a => a.status === 'Rejected').length;
        document.getElementById('stat-hired').textContent = applicants.filter(a => a.status === 'Hired').length;
    }

    function renderJobs() {
        const jobsTableBody = document.getElementById('jobs-table-body');
        let html = `<thead><tr><th>Job Title</th><th>Status</th><th>Views</th><th>Applicants</th><th>Actions</th></tr></thead><tbody>`;
        jobs.forEach(job => {
            const applicantCount = applicants.filter(a => a.appliedForJobId === job.id).length;
            html += `
                <tr>
                    <td>
                        <div style="font-weight: 600;">${job.title}</div>
                        <div style="font-size: 0.9rem; color: var(--text-light-color);">Posted on ${job.posted}</div>
                    </td>
                    <td><span class="status-tag ${job.status === 'Active' ? 'status-active' : 'status-closed'}">${job.status}</span></td>
                    <td>${job.views.toLocaleString()}</td>
                    <td style="text-align: center;">${applicantCount}</td>
                    <td class="action-buttons">
                        <button class="view-applicants-btn" data-job-id="${job.id}" title="View Applicants"><i class="fas fa-users"></i></button>
                        <button class="edit-job-btn" data-job-id="${job.id}" title="Edit Job"><i class="fas fa-edit"></i></button>
                        <!-- UPDATED: Added class and data-attribute -->
                        <button class="delete-btn delete-job-btn" data-job-id="${job.id}" title="Delete Job"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>`;
        });
        html += `</tbody>`;
        jobsTableBody.innerHTML = html;
    }
    
    function renderAllApplicants(statusFilter = 'All') {
        currentAllApplicantsFilter = statusFilter;
        const allApplicantsTableBody = document.getElementById('all-applicants-table-body');
        let filteredApplicants = [...applicants];
        if (statusFilter !== 'All') {
            filteredApplicants = filteredApplicants.filter(applicant => applicant.status === statusFilter);
        }
        filteredApplicants.sort((a, b) => new Date(b.date) - new Date(a.date));
        let html = `<thead><tr><th>Candidate Name</th><th>Applied For</th><th>Applied On</th><th>Status</th><th>Actions</th></tr></thead><tbody>`;
        if (filteredApplicants.length > 0) {
            filteredApplicants.forEach(applicant => {
                const job = jobs.find(j => j.id === applicant.appliedForJobId);
                
                const isShortlisted = ['Shortlisted', 'Hired'].includes(applicant.status);
                const isRejected = applicant.status === 'Rejected';
                const isHired = applicant.status === 'Hired';

                const shortlistBtnClass = isShortlisted ? 'active' : '';
                const rejectBtnClass = isRejected ? 'active' : '';
                const hireBtnClass = isHired ? 'active' : '';
                
                const shortlistBtnTitle = isShortlisted ? 'Shortlisted' : 'Shortlist';
                const rejectBtnTitle = isRejected ? 'Rejected' : 'Reject';
                const hireBtnTitle = isHired ? 'Hired' : 'Mark as Hired';

                html += `
                    <tr>
                        <td>
                            <div class="applicant-info">
                                <img src="${applicant.avatar}" alt="${applicant.name}" class="applicant-avatar">
                                <div>
                                    <div style="font-weight: 600;">${applicant.name}</div>
                                    <a href="#" style="font-size: 0.9rem; color: var(--secondary-color);">View Resume</a>
                                </div>
                            </div>
                        </td>
                        <td>${job ? job.title : 'N/A'}</td>
                        <td>${applicant.date}</td>
                        <td>${applicant.status}</td>
                        <td class="action-buttons">
                            <button class="shortlist-btn ${shortlistBtnClass}" data-applicant-id="${applicant.id}" title="${shortlistBtnTitle}"><i class="fas fa-check-circle"></i></button>
                            <button class="reject-btn ${rejectBtnClass}" data-applicant-id="${applicant.id}" title="${rejectBtnTitle}"><i class="fas fa-times-circle"></i></button>
                            <button class="hire-btn ${hireBtnClass}" data-applicant-id="${applicant.id}" title="${hireBtnTitle}"><i class="fas fa-award"></i></button>
                        </td>
                    </tr>`;
            });
        } else {
                html += `<tr><td colspan="5" style="text-align:center; padding: 30px;">No applicants found with this status.</td></tr>`;
        }
        html += `</tbody>`;
        allApplicantsTableBody.innerHTML = html;
    }

    function renderApplicantsForJob(jobId) {
        currentJobIdForView = jobId;
        const applicantsTableBody = document.getElementById('applicants-table-body');
        const applicantsJobTitle = document.getElementById('applicants-job-title');
        const applicantsJobCount = document.getElementById('applicants-job-count');
        const job = jobs.find(j => j.id === jobId);
        const jobApplicants = applicants
            .filter(a => a.appliedForJobId === jobId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        applicantsJobTitle.textContent = `Applicants for "${job.title}"`;
        applicantsJobCount.textContent = `${jobApplicants.length} candidate(s) found.`;
        let html = `<thead><tr><th>Candidate Name</th><th>Applied On</th><th>Status</th><th>Actions</th></tr></thead><tbody>`;
        if (jobApplicants.length > 0) {
            jobApplicants.forEach(applicant => {
                const isShortlisted = ['Shortlisted', 'Hired'].includes(applicant.status);
                const isRejected = applicant.status === 'Rejected';
                const isHired = applicant.status === 'Hired';

                const shortlistBtnClass = isShortlisted ? 'active' : '';
                const rejectBtnClass = isRejected ? 'active' : '';
                const hireBtnClass = isHired ? 'active' : '';
                
                const shortlistBtnTitle = isShortlisted ? 'Shortlisted' : 'Shortlist';
                const rejectBtnTitle = isRejected ? 'Rejected' : 'Reject';
                const hireBtnTitle = isHired ? 'Hired' : 'Mark as Hired';

                html += `
                    <tr>
                        <td>
                            <div class="applicant-info">
                                <img src="${applicant.avatar}" alt="${applicant.name}" class="applicant-avatar">
                                <div>
                                    <div style="font-weight: 600;">${applicant.name}</div>
                                    <a href="#" style="font-size: 0.9rem; color: var(--secondary-color);">View Resume</a>
                                </div>
                            </div>
                        </td>
                        <td>${applicant.date}</td>
                        <td>${applicant.status}</td>
                        <td class="action-buttons">
                                <button class="shortlist-btn ${shortlistBtnClass}" data-applicant-id="${applicant.id}" title="${shortlistBtnTitle}"><i class="fas fa-check-circle"></i></button>
                                <button class="reject-btn ${rejectBtnClass}" data-applicant-id="${applicant.id}" title="${rejectBtnTitle}"><i class="fas fa-times-circle"></i></button>
                                <button class="hire-btn ${hireBtnClass}" data-applicant-id="${applicant.id}" title="${hireBtnTitle}"><i class="fas fa-award"></i></button>
                        </td>
                    </tr>`;
            });
        } else {
            html += `<tr><td colspan="4" style="text-align:center; padding: 30px;">No applicants yet for this position.</td></tr>`;
        }
        html += `</tbody>`;
        applicantsTableBody.innerHTML = html;
        showView('applicants-view');
    }

    function renderFilteredApplicants(statusList, tableId) {
        const tableBody = document.getElementById(tableId);
        const filteredApplicants = applicants
            .filter(applicant => statusList.includes(applicant.status))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        let html = `<thead><tr><th>Candidate Name</th><th>Applied For</th><th>Applied On</th><th>Status</th></tr></thead><tbody>`;
        if (filteredApplicants.length > 0) {
            filteredApplicants.forEach(applicant => {
                const job = jobs.find(j => j.id === applicant.appliedForJobId);
                html += `
                    <tr>
                        <td>
                            <div class="applicant-info">
                                <img src="${applicant.avatar}" alt="${applicant.name}" class="applicant-avatar">
                                <div>
                                    <div style="font-weight: 600;">${applicant.name}</div>
                                    <a href="#" style="font-size: 0.9rem; color: var(--secondary-color);">View Resume</a>
                                </div>
                            </div>
                        </td>
                        <td>${job ? job.title : 'N/A'}</td>
                        <td>${applicant.date}</td>
                        <td>${applicant.status}</td>
                    </tr>`;
            });
        } else {
                html += `<tr><td colspan="4" style="text-align:center; padding: 30px;">No applicants found in this category.</td></tr>`;
        }
        html += `</tbody>`;
        tableBody.innerHTML = html;
    }

    function renderSelectedApplicants(statusFilter = 'All') {
        currentSelectedApplicantsFilter = statusFilter;
        let baseStatuses = ['Shortlisted', 'Hired'];
            if (statusFilter !== 'All') {
            baseStatuses = [statusFilter];
        }
        renderFilteredApplicants(baseStatuses, 'selected-applicants-table-body');
    }

        // --- CUSTOM SELECT DROPDOWN LOGIC ---
    function setupCustomSelect(selectId, callback) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) return;
        const trigger = selectElement.querySelector('.custom-select__trigger');
        const options = selectElement.querySelectorAll('.custom-select__option');
        const triggerText = trigger.querySelector('span');
        trigger.addEventListener('click', () => selectElement.classList.toggle('open'));
        options.forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.dataset.value;
                triggerText.textContent = option.textContent;
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectElement.classList.remove('open');
                if(callback) callback(selectedValue);
            });
        });
    }

    function setCustomSelectValue(selectId, value) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) return;
        const triggerText = selectElement.querySelector('.custom-select__trigger span');
        const options = selectElement.querySelectorAll('.custom-select__option');
        let valueSet = false;
        options.forEach(option => {
            if (option.dataset.value === value) {
                option.classList.add('selected');
                triggerText.textContent = option.textContent;
                valueSet = true;
            } else {
                option.classList.remove('selected');
            }
        });
        if (!valueSet && options.length > 0) {
            options[0].classList.add('selected');
            triggerText.textContent = options[0].textContent;
        }
    }


    // --- JOB FORM LOGIC ---
    function showJobForm(jobId = null) {
        jobForm.reset();
        const formTitle = document.getElementById('job-form-title');
        const jobIdInput = document.getElementById('job-id-input');
        if (jobId) {
            const job = jobs.find(j => j.id === jobId);
            if (job) {
                formTitle.textContent = 'Edit Job Listing';
                jobIdInput.value = job.id;
                document.getElementById('job-title').value = job.title;
                document.getElementById('job-status').value = job.status;
                setCustomSelectValue('job-status-select', job.status);
            }
        } else {
            formTitle.textContent = 'Post a New Job';
            jobIdInput.value = '';
            document.getElementById('job-status').value = 'Active';
            setCustomSelectValue('job-status-select', 'Active');
        }
        showView('job-form-view');
    }

    function handleJobFormSubmit(e) {
        e.preventDefault();
        const jobId = document.getElementById('job-id-input').value;
        const jobTitle = document.getElementById('job-title').value;
        const jobStatus = document.getElementById('job-status').value;
        if (jobId) {
            const jobIndex = jobs.findIndex(j => j.id == jobId);
            if (jobIndex > -1) {
                jobs[jobIndex].title = jobTitle;
                jobs[jobIndex].status = jobStatus;
            }
        } else {
            const newJob = {
                id: Date.now(),
                title: jobTitle,
                status: jobStatus,
                posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                views: 0
            };
            jobs.push(newJob);
        }
        renderJobs();
        showView('jobs-view');
    }
    
    // --- UNIVERSAL REFRESH FUNCTION ---
    function refreshAllViews() {
        updateDashboardStats();
        renderJobs();
        renderAllApplicants(currentAllApplicantsFilter);
        renderSelectedApplicants(currentSelectedApplicantsFilter);
        renderFilteredApplicants(['Rejected'], 'rejected-applicants-table-body');
        if(currentJobIdForView) {
            renderApplicantsForJob(currentJobIdForView);
        }
    }

    // --- APPLICANT STATUS UPDATE LOGIC ---
    function updateApplicantStatus(applicantId, newStatus) {
        const applicantIndex = applicants.findIndex(a => a.id == applicantId);
        if (applicantIndex > -1) {
            applicants[applicantIndex].status = newStatus;
            refreshAllViews();
        }
    }

    // NEW: Delete Job Function
    function deleteJob(jobId) {
        // Filter out the job to be deleted
        jobs = jobs.filter(j => j.id !== jobId);
        // Also filter out any applicants for that job
        applicants = applicants.filter(a => a.appliedForJobId !== jobId);
        // Refresh all views to reflect the changes
        refreshAllViews();
    }

    // NEW: Mobile Sidebar Toggle Function
    function toggleSidebar() {
        dashboardSidebar.classList.toggle('active');
        dashboardOverlay.classList.toggle('active');
    }

    // --- EVENT LISTENERS ---
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
    }

    // NEW: Listeners for mobile sidebar
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
    if (dashboardOverlay) dashboardOverlay.addEventListener('click', toggleSidebar);

    document.body.addEventListener('click', function(e) {
        const shortlistBtn = e.target.closest('.shortlist-btn');
        const rejectBtn = e.target.closest('.reject-btn');
        const hireBtn = e.target.closest('.hire-btn');
        const viewApplicantsBtn = e.target.closest('.view-applicants-btn');
        const editJobBtn = e.target.closest('.edit-job-btn');
        // NEW: Delete Job Button Listener
        const deleteJobBtn = e.target.closest('.delete-job-btn');
        
        if (shortlistBtn) {
            const applicantId = shortlistBtn.dataset.applicantId;
            updateApplicantStatus(applicantId, 'Shortlisted');
        }
        if (rejectBtn) {
            const applicantId = rejectBtn.dataset.applicantId;
            updateApplicantStatus(applicantId, 'Rejected');
        }
            if (hireBtn) {
            const applicantId = hireBtn.dataset.applicantId;
            updateApplicantStatus(applicantId, 'Hired');
        }

        if (viewApplicantsBtn) {
            const jobId = parseInt(viewApplicantsBtn.dataset.jobId, 10);
            renderApplicantsForJob(jobId);
        }
            if (editJobBtn) {
            const jobId = parseInt(editJobBtn.dataset.jobId, 10);
            showJobForm(jobId);
        }
        // NEW: Handle Job Deletion
        if (deleteJobBtn) {
            const jobId = parseInt(deleteJobBtn.dataset.jobId, 10);
            const job = jobs.find(j => j.id === jobId);
            if (confirm(`Are you sure you want to delete the job "${job.title}"?\nThis will also remove all its applicants.`)) {
                deleteJob(jobId);
            }
        }
    });
    
    document.getElementById('post-job-btn').addEventListener('click', () => showJobForm());
    document.getElementById('cancel-job-form').addEventListener('click', () => showView('jobs-view'));
    jobForm.addEventListener('submit', handleJobFormSubmit);

    const backToJobsBtn = document.getElementById('back-to-jobs-btn');
    if(backToJobsBtn) {
        backToJobsBtn.addEventListener('click', () => showView('jobs-view'));
    }

    window.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-select').forEach(select => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    });
    
    // --- CHART.JS INITIALIZATION ---
    const ctx = document.getElementById('applicationChart');
    if(ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Applications',
                    data: [65, 59, 80, 81, 56, 55, 40, 90, 110, 75, 95, 120],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: { scales: { y: { beginAtZero: true } }, responsive: true, plugins: { legend: { display: false } } }
        });
    }

    // --- INITIAL LOAD ---
    updateDashboardStats();
    renderJobs();
    renderAllApplicants();
    renderSelectedApplicants();
    renderFilteredApplicants(['Rejected'], 'rejected-applicants-table-body');
    
    setupCustomSelect('all-applicants-filter', renderAllApplicants);
    setupCustomSelect('selected-applicants-filter', renderSelectedApplicants);
    setupCustomSelect('job-status-select', (value) => {
        document.getElementById('job-status').value = value;
    });

    showView('dashboard-view');
});
