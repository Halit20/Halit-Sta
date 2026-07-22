"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IDENTITY_PILLARS } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { SystemVisual } from "@/components/ui/PillarVisual";

type PillarId = "ai" | "web" | "branding" | "media" | "infra";
type Layout = "both" | "desktop" | "mobile";

export function IdentityReveal() {
  const [active, setActive] = useState<PillarId>("ai");
  const [layout, setLayout] = useState<Layout>("both");
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setLayout(mq.matches ? "desktop" : "mobile");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="divider-line mb-20" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* sticky headline + live visual */}
          <div className="headline-shade lg:sticky lg:top-28 lg:h-fit">
            <motion.span
              className="eyebrow mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="h-1.5 w-1.5 bg-accent" />
              The full picture
            </motion.span>
            <h2 className="text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
              <span className="text-gradient">
                One builder. Five disciplines that usually take a whole team.
              </span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-mist-400">
              Most businesses need separate specialists for development,
              design, media, and infrastructure. I connect the full digital
              layer and make every part work as one system.
            </p>

            {/* live system scene (desktop) — one visual, nodes switch */}
            {layout !== "mobile" && (
              <div className="mt-10 hidden aspect-[4/3] w-full max-w-md lg:block">
                <SystemVisual active={active} />
              </div>
            )}

            {/* mobile: the system box sits between the intro and the list */}
            {layout !== "desktop" && (
              <div className="mt-8 aspect-[4/3] w-full max-w-md lg:hidden">
                <SystemVisual auto />
              </div>
            )}
          </div>

          {/* pillars — active row synced to the visual */}
          <div className="relative">
            {/* soft shade so the moving background never fights the copy;
                gradient edges keep it from reading as a panel */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -inset-y-6 bg-[radial-gradient(85%_95%_at_50%_50%,rgba(3,3,3,0.55),transparent_80%)]"
            />
            <ul className="relative flex flex-col">
              {IDENTITY_PILLARS.map((pillar, i) => {
                const isActive = active === pillar.id;
                return (
                  <motion.li
                    key={pillar.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
                    onMouseEnter={() => setActive(pillar.id as PillarId)}
                    className={`group relative border-t py-7 transition-colors duration-300 last:border-b ${
                      isActive
                        ? "border-accent/40"
                        : "border-white/6 hover:border-white/15"
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
                          className={`font-display text-sm font-semibold transition-colors duration-300 ${
                            isActive ? "text-accent" : "text-accent/40"
                          }`}
                        >
                          {pillar.tag}
                        </span>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <h3
                              className={`font-display text-2xl font-semibold transition-colors duration-300 sm:text-3xl ${
                                isActive
                                  ? "text-mist-100"
                                  : "text-mist-300 group-hover:text-accent/75"
                              }`}
                            >
                              {pillar.title}
                            </h3>
                            <span className="text-sm text-mist-500">{pillar.line}</span>
                          </div>
                          <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mist-300">
                            {pillar.desc}
                          </p>
                        </div>
                        <motion.span
                          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="mt-1"
                        >
                          <svg aria-hidden="true" className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      </div>
    </section>
  );
}
