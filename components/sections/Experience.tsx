"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/lib/data";
import { EASE } from "@/lib/motion";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience" divider tone="warm">
      <SectionHeading
        eyebrow="Experience"
        title="A track record across systems, institutions, and *creative work.*"
        subtitle="Hands-on experience across product engineering, institutional IT, client delivery, and original media."
      />

      {/* soft shade so the moving background stays behind the cards;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-40 bottom-0 bg-[radial-gradient(80%_90%_at_50%_55%,rgba(3,3,3,0.45),transparent_82%)]"
      />

      <div ref={ref} className="relative mt-16 pl-8 sm:pl-10">
        {/* timeline rail */}
        <div className="absolute left-[7px] top-1 h-full w-px bg-white/6 sm:left-[9px]">
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="h-full w-full bg-gradient-to-b from-accent via-accent/50 to-transparent"
          />
        </div>

        <div className="flex flex-col gap-7">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, x: i % 2 ? 36 : -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
              className="group relative"
            >
              {/* node — same size and glow for every entry, brighter on card
                  hover, centered on the card's vertical middle */}
              <span className="absolute -left-[33px] top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center sm:-left-[39px]">
                <span className="absolute h-4 w-4 animate-pulse-slow rounded-full bg-accent/30 motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_2px_rgba(214,165,68,0.4)] ring-4 ring-ink-950 transition-shadow duration-300 group-hover:shadow-[0_0_22px_4px_rgba(214,165,68,0.6)]" />
              </span>

              <div className="surface px-6 py-5 transition-colors duration-300 hover:!border-accent/30 sm:px-7 sm:py-6">
                {exp.dates && (
                  <p className="mb-2 text-[0.66rem] uppercase tracking-[0.18em] text-mist-500">
                    {exp.dates}
                  </p>
                )}
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <div className="order-2 min-w-0 sm:order-1">
                    <h3 className="font-display text-lg font-semibold text-mist-100">
                      {exp.org}
                    </h3>
                    <p className="mt-1 text-sm text-accent/80">{exp.role}</p>
                  </div>
                  <span className="order-1 self-start whitespace-nowrap rounded-full border border-white/8 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-mist-500 sm:order-2 sm:shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-3 max-w-[60rem] text-[0.92rem] leading-relaxed text-mist-300">
                  {exp.desc}
                </p>
                {exp.phases && (
                  <div className="mt-4 space-y-1.5 border-t border-white/6 pt-4">
                    {exp.phases.map((ph) => (
                      <div
                        key={ph.dates}
                        className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3"
                      >
                        <span className="text-[0.64rem] uppercase tracking-[0.16em] text-mist-500 sm:w-44 sm:shrink-0">
                          {ph.dates}
                        </span>
                        <span className="text-[0.8rem] text-mist-300">
                          {ph.role}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
