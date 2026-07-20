import { WORK } from '../lib/data';
import { Facts } from './Study';
import ShareButton from './ShareButton';

export default function StudyHero({ slug }) {
  const item = WORK.find((w) => w.slug === slug);
  if (!item) return null;
  return (
    <>
      <h1>{item.title}</h1>
      <div className="meta-row">
        <p className="meta-line">{item.meta}</p>
        <ShareButton title={item.title} />
      </div>
      <Facts
        items={[
          ['Company', item.company],
          ['Role', item.role],
          ['Year', item.year],
        ]}
      />
    </>
  );
}
