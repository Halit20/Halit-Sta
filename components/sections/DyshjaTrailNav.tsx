"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useAmbientMotion } from "@/lib/hooks";

/**
 * DyshjaTrailNav — an expedition trail map as navigation.
 *
 * Where the Creative section gets a camera control deck, Dyshja n'Natyrë
 * gets a hiking route: waypoints connected by a dashed trail, a compass,
 * and topographic contour lines. The active waypoint is "the camp you're
 * at" while scrolling through the section.
 */

type Waypoint = {
  id: string;
  num: string;
  label: string;
  icon: React.ReactNode;
};

const WAYPOINTS: Waypoint[] = [
  {
    id: "dyshja-basecamp",
    num: "01",
    label: "Basecamp",
    // tent
    icon: <path d="M12 4 3 20h18L12 4zm0 6 4.5 10M12 10l-4.5 10" />,
  },
  {
    id: "dyshja-route",
    num: "02",
    label: "The Route",
    // winding trail with waypoints
    icon: (
      <>
        <path d="M5 20c6 0 2-7 7-7s2-7 7-7" strokeDasharray="2.5 2.5" />
        <circle cx="5" cy="20" r="1.6" />
        <circle cx="19" cy="6" r="1.6" />
      </>
    ),
  },
  {
    id: "dyshja-pack",
    num: "03",
    label: "The Pack",
    // backpack
    icon: (
      <>
        <path d="M8 7a4 4 0 0 1 8 0v13H8V7z" />
        <path d="M8 12h8M10 7V5.5a2 2 0 0 1 4 0V7M8 16h8" />
      </>
    ),
  },
  {
    id: "dyshja-episodes",
    num: "04",
    label: "Episodes",
    // film camera
    icon: (
      <>
        <rect x="3" y="7" width="13" height="11" rx="2" />
        <path d="M16 11l5-3v9l-5-3z" />
      </>
    ),
  },
  {
    id: "dyshja-summit",
    num: "05",
    label: "Summit",
    // flag on a peak
    icon: (
      <>
        <path d="M4 20l6-11 4 6 2-3 4 8H4z" />
        <path d="M10 9V4h5l-1.5 1.5L15 7h-5" />
      </>
    ),
  },
];

function Compass({ reduce }: { reduce: boolean }) {
  return (
    <span
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/12"
      style={{
        background:
          "radial-gradient(circle at 40% 35%, rgba(40,38,32,0.9), rgba(10,10,10,0.95))",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px -6px rgba(0,0,0,0.8)",
      }}
      aria-hidden="true"
    >
      {/* cardinal ticks */}
      {[0, 90, 180, 270].map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 h-[13px] w-px bg-white/25"
          style={{
            transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-11px) scaleY(0.28)`,
          }}
        />
      ))}
      <span className="absolute top-[3px] font-mono text-[0.45rem] font-semibold text-accent/90">
        N
      </span>
      {/* needle — gentle wander, like a hand-held compass */}
      <motion.span
        className="relative h-[18px] w-[3px]"
        animate={reduce ? undefined : { rotate: [-24, 18, -10, 24, -24] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background: "linear-gradient(180deg, #d6a544, #a87c2c)",
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          }}
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: "rgba(255,255,255,0.35)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
        />
      </motion.span>
      <span className="absolute h-1 w-1 rounded-full bg-mist-100/90 shadow-[0_0_4px_rgba(0,0,0,0.8)]" />
    </span>
  );
}

export function DyshjaTrailNav() {
  const [active, setActive] = useState(WAYPOINTS[0].id);
  const reduce = !useAmbientMotion();

  // scroll-spy across the expedition stages
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    WAYPOINTS.forEach((w) => {
      const el = document.getElementById(w.id);
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

  const activeIndex = WAYPOINTS.findIndex((w) => w.id === active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mt-12"
    >
      <div className="relative overflow-hidden border border-white/10 px-4 pb-5 pt-3 sm:px-6">
        {/* night-map body */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(150deg, #17140e 0%, #0d0c09 45%, #080807 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -30px rgba(0,0,0,0.9)",
          }}
        />
        {/* topographic contour lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]"
          viewBox="0 0 900 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M-20 ${118 - i * 16} C 150 ${70 - i * 14}, 260 ${150 - i * 10}, 430 ${96 - i * 15} S 740 ${150 - i * 12}, 920 ${72 - i * 14}`}
              fill="none"
              stroke="#d6a544"
              strokeWidth="1"
            />
          ))}
        </svg>
        {/* faint grid like a map sheet */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,#fff_0px,#fff_1px,transparent_1px,transparent_56px),repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_56px)]" />

        {/* header strip: expedition log + compass */}
        <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent/90">
              Expedition · Log
            </span>
            <span className="hidden font-mono text-[0.62rem] tracking-widest text-mist-500 sm:inline">
              DYSHJA N&apos;NATYRË
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[0.62rem] tracking-widest text-mist-500 sm:inline">
              STAGE 0{activeIndex + 1}/0{WAYPOINTS.length}
            </span>
            <Compass reduce={reduce} />
          </div>
        </div>

        {/* the trail */}
        <nav
          aria-label="Dyshja n'Natyrë section navigation"
          className="relative z-10 flex items-start gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {WAYPOINTS.map((w, i) => {
            const on = active === w.id;
            const passed = i < activeIndex;
            return (
              <div key={w.id} className="flex flex-1 items-start">
                {/* dashed trail segment before every stop except the first */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="mt-[21px] h-px min-w-6 flex-1 border-t border-dashed transition-colors duration-500"
                    style={{
                      borderColor:
                        i <= activeIndex
                          ? "rgba(214,165,68,0.55)"
                          : "rgba(255,255,255,0.14)",
                    }}
                  />
                )}
                <a
                  href={`#${w.id}`}
                  onClick={(e) => go(e, w.id)}
                  aria-current={on ? "true" : undefined}
                  className="group flex shrink-0 flex-col items-center gap-2 px-2 sm:px-3"
                >
                  {/* waypoint marker */}
                  <span className="relative flex h-[42px] w-[42px] items-center justify-center">
                    {on && (
                      <motion.span
                        layoutId="dyshja-camp-ring"
                        className="absolute inset-0 rounded-full border border-accent/70"
                        style={{
                          boxShadow:
                            "0 0 18px -4px rgba(214,165,68,0.6), inset 0 0 10px -6px rgba(214,165,68,0.6)",
                        }}
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                        on
                          ? "border-accent/60 bg-accent/10 text-accent"
                          : passed
                            ? "border-accent/30 bg-white/[0.02] text-accent/60"
                            : "border-white/12 bg-white/[0.02] text-mist-500 group-hover:border-white/30 group-hover:text-mist-200"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-[17px] w-[17px]"
                        aria-hidden="true"
                      >
                        {w.icon}
                      </svg>
                    </span>
                  </span>
                  {/* label */}
                  <span className="flex flex-col items-center gap-0.5">
                    <span
                      className={`font-mono text-[0.55rem] tracking-[0.2em] transition-colors duration-300 ${
                        on ? "text-accent/80" : "text-mist-600"
                      }`}
                    >
                      {w.num}
                    </span>
                    <span
                      className={`whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                        on
                          ? "text-mist-100"
                          : "text-mist-500 group-hover:text-mist-200"
                      }`}
                    >
                      {w.label}
                    </span>
                  </span>
                </a>
              </div>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}
