"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** disables the motion variant when used inside a custom parent */
  bare?: boolean;
};

/**
 * Premium card with a cursor-following spotlight glow + animated gradient border.
 * Uses CSS custom properties updated on pointer move (no React re-render).
 */
export function SpotlightCard({ children, className = "", bare }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const content = (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`group surface surface-hover relative overflow-hidden ${className}`}
    >
      {/* spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(214,165,68,0.12), transparent 60%)",
        }}
      />
      {/* top sheen line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (bare) return content;

  return <motion.div variants={fadeUp}>{content}</motion.div>;
}
