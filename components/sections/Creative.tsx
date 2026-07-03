"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CreativeControlNav,
  ControlIcon,
} from "@/components/sections/CreativeControlNav";
import { LiteYouTube } from "@/components/ui/LiteYouTube";
import { CREATIVE_BLOCKS, type CreativeBlock } from "@/lib/data";
import { EASE } from "@/lib/motion";

/* viewfinder corner brackets */
function Corners() {
  const base =
    "pointer-events-none absolute h-5 w-5 border-accent/40 transition-colors duration-500 group-hover:border-accent/80";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

function Block({ block, index }: { block: CreativeBlock; index: number }) {
  const isContact = block.id === "media-contact";
  const hue = 150 + index * 16;

  return (
    <motion.div
      id={block.id}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.75, ease: EASE }}
      className="group surface relative scroll-mt-28 overflow-hidden p-7 sm:p-9"
    >
      {/* atmospheric wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 85% 0%, hsl(${hue} 35% 12% / 0.7), transparent 60%)`,
        }}
      />
      <Corners />

      <div className="relative z-10">
        {/* viewfinder status line */}
        <div className="mb-6 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.18em]">
          <span className="flex items-center gap-2 text-red-400/90">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            {block.code}
          </span>
          <span className="text-mist-500">{block.meta}</span>
        </div>

        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-800 text-accent">
            <ControlIcon name={block.icon} className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <span className="text-[0.66rem] uppercase tracking-[0.22em] text-accent/70">
              {block.label}
            </span>
            <h3 className="mt-1 font-display text-xl font-semibold text-mist-100 sm:text-2xl">
              {block.title}
            </h3>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-mist-400">
          {block.text}
        </p>

        {block.note && (
          <p className="mt-3 max-w-2xl border-l-2 border-accent/40 pl-3 text-[0.85rem] leading-relaxed text-mist-400">
            {block.note}
          </p>
        )}

        {block.video && (
          <div className="mt-6">
            <LiteYouTube id={block.video.id} title={block.video.title} />
          </div>
        )}

        {block.links && (
          <div className="mt-5 flex flex-wrap gap-3">
            {block.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.78rem] text-mist-200 transition-colors hover:border-accent/50 hover:text-accent"
              >
                {l.label}
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {block.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-[0.72rem] text-mist-400"
            >
              {t}
            </span>
          ))}
        </div>

        {isContact && (
          <a
            href="#contact"
            onClick={() => {
              if (typeof window !== "undefined")
                window.dispatchEvent(new Event("creative:book"));
            }}
            className="btn-primary mt-7 !py-2.5 text-sm"
          >
            Book Creative Work
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Creative() {
  return (
    <Section id="media" divider tone="control">
      <SectionHeading
        eyebrow="Beyond Work"
        title="The *creative* side."
        subtitle="Technology gives structure. Creativity gives it attention. That combination is what makes a digital presence memorable."
      />

      {/* cinematic controller sub-navigation */}
      <CreativeControlNav />

      {/* content blocks */}
      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {CREATIVE_BLOCKS.map((block, i) => (
          <div
            key={block.id}
            className={block.id === "media-overview" ? "lg:col-span-2" : ""}
          >
            <Block block={block} index={i} />
          </div>
        ))}
      </div>
    </Section>
  );
}
