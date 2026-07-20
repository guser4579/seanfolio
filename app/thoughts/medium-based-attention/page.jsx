import ShareButton from '../../../components/ShareButton';

export const metadata = { title: 'Medium-based attention' };

export default function Page() {
  return (
    <main id="main" className="col piece">
      <h1>Medium-based attention</h1>
      <div className="meta-row">
        <p className="meta-line">
          <span>
            <span className="dot new" aria-hidden="true" />
            raw note
          </span>
          <span aria-hidden="true">•</span>
          <span>july 2026</span>
        </p>
        <ShareButton title="Medium-based attention" />
      </div>

      <p>
        The medium determines the attention and focus we can bring to something
        - phones, vs. analog books, vs. computer, vs. tablet, vs. game console.
      </p>
      <p>
        Attention is a teachable skill that can be cultivated, just as
        distraction can too be.
      </p>
    </main>
  );
}
