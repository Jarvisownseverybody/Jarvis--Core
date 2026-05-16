import { useEffect, useRef } from "react";
import gsap from "gsap";
import Hls from "hls.js";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Substack", href: "#" },
  { label: "Email", href: "mailto:hello@atlasandco.studio" },
];

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(v);
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = HLS_SRC;
    }
    v.play().catch(() => {});
    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-y-[-1] opacity-60"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 halftone opacity-[0.07] mix-blend-overlay" />

      <div className="relative z-10">
        {/* Marquee */}
        <div ref={marqueeRef} className="overflow-hidden py-6 md:py-10 border-y border-stroke/60">
          <div className="marquee-track flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/80 px-8"
              >
                Building the future
                <span className="mx-8 inline-block h-3 w-3 rounded-full accent-gradient align-middle" />
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12 md:pb-20 text-center">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">
            Stockists &amp; press
          </p>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary leading-[1.05] mb-10">
            Let's build something <span className="italic">timeless</span>.
          </h3>

          <a
            href="mailto:hello@atlasandco.studio"
            className="group relative inline-flex items-center rounded-full"
          >
            <span
              className="pointer-events-none absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative inline-flex items-center gap-3 rounded-full bg-text-primary text-bg text-sm px-8 py-4 transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              hello@atlasandco.studio
              <span className="text-xs">↗</span>
            </span>
          </a>
        </div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/60 flex flex-col md:flex-row items-center justify-between gap-6 text-xs uppercase tracking-[0.25em] text-muted">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-soft" />
              <span className="absolute inset-0 rounded-full bg-emerald-400/70 blur-[3px]" />
            </span>
            <span>Available for stockists — SS '26</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div>© 2026 Atlas &amp; Co.</div>
        </div>
      </div>
    </footer>
  );
}
