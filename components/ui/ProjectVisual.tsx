"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Abstract, deterministic project artwork driven by a hue value — now ambient. */
export function ProjectVisual({
  hue,
  title,
  className = "",
}: {
  hue: string;
  title: string;
  className?: string;
}) {
  const h = Number(hue);
  const reduce = useReducedMotion() ?? false;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 20% 10%, hsl(${h} 60% 14% / 0.9), #0a0a0a 60%)`,
      }}
      aria-hidden="true"
    >
      {/* drifting mesh glow */}
      <motion.div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: `hsl(${h} 80% 50% / 0.25)` }}
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`g-${hue}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`hsl(${h} 80% 60%)`} stopOpacity="0.5" />
            <stop offset="100%" stopColor={`hsl(${h} 80% 60%)`} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke={`hsl(${h} 70% 70% / 0.18)`} fill="none" strokeWidth="0.8">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="240" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 48} x2="400" y2={i * 48} />
          ))}
        </g>
        {/* breathing wave */}
        <motion.path
          d="M0 180 Q120 120 220 160 T400 110 V240 H0 Z"
          fill={`url(#g-${hue})`}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* rotating rings */}
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 80px" }}
        >
          <circle cx="300" cy="80" r="48" fill="none" stroke={`hsl(${h} 80% 65% / 0.4)`} strokeWidth="1" strokeDasharray="6 10" />
          <circle cx="300" cy="80" r="78" fill="none" stroke={`hsl(${h} 80% 65% / 0.18)`} strokeWidth="1" />
        </motion.g>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-5xl font-bold tracking-tighter opacity-[0.14]"
          style={{ color: `hsl(${h} 30% 90%)` }}
        >
          {title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
        </span>
      </div>
      <div className="noise absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
