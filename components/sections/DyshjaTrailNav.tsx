"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useAmbientMotion } from "@/lib/hooks";
import { scrollToId } from "@/lib/scroll";

/**
 * DyshjaTrailNav — an expedition trail map as navigation.
 *
 * Where the Creative section gets a camera control deck, Dyshja n'Natyrë
 * gets a hiking route. Two variants:
 *
 *  - "vertical" (desktop): a sticky trail beside the content. A hiker
 *    marker walks down the dashed path as you scroll, the trail behind
 *    it turns gold, and each waypoint lights up as you reach its stage.
 *  - "horizontal" (mobile): the compact night-map panel below the intro.
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

/* ---------- shared bits ---------- */

function WaypointIcon({ w, className }: { w: Waypoint; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-[17px] w-[17px]"}
      aria-hidden="true"
    >
      {w.icon}
    </svg>
  );
}

function Hiker() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
      aria-hidden="true"
    >
      <circle cx="12.5" cy="4.2" r="1.7" />
      {/* torso + backpack */}
      <path d="M12.2 6.5 11 12.2M12.5 7.2l2.6 1 .6 2.8" />
      {/* legs mid-stride */}
      <path d="M11 12.2l-2.6 6.3M11 12.2l3 2.4.7 4" />
      {/* trekking pole */}
      <path d="M15.5 11.5l1.6 7" />
    </svg>
  );
}

function Compass({ reduce, size = 36 }: { reduce: boolean; size?: number }) {
  return (
    <span
      className="relative flex items-center justify-center rounded-full border border-white/12"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 40% 35%, rgba(40,38,32,0.9), rgba(10,10,10,0.95))",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px -6px rgba(0,0,0,0.8)",
      }}
      aria-hidden="true"
    >
      <span className="absolute top-[3px] font-mono text-[0.45rem] font-semibold text-accent/90">
        N
      </span>
      <motion.span
        className="relative w-[3px]"
        style={{ height: size / 2 }}
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

function useTrailSpy() {
  const [active, setActive] = useState(WAYPOINTS[0].id);
  const reduce = !useAmbientMotion();

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
    scrollToId(id);
  }

  return { active, reduce, go };
}

/* ---------- vertical trail (desktop) ---------- */

