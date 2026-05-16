import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

const ENTRIES = [
  {
    title: "On Patience and Pattern",
    excerpt: "The unglamorous geometry behind a perfect lapel.",
    read: "4 min read",
    date: "May 2026",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Notes from the Mill, Biella",
    excerpt: "A week spent with the people who weave our cloth.",
    read: "6 min read",
    date: "April 2026",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "The Case for One Coat",
    excerpt: "Why a single, considered overcoat outlasts a wardrobe of fast pieces.",
    read: "3 min read",
    date: "March 2026",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Indigo, Slowed Down",
    excerpt: "Six months of natural dye — and the patience the process demands.",
    read: "5 min read",
    date: "February 2026",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Field Notes"
          titlePre="Recent"
          titleItalic="thoughts"
          subtext="Letters from the studio, the mill, and the road."
          ctaLabel="Read the journal"
          ctaHref="#"
        />

        <div className="flex flex-col gap-4">
          {ENTRIES.map((e, i) => (
            <motion.a
              href="#"
              key={e.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              className="group flex items-center gap-4 sm:gap-6 p-3 sm:p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300"
            >
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full">
                <img
                  src={e.img}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg text-text-primary font-medium truncate">
                    {e.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted truncate">{e.excerpt}</p>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted">
                  <span>{e.read}</span>
                  <span className="w-px h-4 bg-stroke" />
                  <span>{e.date}</span>
                </div>
              </div>

              <span className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 grid place-items-center rounded-full border border-stroke bg-bg text-text-primary transition-all duration-300 group-hover:bg-text-primary group-hover:text-bg">
                <span className="text-sm">↗</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
