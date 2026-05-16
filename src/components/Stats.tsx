import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 6, suffix: "", label: "Years on the bench", code: "// 01" },
  { value: 12, suffix: "", label: "Drops shipped", code: "// 02" },
  { value: 144, suffix: "", label: "Pieces hand-finished", code: "// 03" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1700;
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
      {String(n).padStart(2, "0").toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-28 border-t border-stroke">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className={`relative p-8 md:p-10 ${i === 0 ? "" : "md:border-l border-stroke"} ${i < STATS.length - 1 ? "border-b border-stroke md:border-b-0" : ""}`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {s.code}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  CH. 05
                </span>
              </div>
              <div className="display-massive text-text-primary leading-none" style={{ fontSize: "clamp(72px, 11vw, 200px)" }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-6 mono text-xs uppercase tracking-[0.2em] text-text-primary/85">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
