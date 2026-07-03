"use client";

import { motion } from "framer-motion";
import { CREATOR_ROOTS } from "@/lib/dyshja";
import { EASE } from "@/lib/motion";

/**
 * Creator roots — origin story only. Deliberately smaller than the
 * professional sections: one slim card, no grid, no fanfare.
 */
export function CreatorRoots() {
  return (
    <section className="relative py-6">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="surface flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 bg-accent" />
              Creator Roots
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-mist-100">
              {CREATOR_ROOTS.title}
            </h3>
            <p className="mt-2.5 text-[0.9rem] leading-relaxed text-mist-400">
              {CREATOR_ROOTS.text}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CREATOR_ROOTS.tags.map((t) => (
                <span
                  key={t}
                  className="border border-white/8 px-2.5 py-1 text-[0.66rem] text-mist-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            {CREATOR_ROOTS.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.12em] text-mist-400 transition-colors hover:text-accent"
              >
                {l.label}
                <svg
                  className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
