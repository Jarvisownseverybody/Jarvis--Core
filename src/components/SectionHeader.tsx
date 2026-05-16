import { motion } from "framer-motion";

interface Props {
  chapter: string;
  eyebrow: string;
  titlePre: string;
  titleItalic: string;
  titlePost?: string;
  subtext: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function SectionHeader({
  chapter,
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
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-20"
    >
      {/* Left: chapter index */}
      <div className="col-span-12 md:col-span-2">
        <div className="mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted">
          <div className="text-text-primary mb-1">{chapter}</div>
          <div className="h-px w-10 bg-stroke" />
          <div className="mt-2">{eyebrow}</div>
        </div>
      </div>

      {/* Title */}
      <div className="col-span-12 md:col-span-7">
        <h2 className="display-massive text-text-primary" style={{ fontSize: "clamp(40px, 6.5vw, 110px)" }}>
          {titlePre} <span className="font-display italic font-normal normal-case">{titleItalic}</span>
          {titlePost ? ` ${titlePost}` : ""}
        </h2>
      </div>

      {/* Right: subtext + CTA */}
      <div className="col-span-12 md:col-span-3 flex flex-col gap-6 md:items-end md:text-right">
        <p className="mono text-xs uppercase tracking-[0.18em] text-muted leading-relaxed max-w-xs">
          {subtext}
        </p>
        {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.2em] text-text-primary self-start md:self-end border-b border-stroke pb-1 hover:border-text-primary transition-colors"
          >
            {ctaLabel}
            <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        )}
      </div>
    </motion.header>
  );
}
