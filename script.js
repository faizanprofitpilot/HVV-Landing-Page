// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Navbar scroll effect with enhanced transitions
const header = document.querySelector('.header');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

// Smooth scroll for anchor links with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Premium Intersection Observer with staggered animations
const createObserver = (options = {}) => {
    const defaultOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { ...defaultOptions, ...options });
};

const mainObserver = createObserver();
const staggerObserver = createObserver({ rootMargin: '0px 0px -50px 0px' });

// Hero content animation on load with staggered timing
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero elements with staggered delay
    const heroElements = document.querySelectorAll('.hero .fade-in-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + (index * 200));
    });

    // Observe section titles and text
    const fadeElements = document.querySelectorAll('.fade-in:not(.value-card):not(.portfolio-card):not(.portfolio-placeholder):not(.leadership-card)');
    fadeElements.forEach(el => {
        mainObserver.observe(el);
    });
    
    // Leadership card with special timing
    const leadershipCard = document.querySelector('.leadership-card');
    if (leadershipCard) {
        leadershipCard.classList.add('fade-in-scale');
        mainObserver.observe(leadershipCard);
    }
});

// Staggered animation for portfolio cards
const portfolioObserver = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            delay += 150;
            portfolioObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Staggered animation for values cards
const valuesObserver = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    visibleEntries.forEach((entry, index) => {
        setTimeout(() => {
            entry.target.classList.add('visible');
        }, index * 150);
        valuesObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

// Initialize card observers
document.addEventListener('DOMContentLoaded', () => {
    // Portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card, .portfolio-placeholder');
    portfolioCards.forEach(card => {
        portfolioObserver.observe(card);
    });
    
    // Value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        valuesObserver.observe(card);
    });
});

// Add active state to navigation links on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Subtle parallax effect for hero section
const hero = document.querySelector('.hero');
let heroTicking = false;

window.addEventListener('scroll', () => {
    if (!heroTicking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                const rate = scrolled * 0.3;
                hero.style.backgroundPositionY = `calc(100% + ${rate}px)`;
            }
            heroTicking = false;
        });
        heroTicking = true;
    }
});

// Add magnetic effect to buttons and cards on mouse move
document.querySelectorAll('.portfolio-card, .value-card, .leadership-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add glow effect following cursor on cards
document.querySelectorAll('.portfolio-card, .leadership-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// Counter animation for any numbers (future use)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const animate = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(animate);
        } else {
            element.textContent = target;
        }
    };
    
    animate();
}

// Add loading animation class removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal for sections on scroll
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.05
});

revealSections.forEach(section => {
    revealObserver.observe(section);
});
