/**
 * Clean Laundry Landing Page — Scripts
 *
 * Features:
 *  1. Mobile hamburger menu toggle
 *  2. Sticky navbar background on scroll
 *  3. Active nav link highlighting on scroll
 *  4. Scroll-reveal animations via IntersectionObserver
 *  5. Contact form UX feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ================================================
       1. MOBILE MENU TOGGLE
    ================================================ */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle.querySelector('.material-icons-round');
    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;

        if (menuOpen) {
            mobileMenu.classList.remove('hidden');
            menuIcon.textContent = 'close';
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.textContent = 'menu';
        }
    });

    // Close menu on mobile link click
    document.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => {
            menuOpen = false;
            mobileMenu.classList.add('hidden');
            menuIcon.textContent = 'menu';
        });
    });

    /* ================================================
       2. STICKY NAVBAR BACKGROUND
    ================================================ */
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    /* ================================================
       3. ACTIVE NAV LINK HIGHLIGHTING
    ================================================ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    /* ================================================
       4. SCROLL-REVEAL ANIMATIONS
    ================================================ */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    /* ================================================
       5. CONTACT FORM UX FEEDBACK
    ================================================ */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = `
        <span class="material-icons-round text-xl animate-spin">progress_activity</span>
        Sending...
      `;
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = `
          <span class="material-icons-round text-xl">check_circle</span>
          Message Sent!
        `;
                submitBtn.classList.remove('bg-primary', 'hover:bg-orange-500');
                submitBtn.classList.add('bg-green-500');

                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-green-500');
                    submitBtn.classList.add('bg-primary', 'hover:bg-orange-500');
                    contactForm.reset();
                }, 2500);
            }, 1500);
        });
    }
});
