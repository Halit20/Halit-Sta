/** Programmatic anchor scroll that goes through Lenis when it is running. */
export function scrollToId(id: string) {
  if (window.__lenis) {
    window.__lenis.scrollTo(`#${id}`, { offset: -72 });
    return;
  }
  // No Lenis (e.g. prefers-reduced-motion) — fall back to the native scroll.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
