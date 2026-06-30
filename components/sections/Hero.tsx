"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import halitPortrait from "@/public/img/halit.jpeg";
import { PROFILE } from "@/lib/data";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { EASE } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      <div className="shell relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — copy */}
        <motion.div style={{ y: yText, opacity }} className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs tracking-wide text-mist-300">
              {PROFILE.availability}
            </span>
          </motion.div>

          <h1 className="font-display font-bold tracking-tightest text-mist-100">
            <span className="block overflow-hidden pb-[0.08em] text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
              <AnimatedText text="Halit Statovci" immediate delay={0.45} />
            </span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
              className="mt-4 block text-[1.2rem] font-medium leading-snug text-mist-200 sm:text-[1.4rem] lg:text-[1.6rem]"
            >
              <span className="text-accent-gradient">Full-Cycle AI Engineer</span>
              <span className="text-mist-500"> &amp; </span>
              <span className="text-mist-200">Digital Solutions Builder</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
            className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-mist-300"
          >
            {PROFILE.heroSupport}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#work" className="btn-primary">
              View My Work
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
            <a href="#contact" className="btn-ghost">
              Start a Project
            </a>
          </motion.div>

          {/* Mini capability labels */}
          <motion.ul
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 1.2 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3"
          >
            {PROFILE.labels.map((label) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-mist-500"
              >
                <span className="h-1 w-1 rounded-full bg-accent/80" />
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — portrait */}
        <motion.div
          style={{ y: yPortrait }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
            {/* glow frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-accent/10 via-transparent to-transparent blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
              className="relative h-full w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-800"
            >
              <Image
                src={halitPortrait}
                alt="Portrait of Halit Statovci"
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 80vw, 420px"
                className="portrait-duotone object-cover object-[58%_24%]"
              />
              {/* graphite duotone deepen */}
              <div className="absolute inset-0 bg-gradient-to-br from-ink-950/30 via-transparent to-ink-950/60 mix-blend-multiply" />
              {/* cool cyan key wash */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-transparent mix-blend-soft-light" />
              {/* mask edges into the scene (left + bottom) */}
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/15 to-transparent" />
              {/* rim light: bright top edge + cyan right rim + lifted contrast */}
              <div className="absolute inset-0 rounded-[1.6rem] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.18),inset_-26px_0_55px_-38px_rgba(125,211,252,0.65),inset_0_-1px_0_rgba(0,0,0,0.5)]" />
            </motion.div>

            {/* floating capability card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1 }}
              className="absolute -left-3 bottom-10 hidden rounded-xl border border-white/10 bg-ink-900/80 px-4 py-3 backdrop-blur-md sm:block"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-500">
                Discipline
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-mist-100">
                Idea → Launch
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
              className="absolute -right-3 top-12 hidden rounded-xl border border-white/10 bg-ink-900/80 px-4 py-3 backdrop-blur-md sm:block"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-mist-500">
                Stack
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-mist-100">
                Web · AI · Infra
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-mist-500">
          Scroll
        </span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
