export const RESUME_URL = '/SeanForquer_Resume.pdf';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/seanforquer/';
export const X_URL = 'https://x.com/seanforquer';
export const EMAIL = 'seanmforquer@gmail.com';

// readTime is a static value in whole minutes (200 wpm, rounded up, min 1),
// counted over headings + body prose only. Recompute it by hand if the copy
// of a piece changes materially; nothing computes it at build or runtime.
// outcome is the leading token of `meta` (kept explicit so the hero degrades
// cleanly if a study ever has no outcome).
export const WORK = [
  {
    slug: 'design-at-foxen',
    title: 'How I run design at Foxen',
    blurb:
      'One designer, four teams, and the infrastructure that makes the ratio sustainable.',
    meta: 'How I Work • 2026',
    lede:
      "A quick overview of how I act as Foxen's single IC designer for all teams, while running design as its own independent function.",
    company: 'Foxen',
    role: 'Lead Product Designer',
    year: '2026',
    readTime: 7,
    gated: false,
  },
  {
    slug: 'flexible-patterns',
    title: 'Flexible design patterns are the best tool for an uncertain future',
    blurb:
      'PetClear, from market selection to the pattern decisions that let one product quietly become a screening platform.',
    meta: '$4M+ first-year bookings • Case Study • 2026',
    outcome: '$4M+ first-year bookings',
    company: 'Foxen',
    role: 'Lead Product Designer',
    year: '2025 - 2026',
    readTime: 4,
    gated: true,
  },
  {
    slug: 'claims',
    title: 'Creating a claims process that prevents errors and increases confidence',
    blurb:
      'Redesigning the property-manager claims experience around where time and money actually leaked.',
    meta: '$650k/yr in savings • Case Study • 2025',
    outcome: '$650k/yr in savings',
    company: 'Foxen',
    role: 'Lead Product Designer',
    year: '2025',
    readTime: 3,
    gated: true,
  },
  {
    slug: 'coi',
    title: "Leaning into a user's natural behavior is far easier than trying to change it",
    blurb:
      'People don’t read - so the upload flow stopped asking them to, and started answering them instead.',
    meta: '$500k/yr in savings • Case Study • 2025',
    outcome: '$500k/yr in savings',
    company: 'Foxen',
    role: 'Lead Product Designer',
    year: '2025',
    readTime: 2,
    gated: true,
  },
];

export const THOUGHTS = [
  {
    slug: 'design-ethos',
    title: 'Design ethos',
    blurb:
      'Some of the driving principles I use to make design and product decisions.',
    topic: 'list',
    date: 'last updated august 2026',
    readTime: 1,
  },
  {
    slug: 'medium-based-attention',
    title: 'Medium-based attention',
    topic: 'note',
    date: 'april 2026',
    readTime: 1,
  },
  {
    slug: 'fluency-in-oneself',
    title: "I stopped searching for life's answers and accidentally found them all",
    topic: 'self discovery',
    date: 'november 2025',
    readTime: 6,
  },
  {
    slug: 'post-literacy',
    title: 'On a post-literate society',
    topic: 'conversation summary',
    date: 'october 2025',
    readTime: 5,
    source: {
      title: 'The Dawn of the Post-Literate Society',
      author: 'James Marriott',
      url: 'https://jmarriott.substack.com/p/the-dawn-of-the-post-literate-society-aa1',
    },
  },
];

export const JOBS = [
  { co: 'Foxen', role: 'Lead Product Designer', meta: 'March 2024 - Present • Full Time' },
  { co: 'Gozio', role: 'Sr. Product Designer', meta: 'November 2022 - February 2024 • Full Time' },
  { co: 'Fifth Third Bank', role: 'Sr. Product Designer', meta: 'March 2022 - November 2022 • Contract' },
  { co: 'DMI, Inc.', role: 'UX Designer', meta: 'March 2021 - March 2022 • Full Time' },
  { co: 'Nationwide Insurance', role: 'UX Designer/Quality Engineer', meta: 'March 2019 - March 2021 • Full Time' },
  { co: 'Hyland Software', role: 'Enterprise Design Consultant', meta: 'June 2016 - March 2018 • Full Time' },
];
