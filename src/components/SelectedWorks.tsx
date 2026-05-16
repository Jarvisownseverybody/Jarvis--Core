import SectionHeader from "./SectionHeader";
import ParallaxImage from "./ParallaxImage";
import { motion } from "framer-motion";

const PIECES = [
  {
    id: "01",
    title: "Black Coat",
    subtitle: "Heavyweight wool, single-cut",
    edition: "ED. 24 / 24",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1600&q=80&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Raw Denim",
    subtitle: "Selvedge, Japan-milled",
    edition: "ED. 36 / 36",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Heavyweight Knit",
    subtitle: "Merino, hand-finished",
    edition: "ED. 18 / 18",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Tech Shell",
    subtitle: "3-layer, taped, matte",
    edition: "ED. 12 / 12",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80&auto=format&fit=crop",
  },
];

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-16 md:py-28">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          chapter="CH. 02"
          eyebrow="The Drop"
          titlePre="Twelve"
          titleItalic="pieces."
          subtext="Cut, stitched, photographed in the back room. No restock when the count hits zero."
          ctaLabel="See the manifest"
          ctaHref="#"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PIECES.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              className={`group relative bg-surface border border-stroke ${p.span} ${p.aspect}`}
            >
              <ParallaxImage src={p.img} alt={p.title} className="absolute inset-0 h-full w-full" intensity={12} />

              {/* Persistent meta */}
              <div className="absolute top-4 md:top-5 left-4 md:left-5 right-4 md:right-5 flex items-center justify-between mono text-[10px] md:text-xs uppercase text-text-primary/85 tracking-[0.2em] z-10">
                <span>// {p.id}</span>
                <span className="text-text-primary/65">{p.edition}</span>
              </div>

              {/* Hover wash */}
              <div className="absolute inset-0 z-10 grid place-items-center bg-bg/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="inline-flex items-center gap-2 bg-text-primary text-bg mono text-[10px] md:text-xs uppercase tracking-[0.25em] px-5 py-3">
                  view piece <span className="font-display italic text-sm normal-case tracking-normal">{p.title}</span>
                </div>
              </div>

              {/* Bottom title — visible at rest */}
              <div className="absolute bottom-4 md:bottom-5 left-4 md:left-5 right-4 md:right-5 z-10 flex items-end justify-between gap-4 transition-opacity duration-500 group-hover:opacity-0">
                <div>
                  <h3 className="display-massive text-text-primary text-2xl md:text-4xl leading-[0.95]">
                    {p.title}
                  </h3>
                  <p className="mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-primary/65 mt-2">
                    {p.subtitle}
                  </p>
                </div>
                <span className="mono text-[10px] uppercase tracking-[0.25em] text-text-primary/70 shrink-0">
                  ↗
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
