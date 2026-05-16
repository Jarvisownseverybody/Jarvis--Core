import { useEffect, useState } from "react";
import { cn, scrollToId } from "../lib/utils";

const links = [
  { label: "Index", id: "hero" },
  { label: "Manifest", id: "manifest" },
  { label: "Drop", id: "works" },
  { label: "Journal", id: "journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["hero", "manifest", "works", "journal", "explorations", "contact"];
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-3 md:pt-5">
      <div
        className={cn(
          "max-w-[1600px] mx-auto flex items-center justify-between gap-4 px-3 md:px-4 py-2.5 backdrop-blur-md border border-stroke transition-all duration-300",
          scrolled ? "bg-bg/90 shadow-lg shadow-black/40" : "bg-bg/50",
        )}
      >
        {/* Wordmark */}
        <button
          onClick={() => scrollToId("hero")}
          className="flex items-center gap-2.5 group"
          aria-label="SINGH STUDIOS — home"
        >
          <span className="grid h-7 w-7 place-items-center bg-text-primary text-bg display-massive text-base">
            S
          </span>
          <span className="hidden sm:block mono text-[11px] uppercase tracking-[0.18em] text-text-primary group-hover:text-text-primary/80 transition-colors">
            SINGH STUDIOS <span className="text-muted">// DROP 001</span>
          </span>
        </button>

        {/* Nav */}
        <ul className="flex items-center">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollToId(l.id)}
                className={cn(
                  "mono text-[11px] uppercase tracking-[0.18em] px-3 md:px-4 py-2 transition-colors relative",
                  active === l.id
                    ? "text-text-primary"
                    : "text-muted hover:text-text-primary",
                )}
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-text-primary" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("contact");
          }}
          className="group hidden md:inline-flex items-center gap-2 bg-text-primary text-bg mono text-[11px] uppercase tracking-[0.18em] px-4 py-2.5 hover:bg-text-primary/85 transition-colors"
        >
          Buy in
          <span className="text-[10px]">↗</span>
        </a>
      </div>
    </nav>
  );
}
