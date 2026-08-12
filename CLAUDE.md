# CLAUDE.md

Sean Forquer's portfolio (seanforquer.com). Next.js 15 app router, no TypeScript.
Vercel auto-deploys production on every push to main (roughly 60-90s). There is
no staging branch; verify with npm run build locally before pushing.

## Structure

- lib/data.js is the single source of truth: WORK (case studies), THOUGHTS
  (thought pieces), JOBS (work history). Homepage lists and case-study heroes
  both render from it. For each WORK entry, blurb (homepage subtitle) and lede
  (case-study hero subtitle) must be identical - Sean's rule.
- app/<slug>/page.jsx - one route per case study / thought piece. Case studies
  use className "study", StudyHero, and ScrollProgress. Foxen case studies also
  render StudyCrossLink (points at /design-at-foxen). movemoney does not.
- Gated studies (flexible-patterns, claims, coi) sit behind Gate, driven by the
  CASE_STUDY_PASSWORD env var. design-at-foxen and movemoney are public.
- components/Header.jsx: BACK_ROUTES lists every route that shows the "back"
  breadcrumb instead of the primary nav. New case studies must be added there.
- readTime is manual: 200 wpm, rounded up, min 1, counted over headings + body
  prose only. Recompute by hand when copy changes materially.

## Design conventions

- Tokens in app/globals.css, light/dark via [data-theme] on <html>.
- Accents: red #FF383C (hero/bio), blue #0088FF (my work), teal #00C8B3
  (thoughts). Featured thought = teal bar + "my favorite" token (li.feat).
- Radius: 12px for article-scale components, 999px pills. Hairline dividers
  use 1px var(--line); study/thought h2s carry a border-bottom hairline.
- Type: chrome 14/20, article prose 16/24, study h1 22/30, h2 18/24.
- movemoney gallery: Band layout="mask" renders each screen in a 560px-tall
  bordered frame (12px radius); width follows the image aspect so the full
  screen is visible, no cropping. Images live in public/media/movemoney/
  (mm1.png-mm12.png, 750x1900 2x exports, ordered mm1->mm12). Do NOT add
  loading="lazy" to these imgs - Chrome silently never fetched them; they are
  intentionally eager. Always give gallery imgs explicit width/height attrs.

## Writing rules (hard rules)

- NEVER use em dashes anywhere, in any copy or code comment. Use " - " instead.
- Sean's prose voice is deliberately his own ("cumbersome, but mine"). Never
  rewrite his copy uninvited. Offer numbered callouts with suggested fixes and
  let him accept or reject each one individually.
- Foxen is "compliance tech" - never "fintech".
- No location references (Columbus or otherwise) anywhere: site, resume, meta.
- The MoveMoney company is written "CoinFX (MoveMoney)" in work history and on
  the resume.

## Resume

- Live file: public/SeanForquer_Resume.pdf (linked from the contact modal via
  RESUME_URL in lib/data.js).
- Source: docs/resume/resume.html. Regenerate by printing to PDF with headless
  Chromium at Letter size, margins: top 0.5in, bottom 0.55in, left/right 0
  (padding lives in the HTML). Liberation Sans / Arial. Two pages; keep a
  clear top margin on page 2.

## Open items

- Work history logos on the homepage (Sean will supply assets).
- Gallery frame height is 560px; if screens feel small, tune to 600-620px in
  .strip.masks .mask (one number in globals.css).
