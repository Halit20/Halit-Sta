# Cinematic Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every section of the Halit Statovci site its own motion signature and code-generated visuals, per the approved spec at `docs/superpowers/specs/2026-07-01-cinematic-upgrade-design.md`.

**Architecture:** Extend the shared motion vocabulary (`lib/motion.ts`) and add three reusable primitives (`CountUp`, `TiltCard`, animated `ProjectVisual` + new `PillarVisual`). Then rebuild the four visually weak sections (ProofStrip, IdentityReveal, Education, About stats) and apply targeted polish to the rest. All animation is framer-motion + CSS/SVG.

**Tech Stack:** Next.js 15 (static export), React 19, Tailwind 3, framer-motion 11. No new dependencies allowed.

## Global Constraints

- **No new npm dependencies.** framer-motion + CSS/SVG only.
- **Static export must keep working**: `npm run build` runs `next build` (type-check + ESLint + export) and a postbuild script copies the site to the repo root. This is the verification command for every task.
- **Content is frozen**: do not edit any text in `lib/data.ts`. Deriving counts (e.g. `PROJECTS.length`) is allowed; adding/changing copy is not.
- **Animate `transform`/`opacity` only** (short entrance `filter: blur` transitions are the single allowed exception).
- **Reduced motion**: continuous/looping effects must respect `prefers-reduced-motion` (the global CSS kill-switch in `globals.css` already freezes CSS animations; JS-driven loops must check `useReducedMotion()` from framer-motion).
- **Coarse pointers**: pointer-tracking effects (tilt, magnetic) must no-op when `(pointer: coarse)` matches — follow the existing pattern in `components/ui/MagneticButton.tsx:30`.
- **There is no test framework in this repo.** The per-task test cycle is: `npm run build` passes (types + lint) — plus the final visual verification task.
- Commit after every task.

---

### Task 1: Motion vocabulary + heading word-reveal + gradient shimmer

**Files:**
- Modify: `lib/motion.ts`
- Modify: `components/ui/AnimatedText.tsx`
- Modify: `components/ui/SectionHeading.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `clipReveal`, `blurIn` (framer `Variants`) and `VIEWPORT_ONCE` (viewport config object) exported from `lib/motion.ts`; `AnimatedText` gains optional `wordClassName?: string` prop; CSS class `animate-gradient-pan` for shimmering gradients.

- [ ] **Step 1: Extend `lib/motion.ts`** — append:

```ts
export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px" } as const;

/** Words/blocks unmask from a bottom clip — sharper than fadeUp. */
export const clipReveal: Variants = {
  hidden: { opacity: 0, y: 26, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 -8% 0)",
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Soft focus-pull entrance (blur is the one allowed filter transition). */
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};
```

- [ ] **Step 2: Add `wordClassName` to `AnimatedText`** — extend `Props` with `wordClassName?: string;` (default `""`) and change the inner word span to:

```tsx
<motion.span
  className={`inline-block ${wordClassName}`}
  variants={{
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
  }}
>
  {word}
</motion.span>
```

- [ ] **Step 3: Route `SectionHeading` titles through `AnimatedText`** — in `components/ui/SectionHeading.tsx`, replace the `<motion.h2>` block (lines 39-49) with a plain `<h2>` whose content is the word-mask reveal (the gradient is applied per word so `background-clip: text` survives the per-word transforms):

```tsx
<h2
  className={`text-balance text-3xl leading-[1.05] sm:text-4xl lg:text-[2.9rem] ${
    centered ? "max-w-3xl" : "max-w-2xl"
  }`}
>
  <AnimatedText text={title} wordClassName="text-gradient" delay={0.1} />
