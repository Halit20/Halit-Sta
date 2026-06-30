"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import halitPortrait from "@/public/img/halit.jpeg";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

const STATS = [
  { k: "Full-cycle", v: "From idea to deployment" },
  { k: "Multi-disciplinary", v: "Engineering · Design · Media" },
  { k: "Production-ready", v: "Hosting · SSL · Servers" },
];

export function About() {
  return (
    <Section id="about" divider tone="warm">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* portrait + floating cards */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[1.5rem] border border-white/10"
          >
            <Image
              src={halitPortrait}
              alt="Halit Statovci"
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
              “I build the digital layer a business needs — from the first idea
              to the final launch.”
            </p>
            <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-mist-500">
              — Halit Statovci
            </footer>
          </motion.blockquote>
        </div>

        {/* content */}
        <div>
          <SectionHeading
            eyebrow="About"
            title="The builder behind the brand."
          />
          <div className="mt-7 space-y-5 text-[1rem] leading-relaxed text-mist-400">
            <p>
              I&apos;m Halit — a Kosovo-based engineer who builds the full digital
              side of a business. Software, AI workflows, branding, media, and the
              infrastructure underneath: I&apos;m comfortable across all of it.
            </p>
            <p>
              I didn&apos;t come up through a single lane. I&apos;ve worked in
              institutional IT and server environments, built web platforms and
              SaaS interfaces, produced video and drone content, and set up the
              hosting that keeps it all running.
            </p>
            <p>
              That range is the point.{" "}
              <span className="text-mist-200">
                I understand both the technical system and the brand on top of it
              </span>{" "}
              — so the things I build look right, work properly, and pull in the
              same direction.
            </p>
            <p className="text-mist-300">
              I don&apos;t just hand over a website. I build the digital
              foundation a business runs on — and I stay close enough to the whole
              picture to make sure it actually launches.
            </p>
          </div>

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
                  {s.k}
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
