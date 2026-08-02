// Downloadable skill-file card (how-i-work). Title/meta mirror the home
// list's .item typography; the download action reuses the btn tokens so it
// adapts to both themes. Files are static assets in /public/skills.
export default function SkillFile({ name, file }) {
  return (
    <div className="skillfile">
      <span className="doc" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <path d="M10 12h5M10 16h5" />
        </svg>
      </span>
      <div className="info">
        <span className="t">{name}</span>
        <div className="meta">Skill file • MD • genericized</div>
      </div>
      <a className="skillfile-dl" href={`/skills/${file}`} download={file} aria-label={`Download ${name}`}>
        <span className="main">download</span>
        <span className="chev" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </a>
    </div>
  );
}
