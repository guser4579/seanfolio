# Foxen Resident Portal — Accessible Color Palette

**Prepared for:** Sean Forquer
**Date:** June 24, 2026
**Standard:** WCAG 2.1 Level AA
**Scope:** Six re-tuned semantic color ramps — Blue, Purple, Green, Red, Yellow, Orange — five steps each (darkest → lightest), engineered for the dark-text-on-light-fill chip/pill pattern.

---

## What "compliant" means here

Every pairing below is measured with the official WCAG 2.1 relative-luminance contrast formula. The thresholds applied:

- **4.5:1** — minimum for normal-size text (the chip/pill case you flagged).
- **3:1** — minimum for large text (≥18pt, or ≥14pt bold) and for UI components / graphical boundaries.

ADA enforcement in the U.S. consistently references WCAG 2.1 AA as the practical conformance target, so that is the bar used throughout.

## The design rule that drives the ramps

Each family is built so that the **darkest step (900)** is dark enough to sit as text on the **lightest step (100)** at 4.5:1 or better. That single constraint guarantees your core chip/pill pattern — dark colored text on a matching light colored fill — is always legible. The mid steps then fill in for borders, solid fills, and graphics.

Hues were kept within each color family (blue still reads blue, red still reads red), but saturation and lightness were re-tuned freely, per your direction, to hit the contrast targets cleanly.

---

## The palette

Each ramp runs **900 (darkest) → 100 (lightest)**. The naming matches your existing Foxen token convention (higher number = darker, `100` = the lightened fill).

### Blue (primary / info)

| Step | Hex | Role |
|---|---|---|
| Blue 900 | `#03356D` | Chip/pill text, headings on light fills |
| Blue 700 | `#0451A9` | Solid fill with white text (buttons) |
| Blue 500 | `#0969D7` | Brand accent, links, primary fill |
| Blue 300 | `#A1C9F7` | Borders, hover tints |
| Blue 100 | `#DDECFD` | Chip/pill/banner background |

### Purple

| Step | Hex | Role |
|---|---|---|
| Purple 900 | `#301471` | Chip/pill text |
| Purple 700 | `#4A21AB` | Solid fill with white text |
| Purple 500 | `#6B3ADF` | Accent / data-viz |
| Purple 300 | `#C3AFF4` | Borders, hover tints |
| Purple 100 | `#EAE3FD` | Chip/pill background |

### Green (success)

| Step | Hex | Role |
|---|---|---|
| Green 900 | `#09532A` | Chip/pill text |
| Green 700 | `#0F7B3F` | Solid fill with white text |
| Green 500 | `#1C9C55` | Success accent, icons |
| Green 300 | `#A8E6C4` | Borders, hover tints |
| Green 100 | `#DEF7E9` | Chip/pill/banner background |

### Red (error)

| Step | Hex | Role |
|---|---|---|
| Red 900 | `#861B13` | Chip/pill text |
| Red 700 | `#B62116` | Solid fill with white text |
| Red 500 | `#DC2618` | Error accent, icons |
| Red 300 | `#F9CBC8` | Borders, hover tints |
| Red 100 | `#FDE9E7` | Chip/pill/banner background |

### Yellow

| Step | Hex | Role |
|---|---|---|
| Yellow 900 | `#775803` | Chip/pill text; solid fill with white text |
| Yellow 700 | `#A47904` | Accent (white text = large/UI only) |
| Yellow 500 | `#D19B05` | Highlight, data-viz (use dark text on top) |
| Yellow 300 | `#FBDF93` | Borders, hover tints |
| Yellow 100 | `#FEF1CD` | Chip/pill background |

### Orange (warning)

| Step | Hex | Role |
|---|---|---|
| Orange 900 | `#884307` | Chip/pill text |
| Orange 700 | `#BA5B08` | Solid fill with white text |
| Orange 500 | `#EA7006` | Warning accent, icons |
| Orange 300 | `#FDD4AF` | Borders, hover tints |
| Orange 100 | `#FEECDC` | Chip/pill/banner background |

### Neutrals (blacks, grays & white)

A cool-tinted neutral ramp — seven steps plus white — to match the slight blue cast of the existing Foxen grays. The four darkest steps are all usable as **text on white**; the lighter steps handle borders, dividers, and surfaces.

| Step | Hex | Role | On white |
|---|---|---|---|
| Gray 900 | `#0A0C12` | Primary text (near-black) | 19.55:1 — PASS (AAA) |
| Gray 700 | `#33363F` | Headings, strong text | 12.07:1 — PASS (AAA) |
| Gray 500 | `#5B5F6B` | Secondary / body text | 6.38:1 — PASS (AA) |
| Gray 400 | `#6E7280` | Caption, placeholder text | 4.79:1 — PASS (AA) |
| Gray 300 | `#A9ADB8` | Disabled text & icons, decorative | 2.24:1 — decorative only |
| Gray 200 | `#D6D9E0` | Borders, dividers | 1.41:1 — surface only |
| Gray 100 | `#EFF1F4` | Background fills | 1.13:1 — surface only |
| White | `#FFFFFF` | Base surface | — |

**Neutral usage rules:**

1. **Text on white:** any of Gray 900 / 700 / 500 / 400 is safe for normal-size text (all ≥4.5:1). Gray 400 is the lightest you should ever set body or caption text — going lighter fails AA.
2. **Disabled text & decorative icons:** Gray 300. Disabled UI is exempt from the contrast minimums, so this is intentional.
3. **Borders & dividers:** Gray 200 for subtle lines. If a border must function as a *meaningful* UI boundary (e.g., the only thing separating an input from its background), use **Gray 400** to clear the 3:1 UI threshold.
4. **Surfaces:** Gray 100 for page/section background fills; White for cards and base canvas.
5. **Inverse (white text on a dark neutral):** safe on Gray 500, 700, and 900 (all ≥6:1).

