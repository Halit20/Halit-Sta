"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { LiteYouTube } from "@/components/ui/LiteYouTube";
import {
  DYSHJA,
  DYSHJA_PLANNING,
  DYSHJA_PRODUCTION,
  DYSHJA_GEAR,
  DYSHJA_WORKFLOW,
  DYSHJA_VIDEOS,
} from "@/lib/dyshja";
import { EASE, fadeUp } from "@/lib/motion";

/** latest episodes always visible; the rest expand on demand */
const INITIAL_VIDEOS = 6;

export function DyshjaNatyre() {
  const [showAll, setShowAll] = useState(false);
  return (
    <Section id="dyshja" divider tone="warm">
      {/* 1 — cinematic intro */}
      <div className="flex flex-col items-center text-center">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="h-1.5 w-1.5 bg-accent" />
          Creative Media · Outdoor Storytelling
        </motion.span>

        <h2 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.04] tracking-tightest sm:text-5xl lg:text-[3.6rem]">
          <AnimatedText text="Dyshja *n'Natyrë*" wordClassName="text-gradient" delay={0.1} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-mist-400"
        >
          {DYSHJA.subtitle}
        </motion.p>
      </div>

      {/* 2 — story + what we create */}
      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-accent/80">
            The story
          </p>
          <p className="mt-5 text-lg leading-relaxed text-mist-300">
            {DYSHJA.story}
          </p>
          <p className="mt-5 border-l-2 border-accent/40 pl-4 font-display text-[0.95rem] italic text-mist-400">
            Two friends, one camera, and the Albanian outdoors — filmed like it
            deserves to be seen.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="surface p-6"
        >
          <p className="text-[0.66rem] uppercase tracking-[0.2em] text-accent/80">
            What we create
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {DYSHJA.contentTypes.map((t) => (
              <span
                key={t}
                className="border border-white/8 bg-white/[0.02] px-3 py-1.5 text-[0.75rem] text-mist-300"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-5 border-t border-white/8 pt-5 text-[0.85rem] leading-relaxed text-mist-500">
            Among the first Albanian creators focused on cinematic outdoor and
            adventure content — nature, sea, mountains, and the journey between
            them.
          </p>
        </motion.div>
      </div>

      {/* 3 — production workflow */}
      <div className="mt-16">
        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-accent/80">
          Production workflow
        </p>
        <Reveal
          stagger={0.06}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DYSHJA_PLANNING.map((p, i) => (
            <motion.div key={p.label} variants={fadeUp} className="surface p-5">
              <span className="font-mono text-[0.68rem] text-accent/70">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold text-mist-100">
                {p.label}
              </h3>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-mist-400">
                {p.detail}
              </p>
            </motion.div>
          ))}
        </Reveal>

        {/* real production numbers */}
        <Reveal
          stagger={0.06}
          className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {DYSHJA_PRODUCTION.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="border border-white/8 bg-white/[0.02] p-5 text-center"
            >
              <p className="font-display text-xl font-bold text-accent sm:text-2xl">
                {s.value}
              </p>
              <p className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-mist-500">
                {s.label} · {s.detail}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>

      {/* 4 — gear + edit stack */}
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="surface p-6"
        >
          <p className="text-[0.66rem] uppercase tracking-[0.2em] text-accent/80">
            Gear stack
          </p>
          <ul className="mt-4 space-y-2">
            {DYSHJA_GEAR.map((g) => (
              <li
                key={g}
                className="flex items-start gap-2.5 text-[0.88rem] text-mist-300"
              >
                <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-accent/70" />
                {g}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="surface p-6"
        >
          <p className="text-[0.66rem] uppercase tracking-[0.2em] text-accent/80">
            Post-production
          </p>
          <ul className="mt-4 space-y-3">
            {DYSHJA_WORKFLOW.map((w) => (
              <li key={w.label} className="border-b border-white/6 pb-3 last:border-b-0 last:pb-0">
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-mist-500">
                  {w.label}
                </p>
                <p className="mt-0.5 text-[0.9rem] text-mist-200">{w.value}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* 5 — video grid */}
      <div className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-accent/80">
            Episodes
          </p>
          <p className="font-mono text-[0.68rem] text-mist-500">
            {DYSHJA_VIDEOS.length} public videos · 4K
          </p>
        </div>
        <Reveal
          stagger={0.05}
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DYSHJA_VIDEOS.slice(0, INITIAL_VIDEOS).map((v) => (
            <motion.div key={v.id} variants={fadeUp}>
              <LiteYouTube id={v.id} title={v.title} />
            </motion.div>
          ))}
        </Reveal>

        {/* older episodes expand below the latest six */}
        <AnimatePresence initial={false}>
          {showAll && (
            <motion.div
              key="more-episodes"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {DYSHJA_VIDEOS.slice(INITIAL_VIDEOS).map((v) => (
                  <LiteYouTube key={v.id} id={v.id} title={v.title} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {DYSHJA_VIDEOS.length > INITIAL_VIDEOS && (
          <div className="mt-7 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="btn-ghost"
            >
              {showAll
                ? "Show latest episodes only"
                : `Show all ${DYSHJA_VIDEOS.length} episodes`}
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 6 — socials + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-16 flex flex-col items-center gap-7 border-t border-white/8 pt-12 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { label: "YouTube", href: DYSHJA.links.youtube },
            { label: "Instagram", href: DYSHJA.links.instagram },
            { label: "TikTok", href: DYSHJA.links.tiktok },
            { label: "Facebook", href: DYSHJA.links.facebook },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.75rem] uppercase tracking-[0.16em] text-mist-400 transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={DYSHJA.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Dyshja n'Natyrë on YouTube"
            className="btn-primary"
          >
            Watch on YouTube
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
          <a
            href={DYSHJA.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Dyshja n'Natyrë on Instagram"
            className="btn-ghost"
          >
            Follow the journey
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
