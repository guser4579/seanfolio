import Gate from '../../components/Gate';
import { gateOpen } from '../../lib/gate';
import { Fig, Band } from '../../components/Study';
import StudyHero from '../../components/StudyHero';

export const metadata = {
  title: "Leaning into a user's natural behavior is far easier than trying to change it",
  robots: { index: false },
};

export default async function Page({ searchParams }) {
  const open = await gateOpen();
  const sp = await searchParams;
  if (!open) return <Gate returnTo="/coi" error={sp?.gate_error} />;

  return (
    <main id="main" className="study">
      <StudyHero slug="coi" />

      <Fig
        src="/media/coi/process.gif"
        alt="animated loop of the new upload experience: a document is attached, analyzed in seconds, and answered with personalized feedback"
      />

      <h2>Overview</h2>
      <p>
        Foxen ensures renters insurance requirements outlined in a resident's
        apartment lease document are met.
      </p>
      <p>Foxen promises 100% compliance to its customers.</p>
      <p>
        To make good on this promise, Foxen auto-enrolls residents into a
        program that automatically meets the requirements of the lease - a
        renters insurance alternative. For residents that want a traditional
        renters insurance policy, Foxen requires residents to upload their
        renters insurance documents to its system so the documents can be
        analyzed.
      </p>

      <h2>Problem</h2>
      <p>
        Foxen's initial document processing solution required users to
        understand the specifics of their lease requirements, as well as the
        specifics of their document proving they and their unit are insured.
        Understanding both requires reading.
      </p>
      <p>We found people don't read.</p>

      <Fig
        src="/media/coi/attention-heatmap.png"
        alt="attention heatmap: gaze concentrates almost entirely on the upload control while the requirements text above goes unread"
        caption="attention heatmap over the original upload screen"
      />
      <Fig
        src="/media/coi/before-flow.png"
        alt="flow diagram of the original process: upload, a 24-48 hour manual review, then a success email or a generic rejection email that loops the user back to the start"
        caption="before: 24-48 hour review and impersonal feedback"
      />

      <p>
        Because of this, many proof-of-insurance submissions that did not meet
        requirements (out-of-scope) were made.
      </p>
      <p>Out-of-scope submissions require human intervention.</p>
      <p>
        Human intervention costs money - at scale it costs A LOT of money.
      </p>

      <h2>Solution</h2>
      <p>Leaning into a user's behavior is far easier than trying to change it.</p>
      <p>
        The document upload and analysis process was re-sequenced to leverage a
        user's disinclination to read.
      </p>
      <p>
        With this new solution, users do not need to read their renters
        insurance documentation to see if it adheres to their lease's
        requirements (they also do not need to read their lease). The user's
        only action now is to upload their document and wait for the system to
        respond with personalized feedback, in real-time, about the extent to
        which their document meets (or doesn't meet) requirements.
      </p>

      <Fig
        src="/media/coi/after-flow.png"
        alt="flow diagram of the new process: upload, a 15-second eligibility determination, and personalized real-time feedback on rejection"
        caption="after: eligibility determined in 15 seconds"
      />

      <Band
        label="The new upload experience, from requirements to real-time feedback"
        layout="natural"
        images={[
          {
            src: '/media/coi/filmstrip-1.png',
            alt: 'third-party policy modal listing the three lease requirements with a file upload control',
            w: 870,
            h: 921,
          },
          {
            src: '/media/coi/filmstrip-2.png',
            alt: 'the same modal with a policy document attached and ready to submit',
            w: 870,
            h: 942,
          },
          {
            src: '/media/coi/filmstrip-3.png',
            alt: 'processing state noting analysis usually takes 15 seconds',
            w: 870,
            h: 652,
          },
          {
            src: '/media/coi/filmstrip-4.png',
            alt: 'success state: the policy meets requirements and the resident is unenrolled from the waiver program',
            w: 870,
            h: 895,
          },
          {
            src: '/media/coi/filmstrip-5.png',
            alt: 'document submitted for manual review after choosing to submit anyway',
            w: 870,
            h: 895,
          },
          {
            src: '/media/coi/filmstrip-6.png',
            alt: 'alert naming the exact problem, incorrect additional interest, with the exact text the policy must show',
            w: 870,
            h: 1340,
          },
          {
            src: '/media/coi/filmstrip-7.png',
            alt: 'requirements expanded to show precisely what the policy must include, with a 30-second instruction video',
            w: 870,
            h: 1212,
          },
        ]}
      />

      <h2>Outcome</h2>
      <p>
        Out-of-scope submissions dropped from 30% to 5% immediately upon
        rolling out the solution.
      </p>
      <p>
        Foxen saves, a projected, $500k+ each year in time spent supporting
        out-of-scope submissions while offering its users a better, more
        personalized experience. This efficiency has the added benefit of
        allowing Foxen to scale in customers without scaling its costs to
        support them.
      </p>
      <p className="formula">
        (50,000 documents processed every month) x (30% of submissions
        requiring support) x (10 min spent supporting) x ($25 an hour for
        support tech) = $41,750/mo.
      </p>
    </main>
  );
}
