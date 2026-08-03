/* =============================================================
   Lehan Zhang Academic Homepage — Main JS
   ============================================================ */

(function () {
  'use strict';

  // ----- DOM References -----
  const html = document.documentElement;
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const langToggle = document.getElementById('langToggle');
  const themeToggle = document.getElementById('themeToggle');
  const langIndicator = langToggle.querySelector('.lang-indicator');
  const allNavAnchors = navLinks.querySelectorAll('a');
  // ----- State -----
  let currentLang = localStorage.getItem('lang') || 'zh';
  let currentTheme = localStorage.getItem('theme') || 'light';

  // ----- Theme -----
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
  }

  // Detect system preference on first visit
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? 'dark' : 'light';
  }
  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const next = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });

  // Listen for system theme changes if user hasn't manually set
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ----- Language -----
  function applyLang(lang) {
    html.setAttribute('data-lang', lang);
    langIndicator.textContent = lang === 'zh' ? '中' : 'EN';
    localStorage.setItem('lang', lang);
    currentLang = lang;

    // Update nav item text
    allNavAnchors.forEach((a) => {
      const key = a.getAttribute('data-i18n-nav');
      if (key) {
        const translations = {
          about:       { zh: '个人简介', en: 'About' },
          research:    { zh: '研究方向', en: 'Research' },
          publications:{ zh: '论文发表', en: 'Publications' },
          education:   { zh: '教育经历', en: 'Education' },
        };
        if (translations[key]) {
          a.textContent = translations[key][lang];
        }
      }
    });

    // Update language toggle title
    langToggle.setAttribute('title', lang === 'zh' ? 'Switch to English' : '切换到中文');
  }

  applyLang(currentLang);

  langToggle.addEventListener('click', () => {
    const next = currentLang === 'zh' ? 'en' : 'zh';
    applyLang(next);
  });

  // ----- Mobile Menu -----
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  allNavAnchors.forEach((a) => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });

  // ----- Navbar Scroll Effect -----
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Shadow on scroll
    if (scrollY > 10) {
      navbar.style.boxShadow = '0 2px 12px var(--color-shadow)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Highlight current section in nav
    const sections = document.querySelectorAll('section[id], header[id]');
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (scrollY >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    allNavAnchors.forEach((a) => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + currentId) {
        a.classList.add('active');
      }
    });

    lastScrollY = scrollY;
  });

  // ----- Scroll Reveal Animation -----
  const revealElements = document.querySelectorAll(
    '.research-card, .timeline-item, .pub-item'
  );
  revealElements.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));

})();
