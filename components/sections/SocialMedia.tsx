"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  SOCIAL_CLIENT,
  SOCIAL_PLATFORMS,
  SOCIAL_SERVICES,
  CONTENT_GEAR,
} from "@/lib/socialMedia";
import { MANAGED_PLATFORMS } from "@/lib/platformManagement";
import { EASE, fadeUp } from "@/lib/motion";

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

export function SocialMedia() {
  return (
    <Section id="social-media" divider tone="calm">
      <SectionHeading
        eyebrow="Social Media Management"
        title="Social media management built around real content, *planning, and consistency.*"
        subtitle={SOCIAL_CLIENT.summary}
      />

      {/* main client line */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-8 inline-flex flex-wrap items-center gap-3 border border-white/10 bg-white/[0.02] px-4 py-2.5"
      >
        <span className="h-1.5 w-1.5 bg-accent" />
        <span className="text-[0.68rem] uppercase tracking-[0.2em] text-mist-400">
          Main client
        </span>
        <a
          href={SOCIAL_CLIENT.website}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-sm font-semibold text-mist-100 transition-colors hover:text-accent"
        >
          {SOCIAL_CLIENT.name}
        </a>
      </motion.div>

      {/* platform cards */}
      <Reveal
        stagger={0.06}
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {SOCIAL_PLATFORMS.map((p) => (
          <motion.a
            key={p.id}
            variants={fadeUp}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group surface surface-hover flex h-full flex-col p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[0.62rem] uppercase tracking-[0.2em] text-accent/70">
                  {p.kind === "social" ? "Social" : "Listing"}
                </span>
                <h3 className="mt-1 font-display text-base font-semibold text-mist-100">
                  {p.name}
                </h3>
                {p.handle && (
                  <p className="mt-0.5 font-mono text-[0.68rem] text-mist-500">
                    {p.handle}
                  </p>
                )}
              </div>
              <span className="mt-1 text-mist-500 transition-colors group-hover:text-accent">
                <ExternalArrow />
              </span>
            </div>
            <ul className="mt-4 space-y-1.5 border-t border-white/8 pt-4">
              {p.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-[0.8rem] leading-snug text-mist-400"
                >
                  <span className="mt-[0.5em] h-1 w-1 shrink-0 bg-accent/70" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.a>
        ))}

        {/* content production gear */}
        <motion.div variants={fadeUp} className="surface flex h-full flex-col p-5">
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-accent/70">
            Production
          </span>
          <h3 className="mt-1 font-display text-base font-semibold text-mist-100">
            Content Production Gear
          </h3>
          <ul className="mt-4 space-y-1.5 border-t border-white/8 pt-4">
            {CONTENT_GEAR.map((g) => (
              <li
                key={g}
                className="flex items-start gap-2 text-[0.8rem] leading-snug text-mist-400"
              >
                <span className="mt-[0.5em] h-1 w-1 shrink-0 bg-accent/70" />
                {g}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* review & listing management */}
        <motion.div variants={fadeUp} className="surface flex h-full flex-col p-5">
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-accent/70">
            Service
          </span>
          <h3 className="mt-1 font-display text-base font-semibold text-mist-100">
            Review & Listing Management
          </h3>
          <ul className="mt-4 space-y-1.5 border-t border-white/8 pt-4">
            {[
              "Review replies — positive & negative",
              "Listing content & image updates",
              "Business information accuracy",
              "360° visual content for clients",
            ].map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 text-[0.8rem] leading-snug text-mist-400"
              >
                <span className="mt-[0.5em] h-1 w-1 shrink-0 bg-accent/70" />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </Reveal>

      {/* the weekly service behind it */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {SOCIAL_SERVICES.map((s) => (
          <span
            key={s}
            className="border border-white/8 bg-white/[0.02] px-3 py-1.5 text-[0.72rem] text-mist-400"
          >
            {s}
          </span>
        ))}
      </motion.div>

      {/* platform & listing management */}
      <div className="mt-20">
        <SectionHeading
          eyebrow="Platform & Listing Management"
          title="More than posts — the full digital *hospitality presence.*"
          subtitle="Maps, OTAs, reviews, and visual upkeep — managed as one system, so the brand a guest meets on every platform is the same one they meet at the door."
        />
        <Reveal
          stagger={0.08}
          className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {MANAGED_PLATFORMS.map((p) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              className="surface surface-hover flex h-full flex-col p-6"
            >
              <h3 className="font-display text-lg font-semibold text-mist-100">
                {p.name}
              </h3>
              <p className="mt-1 text-[0.85rem] italic text-accent/80">
                {p.tagline}
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-white/8 pt-5">
                {p.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-mist-400"
                  >
                    <svg
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
