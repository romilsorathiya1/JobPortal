
// --- MOBILE MENU ---
const menuToggle = document.getElementById('mobile-menu');
const mainNav = document.querySelector('.main-nav');
if (menuToggle) {
    menuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
}

// --- NEW: FAQ ACCORDION SCRIPT ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;

        item.classList.toggle('active');
    });
});
