// Live GitHub activity for the homepage code-pulse pill and the footer
// heartbeat. Server-side only, cached via Next fetch revalidation (1h), so
// the numbers refresh as Sean pushes without any client-side fetching.
//
// Two data paths:
// - GITHUB_TOKEN set (Vercel env): GraphQL contributionsCollection - exact
//   commit counts and daily totals.
// - No token: parse the public contributions calendar page. Day cells only
//   expose a quantized 0-4 "level", which is plenty for a sparkline's shape;
//   the yearly total is read from the calendar heading.

const USER = 'guser4579';
const REVALIDATE = 3600;

// last 12 weeks of activity, one number per week, oldest first
function weeklyBuckets(days) {
  const recent = days.slice(-84);
  const weeks = [];
  for (let i = 0; i < recent.length; i += 7) {
    weeks.push(recent.slice(i, i + 7).reduce((sum, d) => sum + d.count, 0));
  }
  return weeks;
}

async function gql(token, query) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(String(res.status));
  const json = await res.json();
  if (json.errors || !json.data) throw new Error('graphql error');
  return json.data;
}

// all-time commit count: contributionsCollection is windowed to one year,
// so sum a per-year alias query from account creation to now (two requests
// total, both cached for an hour)
async function fromGraphql(token) {
  const meta = await gql(
    token,
    `{ user(login: "${USER}") {
        createdAt
        contributionsCollection {
          contributionCalendar { weeks { contributionDays { date contributionCount } } }
        }
      } }`
  );
  const firstYear = new Date(meta.user.createdAt).getUTCFullYear();
  const thisYear = new Date().getUTCFullYear();
  const aliases = [];
  for (let y = firstYear; y <= thisYear; y++) {
    aliases.push(
      `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y + 1}-01-01T00:00:00Z") { totalCommitContributions }`
    );
  }
  const totals = await gql(token, `{ user(login: "${USER}") { ${aliases.join(' ')} } }`);
  const total = Object.values(totals.user).reduce(
    (sum, v) => sum + (v?.totalCommitContributions || 0),
    0
  );

  const days = meta.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .map((d) => ({ count: d.contributionCount }));
  return {
    total,
    unit: 'commits',
    suffix: '', // all-time: the number stands alone
    weeks: weeklyBuckets(days),
  };
}

async function fromPublicCalendar() {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { 'User-Agent': 'seanforquer.com code pulse' },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(String(res.status));
  const html = await res.text();

  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
  const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : null;

  const days = [];
  const cell = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
  let m;
  while ((m = cell.exec(html)) !== null) {
    days.push({ date: m[1], level: parseInt(m[2], 10) });
  }
  if (total === null || days.length === 0) throw new Error('calendar parse failed');
  days.sort((a, b) => (a.date < b.date ? -1 : 1));
  return {
    total,
    unit: 'contributions',
    suffix: ' · past year', // public calendar can only see a year window
    weeks: weeklyBuckets(days.map((d) => ({ count: d.level }))),
  };
}

export async function getCodePulse() {
  try {
    return process.env.GITHUB_TOKEN
      ? await fromGraphql(process.env.GITHUB_TOKEN)
      : await fromPublicCalendar();
  } catch (e) {
    return null; // the pill simply doesn't render
  }
}

// most recent public push across all repos, as an ISO timestamp
export async function getLastPush() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?sort=pushed&per_page=1`,
      {
        headers: { 'User-Agent': 'seanforquer.com code pulse' },
        next: { revalidate: REVALIDATE },
      }
    );
    if (!res.ok) throw new Error(String(res.status));
    const repos = await res.json();
    return repos?.[0]?.pushed_at || null;
  } catch (e) {
    return null;
  }
}

// coarse relative time (1h ago / 1d ago / 1w ago); the page revalidates
// hourly so minute precision would be false precision anyway
export function agoLabel(iso) {
  if (!iso) return null;
  const h = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 3600000));
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  const w = Math.floor(d / 7);
  if (w < 5) return `${w}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}
