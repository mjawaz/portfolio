// Navigation active state and scroll effects
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Navigation highlighting and scroll indicator
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        
        // Update scroll indicator width based on scroll position
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
        scrollIndicator.style.width = scrollPercentage + '%';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links with color transition effect
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.project-card, .education-item, .experience-item, .contact-container');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements for reveal effect
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Parallax effect for profile image
    const profileImage = document.querySelector('.profile-large');
    
    function parallaxEffect() {
        const scrollPosition = window.scrollY;
        if (profileImage && scrollPosition < 600) {
            profileImage.style.transform = `scale(1.03) translateY(${scrollPosition * 0.05}px)`;
        }
    }
    
    // Initialize active link on page load
    setActiveLink();
    revealOnScroll();
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        setActiveLink();
        revealOnScroll();
        parallaxEffect();
    });
    
    // Initial parallax call
    parallaxEffect();
});
