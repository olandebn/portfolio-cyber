/* ═══════════════════════════════════════════
   OLAN DEBRUYNE — Portfolio Scripts
   ═══════════════════════════════════════════ */

/* ── TYPING EFFECT ─────────────────────── */
(function initTyping() {
  const el = document.getElementById('typing');
  if (!el) return;

  const phrases = [
    'ÉTUDIANT BACHELOR CYBERSÉCURITÉ',
    'ADMIN SYSTÈME & RÉSEAUX',
    'PASSIONNÉ PAR LA CYBERSÉCURITÉ',
    'DISPONIBLE POUR UN STAGE',
  ];

  let pi = 0, ci = 0, del = false, pause = 0;

  function type() {
    if (pause > 0) { pause--; setTimeout(type, 80); return; }

    const cur = phrases[pi];
    if (!del) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { del = true; pause = 28; }
      setTimeout(type, 70);
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; pause = 6; }
      setTimeout(type, 35);
    }
  }
  setTimeout(type, 600);
})();


/* ── TABS ──────────────────────────────── */
(function initTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-tab');
      // Update buttons
      btn.closest('.section').querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Update content
      btn.closest('.section').querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const target = document.getElementById('tab-' + id);
      if (target) {
        target.classList.add('active');
        // Animate skill bars in this tab
        target.querySelectorAll('.skill-fill').forEach(f => {
          f.style.width = '0%';
          setTimeout(() => { f.style.width = (f.getAttribute('data-w') || 0) + '%'; }, 100);
        });
      }
    });
  });
})();


/* ── SKILL BARS ON SCROLL ──────────────── */
(function initSkillBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Only animate visible tab's bars
        const fills = e.target.querySelectorAll('.tab-content.active .skill-fill');
        fills.forEach((f, i) => {
          setTimeout(() => {
            f.style.width = (f.getAttribute('data-w') || 0) + '%';
          }, i * 80);
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('competences');
  if (skillsSection) obs.observe(skillsSection);
})();


/* ── REVEAL ON SCROLL ───────────────────── */
(function initReveal() {
  const targets = [
    '.profile-card',
    '.skill-card',
    '.project-card',
    '.tl-card',
    '.contact-card',
    '.contact-form',
  ];

  const items = document.querySelectorAll(targets.join(','));
  items.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => obs.observe(el));
})();


/* ── NAV ACTIVE STATE ───────────────────── */
(function initNav() {
  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]:not(#hero)');

  function update() {
    const scroll = window.scrollY + window.innerHeight / 3;
    let active = null;
    sections.forEach(s => {
      if (scroll >= s.offsetTop) active = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('data-s') === active);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();

  links.forEach(l => {
    l.addEventListener('click', e => {
      const href = l.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


/* ── FORM ──────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const orig = btn.innerHTML;
    btn.innerHTML = 'ENVOYÉ ✓';
    btn.style.background = 'var(--green)';
    btn.disabled = true;

    const toast = Object.assign(document.createElement('div'), {
      textContent: '✓ Message envoyé avec succès',
    });
    Object.assign(toast.style, {
      position: 'fixed', bottom: '28px', right: '28px',
      background: '#0e0e1a', border: '1px solid #22c55e',
      color: '#22c55e', padding: '14px 22px', borderRadius: '8px',
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem',
      letterSpacing: '1px', zIndex: '9999',
      boxShadow: '0 4px 24px rgba(34,197,94,0.2)',
    });
    document.body.appendChild(toast);

    setTimeout(() => {
      form.reset();
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
      toast.remove();
    }, 3500);
  });
})();


/* ── INIT ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  console.log(
    '%c[INIT] Portfolio · Olan Debruyne · Cybersec',
    'color:#4169ff;font-family:monospace;font-size:13px'
  );
});
