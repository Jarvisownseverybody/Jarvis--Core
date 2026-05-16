import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

const PIECES = [
  {
    title: "Tailored Outerwear",
    season: "AW '25",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1600&q=80&auto=format&fit=crop",
  },
  {
    title: "Knitwear Series",
    season: "Heritage",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Denim Archive",
    season: "Reissue No. 4",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Resort Edit",
    season: "Capsule '26",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80&auto=format&fit=crop",
  },
];

export default function SelectedWorks() {
  return (
    <section id="works" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="The Collection"
          titlePre="Featured"
          titleItalic="pieces"
          subtext="Garments cut from honest materials — each piece refined through generations of craft."
          ctaLabel="View all pieces"
          ctaHref="#"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PIECES.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl ${p.span} ${p.aspect}`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover ease-out group-hover:scale-105"
                style={{ transition: "transform 1200ms" }}
              />
              <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />

              {/* Persistent corner label */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-text-primary/80">
                <span>{p.season}</span>
                <span className="text-text-primary/60">No. {String(i + 1).padStart(2, "0")}</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-bg/55 backdrop-blur-lg">
                <div className="relative inline-flex items-center rounded-full">
                  <span className="absolute -inset-[2px] rounded-full accent-gradient-animated" />
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2 text-bg text-xs uppercase tracking-[0.2em]">
                    View — <span className="font-display italic text-sm normal-case">{p.title}</span>
                  </span>
                </div>
              </div>

              {/* Bottom title (visible at rest) */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 transition-opacity duration-500 group-hover:opacity-0">
                <h3 className="font-display italic text-2xl md:text-3xl text-text-primary leading-tight">
                  {p.title}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-text-primary/60">
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
