// Alamance Farmers' Mutual Insurance - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--color-surface)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    }

    // Throttled scroll handler
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu functionality
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav__menu');
    
    // Create mobile menu toggle button
    function createMobileMenuToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'nav__toggle';
        toggleButton.innerHTML = `
            <span class="nav__toggle-line"></span>
            <span class="nav__toggle-line"></span>
            <span class="nav__toggle-line"></span>
        `;
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Add styles for the toggle button
        const style = document.createElement('style');
        style.textContent = `
            .nav__toggle {
                display: none;
                flex-direction: column;
                background: none;
                border: none;
                cursor: pointer;
                padding: var(--space-8);
                gap: 4px;
            }
            
            .nav__toggle-line {
                width: 24px;
                height: 2px;
                background-color: var(--color-text);
                transition: all 0.3s ease;
            }
            
            .nav__toggle.active .nav__toggle-line:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }
            
            .nav__toggle.active .nav__toggle-line:nth-child(2) {
                opacity: 0;
            }
            
            .nav__toggle.active .nav__toggle-line:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }
            
            @media (max-width: 768px) {
                .nav__toggle {
                    display: flex;
                }
                
                .nav__menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: var(--color-surface);
                    border-top: 1px solid var(--color-border);
                    box-shadow: var(--shadow-lg);
                    flex-direction: column;
                    padding: var(--space-16);
                    gap: var(--space-16);
                }
                
                .nav__menu.active {
                    display: flex;
                }
                
                .nav {
                    position: relative;
                }
            }
        `;
        document.head.appendChild(style);
        
        return toggleButton;
    }

    // Add mobile menu toggle
    const toggleButton = createMobileMenuToggle();
    nav.insertBefore(toggleButton, navMenu);
    
    // Toggle menu functionality
    toggleButton.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleButton.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            toggleButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .feature-card, .benefit, .action-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Initialize scroll animations
    animateOnScroll();

    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You could add analytics tracking here
            console.log('Phone number clicked:', this.href);
        });
    });

    // Email link click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You could add analytics tracking here
            console.log('Email link clicked:', this.href);
        });
    });

    // Add loading state for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add visual feedback for external links
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 500);
        });
    });

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            toggleButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Enhance accessibility for screen readers
    function enhanceAccessibility() {
        // Add aria-expanded to toggle button
        toggleButton.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Add skip link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#about';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceAccessibility();

    // Performance optimization: Lazy load images if any were added
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // Add smooth hover effects for interactive elements
    function addHoverEffects() {
        const interactiveElements = document.querySelectorAll('.btn, .product-card, .feature-card, .action-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    }

    addHoverEffects();

    console.log('Alamance Farmers\' Mutual Insurance website loaded successfully');
});