"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import type { CaseStudy } from "@/lib/projects";
import { useAmbientMotion } from "@/lib/hooks";

/**
 * Desktop-only pinned showcase: the section sticks while projects travel
 * horizontally, one full viewport per project. Hidden below lg and under
 * reduced motion (the filterable grid below covers those cases).
 */
export function ProjectShowcase({
  projects,
  onOpen,
}: {
  projects: CaseStudy[];
  onOpen: (p: CaseStudy) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ambient = useAmbientMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const n = projects.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((n - 1) / n) * 100}%`]);

  if (!ambient || n === 0) return null;

  return (
    <div
      ref={containerRef}
      // full-bleed: escape the .shell max-width container to span the viewport
      className="relative mx-[calc(50%-50vw)] mt-14 hidden lg:block"
      style={{ height: `${n * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-max">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="flex h-full w-screen shrink-0 items-center gap-12 px-[7vw]"
            >
              <div className="group w-[52%] shrink-0">
                <ProjectThumb project={p} className="aspect-[16/10] w-full" />
              </div>
              <div className="max-w-xl">
                <span className="font-display text-[4.5rem] font-semibold leading-none text-accent/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-accent/80">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-mist-100">
                  {p.title}
                </h3>
                <p className="mt-4 leading-relaxed text-mist-400">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-white/8 px-2.5 py-1 text-[0.68rem] text-mist-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onOpen(p)}
                  className="btn-ghost mt-7 !py-2.5 text-sm"
                >
                  View Case Study
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* progress rail */}
        <div className="pointer-events-none absolute bottom-10 left-[7vw] right-[7vw] h-px bg-white/10">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full origin-left bg-accent/70"
          />
        </div>
      </div>
    </div>
  );
}
