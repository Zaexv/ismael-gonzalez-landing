document.addEventListener('DOMContentLoaded', () => {
    // Visit Counter logic
    let visits = localStorage.getItem('visit_count');
    if (!visits) {
        visits = 0;
    }
    visits = parseInt(visits) + 1;
    localStorage.setItem('visit_count', visits);
    console.log(`%c Total visits historically: ${visits} `, 'background: #2d3436; color: #fff; padding: 5px; border-radius: 3px;');

    // IntersectionObserver for section highlighting and background color transitions
    const sections = document.querySelectorAll('section');
    const sectionObserverOptions = {
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-section');

                // Dynamic theme changes based on section
                const sectionId = entry.target.id;
                const body = document.body;

                if (sectionId === 'hero') {
                    body.style.setProperty('--scroll-bg', '#ffffff');
                    body.style.setProperty('--scroll-text', '#2d3436');
                } else if (sectionId === 'services') {
                    body.style.setProperty('--scroll-bg', '#f8f9fa');
                    body.style.setProperty('--scroll-text', '#2d3436');
                } else if (sectionId === 'pricing') {
                    body.style.setProperty('--scroll-bg', '#2d3436');
                    body.style.setProperty('--scroll-text', '#ffffff');
                    // Adjust pricing cards contrast
                    document.querySelectorAll('.pricing-card').forEach(card => {
                        card.style.background = 'rgba(255, 255, 255, 0.05)';
                        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        card.querySelectorAll('.service, .price').forEach(el => el.style.color = '#fff');
                    });
                } else if (sectionId === 'about') {
                    body.style.setProperty('--scroll-bg', '#ffffff');
                    body.style.setProperty('--scroll-text', '#2d3436');
                    // Reset pricing cards if we were in pricing
                    document.querySelectorAll('.pricing-card').forEach(card => {
                        card.style.background = '';
                        card.style.borderColor = '';
                        card.querySelectorAll('.service, .price').forEach(el => el.style.color = '');
                    });
                } else if (sectionId === 'contact') {
                    body.style.setProperty('--scroll-bg', '#f0f2f5');
                    body.style.setProperty('--scroll-text', '#2d3436');
                }
            } else {
                entry.target.classList.remove('active-section');
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Fade-in animation on scroll using Intersection Observer
    const fadeElems = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

    // Parallax Effect for Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }

        // Header authenticated scroll effect
        const header = document.getElementById('header');
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
