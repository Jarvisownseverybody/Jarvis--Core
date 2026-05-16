import SectionHeader from "./SectionHeader";
import ParallaxImage from "./ParallaxImage";
import { motion } from "framer-motion";

const ENTRIES = [
  {
    no: "001",
    title: "On Drop 001",
    excerpt: "Why we capped it at twelve and won't restock when the count hits zero.",
    read: "4 MIN",
    date: "MAY 26",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "002",
    title: "Field Notes — Mumbai",
    excerpt: "Two weeks with the cutters and the cloth that became this season.",
    read: "6 MIN",
    date: "APR 26",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "003",
    title: "The Case for Buying Once",
    excerpt: "A single, honest coat outlasts a wardrobe of fast pieces. Math inside.",
    read: "3 MIN",
    date: "MAR 26",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80&auto=format&fit=crop",
  },
  {
    no: "004",
    title: "Cutting Room — June",
    excerpt: "What's on the table for Drop 002, in unvarnished detail.",
    read: "5 MIN",
    date: "FEB 26",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80&auto=format&fit=crop",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-28 border-t border-stroke">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader
          chapter="CH. 03"
          eyebrow="Field Notes"
          titlePre="Letters from"
          titleItalic="the back room."
          subtext="Half journal, half cutting-room diary. No PR, no calendar."
          ctaLabel="All entries"
          ctaHref="#"
        />

        <div className="flex flex-col">
          {ENTRIES.map((e, i) => (
            <motion.a
              href="#"
              key={e.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              className="group grid grid-cols-12 gap-4 md:gap-6 items-center py-5 md:py-7 border-t border-stroke hover:bg-white/[0.02] transition-colors duration-300 px-2 md:px-4 -mx-2 md:-mx-4"
            >
              <div className="col-span-2 md:col-span-1 mono text-xs md:text-sm text-muted">
                /{e.no}
              </div>

              <div className="col-span-10 md:col-span-2">
                <ParallaxImage src={e.img} className="aspect-[3/2] w-full" intensity={10} />
              </div>

              <div className="col-span-12 md:col-span-5">
                <h3 className="font-display text-2xl md:text-3xl text-text-primary leading-tight">
                  {e.title}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">{e.excerpt}</p>
              </div>

              <div className="hidden md:flex col-span-3 items-center justify-end gap-6 mono text-xs uppercase tracking-[0.2em] text-muted">
                <span>{e.read}</span>
                <span className="h-3 w-px bg-stroke" />
                <span>{e.date}</span>
              </div>

              <div className="col-span-12 md:col-span-1 flex justify-end">
                <span className="inline-flex h-9 w-9 md:h-11 md:w-11 items-center justify-center border border-stroke text-text-primary transition-all duration-300 group-hover:bg-text-primary group-hover:text-bg">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
          <div className="border-t border-stroke" />
        </div>
      </div>
    </section>
  );
}
