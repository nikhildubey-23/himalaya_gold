document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const scrollTop = document.querySelector('.scroll-top');
    const header = document.querySelector('.header');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
        
        if (window.scrollY > 50) {
            header.style.background = 'rgba(18, 101, 86, 0.98)';
        } else {
            header.style.background = 'rgba(18, 101, 86, 0.95)';
        }
        
        const scrolled = window.scrollY;
        document.querySelectorAll('.hero-content').forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    });
    
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.amenity-card, .lifestyle-card, .project-card, .plot-card, .sports-card, .kids-card, .gallery-item, .contact-item, .address-box, .landmarks-box').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(-10deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.perspective = '1000px';
        observer.observe(card);
    });
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('hero-visible');
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('hero-hidden');
        heroObserver.observe(heroSection);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your enquiry! Our team will contact you soon.');
            form.reset();
        });
    }
    
    document.querySelectorAll('.about-image, .club-image, .temple-image').forEach(imgContainer => {
        imgContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        imgContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
    
    const titleElements = document.querySelectorAll('.section-title');
    titleElements.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        title.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
    
    const cards = document.querySelectorAll('.project-card, .amenity-card, .lifestyle-card, .sports-card, .kids-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const cardWidth = rect.width;
            const rotateY = ((x - cardWidth / 2) / cardWidth) * 15;
            
            this.style.transform = `translateY(-25px) rotateY(${rotateY}deg) rotateX(10deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    });
    
    const plotCards = document.querySelectorAll('.plot-card');
    plotCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
    
    document.body.style.opacity = '0';
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
