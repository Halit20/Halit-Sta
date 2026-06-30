"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IDENTITY_PILLARS } from "@/lib/data";
import { EASE } from "@/lib/motion";

export function IdentityReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headlineX = useTransform(scrollYProgress, [0, 0.5], [-40, 0]);

  return (
    <section ref={ref} className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="divider-line mb-20" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* sticky headline */}
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
            <motion.h2
              style={{ x: headlineX }}
              className="text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]"
            >
              <span className="text-gradient">
                One operator. Five disciplines that usually take a whole team.
              </span>
            </motion.h2>
            <p className="mt-6 max-w-md leading-relaxed text-mist-400">
              Most businesses stitch together a developer, a designer, an
              editor, and an ops person. Halit covers the full digital layer —
              and makes the parts work together.
            </p>
          </div>

          {/* unfolding pillars */}
          <ul className="flex flex-col">
            {IDENTITY_PILLARS.map((pillar, i) => (
              <motion.li
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
                className="group relative border-t border-white/8 py-7 transition-colors last:border-b hover:border-accent/30"
              >
                <div className="flex items-start gap-5">
                  <span className="font-display text-sm font-semibold text-accent/60">
                    {pillar.tag}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="font-display text-2xl font-semibold text-mist-100 transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                        {pillar.title}
                      </h3>
                      <span className="text-sm text-mist-500">
                        {pillar.line}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mist-400">
                      {pillar.desc}
                    </p>
                  </div>
                  <span className="mt-1 text-mist-600 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                    <svg
                      className="h-5 w-5 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
