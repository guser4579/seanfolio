import { THOUGHTS } from '../lib/data';
import { HeroFoot, SourceRow } from './Hero';

// Thought pieces carry their own lede (page-specific prose), so it is passed
// in; everything else comes from THOUGHTS by slug so the hero, homepage, and
// thoughts index stay in sync. The primary row is the piece's topic; date and
// read time live in the secondary row; pieces that summarize a source close
// the hero with an academic citation row.
export default function ThoughtHero({ slug, lede }) {
  const item = THOUGHTS.find((t) => t.slug === slug);
  if (!item) return null;
  return (
    <div className="article-hero">
      <h1>{item.title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      <p className="hero-meta hero-byline">
        <span>{item.topic}</span>
      </p>
      <HeroFoot readTime={item.readTime} date={item.date} title={item.title} />
      <SourceRow source={item.source} />
    </div>
  );
}
