/* =============================================================
   张乐涵 · Lehan Zhang — Academic Homepage JS
   ============================================================ */

(function () {
  'use strict';

  const html = document.documentElement;

  // ===== Language =====
  const langToggle = document.getElementById('langToggle');
  let currentLang = localStorage.getItem('lang') || 'zh';

  function applyLang(lang) {
    html.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang);
    currentLang = lang;
  }
  applyLang(currentLang);
  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'zh' ? 'en' : 'zh');
  });

  // ===== Theme =====
  const themeToggle = document.getElementById('themeToggle');
  let currentTheme = localStorage.getItem('theme') || 'light';

  if (!localStorage.getItem('theme')) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = 'dark';
    }
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    currentTheme = theme;
  }
  applyTheme(currentTheme);
  themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ===== Research Cards — Click to Expand =====
  const mainCards = document.querySelectorAll('.research-card--main');
  const subGrids = {
    mm: document.getElementById('sub-mm'),
    ei: document.getElementById('sub-ei'),
  };

  let activeGroup = null;

  mainCards.forEach((card) => {
    card.addEventListener('click', () => {
      const group = card.dataset.group;

      if (activeGroup === group) {
        // Collapse
        collapse(group);
        activeGroup = null;
      } else {
        // Collapse previous, expand new
        if (activeGroup) collapse(activeGroup);
        expand(group);
        activeGroup = group;
      }
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  function expand(group) {
    const grid = subGrids[group];
    const card = document.querySelector(`[data-group="${group}"]`);
    if (grid) grid.hidden = false;
    if (card) card.classList.add('active');
  }

  function collapse(group) {
    const grid = subGrids[group];
    const card = document.querySelector(`[data-group="${group}"]`);
    if (grid) grid.hidden = true;
    if (card) card.classList.remove('active');
  }

})();