</h2>
```

Add `import { AnimatedText } from "@/components/ui/AnimatedText";` and remove the now-unused `motion.h2` usage (keep `motion` import for eyebrow/subtitle).

- [ ] **Step 4: Add gradient shimmer utility** — in `app/globals.css` `@layer utilities`, add:

```css
.animate-gradient-pan {
  background-size: 200% 100%;
  animation: gradientPan 6s ease-in-out infinite;
}
@keyframes gradientPan {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

- [ ] **Step 5: Verify** — Run `npm run build`. Expected: build succeeds, no type/lint errors.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: motion vocabulary, heading word-reveal, gradient shimmer"`

---

### Task 2: `CountUp` and `TiltCard` primitives

**Files:**
- Create: `components/ui/CountUp.tsx`
- Create: `components/ui/TiltCard.tsx`

**Interfaces:**
- Produces: `CountUp({ to: number, suffix?: string, className?: string })` — renders an in-view animated integer counter. `TiltCard({ children, className?: string, max?: number })` — pointer-driven 3D tilt wrapper (degrees capped at `max`, default 6).

- [ ] **Step 1: Create `components/ui/CountUp.tsx`:**

```tsx
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
```

- [ ] **Step 2: Create `components/ui/TiltCard.tsx`:**

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = { children: ReactNode; className?: string; max?: number };

/** Pointer-driven 3D tilt (same feel as CreativeControlNav's controller). */
export function TiltCard({ children, className = "", max = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });

  function onMove(e: React.PointerEvent) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify** — `npm run build` passes (components compile even though unused yet; if ESLint flags unused files it won't — they're modules).
- [ ] **Step 4: Commit** — `git commit -am "feat: CountUp and TiltCard primitives"`

---

### Task 3: ProofStrip rebuild — counters, icons, accent sweep

**Files:**
- Modify: `components/sections/ProofStrip.tsx` (full rewrite)

**Interfaces:**
- Consumes: `CountUp` (Task 2), `VIEWPORT_ONCE`/`fadeUp`/`staggerParent` from `lib/motion.ts`, `PROOF_POINTS`, `PROJECTS`, `SERVICES`, `IDENTITY_PILLARS` from `lib/data.ts`.

- [ ] **Step 1: Rewrite `ProofStrip.tsx`:**

```tsx
"use client";

import { motion } from "framer-motion";
import {
  IDENTITY_PILLARS,
  PROJECTS,
  PROOF_POINTS,
  SERVICES,
} from "@/lib/data";
import { fadeUp, staggerParent, VIEWPORT_ONCE, EASE } from "@/lib/motion";
import { CountUp } from "@/components/ui/CountUp";

const STATS = [
  { value: PROJECTS.length, suffix: "+", label: "Shipped projects" },
  { value: SERVICES.length, suffix: "", label: "Service areas" },
  { value: IDENTITY_PILLARS.length, suffix: "", label: "Disciplines, one operator" },
];

/** Small inline glyphs so each proof point stops being text-only. */
const GLYPHS = [
  <path key="0" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />, // cycle
  <path key="1" d="M4 19h16M6 19V9l6-4 6 4v10" />, // education
  <path key="2" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />, // globe
  <path key="3" d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />, // shield
  <path key="4" d="M4 6h16M4 12h10M4 18h13" />, // stack
  <path key="5" d="M5 12l4 4L19 6" />, // check
];

export function ProofStrip() {
  return (
    <section className="relative overflow-hidden border-y border-white/6 bg-ink-900/40">
      {/* one-time accent sweep across the strip */}
      <motion.div
        aria-hidden
        initial={{ x: "-110%" }}
        whileInView={{ x: "110%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/[0.06] to-transparent"
      />

      <div className="shell py-12">
        {/* animated counters */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="mb-10 grid grid-cols-3 gap-6"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="flex flex-col gap-1">
              <span className="font-display text-3xl font-bold text-mist-100 sm:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-mist-500">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="divider-line mb-10" />

        {/* proof points, now with glyphs */}
        <motion.div
          variants={staggerParent(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6"
        >
          {PROOF_POINTS.map((p, i) => (
            <motion.div key={p.label} variants={fadeUp} className="group flex flex-col gap-2.5">
              <svg
                className="h-5 w-5 text-accent/70 transition-colors duration-300 group-hover:text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {GLYPHS[i % GLYPHS.length]}
              </svg>
              <span className="text-[0.82rem] font-medium leading-snug text-mist-200">
                {p.label}
              </span>
              <span className="text-[0.7rem] uppercase tracking-wider text-mist-500">
                {p.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify** — `npm run build` passes.
- [ ] **Step 3: Commit** — `git commit -am "feat: ProofStrip counters, glyphs, accent sweep"`

---

### Task 4: `PillarVisual` — five animated code-generated scenes

**Files:**
- Create: `components/ui/PillarVisual.tsx`

**Interfaces:**
- Produces: `PillarVisual({ id }: { id: "ai" | "web" | "branding" | "media" | "infra" })` — a self-contained, ambient-animated SVG scene sized to fill its parent (`h-full w-full`). Loops must pause under reduced motion (`useReducedMotion()` → render static frame by disabling `animate` props).

- [ ] **Step 1: Create `components/ui/PillarVisual.tsx`.** Structure: one exported component switching over `id`; each scene is a `motion.svg`-based composition using only transform/opacity loops. Complete implementation:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import type { ReactNode } from "react";

type PillarId = "ai" | "web" | "branding" | "media" | "infra";

const LOOP: Transition = { duration: 4, repeat: Infinity, ease: "easeInOut" };

/** Ambient animated scene for each identity pillar. Fills its parent. */
export function PillarVisual({ id }: { id: PillarId }) {
  const reduce = useReducedMotion() ?? false;
  const scenes: Record<PillarId, ReactNode> = {
    ai: <AiScene animate={!reduce} />,
    web: <WebScene animate={!reduce} />,
    branding: <BrandScene animate={!reduce} />,
    media: <MediaScene animate={!reduce} />,
    infra: <InfraScene animate={!reduce} />,
  };
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-900/60">
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
```

- [ ] **Step 2: Verify** — `npm run build` passes.
- [ ] **Step 3: Commit** — `git commit -am "feat: PillarVisual animated scenes"`

---

### Task 5: IdentityReveal rebuild — scroll-synced pillar showcase

**Files:**
- Modify: `components/sections/IdentityReveal.tsx` (full rewrite)

**Interfaces:**
- Consumes: `PillarVisual` (Task 4), `IDENTITY_PILLARS` from `lib/data.ts`, `EASE` from `lib/motion.ts`.

- [ ] **Step 1: Rewrite `IdentityReveal.tsx`.** Keep the two-column layout and copy, but: (a) track the active pillar with per-row `onViewportEnter` (viewport `margin: "-45% 0px -45% 0px"`, `once: false` so it updates both directions); (b) the sticky left column renders `PillarVisual` for the active pillar inside `AnimatePresence mode="wait"` (fade/scale crossfade, 0.45s); (c) active row gets accent styling. Complete implementation:

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IDENTITY_PILLARS } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { PillarVisual } from "@/components/ui/PillarVisual";

