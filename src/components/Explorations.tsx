import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const LEFT = [
  { img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1000&q=80&auto=format&fit=crop", rot: -3 },
  { img: "https://images.unsplash.com/photo-1485518882345-15568b007407?w=1000&q=80&auto=format&fit=crop", rot: 2 },
  { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80&auto=format&fit=crop", rot: -2 },
];

const RIGHT = [
  { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80&auto=format&fit=crop", rot: 3 },
  { img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=80&auto=format&fit=crop", rot: -2 },
  { img: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=1000&q=80&auto=format&fit=crop", rot: 4 },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Pin centered text
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax columns
      const leftItems = gsap.utils.toArray<HTMLElement>(".explore-left-item");
      const rightItems = gsap.utils.toArray<HTMLElement>(".explore-right-item");

      leftItems.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 120 + i * 60 },
          {
            y: -160 - i * 40,
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
          { y: 240 - i * 40 },
          {
            y: -100 + i * 40,
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
      className="relative min-h-[300vh] bg-bg overflow-hidden"
    >
      {/* Layer 1: pinned center */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen w-full flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
          <span className="w-8 h-px bg-stroke" />
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary leading-[1.02]">
          Visual <span className="italic">playground</span>
        </h2>
        <p className="mt-6 text-sm md:text-base text-muted max-w-md">
          Fragments from the cutting room — sketches, swatches, and the textures that shape every
          season.
        </p>
        <a
          href="#"
          className="group relative mt-10 inline-flex items-center rounded-full"
        >
          <span
            className="pointer-events-none absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/60 text-text-primary text-sm px-5 py-2.5 transition-colors duration-300 group-hover:border-transparent">
            See the archive
            <span className="text-[11px]">→</span>
          </span>
        </a>
      </div>

      {/* Layer 2: parallax columns */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12 grid grid-cols-2 gap-12 md:gap-40 items-center">
          <div ref={leftColRef} className="flex flex-col gap-24 md:gap-40 items-start">
            {LEFT.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                style={{ transform: `rotate(${it.rot}deg)` }}
                className="explore-left-item group pointer-events-auto relative aspect-square w-full max-w-[260px] md:max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface"
              >
                <img
                  src={it.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 halftone opacity-15 mix-blend-multiply" />
              </button>
            ))}
          </div>

          <div ref={rightColRef} className="flex flex-col gap-24 md:gap-40 items-end">
            {RIGHT.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                style={{ transform: `rotate(${it.rot}deg)` }}
                className="explore-right-item group pointer-events-auto relative aspect-square w-full max-w-[260px] md:max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface"
              >
                <img
                  src={it.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 halftone opacity-15 mix-blend-multiply" />
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
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md grid place-items-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={lightbox}
              alt=""
              className="max-h-[88vh] max-w-[90vw] rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 h-10 w-10 grid place-items-center rounded-full border border-white/20 text-white/90 hover:bg-white/10"
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
