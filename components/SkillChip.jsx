'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Inline skill-file chip (how-i-work). Desktop: hover opens a small scrollable
// peek; click opens the full reading modal. Mobile: tap opens a bottom sheet
// that grows with scroll until its top reaches ~35% of the viewport, leaving
// room to tap out. File text is fetched once per session and shared.

const fileCache = new Map();
function loadFile(file) {
  if (!fileCache.has(file)) {
    const p = fetch(`/skills/${file}`).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.text();
    });
    p.catch(() => fileCache.delete(file));
    fileCache.set(file, p);
  }
  return fileCache.get(file);
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M10 12h5M10 16h5" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a1 1 0 0 1 1-1h9" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export default function SkillChip({ name, file, lines }) {
  const [peek, setPeek] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState(null);
  const [failed, setFailed] = useState(false);
  const [place, setPlace] = useState({ up: false, right: false });

  const chipRef = useRef(null);
  const dialogRef = useRef(null);
  const paneRef = useRef(null);
  const peekPaneRef = useRef(null);
  const leaveTimer = useRef(null);
  const copyTimer = useRef(null);

  function ensureText() {
    if (text !== null || failed) return;
    loadFile(file).then(setText).catch(() => setFailed(true));
  }

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
    ensureText();
  }
  function onLeave() {
    leaveTimer.current = setTimeout(() => setPeek(false), 120);
  }

  function openModal() {
    setPeek(false);
    setOpen(true);
    ensureText();
  }

  // Same animated-dismiss pattern as the contact sheet (Header.jsx): mobile
  // plays the slide-down exit before unmounting, desktop closes at once.
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
    setCopied(false);
    chipRef.current?.focus();
  }
  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(finishClose, 350);
    return () => clearTimeout(t);
  }, [closing]);

  // Modal chrome: focus in, Esc closes, Tab cycles the header actions, body
  // scroll locks behind the dialog.
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

  // Fade masks reflect scrollability; classList is toggled directly so scroll
  // frames never re-render React.
  function updateFades(el) {
    if (!el) return;
    el.classList.toggle('ft', el.scrollTop > 4);
    el.classList.toggle('fb', el.scrollHeight - el.clientHeight - el.scrollTop > 4);
  }
  useEffect(() => {
    updateFades(paneRef.current);
    updateFades(peekPaneRef.current);
  }, [text, open, peek]);

  // Mobile: scroll grows the sheet before it scrolls the text. Scroll distance
  // transfers into pane height until the sheet's top hits the 35% line; after
  // that (or once content runs out) the pane scrolls normally.
  function onPaneScroll(e) {
    const el = e.currentTarget;
    const st = el.scrollTop;
    if (st > 0 && dialogRef.current && window.matchMedia('(max-width: 639px)').matches) {
      const top = dialogRef.current.getBoundingClientRect().top;
      const room = top - window.innerHeight * 0.35;
      if (room > 1) {
        const take = Math.min(st, room);
        el.style.maxHeight = el.getBoundingClientRect().height + take + 'px';
        el.scrollTop = st - take;
      }
    }
    updateFades(el);
  }

  function onCopy() {
    if (text === null || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1600);
    });
  }

  const body = failed
    ? 'could not load this file - use download instead'
    : text ?? 'loading…';

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
        <span className="doc" aria-hidden="true"><DocIcon /></span>
        <span className="fname">{name}</span>
        <span className="fmeta">{lines} lines</span>
      </button>

      {peek && !open && (
        <span className={'skillpeek' + (place.up ? ' up' : '') + (place.right ? ' right' : '')}>
          <span className="skillpane" ref={peekPaneRef} onScroll={(e) => updateFades(e.currentTarget)}>
            <span className="mdtext">{body}</span>
          </span>
          <span className="peek-hint">click to read all {lines} lines</span>
        </span>
      )}

      {open &&
        createPortal(
          <>
            <div className={closing ? 'overlay is-closing' : 'overlay'} onClick={requestClose} />
            <div
              className={closing ? 'skillmodal is-closing' : 'skillmodal'}
              role="dialog"
              aria-modal="true"
              aria-label={file}
              ref={dialogRef}
              tabIndex={-1}
              onAnimationEnd={(e) => {
                if (closing && e.target === dialogRef.current) finishClose();
              }}
            >
              <div className="skillmodal-head">
                <span className="doc" aria-hidden="true"><DocIcon /></span>
                <span className="fname">{file}</span>
                <span className="acts">
                  <span className="esc-hint" aria-hidden="true">[ESC] to close</span>
                  <button
                    type="button"
                    className="sq"
                    onClick={onCopy}
                    aria-label={copied ? 'Copied' : `Copy ${file} contents`}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                  <a className="sq" href={`/skills/${file}`} download={file} aria-label={`Download ${file}`}>
                    <DownloadIcon />
                  </a>
                </span>
              </div>
              <div className="skillpane" ref={paneRef} onScroll={onPaneScroll}>
                <span className="mdtext">{body}</span>
              </div>
            </div>
          </>,
          document.body
        )}
    </span>
  );
}
