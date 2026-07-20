import { WORK } from '../lib/data';
import { MetaRow, HeroFoot } from './Hero';

export default function StudyHero({ slug }) {
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return null;
  return (
    <div className="article-hero">
      <h1>{item.title}</h1>
      <MetaRow
        className="hero-primary"
        emphasize
        items={[item.outcome, item.role, item.company]}
      />
      <HeroFoot readTime={item.readTime} date={item.year} title={item.title} />
    </div>
  );
}
