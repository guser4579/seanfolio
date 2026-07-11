import { EMAIL } from '../lib/data';

export default function Gate({ returnTo, error }) {
  return (
    <main id="main" className="center">
      <form className="gate" method="POST" action="/api/gate">
        <h1>Protected page</h1>
        <p className="lede">
          To access, enter the password below. If you'd like to request access
          to this case study, please send me an email at:{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <input type="hidden" name="returnTo" value={returnTo} />
        <label htmlFor="pw">Password</label>
        <input
          id="pw"
          name="password"
          type="password"
          placeholder="enter password"
          autoComplete="off"
          aria-describedby={error ? 'pw-err' : undefined}
        />
        {error ? (
          <p className="err" id="pw-err" role="alert">
            That password isn't right - check for typos, or email me for
            access.
          </p>
        ) : null}
        <button className="submit" type="submit">
          submit
        </button>
      </form>
    </main>
  );
}
