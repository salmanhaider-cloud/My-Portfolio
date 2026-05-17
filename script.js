/* ☁️ Salman Haider | Cloud Engineer Portfolio v5.0 ULTIMATE */
console.log('%c☁️ Salman Haider | Cloud Engineer v5.0', 'color:#38bdf8;font-family:monospace;font-size:14px;font-weight:bold');

// ── SKELETON ──
window.addEventListener('load', () => setTimeout(() => document.getElementById('skeleton').classList.add('hide'), 900));

// ── SCROLL PROGRESS ──
const prog = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  prog.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
});

// ── CURSOR ──
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(1.8)');
document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');

(function animRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .pc, .cc, .hl, .sc, .tc').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('big'));
  el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});

// ── PARTICLES ──
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W, H, pts = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initPts();
}

function initPts() {
  pts = [];
  const n = Math.floor((W * H) / 14000);
  for (let i = 0; i < n; i++) {
    pts.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .32,
      vy: (Math.random() - .5) * .32,
      r: Math.random() * 1.4 + .3,
      a: Math.random() * .55 + .15
    });
  }
}

function drawPts() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(103,232,249,${p.a})`;
    ctx.fill();

    for (let j = i + 1; j < pts.length; j++) {
      const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 115) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(56,189,248,${.13 * (1 - d / 115)})`;
        ctx.lineWidth = .5; ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawPts);
}

window.addEventListener('resize', resize);
resize(); drawPts();

// ── TYPING ──
const typed = document.getElementById('typed');
const phrases = [
  'Cloud Engineer', 'AWS Practitioner', 'Linux Administrator',
  'Docker Enthusiast', 'Infrastructure Builder', 'Azure Fundamentals'
];
let pi = 0, ci = 0, del = false;
function type() {
  const cur = phrases[pi];
  typed.textContent = del ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  del ? ci-- : ci++;
  if (!del && ci === cur.length) { del = true; setTimeout(type, 2000); return; }
  if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
  setTimeout(type, del ? 30 : 58);
}
setTimeout(type, 2700);

// ── HAMBURGER ──
const hbg = document.getElementById('hbg');
const navlinks = document.getElementById('navlinks');
const mobBg = document.getElementById('mob-bg');
const open  = () => { hbg.classList.add('open'); navlinks.classList.add('open'); mobBg.classList.add('show'); document.body.style.overflow = 'hidden'; };
const close = () => { hbg.classList.remove('open'); navlinks.classList.remove('open'); mobBg.classList.remove('show'); document.body.style.overflow = ''; };
hbg.addEventListener('click', () => hbg.classList.contains('open') ? close() : open());
mobBg.addEventListener('click', close);
document.querySelectorAll('.nl').forEach(l => l.addEventListener('click', close));

// ── BACK TO TOP ──
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => btt.classList.toggle('vis', window.scrollY > 400));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── NAVBAR SCROLL ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── FADE SECTIONS ──
const fades = document.querySelectorAll('.fade');
function checkFades() {
  fades.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('show');
  });
}
window.addEventListener('scroll', checkFades);
setTimeout(checkFades, 1100);

// ── ACTIVE NAV ──
const nls = document.querySelectorAll('.navlinks .nl');
const secs = document.querySelectorAll('section[id], div.stats');
window.addEventListener('scroll', () => {
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) cur = s.id;
  });
  nls.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
  });
});

// ── STATS COUNTER ──
let statsRan = false;
const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsRan) {
    statsRan = true;
    document.querySelectorAll('.sn').forEach(el => {
      const target = +el.dataset.t, suffix = el.dataset.s || '';
      let n = 0;
      const step = Math.ceil(target / 55);
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n + suffix;
        if (n >= target) clearInterval(t);
      }, 28);
    });
  }
}, { threshold: 0.4 });
const statEl = document.querySelector('.stats');
if (statEl) statsObs.observe(statEl);

// ── SKILL BARS ──
let skillsRan = false;
const skillObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !skillsRan) {
    skillsRan = true;
    document.querySelectorAll('.sbf').forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 110);
    });
  }
}, { threshold: 0.25 });
const skillEl = document.querySelector('.skills-sec');
if (skillEl) skillObs.observe(skillEl);

// ── TILT EFFECT on project cards ──
document.querySelectorAll('.pc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `translateY(-10px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});
