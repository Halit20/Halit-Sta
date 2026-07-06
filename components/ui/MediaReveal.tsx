"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

/** Cinematic media entrance: clip mask opens while the media settles from 115% scale. */
export function MediaReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  const viewport = { once: true, margin: "-8% 0px" } as const;
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(14% 7% 14% 7%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 1.05, ease: EASE, delay }}
    >
      <motion.div
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.35, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
