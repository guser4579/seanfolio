'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { EMAIL, LINKEDIN_URL, RESUME_URL } from '../lib/data';

const BACK_ROUTES = ['/design-at-foxen', '/flexible-patterns', '/claims', '/coi', '/movemoney', '/thoughts/'];

// Counts in-app route changes this session. document.referrer never updates
// on client-side navigations, so it cannot tell "arrived from within the
// site" from "landed here directly" - this counter can. More than one
// counted pathname means history holds an in-app page we can safely return
// to; otherwise the back link falls through to a plain navigation home.
let inAppNavs = 0;

export default function Header() {
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
              Feel free to reach out using the options below. Coffee is on me
              if we're ever in the same city.
            </p>

            <div className="rows">
              <div className="row">
                <span className="label">Email</span>
                <a className="value plain" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
              <div className="row">
                <span className="label">LinkedIn</span>
                <a className="value link" href={LINKEDIN_URL}>
                  Visit
                </a>
              </div>
              <div className="row">
                <span className="label">Resume</span>
                <a className="value link" href={RESUME_URL}>
                  Download
                </a>
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
