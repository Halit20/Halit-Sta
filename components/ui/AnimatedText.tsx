"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** animate immediately instead of on scroll into view */
  immediate?: boolean;
};

/** Word-by-word mask reveal — each word slides up from behind a clip. */
export function AnimatedText({
  text,
  className = "",
  delay = 0,
  immediate = false,
}: Props) {
  const words = text.split(" ");
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
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.28em] inline-block overflow-hidden py-[0.06em]"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
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
