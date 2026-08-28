# Sean Forquer — Portfolio: Information Architecture & Build Plan

> A proposal to react to and reshape — not a decree. Pairs with `SYNTHESIS.md` (the source of
> truth for content). Everything here serves the two jobs: (1) a mature, credible showcase that
> convinces Head-of-Design hiring teams, and (2) a living thought garden. Priority order stays:
> great designer → great leader → great thinker → the deeper thoughts for those who dig.

---

## Part I — Design Principles (the rules the whole site obeys)

1. **Form embodies thesis.** Academic / peer-reviewed feel; content is the star; nothing
   decorative. The medium *is* the message — a text-forward, readable, undecorated site is an
   argument for Sean's beliefs about attention and understanding.
2. **Demonstrate, never assert.** No claims of "great intuition." Show the decisions; let the
   reader conclude. The understated throughline ("understanding is the work") is *felt*, never
   announced as a manifesto.
3. **The site practices what it preaches — WCAG 2.2 AA+.** Because the crown jewel is an
   accessibility-integrity story, this site must be an exemplar. Accessibility is a feature, not
   a checkbox. (Fixes the current site's missing alt text, etc.)
4. **Dramatize the truth, never fabricate.** Label projected vs. measured numbers; label
   illustrations vs. real data.
5. **Restraint as craft.** Grayscale. Hyper-readable mono. Motion only when it earns its place
   (à la Emil Kowalski's "You Don't Need Animations").
6. **Personality rewards attention.** Subtle, via marginalia/footnotes and a tasteful About —
   never front-loaded.

---

## Part II — Information Architecture

A small number of surfaces, each with a clear job. Think of it as a journal: an index (Home),
published papers (Work), working notes (Garden), and the masthead/colophon (About).

### 1. Home — the index / front page
Understated, Emil-style. Its job is orientation and routing, not persuasion.
- **Opening line (status, not slogan):** evolve the existing "hi, i'm sean" + a plain
  present-tense statement of what he does and where (e.g., "Currently the design function at
  Foxen"). One or two lines of positioning drawn from his *own* phrasing — "design is a means
  to an end, not the end itself"; context-driven design — but sharpened past the generic (see
  open item: replace "problem-first").
- **Selected Work:** the 3 heroes (PetClear, the Nimbleness leadership story, COI) + Claims as
  a restrained fourth. Each = title + one-line thesis + outcome metric + year. No cards-with-
  glossy-thumbnails; quiet, confident, text-first.
- **From the Garden:** 3–5 most-recent thoughts, each showing its metadata (maturity ·
  provenance · last tended). Signals a living mind.
- **Footer:** contact, Columbus location, a current-local-time touch (benji.org), Twitter/X
  (feeds the visibility plan), résumé, email.
- **Marginalia:** the first quiet personal footnotes live here.

### 2. Work — the published papers
- **Case-study index:** the 3–4 Foxen heroes, plus a lighter **Archive** for prior career
  (Fifth Third Bank mobile 2022–24, wayfinding tools, no-code builder) — présented résumé-light
  so range is visible without diluting the heroes.
- **Case-study template (consistent academic spine):**
  - Title + one-line thesis.
  - **Abstract/metadata header** (like a paper): role, year, context, headline impact metric.
  - Narrative told in that study's chosen register:
    - *PetClear* → strategy (feasibility framework, "product espionage," the burden chart as
      hero data-viz) → craft (restraint/reuse/foresight: reused Claims form, mirrored PM/
      resident structure, deliberately wireframe-y v1, tabs chosen 18 months early) → durability
      (form → inline exceptions → new screeners) → living profile → PM tooling → impact. Frame:
      *the wedge into owning resident screening.* Visuals told as an **evolution sequence**.
    - *Nimbleness* → operational-leadership register. Hero visual = the **WHAT/HOW process
      diagram**; proof = the **WCAG AA contrast scoreboard** (from the palette audit) + the
      `sr-only` detail. **No old-portal makeover reveal.** Closed, timeless past tense.
    - *COI* → behavioral-insight register. Hero = the **attention heatmap** (verify real vs.
      illustrative). Transparent savings math. Old (24–48h, generic rejection) vs. new (15-sec
      AI check, personalized real-time feedback, no-shame "submit anyway").
  - Honest labels throughout (projected vs. measured; illustration vs. data).
  - Restrained visuals; light embedded prototypes where interaction is the point (PetClear).
- **"How I Operate" (leadership/operating layer)** — proposed as its own page (or a strong Work
  sub-section). This is where a HoD hiring manager looks for *how he leads*, and it carries the
  material that isn't a single project:
  - Design **as a business instrument**: make money / save money / teach the company — with the
    dollar scoreboard ($4M+ PetClear, $650k Claims, $500k COI).
  - The **universal, extensible design system** + engineer interoperability (built not to break
    under unknown requirements).
  - The **AI-integrated design process** (the honest 6 steps; understanding-first; Refero +
    Mobbin + skill files; ends in Figma handoff — *no code claims*). Quiet note that this very
    site was built with that process.
  - **Blast-radius thinking** / risk-adjusted UX as his operating philosophy.

### 3. Garden — the living thought catalog
- **Index** of pieces of varying fidelity, each tagged with the indicator system (below). Full
  essays and raw seeds coexist.
- **Piece pages:** long-form, hyper-readable single column; **marginalia/sidenotes** carry
  asides + citations; provenance/maturity/tended metadata in a compact header.
- **Seeds to plant first:** *fluency-in-oneself* (by hand — the voice exemplar), *post-literate
  society* (with AI), *medium-based attention*, then grow: death of the interface, attention as
  teachable skill, AI-voice homogenization, wealth inequality, decisions at the speed of info.
- **Doubles as the "dig deeper" destination** for tweets.

### 4. About / Colophon — masthead + the quiet meta-story
- **Bio** and the **personality** (snorkeling, Halo 3, reading, running) done tastefully; the
  "Interests" visuals reimagined **with alt text**. Optional benji-style "currently
  reading/playing" line that he updates (reinforces the living ethos).
- **Colophon** — the perfect *understated* home for the meta-story, stated as fact not
  manifesto: built with his own AI-assisted process; type and grayscale system; the
  **provenance philosophy**; the **WCAG AA+ accessibility statement**. This is where "the site
  practices what it preaches" lives without ever bragging.
- Contact + résumé + social.

### Navigation & cross-linking
- Spare persistent header: **Work · Garden · About** (+ home wordmark). Fully keyboard
  accessible; skip-to-content link; visible focus.
- **Work ⇄ Garden relationship:** Work = polished, closed, consumable ("published"). Garden =
  open, evolving ("working notes"). The throughline links them: the garden shows the thinking;
  the work shows it applied. Case studies may footnote related garden pieces, and vice versa.

### The indicator system (spec)
Rendered as restrained mono metadata — **no emoji**.
- **Maturity:** three states — `seedling` → `growing` → `evergreen` (vocabulary TBD; could be
  his own words). Small typographic tag.
- **Last tended:** date, understated (`tended 24 Jun 2026`).
- **Provenance (the differentiated part — embodies the AI thesis):** an honest byline —
  `by hand` · `with AI` · `distilled by AI` · `raw note`. Radical transparency about where the
  human ends and the synthesizer begins.
These appear as compact chips in list views and as a header block on each piece.

---

## Part III — Build Plan & Stack

### Framework & hosting
- **Next.js (App Router) on Vercel.** Vercel-native, excellent for MDX content, static
  generation for speed + SEO (matters for the job hunt and Twitter cards). Existing domain
  **seanforquer.com**.
- **GitHub repo** with Vercel preview deploys (every change previewable before it's live —
  fits "start simple, iterate").

### Content model (makes the garden trivially growable)
- **MDX** for both case studies and garden pieces. **Frontmatter carries all metadata**
  (title, year, role, impact, maturity, provenance, tended date, tags). Growing the garden =
  adding one MDX file. Recommend a typed content layer (**Velite** or Contentlayer2) so
  indicators are data-driven and consistent; fall back to built-in MDX + gray-matter if we want
  minimal deps.

### Styling & design system
- **Tailwind CSS** + **shadcn/ui** as the accessible primitive base (dialog, tabs, tooltip,
  dropdown), restyled to grayscale. (Tabs are on-brand — same pattern as PetClear.)
- **Grayscale token system** — seed it directly from Sean's **existing neutral ramp in the
  palette audit** (nice reuse; already contrast-verified). Decision pending: pure grayscale vs.
  a single restrained functional accent for links/focus. Default recommendation: near-ink links
  with underlines + a visible focus ring; grayscale-only.
- **Typography — readable mono.** Audition 2–3: **Commit Mono**, **iA Writer Duospace**,
  Berkeley Mono (paid). Self-host via `next/font` (no layout shift, no third-party calls —
  also a privacy/accessibility win). Optional readable serif for long-form essays if it
  strengthens the journal feel; otherwise mono throughout with a tuned scale + generous measure
  for readability.

### Motion
- **`motion` (Framer Motion)** for a *few* purposeful things: gentle page transitions, footnote/
  sidenote reveals, a restrained fade-up on scroll. **Always respect `prefers-reduced-motion`.**
  Nothing decorative.

### Component libraries (how to actually use the ones you found)
- **shadcn/ui** — the foundation (accessible, ownable). ~80% of the UI is this + custom.
- **blocks.so / cult-ui / skiper-ui / unlumen / watermelon / componentry** — cherry-pick
  *sparingly* for specific tasteful pieces if one earns its place (e.g., a scroll reveal, an
  image/prototype frame, a marquee). Not central. Honest expectation: most of this site is
  custom + shadcn; the flashy libraries are a garnish, not the meal.

### Accessibility (first-class, on-brand)
- Target **WCAG 2.2 AA+**. Semantic HTML + landmarks, skip links, `focus-visible`, full
  keyboard nav, **alt text on every image**, `prefers-reduced-motion`, AA+ contrast (reuse the
  audit methodology), and the **`sr-only`** technique Sean invented. Automated checks (axe /
  Lighthouse / pa11y) in CI. Publish an accessibility statement in the colophon.

### Performance / SEO / analytics
- Static generation, `next/image`, `next/font`, metadata + Open Graph + sitemap. Privacy-
  friendly analytics (Vercel Analytics or Plausible) to see engagement during the hunt.

### Phased build sequence (ships incrementally)
- **Phase 0 — Foundations:** repo, Next + Tailwind + shadcn, type + grayscale tokens (from the
  audit), layout shell, nav, accessibility baseline, skeleton deploy to Vercel.
- **Phase 1 — Home + PetClear:** the flagship end-to-end proves the case-study template and the
  aesthetic. Ship it.
- **Phase 2 — Remaining work:** Nimbleness, COI, Claims + Work index + prior-career archive.
- **Phase 3 — Garden:** content model + indicator system + plant 2–3 seeds (fluency-in-oneself,
  post-literacy, one raw note).
- **Phase 4 — About/Colophon + marginalia + personality + polish:** accessibility audit,
  performance/SEO pass.
- **Phase 5 — Ongoing:** grow the garden; produce the missing visual assets.

---

## Part IV — Production assets to create (tracked)
- **WHAT/HOW process diagram** (nimbleness hero visual) — co-design.
- **WCAG AA contrast scoreboard** visual (from the palette audit).
- **PetClear evolution sequence** (minimal v1 → inline exceptions → multi-screener).
- **COI looping GIF** of today's process (currently missing).
- **Verify the COI heatmap** is real data vs. illustration; label accordingly. Keep "projected"
  on the $500k and 30%→5%.

## Part V — Decisions (LOCKED)
1. **Base design system = Sean's CURRENT site (seanforquer.com), extracted from live
   computed styles** — supersedes both Commit Mono and Inter decisions. Tokens: native
   `system-ui` font stack; body 14px/20px `#333333`; strong titles `#101112` (600–700);
   secondary `#6C7581`; cards `#FAFAFB` w/ 1px `#EAEBEF` border, 16px radius; section
   headings 18px/600 preceded by a 4×24px rounded ACCENT BAR (red `#FF383C`, blue
   `#0088FF`, teal `#00C8B3`, gray `#6C7581`); white emoji interest chips; "•"-separated
   gray metadata; lat/long footer (39.9625° N, 83.0032° W). Approved additions from v2
   prototypes: one-line blurb + metadata under each work item; garden maturity DOTS
   (seedling=teal, growing=amber #D19B05, evergreen=blue) — no filled chips.
   Note: current case studies are PASSWORD-PROTECTED behind a Webflow gate — keep that
   capability available in the new build (per-study protection).
2. **Grayscale base, seeded from Sean's Foxen neutral ramp.** Semantic accents (green/red/
   yellow/blue) reused from the **Foxen palette audit** ONLY where functional — indicator chips
   (maturity/provenance/status) + success/error states. The site is built from the palette the
   crown-jewel story is about. Links = ink + underline; visible focus ring.
3. **"How I Operate" = its own page.** **About/Colophon = desktop pop-up modal / mobile full-
   screen bottom sheet**, triggered from an "about me" affordance.
4. **Maturity vocabulary: seedling → growing → evergreen** (provisional; prune later).
5. **Include the pre-Foxen archive** (Fifth Third, wayfinding, no-code builder) — kept LOW in
   the hierarchy.
6. **Replace "problem-first"** with a phrase drawn from "understanding is the work" (draft when
   we write Home copy).
7. **Expose NO personal names** anywhere (reconcile/remove "Brandon" etc.).
8. **Voice:** case studies in a unified house voice; garden stays provenance-varied.

---

## Part VI — What I recommend we do next
Start **Phase 0 + Phase 1**: stand up the Next/Tailwind/shadcn foundation with the grayscale +
mono system, then build **Home + the PetClear flagship** as the vertical slice that proves the
whole system. In parallel, we can co-create the two hero visuals the case studies need most (the
WHAT/HOW diagram and the WCAG scoreboard). Everything else layers on from there.
