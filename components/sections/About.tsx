"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import halitPortrait from "@/public/img/halit.jpeg";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { EASE, blurIn, staggerParent } from "@/lib/motion";

const STATS = [
  { k: "Full-cycle", v: "Strategy to deployment" },
  { k: "Multi-disciplinary", v: "AI · Engineering · Design · Media" },
  { k: "Production-ready", v: "Hosting · SSL · Infrastructure" },
];

/** Renders a stat value through CountUp if it's a plain number (optionally with a +/% suffix). */
function StatValue({ value, className }: { value: string; className?: string }) {
  const match = /^(\d+)(\+|%)?$/.exec(value.trim());
  if (!match) return <>{value}</>;
  const [, num, suffix = ""] = match;
  return <CountUp to={Number(num)} suffix={suffix} className={className} />;
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <Section id="about" divider tone="warm">
      <div
        ref={sectionRef}
        className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        {/* portrait + floating cards */}
        <div className="relative">
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[1.5rem] border border-white/10"
          >
            <Image
              src={halitPortrait}
              alt="Halit Statovci working portrait — Full-Cycle AI Engineer based in Kosovo"
              fill
              // Dev-only skip: /_next/image is disabled by output:"export"
              // (400), while the exported build inlines a base64 blur.
              placeholder={
                process.env.NODE_ENV === "development" ? "empty" : "blur"
              }
              sizes="(max-width: 1024px) 80vw, 380px"
              className="portrait-duotone object-cover object-[58%_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent mix-blend-overlay" />
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="surface mx-auto mt-5 max-w-[380px] p-6"
          >
            <p className="font-display text-[1.05rem] italic leading-relaxed text-mist-200">
              “I build the digital systems that turn ideas into working
              businesses.”
            </p>
            <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-mist-500">
              — Halit Sta
            </footer>
          </motion.blockquote>
        </div>

        {/* content */}
        <div>
          <SectionHeading
            eyebrow="About"
            title="The builder *behind the digital system.*"
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerParent(0.12)}
            className="mt-7 space-y-5 text-[1rem] leading-relaxed text-mist-400"
          >
            <motion.p variants={blurIn}>
              I&apos;m Halit — a Full-Cycle AI Engineer and Digital Solutions
              Builder based in Kosovo, working remotely with businesses across
              Europe.
            </motion.p>
            <motion.p variants={blurIn}>
              I design and build the digital infrastructure a business needs to
              operate, grow, and scale — from AI-powered workflows, custom
              platforms, and internal systems to websites, branding, and digital
              content.
            </motion.p>
            <motion.p variants={blurIn}>
              My path started with building online communities and producing
              content, then expanded into software engineering, automation,
              server infrastructure, SaaS products, and complete digital
              ecosystems. That background allows me to understand both the
              technology underneath and the experience people see on top.
            </motion.p>
            <motion.p variants={blurIn}>
              I work across the full lifecycle of a project: defining the idea,
              designing the solution, building the system, deploying it, and
              making sure it performs reliably in the real world.
            </motion.p>
            <motion.p variants={blurIn} className="text-mist-300">
              I don&apos;t just deliver a website, a design, or a piece of
              software. I build connected digital foundations that look right,
              work properly, simplify operations, and move the business forward.
            </motion.p>
          </motion.div>

          <Reveal
            stagger={0.1}
            className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {STATS.map((s) => (
              <RevealItem
                key={s.k}
                className="surface p-5"
              >
                <p className="font-display text-base font-semibold text-mist-100">
                  <StatValue value={s.k} />
                </p>
                <p className="mt-1 text-[0.8rem] text-mist-500">{s.v}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
