"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/data";
import { EASE } from "@/lib/motion";

const COMMITMENTS = [
  "One point of contact — not a chain of vendors",
  "Ships to a real production server, not a demo link",
  "Clean handover: access, docs, and how to run it",
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="process" divider tone="calm">
      <SectionHeading
        eyebrow="How I Work"
        title="From idea to launch — structured, creative, and technical."
        subtitle="A clear path that keeps strategy, design, engineering and deployment moving as one — so nothing falls between disciplines."
      />

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
        {/* left — the 5-step timeline */}
        <div ref={ref} className="relative">
          <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/8 md:block">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-accent via-accent/60 to-transparent"
            />
          </div>

          <ol className="flex flex-col gap-4 md:gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                className="relative grid grid-cols-1 gap-3 md:grid-cols-[auto_1fr] md:gap-6 md:py-5"
              >
                <div className="flex items-center gap-4 md:block">
                  <motion.span
                    whileInView={{
                      borderColor: "rgba(56,189,248,0.6)",
                      color: "#38bdf8",
                    }}
                    viewport={{ once: true, margin: "-35% 0px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-ink-900 text-xs font-semibold text-accent"
                  >
                    {step.num}
                  </motion.span>
                </div>
                <div className="surface surface-hover p-6">
                  <h3 className="font-display text-lg font-semibold text-mist-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-mist-400">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* right — execution pipeline panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:sticky lg:top-28 lg:h-fit"
        >
          <div className="surface relative overflow-hidden p-7">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)",
              }}
            />
            {/* panel header */}
            <div className="flex items-center justify-between">
              <span className="text-[0.66rem] uppercase tracking-[0.2em] text-accent/80">
                Project pipeline
              </span>
              <span className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-widest text-mist-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                live
              </span>
            </div>

            {/* mini horizontal flow */}
            <div className="relative mt-6 flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/8" />
              <motion.div
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-accent to-accent/40"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              />
              {PROCESS_STEPS.map((s, i) => (
                <motion.span
                  key={s.num}
                  className="relative z-10 h-3 w-3 rounded-full border border-accent/50 bg-ink-900"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.22, ease: EASE }}
                >
                  <span className="absolute inset-[3px] rounded-full bg-accent/80" />
                </motion.span>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[0.6rem] uppercase tracking-wider text-mist-500">
              <span>Idea</span>
              <span>Live & scaling</span>
            </div>

            {/* commitments */}
            <div className="mt-8 space-y-3 border-t border-white/8 pt-6">
              {COMMITMENTS.map((c) => (
                <div key={c} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[0.88rem] leading-snug text-mist-300">
                    {c}
                  </span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-ghost mt-7 w-full !py-2.5 text-sm">
              Start with a discovery call
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
