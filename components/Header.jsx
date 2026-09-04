'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { EMAIL, LINKEDIN_URL, RESUME_URL, SHOW_RESUME } from '../lib/data';

const BACK_ROUTES = ['/design-at-foxen', '/flexible-patterns', '/claims', '/coi', '/movemoney', '/kebab', '/thoughts/'];

// Counts in-app route changes this session. document.referrer never updates
// on client-side navigations, so it cannot tell "arrived from within the
// site" from "landed here directly" - this counter can. More than one
// counted pathname means history holds an in-app page we can safely return
// to; otherwise the back link falls through to a plain navigation home.
let inAppNavs = 0;

export default function Header({ resumeUpdated }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const isBack = BACK_ROUTES.some((p) =>
    p.endsWith('/') ? pathname.startsWith(p) : pathname === p
  );

  useEffect(() => {
    inAppNavs += 1;
  }, [pathname]);

  // Real history back (restores the previous page AND its scroll position)
  // when the visitor arrived from within the site; direct/external entries
  // fall through to the plain link and land on home.
  function onBack(e) {
    if (inAppNavs > 1) {
      e.preventDefault();
      router.back();
    }
  }

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const emailTimer = useRef(null);

  function copyEmail() {
    const done = () => {
      setEmailCopied(true);
      clearTimeout(emailTimer.current);
      emailTimer.current = setTimeout(() => setEmailCopied(false), 1400);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      ta.remove();
    }
  }

  // On mobile the sheet plays a slide-down animation before unmounting
  // (.is-closing in globals.css); desktop and reduced-motion close at once.
  function requestClose() {
    const animated =
      window.matchMedia('(max-width: 639px)').matches &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (animated) setClosing(true);
    else setOpen(false);
  }

  function finishClose() {
    setOpen(false);
    setClosing(false);
  }

  // Fallback in case animationend never fires (e.g. viewport crossed the
  // 639px breakpoint mid-close, so no exit animation is running).
  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(finishClose, 350);
    return () => clearTimeout(t);
  }, [closing]);

  function toggleTheme() {
    const el = document.documentElement;
    const next = el.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const apply = () => {
      el.setAttribute('data-theme', next);
      try { localStorage.setItem('folio-theme', next); } catch (e) {}
    };
    // Cross-fade the whole page via the View Transitions API; .vt-theme
    // suppresses the body's own bg transition so the fade isn't doubled.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !document.startViewTransition) {
      apply();
      return;
    }
    el.classList.add('vt-theme');
    const t = document.startViewTransition(apply);
    t.finished.finally(() => el.classList.remove('vt-theme'));
  }
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKey(e) {
      if (e.key === 'Escape') requestClose();
      if (e.key === 'Tab' && modalRef.current) {
        const f = modalRef.current.querySelectorAll('a, button');
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
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="site">
        <div className="bar">
          <div className="bar-inner">
            <Link className="wordmark" href="/">
              sean forquer
            </Link>
          </div>
        </div>
        <div className="bar">
          <div className="bar-inner">
            {isBack ? (
              <nav className="sub" aria-label="Breadcrumb">
                <Link href="/" onClick={onBack}>
                  back
                </Link>
              </nav>
            ) : (
              <nav className="sub" aria-label="Primary">
                <Link
                  className={pathname === '/' ? 'current' : undefined}
                  aria-current={pathname === '/' ? 'page' : undefined}
                  href="/"
                >
                  my work
                </Link>
                {/* thoughts hidden for now - restore by uncommenting
                <Link
                  className={pathname === '/thoughts' ? 'current' : undefined}
                  aria-current={pathname === '/thoughts' ? 'page' : undefined}
                  href="/thoughts"
                >
                  thoughts
                </Link>
                */}
                <button
                  ref={triggerRef}
                  aria-haspopup="dialog"
                  onClick={() => setOpen(true)}
                >
                  contact
                </button>
              </nav>
            )}
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle light and dark theme"
            >
              <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            className={closing ? 'overlay is-closing' : 'overlay'}
            onClick={requestClose}
          />
          <div
            className={closing ? 'modal is-closing' : 'modal'}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            ref={modalRef}
            onAnimationEnd={(e) => {
              if (closing && e.target === modalRef.current) finishClose();
            }}
          >
            <div className="modal-head">
              <span className="t" id="contact-title">Contact</span>
              <span className="acts">
                <span className="esc-hint" aria-hidden="true">[ESC] to close</span>
                <button
                  type="button"
                  className="sq"
                  ref={closeRef}
                  onClick={requestClose}
                  aria-label="Close contact dialog"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 6 12 12" />
                    <path d="M18 6 6 18" />
                  </svg>
                </button>
              </span>
            </div>
            <div className="modal-body">
              <p className="intro">
                Feel free to reach out using the options below. Coffee is on me
                if we're ever in the same city.
              </p>

              <div className="rows">
              <div className="row">
                <span className="label">Email</span>
                <button
                  type="button"
                  className="value plain"
                  onClick={copyEmail}
                  aria-label={emailCopied ? 'Email copied' : `Copy email address ${EMAIL}`}
                >
                  <span
                    key={emailCopied ? 'ok' : 'em'}
                    className={emailCopied ? 'swaptext ok' : 'swaptext'}
                  >
                    {emailCopied ? 'copied' : EMAIL}
                  </span>
                </button>
              </div>
              <div className="row">
                <span className="label">LinkedIn</span>
                <a className="value link" href={LINKEDIN_URL}>
                  Visit
                </a>
              </div>
              {SHOW_RESUME ? (
                <div className="row">
                  <span className="label">
                    Resume
                    {resumeUpdated ? (
                      <span className="sub">updated {resumeUpdated}</span>
                    ) : null}
                  </span>
                  <a className="value link" href={RESUME_URL}>
                    Download
                  </a>
                </div>
              ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
