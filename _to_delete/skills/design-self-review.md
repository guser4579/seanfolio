---
name: "design-self-review"
description: "Mandatory pre-design-review self-check for product UI work. Use whenever an engineer finishes building or modifying any screen, component, or flow and before scheduling a design review with the product design team — or when the user says anything like \"run the design self-review\", \"check my UI\", \"am I ready for design review\", or \"review this against the design\". Audits the built UI against the ui-reference rules and the referenced Figma frame, fixes drift directly, verifies at every breakpoint, and produces a review report for the Jira ticket. Running this skill is a REQUIREMENT before a design review can be scheduled."
---

# Design Self-Review

This skill runs the product design team's review checks against built UI before the formal design review happens. It audits the work against the `ui-reference` contract and the referenced Figma frame, fixes drift directly, verifies rendered behavior at every breakpoint, and produces a review report. **Completing this self-review is required before scheduling a design review with Product Design.**

**Scope — the ride-along rule:** if the ticket's work touched any part of a modal or form surface, the *entire surface* is in scope for this review, not just the lines that changed. Leave the whole surface fully compliant with `ui-reference` on desktop and mobile web. This is the team's working agreement for paying down design debt without dedicated remediation tickets.

## Prerequisites

1. **A clean commit.** The working tree must be clean before the review runs — verify with `git status`, and have the engineer commit (or stash) outstanding work first. This is a requirement, not a suggestion: it ensures every fix this skill makes lands as an isolated, reviewable diff.
2. **Load the rulebook.** Read the `ui-reference` skill (the numeric contract: colors, containers, spacing, responsive behavior, components) and `ux-principles` (the judgment layer). Every check below is defined there — this skill orchestrates; those skills are the law.
3. **The Figma frame link is required.** Ask the engineer for it if not provided. It is the reference for *what* was designed.
4. **A running local build** of the screen(s) under review.
5. **Browser tooling if available** (Playwright MCP, Chrome DevTools MCP, Claude in Chrome, or similar). The visual pass depends on it; without it, the review degrades to static-only and the report must say so.
6. **Respect local `CLAUDE.md` preferences.** Follow the conventions in the repo's and engineer's `CLAUDE.md` files (build commands, code style, workflow) throughout the review and when making fixes. If a `CLAUDE.md` instruction conflicts with a `ui-reference` design rule, `ui-reference` governs the design outcome — record the conflict in the report's Flagged section.

## Hierarchy of truth — read this before checking anything

The Figma frame and the `ui-reference` skill answer different questions. Do not mix them up:

- **The frame answers "what":** which elements exist, hierarchy, copy, layout intent, which components are used, and which palette colors and type styles apply. Compare against it visually and structurally.
- **`ui-reference` answers "how much" and "how it behaves":** all spacing values, corner radii, container composition, action-region rules, and every piece of responsive/interaction behavior. **Never derive numeric spacing by measuring the Figma frame's layers** — the frames are hand-composed and layer geometry is not the spec. The skill's numbers are the spec.
- **Mobile interaction behavior is not in the frames at all.** Bottom sheets, sticky action bars, scroll clearance, and mobile spacing changes are specified only in `ui-reference` → Responsive Behavior. Never skip them because the design doesn't show them; their absence from the frame is expected.
- **Conflicts get flagged, never silently resolved.** If the frame appears to contradict a `ui-reference` rule, implement per `ui-reference` and record the discrepancy in the report's Flagged section — it is either drift in the frame or a deliberate exception, and only Product Design decides which.

## The review

### Pass 1 — Static code audit

Read the Razor/CSS that was built or changed and verify against `ui-reference`:

- **Color:** semantic tokens in component props; hexes (where legitimately raw) match the current palette exactly; warning states use Yellow (background Yellow 100, accent/text Yellow 900); nothing uses legacy palette values
- **Typography:** correct `Typo` usage per the scale (body1 vs body2 hierarchy, one h1 per page/dialog, subtitle2 for labels)
- **Spacing:** every margin/padding/gap value is on the approved eight-step scale (4, 8, 12, 16, 24, 40, 80, 120px); header pattern is 4px → 24px → 40px; no `--space-*` variable references
- **Containers:** outer contract (630px, 24px radius, 40px padding, 80px content-to-actions, 40px below actions); row containers (12px radius, 1px Gray 200, 16px/12px padding); correct selected-state behavior
- **Input fields:** value text 14px/20px desktop and 16px/24px mobile (44px/48px heights); 16px left and 12px top/bottom internal padding; static labels above the field with a 4px gap
- **Components:** right primitive for the job — banner vs toast vs dialog vs note container per the When/Why rules; `NoRecordsContent` on tables; `DropShadow="false"` where required
- **States:** empty, loading, error, and success states exist for every screen; error text is specific and actionable
- **Fix everything fixable directly.** This is a fixing pass, not just a finding pass.

### Pass 2 — Rendered verification

Using available browser tooling, load the local build and screenshot at three widths: **390px (`xs`), 768px (`sm`), 1280px (`md`)**. Verify what code-reading cannot:

- Rendered header spacing matches the 4/24/40 pattern
- Container framing, action-region composition (16px between buttons, 40px to bottom), and centering rules
- At `xs`: modals render as full-screen bottom sheets (no card chrome, 24px top padding, 16px gutters, centered header/subtext only); sticky action bar behaves correctly; long content scrolls with the final element able to rest 80px above the first button; on-page containers dissolve correctly and stay left-aligned
- Row/note container mobile gaps (12px icon-to-text, 16px between rows)
- 120px between final page content and the footer
- Compare each screenshot against the Figma frame for layout intent and hierarchy — a structural comparison, not pixel measurement

Fix what you find, then **re-render and re-verify after fixes**. If no browser tooling is available, complete Pass 1 and mark every Pass 2 item "Not verified" in the report.

### Pass 3 — The report

Produce a report with exactly these sections:

```
# Design Self-Review — [screen/feature] — [date]
## Checked        — what was audited, at which breakpoints, with what tooling
## Fixed          — each correction made, with the rule it enforces
## Flagged        — frame-vs-skill discrepancies and anything ambiguous, for Product Design's ruling
## Not verified   — anything that couldn't be checked, and why
```

**Post the report as a comment on the Jira ticket** if Atlassian tools are available; otherwise save it as `design-self-review-[ticket].md` and tell the engineer to attach it to the ticket. The report must exist before a design review is scheduled.

Report accurately: the Flagged and Not verified sections determine where the design review focuses, and recurring flags become new `ui-reference` rules. Do not omit uncertainty to make the report look clean — when in doubt, flag it.
