"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE } from "@/lib/motion";

const POINTS = [
  "Smarter, faster business websites as the default — not the exception",
  "Brands that look the same level of serious everywhere they appear",
  "AI and automation doing the repetitive work in the background",
  "Production-grade infrastructure standard on every project",
  "One team accountable from idea to launch — and after it",
];

export function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden py-28 sm:py-36">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[40vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.16), transparent 70%)",
          }}
        />
        <div className="grid-overlay absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_50%,#000,transparent)]" />
      </div>

      <div className="shell relative z-10">
        <div className="divider-line mb-16" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* left — headline + copy */}
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-accent/70" />
              Vision
            </span>
            <h2 className="mt-6 max-w-2xl pb-[0.1em] font-display text-4xl font-bold leading-[1.06] tracking-tightest sm:text-5xl lg:text-[3.4rem]">
              <span className="text-gradient">
                Building the digital layer for modern businesses.
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-mist-400"
            >
              I&apos;m growing Halit Statovci into a focused digital solutions
              studio — one place where businesses in Kosovo and beyond get
              engineering, design, AI, media, and infrastructure under a single
              standard, instead of stitching together five vendors who never
              talk to each other.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
              className="mt-10"
            >
              <MagneticButton href="#contact" className="btn-primary">
                Build the next one with me
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
            </motion.div>
          </div>

          {/* right — vision callout card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="surface relative overflow-hidden p-7 sm:p-8"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.2), transparent 70%)",
              }}
            />
            <span className="text-[0.66rem] uppercase tracking-[0.2em] text-accent/80">
              What I&apos;m building toward
            </span>
            <ul className="mt-6 space-y-px">
              {POINTS.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                  className="flex items-start gap-3 border-b border-white/6 py-3.5 text-[0.95rem] text-mist-200 last:border-b-0"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="leading-snug">{p}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/8 pt-5 font-display text-sm font-medium italic text-mist-300">
              “The goal isn&apos;t more tools. It&apos;s fewer handoffs and a
              better result.”
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
