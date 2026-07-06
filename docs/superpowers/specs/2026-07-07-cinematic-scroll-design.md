# Cinematic Scroll & Project Showcase — Design

**Date:** 2026-07-07
**Reference:** https://www.penguin-capital.co.jp/en (GSAP + Lenis + three.js stack)
**Approved by:** Halit (conversation, 2026-07-07)

## Goal

Give halitsta.com the scroll feel and showcase presentation of premium
Japanese corporate sites: smooth inertial scrolling, line-masked text
reveals, clip-reveal images, and a pinned horizontal Projects showcase.
The WebGL background is out of scope (kept as is).

## Chosen approach

**Lenis (~4kb) + existing framer-motion 11.** One animation system;
no GSAP. Pinning is built with `position: sticky` + `useScroll`.

Rejected: GSAP+Lenis (second animation paradigm, ~70kb, rewrites);
hand-rolled smooth scroll (classic bug source, not worth it at 4kb).

## Components

### 1. SmoothScroll (new, `components/SmoothScroll.tsx`)
- Client component wrapping page content; runs Lenis on rAF.
- Disabled when `prefers-reduced-motion: reduce`.
- Anchor navigation (header menu, Dyshja trail-nav) keeps working —
  Lenis scrolls the real window, so `scrollY`-based code
  (BackgroundScene, useScroll) is untouched.

### 2. Text mask reveals (upgrade `AnimatedText` / `SectionHeading`)
- Split headings into lines; each line inside an `overflow-hidden`
  wrapper, translateY 100%→0, staggered, once per viewport entry.
- Hero title gets the same treatment on load.
- No duplicate components — existing ones upgraded in place.

### 3. Image/card clip reveals (upgrade `Reveal`, apply in sections)
- Images: clip-path inset reveal + scale 1.15→1 on viewport entry.
- Grids (Dyshja episodes, Creative, cards): staggered entry.

### 4. Pinned Projects showcase (rewrite `Projects.tsx` scroll shell)
- Container height = ~100vh × project count; inner `sticky top-0
  h-screen`; horizontal track `translateX` mapped from container
  scroll progress via `useScroll` + `useTransform`.
- Each project: big number (01/02/…), large visual, title, tech
  badges; progress indicator for the section.
- Mobile / coarse pointer: no pinning — vertical list with reveals.
- `#projects` anchor targets the container start.

### 5. Performance & accessibility
- GPU transforms only (translate/scale/clip-path); no layout animation.
- `prefers-reduced-motion`: Lenis off, masks/reveals collapse to
  simple fades, showcase unpinned.
- Everything client-side; static export (GitHub Pages) unchanged.

## Testing / verification
- `npm run build` clean (type-check + lint + static export).
- Manual pass in browser: scroll feel, reveals fire once, pinned
  showcase scrubs correctly and releases cleanly, mobile fallback via
  responsive mode, reduced-motion via devtools emulation.
