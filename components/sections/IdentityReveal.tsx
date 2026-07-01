"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IDENTITY_PILLARS } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { PillarVisual } from "@/components/ui/PillarVisual";

type PillarId = "ai" | "web" | "branding" | "media" | "infra";

export function IdentityReveal() {
  const [active, setActive] = useState<PillarId>("ai");

  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="divider-line mb-20" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* sticky headline + live visual */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <motion.span
              className="eyebrow mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="h-px w-6 bg-accent/70" />
              The full picture
            </motion.span>
            <h2 className="text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
              <span className="text-gradient">
                One operator. Five disciplines that usually take a whole team.
              </span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-mist-400">
              Most businesses stitch together a developer, a designer, an
              editor, and an ops person. Halit covers the full digital layer —
              and makes the parts work together.
            </p>

            {/* live pillar scene (desktop) */}
            <div className="mt-10 hidden aspect-[4/3] w-full max-w-md lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="h-full w-full"
                >
                  <PillarVisual id={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* pillars — active row synced to the visual */}
          <ul className="flex flex-col">
            {IDENTITY_PILLARS.map((pillar, i) => {
              const isActive = active === pillar.id;
              return (
                <motion.li
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
                  className={`group relative border-t py-7 transition-colors duration-500 last:border-b ${
                    isActive ? "border-accent/40" : "border-white/8"
                  }`}
                >
                  {/* active-tracking band: a thin strip around the viewport center,
                      tracked separately from the once-only entrance above */}
                  <motion.div
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    onViewportEnter={() => setActive(pillar.id as PillarId)}
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className={`font-display text-sm font-semibold transition-colors duration-500 ${
                          isActive ? "text-accent" : "text-accent/40"
                        }`}
                      >
                        {pillar.tag}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h3
                            className={`font-display text-2xl font-semibold transition-all duration-500 sm:text-3xl ${
                              isActive
                                ? "translate-x-1 text-mist-100"
                                : "text-mist-300"
                            }`}
                          >
                            {pillar.title}
                          </h3>
                          <span className="text-sm text-mist-500">{pillar.line}</span>
                        </div>
                        <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mist-400">
                          {pillar.desc}
                        </p>
                        {/* mobile: inline scene for the active pillar */}
                        {isActive && (
                          <div className="mt-5 aspect-[4/3] w-full lg:hidden">
                            <PillarVisual id={pillar.id as PillarId} />
                          </div>
                        )}
                      </div>
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="mt-1"
                      >
                        <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </motion.span>
                    </div>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
