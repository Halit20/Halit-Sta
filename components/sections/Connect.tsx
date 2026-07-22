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
        subtitle="Wherever you spend your time, my work, process, and creative journey are only one message away."
      />

      {/* soft shade so the moving background stays behind the grid;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-36 bottom-0 bg-[radial-gradient(80%_90%_at_50%_55%,rgba(3,3,3,0.35),transparent_82%)]"
      />

      <Reveal
        stagger={0.05}
        className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {CONNECT_LINKS.map((c) => (
          <motion.a
            key={c.id}
            variants={fadeUp}
            href={c.href}
            {...(c.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={
              c.external
                ? `Open ${c.handle} on ${c.label} (opens in a new tab)`
                : `Email ${c.handle}`
            }
            className="group surface flex h-full items-center gap-4 p-5 transition-colors duration-300 hover:!border-accent/30 focus-visible:!border-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mist-300 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
              <SocialIcon name={c.icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.68rem] uppercase tracking-[0.2em] text-mist-500">
                {c.label}
              </span>
              <span className="mt-0.5 block truncate text-sm text-mist-200 transition-colors duration-300 group-hover:text-mist-100">
                {c.handle}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-mist-500 transition-colors duration-300 group-hover:text-accent"
            >
              <ExternalArrow />
            </span>
          </motion.a>
        ))}
      </Reveal>
    </Section>
  );
}
