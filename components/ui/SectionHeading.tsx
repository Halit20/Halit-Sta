"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { AnimatedText } from "@/components/ui/AnimatedText";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${
        centered ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="h-px w-6 bg-accent/70" />
        {eyebrow}
      </motion.span>

      <h2
        className={`text-balance text-3xl leading-[1.05] sm:text-4xl lg:text-[2.9rem] ${
          centered ? "max-w-3xl" : "max-w-2xl"
        }`}
      >
        <AnimatedText text={title} wordClassName="text-gradient" delay={0.1} />
      </h2>

      {subtitle && (
        <motion.p
          className={`text-[0.98rem] leading-relaxed text-mist-400 ${
            centered ? "max-w-2xl" : "max-w-xl"
          }`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
