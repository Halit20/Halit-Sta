"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDUCATION } from "@/lib/data";
import { EASE } from "@/lib/motion";

/* Outline glyphs matched to each milestone (graduation cap, award,
   globe, briefcase, users) — same stroke weight and visual size. */
const NODE_ICONS = [
  // graduation cap
  <g key="0">
    <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0l8.59-3.9z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </g>,
  // award
  <g key="1">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
  </g>,
  // globe
  <g key="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </g>,
  // briefcase
  <g key="3">
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <rect x="2" y="7" width="20" height="13" rx="2" />
    <path d="M22 13a18.15 18.15 0 0 1-20 0" />
    <path d="M12 12h.01" />
  </g>,
  // users
  <g key="4">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </g>,
];

export function Education() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="education" divider tone="warm">
      <SectionHeading
        eyebrow="Education & Achievements"
        title="Academic foundation, earned recognition, *applied experience.*"
        align="center"
        className="mx-auto"
      />

      {/* soft shade so the moving background stays behind the timeline;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-36 bottom-0 bg-[radial-gradient(70%_90%_at_50%_55%,rgba(3,3,3,0.4),transparent_82%)]"
      />

      <div ref={railRef} className="relative mx-auto mt-12 max-w-3xl">
        {/* scroll-drawn spine */}
        <div className="absolute left-5 top-0 h-full w-px bg-accent/10 sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent sm:left-1/2"
        />

        <ol className="flex flex-col gap-6">
          {EDUCATION.map((e, i) => {
            const right = i % 2 === 1;
            return (
              <li key={e.title} className="group relative">
                {/* node — identical size, centered on the spine */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute left-5 top-1 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent/40 bg-ink-900 transition-[border-color,box-shadow] duration-300 group-hover:border-accent/70 group-hover:shadow-[0_0_16px_-4px_rgba(214,165,68,0.5)] sm:left-1/2"
                >
                  <svg
                    aria-hidden="true"
                    className="h-[18px] w-[18px] text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {NODE_ICONS[i % NODE_ICONS.length]}
                  </svg>
                </motion.span>

                {/* card — alternates sides on desktop */}
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`surface ml-14 p-6 transition-colors duration-300 hover:!border-accent/30 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                    right ? "sm:ml-auto" : ""
                  }`}
                >
                  {e.dates && (
                    <p className="mb-1.5 text-[0.64rem] uppercase tracking-[0.18em] text-mist-500">
                      {e.dates}
                    </p>
                  )}
                  <h3 className="font-display text-lg font-semibold leading-snug text-mist-100">
                    {e.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-accent/80">{e.org}</p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-mist-400">
                    {e.note}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
