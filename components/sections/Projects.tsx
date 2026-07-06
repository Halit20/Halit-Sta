"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import { MediaReveal } from "@/components/ui/MediaReveal";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  CASE_STUDIES,
  PROJECT_FILTERS,
  type CaseStudy,
  type ProjectFilter,
} from "@/lib/projects";
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

export function Projects() {
  const [active, setActive] = useState<CaseStudy | null>(null);
  const [filter, setFilter] = useState<ProjectFilter | "all">("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? CASE_STUDIES
        : CASE_STUDIES.filter((p) => p.filters.includes(filter)),
    [filter]
  );

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
        title="Full-stack development & *systems.*"
        subtitle="Real websites, platforms, booking flows, dashboards, inventory tools, and business systems — built for restaurants, education, service companies, hospitality, events, and operations."
      />

      {/* pinned flagship showcase — desktop only; the grid below covers mobile */}
      <ProjectShowcase projects={CASE_STUDIES.slice(0, 5)} onOpen={setActive} />

      <p className="mt-16 text-[0.68rem] uppercase tracking-[0.2em] text-mist-500 lg:mt-8">
        All projects
      </p>

      {/* filter tabs */}
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
        {PROJECT_FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.key)}
              className={`border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                isActive
                  ? "border-accent/60 bg-accent/10 text-mist-100"
                  : "border-white/10 text-mist-400 hover:border-white/25 hover:text-mist-200"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={filter}
        variants={staggerParent(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project) => (
          <TiltCard key={project.id} max={4} className="h-full">
            <motion.button
              variants={fadeUp}
              onClick={() => setActive(project)}
              aria-label={`View case study: ${project.title}`}
              className="group surface surface-hover relative flex h-full w-full flex-col overflow-hidden text-left"
            >
              <MediaReveal>
                <ProjectThumb project={project} className="aspect-[16/10] w-full" />
              </MediaReveal>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] -translate-y-full bg-gradient-to-b from-white/8 to-transparent transition-transform duration-700 group-hover:translate-y-0" />

              <div className="flex flex-1 flex-col p-6">
                <span className="text-[0.68rem] uppercase tracking-[0.18em] text-accent/80">
                  {project.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-mist-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-mist-400">
                  {project.summary}
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
                      className="border border-white/8 px-2.5 py-1 text-[0.68rem] text-mist-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                  {project.url ? (
                    <span className="font-mono text-[0.66rem] tracking-wide text-mist-500">
                      {project.urlLabel}
                    </span>
                  ) : (
                    <span />
                  )}
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
      </motion.div>

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
                  <ProjectThumb project={active} className="aspect-[16/8] w-full" />
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
                    {active.summary}
                  </motion.p>
                  {active.urlLabel && (
                    <motion.p
                      variants={fadeUp}
                      className="mt-2 font-mono text-[0.72rem] tracking-wide text-mist-500"
                    >
                      {active.urlLabel}
                    </motion.p>
                  )}

                  <motion.div variants={fadeUp} className="mt-6">
                    <DetailRow label="My Role">{active.role}</DetailRow>
                    <DetailRow label="What Was Built">
                      <ul className="space-y-2">
                        {active.built.map((line) => (
                          <li key={line} className="flex items-start gap-2.5">
                            <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-accent/70" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </DetailRow>
                    <DetailRow label="Business Purpose">{active.purpose}</DetailRow>
                    {active.protected && (
                      <DetailRow label="Access">
                        Login-protected system — only the public login screen is
                        shown. No private data is exposed.
                      </DetailRow>
                    )}
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-mist-300"
                      >
                        {t}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="mt-7 flex flex-wrap items-center gap-3"
                  >
                    {active.url && (
                      <a
                        href={active.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary !py-2.5 text-sm"
                      >
                        Visit Website
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </a>
                    )}
                    <MagneticButton
                      href="#contact"
                      onClick={() => setActive(null)}
                      className={`${active.url ? "btn-ghost" : "btn-primary"} !py-2.5 text-sm`}
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
