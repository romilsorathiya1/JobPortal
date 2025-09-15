
// --- MOBILE MENU ---
const menuToggle = document.getElementById('mobile-menu');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => mainNav.classList.toggle('active'));

// --- HERO SLIDER ---
const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;
const nextSlide = () => {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
};
setInterval(nextSlide, 5000);

// --- CUSTOM SELECT DROPDOWN ---
const selectWrapper = document.querySelector('.custom-select-wrapper');
if (selectWrapper) {
    const selectedDisplay = selectWrapper.querySelector('.select-selected');
    const optionsContainer = selectWrapper.querySelector('.select-items');
    const options = ['Fresher', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10 Years', '10+ Years'];

    options.forEach(optionText => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = optionText;
        // ===== JAVASCRIPT FIX: Corrected syntax from "(). {" to "() => {" =====
        optionDiv.addEventListener('click', () => {
            selectedDisplay.textContent = optionText;
            optionsContainer.style.display = 'none';
            optionsContainer.querySelectorAll('div').forEach(opt => opt.classList.remove('same-as-selected'));
            optionDiv.classList.add('same-as-selected');
        });
        optionsContainer.appendChild(optionDiv);
    });

    selectedDisplay.addEventListener('click', e => {
        e.stopPropagation();
        optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', e => {
        if (!selectWrapper.contains(e.target)) {
            optionsContainer.style.display = 'none';
        }
    });
}

// --- TESTIMONIAL SLIDER ---
const testimonialSlides = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.testimonial-dots');
let currentTestimonial = 0;
let testimonialInterval;

function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = ''; // Clear existing dots
    testimonialSlides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            showTestimonial(i);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    if (dots.length === 0) return;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
    });
}

function showTestimonial(index) {
    if (testimonialSlides.length === 0) return;
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    currentTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides[currentTestimonial].classList.add('active');
    updateDots();
}

function resetInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 4000);
}

if (testimonialSlides.length > 0) {
    createDots();
    const nextBtn = document.getElementById('next-testimonial');
    const prevBtn = document.getElementById('prev-testimonial');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
            resetInterval();
        });
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
            resetInterval();
        });
    }
    resetInterval(); // Start the automatic slide
}
