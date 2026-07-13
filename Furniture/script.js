document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Function to update the active slide and dot
    const updateSlider = (index) => {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('bg-white', 'shadow-[0_0_15px_rgba(255,255,255,0.8)]');
            dot.classList.add('bg-white/30');
        });

        // Add active class to current
        slides[index].classList.add('active');
        dots[index].classList.remove('bg-white/30');
        dots[index].classList.add('bg-white', 'shadow-[0_0_15px_rgba(255,255,255,0.8)]');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider(currentSlide);
        resetInterval();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider(currentSlide);
        resetInterval();
    };

    // Event Listeners for arrows
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event Listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider(currentSlide);
            resetInterval();
        });
    });

    // Auto-play functionality
    const startInterval = () => {
        slideInterval = setInterval(nextSlide, 6000); 
    };

    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Initialize auto-play
    startInterval();
    
    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('bg-gray-900/40');
            navbar.classList.add('bg-gray-900/90', 'shadow-lg');
        } else {
            navbar.classList.add('bg-gray-900/40');
            navbar.classList.remove('bg-gray-900/90', 'shadow-lg');
        }
    });
});