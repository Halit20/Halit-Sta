"use client";

import { useEffect, useRef } from "react";

/**
 * BackgroundScene — "the digital silk field".
 *
 * A cinematic real-time WebGL atmosphere: domain-warped volumetric light
 * fields ("silk" ribbons of data) drifting through graphite darkness, with a
 * 3D particle field the camera travels through as the page scrolls.
 *
 * Zero dependencies (raw WebGL1) — works in the static / file:// export.
 *
 * Composition (back to front):
 *   1. warm obsidian base
 *   2. far nebula body   — slow domain-warped fbm, deep bronze
 *   3. mid silk ribbons  — brighter warped bands, gold core / bronze edge
 *   4. neural filaments  — thin seams where the two warp fields agree
 *   5. particle field    — glowing motes + rare bright nodes in true depth
 *
 * Scroll reactivity:
 *   - each atmosphere layer translates at a different rate (parallax)
 *   - particles advance in z: the camera flies forward through the field
 *   - a "mood" curve retunes intensity + hue per page region:
 *     hero full, mid sections calmer, creative section gets a champagne
 *     cinematic lift, contact/footer fades near-dark
 *
 * Performance:
 *   - atmosphere is rendered at half resolution into an FBO and
 *     upscaled with linear filtering (soft cinematic look, big GPU win)
 *   - fbm octaves + particle count reduced on coarse-pointer devices
 *   - DPR clamped; blit pass dithers to kill gradient banding
 *   - pauses when the tab is hidden; context-loss safe
 *   - prefers-reduced-motion → a single static frame
 */

/* ------------------------------------------------------------------ */
/* shaders (ASCII only; varying precision must match across stages)   */
/* ------------------------------------------------------------------ */

