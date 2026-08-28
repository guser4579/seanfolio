# Case-Study Template Spec — extracted from all unlocked pages (July 2026)

## The three generations found on seanforquer.com
1. **2026 style** (/flexible-patterns — the PetClear study): hero brand image → thesis
   pull-quote (thick black left bar, larger gray text) → Background/Overview → bold
   sub-heads ("Starting Simple") → framed screenshots w/ centered italic gray captions.
2. **2025 style** (/claims, /coi): title + "$650k in savings • Case Study • 2025" meta →
   optional hero GIF → Overview/Problem/Solution/Outcome sections with hairline-underlined
   headings → prose in short breath-length paragraphs → full-bleed light-gray band with a
   horizontal filmstrip of screens → wide collage + caption → italic math/formula line.
   (COI title is CENTERED — the only one; claims is left.)
3. **2022–24 style** (/wayfinding-copy, /nocode, /53): structured key-value header
   (Company: / Position: / Year:) → Intro/Context/Overview prose. No site header/back bar
   on these pages.

## The writing page (/product-design-ai) — proto-thoughts template
Title → gray personal lede ("I look forward to revisiting this entry…") → tool chips
(Zapier · ChatGPT · Figma) + **green dot + date** (his existing convention — matches our
new "active" dot!) → bold sub-heads → prose.

## Unified template — component inventory (the "slots")
1. **Title block** — title left-aligned (unify; COI's centered was the outlier), meta line
   below ("<impact> • Case Study • <year>").
2. **Abstract facts row** (optional) — absorbs old Company/Position/Year key-values; also
   where role/scope can live for new studies.
3. **Hero media** (optional) — image or GIF, full column width, optional caption.
4. **Thesis pull-quote** (optional) — thick black left bar, 18–20px gray text. The 2026
   device; keep for new studies.
5. **Section heading** — hairline rule under heading (Overview / Problem / Solution /
   Outcome / Background — flexible labels).
6. **Sub-heading** — bold, same size as body (in-section beats like "Starting Simple",
   "Authenticated Experience Benefits").
7. **Prose** — short paragraphs, one thought each (his signature rhythm).
8. **Framed screenshot** — light border/soft frame + centered italic gray caption below.
9. **Full-bleed band** — light-gray edge-to-edge strip containing a horizontal filmstrip
   of screens (scrollable overflow in new build).
10. **Wide collage** — big composed image + caption.
11. **Formula/math line** — italic, for transparent savings math.
12. **Stat emphasis** — currently inline prose; keep prose-first (no new flashy component).
13. **Password gate** — done (gate.html).
14. Global rules: 40px header→content; 200px content→footer; back link in sub-header;
    footer w/ pulsing active dot.

## Fixes the new build makes silently
- Real semantic h1/h2/h3 (current headings are all Webflow DIVs), alt text everywhere.
- Consistent title alignment + site header on ALL pages (old studies lack header/back).
- Meta line: unify em-dash/bullet usage.

## Bugs found on the LIVE site (tell Sean; fix in new build)
1. /flexible-patterns: paragraph "Upon opening an application, the system immediately
   communicates the number of exceptions present…" appears TWICE in a row.
2. /wayfinding-copy: header says "Company: Foxen" but it's Gozio work (also titled
   "Position: Product Design Lead, Year: 2024" — verify).
3. Homepage lists claims study as "prevents errors"; the study page itself says "reduces
   errors" — pick one.
4. /claims: one image is broken/zero-size (claimmgmt.png [0x0]).

## Thoughts-piece template (for later, from /product-design-ai)
Title → gray lede (personal, time-aware note) → chips for tools/topics + dot + date →
bold sub-heads → prose. Maps 1:1 onto our thoughts metadata line (dot • provenance • date).
