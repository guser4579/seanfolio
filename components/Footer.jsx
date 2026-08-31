import { EMAIL, LINKEDIN_URL, RESUME_URL, SHOW_RESUME, X_URL } from '../lib/data';
import { getLastPush, getRepoVersion, agoLabel } from '../lib/github';

export default async function Footer() {
  const [pushIso, version] = await Promise.all([getLastPush(), getRepoVersion()]);
  const ago = agoLabel(pushIso);
  return (
    <footer className="site-foot">
      <div className="foot-inner">
        <span className="status">
          <span className="pulse" aria-hidden="true" />
          active{ago ? ` • ${ago}` : ''}
        </span>
        <span className="foot-right">
          <nav className="links" aria-label="Contact">
            <a href={`mailto:${EMAIL}`}>email</a>
            <a href={LINKEDIN_URL}>linkedin</a>
            <a href={X_URL}>x</a>
            {SHOW_RESUME ? <a href={RESUME_URL}>resume</a> : null}
          </nav>
          {version ? (
            <>
              <span className="vsep" aria-hidden="true">
                •
              </span>
              <span className="ver" aria-label={`site version ${version}`}>
                v{version}
              </span>
            </>
          ) : null}
        </span>
      </div>
    </footer>
  );
}
