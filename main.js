// Initialize Lucide icons
lucide.createIcons();

// Navbar Scroll Effect
const header = document.querySelector('.glass-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.padding = '1rem 0';
        header.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Mobile Menu Placeholder (can be expanded)
const mobileToggle = document.querySelector('.mobile-toggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        alert('Mobile menu feature coming soon in the full build!');
    });
}

// Simple Intersection Observer for Fade-in effects
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Stats Counting Animation (Simplified)
const stats = document.querySelectorAll('.stat-number');
const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 100;
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.innerText = Math.ceil(current).toLocaleString() + (stat.innerText.includes('%') ? '%' : '+');
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target.toLocaleString() + (stat.innerText.includes('%') ? '%' : '+');
            }
        };
        updateCount();
    });
};

// Trigger stats animation when visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            statsObserver.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
}
