# Cinematic Scroll & Project Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lenis smooth scrolling, clip-reveal media, and a pinned horizontal Projects showcase, per `docs/superpowers/specs/2026-07-07-cinematic-scroll-design.md`.

**Architecture:** One new dependency (lenis). All effects built on the existing framer-motion 11 system. Pinning via `position: sticky` + `useScroll`/`useTransform`. Showcase covers the first 5 flagship projects; the existing filterable grid stays below it (and is the only view on mobile / reduced motion).

**Tech Stack:** Next.js 15 static export, React 19, framer-motion 11, lenis, Tailwind.

## Global Constraints

- Static export must keep working (`npm run build` runs `next build` + copies `out/` to repo root).
- No test framework exists in this repo — verification is `npm run build` (type-check + lint + export) plus a manual browser pass per the spec's testing section.
- `prefers-reduced-motion: reduce` disables Lenis, clip reveals fall back to no-op, showcase is not rendered (grid remains).
- GPU transforms only; never animate layout properties.
- Word-mask text reveals already exist (`AnimatedText`); do not duplicate them.

---

### Task 1: Lenis smooth-scroll foundation

**Files:**
- Create: `components/SmoothScroll.tsx`
- Create: `lib/scroll.ts`
- Modify: `app/page.tsx` (wrap page content)
- Modify: `app/globals.css:19` (remove `scroll-behavior: smooth`)
- Modify: `components/sections/CreativeControlNav.tsx:156`, `components/sections/DyshjaTrailNav.tsx:195`, `components/sections/Contact.tsx:87` (route scrollIntoView through `scrollToId`)

**Interfaces:**
- Produces: `<SmoothScroll>{children}</SmoothScroll>` client component; `scrollToId(id: string): void` from `@/lib/scroll`; `window.__lenis` (internal handshake between the two).

- [ ] **Step 1: Install lenis**

Run: `npm install lenis`
Expected: added to dependencies, no peer warnings.

- [ ] **Step 2: Create `components/SmoothScroll.tsx`**

