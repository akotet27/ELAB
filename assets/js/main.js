const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

const counters = document.querySelectorAll('.counter, .count');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = target * progress;
            const displayed = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
            el.textContent = `${prefix}${displayed}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

const screens = document.querySelectorAll('.phone-screen .screen');
const links = document.querySelectorAll('.screen-link');
const tabButtons = document.querySelectorAll('.tab-btn');
const phoneContent = document.querySelector('.phone-content');

links.forEach((link) => {
    link.addEventListener('click', () => {
        const target = link.dataset.target;
        screens.forEach((screen) => screen.classList.remove('active'));
        const next = document.getElementById(`screen-${target}`);
        if (next) next.classList.add('active');
        tabButtons.forEach((tab) => tab.classList.toggle('active', tab.dataset.target === target));
        if (phoneContent) phoneContent.scrollTop = 0;
    });
});

const toggleGroups = document.querySelectorAll('.toggle-row');
toggleGroups.forEach((group) => {
    const buttons = group.querySelectorAll('.toggle-btn');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            buttons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
