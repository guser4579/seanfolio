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
- Skill files live in public/skills/*.md and render as inline SkillChip
  components in /design-at-foxen prose (see Design conventions). The page reads
  each file's line count with fs at build time; chip text is fetched from
  /skills/<file> on demand and cached per session.
- readTime is manual: 200 wpm, rounded up, min 1, counted over headings + body
  prose only. Recompute by hand when copy changes materially.

## Design conventions

- Tokens in app/globals.css, light/dark via [data-theme] on <html>. --mono is
  the mono stack, used for skill-file text, chip labels, section kickers, and
  the scroll-pill percentage.
- Accents: red #FF383C (hero/bio), blue #0088FF (my work), teal #00C8B3
  (thoughts). Featured thought = teal bar + "my favorite" token (li.feat).
- Radius: 12px for article-scale components, 24px for modals/sheets, 999px
  pills. Hairline dividers use 1px var(--line); study/thought h2s carry a
  border-bottom hairline.
- Type: chrome 14/20, article prose 16/24, study h1 22/30, h2 18/24.
- Numbered section kickers: every h2 in main.study and main.piece gets an
  automatic mono index ("01", "02"...) via CSS counters - blue on case
  studies, teal on thought pieces. No per-page markup; it just counts h2s.
- Full-bleed strips (.band) have NO background tint - frames sit directly on
  the page background in both themes. Do not reintroduce var(--band) there.
- Hover styles for touch-reachable components (.skillchip, .sq) are gated
  behind @media (hover: hover) so taps never leave a sticky hover state.
- Theme toggle cross-fades via the View Transitions API (Header.jsx); .vt-theme
  on <html> suppresses the body transition during it. Guarded by
  prefers-reduced-motion, like every animation in the file.

### Skill-file chips (components/SkillChip.jsx)

- Desktop: hover opens a scrollable mono peek with edge fade masks and a
  "click to read all N lines" hint; click opens a centered reading modal
  (680px, top 12%) with copy + download square icon buttons (.sq) and a subtle
  "[ESC] to close" hint. Copy/download flash a green check (icpop, re-keyed
  both directions) before reverting.
- Mobile: tap opens a full-height bottom sheet immediately - top at ~35% of
  the viewport (no progressive growth), 16px gutters, 16px + safe-area bottom
  offset, same slide-up/slide-down animations as the contact sheet. No ESC
  hint on mobile. The dialog container is programmatically focused on open;
  .skillmodal:focus outline is suppressed so no focus ring shows on tap.
- Scroll fades: .ft/.fb classes toggled from JS drive mask-image gradients so
  text gradually disappears at scrollable edges.

### Contact modal (components/Header.jsx)

- Same head grammar as the skill modal: hairline .modal-head with "Contact" at
  chrome scale, "[ESC] to close" hint (desktop only), and a square X (.sq) on
  both breakpoints. There is NO close pill. .modal-body scrolls under the
  pinned head with 16px padding, 24px bottom.
- Desktop: centered card, 560px, top 12%. Mobile: compact floating bottom
  sheet - 16px side gutters, 16px + safe-area bottom offset, animated dismiss
  (is-closing until animationend, 350ms fallback).
- The email row is a mono tap-to-copy button: text swaps to a green "copied"
  (swaptext animation, re-keyed both directions) and back after 1.4s. There is
  no mailto link.

### Password gate (components/Gate.jsx)

- Same generation: hairline .gate-head (muted lock icon + "Protected page" at
  chrome scale), .gate-body with 16px padding (24px bottom). The submit is a
  square arrow-right (.pw-submit) beside the input - no full-width pill and no
  key hint (Enter still submits; Sean removed the "[ENTER] to unlock" text).
- Back-navigation is intentional: the "back" breadcrumb uses real history when
  the visitor arrived in-app (restores page + scroll); direct entries fall
  through to a plain navigation home. Do not "fix" the scroll reset on fresh
  entries - there is no prior state to restore.

### movemoney gallery

- Band layout="mask" renders each screen in a 560px-tall bordered frame (12px
  radius); width follows the image aspect so the full screen is visible, no
  cropping. Images live in public/media/movemoney/ (mm1.png-mm12.png, 750x1900
  2x exports, ordered mm1->mm12). Do NOT add loading="lazy" to these imgs -
  Chrome silently never fetched them; they are intentionally eager. Always
  give gallery imgs explicit width/height attrs.

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
