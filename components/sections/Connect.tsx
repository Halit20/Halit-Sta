"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CONNECT_LINKS } from "@/lib/data";
import { fadeUp } from "@/lib/motion";

function ExternalArrow() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Connect() {
  return (
    <Section id="connect" divider tone="calm">
      <SectionHeading
        eyebrow="Connect"
        title="One person, *every channel.*"
        subtitle="Wherever you already spend your time — the work, the process, and the person behind it are one message away."
      />

      <Reveal
        stagger={0.05}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {CONNECT_LINKS.map((c) => (
          <motion.a
            key={c.id}
            variants={fadeUp}
            href={c.href}
            {...(c.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group surface surface-hover flex items-center gap-4 p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mist-300 transition-colors group-hover:border-accent/40 group-hover:text-accent">
              <SocialIcon name={c.icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-mist-500">
                {c.label}
              </span>
              <span className="mt-0.5 block truncate text-sm text-mist-200 transition-colors group-hover:text-mist-100">
                {c.handle}
              </span>
            </span>
            <span className="text-mist-500 transition-colors group-hover:text-accent">
              <ExternalArrow />
            </span>
          </motion.a>
        ))}
      </Reveal>
    </Section>
  );
}
