import Gate from '../../components/Gate';
import { gateOpen } from '../../lib/gate';
import { Thesis, Fig, Band } from '../../components/Study';
import StudyHero from '../../components/StudyHero';
import ScrollProgress from '../../components/ScrollProgress';

export const metadata = {
  title: 'Flexible design patterns are best for an uncertain future',
  robots: { index: false },
};

export default async function Page({ searchParams }) {
  const open = await gateOpen();
  const sp = await searchParams;
  if (!open) {
    return <Gate returnTo="/flexible-patterns" error={sp?.gate_error} />;
  }

  return (
    <main id="main" className="study">
      <StudyHero slug="flexible-patterns" />

      <Fig
        src="/media/flexible-patterns/hero.png"
        alt="Foxen PetClear launch brand image with a service dog"
      />

      <Thesis>
        When you don't know with certainty where things will end, which is
        almost always the case with software, you are wise to design early
        iterations with language simple enough to absorb the weight of new
        requirements.
      </Thesis>

      <h2>Background</h2>
      <p>
        In late 2025, Foxen launched a new product called PetClear. PetClear is
        designed to collect, normalize, and manage animal-related information
        submitted by prospective residents during the lease application
        process. Historically, this information has been fragmented,
        inconsistently structured, and operationally underutilized by property
        managers.
      </p>
      <p>
        Many apartment communities enforce animal policies that include breed
        restrictions, weight limits, and vaccination requirements. In response
        to these constraints, residents increasingly seek to designate their
        animals as Emotional Support Animals (ESAs). To do so, applicants
        typically submit a letter from a licensed healthcare provider asserting
        the need for an ESA as an accommodation.
      </p>
      <p>
        At the same time, the prevalence of invalid or fraudulently obtained
        ESA documentation has increased. Property managers face a significant
        compliance challenge: under HUD and Fair Housing regulations,
        improperly rejecting a valid ESA request can expose a property to
        substantial legal and financial risk. As a result, managers are
        incentivized to accept documentation even when its legitimacy is
        uncertain.
      </p>
      <p>
        PetClear was created to address this tension. The product centralizes
        animal-related information, applies automated analysis to identify
        potential exceptions or risks, and provides property managers with
        structured, defensible ways to respond to those exceptions.
      </p>

      <h2>Overview</h2>
      <p>
        When launching a new product, its eventual shape and role within a
        workflow are often uncertain. In these conditions, designing for
        optionality becomes critical. Systems that are overly prescriptive
        early on become liabilities as requirements shift.
      </p>
      <p>
        With PetClear, the goal was not to prematurely optimize for a fully
        mature system, but rather to establish a foundation that could evolve
        as real usage patterns emerged.
      </p>

      <h3>Starting Simple</h3>
      <p>
        PetClear initially launched as a read-only information organizer. Its
        primary function was to request animal-related information from
        applicants and synchronize that data with a property's existing
        property management system (PMS) - it is hard to start more simple
        than that.
      </p>

      <Fig
        src="/media/flexible-patterns/read-only-application.png"
        alt="an animal application card listing animal, vet, and document information with no actions"
        caption="read-only animal application"
      />

      <h3>Absorbing New Requirements</h3>
      <p>
        A glorified information repository was going to satisfy customers only
        momentarily.
      </p>
      <p>
        It was not long after going to market that we understood with more
        precision where this product should go, and what could be built on the
        foundation of its initial patterns.
      </p>
      <p>
        Customers needed analysis. Foxen would stay out of the business of
        approving and denying applicants, but it was time to deliver more
        valuable information to property managers, and more tools to act on
        it.
      </p>
      <ul>
        <li>AI analyzes every ESA letter on arrival.</li>
        <li>AI analyzes vaccination documentation.</li>
        <li>Property managers can request additional information from an applicant.</li>
        <li>Property managers can request additional documentation.</li>
        <li>
          The system prompts residents to keep their documentation current on
          behalf of the property, without its involvement.
        </li>
      </ul>
      <p>
        The goal became building an analysis layer on top of the information
        organization and transmission layer we had already established.
      </p>
      <Fig
        src="/media/flexible-patterns/exception-banners.png"
        alt="a property manager reviewing an application with in-line banners flagging items that require review"
        caption="expandable in-line exception banners"
      />

      <Band
        label="The exception review loop, from detection to resolution"
        images={[
          {
            src: '/media/flexible-patterns/filmstrip-1.png',
            alt: 'ESA letter flagged with two detected errors and a recommendation to request a new document',
            w: 1000,
            h: 2004,
          },
          {
            src: '/media/flexible-patterns/filmstrip-2.png',
            alt: 'application waiting on the resident after a new document was requested',
            w: 1000,
            h: 1520,
          },
          {
            src: '/media/flexible-patterns/filmstrip-3.png',
            alt: 'application approved after the corrected document passed analysis',
            w: 1000,
            h: 1464,
          },
          {
            src: '/media/flexible-patterns/filmstrip-4.png',
            alt: 'document history showing submission, flag, request, and re-submission events',
            w: 1000,
            h: 1701,
          },
        ]}
      />

      <h2>The Graceful Expansion of Scope</h2>
      <p>
        PetClear's immediate success in the market was all the validation we
        needed to confirm the next step.
      </p>
      <p>
        An applicant's animal designation is one point of consideration among
        many when a property weighs someone for tenancy. Background checks,
        income verification, and credit checks are additional points of
        screening that must be collected, analyzed, and delivered so the best
        judgment can be made.
      </p>
      <p>
        This stood as the obvious place to build what comes next for Foxen: a
        full-suite screening experience, with PetClear as one screening point
        among many.
      </p>
      <Fig
        src="/media/flexible-patterns/screener-summary.png"
        alt="an application summary with credit, income, background, and animal screening modules all complete"
        caption="one application, many screeners"
      />

      <h2>Outcome</h2>
      <p>
        PetClear reads as though it was always one piece of a larger screening
        platform, not a product a year older than the rest of it.
      </p>
      <p className="formula">
        $4M+ in first-year bookings • ~7% of total company revenue • Foxen's
        fastest-growing product.
      </p>

      <ScrollProgress />
    </main>
  );
}
