document.addEventListener('DOMContentLoaded', () => {
    // Visit Counter logic
    let visits = localStorage.getItem('visit_count');
    if (!visits) {
        visits = 0;
    }
    visits = parseInt(visits) + 1;
    localStorage.setItem('visit_count', visits);
    console.log(`%c Total visits historically: ${visits} `, 'background: #2d3436; color: #fff; padding: 5px; border-radius: 3px;');

    // IntersectionObserver for section highlighting
    const sections = document.querySelectorAll('section');
    const sectionObserverOptions = {
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-section');
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

    // Parallax & Scroll Effects
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / totalHeight) * 100;

        // Progress Bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        // Hero Parallax
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
        }

        // Header scroll effect
        const header = document.getElementById('header');
        if (scrolled > 30) {
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
