import { EMAIL } from '../lib/data';

export default function Gate({ returnTo, error }) {
  return (
    <main id="main" className="center">
      <form className="gate" method="POST" action="/api/gate">
        <div className="gate-head">
          <span className="lock" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
          <h1>Protected page</h1>
        </div>
        <div className="gate-body">
          <p className="lede">
            To access, enter the password below. If you'd like to request access
            to this case study, please send me an email at:{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
          <input type="hidden" name="returnTo" value={returnTo} />
          <label htmlFor="pw">Password</label>
          <div className="pw-row">
            <input
              id="pw"
              name="password"
              type="password"
              placeholder="enter password"
              autoComplete="off"
              aria-describedby={error ? 'pw-err' : undefined}
            />
            <button className="pw-submit" type="submit" aria-label="Unlock case study">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 12h15" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </button>
          </div>
          {error ? (
            <p className="err" id="pw-err" role="alert">
              That password isn't right - check for typos, or email me for
              access.
            </p>
          ) : null}
        </div>
      </form>
    </main>
  );
}
