import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import ParallaxImage from "./ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

const LEFT = [
  { img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1100&q=80&auto=format&fit=crop", rot: -3 },
  { img: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=1100&q=80&auto=format&fit=crop", rot: 2 },
  { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1100&q=80&auto=format&fit=crop", rot: -2 },
];

const RIGHT = [
  { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1100&q=80&auto=format&fit=crop", rot: 3 },
  { img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1100&q=80&auto=format&fit=crop", rot: -2 },
  { img: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=1100&q=80&auto=format&fit=crop", rot: 4 },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      const leftItems = gsap.utils.toArray<HTMLElement>(".explore-left-item");
      const rightItems = gsap.utils.toArray<HTMLElement>(".explore-right-item");

      leftItems.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 140 + i * 60 },
          {
            y: -180 - i * 40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      rightItems.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 260 - i * 40 },
          {
            y: -120 + i * 40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg overflow-hidden border-t border-stroke"
    >
      {/* Layer 1: pinned text */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen w-full flex flex-col items-center justify-center text-center px-6"
      >
        <div className="mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted mb-6">
          // CH. 04 — CUTTING ROOM
        </div>
        <h2 className="display-massive text-text-primary leading-[0.95]" style={{ fontSize: "clamp(48px, 9vw, 160px)" }}>
          The <span className="font-display italic font-normal normal-case">archive.</span>
        </h2>
        <p className="mt-6 mono text-xs uppercase tracking-[0.2em] text-muted max-w-sm">
          Off-cuts, swatches, the fits that didn't make the drop.
        </p>
      </div>

      {/* Layer 2: parallax columns */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="max-w-[1500px] mx-auto h-full px-6 md:px-12 grid grid-cols-2 gap-10 md:gap-32 items-center">
          <div className="flex flex-col gap-28 md:gap-44 items-start">
            {LEFT.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                style={{ transform: `rotate(${it.rot}deg)` }}
                className="explore-left-item pointer-events-auto w-full max-w-[260px] md:max-w-[320px] border border-stroke bg-surface"
              >
                <ParallaxImage src={it.img} className="aspect-[4/5] w-full" intensity={6} />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-28 md:gap-44 items-end">
            {RIGHT.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                style={{ transform: `rotate(${it.rot}deg)` }}
                className="explore-right-item pointer-events-auto w-full max-w-[260px] md:max-w-[320px] border border-stroke bg-surface"
              >
                <ParallaxImage src={it.img} className="aspect-[4/5] w-full" intensity={6} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-bg/95 backdrop-blur-md grid place-items-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={lightbox}
              alt=""
              className="max-h-[88vh] max-w-[90vw] shadow-2xl border border-stroke"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-10 w-10 grid place-items-center border border-text-primary/30 text-text-primary hover:bg-text-primary hover:text-bg transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
