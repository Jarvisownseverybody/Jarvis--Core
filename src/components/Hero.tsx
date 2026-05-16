import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hls from "hls.js";
import { scrollToId } from "../lib/utils";

const ROLES = ["CUT", "STITCHED", "WORN", "OWNED"];
const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
    video.play().catch(() => {});
    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-line > span",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.08, delay: 0.1 },
      );
      tl.fromTo(
        ".blur-in",
        { opacity: 0, y: 16, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.08 },
        "-=0.7",
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

      {/* Side hairlines */}
      <div className="pointer-events-none absolute inset-y-0 left-6 md:left-10 lg:left-16 w-px bg-stroke/70" />
      <div className="pointer-events-none absolute inset-y-0 right-6 md:right-10 lg:right-16 w-px bg-stroke/70" />

      {/* Top corners */}
      <div className="absolute top-24 md:top-28 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 z-10 flex items-start justify-between mono text-[10px] md:text-xs uppercase text-muted tracking-[0.18em]">
        <span>
          <span className="text-text-primary">// </span>SINGH STUDIOS
        </span>
        <span className="hidden md:inline">N 41° 53′ — E 12° 29′ // Milano</span>
        <span>FW · 26</span>
      </div>

      {/* Content: bottom-aligned brutalist */}
      <div className="absolute inset-x-0 bottom-24 md:bottom-28 px-6 md:px-10 lg:px-16 z-10">
        <p className="blur-in mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-primary/80 mb-4 md:mb-6">
          // DROP 001 — twelve pieces
        </p>

        <h1 className="display-massive text-text-primary leading-[0.86]" style={{ fontSize: "clamp(54px, 11vw, 220px)" }}>
          <span className="reveal-line hero-line"><span>SINGH</span></span>
          <span className="reveal-line hero-line"><span>STUDIOS</span></span>
        </h1>

        <div className="blur-in mt-6 md:mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-sm md:text-base text-text-primary/85 leading-relaxed">
            <span className="font-display italic text-text-primary text-lg md:text-xl">
              {ROLES[roleIndex]}
            </span>{" "}
            <span className="text-muted">in a back room, shipped until they're gone. No restock, no apology.</span>
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("works")}
              className="group inline-flex items-center gap-3 bg-text-primary text-bg mono text-xs uppercase tracking-[0.18em] px-6 py-4 hover:bg-text-primary/85 transition-colors"
            >
              View the drop
              <span className="text-[10px]">→</span>
            </button>
            <button
              onClick={() => scrollToId("contact")}
              className="group inline-flex items-center gap-3 border border-text-primary text-text-primary mono text-xs uppercase tracking-[0.18em] px-6 py-4 hover:bg-text-primary hover:text-bg transition-colors"
            >
              Be notified
              <span className="text-[10px]">↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="mono text-[10px] text-muted uppercase tracking-[0.25em]">scroll</span>
        <div className="relative w-px h-8 bg-stroke overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
