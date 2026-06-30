"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerParent } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Render staggered children — each direct child should be a <Reveal.Item> */
  stagger?: number;
  as?: "div" | "section" | "ul" | "li" | "span";
};

export function Reveal({
  children,
  className,
  delay = 0,
  stagger,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  const variants =
    typeof stagger === "number"
      ? staggerParent(stagger, delay)
      : {
          hidden: fadeUp.hidden,
          show: {
            ...fadeUp.show,
            transition: {
              ...(fadeUp.show as { transition: object }).transition,
              delay,
            },
          },
        };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}
