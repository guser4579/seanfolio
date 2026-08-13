import { getCodePulse } from '../lib/github';

// Slim mono pill above the bio card: live GitHub activity as a count plus a
// 12-week sparkline (latest week in green, matching the footer pulse). Server
// component - data is fetched at render and revalidated hourly, so it stays
// current as code ships with zero client-side work. Renders nothing if the
// fetch fails.

const BAR_W = 3;
const BAR_GAP = 2;
const SPARK_H = 14;

export default async function CodePulse() {
  const pulse = await getCodePulse();
  if (!pulse) return null;

  const max = Math.max(...pulse.weeks, 1);
  const sparkW = pulse.weeks.length * (BAR_W + BAR_GAP) - BAR_GAP;

  return (
    <a
      className="codepulse"
      href="https://github.com/guser4579"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${pulse.total} ${pulse.unit} on GitHub`}
    >
      <span className="dot" aria-hidden="true" />
      <span aria-hidden="true">
        <span className="num">{pulse.total.toLocaleString('en-US')}</span> {pulse.unit}
        {pulse.suffix}
      </span>
      <svg
        className="spark"
        width={sparkW}
        height={SPARK_H}
        viewBox={`0 0 ${sparkW} ${SPARK_H}`}
        aria-hidden="true"
      >
        {pulse.weeks.map((w, i) => {
          const h = Math.max(2, Math.round((w / max) * SPARK_H));
          return (
            <rect
              key={i}
              className={i === pulse.weeks.length - 1 ? 'now' : undefined}
              x={i * (BAR_W + BAR_GAP)}
              y={SPARK_H - h}
              width={BAR_W}
              height={h}
              rx="1"
            />
          );
        })}
      </svg>
      <svg className="gh" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.21.67.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    </a>
  );
}
