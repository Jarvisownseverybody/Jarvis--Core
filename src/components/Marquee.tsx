import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  "Milan",
  "Tokyo",
  "New York",
  "Paris",
  "Copenhagen",
  "Seoul",
  "London",
  "Antwerp",
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".cities-track", {
        xPercent: -50,
        duration: 35,
        ease: "none",
        repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-bg py-6 border-y border-stroke/60 overflow-hidden"
    >
      <div className="cities-track flex whitespace-nowrap will-change-transform">
        {Array.from({ length: 6 }).map((_, dup) => (
          <div key={dup} className="flex shrink-0">
            {ITEMS.map((c) => (
              <span
                key={c + dup}
                className="inline-flex items-center text-xs uppercase tracking-[0.3em] text-muted px-8"
              >
                {c}
                <span className="ml-8 inline-block h-1 w-1 rounded-full bg-stroke" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
