---
name: "ui-reference"
description: "Tactical UI reference for building product UI (component source of truth is the shared component library). Use this skill whenever working on product UI — building new screens, adding components, choosing between layout patterns, writing Razor/MudBlazor markup, making HTML mockups of product screens, or deciding when to use a banner vs. toast vs. dialog. Covers banners, buttons, color tokens, containers, responsive behavior, dialog pop-ups, input fields, spacing rules, tables, toast messages, and typography. Also use it when the user asks about design decisions, component props, CSS classes, or \"why\" something is built a certain way."
---

# UI Reference

Tactical component reference for AI systems building product UI. Each entry documents **what** the component is, **when** to reach for it, and **why** — grounded in the companion UX principles. All component details are derived from the live component library and the companion Stories project.

> **Philosophy anchor:** Every decision should make the flow easier to complete without help. Function over form. Familiar patterns over clever ones. Zero support calls is the bar.

---

## Table of Contents

1. [Banners](#banners)
2. [Buttons](#buttons)
3. [Color](#color)
4. [Containers](#containers)
5. [Responsive Behavior](#responsive-behavior)
6. [Dialog Pop-ups](#dialog-pop-ups)
7. [Input Fields](#input-fields)
8. [Spacing Rules](#spacing-rules)
9. [Tables](#tables)
10. [Toast Messages](#toast-messages)
11. [Typography](#typography)

---

## Banners

### What

Banners are `MudAlert` components rendered inline within the page. They communicate persistent contextual status — something the user should know or act on before continuing.

**Component:** `MudAlert`  
**Variant:** Always `Variant.Text`  
**Severity levels (4):** `Info`, `Success`, `Warning`, `Error`

**Anatomy:**

| Slot | Description |
|---|---|
| Icon | Auto-provided by severity; override with explicit `Icon` param |
| Message | `MudText Typo.body1` inside the alert body |
| Action button (optional) | `MudButton Variant.Text Size.Small Color.Inherit` |
| Close button (optional) | `ShowCloseIcon="true"` |

**Styling:**

```razor
<MudAlert Severity="Severity.Warning"
          Variant="Variant.Text"
          Icon="@Icons.Material.Filled.Warning"
          ShowCloseIcon="true"
          Style="border-radius: 16px; border: none;">
    <MudText Typo="Typo.body1" Style="color: black;">
        Your insurance policy expires in 30 days.
    </MudText>
    <MudButton Variant="Variant.Text" Size="Size.Small" Color="Color.Inherit">
        Take Action
    </MudButton>
</MudAlert>
```

For app-wide dismissible banners add `Class="announcement__app-wide"`. The `ClientAnnouncement` component wraps a `section.section__announcements` and renders the appropriate severity from an `AnnouncementDto`.

**Background and border colors (from theme; see [Color](#color) for the authoritative palette):**

| Severity | Background | Border |
|---|---|---|
| Info | `--mud-palette-info-lighten` — Blue 100 (`#DDECFD`) | `--mud-palette-info` — Blue 500 (`#0969D7`) |
| Success | `--mud-palette-success-lighten` — Green 100 (`#DEF7E9`) | `--mud-palette-success` — Green 500 (`#1C9C55`) |
| Warning | `--mud-palette-warning-lighten` — Yellow 100 (`#FEF1CD`) | `--mud-palette-warning` — Yellow 900 (`#775803`) |
| Error | `--mud-palette-error-lighten` — Red 100 (`#FDE9E7`) | `--mud-palette-error` — Red 500 (`#DC2618`) |

### When

- A condition affects the user's ability to proceed or has a deadline (e.g., expiring insurance, required action)
- An announcement from the organization or system needs attention before the user continues their task
- A validation outcome or status needs to persist in view — not be dismissed after a few seconds

Do **not** use a banner for transient confirmation after an action (use a [Toast](#toast-messages) instead).

### Why

Users are task-focused and under mild duress — they're completing a required process, not exploring. Banners hold still: they stay in context, they don't disappear, and they give the user time to read at their own pace. The soft-fill + colored border approach (rather than a harsh filled background) signals urgency without aggression. Providing an inline action button directly in the banner removes a navigation step — the user sees the problem and the path to resolution in the same element, reducing the chance they'll miss the call-to-action and call support.

---

## Buttons

### What

All interactive triggers are `MudButton` or `MudIconButton`. Buttons are pill-shaped, shadowless, and capped at `22rem` width unless `FullWidth` is set.

**Key CSS applied globally (app.css):**

```css
.mud-button-root {
    padding: .75rem;
    line-height: 1.5rem;
    border-radius: 3rem;       /* pill shape */
    box-shadow: none !important;
}

.mud-button-root:not(.mud-width-full) {
    max-width: 22rem;
}
```

**Variants:**

| Variant | Use |
|---|---|
| `Variant.Filled` | Primary action — the thing you want the user to do |
| `Variant.Outlined` | Secondary / back actions — present but de-emphasized |
| `Variant.Text` | Tertiary or inline — minimal footprint |

**Colors:**

| Color | When |
|---|---|
| `Color.Primary` | Default action — solid button fills use Blue 700 (`#0451A9`) with white text |
| `Color.Default` | Secondary action (back, dismiss) |
| `Color.Success` | Confirming something positive |
| `Color.Warning` | Proceeding with a cautioned action |
| `Color.Error` | Destructive action (e.g., "Proceed anyway" in a destructive dialog) |

**States:** Default · Disabled (`Disabled="true"`) · With icon (`StartIcon`) · Loading (embed `MudProgressCircular`)

**CTA pair pattern (standard for workflow steps):**

```razor
<!-- Full-width stacked pair, 16px between buttons -->
<MudButton Variant="Variant.Filled" Color="Color.Primary" FullWidth="true">
    Submit application
</MudButton>
<MudButton Variant="Variant.Outlined" Color="Color.Default" FullWidth="true">
    Go back
</MudButton>
```

Stacked action buttons are centered within their action area with `16px` between them (see [Containers](#containers) for the full action-region rules).

**Icon buttons:**

```razor
<MudIconButton Icon="@Icons.Material.Filled.Close" Color="Color.Default" />
<MudIconButton Icon="@Icons.Material.Filled.Edit"  Color="Color.Primary" />
<MudIconButton Icon="@Icons.Material.Filled.Delete" Color="Color.Error" />
```

Always pass `DropShadow="false"` on `MudButton` inside dialogs and cards.

**Kebab menu (overflow menu) spacing:**

- `12px` top and bottom padding inside each menu row
- `1px` separators (Gray 200) between rows
- `24px` right inset; labels are right-aligned
- The meaningful negative space on the left comes from the menu's defined width and the label length — do not hardcode left padding. The component's existing width applies where one is defined; otherwise treat the left space as flexible

### When

- **Filled Primary:** Every step that advances a workflow — "Continue", "Submit", "Confirm"
- **Filled/Outlined Default:** Back navigation, secondary dismissal, non-destructive cancel
- **Text:** Inline actions where a full button would be visually heavy (e.g., "Take Action" inside a banner)
- **Icon button:** Single-icon actions where label is unnecessary (close, edit, delete row)

Use `FullWidth="true"` in dialogs and workflow steps. Avoid it in dense card or table contexts where horizontal space is shared.

### Why

The pill shape is chosen from the established consumer-app vocabulary users already know — it communicates "clickable CTA" without explanation. Removing box shadow eliminates visual noise and keeps the interface flat and readable. The `22rem` cap prevents a lone narrow button from stretching to absurd width on wide screens. Stacking the primary above the secondary (rather than side-by-side) makes the priority ordering unambiguous for users with lower digital literacy — there's only one obvious next step, and it's on top.

---

## Color

### What

The design system uses a token-based palette defined in `CustomMudTheme.cs` and exposed as MudBlazor CSS variables. All color usage should go through semantic theme tokens — never hard-coded hex values in components.

The authoritative palette lives on the **Colors page of the design system in Figma** and is **100% ADA compliant**. The scales below are transcribed from that page. If this file and Figma ever disagree, Figma wins and this file must be updated.

> **Theme sync note:** This palette replaces the previous one. `CustomMudTheme.cs` and `app.css` must be updated to these values — until that lands, live code may still emit legacy colors and should be corrected when touched.

**Gray (neutrals):**

| Scale | Hex | Role |
|---|---|---|
| Gray 900 | `#0A0C12` | Primary text (near-black) |
| Gray 700 | `#33363F` | Headings, strong text |
| Gray 500 | `#5B5F6B` | Secondary / body text |
| Gray 400 | `#6E7280` | Caption, placeholder text |
| Gray 300 | `#A9ADB8` | Disabled text & icons, decorative |
| Gray 200 | `#D6D9E0` | Borders, dividers |
| Gray 100 | `#EFF1F4` | Background fills |
| Gray 50 | `#FAFAFB` | Subtle background |
| White | `#FFFFFF` | White |

**Blue (brand + info):**

| Scale | Hex | Role |
|---|---|---|
| Brand Navy | `#142245` | Brand color |
| Blue 900 | `#03356D` | Chip/pill text, headings on light fills |
| Blue 700 | `#0451A9` | Solid fill with white text (buttons) |
| Blue 500 | `#0969D7` | Brand accent, links, primary fill |
| Blue 300 | `#A1C9F7` | Borders, hover tints |
| Blue 100 | `#DDECFD` | Chip/pill/banner background |

**Green (success):**

| Scale | Hex | Role |
|---|---|---|
| Green 900 | `#09532A` | Chip/pill text |
| Green 700 | `#0F7B3F` | Solid fill with white text |
| Green 500 | `#1C9C55` | Success accent, icons |
| Green 300 | `#A8E6C4` | Borders, hover tints |
| Green 100 | `#DEF7E9` | Chip/pill/banner background |

**Red (error):**

| Scale | Hex | Role |
|---|---|---|
| Red 900 | `#861B13` | Chip/pill text |
| Red 700 | `#B62116` | Solid fill with white text |
| Red 500 | `#DC2618` | Error accent, icons |
| Red 300 | `#F9CBC8` | Borders, hover tints |
| Red 100 | `#FDE9E7` | Chip/pill/banner background |

**Yellow (warning + highlight):** Yellow is the warning family.

| Scale | Hex | Role |
|---|---|---|
| Yellow 900 | `#775803` | **Warning text, icon, and border**; chip/pill text; solid fill with white text |
| Yellow 700 | `#A47904` | Accent (white text = large/UI only) |
| Yellow 500 | `#D19B05` | Highlight, data-viz (use dark text on top) |
| Yellow 300 | `#FBDF93` | Borders, hover tints |
| Yellow 100 | `#FEF1CD` | **Warning background** for banners, toasts, chips |

**Orange:**

| Scale | Hex | Role |
|---|---|---|
| Orange 900 | `#884307` | Chip/pill text |
| Orange 700 | `#BA5B08` | Solid fill with white text |
| Orange 500 | `#FBB582` | Accent, illustration |
| Orange 300 | `#FDD4AF` | Borders, hover tints |
| Orange 100 | `#FEECDC` | Chip/pill/banner background |

> **Note:** The Figma page currently labels Orange 500 as "Primary warning" — that annotation is outdated. Yellow is the warning family. Do not use Orange for warning states. The Figma annotation should be corrected.

**Purple (accent / data-viz):**

| Scale | Hex | Role |
|---|---|---|
| Purple 900 | `#301471` | Chip/pill text |
| Purple 700 | `#4A21AB` | Solid fill with white text |
| Purple 500 | `#6B3ADF` | Accent / data-viz |
| Purple 300 | `#C3AFF4` | Borders, hover tints |
| Purple 100 | `#EAE3FD` | Chip/pill background |

**Semantic state mapping (banners, toasts, chips):**

| State | Background | Accent (border/icon) | Text on tinted background |
|---|---|---|---|
| Info | Blue 100 | Blue 500 | Blue 900 or Gray 900 |
| Success | Green 100 | Green 500 | Green 900 or Gray 900 |
| Warning | Yellow 100 | **Yellow 900** | **Yellow 900** |
| Error | Red 100 | Red 500 | Red 900 or Gray 900 |

Warning intentionally breaks the "accent = 500" pattern: Yellow 500 and below fail ADA contrast on a Yellow 100 background, so warning uses Yellow 900 for text, icon, and border.

### When

- Use semantic tokens only — `Color.Primary`, `Color.Error`, etc. — in MudBlazor component props
- Reserve raw hex for inline SVG graphics and custom illustrations (e.g., `ConfirmationCard`, `StatusBar`)
- Scale roles are consistent across every color family: **100** for tinted backgrounds (banners, chips, acknowledgements), **300** for borders and hover tints, **500** for accents and icons, **700** for solid fills carrying white text, **900** for text sitting on a 100-level tinted background. Never use a 500-level color as a large background fill. (Exception: warning uses Yellow 900 for its accent — see the semantic mapping.)
- Gray scale: Gray 200 for borders and dividers; Gray 400 for placeholder and caption text; Gray 500 for secondary text; Gray 700 for headings; Gray 900 for primary text; Gray 100/50 for background fills
- Orange and Purple are for chips, highlights, illustration, and data visualization — never as additional semantic status colors. Yellow's 500/700 steps serve highlight and data-viz roles, but yellow as a state always means warning. The semantic system stays at four states: info, success, warning, error.

### Why

Semantic color usage — channeling everything through `--mud-palette-*` variables — means a single theme change propagates correctly without hunting for hard-coded values. The palette is built as full 100–900 scales with fixed role assignments per step, which removes the "which shade?" judgment call: backgrounds are always 100, accents always 500, text-on-tint always 900. The restricted 4-state semantic system (info/success/warning/error) gives users an immediately recognizable signal they've learned from every consumer app they use: blue = neutral info, green = good, yellow = caution, red = problem. Orange and purple exist for chips, highlights, and data visualization precisely so that no one is tempted to stretch the four semantic states to cover those needs. The entire palette is ADA compliant, which is not decoration — users span all ages and abilities, and contrast failures translate directly into support calls.

---

## Containers

### What

The container is the universal content wrapper. It is one primitive with three roles, and the composition contract is identical whether it appears inside a modal or directly on a page. Content inside can vary freely; the composition may not.

**1. Outer container (page card or modal shell)**

The large card wrapping an entire step, content block, or dialog body.

| Property | Value |
|---|---|
| Width | `630px` universal — for modals AND on-page containers — centered; `max-width: min(630px, calc(100vw - 2rem))` |
| Corner radius | `24px` |
| Internal padding | `40px` on all four sides (desktop) |
| Title → supporting text | `4px` |
| Final header element → content | `24px` (no supporting text? measure the `24px` from the title) |
| Between distinct content groups | `40px` |
| Content → actions | `80px` between the final content element and the first action button |
| Final action button → container bottom | `40px` |
| Fill | White |

**Action region (desktop and mobile):** white background; buttons stacked, centered, and full width within the available action area; `16px` between action buttons; `40px` total between the final button and the bottom of the container (or the visible mobile-browser viewport — do not add `env(safe-area-inset-bottom)` on top; the rendered distance must total `40px`). Horizontal inset: `40px` on desktop, `16px` on mobile web. When the region is sticky or fixed, use `24px` above the first button.

**Long content:** in short desktop containers, actions sit in normal flow with a literal `80px` gap after the final content element. In long desktop modals (viewport caps the modal at `90vh`) and mobile bottom sheets, the action region stays fixed or sticky while the content scrolls — and at the absolute end of the scroll, the final content element must be able to rest `80px` above the first action button. The scrollable content region therefore reserves bottom clearance equal to the full action-region height plus `80px`. Never let action buttons scroll out of view.

**2. Row container (inner)**

The outlined, rounded row stacked in lists inside an outer container. Slots are flexible — leading icon or radio, title/support text, trailing chip, button, or nothing.

| Property | Value |
|---|---|
| Corner radius | `12px` |
| Border | `1px` Gray 200 (`#D6D9E0`) |
| Fill | White |
| Internal padding | `16px` left/right · `12px` top/bottom (desktop and mobile) |
| Icon → text gap | `8px` desktop · `12px` mobile web |
| Gap between stacked rows | `12px` desktop · `16px` mobile web |

**Selected state (selectable rows, e.g. radio options):** the radio fills Blue 500 with no stroke, the row background fills from white to Blue 100, and the row border is removed. All three changes happen together.

**Related: input fields** share the row container's visual language everywhere (in or out of a container): `12px` radius, `1px` Gray 200 border, `16px` left internal padding, `12px` top/bottom internal padding. See [Input Fields](#input-fields).

**3. Note container**

The tinted, borderless variant for calm contextual information (e.g., a privacy note under a share link). It annotates another element and usually sits directly below it.

| Property | Value |
|---|---|
| Fill | 100-level of a color family, no border — **Blue 100 (`#DDECFD`) is the default** for neutral info |
| Corner radius | `12px` |
| Internal padding | `16px` left/right · `12px` top/bottom |
| Text color | Gray 900 (`#0A0C12`) — usually; accent text (e.g., a 900-level stat callout) is allowed when highlighting |
| Gap to the element it annotates | `16px` vertical |

The general pattern: **100-level background + Gray 900 text.** The family follows context — Blue 100 for neutral notes (the default), Green 100 when highlighting something positive (e.g., a program benefit stat), Yellow 100 for warning notes. Don't reach past Blue without a contextual reason. Use a [Banner](#banners) instead when the message needs severity iconography and standard alert anatomy.

### When

- **Outer container:** every modal body and every on-page step or content block. If content is being defined and wrapped, it lives in one of these.
- **Row container:** options the user picks from, records in a list (application history), requirement callouts, any repeated unit inside an outer container.
- **Note container:** supporting context that should sit visually inside the flow without severity urgency.

### Why

The container is the most-repeated compositional element in the product, which makes it the highest-leverage place for consistency — and the fastest place for drift to accumulate. The contract (24px radius / 40px padding / 24px header-to-content / 80px content-to-actions / 40px below actions on the outer; 12px radius with 16px/12px padding on the inner) is deliberately small enough to memorize: content shifts freely inside, but the frame never changes, so every screen reads as the same product. The fixed-bottom actions rule exists because the CTA is the single most important element on the screen for task completion — a user who has to hunt for a scrolled-away button is a support call. The selected state triples the signal (radio fill + background fill + border removal) so lower-digital-literacy users never have to squint at a radio dot alone to know what they chose.

---

## Responsive Behavior

### What

Breakpoints follow MudBlazor's built-ins:

| Viewport | MudBlazor | Treatment |
|---|---|---|
| < 600px | `xs` | **Mobile rules below** |
| 600–960px | `sm` (tablet) | Desktop composition; the 630px container is capped by `max-width: min(630px, calc(100vw - 2rem))` |
| ≥ 960px | `md` and up | Desktop composition |

**Modals on mobile (`xs`) → full-screen bottom sheet:**

- The dialog card dissolves: no border, no visible container chrome — a white sheet fills the screen
- `24px` top padding above the header text
- `16px` left/right gutters
- **Header and subtext center-align.** Body content — rows, forms, paragraphs, notes — stays left-aligned
- Action buttons become **sticky to the bottom of the visible viewport** in a white action bar: `16px` horizontal inset, `24px` above the first button, `16px` between buttons, and `40px` total between the final button and the visible bottom of the mobile-browser viewport — do not add `env(safe-area-inset-bottom)` on top of the `40px`; the rendered distance must total `40px`. Content scrolls underneath the bar
- The `80px` content-to-actions rule still applies at the end of the scroll: the scrollable content reserves bottom clearance equal to the full action-region height plus `80px`, so the final content element can rest `80px` above the first button

**On-page containers on mobile (`xs`):**

- The container dissolves into the page: border, radius, and visible card treatment removed; white background; content flows with `16px` left/right gutters and `24px` top padding
- **Everything stays left-aligned**, including headers. Unlike a bottom sheet, an on-page container shares the screen with a top nav (logo, hamburger menu) and other components; it is a component on a page, not a focused ceremony
- It is *not* a bottom sheet — visually similar treatment, technically a different thing

**Row and note containers on mobile:**

- Radius, border, fill, and internal padding (`16px`/`12px`) are unchanged — but the gaps widen for touch: `12px` between an icon or radio control and its text (vs. `8px` on desktop), and `16px` between stacked rows (vs. `12px` on desktop)
- Input field composition is unchanged except value text: `16px/24px` on mobile (see [Input Fields](#input-fields))
- `.input-row` side-by-side pairs stack to a single column on `xs`

**Page ending (all viewports):** `120px` between the final page content and the footer — the global page-ending rule holds on mobile web.

### When

- Apply mobile rules at `xs` only; tablets (`sm`) get the desktop composition, which already fits via the max-width cap
- Center only the modal header + subtext on mobile — never body copy, forms, lists, or anything on-page

### Why

The bottom sheet is the contemporary mobile-native pattern users already know from every consumer app — keeping a floating 630px card on a 390px screen reads as broken, not familiar. Centered header/subtext works on a sheet because it's a focused, single-purpose ceremony with short ceremonial text; body content stays left-aligned because multi-line centered text is measurably harder to read, especially for lower-literacy users — every line starts in a different place. On-page containers stay fully left-aligned because a page is a working context, not a ceremony, and mixed alignment amid nav and other components breaks scanning. Sticky viewport-bottom actions serve the same goal as the desktop fixed-bottom rule: the CTA must never be lost below a scroll — but the reserved clearance (action-region height + 80px) matters just as much, because content trapped behind the action bar is content a user will never read.

---

## Dialog Pop-ups

### What

Dialogs use `AppDialog` (the shared wrapper component) or a direct `MudDialog` with the standard class set. They are always launched via `IDialogService` with the canonical `DialogOptions`. On mobile (`xs`), dialogs become full-screen bottom sheets — see [Responsive Behavior](#responsive-behavior).

**Container specs (app.css):**

```css
.dialog__base.mud-dialog {
    width: 630px;
    max-width: min(630px, calc(100vw - 2rem));
    padding: 40px;
    border-radius: 24px;
    max-height: 90vh;
}
```

**Canonical `DialogOptions`:**

```csharp
new DialogOptions {
    FullWidth = true,
    MaxWidth = MaxWidth.Medium,
    Position = DialogPosition.TopCenter,
    CloseOnEscapeKey = true,
    CloseButton = false,
    BackdropClick = true,
    BackgroundClass = "dialog__background",
}
```

**Dialog types:**

| Type | Class | Use |
|---|---|---|
| Default (read-only) | `dialog--default` | Informational; confirms or dismisses |
| Consent (interactable) | `dialog--consent` | Contains form inputs, checkboxes, multi-step |

Both types use the same header pattern: `4px` from title to supporting text, `24px` from the final header element to the content. `40px` is used only between meaningfully distinct content groups, never between the dialog header and its first content.

**`AppDialog` parameters:**

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `DialogType` | `string` | `"Default"` | `"Default"` or `"Consent"` |
| `TitleText` | `string` | — | Rendered as `Typo.h1` |
| `SubText` | `string` | `""` | Rendered as `Typo.body2` below title |
| `ContentText` | `string` | `""` | Plain text body (Default type) |
| `ContentMarkupString` | `MarkupString?` | `null` | Rich HTML body |
| `CustomContent` | `RenderFragment?` | `null` | Interactive content slot (Consent type) |
| `PrimaryButtonText` | `string` | `""` | Filled primary action |
| `SecondaryButtonText` | `string` | `""` | Filled secondary / cancel |
| `PrimaryColor` | `Color` | — | |
| `SecondaryColor` | `Color` | — | |
| `OnSubmit` | `EventCallback` | — | Override default close behavior |
| `OnCancel` | `EventCallback` | — | Override default cancel behavior |
| `RedirectLinkOnClose` | `string` | `""` | Navigate on submit instead of closing |

**Actions area:** Buttons are stacked vertically, centered, full-width within the action area, pill-shaped, `DropShadow="false"`. `80px` separates the final content element from the first action button, `16px` separates stacked buttons, and `40px` sits between the final button and the bottom of the container. See [Containers](#containers) for the sticky action-region rules on long content.

**Destructive variant** (use `DestructiveDialog` or set colors manually): primary button is `Color.Primary` ("I changed my mind" / safe path), secondary is `Variant.Text Color.Error` ("Proceed anyway" / destructive path). This is intentional — the safe path is visually dominant.

### When

- **Default dialog:** Confirming a non-destructive action ("Submit application?"), delivering important information that requires acknowledgement ("Renewal available")
- **Consent dialog:** Any flow step that contains interactive inputs, checkboxes, multi-step forms, or legal text the user must scroll and accept
- **Destructive dialog:** Irreversible actions where the user might regret proceeding (unenrollment, account closure, data deletion)

Do **not** use a dialog for:
- Errors that can be shown inline on the page
- Navigation confirmations that could be a simpler back button
- Information so brief it could be a toast

### Why

Dialogs interrupt the page — that interruption is the point. For consequential actions (consent, confirmation, destructive paths), forcing the user out of the ambient page context and into a focused overlay reduces the chance they miss the weight of what they're about to do. The `TopCenter` position and `90vh` max-height keep the dialog anchored in the user's viewport, avoiding situations where the CTA is below the fold on short screens. The destructive button hierarchy (safe action on top, filled; destructive below, text-styled) embeds friction into the most dangerous path without hiding it — a user can still proceed, but they have to choose the less prominent option, which reduces accidental destructive submissions.

---

## Input Fields

### What

All text inputs, selects, and search fields use MudBlazor form components with `Variant.Outlined`. Custom styling (app.css) unifies border radius, height, label behavior, and validation messages.

**Styled defaults (app.css):**

```css
/* Border radius on outlined inputs */
.mud-input.mud-input-outlined .mud-input-outlined-border { border-radius: .75rem; }

/* Standard input: 44px total height on desktop —
   14px/20px value text + 12px top/bottom padding + 16px left padding */
.mud-input > input.mud-input-root {
    font-size: .875rem;      /* 14px */
    line-height: 1.25rem;    /* 20px */
    height: 2.75rem;         /* 44px */
    padding: .75rem 1rem;    /* 12px top/bottom, 16px left/right */
}

/* Read-only inputs get gray fill */
.mud-input > input.mud-input-root-outlined[readonly] {
    background: var(--mud-palette-gray-lighter);
    border-radius: .75rem;
}
```

> **Code sync note:** legacy app.css uses a `3rem` (48px) input height with 16px value text on desktop. The spec above is authoritative; correcting the code is tracked as design debt.

**Mobile web:** input value text is `16px/24px` (total height 48px). Do not use 14px input text on mobile — iOS Safari auto-zooms any focused input with text smaller than 16px.

**Components and when to use each:**

| Component | Use |
|---|---|
| `MudTextField<T>` | Free text, email, numbers, multiline (`Lines` prop) |
| `MudSelect<T>` | Fixed option list (single or multi: `MultiSelection="true"`) |
| `MudAutocomplete<T>` | Searchable list, large option sets |

**States:**

| State | How |
|---|---|
| Default (empty) | No additional props |
| Filled | Value pre-set |
| Helper text | `HelperText="..."` |
| Read-only | `ReadOnly="true"` — gray background, still focusable |
| Disabled | `Disabled="true"` — grayed out, not focusable |
| Error | `Error="true" ErrorText="Specific fix instruction"` |
| Multiline | `Lines="3"` (or more) |

**Composition rule (applies to every input field, inside a container or not):** `12px` corner radius, `1px` Gray 200 border, `16px` left internal padding, `12px` top/bottom internal padding, value text `14px/20px` on desktop (`16px/24px` on mobile web), total height `44px` desktop / `48px` mobile.

**Label behavior:** Labels are static and sit directly above the input field: `Subtitle2` (14px), with a `4px` gap between the label and the field. Do not implement floating or animated labels. Required fields render a `*` suffix via CSS content on `.mud-input-required` labels.

**Validation:** Always use `DataAnnotationsValidator` inside `EditForm` and bind `For="@(() => _model.Field)"` on each field. Error text appears in `Subtitle2` weight below the input.

**Side-by-side layout:**

```css
.input-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}
```

Use `.input-row` for naturally paired fields (first name / last name, city / state). Do not use it for unrelated fields just to save vertical space.

**Acknowledgement (checkbox + label):**

The `Acknowledgement` component wraps `MudCheckBox` in a bordered card for legal consent statements. Parameters: `Label` (uppercase, medium weight), `Description` (body text), `Value` (bool binding), `For` (validation expression). Errors render in red below the card via `ValidationMessage`.

### When

- Text inputs: any free-form value the user must provide — email, name, policy number, dates
- Select: when the valid values are a closed, known set (e.g., state, category, type)
- Autocomplete: when the valid set is large (e.g., a long reference list) or the user benefits from filtering
- Read-only: system-known values the user should see but not change (e.g., an account number pre-filled from the system)
- Disabled: fields that will be editable after some other condition is met
- `Acknowledgement`: legal consent text that must be explicitly checked before proceeding

### Why

`Variant.Outlined` is the only variant used — it creates a clear visual boundary around the input field, making it obvious what is interactive and where the user types. This matters for users with lower digital literacy who might not recognize a borderless underline input as a text field. Rounded corners (`0.75rem`) keep inputs visually consistent with the rest of the design system (cards, dialogs). The gray background on read-only fields is a deliberate signal: "this is information, not an input" — it prevents users from attempting to click and edit pre-filled system data, reducing frustration and confusion. Error text must be specific and actionable (not "Invalid value") because error states are a navigation tool, not a punishment.

---

## Spacing Rules

### What

Spacing uses a **fixed eight-step scale**. These are the only approved spacing values — not every multiple of 4px is valid.

**Approved scale — write these as raw rem values.** There are no `--space-*` CSS variables defined in app.css; referencing one would silently render as no spacing at all. The step names are nomenclature for design conversation, not code tokens.

| Step | px | rem |
|---|---|---|
| space-1 | 4px | 0.25rem |
| space-2 | 8px | 0.5rem |
| space-3 | 12px | 0.75rem |
| space-4 | 16px | 1rem |
| space-5 | 24px | 1.5rem |
| space-6 | 40px | 2.5rem |
| space-7 | 80px | 5rem |
| space-8 | 120px | 7.5rem |

`20px`, `32px`, `48px`, `64px`, `96px`, and `112px` are **not approved spacing values**. This restriction applies to spacing — margins, padding, gaps — not to unrelated dimensions such as component width, height, or corner radius.

**Spacer utility classes (app.css)** — for explicit vertical breathing room between page sections; every utility maps to the approved scale:

| Class | Height |
|---|---|
| `.spacer__x-small` | 1rem (16px) |
| `.spacer__small` | 1.5rem (24px) |
| `.spacer` | 2.5rem (40px) |
| `.spacer__large` | 5rem (80px) |

**Canonical header spacing** — applies to modal headers, on-page container headers, and subsection headers alike:

| Pairing | Value |
|---|---|
| Title → supporting text | `4px` |
| Final header element → content | `24px` (when there is no supporting text, measure the `24px` from the title) |
| Distinct content group → next distinct content group | `40px` |
| Subtitle2 label + Body1 value (row) | `4px` between label and value · `16px` between rows |
| Overline → content | `8px` |
| Body content → Caption note | `16px` |

Use `40px` only between meaningfully distinct content groups — never between a header and its first content.

**Dialog/container-specific:**
- Container padding: `40px` all sides (desktop)
- Header → content: the canonical header pattern above, identical for Default and Consent dialogs
- Content → actions: `80px` (see [Containers](#containers) for the full action-region rules)
- Final action button → bottom of container: `40px`

**Page-ending rule (global — desktop and mobile web):**
- Final page content → footer: `120px`. This exists to preserve intentional negative space at the bottom of every page.

**Input-specific:**
- `input-row` gap: `1.5rem` (24px)
- Form group `margin-top`: `24px`
- Label → input field: `4px`
- Helper/error text `margin-top`: `0.25rem`

### When

- Write spacing as raw rem values from the approved eight-step scale in component-scoped styles and inline style blocks — never `--space-*` variables, and never off-scale values (no 20px, 32px, 48px, 64px, 96px, or 112px)
- Use `.spacer`, `.spacer__small`, etc. for explicit vertical rhythm between major page sections when a CSS gap on a parent isn't appropriate
- Follow the canonical header spacing table exactly — do not invent new heading-to-content gaps
- End every page with `120px` between the final content and the footer

### Why

A fixed eight-step scale eliminates the "looks about right" judgment call even more aggressively than a grid — if a value isn't one of the eight approved steps, it's wrong, full stop. This keeps screens visually harmonious across features built by different developers at different times. The canonical header table exists because the relationship between a heading and its supporting text is one of the most repeated layout patterns in the product; standardizing those gaps means every page feels like it was composed by the same hand, even when it wasn't. Consistency here directly serves the "zero support calls" goal: users internalize the page rhythm quickly and know where to look for context, labels, and CTAs without thinking about it.

---

## Tables

### What

Two table primitives are used, each for a distinct purpose.

**1. `MudSimpleTable` — label/value pairs**

Use for read-only key/value display (personal info review, policy details, lease summary). Elevation 0. Last column right-aligns automatically via CSS.

```razor
<MudSimpleTable Elevation="0">
    <MudTr>
        <MudTd Class="label">First/Last Name</MudTd>
        <MudTd>Jane Doe</MudTd>
    </MudTr>
    <MudTr>
        <MudTd Class="label">Email Address</MudTd>
        <MudTd>jane.doe@example.com</MudTd>
    </MudTr>
</MudSimpleTable>
```

**2. `MudTable<T>` — data tables**

Use for multi-row, multi-column data where rows are comparable records. Standard options: `Hover="true" Striped="true" Elevation="0" Outlined="true"`.

```razor
<MudTable T="MyRow" Items="@rows" Hover="true" Striped="true" Elevation="0" Outlined="true">
    <HeaderContent>
        <MudTh>Name</MudTh>
        <MudTh Style="text-align: right;">Balance</MudTh>
    </HeaderContent>
    <RowTemplate Context="row">
        <MudTd>@row.Name</MudTd>
        <MudTd Style="text-align: right;">@row.Balance</MudTd>
    </RowTemplate>
    <NoRecordsContent>
        <MudText Typo="Typo.body2" Color="Color.Default" Align="Align.Center" Class="py-6">
            No records found
        </MudText>
    </NoRecordsContent>
</MudTable>
```

**CSS (app.css):**

```css
.mud-simple-table table * tr > td, th {
    padding: .75rem 1.5rem;
    border-bottom: 1px solid var(--mud-palette-gray-lighter);
}

/* Last column right-aligns automatically */
.mud-simple-table table * tr > td:last-of-type { text-align: end; }

/* Last row loses bottom border */
.mud-simple-table tr.mud-table-row:last-of-type { border-bottom: 0; }
```

Status chips inside table cells use `MudChip` with `Variant.Outlined Size.Small` and the appropriate `Color` (Success for current, Error for past due, Warning for pending, Default for neutral).

**Always provide `NoRecordsContent`** on `MudTable` — an empty table with no message is confusing.

### When

- `MudSimpleTable`: review screens, detail panels, anywhere you're displaying structured attributes of a single record
- `MudTable<T>`: lists of comparable records with multiple attributes (user roster, payment history, record list)
- Do not use `MudTable` for a single record with multiple fields — use `MudSimpleTable` or a card layout

### Why

`MudSimpleTable` gives label/value data the structure of a table without the visual weight of a full data grid — it's scannable, it right-aligns values naturally (so numbers and identifiers line up for quick comparison), and it disappears visually behind the content rather than drawing attention to itself. `MudTable` with `Outlined` and no elevation uses the same light border language as cards and inputs — the whole page reads at the same visual depth. Striped rows give users a horizontal guide across dense data without adding a separate color or breaking the neutral palette. The `NoRecordsContent` slot is non-negotiable: an empty table with only column headers makes users think something broke, which is a support call waiting to happen.

---

## Toast Messages

### What

Toasts are transient notifications delivered via `ISnackbar`. They appear briefly, then disappear — they do not interrupt the user's task.

**Invocation pattern:**

```csharp
@inject ISnackbar Snackbar

Snackbar.Add(message, severity, options => {
    options.SnackbarVariant = Variant.Text;
    options.SnackbarTypeClass = cssClass;  // "toast--info" | "toast--success" | "toast--warning" | "toast--error"
    options.InfoIcon    = Icons.Material.Filled.Info;
    options.SuccessIcon = Icons.Material.Filled.CheckCircle;
    options.WarningIcon = Icons.Material.Filled.Warning;
    options.ErrorIcon   = Icons.Material.Filled.Error;
    options.HideTransitionDuration = 0;     // instant removal
    options.ShowTransitionDuration = 250;   // 250ms ease-in entry
});
```

**Styling (scoped CSS per usage or global; colors follow the [semantic state mapping](#color)):**

```css
.mud-snackbar {
    border-radius: 16px !important;
    border: none !important;
    box-shadow: none !important;
}

.mud-snackbar .mud-snackbar-content-message { color: black !important; }

/* Background + icon color per severity */
.mud-snackbar.toast--info    { background-color: #DDECFD !important; }           /* Blue 100 */
.mud-snackbar.toast--info .mud-snackbar-icon    { color: #0969D7 !important; }   /* Blue 500 */

.mud-snackbar.toast--success { background-color: #DEF7E9 !important; }           /* Green 100 */
.mud-snackbar.toast--success .mud-snackbar-icon { color: #1C9C55 !important; }   /* Green 500 */

.mud-snackbar.toast--warning { background-color: #FEF1CD !important; }           /* Yellow 100 */
.mud-snackbar.toast--warning .mud-snackbar-icon { color: #775803 !important; }   /* Yellow 900 */

.mud-snackbar.toast--error   { background-color: #FDE9E7 !important; }           /* Red 100 */
.mud-snackbar.toast--error .mud-snackbar-icon   { color: #DC2618 !important; }   /* Red 500 */
```

Severity levels mirror banners: `Severity.Info`, `Severity.Success`, `Severity.Warning`, `Severity.Error`.

### When

- After a **successful action** that completes without a full page transition (file saved, enrollment confirmed, preference updated)
- For **brief status feedback** that doesn't require further action from the user
- When the confirmation is **low stakes** and the user is mid-flow and should return their attention to the page immediately

Do **not** use a toast for:
- Errors that require the user to do something — use an inline error or banner
- Confirmations of destructive actions — use a dialog
- Persistent information the user might need to reference — use a banner

### Why

Toasts respect the user's attention. They confirm that something worked ("Your payment was processed") and get out of the way. The 250ms ease-in / instant-out transition timing is deliberate: the entry is smooth enough not to startle, and the removal is instant so the dismissed state doesn't linger and distract. Matching the soft-fill color treatment from banners means the severity system is visually consistent regardless of whether the message is persistent or transient — users don't have to learn two different color codes. Keeping toasts for low-stakes, action-complete scenarios (rather than errors) ensures they stay associated with positive or neutral outcomes, not anxiety-inducing ones.

---

## Typography

### What

All type is set in **Poppins** (fallback: Helvetica, Arial, sans-serif). The type scale is defined in `CustomMudTheme.cs` and applied via MudBlazor's `Typo` enum.

**Type scale:**

| Typo | Size | Weight | Line Height | Notes |
|---|---|---|---|---|
| `Typo.h1` | 1.5rem | 500 | 2 | Page titles, dialog titles |
| `Typo.h2` | 1.125rem | 500 | 2 | Section headers |
| `Typo.h3` | 1rem | 600 | 1.5 | Sub-section headers, card titles |
| `Typo.h4` | 1rem | 500 | 1.5 | Minor headers |
| `Typo.h5` | 0.875rem | 600 | 1.375 | Small labeled sections |
| `Typo.h6` | 1rem | 500 | 1.6 | Undefined in design; use sparingly |
| `Typo.body1` | 1rem | 500 | 1.5 | Body medium — primary readable text |
| `Typo.body2` | 1rem | 400 | 1.5 | Body regular — supporting text, descriptions |
| `Typo.subtitle1` | 0.875rem | 500 | 1.45 | Support text medium |
| `Typo.subtitle2` | 0.875rem | 400 | 1.43 | Support text regular, field labels |
| `Typo.caption` | 0.875rem | 400 | 1.25 | Italic, secondary color — footnotes, disclaimers |
| `Typo.overline` | 0.875rem | 500 | 1.25 | Uppercase — category labels, section accents |
| `Typo.button` | 1rem | 500 | 1.5 | Capitalize transform — auto-applied to button labels |

**Utility classes (app.css):**

| Class | Effect |
|---|---|
| `.text--large` | 2.5rem / 500 / 3rem line-height — display size for big callout numbers |
| `.heading--large` | Aliases H1 MudBlazor token — for non-MudText elements needing H1 style |
| `.heading--bold` | `font-weight: 600` override — strengthens any heading |
| `.mud-typography-caption` | 0.875rem / italic / 400 / secondary color (applied via app.css override) |
| `.mud-typography-overline` | 0.875rem / 500 / uppercase (applied via app.css override) |

### When

- `h1`: one per page or dialog — the primary question or title
- `h2`: section breaks within a page (e.g., "Your Account", "Policy Details")
- `h3`: sub-sections, card headers, named groups within a form
- `body1` (medium): the main readable content — steps, instructions, values in label/value pairs
- `body2` (regular): supporting context, descriptions under headings, dialog body text
- `subtitle2`: input labels (static, directly above the field), field-level secondary text, row labels in simple tables
- `caption`: disclaimers, legal footnotes, helper context below a field or section — rendered italic in secondary color
- `overline`: category labels, nav section headers, pill/chip labels — always uppercase
- `.text--large`: single large number or callout (enrollment count, coverage amount) — use sparingly

### Why

The distinction between `body1` (500 weight) and `body2` (400 weight) at the same size is intentional — it creates a silent hierarchy without changing font size. The key instruction or value lands in `body1`; the contextual explanation lands in `body2`. A user scanning the page picks up the medium-weight text first, then optionally reads the lighter supporting text. This reduces cognitive load without reducing information density. Caption and overline are visually subordinate (0.875rem) but serve distinct roles — caption disappears into the footnote space, overline stands up via uppercase and spacing to label sections. Using them correctly keeps the page scannable at the right altitude: users can navigate by section labels without reading every word.
