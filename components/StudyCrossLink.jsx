import Link from 'next/link';

// Accent-bar cross-link card: points the Foxen case studies at the
// operating doc (/design-at-foxen). Surface is the hero-card vocabulary
// at the article-component radius (12px), with the homepage
// section-accent bar in "my work" blue. The whole card is the link.
export default function StudyCrossLink() {
  return (
    <Link className="crosslink" href="/design-at-foxen">
      <span className="bar" aria-hidden="true" />
      <span className="tx">
        <span className="t">Zoom out</span>
        <span className="d">
          See how this project fits into{' '}
          <span className="go">how I run design at Foxen</span>
        </span>
      </span>
      <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}
