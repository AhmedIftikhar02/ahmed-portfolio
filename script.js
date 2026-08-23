document.addEventListener('DOMContentLoaded', () => {

  const safe = (label, fn) => {
    try { fn(); } catch (err) { console.warn(`[portfolio] ${label} failed:`, err); }
  };

  safe('footer year', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  const nav = document.getElementById('nav');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const sections = ['about', 'experience', 'skills', 'projects', 'education']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinkMap = new Map();
  document.querySelectorAll('.nav-link').forEach(link => {
    navLinkMap.set(link.getAttribute('href').slice(1), link);
  });

  function updateActiveNavLink(){
    const scrollPos = window.scrollY + nav.offsetHeight + 40;
    let currentId = null;
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    }
    navLinkMap.forEach((link, id) => link.classList.toggle('active', id === currentId));
  }

  safe('scroll listener', () => {
    function onScroll(){
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 40);
      backToTop.classList.toggle('visible', y > 500);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
      scrollProgress.style.width = progress + '%';
      updateActiveNavLink();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });

  safe('mobile menu', () => {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    function closeMenu(){
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', closeMenu));
  });

  safe('smooth scroll links', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  });

  safe('typing effect', () => {
    const roles = [
      'Android Developer',
      'Full-Stack Mobile Developer',
      'Kotlin \u00B7 Jetpack Compose',
      'Node.js \u00B7 Firebase \u00B7 MongoDB'
    ];
    const typedEl = document.getElementById('typedRole');
    if (!typedEl) return;
    let roleIndex = 0, charIndex = 0, deleting = false;
    function typeLoop(){
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1600); return; }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  });

  safe('marquee', () => {
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (marqueeTrack) marqueeTrack.innerHTML += marqueeTrack.innerHTML;
  });

  // Reveal runs LAST and independently, so it fires even if something above failed
  safe('scroll reveal', () => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(el => observer.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in-view'));
    }
  });

});