"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number; // depth 0.25 (far) .. 1 (near)
  vx: number;
  vy: number;
  r: number;
};

/**
 * AnimatedBackground — a premium, visibly-animated digital atmosphere drawn on
 * a single Canvas 2D layer. No WebGL dependency (works in static / file:// export).
 *
 * Layers, painted per frame:
 *   1. drifting perspective grid (subtle depth)
 *   2. slow-moving light beams / aura blobs (cinematic glow)
 *   3. depth-sorted parallax particles + neural connecting lines
 *
 * Reactivity:
 *   - particles parallax-shift with scroll position (deeper = less movement)
 *   - gentle attraction toward the cursor
 *
 * Performance:
 *   - DPR clamped to 1.5
 *   - particle count scales with viewport, halved on coarse-pointer devices
 *   - O(n²) line pass kept cheap by a low particle cap
 *   - pauses when tab hidden; prefers-reduced-motion → single static frame
 */
export function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let t = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    const scroll = { y: window.scrollY, smooth: window.scrollY };

    const ACCENT = "56, 189, 248"; // cyan accent (rgb)
    const SILVER = "200, 214, 230";

    function build() {
      const area = w * h;
      const divisor = coarse ? 15000 : 8500;
      let count = Math.min(Math.floor(area / divisor), coarse ? 60 : 140);
      // small viewports get 40% of the particle budget
      if (w <= 768) count = Math.floor(count * 0.4);
      particles = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          vx: (Math.random() - 0.5) * 0.2 * z,
          vy: (Math.random() - 0.5) * 0.2 * z,
          r: 1.2 + z * 2.4,
        };
      });
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      measureZones();
    }

    const linkDist = coarse ? 130 : 180;

    /* ---- per-section density: full in hero, ~50% in content-heavy
       sections, near-off in contact ---- */
    const SECTION_FACTORS: Record<string, number> = {
      home: 1,
      services: 0.5,
      work: 0.5,
      experience: 0.5,
      contact: 0.04,
    };
    const DEFAULT_FACTOR = 0.7;
    let zones: { top: number; factor: number }[] = [];
    let density = 1;

    function measureZones() {
      const ids = [
        "home",
        "services",
        "work",
        "about",
        "experience",
        "skills",
        "education",
        "media",
        "vision",
        "contact",
      ];
      const y0 = window.scrollY;
      zones = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return {
            top: el.getBoundingClientRect().top + y0,
            factor: SECTION_FACTORS[id] ?? DEFAULT_FACTOR,
          };
        })
        .filter((z): z is { top: number; factor: number } => z !== null)
        .sort((a, b) => a.top - b.top);
    }

    function targetDensity(sc: number) {
      const center = sc + h / 2;
      let f = 1;
      for (const z of zones) {
        if (center >= z.top) f = z.factor;
        else break;
      }
      return f;
    }

    function drawGrid(offset: number) {
      const spacing = 80;
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = `rgba(${SILVER}, 0.07)`;
      const yShift = (offset * 0.04) % spacing;
      for (let gy = -spacing + yShift; gy < h + spacing; gy += spacing) {
        ctx!.beginPath();
        ctx!.moveTo(0, gy);
        ctx!.lineTo(w, gy);
        ctx!.stroke();
      }
      const xShift = (Math.sin(t * 0.0003) * 14) % spacing;
      for (let gx = -spacing + xShift; gx < w + spacing; gx += spacing) {
        ctx!.beginPath();
        ctx!.moveTo(gx, 0);
        ctx!.lineTo(gx, h);
        ctx!.stroke();
      }
    }

    function drawBeam(
      cx: number,
      cy: number,
      radius: number,
      rgb: string,
      alpha: number
    ) {
      const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius);
      g.addColorStop(0, `rgba(${rgb}, ${alpha})`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx!.fill();
    }

    function render() {
      ctx!.clearRect(0, 0, w, h);

      // smooth the scroll value for buttery parallax
      scroll.smooth += (scroll.y - scroll.smooth) * 0.08;
      const sc = scroll.smooth;

      // ease the field density toward the current section's target
      density += (targetDensity(sc) - density) * 0.06;
      canvas!.style.opacity = density.toFixed(3);

      // near-off (contact): skip all heavy drawing work this frame
      if (density < 0.06) return;

      // --- light beams (cinematic glow) ---
      ctx!.globalCompositeOperation = "screen";
      drawBeam(
        w * (0.3 + Math.sin(t * 0.00022) * 0.08),
        h * 0.28 - sc * 0.05,
        Math.max(w, h) * 0.42,
        ACCENT,
        0.16
      );
      drawBeam(
        w * (0.78 + Math.cos(t * 0.00018) * 0.06),
        h * 0.7 - sc * 0.03,
        Math.max(w, h) * 0.36,
        ACCENT,
        0.12
      );
      drawBeam(
        w * 0.5,
        h * 0.5 + Math.sin(t * 0.00025) * 40,
        Math.max(w, h) * 0.3,
        SILVER,
        0.05
      );
      ctx!.globalCompositeOperation = "source-over";

      // --- grid ---
      drawGrid(sc);

      // --- particles update + parallax ---
      const drawn: { x: number; y: number; z: number }[] = [];
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // cursor attraction (near layers feel it more)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 180 && d > 0.5) {
            const f = (1 - d / 180) * 0.5 * p.z;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }

        // wrap around edges
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;

        // scroll parallax — deeper particles drift less
        let dy2 = (p.y - sc * 0.12 * p.z) % (h + 40);
        if (dy2 < -20) dy2 += h + 40;
        drawn.push({ x: p.x, y: dy2, z: p.z });
      }

      // --- neural connecting lines ---
      for (let i = 0; i < drawn.length; i++) {
        for (let j = i + 1; j < drawn.length; j++) {
          const a = drawn[i];
          const b = drawn[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.5 * ((a.z + b.z) / 2);
            ctx!.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // --- particle dots (with soft glow on near ones) ---
      for (let i = 0; i < drawn.length; i++) {
        const a = drawn[i];
        const p = particles[i];
        const alpha = 0.5 + a.z * 0.5;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${SILVER}, ${alpha})`;
        ctx!.fill();
        if (a.z > 0.55) {
          const g = ctx!.createRadialGradient(
            a.x,
            a.y,
            0,
            a.x,
            a.y,
            p.r * 4
          );
          g.addColorStop(0, `rgba(${ACCENT}, ${(a.z - 0.55) * 0.9})`);
          g.addColorStop(1, `rgba(${ACCENT}, 0)`);
          ctx!.beginPath();
          ctx!.arc(a.x, a.y, p.r * 4, 0, Math.PI * 2);
          ctx!.fillStyle = g;
          ctx!.fill();
        }
      }
    }

    function loop() {
      if (!running) return;
      t += 16;
      render();
      raf = requestAnimationFrame(loop);
    }

    function onScroll() {
      scroll.y = window.scrollY;
    }
    function onMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
    }
    function onVisibility() {
      running = !document.hidden && intersecting;
      if (running && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    }

    // pause the render loop whenever the canvas leaves the viewport
    let intersecting = true;
    const io = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      onVisibility();
    });
    io.observe(canvas);

    resize();
    measureZones();
    // re-measure once everything (fonts, images) has settled the layout
    window.addEventListener("load", measureZones, { once: true });

    // Always paint at least one full frame immediately so the field is
    // present even before the rAF loop produces its first tick (and on
    // reduced-motion, this static frame is the final result).
    render();
    if (!reduce) loop();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("load", measureZones);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* deep base */}
      <div className="absolute inset-0 bg-ink-950" />
      {/* static accent auras (CSS) — layered under the live canvas */}
      <div
        className="absolute left-1/2 top-[-12%] h-[65vh] w-[85vw] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-25%] right-[-12%] h-[60vh] w-[60vw] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.10), transparent 70%)",
        }}
      />
      {/* the live animated field */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* fine film grain + top vignette to keep text crisp */}
      <div className="noise absolute inset-0 opacity-[0.03] mix-blend-soft-light" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(3,3,3,0.55) 100%)",
        }}
      />
    </div>
  );
}