type PillarId = "ai" | "web" | "branding" | "media" | "infra";

export function IdentityReveal() {
  const [active, setActive] = useState<PillarId>("ai");

  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <div className="divider-line mb-20" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* sticky headline + live visual */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <motion.span
              className="eyebrow mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="h-px w-6 bg-accent/70" />
              The full picture
            </motion.span>
            <h2 className="text-balance text-3xl leading-[1.08] sm:text-4xl lg:text-[2.7rem]">
              <span className="text-gradient">
                One operator. Five disciplines that usually take a whole team.
              </span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-mist-400">
              Most businesses stitch together a developer, a designer, an
              editor, and an ops person. Halit covers the full digital layer —
              and makes the parts work together.
            </p>

            {/* live pillar scene (desktop) */}
            <div className="mt-10 hidden aspect-[4/3] w-full max-w-md lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="h-full w-full"
                >
                  <PillarVisual id={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* pillars — active row synced to the visual */}
          <ul className="flex flex-col">
            {IDENTITY_PILLARS.map((pillar, i) => {
              const isActive = active === pillar.id;
              return (
                <motion.li
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
                  onViewportEnter={() => setActive(pillar.id as PillarId)}
                  // active-tracking band: a thin strip around the viewport center
                  onViewportLeave={undefined}
                  className={`group relative border-t py-7 transition-colors duration-500 last:border-b ${
                    isActive ? "border-accent/40" : "border-white/8"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={`font-display text-sm font-semibold transition-colors duration-500 ${
                        isActive ? "text-accent" : "text-accent/40"
                      }`}
                    >
                      {pillar.tag}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3
                          className={`font-display text-2xl font-semibold transition-all duration-500 sm:text-3xl ${
                            isActive
                              ? "translate-x-1 text-mist-100"
                              : "text-mist-300"
                          }`}
                        >
                          {pillar.title}
                        </h3>
                        <span className="text-sm text-mist-500">{pillar.line}</span>
                      </div>
                      <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-mist-400">
                        {pillar.desc}
                      </p>
                      {/* mobile: inline scene for the active pillar */}
                      {isActive && (
                        <div className="mt-5 aspect-[4/3] w-full lg:hidden">
                          <PillarVisual id={pillar.id as PillarId} />
                        </div>
                      )}
                    </div>
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="mt-1"
                    >
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </motion.span>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

Implementation note: `onViewportEnter` fires with the element's own viewport options — to make the *active* tracking use the center band while the entrance reveal stays `once: true`, wrap the row content in an inner `motion.div` that carries `onViewportEnter={() => setActive(...)}` with `viewport={{ margin: "-45% 0px -45% 0px" }}` (no `once`), and keep the entrance animation on the outer `li`. Adjust during implementation; the deliverable is: scrolling the list changes the sticky scene at the moment a row crosses the middle of the screen.

- [ ] **Step 2: Verify** — `npm run build` passes.
- [ ] **Step 3: Commit** — `git commit -am "feat: IdentityReveal scroll-synced pillar showcase"`

---

### Task 6: Education journey path rebuild

**Files:**
- Modify: `components/sections/Education.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Section`, `SectionHeading`, `EDUCATION` from `lib/data.ts`, `EASE` from `lib/motion.ts`.

- [ ] **Step 1: Rewrite `Education.tsx`** as a connected milestone path: a scroll-drawn central line (desktop: center, mobile: left) with alternating milestone cards and per-milestone node icons:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDUCATION } from "@/lib/data";
import { EASE } from "@/lib/motion";

/** One line-icon per milestone (graduation, award, globe, shield, rocket). */
const NODE_ICONS = [
  <path key="0" d="M4 19h16M6 19V9l6-4 6 4v10" />,
  <path key="1" d="M12 15a5 5 0 100-10 5 5 0 000 10zm0 0l-3 6 3-1.5L15 21l-3-6" />,
  <path key="2" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18M12 3v18" />,
  <path key="3" d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
  <path key="4" d="M5 16c3-8 9-12 14-13-1 5-5 11-13 14l-1-1zm0 0l-2 5 5-2" />,
];

export function Education() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="education" divider tone="warm">
      <SectionHeading
        eyebrow="Education & Achievements"
        title="Academic foundation, real recognition, applied experience."
        align="center"
        className="mx-auto"
      />

      <div ref={railRef} className="relative mx-auto mt-16 max-w-3xl">
        {/* scroll-drawn spine */}
        <div className="absolute left-5 top-0 h-full w-px bg-white/8 sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent sm:left-1/2"
        />

        <ol className="flex flex-col gap-12">
          {EDUCATION.map((e, i) => {
            const right = i % 2 === 1;
            return (
              <li key={e.title} className="relative">
                {/* node */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute left-5 top-1 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent/40 bg-ink-900 sm:left-1/2"
                >
                  <svg className="h-4.5 w-4.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {NODE_ICONS[i % NODE_ICONS.length]}
                  </svg>
                </motion.span>

                {/* card — alternates sides on desktop */}
                <motion.div
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`surface surface-hover ml-14 p-6 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                    right ? "sm:ml-auto" : ""
                  }`}
                >
                  <h3 className="font-display text-lg font-semibold leading-snug text-mist-100">
                    {e.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-accent/80">{e.org}</p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-mist-500">
                    {e.note}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
```

Note: Tailwind has no `h-4.5`/`w-4.5` by default — use `h-[18px] w-[18px]`.

- [ ] **Step 2: Verify** — `npm run build` passes.
- [ ] **Step 3: Commit** — `git commit -am "feat: Education journey path with drawn spine and milestone nodes"`

---

### Task 7: Animated `ProjectVisual` + Projects polish

**Files:**
- Modify: `components/ui/ProjectVisual.tsx` (full rewrite below)
- Modify: `components/sections/Projects.tsx` (read the file first; targeted edits)

**Interfaces:**
- `ProjectVisual` keeps its exact signature: `{ hue: string; title: string; className?: string }` — callers don't change.
- Consumes: `TiltCard` (Task 2), `staggerParent`/`fadeUp` from `lib/motion.ts`.

- [ ] **Step 1: Rewrite `ProjectVisual.tsx`** — same composition, now ambient. It becomes a client component:

```tsx
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
```

- [ ] **Step 2: Polish `Projects.tsx`** — read the file, then: (a) wrap each project card's outer element in `<TiltCard max={4} className="h-full">` (import from `@/components/ui/TiltCard`), keeping the existing click/keyboard handlers on the inner card; (b) in the modal, convert the content column to a `motion.div` with `variants={staggerParent(0.08)} initial="hidden" animate="show"` and give each direct child (`title`, visual, meta rows, paragraphs, tag list) `variants={fadeUp}` so the case study cascades in; (c) if the modal has a CTA link/button, replace it with `MagneticButton` (import from `@/components/ui/MagneticButton`), keeping classes and content unchanged.
- [ ] **Step 3: Verify** — `npm run build` passes.
- [ ] **Step 4: Commit** — `git commit -am "feat: ambient ProjectVisual, tilt cards, staggered case-study modal"`

---

### Task 8: Services polish — tilt, icon stroke-draw, clip reveal

**Files:**
- Modify: `components/sections/Services.tsx` (read first; targeted edits)
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `TiltCard` (Task 2), `clipReveal` (Task 1). Produces CSS utility `.icon-draw` used by any `group`-hovered SVG.

- [ ] **Step 1: Add stroke-draw hover CSS** to `app/globals.css` `@layer utilities`:

```css
/* SVG line-icons redraw themselves when the parent .group is hovered */
.icon-draw path,
.icon-draw circle,
.icon-draw line,
.icon-draw rect {
  stroke-dasharray: 80;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0s;
}
.group:hover .icon-draw path,
.group:hover .icon-draw circle,
.group:hover .icon-draw line,
.group:hover .icon-draw rect {
  stroke-dashoffset: 160;
  transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

(Offsetting by exactly one full dash cycle re-draws the line without a visible jump at rest.)

- [ ] **Step 2: Edit `Services.tsx`** — read the file, then: (a) ensure each card root (or its wrapper) has `group` and wrap each `SpotlightCard` in `<TiltCard max={5} className="h-full">`; (b) add `className="icon-draw"` to the `Icon` component's `<svg>` usage inside Services cards (if `Icon` doesn't forward `className` to the svg, add that passthrough to `components/ui/Icon.tsx`); (c) change the grid entrance from the `Reveal` fadeUp to per-card `motion.div` with `variants={clipReveal}` inside a `staggerParent(0.1)` container (import both from `@/lib/motion`).
- [ ] **Step 3: Verify** — `npm run build` passes.
- [ ] **Step 4: Commit** — `git commit -am "feat: Services tilt, icon stroke-draw, clip-reveal entrance"`

---

### Task 9: Magnetic CTAs + Hero cinematics

**Files:**
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/Header.tsx` (read first)
- Modify: `components/sections/Vision.tsx` (read first)

**Interfaces:**
- Consumes: `MagneticButton` (existing, `components/ui/MagneticButton.tsx`), `TiltCard` (Task 2), `.animate-gradient-pan` (Task 1).

- [ ] **Step 1: Hero CTAs become magnetic** — in `Hero.tsx` replace the two anchors (lines 76-90):

```tsx
<MagneticButton href="#work" className="btn-primary">
  View My Work
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
</MagneticButton>
<MagneticButton href="#contact" className="btn-ghost">
  Start a Project
</MagneticButton>
```

Add `import { MagneticButton } from "@/components/ui/MagneticButton";`.

- [ ] **Step 2: Hero title shimmer** — on the `<span className="text-accent-gradient">Full-Cycle AI Engineer</span>` (line 55), add the shimmer: `className="text-accent-gradient animate-gradient-pan"`.

- [ ] **Step 3: Portrait tilt + shine sweep** — wrap the portrait frame `motion.div` (the one with `clipPath` reveal, lines 129-153) in `<TiltCard max={3}>`, and inside the frame (after the rim-light div) add a one-time shine sweep:

```tsx
<motion.div
  aria-hidden
  initial={{ x: "-130%" }}
  animate={{ x: "130%" }}
  transition={{ duration: 1.4, ease: EASE, delay: 1.5 }}
  className="pointer-events-none absolute inset-y-0 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent"
/>
```

- [ ] **Step 4: Header + Vision CTAs** — read both files; replace their primary CTA anchor (`btn-primary` / equivalent) with `MagneticButton` exactly as in Step 1 (keep classes and inner content unchanged).
- [ ] **Step 5: Verify** — `npm run build` passes.
- [ ] **Step 6: Commit** — `git commit -am "feat: magnetic CTAs, hero shimmer, portrait tilt and shine"`

---

### Task 10: Vision scroll-scrub manifesto + Contact form polish

**Files:**
- Create: `components/ui/ScrubText.tsx`
- Modify: `components/sections/Vision.tsx`
- Modify: `components/sections/Contact.tsx` (read first)
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `ScrubText({ text, className? })` — paragraph whose words fade from 25% to 100% opacity tied to scroll progress.
- Consumes: `MagneticButton` for the Contact submit button.

- [ ] **Step 1: Create `components/ui/ScrubText.tsx`:**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/** Words brighten one by one as the paragraph scrolls through the viewport. */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}
```

- [ ] **Step 2: Use it in `Vision.tsx`** — read the file; replace the main paragraph element with `<ScrubText text={...same string...} className={...same classes...} />` (move the literal text into the `text` prop; content unchanged).
- [ ] **Step 3: Contact focus underline** — in `app/globals.css` `@layer components`:

```css
.field-wrap {
  position: relative;
}
.field-wrap::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 1.5px;
  background: linear-gradient(90deg, #38bdf8, #7dd3fc);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.field-wrap:focus-within::after {
  transform: scaleX(1);
}
```

- [ ] **Step 4: Apply in `Contact.tsx`** — read the file; wrap each input/textarea in `<div className="field-wrap">…</div>` (or add the class to an existing wrapper), and replace the submit `<button>` with `MagneticButton` (`onClick` submit stays; keep `type="submit"` behavior by passing the existing classes — if `MagneticButton` renders a `button` when no `href`, it already does the right thing; verify the form still submits).
- [ ] **Step 5: Verify** — `npm run build` passes.
- [ ] **Step 6: Commit** — `git commit -am "feat: Vision scroll-scrub text, Contact focus underlines and magnetic submit"`

---

### Task 11: About, Skills, Experience, Process polish

**Files:**
- Modify: `components/sections/About.tsx` (read first)
- Modify: `components/sections/Skills.tsx` (read first)
- Modify: `components/sections/Experience.tsx` (read first)
- Modify: `components/sections/Process.tsx` (read first)

**Interfaces:**
- Consumes: `CountUp` (Task 2), `blurIn` (Task 1), `EASE`.

- [ ] **Step 1: About** — (a) any numeric stat values in the stat cards render through `CountUp` (parse the number; keep any `+`/`%` as `suffix`); (b) paragraphs switch from a single reveal to a `staggerParent(0.12)` container with each `<p>` using `variants={blurIn}`; (c) portrait gets a gentle scroll parallax (`useScroll` on the section, `useTransform(scrollYProgress, [0, 1], [0, 40])` applied as `style={{ y }}`).
- [ ] **Step 2: Skills** — badges get a wave entrance: each badge `motion.span` uses `transition={{ delay: i * 0.025, duration: 0.45, ease: EASE }}` with `initial={{ opacity: 0, y: 12, scale: 0.9 }}` / `whileInView={{ opacity: 1, y: 0, scale: 1 }}` `viewport={{ once: true }}`, plus `whileHover={{ scale: 1.08, y: -2 }}`.
- [ ] **Step 3: Experience** — cards alternate entrance direction: `initial={{ opacity: 0, x: i % 2 ? 36 : -36 }}` → `whileInView={{ opacity: 1, x: 0 }}`; the timeline node for a card in view gets an accent glow: on the node span add `whileInView={{ boxShadow: "0 0 18px 2px rgba(56,189,248,0.45)" }}` `viewport={{ once: true, margin: "-30% 0px" }}` (boxShadow on a tiny dot is cheap).
- [ ] **Step 4: Process** — each step's number/node gets a sequential "light up": `whileInView={{ borderColor: "rgba(56,189,248,0.6)", color: "#38bdf8" }}` with `viewport={{ once: true, margin: "-35% 0px" }}` and `transition={{ duration: 0.4, delay: 0.1 }}` so nodes activate as the rail reaches them.
- [ ] **Step 5: Verify** — `npm run build` passes.
- [ ] **Step 6: Commit** — `git commit -am "feat: About counters and parallax, Skills wave, Experience/Process node activation"`

---

### Task 12: Final build + visual verification

**Files:** none (verification only)

- [ ] **Step 1:** `npm run build` — full export succeeds; root `index.html` regenerated by the postbuild copy.
- [ ] **Step 2:** Serve or open the root `index.html` in a browser. Verify every section: Hero (shine sweep, magnetic CTAs, shimmer), ProofStrip (counters run once), IdentityReveal (scene switches with scroll, mobile inline scene), Services (tilt + icon redraw on hover), Projects (ambient visuals, tilt, modal cascade), Process/Experience (node activation), About (counters, parallax), Skills (wave), Education (spine draws, alternating cards), Vision (word scrub), Contact (focus underline, magnetic submit, form still validates/submits).
- [ ] **Step 3:** Check a ~390px-wide viewport (mobile layout, no pointer effects) and emulate `prefers-reduced-motion: reduce` (all loops static, content fully visible).
- [ ] **Step 4:** Fix anything broken; re-run build.
- [ ] **Step 5: Commit** — `git commit -am "chore: cinematic upgrade verified build"`
