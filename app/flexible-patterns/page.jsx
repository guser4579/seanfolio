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
        ph="framed screenshot - read-only animal application"
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
        The value proposition was deliberate: the centralization and
        organization of information, not recommendation. Foxen delivers
        reliable information. Leasing offices make the eligibility judgments.
        That line shields Foxen from legal culpability, and nothing we built
        crosses it.
      </p>
      <p>
        Even still, customers needed analysis. We would stay out of the
        business of approval and denial, but the market told us it was time to
        deliver more valuable information to property managers, and more tools
        to act on it.
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

      <p>
        Every feature above shipped inside the patterns established at launch.
        The patterns held.
      </p>

      <Band label="Filmstrip of PetClear screens" />

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
      <p>
        The direction is chosen. The designs are final, and they have been
        reviewed with our board and with prospects. The technical underpinnings
        are being built now. Inside Fox Den, the portal our property managers
        live in, screening becomes an actual workstation.
      </p>
      <p>
        None of this requires a rebuild. Applications were housed in tabs from
        the very first iteration, back when animal information was the only tab
        an application would hold. The bet was that an application would one
        day hold anything that paints the picture of an applicant's eligibility
        for tenancy. Each new screener arrives as a new tab, not a new product.
      </p>
      <p>
        This may have always been the direction we were headed. The ease of
        getting there is because we designed with future optionality in mind.
      </p>

      <Fig
        ph="framed screenshot - application with animal, background, and income screener tabs"
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

      <Fig
        ph="wide collage - complete screening experience"
        phClass="collage"
        caption="complete screening experience"
      />
    </main>
  );
}
