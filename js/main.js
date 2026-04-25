/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ===== NAVBAR: scroll behaviour ===== */
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== MOBILE NAV TOGGLE ===== */
const toggle   = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

/* ===== ACTIVE NAV LINK ===== */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === page || (page === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

/* ===== SCROLL-IN OBSERVER (fade-up, fade-left, fade-right, section-title) ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-left, .fade-right, .section-title').forEach(el => {
  revealObserver.observe(el);
});

/* ===== STAGGER CHILDREN ===== */
document.querySelectorAll('.stagger-children').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('fade-up');
    child.style.transitionDelay = (i * 0.12) + 's';
    revealObserver.observe(child);
  });
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target  = parseFloat(el.dataset.target);
  const suffix  = el.dataset.suffix || '';
  const isFloat = target % 1 !== 0;
  const duration = 1800;
  const start    = performance.now();
  const step = now => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = (isFloat ? (target * eased).toFixed(1) : Math.round(target * eased)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ===== BACK TO TOP ===== */
const backBtn = document.querySelector('.back-to-top');
if (backBtn) {
  window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===== HERO SCROLL HINT — hide on scroll ===== */
const scrollHint = document.querySelector('.hero-scroll-hint');
if (scrollHint) {
  scrollHint.addEventListener('click', () => {
    const about = document.querySelector('#about');
    if (about) window.scrollTo({ top: about.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    scrollHint.style.opacity = window.scrollY > 80 ? '0' : '';
  }, { passive: true });
}

/* ===== HERO PARALLAX ===== */
const shape1 = document.querySelector('.hero-shape-1');
const shape2 = document.querySelector('.hero-shape-2');
const shape3 = document.querySelector('.hero-shape-3');

if (shape1 || shape2) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (shape1) shape1.style.transform = `translateY(${y * 0.22}px)`;
    if (shape2) shape2.style.transform = `translateY(${y * -0.14}px)`;
    if (shape3) shape3.style.transform = `translateY(${y * 0.09}px)`;
  }, { passive: true });
}

/* ===== TYPING ANIMATION ===== */
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const phrases = [
    'Adaptive Student Profiling',
    'Intelligent Peer Matching',
    'Social Inclusion Risk Detection',
    'Conversational Wellbeing Support'
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        // fully typed — pause then start deleting
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 62);
    } else {
      typingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 320);
        return;
      }
      setTimeout(tick, 36);
    }
  }

  // start after a short delay so it feels intentional
  setTimeout(tick, 900);
}

/* ===== MODULE CARD 3D TILT ===== */
document.querySelectorAll('.module-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
  });
});
