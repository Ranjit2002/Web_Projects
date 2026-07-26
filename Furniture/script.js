document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CAROUSEL LOGIC ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        const updateSlider = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => {
                dot.classList.remove('bg-white', 'shadow-[0_0_15px_rgba(255,255,255,0.8)]');
                dot.classList.add('bg-white/30');
            });
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

        if(nextBtn) nextBtn.addEventListener('click', nextSlide);
        if(prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider(currentSlide);
                resetInterval();
            });
        });

        const startInterval = () => { slideInterval = setInterval(nextSlide, 6000); };
        const resetInterval = () => { clearInterval(slideInterval); startInterval(); };
        startInterval();
    }

    // --- 2. MOBILE MENU LOGIC ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    // Ensure the menu is hidden by default when the page loads
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }

    if (menuBtn && mobileMenu) {
        // Toggle menu visibility on hamburger click
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from bubbling
            
            // Toggle the Tailwind 'hidden' class
            mobileMenu.classList.toggle('hidden');
            
            // Swap the SVG Icon based on visibility
            if (mobileMenu.classList.contains('hidden')) {
                // Show Hamburger Icon
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>`;
            } else {
                // Show 'X' Icon
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
            }
        });

        // Auto-close menu when any link inside it is clicked
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>`;
            });
        });
    }

    // --- 3. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // --- 4. DARK/LIGHT MODE LOGIC ---
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const darkIcons = document.querySelectorAll('.theme-toggle-dark-icon');
    const lightIcons = document.querySelectorAll('.theme-toggle-light-icon');

    const setTheme = (isLight) => {
        if (isLight) {
            document.body.classList.add('light-mode');
            lightIcons.forEach(icon => icon.classList.remove('hidden'));
            darkIcons.forEach(icon => icon.classList.add('hidden'));
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            lightIcons.forEach(icon => icon.classList.add('hidden'));
            darkIcons.forEach(icon => icon.classList.remove('hidden'));
            localStorage.setItem('theme', 'dark');
        }
    };

    // Check localStorage on load
    if (localStorage.getItem('theme') === 'light') {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Toggle events
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const currentlyLight = document.body.classList.contains('light-mode');
            setTheme(!currentlyLight);
        });
    });

    // --- 5. EMAILJS CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Initialize EmailJS 
        emailjs.init("S2p2mt3IfnLxunPQH");

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent standard page reload

            const submitBtn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const btnIcon = document.getElementById('btn-icon');

            // Set UI to "Loading" state
            const originalText = btnText.innerText;
            btnText.innerText = "SENDING...";
            btnIcon.classList.add('animate-spin'); 
            btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>`; // Refresh icon
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed', 'pointer-events-none');
            submitBtn.classList.remove('hover:-translate-y-1');

            // Send via EmailJS
            emailjs.sendForm('service_172d0i5', 'template_3y1zzwl', this)
                .then(() => {
                    // Success UI
                    btnText.innerText = "MESSAGE SENT!";
                    btnIcon.classList.remove('animate-spin');
                    btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>`; // Checkmark icon
                    
                    // Clear the form fields
                    contactForm.reset(); 

                    // Reset button back to normal after 4 seconds
                    setTimeout(() => {
                        btnText.innerText = originalText;
                        btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>`; // Original arrow
                        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'pointer-events-none');
                        submitBtn.classList.add('hover:-translate-y-1');
                    }, 4000);

                }, (error) => {
                    console.log('FAILED...', error);
                    // Error UI
                    btnText.innerText = "ERROR! TRY AGAIN.";
                    btnIcon.classList.remove('animate-spin');
                    btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`; // X icon
                    
                    setTimeout(() => {
                        btnText.innerText = originalText;
                        btnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>`;
                        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'pointer-events-none');
                        submitBtn.classList.add('hover:-translate-y-1');
                    }, 4000);
                });
        });
    }
});