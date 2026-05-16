import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  type LenisInstance = {
    raf: (time: number) => void;
    on: (event: string, cb: () => void) => void;
    destroy: () => void;
    start: () => void;
    stop: () => void;
    scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
  };
  interface Window {
    Lenis?: new (opts?: Record<string, unknown>) => LenisInstance;
    __lenis?: LenisInstance;
  }
}

/**
 * Mounts Lenis (loaded via the CDN script in index.html) and wires it to
 * GSAP's ticker + ScrollTrigger so pinned/scrub animations stay in lockstep.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      const LenisCtor = window.Lenis;
      if (!LenisCtor) {
        window.setTimeout(init, 40);
        return;
      }

      const lenis = new LenisCtor({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.1,
        lerp: 0.1,
      });
      window.__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (window.__lenis) {
        window.__lenis.destroy();
        window.__lenis = undefined;
      }
    };
  }, []);

  return null;
}

export function lenisScrollTo(target: string | HTMLElement | number, opts?: Record<string, unknown>) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2, ...opts });
  } else if (typeof target === "string") {
    const el = document.querySelector(target) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth" });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: "smooth" });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
