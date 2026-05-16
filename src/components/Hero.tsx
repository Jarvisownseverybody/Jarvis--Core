import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hls from "hls.js";
import { scrollToId } from "../lib/utils";

const ROLES = ["Tailored", "Considered", "Heritage", "Modern"];
const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS setup
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
    const play = () => video.play().catch(() => {});
    play();
    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      );
      tl.fromTo(
        ".blur-in",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1, delay: -0.7 },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Role cycle
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
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

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 halftone opacity-[0.08] mix-blend-overlay" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          Collection '26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Atlas <span className="text-text-primary/70">&amp;</span> Co.
        </h1>

        <p className="blur-in text-base md:text-lg text-text-primary/90 mb-4">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          house made in Milan.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Crafting timeless garments that honor tradition while embracing the unfiltered honesty of
          modern design.
        </p>

        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToId("works")}
            className="group relative rounded-full transition-transform hover:scale-105"
          >
            <span
              className="pointer-events-none absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative block rounded-full bg-text-primary text-bg px-7 py-3.5 text-sm transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              See Collection
            </span>
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            className="group relative rounded-full transition-transform hover:scale-105"
          >
            <span
              className="pointer-events-none absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative block rounded-full border-2 border-stroke bg-bg text-text-primary px-7 py-3.5 text-sm transition-colors duration-300 group-hover:border-transparent">
              Reach out for stockists
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