```tsx
"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Site-wide inertial smooth scrolling (Lenis). Scrolls the real window,
 * so scrollY-based code (BackgroundScene, useScroll) is unaffected.
 * Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 3: Create `lib/scroll.ts`**

```ts
/** Programmatic anchor scroll that goes through Lenis when it is running. */
export function scrollToId(id: string) {
  if (window.__lenis) {
    window.__lenis.scrollTo(`#${id}`, { offset: -72 });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
```

- [ ] **Step 4: Wire into the page**

In `app/page.tsx`, import `SmoothScroll` and wrap the existing `<div className="relative z-10">…</div>` content block (children of the root div, sibling of `BackgroundScene`).

In `app/globals.css` remove the `scroll-behavior: smooth;` line (Lenis owns scrolling now; the reduced-motion override block may stay).

Replace the `scrollIntoView` calls at `CreativeControlNav.tsx:156`, `DyshjaTrailNav.tsx:195`, `Contact.tsx:87` with `scrollToId(<their id>)` (import from `@/lib/scroll`), preserving each call site's id argument.

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: clean build. Then `npm run dev`: wheel scroll glides with inertia; header links and trail-nav dots still land on their sections; devtools reduced-motion emulation gives normal instant scroll.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(scroll): Lenis inertial smooth scrolling with reduced-motion opt-out"
```

---

### Task 2: MediaReveal clip reveals

**Files:**
- Create: `components/ui/MediaReveal.tsx`
- Modify: `components/ui/SectionHeading.tsx` (subtitle: fade → clipReveal)
- Modify: `components/sections/DyshjaNatyre.tsx:234,252` (wrap `LiteYouTube`)
- Modify: `components/sections/Projects.tsx` (wrap grid `ProjectThumb`)

**Interfaces:**
- Produces: `<MediaReveal className? delay?>{media}</MediaReveal>` — clip-path inset opens + inner scale 1.15→1 on viewport entry, once; renders a plain div under reduced motion.

- [ ] **Step 1: Create `components/ui/MediaReveal.tsx`**

```tsx
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
```

- [ ] **Step 2: Apply it**

- `SectionHeading.tsx`: subtitle `motion.p` switches `initial/whileInView` props to `variants={clipReveal}` (import from `@/lib/motion`), keeping viewport/once.
- `DyshjaNatyre.tsx`: wrap both `LiteYouTube` usages (featured player and grid items) in `<MediaReveal>`; grid items get `delay={i * 0.06}` where the map index is available.
- `Projects.tsx`: in the grid card, wrap `<ProjectThumb …/>` in `<MediaReveal>` (thumb keeps its own className).

- [ ] **Step 3: Verify**

Run: `npm run build` — clean. Dev pass: media opens with mask+zoom once per element; reduced-motion shows media statically.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(reveal): cinematic clip+scale reveals for media and section subtitles"
```

---

### Task 3: Pinned horizontal Projects showcase

**Files:**
- Create: `components/ui/ProjectThumb.tsx` (extracted from `Projects.tsx` so the showcase can reuse it without a circular import)
- Create: `components/sections/ProjectShowcase.tsx`
- Modify: `components/sections/Projects.tsx` (render showcase above the filter tabs; pass `onOpen={setActive}`; delete the local `ProjectThumb`)

**Interfaces:**
- Consumes: `CaseStudy`, `CASE_STUDIES` from `@/lib/projects`; modal state via `onOpen(project)` callback.
- Produces: `<ProjectShowcase projects={CaseStudy[]} onOpen={(p: CaseStudy) => void} />`; `ProjectThumb({ project, className })` from `@/components/ui/ProjectThumb`.

- [ ] **Step 1: Extract `ProjectThumb`**

Move the `ProjectThumb` function from `Projects.tsx` verbatim into `components/ui/ProjectThumb.tsx` (client component, exports `ProjectThumb`), update the import in `Projects.tsx`.

- [ ] **Step 2: Create `components/sections/ProjectShowcase.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ProjectThumb } from "@/components/ui/ProjectThumb";
import type { CaseStudy } from "@/lib/projects";

/**
 * Desktop-only pinned showcase: the section sticks while projects travel
 * horizontally, one full viewport per project. Hidden below lg and under
 * reduced motion (the filterable grid below covers those cases).
 */
export function ProjectShowcase({
  projects,
  onOpen,
}: {
  projects: CaseStudy[];
  onOpen: (p: CaseStudy) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const n = projects.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((n - 1) / n) * 100}%`]);

  if (reduced || n === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative mt-14 hidden lg:block"
      style={{ height: `${n * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-max">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="flex h-full w-screen shrink-0 items-center gap-12 px-[7vw]"
            >
              <div className="w-[52%] shrink-0">
                <ProjectThumb project={p} className="aspect-[16/10] w-full" />
              </div>
              <div className="max-w-xl">
                <span className="font-display text-[4.5rem] font-semibold leading-none text-accent/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-accent/80">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-mist-100">
                  {p.title}
                </h3>
                <p className="mt-4 leading-relaxed text-mist-400">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-white/8 px-2.5 py-1 text-[0.68rem] text-mist-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onOpen(p)}
                  className="btn-ghost mt-7 !py-2.5 text-sm"
                >
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* progress rail */}
        <div className="pointer-events-none absolute bottom-10 left-[7vw] right-[7vw] h-px bg-white/10">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full origin-left bg-accent/70"
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Integrate in `Projects.tsx`**

Below `<SectionHeading …/>`, render:

```tsx
<ProjectShowcase projects={CASE_STUDIES.slice(0, 5)} onOpen={setActive} />
```

and give the grid block a small heading (`<p className="mt-16 text-[0.68rem] uppercase tracking-[0.2em] text-mist-500 lg:mt-6">All projects</p>` above the filter tabs; `mt-16` only matters on mobile where the showcase is hidden).

- [ ] **Step 4: Verify**

Run: `npm run build` — clean. Dev pass (desktop width): Projects pins, 5 flagships scrub horizontally, progress rail fills, release is clean into the grid; modal opens from showcase; mobile width shows only the grid; reduced-motion shows only the grid.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(projects): pinned horizontal flagship showcase with scroll scrubbing"
```

---

### Task 4: Full verification + static export

- [ ] **Step 1:** Run `npm run build` — clean; static export copied to root.
- [ ] **Step 2:** Manual pass per spec: scroll feel, anchors, reveals fire once, showcase pin/release, mobile fallback, reduced-motion emulation.
- [ ] **Step 3:** Commit the rebuilt export:

```bash
git add -A
git commit -m "chore: rebuild static export with cinematic scroll + showcase"
```
