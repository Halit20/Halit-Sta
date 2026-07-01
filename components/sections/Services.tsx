"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { clipReveal, staggerParent } from "@/lib/motion";
import { SERVICES } from "@/lib/data";

export function Services() {
  return (
    <Section id="services" tone="calm">
      <SectionHeading
        eyebrow="Services"
        title="The full digital side of a business — built from strategy to launch."
        subtitle="Engineering, design, AI, media, and infrastructure, handled together so the parts actually work as one system instead of six disconnected vendors."
      />

      <motion.div
        variants={staggerParent(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <motion.div key={service.num} variants={clipReveal}>
            <TiltCard max={5} className="h-full">
              <SpotlightCard bare className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-800 text-accent">
                    <Icon name={service.icon} className="icon-draw h-5 w-5" />
                  </span>
                  <span className="font-display text-xs font-semibold tracking-widest text-mist-600">
                    {service.num}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-mist-100">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-mist-400">
                  {service.description}
                </p>

                {/* deliverables */}
                <ul className="mt-6 flex flex-wrap gap-2 pt-5 [border-top:1px_solid_rgba(255,255,255,0.06)]">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-1 text-[0.72rem] text-mist-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {/* best for */}
                <div className="mt-auto flex items-start gap-2 pt-6">
                  <span className="mt-[3px] shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent/80">
                    Best for
                  </span>
                  <span className="text-[0.82rem] leading-snug text-mist-300">
                    {service.bestFor}
                  </span>
                </div>
              </SpotlightCard>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
