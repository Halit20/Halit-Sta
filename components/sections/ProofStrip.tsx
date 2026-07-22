"use client";

import { motion } from "framer-motion";
import {
  IDENTITY_PILLARS,
  PROOF_POINTS,
  SERVICES,
} from "@/lib/data";
import { fadeUp, staggerParent, VIEWPORT_ONCE, EASE } from "@/lib/motion";
import { CountUp } from "@/components/ui/CountUp";

const STATS = [
  { value: 25, suffix: "+", label: "Projects shipped" },
  { value: SERVICES.length, suffix: "", label: "Core service areas" },
  { value: IDENTITY_PILLARS.length, suffix: "", label: "Disciplines, one builder" },
];

/** Small inline glyphs so each proof point stops being text-only. */
const GLYPHS = [
  <path key="0" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />, // cycle
  <path key="1" d="M4 19h16M6 19V9l6-4 6 4v10" />, // education
  <path key="2" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />, // globe
  <path key="3" d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />, // shield
  <path key="4" d="M4 6h16M4 12h10M4 18h13" />, // stack
  <path key="5" d="M5 12l4 4L19 6" />, // check
];

export function ProofStrip() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.04] bg-ink-900/40">
      {/* one-time accent sweep across the strip */}
      <motion.div
        aria-hidden
        initial={{ x: "-110%" }}
        whileInView={{ x: "110%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/[0.06] to-transparent"
      />

      <div className="shell py-12">
        {/* animated counters */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mb-10 grid grid-cols-3 gap-6"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="flex flex-col gap-2.5">
              <span className="font-display text-3xl font-bold text-mist-100 sm:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-mist-400">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="divider-line mb-10" />

        {/* proof points, now with glyphs */}
        <div className="relative">
          {/* subtle shade so the moving background stays behind the copy;
              soft radial edges keep it from reading as a panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-5 bg-[radial-gradient(90%_100%_at_50%_50%,rgba(3,3,3,0.4),transparent_85%)]"
          />
          <motion.div
            variants={staggerParent(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="relative grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-6"
          >
            {PROOF_POINTS.map((p, i) => (
              <motion.div key={p.label} variants={fadeUp} className="group flex flex-col gap-2.5">
                <svg
                  className="h-5 w-5 text-accent/70 transition-colors duration-300 group-hover:text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {GLYPHS[i % GLYPHS.length]}
                </svg>
                <span className="text-balance text-[0.82rem] font-medium leading-snug text-mist-200">
                  {p.label}
                </span>
                <span className="text-[0.66rem] uppercase tracking-wider text-mist-500">
                  {p.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
