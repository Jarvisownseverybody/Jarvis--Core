import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  "MUMBAI",
  "PARIS",
  "TOKYO",
  "NEW YORK",
  "SEOUL",
  "LONDON",
  "ANTWERP",
  "BERLIN",
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".cities-track", {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-bg py-4 md:py-5 border-y border-stroke overflow-hidden"
    >
      <div className="cities-track flex whitespace-nowrap will-change-transform">
        {Array.from({ length: 6 }).map((_, dup) => (
          <div key={dup} className="flex shrink-0">
            {ITEMS.map((c) => (
              <span
                key={c + dup}
                className="inline-flex items-center mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-text-primary/80 px-8"
              >
                {c}
                <span className="ml-8 inline-block h-1 w-1 bg-text-primary/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
