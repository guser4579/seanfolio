import Link from 'next/link';
import { THOUGHTS } from '../../lib/data';

export const metadata = { title: 'thoughts' };

export default function Thoughts() {
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
                  <span>{t.date}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