const VERT_QUAD = /* glsl */ `
precision highp float;
attribute vec2 aPos;
varying mediump vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// Shared prelude: fp32 fragments where the hardware has them (sin-based
// hashing overflows fp16 mediump once time-scrolled coordinates grow).
const FRAG_PRELUDE = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

// OCT is injected per device (4 mobile / 5 desktop) before compiling.
const FRAG_ATMOS = /* glsl */ `
varying mediump vec2 vUv;
uniform float uTime;
uniform mediump float uScroll;
uniform mediump float uMood;
uniform mediump float uHue;
uniform vec2  uTilt;
uniform float uAspect;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < OCT; i++) {
    v += a * noise(p);
    p = r * p * 2.02 + vec2(9.7, 3.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5);
  float t = uTime * 0.030;
  float travel = uScroll * 2.6;

  // far layer: slow drift, weak scroll parallax
  vec2 pf = p * 1.25 + vec2(t * 0.40 + uTilt.x * 0.020,
                            -travel * 0.30 + uTilt.y * 0.015);

  // iq-style domain warp: fbm fed with fbm
  vec2 w1 = vec2(fbm(pf + vec2(0.0, t)),
                 fbm(pf + vec2(5.2, 1.3)));
  vec2 w2 = vec2(fbm(pf + 2.2 * w1 + vec2(1.7, 9.2) + vec2(0.0, -travel * 0.18)),
                 fbm(pf + 2.2 * w1 + vec2(8.3, 2.8) - vec2(0.0, t * 0.6)));
  float f = fbm(pf + 2.0 * w2);

  // mid layer: finer field, stronger scroll parallax
  vec2 pm = p * 2.1 + vec2(-t * 0.6, -travel * 0.85);
  float g = fbm(pm + 1.8 * w2);

  vec3 base   = vec3(0.016, 0.013, 0.009);
  vec3 gold   = vec3(0.839, 0.647, 0.267);   // #d6a544
  vec3 champ  = vec3(0.918, 0.788, 0.494);   // cinematic tilt target
  vec3 bronze = vec3(0.604, 0.455, 0.204);   // #9a7434
  vec3 accA   = mix(gold, champ, uHue);

  // 2 — deep nebula body
  float body = smoothstep(0.30, 0.85, f);
  vec3 col = base + body * body * mix(bronze, accA, w1.y) * 0.13;

  // 3 — silk ribbon: a soft band carved out of the mid field
  float band = smoothstep(0.42, 0.55, g) * smoothstep(0.72, 0.55, g);
  col += band * mix(accA, bronze, w2.x) * (0.15 + 0.24 * body);

  // 4 — neural filaments: thin seams where the two warped fields agree
  float fil = smoothstep(0.055, 0.0, abs(f - g)) * body;
  col += fil * mix(accA, vec3(1.0, 0.95, 0.85), 0.35) * 0.10;

  // breathing light core in the upper field (strongest in the hero)
  float glow = exp(-3.2 * length(p - vec2(0.12, 0.16)));
  glow *= 0.80 + 0.20 * sin(uTime * 0.35);
  col += glow * mix(accA, bronze, 0.35) * 0.09 * uMood;

  // gentle edge vignette inside the scene itself
  col *= 1.0 - 0.35 * dot(p, p);

  // mood: dim toward the foot of the page but never fully dead
  col *= 0.30 + 0.70 * uMood;

  gl_FragColor = vec4(col, 1.0);
}
`;

const FRAG_BLIT = /* glsl */ `
varying mediump vec2 vUv;
uniform sampler2D uTex;
uniform float uTime;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec3 col = texture2D(uTex, vUv).rgb;
  // ordered-noise dither kills banding in the dark gradients
  col += (hash(vUv * 1024.0 + uTime) - 0.5) * (1.6 / 255.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT_PART = /* glsl */ `
precision highp float;
attribute vec4 aSeed;           // xyz in [0,1), w = per-particle hash
uniform float uTime;
uniform mediump float uScroll;
uniform mediump float uMood;
uniform float uDpr;
uniform float uAspect;
uniform vec2  uTilt;
varying mediump float vA;
varying mediump float vSel;

void main() {
  float s = aSeed.w;

  // the camera flies forward: scroll advances every particle in z
  float z = fract(aSeed.z + uScroll * 0.55 + uTime * 0.004 * (0.5 + s));

  vec2 xy = aSeed.xy * 2.0 - 1.0;
  xy += 0.05 * vec2(sin(uTime * (0.05 + 0.10 * s) + s * 40.0),
                    cos(uTime * (0.04 + 0.09 * s) + s * 70.0));

  float depth = mix(6.0, 0.6, z);     // z=0 far, z=1 at the camera
  float persp = 1.6 / depth;
  vec2 scr = xy * persp * 2.2;
  scr += uTilt * 0.05 * persp;        // mouse parallax, stronger up close
  scr.x /= uAspect;

  float fadeNear = smoothstep(1.0, 0.85, z);
  float fadeFar  = smoothstep(0.0, 0.18, z);
  vA = fadeNear * fadeFar * (0.25 + 0.75 * uMood);
  vSel = s;

  float node = step(0.94, s);         // rare bright "network nodes"
  gl_Position = vec4(scr, 0.0, 1.0);
  gl_PointSize = (2.0 + persp * (3.0 + node * 6.0)) * uDpr;
}
`;

const FRAG_PART = /* glsl */ `
precision mediump float;
varying mediump float vA;
varying mediump float vSel;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float m = smoothstep(0.5, 0.08, d);
  float core = smoothstep(0.16, 0.02, d);

  vec3 gold   = vec3(0.839, 0.647, 0.267);
  vec3 bronze = vec3(0.604, 0.455, 0.204);
  vec3 white  = vec3(1.0, 0.97, 0.90);

  vec3 col = mix(gold, bronze, step(0.5, fract(vSel * 7.3)));
  col = mix(col, white, core * 0.8);

  float a = m * vA * (0.35 + 0.65 * step(0.94, vSel));
  gl_FragColor = vec4(col * a, a);
}
`;

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("BackgroundScene shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  // every program keeps its sole attribute at location 0
  gl.bindAttribLocation(prog, 0, vsSrc.indexOf("aSeed") >= 0 ? "aSeed" : "aPos");
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("BackgroundScene link:", gl.getProgramInfoLog(prog));
    return null;
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return prog;
}

/** intensity curve across the page: hero 1 → mid calm → creative lift → footer dark */
function moodAt(s: number) {
  const ss = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  let v = 1.0 - ss(0.06, 0.32, s) * 0.45;
  v += ss(0.58, 0.7, s) * (1 - ss(0.78, 0.9, s)) * 0.22;
  v *= 1.0 - ss(0.82, 0.98, s) * 0.62;
  return v;
}

/** hue tilt: gold/bronze at the top, champagne cinematic around the media section */
function hueAt(s: number) {
  const ss = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  return ss(0.55, 0.7, s) * (1 - ss(0.8, 0.92, s));
}

/* ------------------------------------------------------------------ */
/* component                                                          */
/* ------------------------------------------------------------------ */

export function BackgroundScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75);
    const fboScale = coarse ? 0.4 : 0.5;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null;
    if (!gl) return; // CSS aura layers remain as the graceful fallback

    /* ---- programs ---- */
    const atmosSrc =
      FRAG_PRELUDE + FRAG_ATMOS.replace(/OCT/g, coarse ? "4" : "5");
    const progAtmos = link(gl, VERT_QUAD, atmosSrc);
    const progBlit = link(gl, VERT_QUAD, FRAG_PRELUDE + FRAG_BLIT);
    const progPart = link(gl, VERT_PART, FRAG_PART);
    if (!progAtmos || !progBlit || !progPart) return;

    const U = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);
    const ua = {
      time: U(progAtmos, "uTime"),
      scroll: U(progAtmos, "uScroll"),
      mood: U(progAtmos, "uMood"),
      hue: U(progAtmos, "uHue"),
      tilt: U(progAtmos, "uTilt"),
      aspect: U(progAtmos, "uAspect"),
    };
    const ub = { tex: U(progBlit, "uTex"), time: U(progBlit, "uTime") };
    const up = {
      time: U(progPart, "uTime"),
      scroll: U(progPart, "uScroll"),
      mood: U(progPart, "uMood"),
      dpr: U(progPart, "uDpr"),
      aspect: U(progPart, "uAspect"),
      tilt: U(progPart, "uTilt"),
    };

    /* ---- geometry ---- */
    // fullscreen triangle
    const triBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    // particle seeds
    const COUNT = coarse ? 240 : 520;
    const seeds = new Float32Array(COUNT * 4);
    let sv = 1234.567;
    const rnd = () => (sv = (sv * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < COUNT * 4; i++) seeds[i] = rnd();
    const partBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, partBuf);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(0);

    /* ---- half-res FBO for the atmosphere ---- */
    const fbo = gl.createFramebuffer();
    const tex = gl.createTexture();
    let fw = 1;
    let fh = 1;
    function sizeFbo(w: number, h: number) {
      fw = Math.max(1, Math.floor(w * fboScale));
      fh = Math.max(1, Math.floor(h * fboScale));
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(
        gl!.TEXTURE_2D, 0, gl!.RGBA, fw, fh, 0,
        gl!.RGBA, gl!.UNSIGNED_BYTE, null
      );
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0
      );
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    }

    /* ---- state ---- */
    let raf = 0;
    let running = true;
    let lost = false;
    const start = performance.now();
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    const scroll = { p: 0, sp: 0 };

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      sizeFbo(canvas!.width, canvas!.height);
    }

    function frame(now: number) {
      const t = reduce ? 40.0 : (now - start) / 1000;

      tilt.x += (tilt.tx - tilt.x) * 0.04;
      tilt.y += (tilt.ty - tilt.y) * 0.04;
      scroll.sp += (scroll.p - scroll.sp) * 0.07;

      const sp = scroll.sp;
      const mood = moodAt(sp);
      const hue = hueAt(sp);
      const aspect = canvas!.width / Math.max(1, canvas!.height);

      // pass 1 — atmosphere into the half-res FBO
      gl!.disable(gl!.BLEND);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.viewport(0, 0, fw, fh);
      gl!.useProgram(progAtmos);
      gl!.uniform1f(ua.time, t);
      gl!.uniform1f(ua.scroll, sp);
      gl!.uniform1f(ua.mood, mood);
      gl!.uniform1f(ua.hue, hue);
      gl!.uniform2f(ua.tilt, tilt.x, tilt.y);
      gl!.uniform1f(ua.aspect, aspect);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, triBuf);
      gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      // pass 2 — upscale to screen with dithering
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.useProgram(progBlit);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.uniform1i(ub.tex, 0);
      gl!.uniform1f(ub.time, t);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      // pass 3 — additive particle field
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.ONE, gl!.ONE);
      gl!.useProgram(progPart);
      gl!.uniform1f(up.time, t);
      gl!.uniform1f(up.scroll, sp);
      gl!.uniform1f(up.mood, mood);
      gl!.uniform1f(up.dpr, dpr);
      gl!.uniform1f(up.aspect, aspect);
      gl!.uniform2f(up.tilt, tilt.x, tilt.y);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, partBuf);
      gl!.vertexAttribPointer(0, 4, gl!.FLOAT, false, 0, 0);
      gl!.drawArrays(gl!.POINTS, 0, COUNT);
    }

    function loop(now: number) {
      if (!running || lost) return;
      frame(now);
      raf = requestAnimationFrame(loop);
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.p = max > 0 ? window.scrollY / max : 0;
      // reduced motion: no animation loop, but keep the single static
      // frame in sync with the scroll position (sphere fade, parallax)
      if (reduce && !lost) {
        scroll.sp = scroll.p;
        frame(performance.now());
      }
    }
    function onMove(e: PointerEvent) {
      tilt.tx = (e.clientX / window.innerWidth) * 2 - 1;
      tilt.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }
    function onVisibility() {
      running = !document.hidden;
      if (running && !reduce && !lost) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    }
    function onLost(e: Event) {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
    }
    function onRestored() {
      lost = false;
      if (!reduce) raf = requestAnimationFrame(loop);
    }

    resize();
    onScroll();
    scroll.sp = scroll.p;
    frame(performance.now()); // always paint one frame immediately
    if (!reduce) raf = requestAnimationFrame(loop);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      gl.deleteBuffer(triBuf);
      gl.deleteBuffer(partBuf);
      gl.deleteFramebuffer(fbo);
      gl.deleteTexture(tex);
      gl.deleteProgram(progAtmos);
      gl.deleteProgram(progBlit);
      gl.deleteProgram(progPart);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* deep base */}
      <div className="absolute inset-0 bg-ink-950" />
      {/* the live silk field */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* soft volumetric core where the silk gathers */}
      <div
        className="absolute left-1/2 top-[22%] h-[44vh] w-[120vw] -translate-x-1/2 rounded-[100%] blur-[120px]"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 50%, rgba(214,165,68,0.07), rgba(154,116,52,0.045) 55%, transparent 75%)",
        }}
      />
      {/* golden auras */}
      <div
        className="absolute left-[-10%] top-[-14%] h-[55vh] w-[65vw] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(214,165,68,0.08), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-22%] right-[-14%] h-[60vh] w-[62vw] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(154,116,52,0.07), transparent 70%)",
        }}
      />
      {/* fine film grain + top vignette to keep text crisp */}
      <div className="noise absolute inset-0 opacity-[0.03] mix-blend-soft-light" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 60%, rgba(3,3,3,0.38) 100%)",
        }}
      />
    </div>
  );
}
