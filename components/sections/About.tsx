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
  { k: "Full-cycle", v: "From idea to deployment" },
  { k: "Multi-disciplinary", v: "Engineering · Design · Media" },
  { k: "Production-ready", v: "Hosting · SSL · Servers" },
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
              placeholder="blur"
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
              “I build the digital layer a business needs — from idea to
              launch.”
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
            title="The builder *behind the brand.*"
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerParent(0.12)}
            className="mt-7 space-y-5 text-[1rem] leading-relaxed text-mist-400"
          >
            <motion.p variants={blurIn}>
              I&apos;m Halit — a Kosovo-based engineer who builds the full digital
              side of a business. Software, AI workflows, branding, media, and the
              infrastructure underneath: I&apos;m comfortable across all of it.
            </motion.p>
            <motion.p variants={blurIn}>
              I&apos;ve been building for the internet since the early Albanian
              YouTube days — as one of the first Albanian-community YouTubers
              with MegaSHQIP in the gaming era — first content and audiences,
              then the systems behind them.
            </motion.p>
            <motion.p variants={blurIn}>
              I didn&apos;t come up through a single lane. I&apos;ve worked in
              institutional IT and server environments, built web platforms and
              SaaS interfaces, produced video and drone content, and set up the
              hosting that keeps it all running.
            </motion.p>
            <motion.p variants={blurIn}>
              That range is the point.{" "}
              <span className="text-mist-200">
                I understand both the technical system and the brand on top of it
              </span>{" "}
              — so the things I build look right, work properly, and pull in the
              same direction.
            </motion.p>
            <motion.p variants={blurIn} className="text-mist-300">
              I don&apos;t just hand over a website. I build the digital
              foundation a business runs on — and I stay close enough to the whole
              picture to make sure it actually launches.
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
