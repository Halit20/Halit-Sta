"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** animate immediately instead of on scroll into view */
  immediate?: boolean;
  /** class applied to each per-word inner span (e.g. for gradient text) */
  wordClassName?: string;
};

/**
 * Word-by-word mask reveal — each word slides up from behind a clip.
 * Words wrapped in asterisks ("Official *Certifications*") render in the
 * italic gold display voice instead of wordClassName.
 */
export function AnimatedText({
  text,
  className = "",
  delay = 0,
  immediate = false,
  wordClassName = "",
}: Props) {
  const words: { word: string; italic: boolean }[] = [];
  let italic = false;
  for (let raw of text.split(" ")) {
    if (raw.startsWith("*")) {
      italic = true;
      raw = raw.slice(1);
    }
    const closes = raw.endsWith("*");
    if (closes) raw = raw.slice(0, -1);
    words.push({ word: raw, italic });
    if (closes) italic = false;
  }
  const viewProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true } };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      {...viewProps}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map(({ word, italic: isItalic }, i) => (
        <span
          key={`${word}-${i}`}
          // extra bottom padding keeps gradient-clipped descenders visible;
          // the negative margin cancels it out of the line rhythm
          className="mr-[0.28em] -mb-[0.18em] inline-block overflow-hidden pb-[0.18em] pt-[0.06em]"
        >
          <motion.span
            className={`inline-block ${isItalic ? "accent-italic pr-[0.06em]" : wordClassName}`}
            variants={{
              hidden: { y: "135%" },
              show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
