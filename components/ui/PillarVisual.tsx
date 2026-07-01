"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import type { ReactNode } from "react";
import { useAmbientMotion } from "@/lib/hooks";

type PillarId = "ai" | "web" | "branding" | "media" | "infra";

const LOOP: Transition = { duration: 4, repeat: Infinity, ease: "easeInOut" };

/** Ambient animated scene for each identity pillar. Fills its parent. */
export function PillarVisual({ id }: { id: PillarId }) {
  const animate = useAmbientMotion();
  const scenes: Record<PillarId, ReactNode> = {
    ai: <AiScene animate={animate} />,
    web: <WebScene animate={animate} />,
    branding: <BrandScene animate={animate} />,
    media: <MediaScene animate={animate} />,
    infra: <InfraScene animate={animate} />,
  };
  return (
    <div aria-hidden="true" className="relative h-full w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-900/60">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 80% at 30% 20%, rgba(56,189,248,0.08), transparent 70%)",
        }}
      />
      {scenes[id]}
      <div className="noise absolute inset-0 opacity-[0.04]" />
    </div>
  );
}

/* --- AI: neural node graph, nodes pulse, links breathe --- */
const AI_NODES = [
  [60, 60], [180, 40], [300, 70], [100, 150], [220, 140],
  [330, 170], [60, 230], [180, 240], [300, 250],
] as const;
const AI_LINKS = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
  [3, 6], [4, 7], [5, 8], [6, 7], [7, 8], [1, 3], [2, 4],
] as const;

function AiScene({ animate }: { animate: boolean }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      {AI_LINKS.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={AI_NODES[a][0]} y1={AI_NODES[a][1]}
          x2={AI_NODES[b][0]} y2={AI_NODES[b][1]}
          stroke="rgba(56,189,248,0.35)" strokeWidth="1"
          animate={animate ? { opacity: [0.15, 0.6, 0.15] } : undefined}
          transition={{ ...LOOP, delay: i * 0.25 }}
        />
      ))}
      {AI_NODES.map(([x, y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5}
          fill="rgba(125,211,252,0.9)"
          animate={animate ? { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] } : undefined}
          transition={{ ...LOOP, duration: 3, delay: i * 0.3 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

/* --- Web: wireframe browser, content bars slide in on loop --- */
function WebScene({ animate }: { animate: boolean }) {
  const bars = [
    { y: 96, w: 180 }, { y: 122, w: 240 }, { y: 148, w: 140 },
    { y: 190, w: 90 }, { y: 190, w: 90, x: 210 },
  ];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect x="50" y="40" width="300" height="220" rx="10" fill="rgba(8,8,8,0.6)" stroke="rgba(255,255,255,0.15)" />
      <line x1="50" y1="72" x2="350" y2="72" stroke="rgba(255,255,255,0.12)" />
      {[70, 88, 106].map((cx, i) => (
        <circle key={i} cx={cx} cy="56" r="4" fill={i === 0 ? "rgba(56,189,248,0.8)" : "rgba(255,255,255,0.2)"} />
      ))}
      {bars.map((b, i) => (
        <motion.rect
          key={i} x={b.x ?? 80} y={b.y} height="12" rx="4" width={b.w}
          fill={i === 3 ? "rgba(56,189,248,0.55)" : "rgba(255,255,255,0.10)"}
          animate={animate ? { opacity: [0, 1, 1, 0], scaleX: [0.4, 1, 1, 0.4] } : undefined}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          style={{ transformOrigin: `${b.x ?? 80}px ${b.y}px` }}
        />
      ))}
    </svg>
  );
}

/* --- Branding: rotating identity shapes orbiting a monogram --- */
function BrandScene({ animate }: { animate: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="absolute h-44 w-44 rounded-[2rem] border border-accent/30"
        animate={animate ? { rotate: 360 } : undefined}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-60 w-60 rounded-full border border-white/10"
        animate={animate ? { rotate: -360 } : undefined}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
      </motion.div>
      <motion.span
        className="font-display text-6xl font-bold text-mist-100/20"
        animate={animate ? { scale: [1, 1.06, 1] } : undefined}
        transition={{ ...LOOP, duration: 5 }}
      >
        HS
      </motion.span>
    </div>
  );
}

/* --- Media: viewfinder with focus ring + REC pulse --- */
function MediaScene({ animate }: { animate: boolean }) {
  return (
    <div className="absolute inset-0 p-8">
      {/* corner brackets */}
      {["top-6 left-6 border-t border-l", "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l", "bottom-6 right-6 border-b border-r"].map((pos) => (
        <span key={pos} className={`absolute h-8 w-8 border-accent/60 ${pos}`} />
      ))}
      <div className="absolute left-8 top-8 flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-mist-300">
        <motion.span
          className="h-2 w-2 rounded-full bg-red-500"
          animate={animate ? { opacity: [1, 0.2, 1] } : undefined}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        REC 4K·24
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-24 w-24 rounded-full border border-accent/50"
          animate={animate ? { scale: [1, 1.25, 1], opacity: [0.9, 0.4, 0.9] } : undefined}
          transition={{ ...LOOP, duration: 3.2 }}
        />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
    </div>
  );
}

/* --- Infra: server rack rows with blinking LEDs + data pulse --- */
function InfraScene({ animate }: { animate: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 px-14">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-ink-900/70 px-4">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={animate ? { opacity: [1, 0.15, 1] } : undefined}
            transition={{ duration: 1.2 + row * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <div className="relative ml-auto h-1 w-24 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="absolute inset-y-0 w-1/3 rounded-full bg-accent/70"
              animate={animate ? { x: ["-100%", "300%"] } : undefined}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: row * 0.3 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
