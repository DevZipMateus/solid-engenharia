/* ============================================================
   SOLID ENGENHARIA — main.js
   ============================================================ */

// ---------- NAVBAR: scroll + menu mobile ----------
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu  = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightActiveSection();
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.querySelector('i').className =
    navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

// Fecha menu ao clicar num link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  });
});

// Fecha menu ao clicar fora (menu agora é irmão do navbar no DOM)
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  }
});

// ---------- ACTIVE SECTION na navbar ----------
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

// ---------- ANIMATE ON SCROLL ----------
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Adiciona classe de animação e observa elementos
const animatables = [
  '.mvv-card',
  '.service-card',
  '.mercado-feat',
  '.highlight-card',
  '.contact-item',
  '.section__header',
  '.mercado__text',
  '.mercado__features'
];

document.querySelectorAll(animatables.join(', ')).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
  observer.observe(el);
});

// Classe .visible ativa a animação
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

// ---------- SMOOTH SCROLL para ancoras ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // altura da navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------- MODAL — Logo clientes ----------
function openModal(src) {
  const overlay = document.getElementById('modalOverlay');
  const img     = document.getElementById('modalImg');
  img.src = src;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ---------- Ano dinâmico no footer ----------
document.addEventListener('DOMContentLoaded', () => {
  const yearEls = document.querySelectorAll('.footer__bottom p');
  yearEls.forEach(el => {
    el.innerHTML = el.innerHTML.replace('2024', new Date().getFullYear());
  });
});
