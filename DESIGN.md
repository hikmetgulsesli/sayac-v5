```markdown
# Design System Specification: Editorial Utility

## 1. Overview & Creative North Star
**Creative North Star: The Kinetic Monolith**

This design system moves away from the "standard SaaS dashboard" and toward a high-end, editorial utility experience. It treats data not as a spreadsheet, but as a dynamic sculpture. By combining the brutalist, geometric precision of **Space Grotesk** with a deep, infinite slate void, we create a "Kinetic Monolith"—a workspace that feels both authoritative and impossibly sharp.

We break the "template" look through **Extreme Typographic Contrast**. We don't just show numbers; we hero them. The layout relies on intentional asymmetry and "The Void" (negative space) to guide the eye, eschewing traditional grid lines for a sophisticated layering of tonal surfaces.

## 2. Colors & Surface Architecture
The palette is rooted in a "Super-Dark" philosophy. We use a base of `#0c1324` (Surface/Background) to create a sense of immense depth, allowing the vibrant Primary and Error tones to "glow" with purpose.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
*   **Separation:** Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background provides all the containment necessary.
*   **The Ghost Border:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use Material-inspired container tiers to define "elevation" without shadows:
*   **Deepest:** `surface-container-lowest` (#070d1f) – Used for the main background "canvas."
*   **Base:** `surface` (#0c1324) – The standard layout level.
*   **Raised:** `surface-container` (#191f31) – For primary content cards.
*   **High:** `surface-container-high` (#23293c) – For interactive elements and hover states.

### The "Glass & Gradient" Rule
To add "soul" to the utility:
*   **Floating Elements:** Use `surface-bright` with a 60% opacity and a `20px` backdrop-blur to create a frosted glass effect for modals and navigation bars.
*   **Signature CTAs:** Apply a subtle linear gradient (Top-Left to Bottom-Right) from `primary` (#4be277) to `primary-container` (#22c55e). This prevents the "flat" look and adds a premium, tactile quality.

## 3. Typography
Typography is the core of this system’s identity. It is a dialogue between the technical (Inter) and the monumental (Space Grotesk).

*   **Display & Headlines (Space Grotesk):** These are the "Commanders." Use `display-lg` (3.5rem) for critical metrics. The bold, wide apertures of Space Grotesk communicate high-tech precision. Numbers should always be Space Grotesk.
*   **Body & Labels (Inter):** These are the "Operators." Inter provides maximum legibility at small scales. Use `label-md` for metadata and micro-copy, ensuring a tracking (letter-spacing) increase of +2% to +5% for uppercase labels to maintain an editorial feel.
*   **Scale Hierarchy:** Always maintain a minimum 2:1 ratio between headline and body size to ensure the "Editorial" impact is not lost.

## 4. Elevation & Depth
We achieve hierarchy through **Tonal Layering**, not structural lines.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This "recessed" look creates a natural focus area without the clutter of borders.
*   **Ambient Shadows:** For "floating" elements like popovers, use a massive blur (40px–60px) with 6% opacity. The shadow color must be derived from `on-surface` (a deep blue-tinted shadow) to mimic natural light within a dark environment.
*   **Tactile Feedback:** On interaction (press/active), the element should physically "sink" by shifting from `surface-container-high` to `surface-container-low`, rather than just changing color.

## 5. Components

### Buttons (Responsive Utility)
*   **Primary:** Gradient of `primary` to `primary-container`. Corner radius: `md` (0.375rem). Text: `title-sm` (Inter Bold).
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Layout:** Buttons must occupy 100% width on mobile viewports to emphasize the "utility" aspect, transitioning to "hug contents" on desktop with generous horizontal padding (`spacing-8`).

### The Metric Card (Signature Component)
Forbid the use of dividers. 
*   **Structure:** Large `display-md` number (Space Grotesk) at the top, a `label-sm` (Inter, All-Caps) below it, and a `primary` or `error` trend indicator tucked in the top-right corner.
*   **Background:** Use `surface-container` for the card body. On hover, transition to `surface-container-high`.

### Input Fields
*   **Base:** `surface-container-lowest` background. 
*   **State:** On focus, the field does not get a thick border; instead, the background shifts to `surface-container-highest` and the `primary` "Ghost Border" (20% opacity) appears.
*   **Labels:** Use `label-md` (Inter) positioned strictly above the field, never as a placeholder.

### Lists
*   **Zero-Divider Policy:** Use `spacing-4` (0.9rem) vertical gaps between items. Use alternating `surface` and `surface-container-low` backgrounds for rows if density is a concern, rather than lines.

## 6. Do’s and Don’ts

### Do
*   **DO** use extreme scale. If a number is important, make it massive (`display-lg`).
*   **DO** embrace "The Void." Let significant white space (using `spacing-24`) frame your most important utility functions.
*   **DO** use `primary` (green) and `error` (red) sparingly as functional signals, not decorative accents.

### Don’t
*   **DON'T** use 1px solid white or grey borders. This instantly "cheapens" the dark mode aesthetic.
*   **DON'T** use pure black (#000000). It kills the depth. Stick to the `surface-container` scale.
*   **DON'T** mix the fonts. Space Grotesk is for data and titles; Inter is for reading. Mixing them ruins the "Command/Operate" hierarchy.
*   **DON'T** use standard drop shadows. If it doesn't look like an ambient glow, it's too heavy.```