"use client";

import { motion } from "framer-motion";
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
    blurb: "The stack I design and build products with — front to back.",
  },
  "Infrastructure & Deployment": {
    icon: "infra",
    blurb: "How those products reach production and stay online.",
  },
  "AI & Workflow": {
    icon: "ai",
    blurb: "Tools and methods I use to build faster and automate work.",
  },
  "Creative & Production": {
    icon: "media",
    blurb: "The gear and software behind the video, photo, and drone work.",
  },
  Languages: {
    icon: "consulting",
    blurb: "The languages I work and communicate in.",
  },
};

export function Skills() {
  return (
    <Section id="skills" divider tone="calm">
      <SectionHeading
        eyebrow="Skills & Tools"
        title="A full-cycle *toolkit* for modern digital work."
        subtitle="One skill set, several sides — code, infrastructure, AI, creative production, and the languages to work internationally — so a project never has to leave my hands to move forward."
      />

      <Reveal
        stagger={0.1}
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        {SKILL_GROUPS.map((group) => {
          const meta = META[group.category];
          return (
            <SpotlightCard key={group.category} className="flex flex-col p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800 text-accent">
                  <Icon name={meta?.icon ?? "web"} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-mist-100">
                    {group.category}
                  </h3>
                  <p className="mt-1 text-[0.85rem] leading-snug text-mist-500">
                    {meta?.blurb}
                  </p>
                </div>
                <span className="ml-auto font-display text-xs font-semibold text-mist-600">
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
                    whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.2, delay: 0 } }}
                    className="group/badge flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3.5 py-2 text-[0.82rem] text-mist-300 transition-colors hover:border-accent/30 hover:text-mist-100"
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
