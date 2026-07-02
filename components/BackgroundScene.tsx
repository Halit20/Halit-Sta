"use client";

import { useEffect, useRef } from "react";

/**
 * BackgroundScene — "flight over the digital terrain".
 *
 * A real-time 3D WebGL scene: a wireframe topographic landscape flowing
 * beneath the page, seen from drone altitude. The terrain is displaced by
 * fbm noise in the vertex shader and rendered as glowing contour wires +
 * ridge beacons, fading into cyan→violet atmospheric fog.
 *
 * Zero dependencies (raw WebGL1) — works in the static / file:// export.
 *
 * Reactivity:
 *   - constant forward "flight" along the valley (time-scrolled noise)
 *   - mouse parallax tilts the camera (pitch/yaw, smoothed)
 *   - scroll shifts the fog hue toward violet and dims the scene
 *
 * Performance:
 *   - DPR clamped (1.75 desktop / 1.5 coarse-pointer)
 *   - grid density halved on coarse-pointer devices
 *   - pauses when the tab is hidden; context-loss safe
 *   - prefers-reduced-motion → a single static frame
 */

const VERT = /* glsl */ `
precision highp float;
attribute vec2 aPos;            // x in [-1,1], y (depth) in [0,1]
uniform float uTime;
uniform float uAspect;
uniform vec2  uTilt;            // smoothed mouse (-1..1, -1..1)
uniform mediump float uScroll;  // 0..1 page progress
uniform mediump float uMode;    // 0 = wires, 1 = beacons
uniform float uDpr;
varying mediump float vH;       // terrain height 0..1
varying mediump float vZ;       // camera-space distance
varying mediump float vSeed;    // per-vertex hash for beacons

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
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.7, 5.3);
    a *= 0.5;
  }
  return v;
}

void main() {
  float span  = 15.0;
  float depth = 27.0;
  vec3 pos = vec3(aPos.x * span, 0.0, -aPos.y * depth);

  // noise field scrolls toward the camera: perpetual forward flight
  vec2 q = vec2(
    pos.x * 0.16 + sin(uTime * 0.05) * 0.6,
    (pos.z - uTime * 1.7) * 0.16
  );
  float h = fbm(q);

  // carve a valley down the middle so the flight path stays open
  float valley = smoothstep(0.06, 0.62, abs(aPos.x));
  h *= mix(0.34, 1.0, valley);
  pos.y = h * 3.8 - 2.1;

  vH = h;
  vSeed = hash(aPos * 91.7);

  // camera above the valley, pitched down; mouse adds parallax
  vec3 pcam = pos - vec3(0.0, 0.0, 2.2);
  float pitch = -0.16 + uTilt.y * 0.045 + uScroll * 0.06;
  float yaw   = uTilt.x * 0.07;
  float cp = cos(pitch); float sp = sin(pitch);
  pcam.yz = mat2(cp, -sp, sp, cp) * pcam.yz;
  float cy = cos(yaw); float sy = sin(yaw);
  pcam.xz = mat2(cy, -sy, sy, cy) * pcam.xz;

  float zz = -pcam.z;          // distance in front of the camera (always > 0)
  vZ = zz;

  float f = 1.55;              // focal length
  gl_Position = vec4(pcam.x * f / uAspect, pcam.y * f, 0.0, zz);
  gl_PointSize = uMode > 0.5 ? (26.0 / zz) * uDpr : 1.0;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
uniform mediump float uScroll;
uniform mediump float uMode;
varying mediump float vH;
varying mediump float vZ;
varying mediump float vSeed;

void main() {
  // dusk palette: cyan ridges near, violet atmosphere far
  vec3 cyan   = vec3(0.220, 0.741, 0.973);   // #38bdf8
  vec3 violet = vec3(0.545, 0.361, 0.965);   // #8b5cf6
  vec3 white  = vec3(0.92, 0.96, 1.0);

  float far  = smoothstep(2.0, 26.0, vZ);
  vec3 col = mix(cyan, violet, clamp(far * 1.15 + uScroll * 0.35, 0.0, 1.0));
  // ridge highlights whiten near the crest
  col = mix(col, white, smoothstep(0.72, 0.98, vH) * 0.55);

  // atmospheric falloff: bright near, dissolving into fog far away
  float fog = 1.0 - smoothstep(5.0, 26.0, vZ);
  float alpha = (0.16 + vH * 0.62) * fog;

  if (uMode > 0.5) {
    // beacons: sparse glowing points on high ridges only
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float dot_ = smoothstep(0.5, 0.05, d);
    float keep = step(0.965, vSeed) * smoothstep(0.55, 0.8, vH);
    alpha = dot_ * keep * fog * 1.4;
    col = mix(col, white, 0.5);
  }

  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function buildGrid(cols: number, rows: number) {
  const verts = new Float32Array((cols + 1) * (rows + 1) * 2);
  let v = 0;
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      verts[v++] = (c / cols) * 2 - 1; // x  -1..1
      verts[v++] = r / rows; //           depth 0..1
    }
  }
  // wire segments along both axes
  const segs = rows * (cols + 1) + cols * (rows + 1);
  const idx = new Uint16Array(segs * 2);
  let i = 0;
  const at = (c: number, r: number) => r * (cols + 1) + c;
  for (let r = 0; r <= rows; r++)
    for (let c = 0; c < cols; c++) {
      idx[i++] = at(c, r);
      idx[i++] = at(c + 1, r);
    }
  for (let c = 0; c <= cols; c++)
    for (let r = 0; r < rows; r++) {
      idx[i++] = at(c, r);
      idx[i++] = at(c, r + 1);
    }
  return { verts, idx };
}

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

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null;
    if (!gl) return; // CSS aura layers remain as the graceful fallback

    /* ---- program ---- */
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("BackgroundScene link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    /* ---- geometry ---- */
    const cols = coarse ? 90 : 150;
    const rows = coarse ? 55 : 90;
    const { verts, idx } = buildGrid(cols, rows);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uTime = U("uTime");
    const uAspect = U("uAspect");
    const uTilt = U("uTilt");
    const uScroll = U("uScroll");
    const uMode = U("uMode");
    const uDpr = U("uDpr");
    gl.uniform1f(uDpr, dpr);

    /* ---- state ---- */
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE); // additive glow (colors premultiplied in shader)
    gl.clearColor(0.012, 0.012, 0.012, 1); // ink-950

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
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform1f(uAspect, w / h);
    }

    function frame(now: number) {
      const t = (now - start) / 1000;

      // smooth mouse + scroll
      tilt.x += (tilt.tx - tilt.x) * 0.04;
      tilt.y += (tilt.ty - tilt.y) * 0.04;
      scroll.sp += (scroll.p - scroll.sp) * 0.07;

      // dim the field as content takes over, near-off by the contact section
      const sp = scroll.sp;
      const dim =
        sp < 0.06
          ? 1
          : sp < 0.45
            ? 1 - ((sp - 0.06) / 0.39) * 0.5
            : Math.max(0.16, 0.5 - ((sp - 0.45) / 0.45) * 0.34);
      canvas!.style.opacity = dim.toFixed(3);

      gl!.uniform1f(uTime, reduce ? 14.0 : t);
      gl!.uniform2f(uTilt, tilt.x, tilt.y);
      gl!.uniform1f(uScroll, scroll.sp);

      gl!.clear(gl!.COLOR_BUFFER_BIT);
      // pass 1 — contour wires
      gl!.uniform1f(uMode, 0);
      gl!.drawElements(gl!.LINES, idx.length, gl!.UNSIGNED_SHORT, 0);
      // pass 2 — ridge beacons
      gl!.uniform1f(uMode, 1);
      gl!.drawArrays(gl!.POINTS, 0, verts.length / 2);
    }

    function loop(now: number) {
      if (!running || lost) return;
      frame(now);
      raf = requestAnimationFrame(loop);
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.p = max > 0 ? window.scrollY / max : 0;
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
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ibo);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* deep base */}
      <div className="absolute inset-0 bg-ink-950" />
      {/* the live 3D terrain */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* horizon glow where the terrain dissolves into atmosphere */}
      <div
        className="absolute left-1/2 top-[26%] h-[38vh] w-[130vw] -translate-x-1/2 rounded-[100%] blur-[110px]"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 50%, rgba(56,189,248,0.10), rgba(139,92,246,0.06) 55%, transparent 75%)",
        }}
      />
      {/* dusk auras */}
      <div
        className="absolute left-[-10%] top-[-14%] h-[55vh] w-[65vw] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.10), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-22%] right-[-14%] h-[60vh] w-[62vw] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.09), transparent 70%)",
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
