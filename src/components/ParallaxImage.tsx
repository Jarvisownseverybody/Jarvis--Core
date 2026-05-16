import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  src: string;
  alt?: string;
  className?: string;
  intensity?: number; // % of own height to translate (default 14)
  rounded?: string;
  loading?: "lazy" | "eager";
}

/**
 * Image with scroll-bound parallax + hover zoom.
 * The wrapper is slightly oversized so the parallax never reveals the bg.
 */
export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  intensity = 14,
  rounded = "",
  loading = "lazy",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !wrap.current) return;
    const tween = gsap.fromTo(
      wrap.current,
      { yPercent: -intensity / 2 },
      {
        yPercent: intensity / 2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [intensity, src]);

  return (
    <div
      ref={root}
      className={`relative overflow-hidden group ${rounded} ${className}`}
    >
      <div
        ref={wrap}
        className="absolute will-change-transform"
        style={{ inset: `-${intensity}% 0` }}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          className="absolute inset-0 h-full w-full object-cover ease-out group-hover:scale-[1.06]"
          style={{ transition: "transform 1100ms cubic-bezier(.16,.7,.2,1)" }}
        />
      </div>
      {/* Subtle grain on top of every image */}
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
