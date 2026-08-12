'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Inline info chip (bio). Same grammar as SkillChip - desktop hover opens the
// mono peek, click opens the reading modal, mobile tap opens the bottom sheet
// (content-height, capped at the sheet's 65% terminal) - but the content is a
// static prop and the only header action is a globe linking to `href`.

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
    </svg>
  );
}

export default function InfoChip({ label, text, href, hrefLabel }) {
  const [peek, setPeek] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [place, setPlace] = useState({ up: false, right: false });

  const chipRef = useRef(null);
  const dialogRef = useRef(null);
  const paneRef = useRef(null);
  const leaveTimer = useRef(null);

  function onEnter() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    clearTimeout(leaveTimer.current);
    if (open) return;
    const r = chipRef.current.getBoundingClientRect();
    setPlace({
      up: window.innerHeight - r.bottom < 400,
      right: r.left + 446 > window.innerWidth - 16,
    });
    setPeek(true);
  }
  function onLeave() {
    leaveTimer.current = setTimeout(() => setPeek(false), 120);
  }

  function openModal() {
    setPeek(false);
    setOpen(true);
  }

  // Same animated-dismiss pattern as the other sheets: mobile plays the
  // slide-down exit before unmounting, desktop closes at once.
  function requestClose() {
    const animated =
      window.matchMedia('(max-width: 639px)').matches &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (animated) setClosing(true);
    else finishClose();
  }
  function finishClose() {
    setOpen(false);
    setClosing(false);
    chipRef.current?.focus();
  }
  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(finishClose, 350);
    return () => clearTimeout(t);
  }, [closing]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e) {
      if (e.key === 'Escape') requestClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll('a, button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function updateFades(el) {
    if (!el) return;
    el.classList.toggle('ft', el.scrollTop > 4);
    el.classList.toggle('fb', el.scrollHeight - el.clientHeight - el.scrollTop > 4);
  }
  useEffect(() => {
    updateFades(paneRef.current);
  }, [open]);

  return (
    <span className="skillchip-wrap" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        className="skillchip"
        ref={chipRef}
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="doc" aria-hidden="true"><InfoIcon /></span>
        <span className="fname">{label}</span>
      </button>

      {peek && !open && (
        <span className={'skillpeek' + (place.up ? ' up' : '') + (place.right ? ' right' : '')}>
          <span className="skillpane" onScroll={(e) => updateFades(e.currentTarget)}>
            <span className="mdtext">{text}</span>
          </span>
          <span className="peek-hint">click to read more</span>
        </span>
      )}

      {open &&
        createPortal(
          <>
            <div className={closing ? 'overlay is-closing' : 'overlay'} onClick={requestClose} />
            <div
              className={closing ? 'skillmodal fit is-closing' : 'skillmodal fit'}
              role="dialog"
              aria-modal="true"
              aria-label={`About ${label}`}
              ref={dialogRef}
              tabIndex={-1}
              onAnimationEnd={(e) => {
                if (closing && e.target === dialogRef.current) finishClose();
              }}
            >
              <div className="skillmodal-head">
                <span className="doc" aria-hidden="true"><InfoIcon /></span>
                <span className="fname">{label}</span>
                <span className="acts">
                  <span className="esc-hint" aria-hidden="true">[ESC] to close</span>
                  <a
                    className="sq"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={hrefLabel || `Visit ${label} website`}
                  >
                    <GlobeIcon />
                  </a>
                </span>
              </div>
              <div className="skillpane" ref={paneRef} onScroll={(e) => updateFades(e.currentTarget)}>
                <span className="mdtext">{text}</span>
              </div>
            </div>
          </>,
          document.body
        )}
    </span>
  );
}
