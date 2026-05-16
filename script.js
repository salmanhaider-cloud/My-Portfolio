console.log("☁️ Salman Haider | Cloud Engineer Portfolio — Loaded");

// ========================
//   SKELETON LOADER
// ========================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('skeleton-loader').classList.add('hide');
  }, 900);
});

// ========================
//   SCROLL PROGRESS BAR
// ========================
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

// ========================
//   CUSTOM CURSOR + TRAIL
// ========================
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

// Ring smoothly follows cursor
(function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

// Ring grows on hoverable elements
document.querySelectorAll('a, button, .card, .project-card, .cert-card, .highlight-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(56,189,248,0.8)';
    dot.style.transform = 'translate(-50%,-50%) scale(1.8)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(56,189,248,0.55)';
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ========================
//   PARTICLE CANVAS
// ========================
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

let particles = [];

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 18000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.6 + 0.2
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    // Move
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(103, 232, 249, ${p.alpha})`;
    ctx.fill();

    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

initParticles();
drawParticles();

// ========================
//   TYPING ANIMATION
// ========================
const typingEl = document.getElementById('typing-text');
const phrases  = [
  "Cloud Engineer",
  "AWS Enthusiast",
  "Linux Admin",
  "Docker Dev",
  "Infrastructure Builder"
];

let phraseIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
  const cur = phrases[phraseIdx];
  typingEl.textContent = deleting
    ? cur.slice(0, charIdx - 1)
    : cur.slice(0, charIdx + 1);

  deleting ? charIdx-- : charIdx++;

  if (!deleting && charIdx === cur.length) {
    deleting = true;
    setTimeout(typeEffect, 1800); return;
  }
  if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    setTimeout(typeEffect, 400); return;
  }
  setTimeout(typeEffect, deleting ? 30 : 60);
}

setTimeout(typeEffect, 2600);

// ========================
//   HAMBURGER MENU
// ========================
const hamburger     = document.getElementById('hamburger');
const navRight      = document.getElementById('nav-right');
const mobileOverlay = document.getElementById('mobile-overlay');

const openMenu  = () => { hamburger.classList.add('open'); navRight.classList.add('open'); mobileOverlay.classList.add('show'); document.body.style.overflow = 'hidden'; };
const closeMenu = () => { hamburger.classList.remove('open'); navRight.classList.remove('open'); mobileOverlay.classList.remove('show'); document.body.style.overflow = ''; };

hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? closeMenu() : openMenu());
mobileOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));

// ========================
//   BACK TO TOP
// ========================
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========================
//   SCROLL FADE SECTIONS
// ========================
const fadeSections = document.querySelectorAll('.fade-section');

function checkFade() {
  fadeSections.forEach(s => {
    if (s.getBoundingClientRect().top < window.innerHeight - 80) {
      s.classList.add('show');
    }
  });
}

window.addEventListener('scroll', checkFade);
setTimeout(checkFade, 1000);

// ========================
//   ACTIVE NAV HIGHLIGHT
// ========================
const navLinks    = document.querySelectorAll('.nav-right .nav-link');
const allSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
});

// ========================
//   STATS COUNTER
// ========================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = target === 100 ? '%' : '+';
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (target === 100 ? '%' : '+');
    if (current >= target) clearInterval(timer);
  }, 28);
}

const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNums.forEach(animateCounter);
    }
  });
}, { threshold: 0.4 });

document.querySelector('.stats-section') && statsObserver.observe(document.querySelector('.stats-section'));

// ========================
//   SKILL BARS ANIMATION
// ========================
const skillBars = document.querySelectorAll('.skill-bar-fill');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillBars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 120);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelector('.skills') && skillObserver.observe(document.querySelector('.skills'));
