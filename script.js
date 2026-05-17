console.log("☁️ Salman Haider | Cloud Engineer Portfolio v3.0 — LOADED");

// ─────────────────────────────
//  SKELETON LOADER
// ─────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('skeleton-loader').classList.add('hide');
  }, 900);
});

// ─────────────────────────────
//  SCROLL PROGRESS BAR
// ─────────────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

// ─────────────────────────────
//  CUSTOM CURSOR + RING
// ─────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function smoothRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(smoothRing);
})();

document.querySelectorAll('a, button, .proj-card, .cert-card, .hl-card, .stat-card, .tl-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('big'));
  el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});

// ─────────────────────────────
//  PARTICLE CANVAS
// ─────────────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initP();
});

let particles = [];

function initP() {
  particles = [];
  const count = Math.floor((W * H) / 15000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.55 + 0.15
    });
  }
}

function drawP() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p, i) => {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(103,232,249,${p.a})`;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(56,189,248,${0.13 * (1 - d / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawP);
}
initP(); drawP();

// ─────────────────────────────
//  TYPING ANIMATION
// ─────────────────────────────
const typingEl = document.getElementById('typing-text');
const phrases  = [
  'Cloud Engineer',
  'AWS Practitioner',
  'Linux Administrator',
  'Docker Enthusiast',
  'Infrastructure Builder',
  'Azure Fundamentals ✅'
];
let pi = 0, ci = 0, del = false;

function type() {
  const cur = phrases[pi];
  typingEl.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  del ? ci-- : ci++;
  if (!del && ci === cur.length) { del = true; setTimeout(type, 2000); return; }
  if (del && ci === 0)            { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
  setTimeout(type, del ? 30 : 60);
}
setTimeout(type, 2700);

// ─────────────────────────────
//  HAMBURGER MENU
// ─────────────────────────────
const hbg     = document.getElementById('hamburger');
const navR    = document.getElementById('nav-right');
const overlay = document.getElementById('mobile-overlay');

const openM  = () => { hbg.classList.add('open'); navR.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; };
const closeM = () => { hbg.classList.remove('open'); navR.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; };

hbg.addEventListener('click', () => hbg.classList.contains('open') ? closeM() : openM());
overlay.addEventListener('click', closeM);
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeM));

// ─────────────────────────────
//  BACK TO TOP
// ─────────────────────────────
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─────────────────────────────
//  SCROLL FADE
// ─────────────────────────────
const fades = document.querySelectorAll('.fade-section');
function checkFade() {
  fades.forEach(s => {
    if (s.getBoundingClientRect().top < window.innerHeight - 80) s.classList.add('show');
  });
}
window.addEventListener('scroll', checkFade);
setTimeout(checkFade, 1100);

// ─────────────────────────────
//  ACTIVE NAV
// ─────────────────────────────
const navLinks = document.querySelectorAll('.nav-right .nav-link');
const secs     = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 220) cur = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
  });
});

// ─────────────────────────────
//  STATS COUNTER
// ─────────────────────────────
function animateCount(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  let cur = 0;
  const step = Math.ceil(target / 55);
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(t);
  }, 28);
}
let statsRan = false;
const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsRan) {
    statsRan = true;
    document.querySelectorAll('.stat-num').forEach(animateCount);
  }
}, { threshold: 0.4 });
const statsSec = document.querySelector('.stats-section');
if (statsSec) statsObs.observe(statsSec);

// ─────────────────────────────
//  SKILL BARS ANIMATION
// ─────────────────────────────
let skillsRan = false;
const skillObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !skillsRan) {
    skillsRan = true;
    document.querySelectorAll('.sb-fill').forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 110);
    });
  }
}, { threshold: 0.25 });
const skillSec = document.querySelector('.skills');
if (skillSec) skillObs.observe(skillSec);

// ─────────────────────────────
//  NAVBAR SCROLL STYLE
// ─────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(2,6,23,0.92)';
    nav.style.boxShadow  = '0 4px 30px rgba(0,0,0,0.5)';
  } else {
    nav.style.background = 'rgba(2,6,23,0.65)';
    nav.style.boxShadow  = 'none';
  }
});
