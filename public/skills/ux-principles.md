---
name: "ux-principles"
description: "The UX design philosophy and principles for product design — the judgment layer for all product design work. Use this skill whenever designing, evaluating, critiquing, or implementing any product experience — including user-facing flows, multi-step forms, error states, upsell surfaces, or new patterns. It applies in every surface where design work happens: discovery and concepting sessions, design projects, and engineers' implementation sessions. It encodes how the team thinks about users, what good design means in this context, and the standards the design team holds for design decisions."
---

# UX Principles

This skill encodes the design philosophy, principles, and standards for product design. It is the **judgment layer** — use it to guide decisions about what to build, how flows should behave, and what "good enough" means. Pair with the **ui-reference skill** for component-level execution.

---

## Who the Users Are

This is B2B2C software. The end users do not choose the product — they are required to use it as a condition of a broader process (an application, agreement, or requirement). This shapes everything.

- The user base spans a wide demographic range
- Users arrive with varying levels of digital literacy — design to the **lowest common denominator** without being patronizing
- No assumed familiarity with the product — every interaction should feel self-explanatory on first contact
- **Default to simplicity and clarity over cleverness.** No jargon, no trendy interactions, no delight mechanics that could confuse or distract

---

## Risk-Adjusted UX

Not all software demands the same level of design accommodation. The product operates on a B2B2C spectrum, sitting closer to B2B than B2C in terms of user accommodation requirements.

**The key principle: the product has captive user attention.** Users are highly motivated to complete required processes because non-completion blocks something they need. The cost of abandonment is high for them.

This means:
- Experiences do not need to delight — they need to be **clear, functional, and completable**
- Function always wins over form
- Visual flair is a distraction, not an asset, in core flows
- "Good enough" is a legitimate bar — the goal is **zero support calls**, not awards

Do not over-engineer or over-polish unless there is a clear reason to do so.

---

## Design North Star

> **Minimize support calls. Maximize self-service completion.**

A well-designed flow is one where a user — regardless of age, tech literacy, or frustration level — can complete the required task without contacting support.

Every design decision should be filtered through this question: *does this make the flow easier to complete without help?*

---

## Pattern Philosophy

Borrow from **contemporary consumer software** that users are likely to already use. This is intentional — familiarity reduces friction.

When researching references and patterns, look for products that share these characteristics:
- **Status and action oriented** — surfaces that clearly communicate where a user is, what they need to do, and what has already been done
- **Data-dense but approachable** — products that handle a lot of information without overwhelming the user; clean hierarchy, clear labels, minimal decoration
- **Process and task driven** — flows designed to get users through something, not just browse; think financial, compliance, insurance, or utility-adjacent software
- **Mainstream and widely adopted** — patterns users are likely to have encountered before, not cutting edge or niche

The goal is that a user arriving at a screen for the first time feels oriented — not because we explained anything, but because the patterns feel familiar.

Avoid inventing new patterns when a familiar one exists and works.

---

## Core Flows and Failure Modes

The product supports a range of user-facing flows — enrollment reviews, multi-step information collection, document submission, real-time validation, and more. The principles in this skill apply across all of them, present and future.

The two examples below illustrate **how design decisions get made** when the stakes are high. Apply this same logic to any new flow.

### Example: Compliance Document Upload
Users upload a document that must meet specific externally defined criteria. The most common failure: users do not read requirements and upload non-compliant documents confidently.

**Illustrates:** Real-time validation, mid-flow error interruption, absorbing user confidence gracefully and redirecting without shame.

### Example: Guided Multi-Step Declaration
Users declare a status and submit supporting documentation (records, letters, photos, demographic info). Accuracy is critical — downstream decisions depend on this data.

**Illustrates:** Guided step-by-step collection, clear labeling of requirements, reducing ambiguity at every decision point.

---

## Error States and Validation

**Interrupt early. Interrupt clearly.**

- Surface errors **mid-flow** whenever technically feasible — do not wait for final submission
- A slower initial submission is acceptable if it reduces re-work loops
- Error messages must be **specific and actionable** — tell the user exactly what is wrong and exactly how to fix it
- Error states are a navigation tool, not a punishment — frame them as helpful redirects
- Never let a user feel lost in an error state

---

## Consistency and Component Discipline

Consistency is a core design value. Unfamiliar patterns create friction. Familiar ones disappear.

**Blast radius thinking:** Conservatism in design decisions should scale with surface area of impact.

- **Small blast radius** (isolated screen, single flow, one-off pattern): move fast, explore freely, try new approaches
- **Large blast radius** (shared components, cross-flow patterns, system-wide changes): be deliberate, justify the change, consider downstream impact

New components and patterns are welcome when:
1. The existing library cannot serve the need without being shoehorned
2. The new pattern is likely to remain isolated in scope
3. The pattern aligns with the product's ethos of simplicity and recognizability

Do not add new components to chase UI trends. Add them to solve real problems.

When a new pattern is introduced during a build, flag it explicitly so it can be documented and added to the design system.

---

## Implementation Standards

- Designs should be implemented **as close to spec as possible** — pixel fidelity matters
- If a design cannot be implemented faithfully, surface the constraint and propose the closest acceptable alternative — do not silently approximate
- When in doubt between two implementation approaches, choose the one that more closely matches the design intent

---

## Upsell and Marketplace Surfaces

Expanding into partnership and upsell patterns sits in tension with the core "function over form" philosophy. The resolution:

**Principle: Contextual utility over persuasion.**

Upsells should feel like a **logical next step**, not an interruption. The closer an offer is to what the user just did or is about to do, the more assertively it can be surfaced.

- Example: Offering a related add-on service immediately after a user completes a closely related task is contextually earned — it is service, not sales
- Banners, nudges, and inline offers are permitted when **contextually justified**
- Avoid urgency mechanics, dark patterns, and offers that feel random or unrelated to the user's current task
- Upsells should feel **calm, clear, and relevant** — not gimmicky or aggressive
- If an upsell cannot be justified by the user's immediate context, it should not be shown

The spirit: *every upsell should be able to answer the question "why is this relevant to this user right now?"*

---

## What This Skill Is Not

This skill is the judgment layer. It does not contain component definitions, spacing rules, typography specs, or code patterns. For those, refer to the **ui-reference skill**.

When a design decision requires both judgment (this skill) and execution (ui-reference), resolve the judgment question first, then execute within system constraints.
