
// --- MOBILE MENU ---
const menuToggle = document.getElementById('mobile-menu');
const mainNav = document.querySelector('.main-nav');
if (menuToggle) {
    menuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));
}

// --- ANIMATED COUNTER FOR STATS ---
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // The lower the number, the faster the count

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target.toLocaleString(); // Add commas for larger numbers
        }
    };
    updateCount();
};

// --- INTERSECTION OBSERVER TO TRIGGER COUNTER ---
// This makes the counter start only when the user scrolls to it
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Starts when 50% of the element is visible

counters.forEach(counter => {
    observer.observe(counter);
});

