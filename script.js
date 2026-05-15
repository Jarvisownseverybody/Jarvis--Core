/* =========================================================
   SINGH / STUDIOS — animations
   GSAP + ScrollTrigger + Lenis
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
const loaderBar = loader.querySelector('.loader__bar span');

const loaderTl = gsap.timeline({
  onComplete: () => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    introAnimation();
  },
});

loaderTl
  .to({ v: 0 }, {
    v: 100,
    duration: 2.2,
    ease: 'power2.inOut',
    onUpdate() {
      const v = Math.round(this.targets()[0].v);
      loaderCount.textContent = v;
    },
  })
  .to(loaderBar, { width: '100%', duration: 2.2, ease: 'power2.inOut' }, 0)
  .to(loader, {
    yPercent: -100,
    duration: 1.1,
    ease: 'expo.inOut',
    delay: 0.15,
  });

/* ---------- Custom cursor ---------- */
(function cursor() {
  if (isMobile) return;
  const cursor = document.querySelector('.cursor');
  const ring = cursor.querySelector('.cursor__ring');
  const label = cursor.querySelector('.cursor__label');
  const dot = cursor.querySelector('.cursor__dot');

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pos = { x: mouse.x, y: mouse.y };
  const ringPos = { x: mouse.x, y: mouse.y };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.6;
    pos.y += (mouse.y - pos.y) * 0.6;
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;

    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
    label.style.transform = `translate(${ringPos.x}px, ${ringPos.y + 50}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
      const lbl = el.getAttribute('data-cursor-label');
      if (lbl) {
        label.textContent = lbl;
        cursor.classList.add('is-hover-label');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover', 'is-hover-label');
    });
  });

  document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
})();

/* ---------- Hero intro ---------- */
function introAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from('.nav', {
    yPercent: -100,
    duration: 1.2,
    ease: 'power3.out',
  });

  tl.from('.hero__title .word', {
    yPercent: 110,
    duration: 1.6,
    stagger: 0.1,
    ease: 'expo.out',
  }, 0.05);

  tl.from('.hero__meta, .hero__sub p, .hero__scroll, .hero__counter', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    stagger: 0.08,
    ease: 'power3.out',
  }, 0.6);

  tl.from('.hero__img', {
    scale: 1.25,
    duration: 2.2,
    ease: 'expo.out',
  }, 0);
}

/* ---------- Word reveals on scroll ---------- */
gsap.utils.toArray('.reveal-word').forEach((word, i) => {
  gsap.to(word, {
    y: 0,
    yPercent: 0,
    opacity: 1,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: word,
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
  });
});

/* Set initial state for reveal-word via GSAP (cross-browser safe) */
gsap.set('.reveal-word', { yPercent: 110, opacity: 0 });

/* ---------- Parallax images ---------- */
gsap.utils.toArray('[data-parallax]').forEach((el) => {
  const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
  gsap.fromTo(
    el,
    { yPercent: -speed * 50 },
    {
      yPercent: speed * 50,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
});

/* ---------- Marquee ---------- */
(function marquee() {
  const track = document.querySelector('[data-marquee]');
  if (!track) return;
  const distance = track.scrollWidth / 2;
  gsap.to(track, {
    x: -distance,
    duration: 40,
    ease: 'none',
    repeat: -1,
  });
})();

/* ---------- Pinned horizontal drop ---------- */
(function dropScroll() {
  const pin = document.querySelector('.drop__pin');
  const track = document.getElementById('dropTrack');
  if (!pin || !track || isMobile) return;

  const scrollAmount = () => track.scrollWidth - window.innerWidth + 80;

  gsap.to(track, {
    x: () => -scrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => `+=${scrollAmount()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  /* Cards subtle entry */
  gsap.from('.card', {
    scale: 0.94,
    opacity: 0.5,
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.drop__pin',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
})();

/* ---------- Section titles with split lines ---------- */
gsap.utils.toArray('.drop__title span, .lookbook__title span, .outro__text span:not(.reveal-word)').forEach((el) => {
  gsap.from(el, {
    yPercent: 110,
    opacity: 0,
    duration: 1.1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  });
});

/* ---------- Assistant title words ---------- */
gsap.utils.toArray('.assistant__title span').forEach((el) => {
  gsap.from(el, {
    yPercent: 110,
    opacity: 0,
    duration: 1.1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
  });
});

/* ---------- Generic fade-up for cards, vids, list items ---------- */
const fades = [
  '.manifesto__foot div',
  '.vid',
  '.assistant__copy',
  '.assistant__features li',
  '.assistant__cta',
  '.chat',
  '.footer__cols div',
];
fades.forEach((sel) => {
  gsap.utils.toArray(sel).forEach((el, i) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: i * 0.05,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });
  });
});

/* ---------- Image scale-in on enter ---------- */
gsap.utils.toArray('.card__media img, .vid__media img').forEach((img) => {
  gsap.fromTo(
    img,
    { scale: 1.25 },
    {
      scale: 1,
      duration: 1.6,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      },
    }
  );
});

/* ---------- Quote subtle parallax ---------- */
gsap.to('.quote__text', {
  yPercent: -10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.quote',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});

/* ---------- Nav hide on scroll down, show on up ---------- */
let lastScroll = 0;
const nav = document.querySelector('.nav');
ScrollTrigger.create({
  start: 'top top',
  end: 'max',
  onUpdate(self) {
    const y = self.scroll();
    if (y > 200 && y > lastScroll) {
      gsap.to(nav, { yPercent: -120, duration: 0.5, ease: 'power3.out' });
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
window.addEventListener('resize', () => ScrollTrigger.refresh());

/* ---------- Console signature ---------- */
console.log('%cSINGH / STUDIOS', 'font-family: Anton, sans-serif; font-size: 28px; color: #fff; background: #000; padding: 8px 14px;');
console.log('%cBuilt by night. Shipped from Delhi.', 'font-family: monospace; color: #9a958c;');
