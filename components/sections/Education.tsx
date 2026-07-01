"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDUCATION } from "@/lib/data";
import { EASE } from "@/lib/motion";

/** One line-icon per milestone (graduation, award, globe, shield, rocket). */
const NODE_ICONS = [
  <path key="0" d="M4 19h16M6 19V9l6-4 6 4v10" />,
  <path key="1" d="M12 15a5 5 0 100-10 5 5 0 000 10zm0 0l-3 6 3-1.5L15 21l-3-6" />,
  <path key="2" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18M12 3v18" />,
  <path key="3" d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
  <path key="4" d="M5 16c3-8 9-12 14-13-1 5-5 11-13 14l-1-1zm0 0l-2 5 5-2" />,
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
        title="Academic foundation, real recognition, applied experience."
        align="center"
        className="mx-auto"
      />

      <div ref={railRef} className="relative mx-auto mt-16 max-w-3xl">
        {/* scroll-drawn spine */}
        <div className="absolute left-5 top-0 h-full w-px bg-white/8 sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent sm:left-1/2"
        />

        <ol className="flex flex-col gap-12">
          {EDUCATION.map((e, i) => {
            const right = i % 2 === 1;
            return (
              <li key={e.title} className="relative">
                {/* node */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute left-5 top-1 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent/40 bg-ink-900 sm:left-1/2"
                >
                  <svg className="h-[18px] w-[18px] text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {NODE_ICONS[i % NODE_ICONS.length]}
                  </svg>
                </motion.span>

                {/* card — alternates sides on desktop */}
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`surface surface-hover ml-14 p-6 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                    right ? "sm:ml-auto" : ""
                  }`}
                >
                  <h3 className="font-display text-lg font-semibold leading-snug text-mist-100">
                    {e.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-accent/80">{e.org}</p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-mist-500">
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
