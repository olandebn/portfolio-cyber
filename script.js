/* ═══════════════════════════════════════════════════════════
   OLAN DEBRUYNE — Portfolio Scripts Premium
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── CUSTOM CURSOR ─────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('curDot');
  const ring = document.getElementById('curRing');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect: scale dot on interactive elements
  const interactives = 'a, button, .glass-card, .s-link, .s-social, .proj-link';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      dot.style.transform  = 'translate(-50%, -50%) scale(2)';
      dot.style.background = 'var(--cyan)';
      ring.style.width     = '54px';
      ring.style.height    = '54px';
      ring.style.borderColor = 'rgba(34,211,238,0.5)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      dot.style.transform  = 'translate(-50%, -50%) scale(1)';
      dot.style.background = 'var(--violet)';
      ring.style.width     = '36px';
      ring.style.height    = '36px';
      ring.style.borderColor = 'rgba(139,92,246,0.55)';
    }
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();


/* ── SCROLL PROGRESS BAR ───────────────────────────────── */
(function initScrollBar() {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;

  function update() {
    const scrolled  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ── TYPING EFFECT ─────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typing');
  if (!el) return;

  const phrases = [
    'ÉTUDIANT BACHELOR CYBERSÉCURITÉ',
    'ADMIN SYSTÈME & RÉSEAUX',
    'PASSIONNÉ PAR LA CYBERSÉCURITÉ',
    'DISPONIBLE POUR UN STAGE',
  ];

  let pi = 0, ci = 0, deleting = false, pause = 0;

  function tick() {
    if (pause > 0) {
      pause--;
      setTimeout(tick, 80);
      return;
    }

    const cur = phrases[pi];

    if (!deleting) {
      ci++;
      el.textContent = cur.slice(0, ci);
      if (ci === cur.length) { deleting = true; pause = 30; }
      setTimeout(tick, 68);
    } else {
      ci--;
      el.textContent = cur.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        pause = 8;
      }
      setTimeout(tick, 34);
    }
  }

  setTimeout(tick, 800);
})();


/* ── SKILL BAR ANIMATIONS ──────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.sk-fill');
  if (!fills.length) return;

  // Store target widths then reset to 0
  fills.forEach(f => {
    f.dataset.target = f.dataset.w || '0';
    f.style.width = '0%';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Animate all fills inside the skills section
      const section = entry.target;
      section.querySelectorAll('.sk-fill').forEach((f, i) => {
        setTimeout(() => {
          f.style.width = (f.dataset.target || 0) + '%';
        }, i * 90);
      });
      obs.unobserve(section);
    });
  }, { threshold: 0.15 });

  const skillsSection = document.getElementById('competences');
  if (skillsSection) obs.observe(skillsSection);
})();


/* ── SCROLL REVEAL ─────────────────────────────────────── */
(function initReveal() {
  const selectors = [
    '.profil-card',
    '.stat-card',
    '.skill-cat',
    '.project-card',
    '.tl-card',
    '.contact-item',
    '.contact-form',
  ];

  const items = document.querySelectorAll(selectors.join(','));
  items.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 70);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  items.forEach(el => obs.observe(el));
})();


/* ── NAV ACTIVE STATE ──────────────────────────────────── */
(function initNav() {
  const links    = document.querySelectorAll('.s-link[data-s]');
  const sections = document.querySelectorAll('section[id]');

  function updateActive() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;
    let activeId = null;

    sections.forEach(s => {
      if (scrollMid >= s.offsetTop) activeId = s.id;
    });

    links.forEach(l => {
      l.classList.toggle('active', l.dataset.s === activeId);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // Smooth scroll on click
  links.forEach(l => {
    l.addEventListener('click', e => {
      const href = l.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ── CONTACT FORM ──────────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn  = form.querySelector('.btn-primary');
    const orig = btn.innerHTML;

    btn.innerHTML = 'Message envoyé ✓';
    btn.style.background = 'linear-gradient(135deg, var(--green), #059669)';
    btn.disabled = true;

    // Toast notification
    const toast = document.createElement('div');
    toast.textContent = '✓ Message envoyé avec succès';
    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '28px',
      right:        '28px',
      background:   '#0c0c1e',
      border:       '1px solid rgba(16,185,129,0.4)',
      color:        'var(--green)',
      padding:      '14px 22px',
      borderRadius: '10px',
      fontFamily:   'JetBrains Mono, monospace',
      fontSize:     '0.8rem',
      letterSpacing:'1px',
      zIndex:       '9999',
      boxShadow:    '0 4px 30px rgba(16,185,129,0.15)',
      opacity:      '0',
      transform:    'translateY(10px)',
      transition:   'opacity 0.3s, transform 0.3s',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
      form.reset();
      btn.innerHTML   = orig;
      btn.style.background = '';
      btn.disabled    = false;
    }, 3500);
  });
})();


/* ── INIT LOG ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  console.log(
    '%c[ OD ] Portfolio · Olan Debruyne · Cybersécurité',
    'color:#8b5cf6; font-family:JetBrains Mono,monospace; font-size:13px; font-weight:600'
  );
});
