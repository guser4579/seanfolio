// Textbook-style line figures for /design-at-foxen. One per section, each a
// distilled representation of that section's argument (not its title).
// Shared grammar: muted 1.5px strokes, rounded nodes for actors, dashed =
// absence/potential, one blue accent per figure marking the thing design
// changed or orients to. All type is the mono stack via .diafig classes in
// globals.css; colors are theme tokens so figures adapt to light/dark.

function Figure({ n, label, height, children }) {
  return (
    <figure className="diafig">
      <div className="tag" aria-hidden="true">fig. 0{n}</div>
      <svg
        viewBox={`0 0 640 ${height}`}
        role="img"
        aria-label={label}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </figure>
  );
}

// 01 - the pipeline before design existed; a dashed empty seat where the
// function should sit
export function FigStartingPoint() {
  return (
    <Figure n={1} height={210} label="Production chain from marketing to one front-end dev to product, with a dashed empty slot above labeled design">
      <rect className="ln-b dash" x="255" y="24" width="130" height="44" rx="8" />
      <text className="lbl-b" x="320" y="50" textAnchor="middle">design</text>
      <line className="ln-b dash" x1="320" y1="68" x2="320" y2="103" />

      <rect className="ln" x="40" y="105" width="150" height="50" rx="8" />
      <text className="lbl" x="115" y="134" textAnchor="middle">marketing</text>

      <line className="ln" x1="196" y1="130" x2="238" y2="130" />
      <path className="ln" d="M232 124 L240 130 L232 136" />

      <rect className="ln" x="248" y="105" width="144" height="50" rx="8" />
      <text className="lbl" x="320" y="134" textAnchor="middle">one dev</text>

      <line className="ln" x1="398" y1="130" x2="440" y2="130" />
      <path className="ln" d="M434 124 L442 130 L434 136" />

      <rect className="ln" x="450" y="105" width="150" height="50" rx="8" />
      <text className="lbl" x="525" y="134" textAnchor="middle">product</text>
    </Figure>
  );
}

// 02 - accommodation is a dial set by context, and foxen's context sets it
// low: users inherit the software, so generic and familiar are the virtues
export function FigInheritedUsers() {
  return (
    <Figure n={2} height={215} label="A spectrum of user accommodation the context requires. Consumer software, where users choose, sits high. Foxen, where users inherit, sits low, and the design response is generic and familiar">
      <line className="ln" x1="60" y1="120" x2="578" y2="120" />
      <path className="ln" d="M572 114 L580 120 L572 126" />
      <text className="lbl-m" x="60" y="144">low</text>
      <text className="lbl-m" x="572" y="144" textAnchor="end">high</text>

      <circle className="ln" cx="470" cy="120" r="6" />
      <line className="ln" x1="470" y1="96" x2="470" y2="112" />
      <text className="lbl-m" x="470" y="88" textAnchor="middle">consumer software · users choose</text>

      <circle className="ln-b" cx="170" cy="120" r="6" />
      <line className="ln-b" x1="170" y1="96" x2="170" y2="112" />
      <text className="lbl-b" x="170" y="88" textAnchor="middle">foxen · users inherit</text>
      <line className="ln-b dash" x1="170" y1="128" x2="170" y2="154" />
      <text className="lbl-b" x="170" y="172" textAnchor="middle">generic · familiar</text>

      <text className="lbl-m" x="320" y="202" textAnchor="middle">level of required user accommodation</text>
    </Figure>
  );
}

// 03 - the compliance steps are what stand between a resident and the
// apartment; design makes them clear, completable, and status-forward
export function FigWarrants() {
  return (
    <Figure n={3} height={220} label="A resident moves through three compliance steps, marked done, done, and in progress, on a straight line to the apartment. Caption: progressive disclosure and error prevention">
      <rect className="ln" x="40" y="60" width="110" height="40" rx="8" />
      <text className="lbl" x="95" y="84" textAnchor="middle">resident</text>

      <line className="ln" x1="150" y1="80" x2="190" y2="80" />
      <rect className="ln" x="190" y="66" width="70" height="28" rx="6" />
      <path className="ln" d="M215 80 l6 6 l10 -12" />
      <text className="lbl-s" x="225" y="115" textAnchor="middle">done</text>

      <line className="ln" x1="260" y1="80" x2="290" y2="80" />
      <rect className="ln" x="290" y="66" width="70" height="28" rx="6" />
      <path className="ln" d="M315 80 l6 6 l10 -12" />
      <text className="lbl-s" x="325" y="115" textAnchor="middle">done</text>

      <line className="ln" x1="360" y1="80" x2="390" y2="80" />
      <rect className="ln" x="390" y="66" width="70" height="28" rx="6" />
      <circle className="ln" cx="425" cy="80" r="5" />
      <text className="lbl-s" x="425" y="115" textAnchor="middle">in progress</text>

      <line className="ln" x1="460" y1="80" x2="484" y2="80" />
      <path className="ln" d="M478 74 L486 80 L478 86" />

      <rect className="ln-b" x="490" y="60" width="110" height="40" rx="8" />
      <text className="lbl-b" x="545" y="84" textAnchor="middle">apartment</text>

      <text className="lbl-m" x="320" y="164" textAnchor="middle">the steps between a renter and admittance</text>
      <text className="lbl-m" x="320" y="192" textAnchor="middle">progressive disclosure · error prevention</text>
    </Figure>
  );
}

