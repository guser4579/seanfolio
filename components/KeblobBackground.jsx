'use client';

import { useEffect, useRef } from 'react';

// Ambient monochrome metaball field behind the kebab case study - a port of
// the app's MetaballBackground.swift (the welcome screen's "keblob"
// lava-lamp field). The mass table and every motion wave below are copied
// verbatim from the Swift source; do not retune them here without retuning
// the app.
//
// Rendering happens in a WebGL fragment shader rather than the app's
// blur -> alphaThreshold pipeline. Browsers approximate large-radius
// Gaussian blurs by downsampling the layer and scaling it back up, so
// thresholding a browser blur yields a coarse, slightly shimmering edge -
// the shader instead evaluates each mass's blurred coverage analytically
// per pixel (a logistic falloff over signed distance, the closed form of a
// Gaussian-blurred edge), sums the field, and cuts the 0.5 iso-contour
// with derivative-based anti-aliasing. Full native resolution, perfectly
// smooth, one pixel of AA, every frame.
//
// Purely decorative: pointer-events none, aria-hidden, and frozen at the
// app's own fixed frame (t = 8) under prefers-reduced-motion.

const INTENSITY = 0.12; // the visibility knob, same value as the app
const FROZEN_TIME = 8; // reduced-motion frame, same instant as the app
const FPS = 30;
const SIZE_SCALE = 0.95; // the app draws 5% under the listed radii
const MASS_COUNT = 6;

const wave = (amp, period, phase) => ({ amp, period, phase });
const w = (v, t) => v.amp * Math.sin((t * 2 * Math.PI) / v.period + v.phase);

const MASSES = [
  { base: [0.40, 1.04], radius: 0.42,
    breath: wave(0.10, 47.0, 0.9), stretch: wave(0.10, 38.3, 1.8),
    x1: wave(0.10, 31.0, 0.0), x2: wave(0.04, 13.7, 2.1),
    y1: wave(0.075, 43.0, 4.2), y2: wave(0.03, 17.3, 1.3),
    wobble2: wave(0.07, 61.0, 0.4), wobble3: wave(0.035, 44.3, 2.7) },
  { base: [1.05, 0.36], radius: 0.34,
    breath: wave(0.12, 53.0, 2.0), stretch: wave(0.14, 31.7, 4.1),
    x1: wave(0.11, 37.0, 1.5), x2: wave(0.05, 15.9, 0.4),
    y1: wave(0.12, 23.5, 3.3), y2: wave(0.03, 11.9, 5.1),
    wobble2: wave(0.08, 57.0, 3.8), wobble3: wave(0.040, 36.1, 1.2) },
  { base: [-0.06, 0.12], radius: 0.32,
    breath: wave(0.14, 41.0, 5.5), stretch: wave(0.12, 26.9, 0.6),
    x1: wave(0.13, 29.0, 3.9), x2: wave(0.05, 19.1, 0.7),
    y1: wave(0.07, 47.5, 2.6), y2: wave(0.03, 14.3, 4.4),
    wobble2: wave(0.075, 66.0, 5.9), wobble3: wave(0.045, 40.9, 0.1) },
  { base: [0.66, 0.66], radius: 0.24,
    breath: wave(0.16, 37.7, 1.1), stretch: wave(0.18, 22.9, 3.4),
    x1: wave(0.13, 43.5, 5.0), x2: wave(0.05, 16.3, 2.8),
    y1: wave(0.10, 19.7, 0.2), y2: wave(0.04, 12.7, 3.6),
    wobble2: wave(0.09, 51.5, 2.3), wobble3: wave(0.050, 30.7, 4.6) },
  { base: [0.47, -0.05], radius: 0.27,
    breath: wave(0.12, 49.0, 3.2), stretch: wave(0.15, 34.7, 5.2),
    x1: wave(0.15, 27.3, 0.8), x2: wave(0.05, 14.9, 4.9),
    y1: wave(0.08, 53.5, 5.8), y2: wave(0.03, 18.7, 2.2),
    wobble2: wave(0.08, 58.7, 1.0), wobble3: wave(0.045, 33.3, 5.3) },
  { base: [-0.05, 0.66], radius: 0.28,
    breath: wave(0.11, 43.7, 4.7), stretch: wave(0.13, 24.7, 2.9),
    x1: wave(0.12, 33.9, 2.4), x2: wave(0.05, 17.7, 5.7),
    y1: wave(0.10, 25.6, 1.7), y2: wave(0.04, 13.1, 0.5),
    wobble2: wave(0.075, 63.5, 4.2), wobble3: wave(0.040, 42.1, 2.0) },
];

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Per mass: directional radius of the stretched, wobbled outline along the
// pixel's bearing, then signed distance rho - R. A logistic over d/sigma is
// the closed form of a Gaussian-blurred edge (k = 1.702/sigma matches the
// probit curve), so summing them reproduces the app's blurred influence
// field; smoothstep over fwidth cuts the 0.5 iso-contour with exactly one
// pixel of anti-aliasing.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uSigma;
uniform vec3 uTone;
uniform vec4 uPos[${MASS_COUNT}]; // cx, cy (gl coords, px), rx, ry (px)
uniform vec4 uWob[${MASS_COUNT}]; // p2, p3, w2 amp, w3 amp
out vec4 outColor;

