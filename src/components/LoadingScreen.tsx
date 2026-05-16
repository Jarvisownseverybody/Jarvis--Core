import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Tailored", "Crafted", "Enduring"];
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
          {/* Soft accent glow */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#4E85BF]/25 blur-[140px]" />
            <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#89AACC]/15 blur-[160px]" />
          </div>

          {/* Top-left label */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute top-6 left-6 md:top-10 md:left-10 text-xs text-muted uppercase tracking-[0.3em]"
          >
            Atlas &amp; Co.
          </motion.div>

          {/* Top-right collection mark */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-xs text-muted uppercase tracking-[0.3em]"
          >
            Collection '26
          </motion.div>

          {/* Center rotating words */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-[1.2em] overflow-hidden text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
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
            className="absolute bottom-12 right-6 md:bottom-16 md:right-10 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none"
          >
            {String(count).padStart(3, "0")}
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
            <div
              className="h-full origin-left accent-gradient"
              style={{
                transform: `scaleX(${count / 100})`,
                boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
                transition: "transform 80ms linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
