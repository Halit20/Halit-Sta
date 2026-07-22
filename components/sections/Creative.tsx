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

/* Semantic status tone per card: red REC only on recording-type cards,
   gold camera status for overview/photography, neutral for gear/contact. */
const REC_IDS = new Set(["media-videos", "media-drone", "media-reels"]);
const GOLD_IDS = new Set(["media-overview", "media-photography"]);

function Block({ block, index }: { block: CreativeBlock; index: number }) {
  const isContact = block.id === "media-contact";
  const hue = 150 + index * 16;
  const rec = REC_IDS.has(block.id);
  const gold = GOLD_IDS.has(block.id);
  // gear count comes from the real equipment list, never hardcoded
  const code =
    block.id === "media-gear"
      ? `KIT ${String(block.tags.length).padStart(2, "0")}`
      : block.code;

  return (
    <motion.div
      id={block.id}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.75, ease: EASE }}
      className="group surface relative flex h-full flex-col overflow-hidden p-7 scroll-mt-28 sm:p-9"
    >
      {/* atmospheric wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 120% at 85% 0%, hsl(${hue} 35% 12% / 0.7), transparent 60%)`,
        }}
      />
      <Corners />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* viewfinder status line */}
        <div className="mb-6 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.18em]">
          <span
            className={`flex items-center gap-2 ${
              rec ? "text-red-400/90" : gold ? "text-accent/80" : "text-mist-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                rec
                  ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                  : gold
                    ? "bg-accent shadow-[0_0_8px_rgba(214,165,68,0.7)]"
                    : "bg-mist-500/70"
              }`}
            />
            {code}
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

        {/* framed still preview — real photograph, no play button */}
        {block.photo && (
          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-ink-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.photo.src}
              alt={block.photo.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-ink-950/30" />
            {/* subtle focus marker */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
            />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(214,165,68,0.7)]" />
              Still
            </span>
            <span className="absolute right-4 top-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mist-400">
              RAW · 24MP
            </span>
          </div>
        )}

        {/* framed 9:16 preview — muted, loop, reduced-motion aware */}
        {block.reel && (
          <div className="mt-6 flex justify-center">
            <div className="relative aspect-[9/16] h-[380px] overflow-hidden rounded-xl border border-white/10 bg-ink-950">
              <video
                src={block.reel.src}
                poster={block.reel.poster}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={block.reel.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute left-3 top-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-red-400/90">
                9:16 Vert
              </span>
              <span className="pointer-events-none absolute right-3 top-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-mist-400">
                1080 · 30fps
              </span>
            </div>
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

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
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
            className="btn-primary mt-7 !py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
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
        subtitle="Technology creates structure. Creativity earns attention. Together, they make a digital presence memorable."
      />

      {/* cinematic controller sub-navigation */}
      <CreativeControlNav />

      {/* soft shade so the moving background stays behind the grid;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-48 bottom-0 bg-[radial-gradient(80%_90%_at_50%_55%,rgba(3,3,3,0.4),transparent_82%)]"
      />

      {/* content blocks */}
      <div className="relative mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {CREATIVE_BLOCKS.map((block, i) => (
          <div
            key={block.id}
            className={`h-full ${
              block.id === "media-overview" ? "lg:col-span-2" : ""
            }`}
          >
            <Block block={block} index={i} />
          </div>
        ))}
      </div>
    </Section>
  );
}
