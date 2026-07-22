"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/data";
import { EASE } from "@/lib/motion";

const COMMITMENTS = [
  "One point of contact — not a chain of vendors",
  "Delivered in a real production environment — not left as a demo",
  "Clean handover with access, documentation, and operating guidance",
];

/* Pipeline phases: steps 01–04 map to the first four; SCALE lights up
   when the reader reaches the end of the section. */
const PHASES = ["Discover", "Plan", "Build", "Launch", "Scale"];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const activeStep = Math.min(phase, PROCESS_STEPS.length - 1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="process" divider tone="calm">
      <SectionHeading
        eyebrow="How I Work"
        title="From *idea to launch* — structured, connected, and production-ready."
        subtitle="A clear process that keeps strategy, design, engineering, and deployment aligned — so nothing gets lost between disciplines."
      />

      {/* soft shade so the moving background stays behind the columns;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-40 bottom-0 bg-[radial-gradient(80%_90%_at_50%_55%,rgba(3,3,3,0.45),transparent_82%)]"
      />

      <div className="relative mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
        {/* left — the 4-step timeline */}
        <div ref={ref} className="relative">
          <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-white/6 md:block">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-accent via-accent/60 to-transparent"
            />
          </div>

          <ol className="flex flex-col gap-4 md:gap-0">
            {PROCESS_STEPS.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.li
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                  aria-current={isActive ? "step" : undefined}
                  className="relative grid grid-cols-1 gap-3 md:grid-cols-[auto_1fr] md:gap-6 md:py-5"
                >
                  {/* active-tracking band around the viewport center */}
                  <motion.div
                    aria-hidden="true"
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    onViewportEnter={() => setPhase(i)}
                    className="absolute inset-0"
                  />
                  <div className="flex items-center gap-4 md:block">
                    <span
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-ink-900 text-xs font-semibold transition-colors duration-300 ${
                        isActive
                          ? "border-accent/70 text-accent"
                          : "border-accent/30 text-accent/60"
                      }`}
                    >
                      {step.num}
                    </span>
                  </div>
                  <div
                    className={`surface surface-hover p-6 transition-[border-color,box-shadow] duration-300 ${
                      isActive
                        ? "!border-accent/25 shadow-[0_0_34px_-20px_rgba(214,165,68,0.5)]"
                        : ""
                    }`}
                  >
                    <h3 className="font-display text-lg font-semibold text-mist-100">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-mist-300">
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* end-of-section sentinel: reaching it lights up SCALE */}
          <motion.div
            aria-hidden="true"
            viewport={{ margin: "-45% 0px -45% 0px" }}
            onViewportEnter={() => setPhase(PHASES.length - 1)}
            className="h-px"
          />
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
                  "radial-gradient(circle, rgba(214,165,68,0.18), transparent 70%)",
              }}
            />
            {/* panel header */}
            <div className="flex items-center justify-between">
              <span className="text-[0.66rem] uppercase tracking-[0.2em] text-accent/80">
                Project pipeline
              </span>
              <span className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-widest text-mist-500">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(214,165,68,0.8)]" />
                live
              </span>
            </div>

            {/* phase flow — dots track the reader's position in the steps */}
            <div className="relative mt-6">
              <div className="absolute left-6 right-6 top-[5px] h-px bg-white/8" />
              <motion.div
                aria-hidden="true"
                className="absolute left-6 top-[5px] h-px bg-gradient-to-r from-accent to-accent/40"
                style={{ maxWidth: "calc(100% - 3rem)" }}
                animate={{ width: `${(phase / (PHASES.length - 1)) * 100}%` }}
                transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              />
              <div className="relative flex justify-between">
                {PHASES.map((p, i) => {
                  const done = i <= phase;
                  const current = i === phase;
                  return (
                    <div key={p} className="flex w-12 flex-col items-center gap-2">
                      <span
                        className={`relative z-10 h-3 w-3 rounded-full border transition-colors duration-300 ${
                          done ? "border-accent/70 bg-ink-900" : "border-white/15 bg-ink-900"
                        } ${current ? "shadow-[0_0_10px_rgba(214,165,68,0.55)]" : ""}`}
                      >
                        <span
                          className={`absolute inset-[3px] rounded-full transition-opacity duration-300 ${
                            done ? "bg-accent/80 opacity-100" : "opacity-0"
                          }`}
                        />
                      </span>
                      <span
                        className={`text-[0.55rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                          current ? "text-accent" : "hidden text-mist-500/80 sm:block"
                        }`}
                      >
                        {p}
                      </span>
                    </div>
                  );
                })}
              </div>
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

            <a
              href="#contact"
              className="btn-ghost mt-7 w-full !border-white/20 !py-2.5 text-sm !text-mist-100 hover:!border-accent/50 hover:!text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
            >
              Start with a discovery call
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
