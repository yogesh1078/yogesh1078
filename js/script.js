// Navigation functionality and interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    // Close mobile menu when clicking on a link
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Smooth scrolling for navigation links
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        closeMobileMenu();
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150; // Offset for fixed navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Enhanced hover effects for navigation links
    function enhanceNavLinkHover() {
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.textShadow = '0 2px 4px rgba(0, 123, 255, 0.3)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.textShadow = '';
            });
        });
    }

    // Form submission handling
    function handleFormSubmission() {
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const message = this.querySelector('textarea').value;

                // Basic validation
                if (!name || !email || !message) {
                    alert('Please fill in all fields.');
                    return;
                }

                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
        }
    }

    // Scroll animations for elements
    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .feature');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Parallax effect for hero section
    function addParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }
    }

    // Add typing effect to hero title
    function addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid #fff';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Navbar background blur effect on scroll
    function addNavbarBlurEffect() {
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.min(window.scrollY / 300, 1);
            const blurAmount = scrollPercent * 10;
            const opacity = 0.9 + (scrollPercent * 0.1);
            
            navbar.style.backdropFilter = `blur(${blurAmount}px)`;
            navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        });
    }

    // Event listeners
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', updateActiveNavLink);
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Add smooth scroll to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Initialize features
    enhanceNavLinkHover();
    handleFormSubmission();
    animateOnScroll();
    addParallaxEffect();
    addNavbarBlurEffect();

    // Add typing effect after a delay
    setTimeout(addTypingEffect, 500);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Add resize handler to close mobile menu on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #007bff !important;
            background: rgba(0, 123, 255, 0.1) !important;
        }
        
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 2px;
            background: #007bff;
        }
    `;
    document.head.appendChild(style);

    // Initial call to set active nav link
    updateActiveNavLink();
});