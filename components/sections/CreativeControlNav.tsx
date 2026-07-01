"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { CREATIVE_BLOCKS, type CreativeIcon } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { useAmbientMotion } from "@/lib/hooks";

/* ---------- icon set (camera / drone / creator gear) ---------- */
const ICONS: Record<CreativeIcon, React.ReactNode> = {
  overview: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3M20 12h-3M12 20v-3M4 12h3" />
    </>
  ),
  videos: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </>
  ),
  drone: (
    <>
      <circle cx="5" cy="6" r="2.4" />
      <circle cx="19" cy="6" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <rect x="9.5" y="10.5" width="5" height="3" rx="1" />
      <path d="M7 7.4l2.6 3M17 7.4l-2.6 3M7 16.6l2.6-3M17 16.6l-2.6-3" />
    </>
  ),
  photo: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8 7l1.5-2.5h5L16 7" />
      <circle cx="12" cy="13.5" r="3.2" />
    </>
  ),
  reels: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <path d="M10.5 9.5v5l4-2.5z" />
    </>
  ),
  gear: (
    <>
      <path d="M4 8h4M4 12h10M4 16h6" />
      <circle cx="11" cy="8" r="2" />
      <circle cx="17" cy="12" r="2" />
      <circle cx="13" cy="16" r="2" />
    </>
  ),
  contact: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
};

export function ControlIcon({
  name,
  className = "h-[18px] w-[18px]",
}: {
  name: CreativeIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/* ---------- decorative device screw ---------- */
function Screw({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-2 w-2 rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #4a4a4a, #161616 70%)",
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,0.25), 0 1px 1px rgba(0,0,0,0.6)",
      }}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1/2 h-px w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black/50" />
    </span>
  );
}

export function CreativeControlNav() {
  const [active, setActive] = useState(CREATIVE_BLOCKS[0].id);
  const reduce = !useAmbientMotion();

  // 3D tilt on pointer (desktop only)
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  function handleMove(e: React.PointerEvent) {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 5);
    rx.set(-py * 5);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  // scroll-spy across the creative sub-blocks
  useEffect(() => {
    const ids = CREATIVE_BLOCKS.map((b) => b.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.3, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function go(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      style={{ perspective: 1200 }}
      className="mt-10"
    >
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-[1.4rem] border border-white/10 p-2.5 sm:p-3"
      >
        {/* graphite device body */}
        <div
          className="absolute inset-0 rounded-[1.4rem]"
          style={{
            background:
              "linear-gradient(150deg, #202022 0%, #141416 42%, #0a0a0b 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6), 0 30px 60px -30px rgba(0,0,0,0.9)",
          }}
        />
        {/* brushed-metal sheen + slow light sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.4rem]">
          <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(115deg,#fff_0px,#fff_1px,transparent_1px,transparent_4px)]" />
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="absolute -inset-y-8 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-30%", "360%"] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 3,
              }}
            />
          )}
        </div>

        {/* corner screws */}
        <Screw className="left-2 top-2" />
        <Screw className="right-2 top-2" />
        <Screw className="bottom-2 left-2" />
        <Screw className="bottom-2 right-2" />

        {/* top status strip */}
        <div className="relative z-10 mb-2 flex items-center justify-between px-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/70" />
              )}
              <span className="relative h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-red-400/90">
              REC
            </span>
            <span className="hidden font-mono text-[0.62rem] tracking-widest text-mist-500 sm:inline">
              CREATIVE · CTRL
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {/* signal bars */}
            <span className="flex items-end gap-[2px]" aria-hidden="true">
              {[3, 5, 7, 9].map((hgt, i) => (
                <motion.span
                  key={hgt}
                  className="w-[2px] rounded-sm bg-accent/70"
                  style={{ height: hgt }}
                  animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.18,
                  }}
                />
              ))}
            </span>
            <span className="font-mono text-[0.62rem] tracking-widest text-mist-500">
              4K
            </span>
            {/* battery */}
            <span
              className="flex h-3 w-6 items-center rounded-[3px] border border-white/25 p-[1.5px]"
              aria-hidden="true"
            >
              <span className="h-full w-3/4 rounded-[1px] bg-accent/70" />
            </span>
          </div>
        </div>

        {/* key row */}
        <nav
          aria-label="Creative section navigation"
          className="relative z-10 flex gap-1.5 overflow-x-auto rounded-[1rem] bg-black/30 p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          {CREATIVE_BLOCKS.map((b) => {
            const on = active === b.id;
            return (
              <a
                key={b.id}
                href={`#${b.id}`}
                onClick={(e) => go(e, b.id)}
                aria-current={on ? "true" : undefined}
                className={`group relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-300 ${
                  on
                    ? "text-mist-100"
                    : "text-mist-400 hover:text-mist-100"
                }`}
              >
                {/* active key well */}
                {on && (
                  <motion.span
                    layoutId="creative-key"
                    className="absolute inset-0 -z-10 rounded-xl border border-white/10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(60,60,64,0.9), rgba(28,28,30,0.9))",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 10px -4px rgba(0,0,0,0.8)",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                {/* hover light sweep on key */}
                <span className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-xl">
                  <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-white/5 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
                </span>

                <span
                  className={`transition-colors duration-300 ${
                    on ? "text-accent" : "text-mist-500 group-hover:text-accent/80"
                  }`}
                >
                  <ControlIcon name={b.icon} />
                </span>
                <span className="whitespace-nowrap font-medium">{b.label}</span>

                {/* active REC dot */}
                <span
                  className={`relative ml-0.5 h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    on
                      ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
                      : "bg-white/15"
                  }`}
                >
                  {on && !reduce && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-500/70" />
                  )}
                </span>

                {/* active underline */}
                {on && (
                  <motion.span
                    layoutId="creative-underline"
                    className="absolute -bottom-[3px] left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-red-500/40 via-red-500 to-red-500/40"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </motion.div>
    </motion.div>
  );
}
