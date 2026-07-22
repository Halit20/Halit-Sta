"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  SOCIAL_CLIENT,
  SOCIAL_CARDS,
  SOCIAL_SERVICES,
  type SocialCard,
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

function SquareBullet() {
  return <span className="mt-[0.5em] h-1 w-1 shrink-0 bg-accent/70" />;
}

function CardBody({ card }: { card: SocialCard }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-accent/70">
            {card.kind}
          </span>
          <h3 className="mt-1 font-display text-base font-semibold text-mist-100">
            {card.name}
          </h3>
          {card.handle && (
            <p className="mt-0.5 font-mono text-[0.68rem] text-mist-500">
              {card.handle}
            </p>
          )}
        </div>
        {card.href && (
          <span className="mt-1 shrink-0 text-mist-500 transition-colors group-hover:text-accent">
            <ExternalArrow />
          </span>
        )}
      </div>
      <ul className="mt-4 space-y-1.5 border-t border-white/8 pt-4">
        {card.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-[0.8rem] leading-snug text-mist-400"
          >
            <SquareBullet />
            {point}
          </li>
        ))}
      </ul>
    </>
  );
}

export function SocialMedia() {
  const cardCls =
    "surface flex h-full flex-col p-5 transition-colors duration-300 hover:!border-accent/30";

  return (
    <Section id="social-media" divider tone="calm">
      <SectionHeading
        eyebrow="Social Media Management"
        title="Social media management built around real content, *planning, and consistency.*"
        subtitle={SOCIAL_CLIENT.summary}
      />

      {/* soft shade so the moving background stays behind both grids;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-44 bottom-0 bg-[radial-gradient(80%_92%_at_50%_55%,rgba(3,3,3,0.4),transparent_82%)]"
      />

      {/* main client line */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mt-8 inline-flex flex-wrap items-center gap-3 border border-white/10 bg-white/[0.02] px-4 py-2.5"
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

      {/* first grid: execution, planning, production, community — 6 cards */}
      <Reveal
        stagger={0.06}
        className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SOCIAL_CARDS.map((card) =>
          card.href ? (
            <motion.a
              key={card.id}
              variants={fadeUp}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${card.name} — ${SOCIAL_CLIENT.name} (opens in a new tab)`}
              className={`group ${cardCls}`}
            >
              <CardBody card={card} />
            </motion.a>
          ) : (
            <motion.div key={card.id} variants={fadeUp} className={cardCls}>
              <CardBody card={card} />
            </motion.div>
          )
        )}
      </Reveal>

      {/* the weekly service behind it */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mt-8 flex flex-wrap gap-2"
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
      <div className="relative mt-24">
        <div className="divider-line mb-16" />
        <SectionHeading
          eyebrow="Platform & Listing Management"
          title="More than posts — the full digital *hospitality presence.*"
          subtitle="Maps, hospitality platforms, reviews, imagery, and listing accuracy — managed as one connected system so the brand guests see online matches the experience they find on arrival."
        />
        <Reveal
          stagger={0.08}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MANAGED_PLATFORMS.map((p) => (
            <motion.div key={p.id} variants={fadeUp} className={cardCls.replace("p-5", "p-6")}>
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
                    <SquareBullet />
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
