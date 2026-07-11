import Gate from '../../components/Gate';
import { gateOpen } from '../../lib/gate';
import { Facts, Thesis, Fig } from '../../components/Study';

export const metadata = {
  title: 'Teaching a company to change',
  robots: { index: false },
};

// DRAFT - built from the discovery spine. Sean rewrites before launch.
export default async function Page({ searchParams }) {
  const open = await gateOpen();
  const sp = await searchParams;
  if (!open) return <Gate returnTo="/change" error={sp?.gate_error} />;

  return (
    <main id="main" className="study">
      <h1>Teaching a company to change</h1>
      <p className="meta-line">WCAG 2.1 AA remediation • Case Study • 2026</p>

      <Facts
        items={[
          ['Company', 'Foxen'],
          ['Role', 'Sole Product Designer'],
          ['Year', '2026'],
        ]}
      />

      <Thesis>
        Everyone wants change to be a muscle. Not everyone knows how to
        exercise it.
      </Thesis>

      <h2>Background</h2>
      <p>
        PetClear made Foxen a health-adjacent company. ESA letters mean
        disability disclosure, and disability disclosure means the Americans
        with Disabilities Act is no longer an abstraction.
      </p>
      <p>
        At the same time, Foxen began requiring residents to use its portal.
        The escape hatches - email, unauthenticated flows - were closing.
        Dramatically more people would be using experiences that had never been
        audited for compliance.
      </p>
      <p>
        I designed the portal's first iteration. I knew how little compliance
        work had ever been done.
      </p>
      <p>
        There is also a market for suing small companies over small violations.
        WCAG rules make the checklist easy. I think of it as compliance
        arbitrage, and Foxen was growing into a target.
      </p>

      <h2>Problem</h2>
      <p>
        This was not a structuring problem. It was a culture and dogma problem.
      </p>
      <p>
        Foxen sells to property owners and management companies. The people who
        buy the software are not the people who use it. Cohesion is not a
        selling point in a sales presentation, so the backlog fills with
        dollar-attached feature requests, and six successful years of building
        that way become muscle memory.
      </p>
      <p>
        I proposed the right way first: a centralized component library, an
        audit, connections, inheritance. Leadership understood it
        intellectually. It was deprioritized anyway, again and again.
      </p>
      <p>
        There is a lot of distance between intellectual understanding and
        practical adoption.
      </p>

      <h2>The Forcing Function</h2>
      <p>
        So I stopped asking. I designed only one way forward - an elevated,
        fully compliant experience - and fed it into a new initiative as the
        only design available.
      </p>
      <p>
        I held implementations accountable to spec, thirty and forty points of
        feedback at a time. The only way around me was through me.
      </p>
      <p>
        This forced the conversation Foxen had never had: how does a global
        change actually get made here?
      </p>

      <h2>The Mechanism</h2>
      <p>Two things needed to exist, and neither did.</p>
      <p>
        WHAT: a specific definition of each change and where the problems
        live. HOW: one mechanical process every engineer follows to implement
        it.
      </p>
      <p>
        I now define the what. A partner engineer defined the how, once, for
        everyone. I draft the proposal, write the tickets, and partner with
        product and engineering managers to schedule the work. The engineer who
        picks up a ticket follows the process.
      </p>
      <p>
        Change went from a negotiation to a conveyor belt. I initiate it. I am
        no longer the bottleneck for it.
      </p>

      <Fig
        ph="diagram - the WHAT / HOW change process"
        caption="the change process, defined once"
      />

      <h2>Outcome</h2>
      <p>
        The resident portal now meets WCAG 2.1 AA. Every color pairing in the
        system was re-tuned and measured against the standard, and a
        screen-reader-only text layer serves impaired users without costing
        sighted users anything.
      </p>
      <p>
        The old error chip failed at 3.9:1. Its replacement passes at 8.25:1.
        The same correction runs through every color family in the system.
      </p>
      <p>
        More important than any single fix: Foxen now has a process for global
        change where none existed. Growth and change are hard. We are getting
        there.
      </p>

      <Fig
        ph="table - WCAG AA contrast scoreboard, before and after"
        caption="measured contrast, before and after"
      />
    </main>
  );
}
