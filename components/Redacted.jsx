// Masks a dollar figure for visitors who have not unlocked the case studies.
// The "$" and the descriptive words stay, so the line still reads as a
// financial outcome; only the digits become a fixed-width dashed blank -
// dashed meaning "withheld", the same sense the study figures give it. The
// blank is a constant width so it never leaks the amount's magnitude.
export default function Redacted({ text }) {
  const m = text.match(/\$[\d.,]+\s*[kKmMbB]?\+?/);
  if (!m) return text;
  return (
    <>
      {text.slice(0, m.index)}
      <span className="redact" title="Amount hidden - unlock to view">
        <span aria-hidden="true">$</span>
        <span className="bar" aria-hidden="true" />
        <span className="sr-only">dollar amount hidden</span>
      </span>
      {text.slice(m.index + m[0].length)}
    </>
  );
}
