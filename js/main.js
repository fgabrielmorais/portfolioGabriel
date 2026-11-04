(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const M = window.Motion;

  /* ---------- Slots: mostra onde cada imagem real deve entrar ---------- */
  const ICON_IMG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>';

  function slotFallback(img) {
    const el = document.createElement('div');
    el.className = 'slot';
    el.innerHTML = `${ICON_IMG}<span>${img.dataset.slot || 'Imagem'}</span><code>${img.getAttribute('src')}</code>`;
    img.replaceWith(el);
  }
  function watchSlots(scope = document) {
    $$('img[data-slot]', scope).forEach((img) => {
      if (img.complete && img.naturalWidth === 0) slotFallback(img);
      else img.addEventListener('error', () => slotFallback(img), { once: true });
    });
  }
  watchSlots();

  /* ---------- Spray granulado ----------
     Pontos espalhados com distribuição normal: densos no centro, rareando nas bordas,
     como tinta spray. É desenhado uma vez; só a posição muda. */
  const sprays = $$('.spray').map((host) => {
    const canvas = document.createElement('canvas');
    host.appendChild(canvas);
    return { host, canvas };
  });

  function gauss() {
    let u = 0, v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function paintSprays() {
    const color = getComputedStyle(root).getPropertyValue('--blue').trim();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    sprays.forEach(({ host, canvas }) => {
      const w = host.offsetWidth, h = host.offsetHeight;
      if (!w || !h) return;
      canvas.width = w * dpr; canvas.height = h * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.fillStyle = color;
      const count = Math.round(w * h / 26);
      for (let i = 0; i < count; i++) {
        const x = w / 2 + gauss() * w * 0.18;
        const y = h / 2 + gauss() * h * 0.18;
        ctx.globalAlpha = 0.35 + Math.random() * 0.65;
        ctx.fillRect(x, y, Math.random() < 0.85 ? 1 : 1.6, 1);
      }
    });
  }
  paintSprays();
  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(paintSprays, 200); });

  // O spray do hero segue o mouse com atraso: o fundo reage a quem está lendo
  const heroSpray = $('#spray');
  if (hasGsap && finePointer && !reduceMotion) {
    const sx = gsap.quickTo(heroSpray, 'x', { duration: 2, ease: 'power3' });
    const sy = gsap.quickTo(heroSpray, 'y', { duration: 2, ease: 'power3' });
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      sx(((e.clientX - r.left) / r.width - 0.6) * 140);
      sy(((e.clientY - r.top) / r.height - 0.5) * 100);
    });
    hero.addEventListener('pointerleave', () => { sx(0); sy(0); });
  }

  /* ---------- Tema ---------- */
  $('#themeToggle').addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try { localStorage.setItem('gf-theme', theme); } catch (e) {}
    paintSprays();
  });

  /* ---------- Menu mobile ---------- */
  const burger = $('#burger'), menu = $('#mobileMenu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.hidden = !open;
    root.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ---------- Círculo à mão na navegação: marca a seção em que você está ---------- */
  const navLinks = $$('.nav a');
  const circle = $('#navCircle');
  function moveCircle(link) {
    navLinks.forEach((a) => a.classList.toggle('is-active', a === link));
    circle.style.width = `${link.offsetWidth + 6}px`;
    circle.style.transform = `translateX(${link.offsetLeft - 3}px)`;
  }
  moveCircle(navLinks[0]);
  const sections = navLinks.map((a) => $(a.getAttribute('href')));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) moveCircle(navLinks[sections.indexOf(e.target)]); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));

  /* ---------- Toast (Animate.css) ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastEl.className = 'toast animate__animated animate__fadeInUp animate__faster';
    toastTimer = setTimeout(() => {
      toastEl.className = 'toast animate__animated animate__fadeOutDown animate__faster';
      toastEl.addEventListener('animationend', () => { toastEl.hidden = true; }, { once: true });
    }, 2000);
  }

  /* ---------- Copiar e-mail ---------- */
  const copyBtn = $('#copyEmail');
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      const ta = Object.assign(document.createElement('textarea'), { value: email });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    copyBtn.classList.add('is-copied');
    toast('E-mail copiado');
    setTimeout(() => copyBtn.classList.remove('is-copied'), 2000);
  });

  /* ---------- Estudo de caso (modal) ---------- */
  const modal = $('#projectModal'), panel = $('.modal__panel', modal), modalContent = $('#modalContent');
  const SECTIONS = [
    ['context', 'Contexto'], ['problem', 'Problema'], ['approach', 'Como fiz'],
    ['challenge', 'Desafio'], ['decisions', 'Decisões'], ['role', 'Meu papel'],
    ['result', 'Resultado'], ['evidence', 'Validação'], ['learned', 'Aprendizados']
  ];
  const isEmpty = (v) => !v || (Array.isArray(v) && !v.length);

  function renderProject(p) {
    const blocks = SECTIONS.filter(([k]) => !isEmpty(p[k])).map(([k, label]) => {
      const v = p[k];
      const body = Array.isArray(v) ? `<ul>${v.map((x) => `<li>${x}</li>`).join('')}</ul>` : `<p>${v}</p>`;
      return `<div class="cs"><h4>${label}</h4>${body}</div>`;
    }).join('');
    return `
      <p class="modal__kicker mono">${p.kicker}</p>
      <h2 class="modal__title" id="modalTitle">${p.title}</h2>
      <p class="modal__summary">${p.summary}</p>
      <div class="modal__cover"><img src="${p.cover}" alt="${p.title}" data-slot="Capa do projeto"${p.coverPosition ? ` style="object-position:${p.coverPosition}"` : ''}></div>
      ${blocks}
      <div class="cs"><h4>Stack</h4><ul class="chips">${p.stack.map((s) => `<li>${s}</li>`).join('')}</ul></div>
      ${p.gallery.length ? `<div class="modal__gallery">${p.gallery.map((g, i) =>
        `<figure><img src="${g}" alt="${p.title}, imagem ${i + 1}" data-slot="Imagem ${i + 1}" loading="lazy"></figure>`).join('')}</div>` : ''}
      ${p.links.length ? `<div class="modal__links">${p.links.map((l) =>
        l.download
          ? `<a class="box-btn" href="${l.href}" download>${l.label} <span aria-hidden="true">↓</span></a>`
          : `<a class="box-btn" href="${l.href}" target="_blank" rel="noopener">${l.label} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}
    `;
  }

  let lastFocus;
  function openProject(slug) {
    const p = window.PROJECTS && window.PROJECTS[slug];
    if (!p) return;
    lastFocus = document.activeElement;
    modalContent.innerHTML = renderProject(p);
    watchSlots(modalContent);
    panel.scrollTop = 0;
    modal.showModal();
    root.style.overflow = 'hidden';
    if (M && !reduceMotion) M.animate(panel, { x: [80, 0], opacity: [0, 1] }, { type: 'spring', stiffness: 260, damping: 30 });
  }
  async function closeProject() {
    if (!modal.open) return;
    if (M && !reduceMotion) await M.animate(panel, { x: 80, opacity: 0 }, { duration: 0.22 });
    modal.close();
    root.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$('.project').forEach((row) => {
    const open = () => openProject(row.dataset.project);
    $('.arrow-circle', row).addEventListener('click', open);
    $('.project__media', row).addEventListener('click', open);
  });
  $$('.card[data-open]').forEach((card) => card.addEventListener('click', (e) => {
    e.preventDefault();
    openProject(card.dataset.open);
  }));
  $('#modalClose').addEventListener('click', closeProject);
  modal.addEventListener('cancel', (e) => { e.preventDefault(); closeProject(); });
  modal.addEventListener('click', (e) => { if (e.target === modal) closeProject(); });

  /* ---------- GSAP: entrada do hero e revelações discretas ---------- */
  if (!hasGsap || reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);

  // Traços desenhados à mão "se desenham" uma vez
  const drawn = $$('.stamp ellipse, .stamp__under, .squiggle path');
  drawn.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });

  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro
    .from('.hero__title .line > span', { yPercent: 105, duration: 1.1, stagger: 0.08 })
    .to('.stamp ellipse, .stamp__under', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.15 }, 0.5)
    .from('.blue-btn, .badge', { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.6);

  // O carimbo gira um pouco conforme a página rola
  gsap.to('#stamp', { rotate: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  gsap.to('.squiggle path', { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: '.projects', start: 'top 70%' } });

  // Cards, projetos e eventos sobem de leve ao entrar na tela
  ScrollTrigger.batch('.card, .project, .event', {
    start: 'top 88%', once: true,
    onEnter: (batch) => gsap.from(batch, { y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out', clearProps: 'all' })
  });
})();
