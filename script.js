/* =========================================================
   SINGH / STUDIOS — animations
   GSAP + ScrollTrigger + Lenis + custom interactions
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;
const isMobile = window.matchMedia('(max-width: 900px)').matches;

/* ---------- Lenis smooth scroll ---------- */
let lenis;
if (!prefersReduced) {
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Loader ---------- */
const loader = document.getElementById('loader');
const loaderCount = document.getElementById('loaderCount');
const loaderStatus = document.getElementById('loaderStatus');
const loaderBar = loader.querySelector('.loader__bar span');
const loaderLines = loader.querySelectorAll('.loader__title-line span');

const statuses = [
  'Loading the night —',
  'Cutting the silhouettes —',
  'Polishing the asphalt —',
  'Stitching the silence —',
  'Ready.',
];

gsap.set('.reveal-word', { yPercent: 110, opacity: 0 });

const loaderTl = gsap.timeline({
  defaults: { ease: 'expo.out' },
  onComplete: () => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    introAnimation();
  },
});

loaderTl
  .to(loaderLines, {
    yPercent: 0,
    duration: 1.2,
    stagger: 0.12,
  }, 0.2)
  .to({ v: 0 }, {
    v: 100,
    duration: 2.4,
    ease: 'power2.inOut',
    onUpdate() {
      const v = Math.round(this.targets()[0].v);
      loaderCount.textContent = v;
      const idx = Math.min(statuses.length - 1, Math.floor(v / 25));
      if (loaderStatus.textContent !== statuses[idx]) loaderStatus.textContent = statuses[idx];
    },
  }, 0.1)
  .to(loaderBar, {
    width: '100%',
    duration: 2.4,
    ease: 'power2.inOut',
  }, 0.1)
  .to(loaderLines, {
    yPercent: -110,
    duration: 0.9,
    stagger: 0.06,
    ease: 'expo.in',
  }, '-=0.4')
  .to(loader, {
    yPercent: -100,
    duration: 1.2,
    ease: 'expo.inOut',
  }, '-=0.4');

