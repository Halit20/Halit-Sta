"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.4,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMove(e: React.PointerEvent) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const MotionTag = (href ? motion.a : motion.button) as typeof motion.a;

  return (
    <MotionTag
      ref={ref}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
