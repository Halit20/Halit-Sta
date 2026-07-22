"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SKILL_GROUPS, type IconName } from "@/lib/data";
import { EASE } from "@/lib/motion";

const META: Record<string, { icon: IconName; blurb: string }> = {
  "Code & Development": {
    icon: "web",
    blurb:
      "The technologies I use to build complete digital products from frontend to backend.",
  },
  "Infrastructure & Deployment": {
    icon: "infra",
    blurb:
      "How digital products reach production, remain secure, and stay reliably online.",
  },
  "AI Systems & Automation": {
    icon: "ai",
    blurb:
      "Tools and workflows I use to integrate AI, automate operations, and accelerate digital delivery.",
  },
  "Design & Product": {
    icon: "brand",
    blurb:
      "The tools and systems I use to shape interfaces, brands, and consistent digital experiences.",
  },
  "Creative Production": {
    icon: "media",
    blurb:
      "The production tools, equipment, and capabilities behind my video, photography, and drone work.",
  },
  Languages: {
    icon: "consulting",
    blurb: "The languages I work and communicate in.",
  },
};

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section id="skills" divider tone="calm">
      <SectionHeading
        eyebrow="Skills & Tools"
        title="A full-cycle *toolkit* for modern digital work."
        subtitle="A practical stack across engineering, AI, infrastructure, design, and creative production — built to carry projects from concept to deployment without fragmented handoffs."
      />

      {/* soft shade so the moving background stays behind the grid;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-40 bottom-0 bg-[radial-gradient(80%_90%_at_50%_55%,rgba(3,3,3,0.4),transparent_82%)]"
      />

      <Reveal
        stagger={0.1}
        className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {SKILL_GROUPS.map((group) => {
          const meta = META[group.category];
          return (
            <SpotlightCard
              key={group.category}
              className="group flex h-full flex-col p-7"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800 text-accent transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                  <Icon name={meta?.icon ?? "web"} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold text-mist-100">
                    {group.category}
                  </h3>
                  <p className="mt-1 text-[0.85rem] leading-snug text-mist-500">
                    {meta?.blurb}
                  </p>
                </div>
                <span className="ml-auto shrink-0 font-display text-xs font-semibold text-mist-600">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/8 pt-6">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.025, duration: 0.45, ease: EASE }}
                    whileHover={
                      reduce
                        ? undefined
                        : { scale: 1.03, transition: { duration: 0.25, delay: 0 } }
                    }
                    className="group/badge flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/8 bg-white/[0.02] px-3.5 py-2 text-[0.82rem] text-mist-300 transition-colors duration-300 hover:border-accent/30 hover:text-mist-100"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-mist-600 transition-colors group-hover/badge:bg-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          );
        })}
      </Reveal>
    </Section>
  );
}
