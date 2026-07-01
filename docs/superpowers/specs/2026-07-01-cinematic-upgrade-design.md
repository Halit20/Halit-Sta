# Cinematic Upgrade — Design Spec

**Date:** 2026-07-01
**Project:** halitstatovci.com personal brand site (Next.js 15 static export, Tailwind, framer-motion)
**Approach:** Option A — "Cinematic elevation": keep the page structure and dark/cyan identity, give every section its own motion signature and code-generated visuals.

## Goals

1. Eliminate the "wall of text" feel: the four weakest sections (ProofStrip, Education, IdentityReveal, About copy column) get real visual payloads.
2. Break the monotone motion signature: replace the universal `fadeUp` entrance with per-section choreography.
3. Activate unused assets: `AnimatedText` (word-mask heading reveals) and `MagneticButton` (CTA physics) get wired in site-wide.
4. Keep the site fast, static-export compatible (file:// double-click), and accessible.

## Non-goals

- No new color palette, typography, or content changes (`lib/data.ts` text stays).
- No new runtime dependencies (no three.js/GSAP — framer-motion + CSS/SVG only).
- No layout restructuring of sections that already work (Hero, Projects, Process, Creative keep their layouts).

## Architecture

### New/changed shared units

| Unit | Change |
|---|---|
| `lib/motion.ts` | Extend with per-section variants: `clipReveal`, `blurIn`, `rotateIn`, plus a `useCountUp` counter hook (or component) for stats. |
| `components/ui/TiltCard.tsx` (new) | Reusable pointer-driven 3D tilt (spring rotateX/Y), extracted from the pattern in `CreativeControlNav`. Coarse-pointer and reduced-motion guarded. Applied to Projects and Services cards. |
| `components/ui/SectionHeading.tsx` | Headings render through `AnimatedText` word-mask reveal; accent words get an animated gradient shimmer. |
| `components/ui/MagneticButton.tsx` | Wired into all primary/ghost CTAs (Hero, Header, Vision, Contact, Projects modal). |
| `components/ui/ProjectVisual.tsx` | Becomes animated: slow-drifting mesh gradient, rotating rings, flowing wave lines (CSS/SVG animation, transform/opacity only). Subtle parallax shift on card hover. |
| `components/ui/PillarVisual.tsx` (new) | Code-generated animated visual per identity pillar: AI = neural node graph, Web = wireframe browser, Branding = morphing shapes, Media = viewfinder frame, Infra = server/rack lines. SVG + framer-motion. |
| `components/ui/CountUp.tsx` (new) | In-view animated number counter (spring/tween on a motion value), reduced-motion → instant final value. |

### Per-section design

**Hero** — keep layout. Add: shine-sweep across the portrait after load, subtle 3D tilt on portrait hover, animated shimmer on the cyan title gradient, magnetic CTAs.

**IdentityReveal** — the scroll-storytelling centerpiece. Left column stays sticky and hosts a large `PillarVisual` that cross-fades/morphs as the active pillar changes; active pillar tracked by scroll position (IntersectionObserver or scroll progress). Right column keeps the 5-pillar list but each row gets an active state (accent border, title slide) synced to the visual.

**ProofStrip** — replace static label cells: each proof point gets an icon; a small numeric stats row is added using only counts derivable from existing data (e.g., 8 shipped projects, 6 service areas, 5 disciplines — no invented claims) rendered with `CountUp`; entrance is a fast cascade; a hairline accent sweep runs across the strip once when it enters view.

**Services** — cards keep SpotlightCard base, add `TiltCard` wrap and SVG stroke-draw animation on the icon when hovered; entrance switches to staggered `clipReveal`.

**Projects** — `ProjectVisual` animates ambiently; card hover adds tilt + visual parallax; modal content staggers in (title → visual → meta → text).

**Process** — timeline nodes "light up" sequentially as the scroll rail passes them (scroll-linked, not just entrance).

**About** — copy column condensed visually: paragraphs get staggered reveal, stat cards become `CountUp` counters with icons; portrait gets slight scroll parallax.

**Experience** — timeline nodes pulse-activate on pass; cards alternate slide-in direction; period pill gets accent glow when card is in view.

**Skills** — badges enter with a wave stagger (per-badge delay by index); hover gives a small spring pop.

**Education** — redesigned from 3 plain cards into a connected journey path: a drawn line links milestone nodes (icon per milestone), each milestone reveals in sequence as the line reaches it.

**Vision** — the paragraph reveals line-by-line tied to scroll progress (opacity scrub, like a manifesto).

**Contact** — form fields get animated focus states (accent underline draw), submit button becomes magnetic; success state keeps current behavior.

**Header/Footer** — minor polish only (magnetic CTA in header; footer availability dot stays).

## Performance & accessibility guarantees

- Animations use `transform`/`opacity` only; no layout-thrashing properties.
- Every continuous/pointer effect checks `prefers-reduced-motion` (existing global CSS kill-switch stays) and coarse-pointer where relevant.
- Canvas background untouched (already optimized).
- No new dependencies; static export (`output: "export"`, relative assets, postbuild copy to root) must keep working.
- Verify with `npm run build` + browser check of root `index.html`.

## Testing

- Full production build must pass (type-check + lint via `next build`).
- Manual visual verification in browser of every section, including reduced-motion mode and a narrow (mobile) viewport.
