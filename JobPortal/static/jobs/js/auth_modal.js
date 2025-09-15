document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.main-header .nav-btn'); // Your existing Login button
    const authModalOverlay = document.getElementById('authModalOverlay');
    const authModalCloseBtn = document.getElementById('authModalCloseBtn');
    const loginView = document.getElementById('loginView');
    const registerView = document.getElementById('registerView');
    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');

    // Function to open the modal
    function openAuthModal() {
        authModalOverlay.classList.add('active');
        loginView.classList.add('active'); // Show login form by default
        registerView.classList.remove('active'); // Ensure registration is hidden
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
    }

    // Function to close the modal
    function closeAuthModal() {
        authModalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
    }

    // Function to switch between login and registration forms
    function showForm(formId) {
        if (formId === 'login') {
            loginView.classList.add('active');
            registerView.classList.remove('active');
        } else if (formId === 'register') {
            registerView.classList.add('active');
            loginView.classList.remove('active');
        }
    }

    // Event Listeners
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            openAuthModal();
        });
    }

    if (authModalCloseBtn) {
        authModalCloseBtn.addEventListener('click', closeAuthModal);
    }

    // Close modal if clicking outside the content box
    if (authModalOverlay) {
        authModalOverlay.addEventListener('click', function(e) {
            if (e.target === authModalOverlay) {
                closeAuthModal();
            }
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForm('register');
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForm('login');
        });
    }

    // Optional: Add form submission handling (client-side validation/AJAX for Django)
    // For now, these just log to console
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted!');
            // Here you would typically send data to your Django login view via AJAX
            // Or, if not using AJAX, the form would submit normally and Django would handle the redirect
            closeAuthModal(); // Close modal after simulated submission
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Register form submitted!');
            // Here you would typically send data to your Django registration view via AJAX
            // Or, if not using AJAX, the form would submit normally
            closeAuthModal(); // Close modal after simulated submission
        });
    }
});