---

## Measured contrast — the chip/pill case (900 text on 100 fill)

This is the pairing you specifically asked about. All pass AA for normal text.

| Family | Text (900) | Fill (100) | Ratio | AA normal text |
|---|---|---|---|---|
| Blue | `#03356D` | `#DDECFD` | **10.09:1** | PASS |
| Purple | `#301471` | `#EAE3FD` | **11.55:1** | PASS |
| Green | `#09532A` | `#DEF7E9` | **8.14:1** | PASS |
| Red | `#861B13` | `#FDE9E7` | **8.25:1** | PASS |
| Yellow | `#775803` | `#FEF1CD` | **5.87:1** | PASS |
| Orange | `#884307` | `#FEECDC` | **6.40:1** | PASS |

Every chip clears 4.5:1 with margin — the cool hues (blue, purple) clear AAA (7:1) as well.

## Other key pairings

| Family | 900 on white | white on 700 (solid fill) | white on 500 |
|---|---|---|---|
| Blue | 12.11 PASS | 7.62 PASS | 5.23 PASS |
| Purple | 14.34 PASS | 10.02 PASS | 6.37 PASS |
| Green | 9.20 PASS | 5.35 PASS | 3.54 (large/UI only) |
| Red | 9.63 PASS | 6.53 PASS | 4.85 PASS |
| Yellow | 6.60 PASS | 3.95 (large/UI only) | 2.50 FAIL |
| Orange | 7.36 PASS | 4.58 PASS | 3.08 (large/UI only) |

---

## Usage rules to stay compliant

1. **Chips & pills:** always pair the **900 text** with the **100 fill** of the same family. Never put 900 text on the 500 step — that combination fails (≈2–2.6:1) for every hue.
2. **Solid buttons / badges with white text:** use the **700** step. It passes AA for normal text in every family except Yellow.
3. **Yellow is special.** Yellow and orange are intrinsically light, so white text on Yellow 500/700 is not reliable. For a solid yellow fill with white text, use **Yellow 900**. Better: put **dark (900) text** on yellow fills rather than white.
4. **500 steps** are for accents, icons, links, and graphics — not as text backgrounds unless the text is large (≥18pt / 14pt bold) or you switch to dark text.
5. **300 steps** are safe for borders and dividers (UI-component 3:1 boundary) and for hover/pressed tints; they are not text backgrounds.
6. **Icons inside soft-fill banners/toasts:** treat the icon as a graphical object — pair the **500 or 700** icon with the **100** background (all clear the 3:1 UI threshold).

## Mapping from your current tokens

| Old token | Old hex | New equivalent | New hex |
|---|---|---|---|
| `--mud-palette-primary` / `info` | `#0074E0` | Blue 500 | `#0969D7` |
| `--mud-palette-info-lighten` | `#E6F3FF` | Blue 100 | `#DDECFD` |
| `--mud-palette-success` | `#1F9956` | Green 500 | `#1C9C55` |
| `--mud-palette-success-lighten` | `#DEF0E6` | Green 100 | `#DEF7E9` |
| `--mud-palette-warning` | `#F8842F` | Orange 500 | `#EA7006` |
| `--mud-palette-warning-lighten` | `#FFEFAB` | Orange 100 | `#FEECDC` |
| `--mud-palette-error` | `#EA1010` | Red 500 | `#DC2618` |
| `--mud-palette-error-lighten` | `#FDE3E3` | Red 100 | `#FDE9E7` |

> **Why your current chips were at risk:** the old `error 500 #EA1010` on `error-lighten #FDE3E3` lands at roughly **3.9:1** — below the 4.5:1 needed for normal text. The new Red 900-on-100 pairing fixes this at 8.25:1, and the same correction is applied across every family by introducing a dedicated dark (900) text step.

## Drop-in CSS tokens

```css
:root {
  /* Blue */
  --blue-900:#03356D; --blue-700:#0451A9; --blue-500:#0969D7; --blue-300:#A1C9F7; --blue-100:#DDECFD;
  /* Purple */
  --purple-900:#301471; --purple-700:#4A21AB; --purple-500:#6B3ADF; --purple-300:#C3AFF4; --purple-100:#EAE3FD;
  /* Green */
  --green-900:#09532A; --green-700:#0F7B3F; --green-500:#1C9C55; --green-300:#A8E6C4; --green-100:#DEF7E9;
  /* Red */
  --red-900:#861B13; --red-700:#B62116; --red-500:#DC2618; --red-300:#F9CBC8; --red-100:#FDE9E7;
  /* Yellow */
  --yellow-900:#775803; --yellow-700:#A47904; --yellow-500:#D19B05; --yellow-300:#FBDF93; --yellow-100:#FEF1CD;
  /* Orange */
  --orange-900:#884307; --orange-700:#BA5B08; --orange-500:#EA7006; --orange-300:#FDD4AF; --orange-100:#FEECDC;
  /* Neutrals */
  --gray-900:#0A0C12; --gray-700:#33363F; --gray-500:#5B5F6B; --gray-400:#6E7280;
  --gray-300:#A9ADB8; --gray-200:#D6D9E0; --gray-100:#EFF1F4; --white:#FFFFFF;
}
```

*All ratios computed with the WCAG 2.1 relative-luminance formula. See the companion interactive page to view every pairing rendered as live swatches.*
