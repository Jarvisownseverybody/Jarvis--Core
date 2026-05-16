import { lenisScrollTo } from "./SmoothScroll";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id: string) {
  lenisScrollTo(`#${id}`, { offset: 0 });
}
