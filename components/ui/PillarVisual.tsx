"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAmbientMotion } from "@/lib/hooks";

type PillarId = "ai" | "web" | "branding" | "media" | "infra";

const ORDER: PillarId[] = ["ai", "web", "branding", "media", "infra"];

/* Pentagon around the center (200,150), viewBox 400×300 */
const NODES: Record<
  PillarId,
  {
    x: number;
    y: number;
    label: string;
    lx: number;
    ly: number;
    anchor: "start" | "middle" | "end";
  }
> = {
  ai: { x: 200, y: 55, label: "AI", lx: 200, ly: 40, anchor: "middle" },
  web: { x: 290, y: 121, label: "WEB", lx: 304, ly: 125, anchor: "start" },
  branding: { x: 256, y: 227, label: "BRAND", lx: 267, ly: 245, anchor: "start" },
  media: { x: 144, y: 227, label: "MEDIA", lx: 133, ly: 245, anchor: "end" },
  infra: { x: 110, y: 121, label: "INFRA", lx: 96, ly: 125, anchor: "end" },
};

/**
 * SystemVisual — one scene for all five disciplines: nodes wired to a
 * single core, activated one at a time. `active` drives it from outside
 * (desktop hover/scroll); `auto` cycles slowly on its own (mobile).
 */
export function SystemVisual({
  active,
  auto = false,
}: {
  active?: PillarId;
  auto?: boolean;
}) {
  const animate = useAmbientMotion();
  const [autoIdx, setAutoIdx] = useState(0);

  useEffect(() => {
    if (!auto || !animate) return;
    const t = setInterval(() => setAutoIdx((i) => (i + 1) % ORDER.length), 3200);
    return () => clearInterval(t);
  }, [auto, animate]);

  const current: PillarId = auto ? ORDER[autoIdx] : active ?? "ai";

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-900/60"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 80% at 30% 20%, rgba(214,165,68,0.08), transparent 70%)",
        }}
      />

      {/* status label */}
      <div className="absolute left-6 top-6 flex items-center gap-2 font-mono text-[0.62rem] tracking-widest text-mist-400">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={animate ? { opacity: [1, 0.25, 1] } : undefined}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        SYSTEM ACTIVE
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="sysSweep" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="rgba(214,165,68,0.14)" />
            <stop offset="1" stopColor="rgba(214,165,68,0)" />
          </linearGradient>
        </defs>

        {/* slow scanning sweep around the core */}
        {animate && (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 150px" }}
          >
            <line
              x1="200"
              y1="150"
              x2="200"
              y2="34"
              stroke="url(#sysSweep)"
              strokeWidth="1.5"
            />
          </motion.g>
        )}

        {/* hairline links: core → node */}
        {ORDER.map((id) => {
          const n = NODES[id];
          const on = id === current;
          return (
            <motion.line
              key={`l-${id}`}
              x1="200"
              y1="150"
              x2={n.x}
              y2={n.y}
              stroke="rgba(214,165,68,0.6)"
              strokeWidth="0.75"
              animate={{ opacity: on ? 0.6 : 0.16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          );
        })}

        {/* the core — the current circle, kept */}
        <motion.circle
          cx="200"
          cy="150"
          r="32"
          fill="none"
          stroke="rgba(214,165,68,0.5)"
          strokeWidth="1"
          animate={
            animate ? { scale: [1, 1.1, 1], opacity: [0.9, 0.45, 0.9] } : undefined
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 150px" }}
        />
        <circle cx="200" cy="150" r="3" fill="rgba(234,201,126,0.95)" />

        {/* nodes + labels */}
        {ORDER.map((id) => {
          const n = NODES[id];
          const on = id === current;
          return (
            <g key={`n-${id}`}>
              {animate && on && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r="10"
                  fill="none"
                  stroke="rgba(214,165,68,0.7)"
                  strokeWidth="0.75"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.08, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
              )}
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="4"
                fill="rgba(234,201,126,0.95)"
                animate={{ opacity: on ? 1 : 0.4, scale: on ? 1.25 : 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              <motion.text
                x={n.lx}
                y={n.ly}
                textAnchor={n.anchor}
                dominantBaseline="middle"
                fill="#cfcabf"
                fontSize="10"
                letterSpacing="2"
                fontFamily="var(--font-mono, monospace)"
                animate={{ opacity: on ? 0.95 : 0.45 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {n.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      <div className="noise absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
