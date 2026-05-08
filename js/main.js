/* ── TYPEWRITER ── */
const roles = [
  'Penetration Tester',
  'Security Researcher',
  'Bug Hunter',
  'Cybersecurity Adjunct',
];

let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('tw');

function type() {
  const word = roles[ri];
  tw.textContent = deleting
    ? word.slice(0, ci - 1)
    : word.slice(0, ci + 1);
  deleting ? ci-- : ci++;

  let delay = deleting ? 38 : 75;

  if (!deleting && ci === word.length) {
    delay = 2200;
    deleting = true;
  } else if (deleting && ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    delay = 420;
  }

  setTimeout(type, delay);
}

setTimeout(type, 1000);

/* ── NAVBAR SCROLL STATE ── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  backTop.classList.toggle('show', y > 400);
}, { passive: true });

/* ── HAMBURGER ── */
const burger  = document.getElementById('burger');
const mobMenu = document.getElementById('mobMenu');

burger.addEventListener('click', () => {
  const open = mobMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.mob-lnk').forEach(a => {
  a.addEventListener('click', () => {
    mobMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ── BACK TO TOP ── */
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('section:not(#hero)').forEach(s => observer.observe(s));

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${e.target.id}`
        ? 'var(--txt)'
        : '';
    });
  });
}, { threshold: 0.45 });

sections.forEach(s => navObserver.observe(s));

/* ── STAGGERED OP-CARD REVEAL ── */
const opsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.op-card').forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 80);
    });
    opsObserver.unobserve(e.target);
  });
}, { threshold: 0.1 });

const opsGrid = document.querySelector('.ops-grid');
if (opsGrid) {
  opsGrid.querySelectorAll('.op-card').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    c.style.transition = 'opacity 0.45s ease, transform 0.45s ease, border-color 0.3s, box-shadow 0.3s';
  });
  opsObserver.observe(document.getElementById('operations'));
}
