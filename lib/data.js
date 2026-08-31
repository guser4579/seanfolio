export const RESUME_URL = '/SeanForquer_Resume.pdf';
// Temporarily hides every resume link in the UI (contact modal + footer).
// The PDF stays served at RESUME_URL and the markup stays in place - flip
// this back to true to restore the links.
export const SHOW_RESUME = false;

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
      "An overview of how I act as Foxen's company-wide IC designer, and run design as its own independent function.",
    meta: 'How I Work • 2026',
    lede:
      "An overview of how I act as Foxen's company-wide IC designer, and run design as its own independent function.",
    // no company/role: this piece is the "how I work" overview, not a case
    // study, so its hero intentionally shows no primary meta row. MetaRow
    // renders nothing when every value is empty.
    year: '2026',
    readTime: 7,
    gated: true,
  },
  {
    slug: 'flexible-patterns',
    title: 'Flexible design patterns are the best tool for an uncertain future',
    blurb:
      "The atomic choices of the PetClear product's design made way for screening to gracefully scale beyond pet policy compliance.",
    meta: '$4M+ first-year bookings • Case Study • 2026',
    outcome: '$4M+ first-year bookings',
    lede:
      "The atomic choices of the PetClear product's design made way for screening to gracefully scale beyond pet policy compliance.",
    company: 'Foxen',
    role: 'Product Designer',
    year: '2025 - 2026',
    readTime: 4,
    gated: true,
  },
  {
    slug: 'claims',
    title: 'Creating a claims process that prevents errors and increases confidence',
    blurb:
      "Redesigning the property manager's claim submission and tracking experience to address the most expensive sources of waste.",
    meta: '$650k/yr in savings • Case Study • 2025',
    outcome: '$650k/yr in savings',
    lede:
      "Redesigning the property manager's claim submission and tracking experience to address the most expensive sources of waste.",
    company: 'Foxen',
    role: 'Product Designer',
    year: '2025',
    readTime: 3,
    gated: true,
  },
  {
    slug: 'coi',
    title: "Leaning into a user's natural behavior is far easier than trying to change it",
    blurb:
      "Designing a document analysis process for people who don't read.",
    meta: '$500k/yr in savings • Case Study • 2025',
    outcome: '$500k/yr in savings',
    lede: "Designing a document analysis process for people who don't read.",
    company: 'Foxen',
    role: 'Product Designer',
    year: '2025',
    readTime: 2,
    gated: true,
  },
  {
    slug: 'movemoney',
    title: 'Designing an international “Venmo” on Solana rails',
    blurb:
      'Designing a new money deposit and money transmission experience for the US/Mexican remittance corridor.',
    meta: 'Case Study • 2023 - 2024',
    lede:
      'Designing a new money deposit and money transmission experience for the US/Mexican remittance corridor.',
    company: 'CoinFX (MoveMoney)',
    role: 'Product Designer',
    year: '2023 - 2024',
    readTime: 5,
    gated: false,
  },
];

export const THOUGHTS = [
  {
    slug: 'design-ethos',
    title: 'Design ethos',
    blurb:
      'Some of the driving principles I use to make design and product decisions.',
    topic: 'list',
    // fallback only: the rendered date is git-derived at request time from
    // gitDated (see lib/github.js thoughtDate), so this list never lies
    date: 'last updated august 2026',
    gitDated: 'app/thoughts/design-ethos/page.jsx',
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
    featured: 'my favorite',
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
  { co: 'Foxen', role: 'Head of Product Design', meta: 'March 2024 - Present • Full Time', logo: '/media/logos/foxen.png' },
  { co: 'Gozio', role: 'Sr. Product Designer', meta: 'November 2022 - February 2024 • Full Time', logo: '/media/logos/gozio.png' },
  { co: 'CoinFX (MoveMoney)', role: 'Product Designer', meta: 'October 2023 - February 2024 • Contract', logo: '/media/logos/coinfx.png' },
  { co: 'Fifth Third Bank', role: 'Sr. Product Designer', meta: 'March 2022 - November 2022 • Contract', logo: '/media/logos/fifththird.png' },
  { co: 'DMI, Inc.', role: 'UX Designer', meta: 'March 2021 - March 2022 • Full Time', logo: '/media/logos/dmi.png' },
  { co: 'Uptick', role: 'Product Design Lead', meta: 'October 2020 - April 2022 • Crypto', logo: '/media/logos/uptick.png' },
  { co: 'Nationwide Insurance', role: 'UX Designer/Quality Engineer', meta: 'March 2019 - March 2021 • Full Time', logo: '/media/logos/nationwide.png' },
  { co: 'Hyland Software', role: 'Enterprise Design Consultant', meta: 'June 2016 - March 2018 • Full Time', logo: '/media/logos/hyland.png' },
];
