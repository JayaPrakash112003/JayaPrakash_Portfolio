/* =====================================================
   JPM.DEV Portfolio — JavaScript Engine
   Features: tsParticles, Scroll Reveal, Navbar,
             Glitch, Timeline pulse, Hamburger
   ===================================================== */

// ── Navbar scroll state ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger Menu ────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── tsParticles (particle network + triangles) ────────
tsParticles.load('tsparticles', {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      grab: { distance: 160, links: { opacity: 0.4 } },
      push: { quantity: 2 }
    }
  },
  particles: {
    number: { value: 60, density: { enable: true, area: 900 } },
    color: { value: ['#0ea5e9', '#10b981', '#6366f1'] },
    opacity: { value: 0.35, random: { enable: true, minimumValue: 0.1 } },
    size: { value: { min: 1, max: 3 } },
    links: {
      enable: true,
      distance: 140,
      color: '#0ea5e9',
      opacity: 0.15,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.7,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' }
    },
    shape: {
      type: ['circle', 'triangle'],
    }
  },
  detectRetina: true
});

// ── Scroll Reveal (IntersectionObserver) ─────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        let delay = 0;
        siblings.forEach((el, idx) => {
          if (el === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

// ── Skill bar animation (triggered on reveal) ────────
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
skillCards.forEach(card => skillObserver.observe(card));

// ── Glitch trigger on hover (extra JS layer) ─────────
const glitchText = document.querySelector('.hero-name.glitch');
if (glitchText) {
  let glitchInterval = null;
  // Periodic auto-glitch every 4s
  glitchInterval = setInterval(() => {
    glitchText.style.animation = 'none';
    glitchText.offsetHeight; // reflow
    glitchText.style.animation = '';
    glitchText.classList.remove('glitch-active');
    void glitchText.offsetWidth;
    glitchText.classList.add('glitch-active');
    setTimeout(() => glitchText.classList.remove('glitch-active'), 400);
  }, 4000);
}

// ── Active nav link on scroll ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navItems.forEach(item => {
    item.style.color = item.getAttribute('href') === `#${current}`
      ? 'var(--accent-cyan)'
      : '';
  });
}, { passive: true });

// ── Smooth type-writer on status text ────────────────
const statusText = document.querySelector('.status-text');
if (statusText) {
  const original = statusText.textContent;
  statusText.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    statusText.textContent += original[i];
    i++;
    if (i >= original.length) clearInterval(typeInterval);
  }, 60);
}

// ── Portrait image — add grayscale toggle on click ──
const portrait = document.getElementById('hero-portrait');
if (portrait) {
  portrait.addEventListener('click', () => {
    portrait.style.filter =
      portrait.style.filter.includes('grayscale(0')
        ? 'grayscale(60%) contrast(1.1) brightness(0.9)'
        : 'grayscale(0%) contrast(1.05) brightness(1)';
  });
  portrait.title = 'Click to toggle grayscale';
  portrait.style.cursor = 'pointer';
}

// ── Timeline node offset animation delay ────────────
document.querySelectorAll('.node-pulse').forEach((node, i) => {
  node.style.animationDelay = `${i * 0.5}s`;
});

// ── Copyright year auto-update ──────────────────────
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  yearEl.innerHTML = yearEl.innerHTML.replace('2025', new Date().getFullYear());
}

console.log('%c JPM.DEV SYSTEM ONLINE ', 'background:#0ea5e9; color:#020617; font-family:monospace; font-size:14px; padding:6px 12px;');
