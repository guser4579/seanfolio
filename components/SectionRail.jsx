'use client';

import { useEffect, useRef, useState } from 'react';

// Desktop section rail: a fixed minimap of dashes in the left margin, one per
// h2 in the hosting article. Three states encode reading progress (passed /
// current / upcoming); hovering the rail reveals every section label at once
// ("01 title" chips); click jumps to the section and updates the hash. The
// accent follows the page type via --railaccent in globals.css (blue on
// studies, teal on thought pieces). Renders nothing with fewer than two
// sections, and CSS hides it under 1000px.

export default function SectionRail() {
  const [sections, setSections] = useState([]);
  const [cur, setCur] = useState(-1);
  const railRef = useRef(null);

  useEffect(() => {
    const host = railRef.current?.closest('main');
    if (!host) return;
    const hs = [...host.querySelectorAll('h2')];
    if (hs.length < 2) return;
    hs.forEach((h) => {
      if (!h.id) {
        h.id = h.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    });
    setSections(hs.map((h) => ({ id: h.id, title: h.textContent })));

    let raf = 0;
    function measure() {
      const mark = window.innerHeight * 0.4;
      let c = -1;
      hs.forEach((h, i) => {
        if (h.getBoundingClientRect().top <= mark) c = i;
      });
      setCur(c);
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

  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  }

  return (
    <nav className="secrail" aria-label="Sections" ref={railRef}>
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={i === cur ? 'cur' : i < cur ? 'past' : undefined}
          onClick={(e) => jump(e, s.id)}
        >
          <span className="dash" aria-hidden="true" />
          <span className="lbl">
            <span className="n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            {s.title}
          </span>
        </a>
      ))}
    </nav>
  );
}
