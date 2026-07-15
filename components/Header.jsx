'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EMAIL, LINKEDIN_URL, RESUME_URL } from '../lib/data';

const BACK_ROUTES = ['/flexible-patterns', '/change', '/claims', '/coi', '/thoughts/'];

export default function Header() {
  const pathname = usePathname() || '/';
  const isBack = BACK_ROUTES.some((p) =>
    p.endsWith('/') ? pathname.startsWith(p) : pathname === p
  );

  const [open, setOpen] = useState(false);

  function toggleTheme() {
    const el = document.documentElement;
    const next = el.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    el.setAttribute('data-theme', next);
    try { localStorage.setItem('folio-theme', next); } catch (e) {}
  }
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
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
                <Link href="/">back</Link>
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
                <Link
                  className={pathname === '/thoughts' ? 'current' : undefined}
                  aria-current={pathname === '/thoughts' ? 'page' : undefined}
                  href="/thoughts"
                >
                  thoughts
                </Link>
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
                <path d="M20.5 14.2A8 8 0 1 1 9.8 3.5a6.4 6.4 0 0 0 10.7 10.7z" />
              </svg>
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div className="overlay" onClick={() => setOpen(false)} />
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            ref={modalRef}
          >
            <h2 id="contact-title">Contact</h2>
            <p className="intro">
              Feel free to reach out using the options below. If you're in
              Columbus, let's chat over some coffee!
            </p>

            <div className="rows">
              <div className="row">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span className="label">Email</span>
                <a className="value plain" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
              <div className="row">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="3.5" />
                  <path d="M8 11v5" />
                  <circle cx="8" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
                  <path d="M12 16v-3a2 2 0 0 1 4 0v3" />
                  <path d="M12 11v1" />
                </svg>
                <span className="label">LinkedIn</span>
                <a className="value link" href={LINKEDIN_URL}>
                  Visit
                </a>
              </div>
              <div className="row">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M7 3h7l4 4v14H7z" />
                  <path d="M14 3v4h4" />
                  <path d="M10 12h5M10 16h5" />
                </svg>
                <span className="label">Resume</span>
                <a className="value link" href={RESUME_URL}>
                  Download
                </a>
              </div>
              <div className="row">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.7 2.6 4 5.8 4 9s-1.3 6.4-4 9c-2.7-2.6-4-5.8-4-9s1.3-6.4 4-9z" />
                </svg>
                <span className="label">Location</span>
                <span className="value">Columbus, OH</span>
              </div>
            </div>

            <button
              className="close-btn"
              ref={closeRef}
              onClick={() => setOpen(false)}
            >
              close
            </button>
          </div>
        </>
      )}
    </>
  );
}
