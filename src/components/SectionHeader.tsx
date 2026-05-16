import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  titlePre: string;
  titleItalic: string;
  titlePost?: string;
  subtext: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function SectionHeader({
  eyebrow,
  titlePre,
  titleItalic,
  titlePost,
  subtext,
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">{eyebrow}</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[1.05] text-text-primary mb-4">
          {titlePre}{" "}
          <span className="font-display italic">{titleItalic}</span>
          {titlePost ? ` ${titlePost}` : ""}
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md">{subtext}</p>
      </div>

      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="group relative hidden md:inline-flex items-center rounded-full self-start md:self-end"
        >
          <span
            className="pointer-events-none absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/60 text-text-primary text-sm px-5 py-2.5 transition-colors duration-300 group-hover:border-transparent">
            {ctaLabel}
            <span className="text-[11px] transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </a>
      )}
    </motion.header>
  );
}
