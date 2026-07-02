"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useAmbientMotion } from "@/lib/hooks";
import type { Project } from "@/lib/data";

type Screen = Project["screen"];

/**
 * Stylized browser mockup — a fake chrome bar plus an abstracted, pure-CSS
 * representation of each project's actual UI. Deliberately simplified so it
 * reads as an intentional illustration, not a faked screenshot.
 */
export function ProjectVisual({
  hue,
  screen,
  label,
  className = "",
}: {
  hue: string;
  screen: Screen;
  /** text shown in the fake address bar (real domain when verified) */
  label: string;
  className?: string;
}) {
  const h = Number(hue);
  const reduce = !useAmbientMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const play = inView && !reduce;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(130% 130% at 18% 0%, hsl(${h} 45% 11% / 0.95), #0a0a0b 62%)`,
      }}
      aria-hidden="true"
    >
      {/* drifting ambient glow */}
      <motion.div
        className="absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
        style={{ background: `hsl(${h} 80% 52% / 0.22)` }}
        animate={play ? { x: [0, -26, 0], y: [0, 20, 0] } : undefined}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* browser window */}
      <div className="relative m-[7%] mb-0 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-lg border border-b-0 border-white/10 bg-[#0d0d0f]/90 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
        {/* chrome bar */}
        <div className="flex shrink-0 items-center gap-2 border-b border-white/8 bg-white/[0.03] px-2.5 py-1.5">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f16057]/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5bd4f]/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#57c454]/80" />
          </span>
          <span className="mx-auto flex max-w-[70%] items-center gap-1 truncate rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[0.5rem] tracking-wide text-white/45">
            <svg
              className="h-1.5 w-1.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            {label}
          </span>
          <span className="w-6" />
        </div>

        {/* mini screen */}
        <div className="relative min-h-0 flex-1 overflow-hidden p-2.5">
          <MiniScreen screen={screen} h={h} play={play} />
        </div>
      </div>

      <div className="noise absolute inset-0 opacity-[0.04]" />
    </div>
  );
}

/* ---------------- shared primitives ---------------- */

function Line({
  w,
  strong = false,
  accent,
  className = "",
}: {
  w: string;
  strong?: boolean;
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={`block h-1 rounded-full ${className}`}
      style={{
        width: w,
        background: accent
          ? `hsl(${accent} 75% 60% / 0.85)`
          : strong
            ? "rgba(255,255,255,0.55)"
            : "rgba(255,255,255,0.16)",
      }}
    />
  );
}

