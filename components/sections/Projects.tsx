"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, type Project } from "@/lib/data";
import { EASE, fadeUp } from "@/lib/motion";

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-white/8 py-4 first:border-t-0 first:pt-0">
      <p className="mb-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-accent/70">
        {label}
      </p>
      <p className="text-[0.92rem] leading-relaxed text-mist-300">{children}</p>
    </div>
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
        title="Real projects — platforms, brands, content, and the infrastructure behind them."
        subtitle="A cross-section of client and personal work. Open any project to see the role I played, what I built, and the purpose it served."
      />

      <Reveal
        stagger={0.07}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <motion.button
            key={project.id}
            variants={fadeUp}
            onClick={() => setActive(project)}
            aria-label={`View case study: ${project.title}`}
            className="group surface surface-hover relative flex flex-col overflow-hidden text-left"
          >
            <ProjectVisual
              hue={project.hue}
              title={project.title}
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

              <div className="mt-4 flex items-center gap-2 text-[0.72rem] text-mist-500">
                <svg
                  className="h-3.5 w-3.5 text-accent/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="12" cy="8" r="3.2" />
                  <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                </svg>
                {project.role}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                {project.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/8 px-2.5 py-1 text-[0.68rem] text-mist-400"
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto flex items-center gap-1 text-[0.72rem] font-medium text-mist-200 transition-colors group-hover:text-accent">
                  View case study
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
              <div className="relative">
                <ProjectVisual
                  hue={active.hue}
                  title={active.title}
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
              </div>

              <div className="p-7 sm:p-8">
                <span className="text-[0.72rem] uppercase tracking-[0.18em] text-accent/80">
                  {active.category}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-mist-100">
                  {active.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mist-400">
                  {active.tagline}
                </p>

                <div className="mt-6">
                  <DetailRow label="Role">{active.role}</DetailRow>
                  <DetailRow label="What I built">{active.built}</DetailRow>
                  <DetailRow label="Purpose">{active.result}</DetailRow>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-mist-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
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
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
