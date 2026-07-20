import { Fragment } from 'react';
import ShareButton from './ShareButton';

// Dot-separated inline metadata. Empty values are filtered out so a missing
// field never produces a leading, trailing, doubled, or orphaned separator.
// Pass `emphasize` to render each value in the title color/weight (case-study
// primary row); leave it off for muted rows (bylines, read time / date).
export function MetaRow({ className = '', items, emphasize = false }) {
  const parts = items.filter(
    (x) => x !== null && x !== undefined && x !== '' && x !== false
  );
  if (parts.length === 0) return null;
  return (
    <p className={`hero-meta ${className}`.trim()}>
      {parts.map((node, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className="hero-sep" aria-hidden="true">
              •
            </span>
          )}
          {emphasize ? <span className="v">{node}</span> : <span>{node}</span>}
        </Fragment>
      ))}
    </p>
  );
}

// The secondary row shared by every case study and thought piece: read time
// and date on the left, the share action on the right, bracketed by the two
// hero dividers. The share control (behavior, icon, a11y) is reused unchanged.
export function HeroFoot({ readTime, date, title }) {
  return (
    <>
      <hr className="hero-rule" aria-hidden="true" />
      <div className="meta-row">
        <MetaRow
          className="hero-sub"
          items={[readTime ? `${readTime} min` : null, date]}
        />
        <ShareButton title={title} />
      </div>
      <hr className="hero-rule" aria-hidden="true" />
    </>
  );
}
