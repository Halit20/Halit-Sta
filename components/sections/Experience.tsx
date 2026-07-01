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
        title="A track record across systems, institutions, and creative work."
        subtitle="Hands-on experience that spans product engineering, institutional IT, client delivery, and original media."
      />

      <div ref={ref} className="relative mt-16 pl-8 sm:pl-10">
        {/* timeline rail */}
        <div className="absolute left-[7px] top-1 h-full w-px bg-white/8 sm:left-[9px]">
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
              className="relative"
            >
              {/* node */}
              <span className="absolute -left-[33px] top-6 flex h-4 w-4 items-center justify-center sm:-left-[39px]">
                <span className="absolute h-4 w-4 animate-pulse-slow rounded-full bg-accent/30" />
                <motion.span
                  whileInView={{
                    boxShadow: "0 0 18px 2px rgba(56,189,248,0.45)",
                  }}
                  viewport={{ once: true, margin: "-30% 0px" }}
                  className="relative h-2 w-2 rounded-full bg-accent ring-4 ring-ink-950"
                />
              </span>

              <div className="surface surface-hover p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-mist-100">
                      {exp.org}
                    </h3>
                    <p className="mt-1 text-sm text-accent/80">{exp.role}</p>
                  </div>
                  <span className="rounded-full border border-white/8 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-mist-500">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-mist-400">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
