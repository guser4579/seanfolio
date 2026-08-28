# seanfolio — PROJECT STATE (handoff doc)

> Read this first. Then docs/SYNTHESIS.md (who Sean is, all discovery), docs/PLAN.md
> (original IA/build plan, partially superseded by reality below), docs/case-study-template-spec.md,
> and docs/sean-writing-style/SKILL.md (MANDATORY for any prose under Sean's name).

## What this project is
Sean Forquer's portfolio, custom-built to land Head of Design roles at startups.
Primary: mature credible showcase. Secondary: living thought catalog ("thoughts").
North star: "a company should like me for the things I like about myself."

## Live infrastructure
- Site: https://seanfolio.vercel.app (production, live now)
- Repo: https://github.com/guser4579/seanfolio (private; Vercel auto-deploys main, ~25s)
- Stack: Next.js 15.x App Router, plain JSX (no TS), plain CSS in app/globals.css
  (NO Tailwind/shadcn - deliberate), system-ui font stack, zero other deps.
- Case-study gate: server-side. Cookie 'folio_gate' checked in each gated page;
  POST /api/gate compares to env CASE_STUDY_PASSWORD (set in Vercel = seanfolio2026).
  Gated: /flexible-patterns /claims /coi (all robots noindex). NOTE: folio_gate cookie
  is now secure ONLY in production (NODE_ENV check) so the gate works on the local dev
  server over http; for local gate testing add .env.local with CASE_STUDY_PASSWORD
  (gitignored; the var only lives in Vercel otherwise).
- DOMAIN CUTOVER DONE (July 26, 2026): seanforquer.com now points at the Vercel
  portfolio. Canonical is WWW (apex 308s to www.seanforquer.com); Sean edited the
  DNS himself (A -> 216.198.79.1, www CNAME -> vercel-dns) keeping Google nameservers
  and MX (Google Workspace email on the domain - NEVER switch nameservers to Vercel).
  Old Webflow site: custom domain removed; still reachable via its .webflow.io URL as
  reference. Verified post-cutover: gate blocks anonymous case studies, all images on
  all three studies load, no overflow. OPEN: new resume needed, hosted in /public
  (current footer resume link still points at Webflow CDN and dies if Webflow plan is
  cancelled); optionally set metadataBase to https://www.seanforquer.com in layout.jsx.

## How to deploy changes (CRITICAL - the cloud container CANNOT push)
> ENV NOTE (July 2026): work has moved to a LOCAL clone at ~/Documents/seanfolio, which is
> current with GitHub main. GitHub main remains the source of truth.
> PUSH PATH THAT WORKS FROM THE LOCAL CLONE (verified this session): the session shell has
> no stored git credential and no SSH key, so plain `git push` fails ("could not read
> Username"). Ask Sean for a fine-grained PAT (Contents: R/W on guser4579/seanfolio) and
> push inline WITHOUT persisting it:
>   git -c credential.helper= push "https://<PAT>@github.com/guser4579/seanfolio.git" main
> Then tell Sean to revoke the PAT. Vercel auto-deploys main. `npm install` + `npm run build`
> and `npm run dev -- -H 0.0.0.0` DO work locally (registry reachable; deps not committed).
> The Chrome/PAT-via-GitHub-API loop below was the OLD cloud-container workflow - not needed now.
The session git proxy blocks pushes to this repo and npm registry is firewalled.
The working loop: edit files locally in container (source of truth), then push via
the USER'S CHROME using claude-in-chrome javascript_tool on https://example.com:
GitHub contents API with Sean's fine-grained PAT (Contents R/W on guser4579/seanfolio).
Pattern: GET file for sha -> modify -> PUT {message, content: btoa(...), sha, branch:'main'}.
ENCODING TRAP: after atob(), the string is UTF-8 BYTES as latin1 chars. String-patch with
ASCII-only anchors and btoa() the result directly. NEVER run TextEncoder on it (double-
encodes, mojibake - this bug happened once). For full-file pushes, base64 the local file
in bash and paste. Ask Sean for a token if none is in this chat (he revokes old ones).
Vercel build log = the compiler; verify deploys at
vercel.com/seans-projects-27450eee/seanfolio/deployments (Sean logged into Vercel+GitHub
in Chrome). Screenshots of the live site verify visual changes.

## Design system (extracted from Sean's old site; locked)
Tokens in app/globals.css: body 14/20 #333; titles #101112 600-700; muted #6A6E7B
(re-based from #6C7581 to clear AA in light mode);
cards #FAFAFB, border #EAEBEF r16; accent bars 4x24 r999 (red #FF383C, blue #0088FF,
teal #00C8B3, gray); dots: new=teal, growing=amber #D19B05, evergreen=blue; link #2563EB;
pulse green #22C55E. SPACING LAWS (Sean enforces hard): 40px header->content; MIN 200px
content->footer; every gap set in exactly ONE rule (no compounding paddings/margins -
this class of bug bit three times); footer sticky-to-bottom on short pages (body flex
column, main flex:1); header/footer full-width 16px gutters; selected nav = 600 weight;
buttons 40px tall (10px pad on 20px line). Home: hero card w/ interests chips, my work
list (title+blurb+meta), thoughts list (dot • provenance • date), dashed hr.divider,
"work history" section. Contact = modal (desktop, 120px from top) / full-screen sheet
(mobile), NOT a page.

## Content status
- /flexible-patterns: VERBIAGE FINAL (Sean-approved). Structure: Background -> Overview ->
  Starting Simple -> Absorbing New Requirements (repository line, "Customers needed
  analysis...", 5 feature bullets, analysis-layer line, exception Fig) -> filmstrip Band ->
  The Graceful Expansion of Scope (3 paragraphs only, ends "one screening point among
  many") -> tabs Fig -> Outcome + formula. CONFIDENTIALITY: never name the next product
  or its timeline; no "AppClear", no "12 months" (Sean's explicit protect-Foxen rule).
- /coi: Sean's original text, essentially final. /claims: mostly his text; Outcome tail
  is a draft. Thought pieces: fluency-in-oneself (his essay verbatim; lede is
  draft), post-literacy (lede draft), medium-based-attention (raw note).
- REMOVED (July 2026): the /change case study ("Teaching a company to change", the
  WCAG/nimbleness forcing-function story that SYNTHESIS §3 calls the CROWN JEWEL) was
  CUT at Sean's request - he judged the written piece "bad". The story/spine still lives
  in SYNTHESIS §3 if it is ever revived, but it is no longer on the site. Work list is now
  three studies: flexible-patterns, claims, coi.
- ALL media are labeled placeholder frames ([ hero media - ... ]). Assets Sean owes:
  PetClear screens, COI heatmap + before/after flows + looping GIF, claims imagery,
  WHAT/HOW process diagram (change study), WCAG scoreboard visual, resume stays on
  Webflow CDN link for now.
- Old-site bugs are irrelevant (Webflow is being sunset).

## Working agreements with Sean
- Writing: ALWAYS per docs/sean-writing-style/SKILL.md. NO em/en dashes ever (spaced
  hyphen only). One thought per paragraph. No hype words. Show math. Captions lowercase
  + literal. Case studies = unified voice, closed timeless loops; thoughts = varied
  fidelity with provenance honesty.
- Process: mini-discovery ONE question at a time before designing; propose architecture,
  get sign-off, THEN touch code. He marks up screenshots in red ink; implement exactly,
  alter nothing else. Verify spacing in code before delivering (he has caught misses).
- New UI ships as a single-file HTML mock for Sean's review BEFORE any repo code.
- Always test on a REAL DEVICE via the local dev server before shipping. Desktop-only
  verification has shipped a mobile bug before (the .band 100vw overflow).
- He is the only designer at Foxen; imposter syndrome is real; reflect his wins back
  with evidence, never flattery. His unifying thread: "understanding is the work;
  derivation > the answer" (understated throughline, never announced on the site).
- No personal names of colleagues anywhere. No unshipped-product specifics.

## SHIPPED since the last STATE update (verified in code July 2026)
1. THEME SYSTEM - DONE, live. Sun/moon toggle in the header sub-bar
   (components/Header.jsx, .theme-toggle, icons swap on [data-theme="dark"]).
   Behavior: follow OS on first visit, then remember the choice - a no-flash inline init
   script in app/layout.jsx reads localStorage 'folio-theme', falls back to
   prefers-color-scheme, and sets data-theme on <html> before paint.
   Tokens: full [data-theme="dark"] block in app/globals.css (paper #16181D, title
   #F2F3F5, body #DEE1E7, muted #9BA1AD, plus dark accent ramp + button/thesis tokens
   and color-scheme). Both modes WCAG AA verified. Light muted re-based to #6A6E7B.
2. MOBILE BAND FIX - DONE, confirmed on a real device. The three case studies with a
   filmstrip <Band> used .band { width: 100vw }, which overflowed on mobile (100vw
   includes the scrollbar gutter / widens the iOS layout viewport). Under
   @media (max-width: 680px) the band now bleeds with fixed -16px left/right margins and
   width: auto. Desktop full-bleed is unchanged. NOTE: earlier attempts to fix this with
   overflow-x clip on body/html did NOT work on iOS and were reverted - do not retry them.

## WORKSTREAM 2 (READING HERO) - IN PROGRESS, first slice SHIPPED + live (July 2026)
Design decided WITH Sean and shipped:
- Hero is TITLE-DOMINANT and TYPOGRAPHIC ONLY (no hero image; media starts the body). The
  "flair" is the metadata structure itself, done in the site's existing type - NOT the
  bigger/mono/card treatment I first mocked (Sean hated that pass; match live tokens exactly).
- Case-study meta block: the .facts list is now VERTICALLY STACKED (flex-direction: column)
  - overline label + bold value per field, Company / Role / Year. Every Role = "Lead Product
  Designer". All THREE studies now show it (claims + coi previously had none).
- Single source of truth: components/StudyHero.jsx renders each study hero (title, meta-line,
  company/role/year) from lib/data.js by slug, so homepage and study pages can't drift.
- SHARE button (components/ShareButton.jsx, Lucide tray-and-arrow icon, lowercase "share")
  on the meta-row (right of the meta-line) for ALL case studies AND thought pieces. Native
  Web Share on https, clipboard/execCommand copy fallback + "copied" state on http.
- Hero meta-line = the homepage `meta` string verbatim (e.g. "$4M+ first-year bookings •
  Case Study • 2026"), so the outcome already lives in the meta-line.
- Mock lives at docs/mocks/hero-mock.html (approved reference for the stacked treatment).
STILL OPEN in workstream 2 (discussed, NOT built): read-time field, blurb/abstract in hero,
outcome-as-figure vs statement, tabs (agreed: ONE real tab "Case Study"/"Entry" now, grow
later), and the THOUGHTS meta-line question below.
DONE July 26, 2026 - provenance + maturity SUNSET SHIPPED (commit d10b1b2, live): topics
replaced provenance everywhere (self discovery / conversation summary / note), maturity
dots and their CSS removed, meta is now `topic • date`. Also shipped in that batch:
new intro copy ("where design doesn't exist yet" - zero-to-one positioning, matches the
new resume's opening line); fluency-in-oneself re-dated november 2025 with its lede
REMOVED; post-literacy lede rewritten + an ACADEMIC CITATION ROW in the hero (muted
"source" label + linked work/author, renders for any thought with a `source` object in
data.js - pattern chosen via Mobbin research, Airbnb editor's-note precedent); smart
back (real history back w/ scroll restoration; counts in-app navs because
document.referrer never updates on client-side transitions - referrer checks DO NOT
work); resume served from /public/SeanForquer_Resume.pdf via RESUME_URL (Webflow CDN
dependency GONE); Foxen work-history title aligned to Lead Product Designer;
metadataBase set. Sean DECLINED obfuscating homepage dollar amounts after counsel
(outcomes public, mechanics gated - the reasoning is on record in session logs).

## SHIPPED July 26, 2026 - REAL IMAGERY IN ALL THREE CASE STUDIES (live on prod)
All placeholder frames in the three studies are gone; assets live in public/media/<slug>/.
- Fig now takes src/alt (+ optional `natural` = render at natural size centered, for
  small sources that would upscale blurry - used by the claims original-form shot).
- Band has TWO real-image modes. (1) justified (flexible-patterns ONLY - Sean loves it
  there): flex-grow = aspect ratio, basis 0, row fills band edge-to-edge at equal
  heights, 1400px cap centered beyond. (2) `layout="natural"` (claims + coi - Sean
  REJECTED justified for claims; mimics the old Webflow strip he prefers): fixed 290px
  cards, top-aligned, group centers via first/last auto margins when viewport fits,
  otherwise plain left-anchored horizontal scroll; no chrome (exports carry baked
  corners/shadows). Do NOT swap modes between studies without asking.
- Heroes: flexible-patterns brand PNG, claims animated GIF, coi animated GIF (1.2MB -
  offered <video> conversion, not requested). coi Problem pairs heatmap + before-flow.
- Heatmap caption asserts real gaze data; Sean was asked twice re: SYNTHESIS accuracy
  flag (real vs illustrative) and shipped it as-is. His call, on record.
- Claims "distribution" placeholder = an acceptance-rate TABLE image (40% PM / 15%
  resident). screener_overview + screener_income (flexible-patterns) intentionally
  unused; the final "complete screening experience" collage was REMOVED from
  flexible-patterns (study ends on the outcome formula).
- Root-cause fix that ended the recurring mobile right-gutter bug: main.col/main.study
  now carry width:100% (see load-bearing comment in globals.css - body is a column
  flex container, auto margins disable stretch, .strip's intrinsic width blew main up
  to 680px on phones). Do not remove.
- Playwright lives in the SESSION SCRATCHPAD (not the repo) for full-page/mobile
  verification; the in-app browser pane has a 680px viewport floor and flaky
  screenshot capture - use headless Chromium for visual verification.

## LATER WORKSTREAMS:
2b. READING HERO + TABS (remaining): richer case-study/article hero (prominent title,
   author, date, tags, company, role, blurb?, read time, share) AND tab structure -
   case studies: tab 1 = short overview w/ all images, tab 2 = full study (then NO blurb
   in hero, just title + subtitle). Articles: full / abbreviated / favorite-quotes tabs.
   Tension to manage: feature-rich hero vs his "measured, content is the star" rule.
   Note the poetry: tabs-absorbing-new-requirements is his own PetClear thesis.
3. READING LAYER: scroll progress on studies/thoughts; maybe FAB while reading (what
   actions? discover); "inspired by" source links on thoughts (approved - academic
   citations, extends provenance honesty).
4. CONTACT MODAL RETHINK: he "weirdly hates" it. Discover WHY before changing. Lucide
   icons are candidate. Small, good palate cleanser.
Loop per workstream: mini-discovery -> single-file HTML mock (send rendered) -> red ink
-> implement in repo -> deploy -> screenshot verify.
