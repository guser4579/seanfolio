import { EMAIL, LINKEDIN_URL, RESUME_URL } from '../lib/data';

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-inner">
        <span className="status">
          <span className="pulse" aria-hidden="true" />
          active
        </span>
        <nav className="links" aria-label="Contact">
          <a href={`mailto:${EMAIL}`}>email</a>
          <a href={LINKEDIN_URL}>linkedin</a>
          <a href={RESUME_URL}>resume</a>
        </nav>
      </div>
    </footer>
  );
}
