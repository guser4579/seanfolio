import StudyHero from '../../components/StudyHero';
import SkillFile from '../../components/SkillFile';
import ScrollProgress from '../../components/ScrollProgress';

export const metadata = {
  title: 'How I run design at Foxen',
};

export default function Page() {
  return (
    <main id="main" className="study">
      <StudyHero slug="design-at-foxen" />

      <h2>The starting point</h2>
      <p>
        When I joined, design as function did not exist at Foxen. There were
        no designers, contractors, or existing infra of any kind - fwiw, this
        is often a better starting point than the adoption of poor choices
        previously made, so I mention this more as a point of observation than
        complaint. The process's immaturity is represented well by marketing's
        production of interface assets and the one front-end dev who assembled
        them with little in the way of the necessary formalities you'd expect
        to find at contemporary technology companies. It would likely, then,
        be of little surprise to know that Foxen, at the time, charitably
        referred to itself as a feature factory, because for a fledgling
        company trying to gauge the extent to which it will survive its
        infancy, certain functionality simply needed to exist so the business
        could live to see another day.
      </p>
      <p>
        The tradeoff, however, was that little consideration was given to
        nearsightedness's second order effects. The primary function of my
        role in 2024 was to identify those effects and establish the
        infrastructure, systems, and processes that would make consistent,
        thoughtful, and scalable experiences inevitable as Foxen grew.
      </p>

      <h2>Users are inherited, not acquired</h2>
      <p>
        Establishing that infrastructure began with an honest accounting of
        one of the most consequential facts about design at Foxen: the
        relationship between Foxen and its software's users. Foxen acquires
        users by signing deals with property ownership groups who grant Foxen
        access to their property managers (b2b) and their residents (b2b2c).
        The actual people using the software inherited the experiences.
        Because of this, Foxen benefits tremendously from the high switching
        costs for property managers and residents - unemployment and not
        moving into a desired apartment, respectively.
      </p>
      <p>
        This dynamic goes farther than almost any other fact behind the design
        choices' motivation at Foxen, as, from my perspective, the best
        designs are the ones that meet the level of user accommodation the
        context in which they live requires. If UX were something that could
        be bought and sold, the property technology market values it very
        little (a direct inversion from the dynamics present in consumer
        software). Foxen's feature backlog is driven often by the wants,
        needs, and desires of the property ownership groups Foxen has already
        signed and wants to keep, and by prospects looking for a reason to do
        so.
      </p>
      <p>
        This line of reasoning conflicts, to some degree, with the ethos
        behind user-centered design principles, but it is in that very
        conflict that the importance of understanding the context in which
        one's software actually lives and the domain in which the company
        behind it operates, is even further pronounced. With this in mind, I
        designed Foxen's design system accordingly. It is generic, familiar,
        and ADA compliant, with little in the way of novel interaction
        patterns. Our users are not understood deeply enough for novel
        patterns to even be warranted - a strategic decision made as a
        consequence of scarcity - so I have elected to borrow the ones they
        already know.
      </p>
      <p>Being generic and familiar here are virtues.</p>

      <h2>What warrants design</h2>
      <p>
        Now generic does not permit thoughtless intention. I maintain a design
        must still do one of three things to warrant attention: save the
        company money, make the company money, or teach the company something
        it or the market values. I love design for design's sake, but because
        of the aforementioned 4:1 ratio, darlings must sometimes be killed.
      </p>
      <p>
        This affects designs as the experiences must be clear and completable
        - designs unequivocally bias toward function. This guide is derived
        from understanding a user's intention - they are not in Foxen
        experiences to browse, they are, most often and with specific regard
        from the perspective of a renter, engaging with Foxen to complete the
        compliance steps that exist between them and admittance to the
        apartment they'd like to live in. Because there are things to finish,
        everything is status oriented, action oriented, and task driven, with
        the two foundational primitives being progressive disclosure and
        error prevention.
      </p>
      <p>
        Most simply, a design is successful if it minimizes support calls and
        maximizes a user's ability to self serve.
      </p>

      <h2>One design system for all platforms</h2>
      <p>
        These principles are only as good as the infrastructure that enforces
        them, which is what the rest of this piece works to describe. Every
        platform at Foxen runs on the same design system - a strategic choice
        I made, primarily as a means to save me time, but perhaps more
        interestingly, the effect on engineering has proven to be just as, if
        not even more, valuable: one design system makes way for
        interoperability between engineers and Foxen teams. When
        intra/inter-team resourcing shifts, an engineer can plug into familiar
        components without relearning a visual language or re-deriving what
        drove pattern decisions in the first place.
      </p>

      <h2>Skill files</h2>
      <p>
        If electing to leverage one design system across every Foxen platform
        didn't go far enough to communicate it clearly, time is indeed my
        chief limiting factor. Because of this, I vigilantly observe my
        processes for places where I am the blocker, and for recurring loops -
        meaning points in time where the same back-and-forths happen
        repeatedly. If something happens at a high enough frequency, it
        becomes something I consider incorporating as a formal component to my
        process.
      </p>
      <p>
        At Foxen, that infrastructure has begun taking the form of skill files
        and since the most expensive back-and-forths happen in translation, I
        have three that govern design's interaction with engineering.
      </p>
      <ol>
        <li>
          A UX_Principles_Skill encodes why our decisions are what they are,
          so that an engineer's Claude instance interprets intent with a
          higher degree of accuracy instead of guessing at it.
        </li>
        <li>
          A UI_Skill acts as a pseudo component library, with tokens loaded in
          and rules made explicit. This serves as the boundary a coding agent
          operates within, and as the source of truth when the component
          library drifts.
        </li>
        <li>
          A Design_Review_Skill that is required to pass as part of an
          engineer's ticket's acceptance criteria for all front end work. This
          file checks an engineer's build against hard coded rules, identifies
          the gaps, and prompts the same agent to actually implement the fix
          before it ever reaches me. I built this one after noticing I was
          making the same review comments over and over to different
          engineers.
        </li>
      </ol>

      <div className="skillfiles" role="group" aria-label="Genericized skill files">
        <SkillFile name="UX_Principles_Skill" file="ux-principles.md" />
        <SkillFile name="UI_Skill" file="ui-reference.md" />
        <SkillFile name="Design_Review_Skill" file="design-self-review.md" />
      </div>

      <p>
        The results have been significant. Getting a design's implementation
        right used to take ~3 rounds of review. It now takes only one,
        considerably shorter, review which is at minimum a 70% reduction in
        design review time. Additionally, the drift between what was designed
        and what ultimately reaches production, a recurring problem while
        these systems were being conceived, has largely disappeared.
      </p>
      <p>
        My own work, before a design has ever been created, runs through a
        fourth Design_Discovery_Skill. Because I look at design as the
        understanding of a problem and its context expressed through an
        interface, a design's goodness is simply a function of the extent to
        which the problem was understood. The design discovery skill is an
        accelerant to my understanding of a problem and its context - both in
        terms of depth and in speed. Those sessions reference the UX and UI
        skills and reach through MCP connections to Mobbin and Refero to
        explore new patterns we may want to consider, but only after the
        problem is actually understood. From there it is rough mocks, quick
        stakeholder feedback, final polish in Figma, and then engineering.
      </p>

      <div className="skillfiles" role="group" aria-label="Design discovery skill file">
        <SkillFile name="Design_Discovery_Skill" file="design-discovery.md" />
      </div>

      <h2>What AI does here, and what it does not</h2>
      <p>
        Since the release of ChatGPT, I have been reminded, quite frequently,
        of Steve Jobs' famous declaration that a computer is a bicycle for the
        mind. Working in technology, I am inclined to agree with such a
        statement. And, if that is indeed the case, I have found AI to be a
        rocket ship for the same.
      </p>
      <p>
        This positioning preserves what is (for the time being) still
        important-to-be human - understanding. If a problem's solution relies
        on the extent to which the problem and its context is understood, as I
        claim to be so, then that cannot be something outsourced. An
        automatically derived solution will come at the cost of practical
        understanding, and without that, the surface area for risk is, though
        certainly unknown, absolutely non-trivial.
      </p>
      <p>
        Leading a department of one that provides solutions to many requires
        (again, for the time being) that conversational understanding that
        makes steering a ship possible.
      </p>

      <h2>Appendix: The stack</h2>
      <ul>
        <li>
          <span className="toolname">Figma</span> - where designs are composed
          and given their final polish before engineering.
        </li>
        <li>
          <span className="toolname">Blazing Story</span> (the Storybook for
          MudBlazor) - the centralized repo where the design system lives as
          engineering's canonical, rendered source of truth.
        </li>
        <li>
          <span className="toolname">Claude</span> - runs the department's
          skill files: UX_Principles_Skill, UI_Skill, Design_Review_Skill, and
          Design_Discovery_Skill.
        </li>
        <li>
          <span className="toolname">Mobbin &amp; Refero</span> - pattern
          exploration, reached through MCP connections during design
          discovery.
        </li>
        <li>
          <span className="toolname">Gong</span> - pipes in every sales and
          support call; what prospects are asking for and what users are
          complaining about.
        </li>
        <li>
          <span className="toolname">Mixpanel</span> - session monitoring;
          surfaces frustrated user sessions and optimization targets.
        </li>
      </ul>

      <ScrollProgress />
    </main>
  );
}
