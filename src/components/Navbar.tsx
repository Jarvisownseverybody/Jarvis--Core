import { useEffect, useState } from "react";
import { cn, scrollToId } from "../lib/utils";

const links = [
  { label: "Home", id: "hero" },
  { label: "Collection", id: "works" },
  { label: "Journal", id: "journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const ids = ["hero", "works", "journal", "explorations", "contact"];
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={cn(
          "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow duration-300",
          scrolled && "shadow-md shadow-black/10",
        )}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToId("hero")}
          className="group relative h-9 w-9 rounded-full p-[2px] transition-transform hover:scale-110"
          aria-label="Atlas & Co."
        >
          <span className="absolute inset-0 rounded-full accent-gradient-animated transition-all duration-500 group-hover:[animation-direction:reverse]" />
          <span className="relative grid h-full w-full place-items-center rounded-full bg-bg">
            <span className="font-display italic text-[13px] text-text-primary leading-none">A</span>
          </span>
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        <ul className="flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollToId(l.id)}
                className={cn(
                  "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200",
                  active === l.id
                    ? "text-text-primary bg-stroke/50"
                    : "text-muted hover:text-text-primary hover:bg-stroke/50",
                )}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("contact");
          }}
          className="group relative inline-flex items-center rounded-full ml-0.5"
        >
          <span
            className="pointer-events-none absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface backdrop-blur-md text-text-primary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
            Say hi
            <span className="text-[10px]">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
