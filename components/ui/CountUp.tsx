"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type Props = { to: number; suffix?: string; className?: string };

/** Integer counter that springs from 0 to `to` when scrolled into view. */
export function CountUp({ to, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 55, damping: 18 });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${to}${suffix}`;
      return;
    }
    value.set(to);
  }, [inView, reduce, to, suffix, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
  }, [spring, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
