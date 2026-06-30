"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { EDUCATION } from "@/lib/data";

export function Education() {
  return (
    <Section id="education" divider tone="warm">
      <SectionHeading
        eyebrow="Education & Achievements"
        title="Academic foundation, real recognition, applied experience."
        align="center"
        className="mx-auto"
      />

      <Reveal
        stagger={0.07}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {EDUCATION.map((e, i) => (
          <SpotlightCard key={e.title} className="p-7">
            <span className="font-display text-2xl font-bold text-accent/30">
              0{i + 1}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-mist-100">
              {e.title}
            </h3>
            <p className="mt-2 text-sm text-mist-300">{e.org}</p>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-mist-500">
              {e.note}
            </p>
          </SpotlightCard>
        ))}
      </Reveal>
    </Section>
  );
}
