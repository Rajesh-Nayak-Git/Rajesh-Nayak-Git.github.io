/* ==========================================================================
   Dr. Rajesh Nayak - Academic Portfolio Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initActiveNavOnScroll();
    initScrollReveal();
    initPublicationsFilter();
    initSkillsAnimation();
    initContactForm();
});

/**
 * Theme Toggle (Light / Dark Mode)
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Retrieve stored theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    let currentTheme = savedTheme || (systemPrefersDark.matches ? 'dark' : 'light');
    
    // Apply initial theme
    document.body.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    // Toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        updateToggleIcon(currentTheme);
    });

    // Listen for system theme changes if no override is saved
    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            updateToggleIcon(newTheme);
        }
    });
}

function updateToggleIcon(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    if (theme === 'dark') {
        // Show sun icon
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-label="Switch to light mode">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
        `;
    } else {
        // Show moon icon
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-label="Switch to dark mode">
                <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-9 8.3-9.9.5-.1 1 .3.9.8-.1.4-.4.8-.8 1-3.6 1.6-6 5.2-6 9.1 0 4.9 4 8.9 8.9 8.9 3.9 0 7.5-2.4 9.1-6 .2-.4.6-.7 1-.8.5 0 1 .4.8.9-.9 4.8-5.1 8-9.8 8z"/>
            </svg>
        `;
    }
}

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', (e) => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        menuBtn.innerHTML = isActive ? '&#x2715;' : '&#x2630;'; // X mark or Hamburger
        e.stopPropagation();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '&#x2630;';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '&#x2630;';
        }
    });
}

/**
 * Active Navigation Link Tracker on Scroll
 */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animating once to clean up
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Bibliography Filter (Publications)
 */
function initPublicationsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pubItems = document.querySelectorAll('.pub-item');
    
    if (filterButtons.length === 0 || pubItems.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');

            pubItems.forEach(item => {
                const itemType = item.getAttribute('data-type');
                
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    // Retrigger animation
                    item.style.opacity = '1';
                } else if (itemType === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Skills Progress Bars Animation
 */
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-bar-fill');
    
    if (!skillsSection || progressBars.length === 0) return;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    skillsObserver.observe(skillsSection);
}

/**
 * Mock Contact Form Submission Handler
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }

        // Show mock sending status
        showStatus('Sending message...', 'info');

        // Simulate network request
        setTimeout(() => {
            contactForm.reset();
            showStatus('Thank you! Your message has been sent successfully. Dr. Rajesh will get back to you shortly.', 'success');
        }, 1500);
    });

    function showStatus(text, type) {
        if (!formStatus) return;
        formStatus.textContent = text;
        formStatus.className = 'form-status ' + type;
    }
}