/* ---------- Custom cursor ---------- */
(function cursor() {
  if (isTouch || isMobile) return;
  const cursor = document.querySelector('.cursor');
  const ring = cursor.querySelector('.cursor__ring');
  const label = cursor.querySelector('.cursor__label');
  const dot = cursor.querySelector('.cursor__dot');

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pos = { x: mouse.x, y: mouse.y };
  const ringPos = { x: mouse.x, y: mouse.y };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.65;
    pos.y += (mouse.y - pos.y) * 0.65;
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
    label.style.transform = `translate(${ringPos.x}px, ${ringPos.y + 56}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
      const lbl = el.getAttribute('data-cursor-label');
      if (lbl) { label.textContent = lbl; cursor.classList.add('is-hover-label'); }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover', 'is-hover-label');
    });
  });
  document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
})();

/* ---------- Magnetic buttons ---------- */
(function magnetic() {
  if (isTouch || isMobile) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 25;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: (x / rect.width) * strength,
        y: (y / rect.height) * strength,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    });
  });
})();

/* ---------- 3D tilt on chat ---------- */
(function tilt() {
  if (isTouch || isMobile) return;
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const max = 8;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.5, ease: 'power3.out', transformPerspective: 1000 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    });
  });
})();

/* ---------- Mobile menu ---------- */
(function mobileMenu() {
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = menu.querySelector('.mobile-menu__close');
  const links = menu.querySelectorAll('a');

  gsap.set(menu, { yPercent: -100, autoAlpha: 0 });
  gsap.set('.mobile-menu__nav a', { y: 60, autoAlpha: 0 });

  const open = () => {
    menu.classList.add('is-open');
    if (lenis) lenis.stop();
    gsap.to(menu, { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out' });
    gsap.to('.mobile-menu__nav a', { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out', delay: 0.2 });
  };
  const close = () => {
    gsap.to(menu, {
      yPercent: -100, autoAlpha: 0, duration: 0.5, ease: 'expo.in',
      onComplete: () => {
        menu.classList.remove('is-open');
        if (lenis) lenis.start();
        gsap.set('.mobile-menu__nav a', { y: 60, autoAlpha: 0 });
      }
    });
  };

  burger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  links.forEach((a) => a.addEventListener('click', close));
})();

/* ---------- Hero intro ---------- */
function introAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from('.nav', { yPercent: -120, duration: 1.1, ease: 'power3.out' })
    .from('.scroll-progress', { scaleX: 0, transformOrigin: 'left', duration: 1 }, 0)
    .from('.hero__title .word', {
      yPercent: 110, duration: 1.5, stagger: 0.08,
    }, 0.05)
    .from('.hero__meta, .hero__sub p, .hero__strip, .hero__scroll, .hero__counter, .section-index', {
      y: 30, opacity: 0, duration: 1.1, stagger: 0.07, ease: 'power3.out',
    }, 0.5)
    .from('.hero__img', { scale: 1.3, duration: 2.4, ease: 'expo.out' }, 0);
}

/* ---------- Word reveals on scroll ---------- */
gsap.utils.toArray('.reveal-word').forEach((word) => {
  gsap.to(word, {
    yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: word, start: 'top 90%', toggleActions: 'play none none reverse' },
  });
});

/* ---------- Parallax media ---------- */
gsap.utils.toArray('[data-parallax]').forEach((el) => {
  const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
  gsap.fromTo(
    el,
    { yPercent: -speed * 50 },
    {
      yPercent: speed * 50, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    }
  );
});

/* ---------- Marquees ---------- */
document.querySelectorAll('[data-marquee]').forEach((track) => {
  const distance = track.scrollWidth / 2;
  const dur = Math.max(20, distance / 60);
  gsap.to(track, {
    x: -distance, duration: dur, ease: 'none', repeat: -1,
  });
});

/* ---------- Stacking panels — subtle scale of media as next slides over ---------- */
gsap.utils.toArray('.panel').forEach((panel) => {
  const img = panel.querySelector('.panel__media img');
  if (!img) return;
  gsap.fromTo(
    img,
    { scale: 1, filter: 'grayscale(0.35) contrast(1.05) brightness(0.9)' },
    {
      scale: 0.92,
      filter: 'grayscale(1) contrast(0.95) brightness(0.5)',
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        start: 'top top',
        end: '+=80%',
        scrub: true,
      },
    }
  );
});

/* ---------- Section titles split ---------- */
gsap.utils.toArray('.assistant__title, .stack__title, .lookbook__title').forEach((title) => {
  /* the words inside are already reveal-word, but enforce per-section trigger by tagging */
});

/* ---------- Generic fade-ups ---------- */
const fades = [
  '.manifesto__foot div',
  '.vid',
  '.assistant__copy',
  '.assistant__features li',
  '.chat',
  '.footer__cols div',
  '.panel__num',
  '.panel__title',
  '.panel p',
  '.panel__meta',
  '.panel .btn-acid',
  '.stack__lede',
  '.stat',
];
fades.forEach((sel) => {
  gsap.utils.toArray(sel).forEach((el, i) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      delay: (i % 4) * 0.05,
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
    });
  });
});

/* ---------- Image scale-in on enter ---------- */
gsap.utils.toArray('.vid__media img').forEach((img) => {
  gsap.fromTo(
    img,
    { scale: 1.25 },
    {
      scale: 1, duration: 1.6, ease: 'expo.out',
      scrollTrigger: { trigger: img, start: 'top 95%', toggleActions: 'play none none reverse' },
    }
  );
});

/* ---------- Quote subtle parallax ---------- */
gsap.to('.quote__text', {
  yPercent: -8, ease: 'none',
  scrollTrigger: { trigger: '.quote', start: 'top bottom', end: 'bottom top', scrub: true },
});

/* ---------- Footer giant text horizontal scroll ---------- */
gsap.to('.footer__giant', {
  xPercent: -10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.footer__giant', start: 'top bottom', end: 'bottom top', scrub: true,
  },
});

/* ---------- Stats counter ---------- */
gsap.utils.toArray('.stat__num').forEach((el) => {
  const end = parseInt(el.getAttribute('data-count'), 10) || 0;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to({ v: 0 }, {
        v: end, duration: 2.2, ease: 'expo.out',
        onUpdate() {
          const v = Math.round(this.targets()[0].v);
          el.textContent = end < 10 ? String(v).padStart(2, '0') : v;
        },
      });
    },
  });
});

/* ---------- Scroll progress bar ---------- */
const progressBar = document.querySelector('.scroll-progress span');
ScrollTrigger.create({
  start: 'top top', end: 'max',
  onUpdate(self) {
    progressBar.style.width = `${(self.progress * 100).toFixed(2)}%`;
  },
});

/* ---------- Section index sidebar ---------- */
const sectionNum = document.getElementById('sectionNum');
const sectionName = document.getElementById('sectionName');
gsap.utils.toArray('[data-section]').forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top 30%',
    end: 'bottom 30%',
    onEnter: () => updateSection(sec),
    onEnterBack: () => updateSection(sec),
  });
});
function updateSection(sec) {
  if (!sectionNum) return;
  sectionNum.textContent = sec.dataset.section;
  sectionName.textContent = sec.dataset.sectionName;
}

/* ---------- Nav hide on scroll down ---------- */
let lastScroll = 0;
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top top', end: 'max',
  onUpdate(self) {
    const y = self.scroll();
    if (y > 200 && y > lastScroll) {
      gsap.to(nav, { yPercent: -130, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(nav, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
    }
    lastScroll = y;
  },
});

/* ---------- Smooth anchor scroll via Lenis ---------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target && lenis) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0, duration: 1.6 });
      }
    }
  });
});

/* ---------- Refresh on resize ---------- */
let resizeT;
window.addEventListener('resize', () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => ScrollTrigger.refresh(), 200);
});

/* ---------- Console signature ---------- */
console.log('%cSINGH / STUDIOS', 'font-family: Anton, sans-serif; font-size: 28px; color: #d4ff00; background: #050505; padding: 8px 14px;');
console.log('%cBuilt by night. Shipped from Delhi.', 'font-family: monospace; color: #6b6b66;');
