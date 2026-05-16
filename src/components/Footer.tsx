import { useEffect, useRef } from "react";
import gsap from "gsap";
import Hls from "hls.js";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Substack", href: "#" },
  { label: "Are.na", href: "#" },
  { label: "Email", href: "mailto:hello@singhstudios.com" },
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
        duration: 42,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-stroke">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-y-[-1] opacity-50"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay" />

      <div className="relative z-10">
        {/* Marquee */}
        <div ref={marqueeRef} className="overflow-hidden py-6 md:py-10 border-y border-stroke">
          <div className="marquee-track flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center display-massive text-text-primary px-8"
                style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
              >
                SINGH STUDIOS
                <span className="mx-8 inline-block h-3 w-3 bg-text-primary align-middle" />
                DROP 001
                <span className="mx-8 inline-block h-3 w-3 bg-text-primary align-middle" />
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12 md:pb-20 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-2 mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted">
            CH. 06
            <div className="h-px w-10 bg-stroke my-1" />
            CONTACT
          </div>

          <div className="col-span-12 md:col-span-7">
            <h3 className="display-massive text-text-primary leading-[0.92]" style={{ fontSize: "clamp(36px, 6vw, 96px)" }}>
              Want in on <span className="font-display italic font-normal normal-case">drop 001?</span>
            </h3>
            <p className="mt-6 text-sm md:text-base text-muted max-w-md">
              Reply to the next dispatch and you're in line. We ship until the count hits zero, then it's gone.
            </p>

            <a
              href="mailto:hello@singhstudios.com"
              className="group mt-8 inline-flex items-center gap-3 bg-text-primary text-bg mono text-xs uppercase tracking-[0.2em] px-7 py-4 hover:bg-text-primary/85 transition-colors"
            >
              hello@singhstudios.com
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          <div className="col-span-12 md:col-span-3 md:text-right mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted flex flex-col gap-3">
            <span className="text-text-primary">// elsewhere</span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-text-primary transition-colors inline-flex md:justify-end items-center gap-2"
              >
                {s.label} <span className="text-[9px]">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer bar */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 pt-6 border-t border-stroke flex flex-col md:flex-row items-center justify-between gap-4 mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-soft" />
            </span>
            <span>live // drop 001 open</span>
          </div>
          <div>SINGH STUDIOS — DROP 001 — MMXXVI</div>
          <div>Designed in the back room.</div>
        </div>
      </div>
    </footer>
  );
}
