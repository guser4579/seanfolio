import ThoughtHero from '../../../components/ThoughtHero';
import ScrollProgress from '../../../components/ScrollProgress';

export const metadata = { title: 'Design ethos' };

export default function Page() {
  return (
    <main id="main" className="col piece">
      <ThoughtHero slug="design-ethos" />

      <h2>Design ethos</h2>
      <p>
        Below are some of the philosophies and guiding principles about design
        and product that I have picked up throughout my career. Some are mine,
        and some are borrowed interpretations of the many before me.
      </p>
      <ul>
        <li>
          Design is the understanding of a problem and the context in which it
          lives, expressed through an interface. A design's goodness is, then,
          dependent on the depth of understanding.
        </li>
        <li>
          The best designs are the ones that meet the level of user
          accommodation the context in which they live requires.
        </li>
        <li>Products are discovered as they are built.</li>
        <li>Trust is a function of expectation management.</li>
        <li>
          Markets are extraordinarily efficient at finding truth. The market
          for experience is no different.
        </li>
        <li>
          The medium determines the attention and level of focus a user will
          bring to something. You can read on Twitter and in a book, but the
          attention type that is brought varies greatly.
        </li>
        <li>
          Leaning into a user's inclination is always easier than trying to
          change it.
        </li>
        <li>Decisions move at the speed of information.</li>
        <li>
          A vendor's ability to dictate pricing terms is a function of the
          vendor's percent share of the market.
        </li>
        <li>The world is in a constant push toward homogeny.</li>
        <li>SpongeBob is a trend line of culture.</li>
      </ul>

      <ScrollProgress />
    </main>
  );
}
