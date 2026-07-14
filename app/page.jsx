import Link from 'next/link';
import { WORK, THOUGHTS, JOBS } from '../lib/data';

export default function Home() {
  return (
    <main id="main" className="col">
      <section className="sect">
        <div className="card">
          <h1 className="head">
            <span className="accent red" aria-hidden="true" />
            hi, i'm sean
          </h1>
          <p>
            I believe the best designs are the ones that meet the level of user
            accommodation the context in which they live requires. I like to
            approach my work with this in mind so design is a means to an end
            and not the end itself.
          </p>
          <div className="interests">
            <div className="lab">interests</div>
            <div className="chips">
              <span className="chip">⛷️ skiing</span>
              <span className="chip">🤿 snorkeling</span>
              <span className="chip">🏃 running</span>
              <span className="chip">📕 reading</span>
              <span className="chip">✏️ writing</span>
              <span className="chip">👾 halo 3</span>
            </div>
          </div>
        </div>
      </section>

      <section className="sect" aria-labelledby="work-h">
        <h2 className="head" id="work-h">
          <span className="accent blue" aria-hidden="true" />
          my work
        </h2>
        <ul className="list">
          {WORK.map((w) => (
            <li key={w.slug}>
              <Link className="item" href={`/${w.slug}`}>
                <span className="t">{w.title}</span>
                <p className="blurb">{w.blurb}</p>
                <p className="meta">{w.meta}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sect" aria-labelledby="thoughts-h">
        <h2 className="head" id="thoughts-h">
          <span className="accent teal" aria-hidden="true" />
          thoughts
        </h2>
        <ul className="list">
          {THOUGHTS.map((t) => (
            <li key={t.slug}>
              <Link className="item" href={`/thoughts/${t.slug}`}>
                <span className="t">{t.title}</span>
                <p className="g-meta">
                  <span>
                    <span className={`dot ${t.maturity}`} aria-hidden="true" />
                    {t.provenance}
                  </span>
                  <span aria-hidden="true">•</span>
                  <span>{t.date}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <hr className="divider" aria-hidden="true" />

      <section className="sect" aria-labelledby="jobs-h">
        <h2 className="head" id="jobs-h">
          <span className="accent gray" aria-hidden="true" />
          work history
        </h2>
        <ul className="list">
          {JOBS.map((j) => (
            <li className="job" key={j.co}>
              <span className="t">{j.co}</span>
              <span className="role">, {j.role}</span>
              <p className="meta">{j.meta}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
