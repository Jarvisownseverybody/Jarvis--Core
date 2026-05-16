import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 12, suffix: "+", label: "Years crafting" },
  { value: 40, suffix: "+", label: "Collections released" },
  { value: 5000, suffix: "+", label: "Pieces hand-finished" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative p-8 md:p-10 rounded-3xl border border-stroke bg-surface/40 overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[#4E85BF]/10 blur-3xl" />
              <div className="text-6xl md:text-7xl lg:text-8xl font-display text-text-primary leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="w-6 h-px bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