void main() {
  vec2 p = gl_FragCoord.xy;
  float acc = 0.0;
  for (int i = 0; i < ${MASS_COUNT}; i++) {
    vec2 d = p - uPos[i].xy;
    float rx = uPos[i].z;
    float ry = uPos[i].w;
    float rho = length(d);
    float theta = atan(d.y, d.x);
    float c = cos(theta);
    float s = sin(theta);
    float R = rx * ry / sqrt(ry * ry * c * c + rx * rx * s * s);
    R *= 1.0
      + uWob[i].z * sin(2.0 * theta + uWob[i].x)
      + uWob[i].w * sin(3.0 * theta + uWob[i].y);
    float dist = rho - R;
    acc += 1.0 / (1.0 + exp(clamp(1.702 * dist / uSigma, -30.0, 30.0)));
  }
  float aa = fwidth(acc);
  float alpha = smoothstep(0.5 - aa, 0.5 + aa, acc);
  outColor = vec4(uTone * alpha, alpha);
}
`;

function parseTone(hex) {
  const h = hex.replace('#', '').trim();
  const full =
    h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [0.06, 0.067, 0.07];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export default function KeblobBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // WebGL2 only (universal in evergreen browsers and Safari 15+): the
    // shader needs GLSL ES 3.00 for fwidth. Decorative surface, so absence
    // of a context is the fallback - the page simply renders without the
    // field.
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
    });
    if (!gl) return undefined;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uSigma = gl.getUniformLocation(prog, 'uSigma');
    const uTone = gl.getUniformLocation(prog, 'uTone');
    const uPosLoc = gl.getUniformLocation(prog, 'uPos');
    const uWobLoc = gl.getUniformLocation(prog, 'uWob');

    const pos = new Float32Array(MASS_COUNT * 4);
    const wob = new Float32Array(MASS_COUNT * 4);
    let raf = 0;
    let lastFrame = 0;
    let reduced = false;
    let dpr = 1;
    let vw = 0;
    let vh = 0;

    const readTone = () => {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue('--title');
      gl.uniform3fv(uTone, parseTone(hex));
    };

    const draw = (t) => {
      for (let i = 0; i < MASS_COUNT; i++) {
        const m = MASSES[i];
        const cx = (m.base[0] + w(m.x1, t) + w(m.x2, t)) * vw;
        const cy = (m.base[1] + w(m.y1, t) + w(m.y2, t)) * vh;
        const r =
          m.radius * Math.min(vw, vh) * (1 + w(m.breath, t)) * SIZE_SCALE;
        const e = w(m.stretch, t);
        pos[i * 4] = cx * dpr;
        pos[i * 4 + 1] = (vh - cy) * dpr; // gl origin is bottom-left
        pos[i * 4 + 2] = r * (1 + e) * dpr;
        pos[i * 4 + 3] = r * (1 - e) * dpr;
        // Contour phases rotate with time; the y-flip mirrors angles
        // (theta -> -theta), so sin(n*theta + p) needs -p to keep the
        // dents crawling the same way the app's do.
        wob[i * 4] = -(m.wobble2.phase + (t * 2 * Math.PI) / m.wobble2.period);
        wob[i * 4 + 1] =
          -(m.wobble3.phase + (t * 2 * Math.PI) / m.wobble3.period);
        wob[i * 4 + 2] = m.wobble2.amp;
        wob[i * 4 + 3] = m.wobble3.amp;
      }
      gl.uniform4fv(uPosLoc, pos);
      gl.uniform4fv(uWobLoc, wob);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now - lastFrame < 1000 / FPS) return;
      lastFrame = now;
      draw(Date.now() / 1000);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw(FROZEN_TIME);
      else raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      // Merge softness scales with the viewport's shorter side, like the
      // app's merge blur.
      gl.uniform1f(uSigma, Math.min(vw, vh) * 0.125 * dpr);
      if (reduced) draw(FROZEN_TIME);
    };

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onRm = () => {
      reduced = rm.matches;
      start();
    };
    reduced = rm.matches;

    // Theme flips swap --title (ink in light, bone in dark).
    const themeWatch = new MutationObserver(() => {
      readTone();
      if (reduced) draw(FROZEN_TIME);
    });
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const onLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener('webglcontextlost', onLost);

    readTone();
    resize();
    start();
    window.addEventListener('resize', resize);
    rm.addEventListener('change', onRm);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      rm.removeEventListener('change', onRm);
      themeWatch.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
    };
  }, []);

  return (
    <div className="keblob" aria-hidden="true">
      <canvas ref={canvasRef} style={{ opacity: INTENSITY }} />
    </div>
  );
}
