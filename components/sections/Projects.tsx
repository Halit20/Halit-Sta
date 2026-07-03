"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PROJECTS, type Project } from "@/lib/data";
import { EASE, fadeUp, staggerParent } from "@/lib/motion";

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/8 py-4 first:border-t-0 first:pt-0">
      <p className="mb-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-accent/70">
        {label}
      </p>
      <div className="text-[0.92rem] leading-relaxed text-mist-300">{children}</div>
    </div>
  );
}

/** real domain for the fake address bar when verified, else the project name */
function chromeLabel(project: Project) {
  return (
    project.meta?.match(/[a-z0-9-]+\.[a-z]{2,}[^\s·]*/i)?.[0] ?? project.title
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  // close on Escape + lock scroll while modal is open
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <Section id="work" divider tone="calm">
      <SectionHeading
        eyebrow="Selected Work"
        title="Real projects — platforms, brands, content, and the *infrastructure* behind them."
        subtitle="A cross-section of client and personal work. Open any project to see the role I played, what I built, and the purpose it served."
      />

      <Reveal
        stagger={0.07}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <TiltCard key={project.id} max={4} className="h-full">
          <motion.button
            variants={fadeUp}
            onClick={() => setActive(project)}
            aria-label={`View case study: ${project.title}`}
            className="group surface surface-hover relative flex h-full flex-col overflow-hidden text-left"
          >
            <ProjectVisual
              hue={project.hue}
              screen={project.screen}
              label={chromeLabel(project)}
              className="aspect-[16/10] w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] -translate-y-full bg-gradient-to-b from-white/8 to-transparent transition-transform duration-700 group-hover:translate-y-0" />

            <div className="flex flex-1 flex-col p-6">
              <span className="text-[0.68rem] uppercase tracking-[0.18em] text-accent/80">
                {project.category}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-mist-100">
                {project.title}
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-mist-400">
                {project.tagline}
              </p>

              <div className="mt-4 flex items-start gap-2 text-[0.78rem] text-mist-400">
                <span className="mt-[2px] shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent/70">
                  Role
                </span>
                <span className="leading-snug">{project.role}</span>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/8 px-2.5 py-1 text-[0.68rem] text-mist-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex justify-end border-t border-white/8 pt-4">
                <span className="flex items-center gap-1 text-[0.75rem] font-medium text-mist-200 transition-colors group-hover:text-accent">
                  View Case Study
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </div>
          </motion.button>
          </TiltCard>
        ))}
      </Reveal>

      {/* Case-study modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} case study`}
          >
            <div
              className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
              onClick={() => setActive(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="surface relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto"
            >
              <motion.div
                variants={staggerParent(0.08)}
                initial="hidden"
                animate="show"
              >
              <motion.div variants={fadeUp} className="relative">
                <ProjectVisual
                  hue={active.hue}
                  screen={active.screen}
                  label={chromeLabel(active)}
                  className="aspect-[16/7] w-full"
                />
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close case study"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-ink-950/60 text-mist-300 backdrop-blur transition-colors hover:text-mist-100"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </motion.div>

              <div className="p-7 sm:p-8">
                <motion.span
                  variants={fadeUp}
                  className="text-[0.72rem] uppercase tracking-[0.18em] text-accent/80"
                >
                  {active.category}
                </motion.span>
                <motion.h3
                  variants={fadeUp}
                  className="mt-2 font-display text-2xl font-semibold text-mist-100"
                >
                  {active.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-3 leading-relaxed text-mist-400">
                  {active.tagline}
                </motion.p>
                {active.meta && (
                  <motion.p
                    variants={fadeUp}
                    className="mt-2 font-mono text-[0.72rem] tracking-wide text-mist-500"
                  >
                    {active.meta}
                  </motion.p>
                )}

                <motion.div variants={fadeUp} className="mt-6">
                  <DetailRow label="Role">{active.role}</DetailRow>
                  <DetailRow label="What I built">
                    <ul className="space-y-2">
                      {active.built.map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </DetailRow>
                  <DetailRow label="Purpose / Result">{active.result}</DetailRow>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-mist-300"
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <MagneticButton
                    href="#contact"
                    onClick={() => setActive(null)}
                    className="btn-primary mt-7 !py-2.5 text-sm"
                  >
                    Start a project like this
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </MagneticButton>
                </motion.div>
              </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