export function DyshjaTrailRail({
  targetRef,
}: {
  targetRef: RefObject<HTMLDivElement | null>;
}) {
  const { active, reduce, go } = useTrailSpy();
  const activeIndex = WAYPOINTS.findIndex((w) => w.id === active);

  // the hiker walks as the content scrolls through the viewport:
  // progress = how far the viewport's midline has traveled through the
  // content block, tracked manually so it's tied to THIS section only
  const progress = useMotionValue(0);
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const p = (mid - r.top) / Math.max(1, r.height);
      progress.set(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef, progress]);
  const walked = useSpring(progress, { stiffness: 90, damping: 22 });
  const markerTop = useTransform(walked, (v) => `${v * 100}%`);
  const goldLine = useTransform(walked, (v) => `${v * 100}%`);

  return (
    <div className="sticky top-28">
      <div className="relative overflow-hidden border border-white/10 px-5 pb-6 pt-4">
        {/* night-map body */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #17140e 0%, #0d0c09 45%, #080807 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -30px rgba(0,0,0,0.9)",
          }}
        />
        {/* topographic contours */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
          viewBox="0 0 200 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${-10 + i * 6} -20 C ${90 - i * 14} 120, ${20 + i * 16} 240, ${120 - i * 12} 380 S ${40 + i * 10} 520, ${150 - i * 14} 600`}
              fill="none"
              stroke="#d6a544"
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,#fff_0px,#fff_1px,transparent_1px,transparent_44px),repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_44px)]" />

        {/* header: compass + stage */}
        <div className="relative z-10 mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent/90">
              <span className="h-1.5 w-1.5 bg-accent" />
              Expedition
            </p>
            <p className="mt-1 font-mono text-[0.6rem] tracking-widest text-mist-500">
              STAGE 0{activeIndex + 1}/0{WAYPOINTS.length}
            </p>
          </div>
          <Compass reduce={reduce} size={34} />
        </div>

        {/* the vertical trail */}
        <nav
          aria-label="Dyshja n'Natyrë section navigation"
          className="relative z-10"
        >
          <div className="relative">
            {/* dashed path */}
            <span
              aria-hidden="true"
              className="absolute bottom-[18px] left-[17px] top-[18px] border-l border-dashed border-white/15"
            />
            {/* walked part of the path turns gold */}
            <motion.span
              aria-hidden="true"
              className="absolute left-[17px] top-[18px] max-h-[calc(100%-36px)] border-l border-dashed border-accent/60"
              style={{ height: goldLine }}
            />
            {/* the hiker marker */}
            <motion.span
              aria-hidden="true"
              className="absolute left-[17px] top-[18px] z-10 max-h-[calc(100%-36px)]"
              style={{ top: markerTop }}
            >
              <span
                className="absolute -left-[11px] -top-[11px] flex h-[22px] w-[22px] items-center justify-center rounded-full border border-accent/70 bg-ink-950 text-accent"
                style={{ boxShadow: "0 0 14px -2px rgba(214,165,68,0.7)" }}
              >
                <Hiker />
              </span>
            </motion.span>

            {/* waypoints */}
            <ul className="relative flex flex-col gap-9">
              {WAYPOINTS.map((w, i) => {
                const on = active === w.id;
                const passed = i < activeIndex;
                return (
                  <li key={w.id}>
                    <a
                      href={`#${w.id}`}
                      onClick={(e) => go(e, w.id)}
                      aria-current={on ? "true" : undefined}
                      className="group flex items-center gap-3.5"
                    >
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
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
                          className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border transition-all duration-300 ${
                            on
                              ? "border-accent/60 bg-ink-950 text-accent"
                              : passed
                                ? "border-accent/30 bg-ink-950 text-accent/60"
                                : "border-white/12 bg-ink-950 text-mist-500 group-hover:border-white/30 group-hover:text-mist-200"
                          }`}
                        >
                          <WaypointIcon w={w} className="h-[15px] w-[15px]" />
                        </span>
                      </span>
                      <span className="flex flex-col">
                        <span
                          className={`font-mono text-[0.55rem] tracking-[0.2em] transition-colors duration-300 ${
                            on ? "text-accent/80" : "text-mist-600"
                          }`}
                        >
                          {w.num}
                        </span>
                        <span
                          className={`whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 ${
                            on
                              ? "text-mist-100"
                              : "text-mist-500 group-hover:text-mist-200"
                          }`}
                        >
                          {w.label}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

/* ---------- horizontal trail (mobile / tablet) ---------- */

export function DyshjaTrailNav() {
  const { active, reduce, go } = useTrailSpy();
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(150deg, #17140e 0%, #0d0c09 45%, #080807 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -30px rgba(0,0,0,0.9)",
          }}
        />
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
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,#fff_0px,#fff_1px,transparent_1px,transparent_56px),repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_56px)]" />

        <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent/90">
              Expedition · Log
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.62rem] tracking-widest text-mist-500">
              STAGE 0{activeIndex + 1}/0{WAYPOINTS.length}
            </span>
            <Compass reduce={reduce} />
          </div>
        </div>

        <nav
          aria-label="Dyshja n'Natyrë section navigation"
          className="relative z-10 flex items-start gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {WAYPOINTS.map((w, i) => {
            const on = active === w.id;
            const passed = i < activeIndex;
            return (
              <div key={w.id} className="flex flex-1 items-start">
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
                  <span className="relative flex h-[42px] w-[42px] items-center justify-center">
                    {on && (
                      <motion.span
                        layoutId="dyshja-camp-ring-m"
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
                      <WaypointIcon w={w} />
                    </span>
                  </span>
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