// 04 - one system feeding every platform; the same engineer plugs into any
// spoke without relearning
export function FigOneSystem() {
  return (
    <Figure n={4} height={320} label="A single design system hub connected by spokes to five identical platform nodes. An engineer dot travels a dashed arc from one platform toward a dashed ghost of itself at another - engineers move freely">
      <path className="ln dash" d="M140 56 C230 14 410 14 500 56" />
      <path className="ln" d="M310 18.5 L318 24.5 L310 30.5" />
      <text className="lbl-m" x="320" y="12" textAnchor="middle">engineers move freely</text>
      <circle className="fill-m" cx="140" cy="54" r="5" />
      <text className="lbl-s" x="126" y="46" textAnchor="end">eng</text>
      <circle className="ln dash" cx="500" cy="54" r="5" />
      <circle className="ln dash" cx="100" cy="146" r="5" />
      <circle className="ln dash" cx="540" cy="146" r="5" />
      <circle className="ln dash" cx="346" cy="254" r="5" />

      <rect className="ln" x="80" y="60" width="120" height="36" rx="8" />
      <text className="lbl-m" x="140" y="82" textAnchor="middle">platform</text>
      <rect className="ln" x="440" y="60" width="120" height="36" rx="8" />
      <text className="lbl-m" x="500" y="82" textAnchor="middle">platform</text>
      <rect className="ln" x="40" y="152" width="120" height="36" rx="8" />
      <text className="lbl-m" x="100" y="174" textAnchor="middle">platform</text>
      <rect className="ln" x="480" y="152" width="120" height="36" rx="8" />
      <text className="lbl-m" x="540" y="174" textAnchor="middle">platform</text>
      <rect className="ln" x="260" y="260" width="120" height="36" rx="8" />
      <text className="lbl-m" x="320" y="282" textAnchor="middle">platform</text>

      <line className="ln" x1="283" y1="136" x2="198" y2="96" />
      <line className="ln" x1="357" y1="136" x2="442" y2="96" />
      <line className="ln" x1="272" y1="170" x2="162" y2="170" />
      <line className="ln" x1="368" y1="170" x2="478" y2="170" />
      <line className="ln" x1="320" y1="218" x2="320" y2="258" />

      <circle className="ln-b" cx="320" cy="170" r="48" />
      <text className="lbl-b" x="320" y="174" textAnchor="middle">one system</text>
    </Figure>
  );
}

// 05 - the expensive back-and-forths happen in translation; skill files
// encode it, and three rounds of review become one
export function FigSkillFiles() {
  return (
    <Figure n={5} height={260} label="Before: design and engineering cycle through roughly three rounds of review. After: one straight pass from design through the ux, ui, and review skill files to engineering - translation, encoded">
      <line className="ln dash" x1="320" y1="20" x2="320" y2="240" />
      <text className="lbl-m" x="150" y="34" textAnchor="middle">before</text>
      <text className="lbl-m" x="490" y="34" textAnchor="middle">after</text>

      <rect className="ln" x="60" y="56" width="180" height="40" rx="8" />
      <text className="lbl" x="150" y="80" textAnchor="middle">design</text>
      <rect className="ln" x="60" y="190" width="180" height="40" rx="8" />
      <text className="lbl" x="150" y="214" textAnchor="middle">engineering</text>

      <path className="ln" d="M110 96 C90 128 90 158 110 188" />
      <path className="ln" d="M104 182 L110 190 L117 184" />
      <path className="ln" d="M150 190 C170 158 170 128 150 98" />
      <path className="ln" d="M144 104 L150 96 L157 102" />
      <path className="ln" d="M190 96 C210 128 210 158 190 188" />
      <path className="ln" d="M184 182 L190 190 L197 184" />
      <text className="lbl-m" x="150" y="252" textAnchor="middle">~3 rounds of review</text>

      <rect className="ln" x="400" y="56" width="180" height="40" rx="8" />
      <text className="lbl" x="490" y="80" textAnchor="middle">design</text>
      <rect className="ln" x="400" y="190" width="180" height="40" rx="8" />
      <text className="lbl" x="490" y="214" textAnchor="middle">engineering</text>

      <line className="ln-b" x1="490" y1="96" x2="490" y2="186" />
      <path className="ln-b" d="M484 180 L490 188 L496 180" />

      <rect className="chipnode" x="446" y="106" width="88" height="20" rx="4" />
      <text className="lbl-s" x="490" y="119" textAnchor="middle">ux.md</text>
      <rect className="chipnode" x="446" y="132" width="88" height="20" rx="4" />
      <text className="lbl-s" x="490" y="145" textAnchor="middle">ui.md</text>
      <rect className="chipnode" x="446" y="158" width="88" height="20" rx="4" />
      <text className="lbl-s" x="490" y="171" textAnchor="middle">review.md</text>

      <text className="lbl-b" x="544" y="145">1 round</text>
      <text className="lbl-m" x="490" y="252" textAnchor="middle">translation, encoded</text>
    </Figure>
  );
}

// 06 - ai changes the slope, not the climber: understanding is still built by
// the human, faster and deeper with the accelerant
export function FigAiCore() {
  return (
    <Figure n={6} height={250} label="A graph of understanding over time. A muted curve labeled without rises slowly; a blue curve labeled with ai rises steeply. Same axes, same climb, different slope">
      <line className="ln" x1="80" y1="28" x2="80" y2="196" />
      <path className="ln" d="M74 34 L80 26 L86 34" />
      <line className="ln" x1="80" y1="196" x2="576" y2="196" />
      <path className="ln" d="M570 190 L578 196 L570 202" />

      <text className="lbl-m" transform="rotate(-90 46 112)" x="46" y="112" textAnchor="middle">understanding</text>
      <text className="lbl-m" x="328" y="226" textAnchor="middle">time</text>

      <path className="ln" d="M80 196 C220 186 400 168 560 140" />
      <text className="lbl-m" x="566" y="130" textAnchor="end">without</text>

      <path className="ln-b" d="M80 196 C170 180 230 110 290 52" />
      <text className="lbl-b" x="300" y="48">with ai</text>
    </Figure>
  );
}
