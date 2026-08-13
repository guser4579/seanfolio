import Link from 'next/link';
import { THOUGHTS } from '../../lib/data';
import { thoughtDate } from '../../lib/github';

export const metadata = { title: 'thoughts' };

export default async function Thoughts() {
  const thoughtDates = Object.fromEntries(
    await Promise.all(THOUGHTS.map(async (t) => [t.slug, await thoughtDate(t)]))
  );
  return (
    <main id="main" className="col">
      <section className="sect" aria-labelledby="thoughts-h">
        <h1 className="head" id="thoughts-h">
          <span className="accent teal" aria-hidden="true" />
          thoughts
        </h1>
        <ul className="list">
          {THOUGHTS.map((t) => (
            <li key={t.slug}>
              <Link className="item" href={`/thoughts/${t.slug}`}>
                <span className="t">{t.title}</span>
                <p className="g-meta">
                  <span>{t.topic}</span>
                  <span aria-hidden="true">•</span>
                  <span>{thoughtDates[t.slug]}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
