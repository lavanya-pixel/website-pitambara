/* 
   Pitambara Dudh Dairy – GSAP Animations Script
   Configures GSAP timeline, scroll triggers, parallax, and animated counters.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Falling back to CSS transitions.');
        // Fallback for counters
        fallbackCounters();
        return;
    }

    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.warn('ScrollTrigger plugin is not loaded. Scroll animations will not trigger.');
        fallbackCounters();
        return;
    }

    // 1. Hero Entrance Animations
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTl.from('.navbar-custom', {
        y: -50,
        opacity: 0,
        duration: 1.2
    });

    heroTl.from('.hero-title', {
        x: -50,
        opacity: 0,
        duration: 1
    }, '-=0.6');

    heroTl.from('.hero-subtitle', {
        x: -30,
        opacity: 0,
        duration: 1
    }, '-=0.8');

    heroTl.from('.hero-buttons .btn-premium', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    }, '-=0.8');

    heroTl.from('.hero-image-wrapper', {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.75)'
    }, '-=1');

    // 2. Scroll Reveal Animations (Fade Up)
    const revealElements = document.querySelectorAll('.reveal-fade-up, .glass-card, .timeline-item, .owner-card');
    revealElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 3. Section Headers Reveal
    const headers = document.querySelectorAll('.section-header');
    headers.forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 4. Parallax Background effect on Hero
    gsap.to('.hero-bg-overlay', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        yPercent: 30,
        ease: 'none'
    });

    // 5. Statistics Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-target'), 10);
        const hasPlus = stat.textContent.includes('+');
        const hasPercent = stat.textContent.includes('%');
        
        const counterObj = { value: 0 };
        
        gsap.to(counterObj, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%'
            },
            value: targetValue,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
                let suffix = '';
                if (hasPlus) suffix = '+';
                if (hasPercent) suffix = '%';
                stat.textContent = Math.floor(counterObj.value) + suffix;
            }
        });
    });
});

// Fallback statistics counter for environments where GSAP fails to load
function fallbackCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const runCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const hasPlus = stat.textContent.includes('+');
            const hasPercent = stat.textContent.includes('%');
            let count = 0;
            const speed = target / 50; // speed division
            
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    let suffix = '';
                    if (hasPlus) suffix = '+';
                    if (hasPercent) suffix = '%';
                    stat.textContent = Math.floor(count) + suffix;
                    setTimeout(updateCount, 30);
                } else {
                    let suffix = '';
                    if (hasPlus) suffix = '+';
                    if (hasPercent) suffix = '%';
                    stat.textContent = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Use IntersectionObserver to run fallback counters when in view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    } else {
        runCounters();
    }
}
