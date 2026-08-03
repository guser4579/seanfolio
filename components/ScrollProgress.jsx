'use client';

import { useEffect, useState } from 'react';

// Centered floating pill showing percent of the page scrolled: a 24px donut
// that completes proportionally plus a "{n}% complete" counter. Anatomy per
// spec: 12px gutters, 8px icon-to-text gap, 8px vertical padding, 1px line
// border. Hidden on pages too short to scroll. rAF-throttled, passive
// listeners; reads position on mount, scroll, and resize.

const R = 9;
const C = 2 * Math.PI * R;

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    let raf = 0;
    function measure() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setScrollable(false);
        return;
      }
      setScrollable(true);
      const p = (window.scrollY / max) * 100;
      setPct(Math.round(Math.min(100, Math.max(0, p))));
    }
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    }
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!scrollable) return null;

  return (
    <div className="scrollpill" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <circle className="track" cx="12" cy="12" r={R} strokeWidth="2.5" />
        <circle
          className="arc"
          cx="12"
          cy="12"
          r={R}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
          transform="rotate(-90 12 12)"
        />
      </svg>
      <span>{pct}% complete</span>
    </div>
  );
}
