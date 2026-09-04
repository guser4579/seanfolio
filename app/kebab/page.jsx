import StudyHero from '../../components/StudyHero';
import { Band } from '../../components/Study';
import ScrollProgress from '../../components/ScrollProgress';
import KeblobBackground from '../../components/KeblobBackground';
import { KEBAB_TESTFLIGHT_URL } from '../../lib/data';

export const metadata = {
  title: 'Building kebab, a private feed for the things I would normally text myself',
};

export default function Page() {
  return (
    <>
      <KeblobBackground />
      <main id="main" className="study keb">
        <a
          className="crosslink"
          href={KEBAB_TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bar" aria-hidden="true" />
          <span className="tx">
            <span className="t">Try kebab on TestFlight</span>
            <span className="d">
              The live beta - <span className="go">join with one tap</span>
            </span>
          </span>
          <svg
            className="arr"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>

        <StudyHero slug="kebab" />

        <p>
          kebab is a private place for the things I would normally text
          myself. Entries are as quick to capture as a text, but unlike a
          texting thread with yourself they do not rot in the scrollback: I
          can comment on my own notes, so a restaurant recommendation quietly
          becomes a running review thread and an idea gets argued with three
          weeks later. Notes file into collections, carry their own
          reminders, and resurface on their own schedule, because the whole
          point is that the things you notice should come back to you. I
          designed it, built it in SwiftUI on Supabase, and ship it to
          TestFlight myself. It is also the most honest design work I do,
          because every decision gets tested nightly against the one user I
          cannot hide from - me.
        </p>

        <Band
          label="kebab product screens"
          layout="mask"
          images={[
            {
              src: '/media/kebab/kb1.png',
              w: 1206,
              h: 2622,
              alt: 'welcome screen with the kebab wordmark, demo entry deck, and the keblob field behind',
            },
            {
              src: '/media/kebab/kb2.png',
              w: 1206,
              h: 2622,
              alt: 'the feed with collection tabs, a resurfaced entry badge, a reminder chip, and a link card',
            },
            {
              src: '/media/kebab/kb3.png',
              w: 1206,
              h: 2622,
              alt: 'entry view with a comment hanging off the thread spine',
            },
            {
              src: '/media/kebab/kb4.png',
              w: 1206,
              h: 2622,
              alt: 'comment view three layers deep: entry, comment, and a reply from a month later',
            },
            {
              src: '/media/kebab/kb5.png',
              w: 1206,
              h: 2622,
              alt: 'a collection view scoped to Food spots, with the composer scoped to match',
            },
            {
              src: '/media/kebab/kb6.png',
              w: 1206,
              h: 2622,
              alt: 'search screen with the recent activity log of created, commented, viewed, and resurfaced events',
            },
            {
              src: '/media/kebab/kb7.png',
              w: 1206,
              h: 2622,
              alt: 'search results with the matched term highlighted and collection metadata',
            },
            {
              src: '/media/kebab/kb8.png',
              w: 1206,
              h: 2622,
              alt: 'the remind me sheet: later today, tomorrow, in a week, pick a date, or random',
            },
            {
              src: '/media/kebab/kb9.png',
              w: 1206,
              h: 2622,
              alt: 'entry actions sheet: edit, remind me, add to collection, hide, delete',
            },
          ]}
        />

        <ScrollProgress />
      </main>
    </>
  );
}
