import Gate from '../../components/Gate';
import { gateOpen } from '../../lib/gate';
import { Fig, Band } from '../../components/Study';
import StudyHero from '../../components/StudyHero';

export const metadata = {
  title: 'Creating a claims process that prevents errors and increases confidence',
  robots: { index: false },
};

export default async function Page({ searchParams }) {
  const open = await gateOpen();
  const sp = await searchParams;
  if (!open) return <Gate returnTo="/claims" error={sp?.gate_error} />;

  return (
    <main id="main" className="study">
      <StudyHero slug="claims" />

      <Fig ph="hero media - claims experience overview" phClass="hero" />

      <h2>Overview</h2>
      <p>
        Seventy percent of the residents Foxen monitors elect to stay enrolled
        in Foxen's renters insurance alternative program.
      </p>
      <p>
        While this program offers residents some contents protection (their
        belongings), the program primarily exists as a means to protect units
        from damage.
      </p>
      <p>When monitoring enough residents, unit damage is inevitable.</p>
      <p>
        Property managers need a way to submit claims damage as it arises.
      </p>

      <h2>Problem</h2>
      <p>
        Foxen's initial claims submission process lived as a static form on its
        corporate website - effectively anyone with an internet connection
        could access and submit a claim to Foxen.
      </p>
      <p>
        Because of its broad accessibility, submissions were noisy and an
        overwhelming majority of the ones made were out-of-scope.
      </p>
      <p>
        Out-of-scope submissions are submissions made about damage that is not
        covered under Foxen's program.
      </p>
      <p>
        To determine a submission's eligibility, the submission must be
        adjudicated. Foxen partners with a third-party adjudication company
        that assesses submissions against the scope of the Foxen program to
        determine if a payout will happen.
      </p>
      <p>The cost to adjudicate a submission is $650/submission.</p>
      <p>
        Foxen's initial submission process would receive ~1,400 submissions
        each year.
      </p>
      <p>
        Annual adjudication costs ballooned to ~$910,000 for mostly
        out-of-scope submissions.
      </p>
      <p>
        Most submissions' out-of-scope designation was a function of the
        submitter failing to understand the boundaries of the Foxen program.
      </p>
      <p>
        Of the two user groups that most frequently made submissions, one had a
        far lower approval rate.
      </p>

      <Fig
        ph="chart - distribution of submissions by user group"
        caption="distribution of submissions"
      />

      <p>
        Further, 64% of all submissions made required a call to Foxen support
        from the submitter.
      </p>

      <h2>Solution</h2>
      <p>
        Move the form behind PM-specific authentication and add in-form
        feedback.
      </p>
      <p>
        The solution sought to address two things - reduce the submission
        funnel and increase the quality of the submissions that remained.
      </p>
      <p>
        To re-iterate, Foxen's program primarily protects units from damage,
        not resident belongings. Because of this, the most qualified group to
        allow submissions for was the group representing the unit - property
        managers.
      </p>
      <p>
        If nothing else was done but disallow resident submissions, Foxen could
        already expect to save an estimated $400,000 a year.
      </p>
      <p>Funnel aperture, reduced.</p>
      <p>
        Increasing the quality of submissions then, became a function of
        educating the submitter while they were actually making a submission.
      </p>

      <h3>Authenticated Experience Benefits</h3>
      <p>
        Since limiting submissions to property managers and protecting the
        submission process behind authentication, the new system was able to
        leverage protected data.
      </p>
      <p>
        This protected data enabled the new form process to pull in apartment
        and resident data that pertained specifically to the property manager
        making the submission. The system was also able to verify if the
        resident causing unit damage was enrolled in Foxen's program at the
        time of the incident, and if not, what steps for recourse should be
        taken.
      </p>
      <p>
        The new system was also able to perform analysis on submitted
        documents, like images, and invoices to assess the likelihood of a
        payout prior to submission.
      </p>
      <p>
        Legally, our system could not prevent anyone from making a submission
        (regardless of how unlikely a payout would be), but it could deter
        out-of-scope submissions from being made.
      </p>

      <Band label="Filmstrip of the claims submission flow" />

      <h2>Outcome</h2>
      <p>
        Submissions now come from the group the program actually protects, with
        in-form feedback educating submitters before adjudication dollars are
        spent.
      </p>
      <p>
        Foxen saves an estimated $650k each year, savings that stand only to
        increase as customers are added.
      </p>

      <Fig
        ph="wide collage - complete claims management experience"
        phClass="collage"
        caption="complete claims management experience"
      />
    </main>
  );
}
