import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["CUT", "STITCHED", "DROPPED"];
const DURATION = 2700;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [hide, setHide] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const pct = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setCount(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setHide(true);
          window.setTimeout(onComplete, 600);
        }, 400);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-bg overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Hairlines */}
          <div className="pointer-events-none absolute inset-y-6 left-6 right-6 md:inset-y-10 md:left-10 md:right-10 border-x border-stroke" />

          {/* Top-left mark */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute top-6 left-6 md:top-10 md:left-10 mono text-[10px] md:text-xs text-text-primary uppercase tracking-[0.2em]"
          >
            // SINGH STUDIOS
          </motion.div>

          {/* Top-right drop */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="absolute top-6 right-6 md:top-10 md:right-10 mono text-[10px] md:text-xs text-muted uppercase tracking-[0.2em]"
          >
            DROP 001 — INDEX
          </motion.div>

          {/* Center rotating words */}
          <div className="absolute inset-0 grid place-items-center px-6">
            <div className="relative h-[1.1em] overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block display-massive text-5xl md:text-7xl lg:text-8xl text-text-primary"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Counter bottom-right */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="absolute bottom-12 right-6 md:bottom-16 md:right-10 display-massive text-7xl md:text-9xl text-text-primary tabular-nums leading-none"
          >
            {String(count).padStart(3, "0")}
          </motion.div>

          {/* Bottom-left status */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="absolute bottom-12 left-6 md:bottom-16 md:left-10 mono text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-text-primary animate-pulse-soft" />
            preparing manifest
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-stroke">
            <div
              className="h-full origin-left bg-text-primary"
              style={{
                transform: `scaleX(${count / 100})`,
                transition: "transform 80ms linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
