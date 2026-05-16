import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["SINGH", "STUDIOS", "// DROP 001"];

export default function MassiveReveal() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !stage.current) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".mr-line > span");
      const subs = gsap.utils.toArray<HTMLElement>(".mr-sub");

      // Initial state
      gsap.set(lines, { yPercent: 110, rotate: 0.001 });
      gsap.set(subs, { opacity: 0, y: 24 });

      // Pin + scrub reveal each line
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: stage.current,
          pinSpacing: true,
          anticipatePin: 1,
        },
        defaults: { ease: "expo.out" },
      });

      tl.to(lines[0], { yPercent: 0, duration: 1 })
        .to(lines[1], { yPercent: 0, duration: 1 }, "-=0.35")
        .to(lines[2], { yPercent: 0, duration: 1 }, "-=0.35")
        .to(subs[0], { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(subs[1], { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        // Hold, then ghost-out so the next section feels earned
        .to({}, { duration: 0.8 })
        .to([".mr-line > span", ".mr-sub", ".mr-meta"], {
          opacity: 0.18,
          duration: 0.6,
          stagger: 0.04,
          ease: "power1.in",
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-bg" id="manifest">
      <div
        ref={stage}
        className="relative h-[100svh] w-full flex flex-col justify-center overflow-hidden"
      >
        {/* Grid hairlines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-6 md:left-10 lg:left-16 w-px bg-stroke" />
          <div className="absolute inset-y-0 right-6 md:right-10 lg:right-16 w-px bg-stroke" />
        </div>

        {/* Top meta bar */}
        <div className="mr-meta absolute top-6 md:top-10 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 flex items-center justify-between text-[10px] md:text-xs mono uppercase text-muted">
          <span>// chapter 01 — manifest</span>
          <span className="hidden md:inline">no compromise, no apology</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        {/* Massive lines */}
        <div className="px-6 md:px-10 lg:px-16">
          <h2 className="display-massive text-text-primary select-none">
            {LINES.map((l, i) => (
              <span key={i} className="mr-line reveal-line" style={{ fontSize: "clamp(60px, 16vw, 320px)" }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* Sub lines */}
        <div className="absolute bottom-10 md:bottom-14 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="mr-sub max-w-md text-sm md:text-base text-text-primary/85 font-display italic leading-snug">
            Drop 001 is a closed circle — twelve pieces, cut in a back room, shipped until they're gone.
          </p>
          <div className="mr-sub flex items-center gap-3 text-[10px] md:text-xs mono uppercase text-muted">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-soft" />
            </span>
            <span>live // restocks paused</span>
          </div>
        </div>
      </div>
    </section>
  );
}
