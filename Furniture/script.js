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

    // --- 2. MOBILE MENU LOGIC (FIXED) ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    // Function to toggle menu state
    const toggleMenu = () => {
        mobileMenu.classList.toggle('open');
        if (mobileMenu.classList.contains('open')) {
            // Switch to 'X' icon
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
        } else {
            // Switch back to hamburger icon
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>`;
        }
    };

    if (menuBtn && mobileMenu) {
        // Toggle when button is clicked
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from bubbling up
            toggleMenu();
        });

        // Close menu if a link inside it is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
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
});