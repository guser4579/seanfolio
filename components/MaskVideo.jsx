'use client';

import { useEffect, useRef } from 'react';

// A muted looping video inside a Band mask frame. Plays only while in the
// viewport; under prefers-reduced-motion it never autoplays and exposes the
// native controls instead, like every other animation on the site.
export default function MaskVideo({ src, poster, w, h, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.controls = true;
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={w}
      height={h}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