function Chip({ h, on = false }: { h: number; on?: boolean }) {
  return (
    <span
      className="h-2 flex-1 rounded-full"
      style={{
        background: on ? `hsl(${h} 70% 55% / 0.75)` : "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    />
  );
}

function Cta({ h, w = "22%" }: { h: number; w?: string }) {
  return (
    <span
      className="block h-2.5 rounded-full"
      style={{ width: w, background: `hsl(${h} 78% 58%)`, boxShadow: `0 0 12px hsl(${h} 78% 58% / 0.5)` }}
    />
  );
}

/* ---------------- per-project mini screens ---------------- */

function MiniScreen({ screen, h, play }: { screen: Screen; h: number; play: boolean }) {
  const tile = `hsl(${h} 40% 16% / 0.6)`;
  const tileBorder = "1px solid rgba(255,255,255,0.07)";

  switch (screen) {
    case "marketplace":
      return (
        <div className="flex h-full flex-col gap-2">
          {/* nav: logo + links + search */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm" style={{ background: `hsl(${h} 78% 58%)` }} />
            <Line w="10%" />
            <Line w="8%" />
            <span className="ml-auto h-2.5 w-[30%] rounded-full bg-white/[0.07]" style={{ border: tileBorder }} />
          </div>
          {/* category rail + product grid */}
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <Chip key={i} h={h} on={i === 0} />
            ))}
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-md p-1"
                style={{ background: tile, border: tileBorder }}
              >
                <div
                  className="min-h-0 flex-1 rounded-sm"
                  style={{ background: `hsl(${h} 55% ${26 + (i % 3) * 6}% / 0.5)` }}
                />
                <Line w="80%" strong className="!h-[3px]" />
                <Line w="45%" accent={String(h)} className="!h-[3px]" />
              </div>
            ))}
          </div>
        </div>
      );

    case "dashboard":
      return (
        <div className="flex h-full gap-2">
          {/* sidebar */}
          <div
            className="flex w-[16%] flex-col gap-1.5 rounded-md p-1.5"
            style={{ background: tile, border: tileBorder }}
          >
            <span className="mb-1 h-2 w-2 rounded-sm" style={{ background: `hsl(${h} 78% 58%)` }} />
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="block h-1 rounded-full"
                style={{
                  width: "100%",
                  background: i === 0 ? `hsl(${h} 70% 55% / 0.8)` : "rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-1.5">
            {/* topbar */}
            <div className="flex items-center gap-1.5">
              <Line w="18%" strong />
              <span className="ml-auto h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full" style={{ background: `hsl(${h} 70% 55% / 0.8)` }} />
            </div>
            {/* stat tiles */}
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1 rounded-md p-1.5" style={{ background: tile, border: tileBorder }}>
                  <Line w="50%" className="!h-[3px]" />
                  <Line w="70%" strong />
                </div>
              ))}
            </div>
            {/* chart */}
            <div className="flex min-h-0 flex-1 items-end gap-1 rounded-md p-1.5" style={{ background: tile, border: tileBorder }}>
              {[38, 62, 45, 80, 55, 92, 70].map((v, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${v}%`,
                    background: i === 5 ? `hsl(${h} 75% 58% / 0.9)` : `hsl(${h} 55% 40% / 0.45)`,
                  }}
                  animate={play ? { scaleY: [1, 0.92, 1] } : undefined}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "resort":
      return (
        <div className="flex h-full flex-col gap-1.5">
          {/* hero with warm wash */}
          <div
            className="relative flex min-h-0 flex-[2] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-md"
            style={{
              background: `linear-gradient(160deg, hsl(${h} 65% 30% / 0.75), hsl(${h} 50% 14% / 0.85))`,
              border: tileBorder,
            }}
          >
            {/* sun / lake glow */}
            <span
              className="absolute -top-3 right-4 h-8 w-8 rounded-full blur-md"
              style={{ background: `hsl(${h} 85% 62% / 0.55)` }}
            />
            <Line w="34%" strong />
            <Line w="22%" accent={String(h)} />
            <span className="mt-1 flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`h-1 w-1 rounded-full ${i === 0 ? "bg-white/70" : "bg-white/25"}`} />
              ))}
            </span>
          </div>
          {/* gallery tiles */}
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
            {[36, 30, 42].map((l, i) => (
              <div
                key={i}
                className="rounded-md"
                style={{
                  background: `linear-gradient(150deg, hsl(${h} 55% ${l}% / 0.55), hsl(${h} 45% 12% / 0.7))`,
                  border: tileBorder,
                }}
              />
            ))}
          </div>
        </div>
      );

    case "brand":
      return (
        <div className="flex h-full gap-2">
          {/* editorial headline block */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 rounded-md p-2" style={{ background: tile, border: tileBorder }}>
            <Line w="30%" accent={String(h)} className="!h-[3px]" />
            <Line w="85%" strong className="!h-1.5" />
            <Line w="65%" strong className="!h-1.5" />
            <Line w="50%" className="mt-1" />
            <span className="mt-1.5">
              <Cta h={h} w="34%" />
            </span>
          </div>
          {/* identity swatches / cards */}
          <div className="grid w-[42%] grid-cols-2 gap-1.5">
            <div className="rounded-md" style={{ background: `hsl(${h} 72% 52% / 0.85)`, border: tileBorder }} />
            <div className="rounded-md" style={{ background: tile, border: tileBorder }} />
            <div className="rounded-md" style={{ background: tile, border: tileBorder }} />
            <div
              className="flex items-center justify-center rounded-md"
              style={{ background: "rgba(255,255,255,0.05)", border: tileBorder }}
            >
              <span className="h-2 w-2 rotate-45" style={{ background: `hsl(${h} 72% 55%)` }} />
            </div>
          </div>
        </div>
      );

    case "menu":
      return (
        <div className="flex h-full flex-col gap-1.5">
          {/* header */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: `hsl(${h} 78% 55%)` }} />
            <Line w="16%" strong />
            <span className="ml-auto">
              <Cta h={h} w="100%" />
            </span>
          </div>
          {/* menu rows */}
          <div className="flex min-h-0 flex-1 flex-col justify-around gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-md p-1" style={{ background: tile, border: tileBorder }}>
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-sm"
                  style={{ background: `hsl(${h} 60% ${30 + i * 5}% / 0.65)` }}
                />
                <Line w={`${34 - i * 3}%`} strong className="!h-[3px]" />
                <span className="mx-1 flex-1 border-b border-dotted border-white/15" />
                <Line w="9%" accent={String(h)} className="!h-[3px]" />
              </div>
            ))}
          </div>
          {/* order bar: WhatsApp / Viber style pills */}
          <div className="flex gap-1.5">
            <span className="h-2.5 flex-1 rounded-full" style={{ background: "hsl(145 60% 42% / 0.75)" }} />
            <span className="h-2.5 flex-1 rounded-full" style={{ background: "hsl(265 55% 55% / 0.75)" }} />
          </div>
        </div>
      );

    case "service":
      return (
        <div className="flex h-full flex-col gap-1.5">
          {/* header with phone chip */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm" style={{ background: `hsl(${h} 75% 55%)` }} />
            <Line w="14%" />
            <span
              className="ml-auto h-2.5 w-[22%] rounded-full"
              style={{ background: `hsl(${h} 75% 55% / 0.85)` }}
            />
          </div>
          {/* hero line + CTA */}
          <div className="flex flex-col gap-1.5 rounded-md p-2" style={{ background: tile, border: tileBorder }}>
            <Line w="60%" strong className="!h-1.5" />
            <Line w="40%" />
          </div>
          {/* region chips — 7 regional pages */}
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Chip key={i} h={h} on={i === 2} />
            ))}
          </div>
          {/* contact form */}
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 rounded-md p-2" style={{ background: tile, border: tileBorder }}>
            <span className="block h-2 w-full rounded-sm bg-white/[0.07]" style={{ border: tileBorder }} />
            <span className="block h-2 w-full rounded-sm bg-white/[0.07]" style={{ border: tileBorder }} />
            <span className="mt-0.5">
              <Cta h={h} w="30%" />
            </span>
          </div>
        </div>
      );

    case "festival":
      return (
        <div className="relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md" style={{ border: tileBorder, background: `radial-gradient(90% 90% at 50% 110%, hsl(${h} 60% 24% / 0.7), transparent 70%)` }}>
          {/* stage beams */}
          <span
            className="absolute -top-4 left-[20%] h-16 w-1 rotate-[18deg] blur-[2px]"
            style={{ background: `linear-gradient(hsl(${h} 80% 62% / 0.5), transparent)` }}
          />
          <span
            className="absolute -top-4 right-[20%] h-16 w-1 -rotate-[18deg] blur-[2px]"
            style={{ background: `linear-gradient(hsl(${h} 80% 62% / 0.5), transparent)` }}
          />
          <Line w="18%" accent={String(h)} className="!h-[3px]" />
          <Line w="46%" strong className="!h-2" />
          {/* countdown boxes */}
          <div className="mt-1 flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ background: `hsl(${h} 45% 18% / 0.85)`, border: `1px solid hsl(${h} 60% 50% / 0.4)` }}
                animate={play && i === 3 ? { opacity: [1, 0.55, 1] } : undefined}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Line w="55%" strong className="!h-1" />
              </motion.span>
            ))}
          </div>
          <span className="mt-1">
            <Cta h={h} w="52px" />
          </span>
        </div>
      );

    case "video":
      return (
        <div className="relative flex h-full flex-col overflow-hidden rounded-md" style={{ border: tileBorder, background: `linear-gradient(165deg, hsl(${h} 40% 15% / 0.8), #0a0a0b 75%)` }}>
          {/* REC + timecode */}
          <div className="flex items-center justify-between p-1.5 font-mono text-[0.5rem] tracking-widest">
            <span className="flex items-center gap-1 text-red-400/90">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-red-500"
                animate={play ? { opacity: [1, 0.25, 1] } : undefined}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              REC
            </span>
            <span className="text-white/40">4K · 00:24</span>
          </div>
          {/* horizon suggestion + play button */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <span
              className="absolute inset-x-3 bottom-2 h-6 rounded-[50%] blur-md"
              style={{ background: `hsl(${h} 60% 35% / 0.4)` }}
            />
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: `hsl(${h} 70% 50% / 0.9)`, boxShadow: `0 0 18px hsl(${h} 70% 50% / 0.55)` }}
            >
              <span className="ml-0.5 block h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-ink-950" />
            </span>
          </div>
          {/* scrubber */}
          <div className="flex items-center gap-1.5 p-1.5">
            <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: "38%", background: `hsl(${h} 72% 55%)` }}
                animate={play ? { width: ["30%", "62%", "30%"] } : undefined}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
        </div>
      );
  }
}
