import Link from 'next/link';
import CodePulse from '../components/CodePulse';
import InfoChip from '../components/InfoChip';
import { WORK, THOUGHTS, JOBS } from '../lib/data';
import { thoughtDate } from '../lib/github';

const FOXEN_ABOUT =
  'Foxen is a proptech company that builds software and ' +
  'financial products for the multifamily housing industry. Its platform ' +
  'helps property owners and operators reduce risk, improve compliance, and ' +
  'generate additional revenue through products for renters insurance ' +
  'compliance, rent reporting and credit building, and pet management. ' +
  'Founded in 2018, Foxen primarily serves large property management ' +
  'companies and real estate owners while also building resident-facing ' +
  'experiences used by their tenants.';

export default async function Home() {
  const thoughtDates = Object.fromEntries(
    await Promise.all(THOUGHTS.map(async (t) => [t.slug, await thoughtDate(t)]))
  );
  return (
    <main id="main" className="col">
      <section className="sect">
        <CodePulse />
        <div className="card">
          <h1 className="head">
            <span className="accent red" aria-hidden="true" />
            hi, i'm sean
          </h1>
          <p>
            I am currently a design department of one at a compliance tech
            company called{' '}
            <InfoChip
              label="Foxen"
              text={FOXEN_ABOUT}
              href="https://www.foxen.com"
              hrefLabel="Visit foxen.com"
            />
            . Here, I am focused on balancing the IC design needs of the
            product teams I serve and establishing the systems and strategy
            that make that possible.
          </p>
          <p>
            I love design and I love product. They've been some of my best
            teachers about the world, the people in it, and the technology
            that changes both.
          </p>
          <div className="interests">
            <div className="lab">interests</div>
            <div className="chips">
              <span className="chip">⛷️ skiing</span>
              <span className="chip">🤿 snorkeling</span>
              <span className="chip">🏃 running</span>
              <span className="chip">📕 reading</span>
              <span className="chip">✏️ writing</span>
              <span className="chip">📈 markets</span>
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
            <li key={t.slug} className={t.featured ? 'feat' : undefined}>
              <Link className="item" href={`/thoughts/${t.slug}`}>
                {t.featured ? <span className="bar" aria-hidden="true" /> : null}
                <span className="t">{t.title}</span>
                {t.blurb ? <p className="blurb">{t.blurb}</p> : null}
                <p className="g-meta">
                  {t.featured ? (
                    <>
                      <span className="rec">{t.featured}</span>
                      <span aria-hidden="true">•</span>
                    </>
                  ) : null}
                  <span>{t.topic}</span>
                  <span aria-hidden="true">•</span>
                  <span>{thoughtDates[t.slug]}</span>
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
              <span className="joblogo" aria-hidden="true">
                {j.logo ? (
                  <img src={j.logo} alt="" width="240" height="240" />
                ) : (
                  <span className="mark">{j.co[0]}</span>
                )}
              </span>
              <div className="jobtx">
                <span className="t">{j.co}</span>
                <span className="role">, {j.role}</span>
                <p className="meta">{j.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
