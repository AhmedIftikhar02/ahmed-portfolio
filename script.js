/* ===================================
   AHMED IFTIKHAR — PORTFOLIO SCRIPTS
   =================================== */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  follower.style.display = 'none';
  document.body.style.cursor = 'auto';
  document.querySelectorAll('*').forEach(el => el.style.cursor = '');
}

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── TYPEWRITER ──
const roles = [
  'Android Developer',
  'Mobile App Engineer',
  'Kotlin & Java Expert',
  'WebRTC Specialist',
  'Full-Stack Developer'
];
let ri = 0, ci = 0, deleting = false;
const roleEl = document.getElementById('role-text');

function type() {
  const current = roles[ri];
  if (deleting) {
    roleEl.textContent = current.slice(0, ci--);
    if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 500); return; }
    setTimeout(type, 50);
  } else {
    roleEl.textContent = current.slice(0, ci++);
    if (ci > current.length) { deleting = true; setTimeout(type, 2000); return; }
    setTimeout(type, 80);
  }
}
type();

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── COUNT-UP STATS ──
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        animateCount(el, parseInt(el.dataset.count));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ── PROJECTS CAROUSEL ──
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('carousel-dots');
const cards = document.querySelectorAll('.project-card');
const cardWidth = 340 + 24;
let currentIndex = 0;

function getVisibleCount() {
  return Math.floor(carousel.offsetWidth / cardWidth) || 1;
}

function createDots() {
  dotsContainer.innerHTML = '';
  const count = cards.length - getVisibleCount() + 1;
  for (let i = 0; i < Math.max(count, 1); i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function goTo(index) {
  const max = Math.max(cards.length - getVisibleCount(), 0);
  currentIndex = Math.max(0, Math.min(index, max));
  carousel.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
  updateDots();
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= max;
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

carousel.addEventListener('scroll', () => {
  currentIndex = Math.round(carousel.scrollLeft / cardWidth);
  updateDots();
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= cards.length - getVisibleCount();
});

createDots();
goTo(0);
window.addEventListener('resize', () => { createDots(); goTo(0); });

// Auto-advance carousel
let autoSlide = setInterval(() => {
  const max = cards.length - getVisibleCount();
  if (currentIndex >= max) goTo(0);
  else goTo(currentIndex + 1);
}, 4000);

carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    const max = cards.length - getVisibleCount();
    if (currentIndex >= max) goTo(0);
    else goTo(currentIndex + 1);
  }, 4000);
});

// ── CONTACT FORM ──
document.getElementById('send-btn').addEventListener('click', () => {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmsg').value.trim();

  if (!name || !email || !msg) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email.', 'error');
    return;
  }

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.location.href = `mailto:ahmediftikharsheikh401@gmail.com?subject=${subject}&body=${body}`;
  showToast('Opening your email client...', 'success');
});

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 32px; right: 32px; z-index: 10001;
    padding: 14px 24px; border-radius: 12px; font-size: 14px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; color: #fff;
    background: ${type === 'success' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : '#ef4444'};
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    transform: translateY(20px); opacity: 0;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + id ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
