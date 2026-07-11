import Gate from '../../components/Gate';
import { gateOpen } from '../../lib/gate';
import { Facts, Thesis, Fig, Band } from '../../components/Study';

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
      <h1>Flexible design patterns are best for an uncertain future</h1>
      <p className="meta-line">New Product • Case Study • 2026</p>

      <Facts
        items={[
          ['Company', 'Foxen'],
          ['Role', 'Sole Product Designer'],
          ['Year', '2025 - 2026'],
        ]}
      />

      <Fig ph="hero media - PetClear brand image" phClass="hero" />

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
        The goal was not to prematurely optimize for a fully mature system, but
        to establish a foundation that could evolve as real usage patterns
        emerged.
      </p>

      <h3>Starting Simple</h3>
      <p>
        PetClear initially launched as a read-only information organizer. Its
        primary function was to request animal-related information from
        applicants and synchronize that data with a property's existing
        property management system (PMS).
      </p>

      <Fig
        ph="framed screenshot - read-only animal application"
        caption="read-only animal application"
      />

      <h3>Absorbing New Requirements</h3>
      <p>
        Upon opening an application, the system immediately communicates the
        number of exceptions present. Rather than redirecting users into a
        separate review flow, exceptions are expressed directly within the
        application using expandable in-line banners.
      </p>

      <Fig
        ph="framed screenshot - in-line exception banner, weight-limit exceeded"
        caption="expandable in-line exception banners"
      />

      <Band label="Filmstrip of PetClear screens" />

      <h2>Bearing the Weight of What Came Next</h2>
      <p>
        PetClear was built as an animal information solicitor, analyzer, and
        processor. Its patterns were built to hold more than animals.
      </p>
      <p>
        Applications were housed in tabs from the very first iteration. At the
        time, animal information was the only tab an application would hold.
        The bet was that an application would one day hold anything that paints
        the picture of an applicant's eligibility for tenancy.
      </p>
      <p>
        Eighteen months later, Foxen elected to expand into additional forms of
        applicant screening - background checks and income verification.
      </p>
      <p>The patterns held.</p>
      <p>
        Each new screener type arrives as a new tab, not a new product. No
        overhaul was required. No rework was performed. The system absorbed the
        new weight, as it was designed to.
      </p>

      <Fig
        ph="framed screenshot - application with animal, background, and income screener tabs"
        caption="one application, many screeners"
      />

      <h2>Outcome</h2>
      <p>
        The patterns established at launch were simple enough to absorb
        exception states, recourse actions, and entirely new screening types
        without rework.
      </p>
      <p>
        The product reads as though it was always one piece of a larger
        screening platform, not a product a year older than the rest of it.
      </p>
      <p className="formula">
        $4M+ in first-year bookings • ~7% of total company revenue • Foxen's
        fastest-growing product.
      </p>

      <Fig
        ph="wide collage - complete screening experience"
        phClass="collage"
        caption="complete screening experience"
      />
    </main>
  );
}
