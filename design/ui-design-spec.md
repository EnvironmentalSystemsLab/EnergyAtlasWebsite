# EnergyAtlas website UI alignment

## 0. Implementation decisions

Approved by the owner on 2026-10-21, before implementation. This section takes
precedence over the reference recipes. This folder is internal and is not published.

- Reference: the EnergyAtlas visual family described by the app-ui-alignment and
  wiki-ui-alignment skills, rather than a particular live site or screenshot.
- Scope: appearance of the existing Astro landing page. Preserve the name, logo,
  favicon, wording, section order, anchor IDs, links, media, and functionality.
- Use white/light-grey surfaces in light mode and black/charcoal in dark mode,
  thin grid rules, blue links and actions, and near-square corners. Remove glow,
  gradient buttons, floating card shadows, and card lift animations.
- Keep system-preference themes with a CSS first-frame fallback. Do not add a
  theme switch or persistence. No docking, grid, or chart libraries are involved.
- Use locally hosted Geist for interface, headings, and normal-case labels. Keep
  the existing expanded Roboto Flex wordmark treatment, also locally hosted.
  Use the system monospace for DOI identifiers. No serif accent or mono caps.
- Preserve the city video hero, heading, copy, trust badges, and actions. Tighten
  its spacing, keep a legible overlay on mobile, and allow its height to grow to
  fit content. Do not change video playback behavior in this pass.
- Align section headings and card copy to the same content grid. Use shared-border
  grids for features, modules, publications, media, team, and integrations. Keep
  section titles on the page, without numbered strips or backdrops.
- Primary buttons: solid blue. Secondary buttons: outlined with an opaque surface.
  Use visible hover, pressed, and focus indicators without moving controls.
- Text must reach 4.5:1, and interactive borders and focus indicators 3:1, in both
  themes and applicable states. Decorative rules are intentionally less prominent.
- Keep the existing responsive scope, checking 375px phone width and 1280px and
  1920px desktop widths. Keep all labels visible without page overflow.
- UI edits follow this record. Fonts and their licenses are hand-maintained assets.

## 1. Baseline observations

Base commit: `064093c`. The repository contains one page,
`src/pages/index.astro`, with inline CSS, one Astro runtime dependency, no recorded
design rules, and no existing test runner. The project gate is `npm run build`.

The style audit was adapted in memory to include `.astro` files, which the skill's
script otherwise excludes. It reports 32 lines with colour literals (including
token definitions), 16 radius declarations, 15 elevation shadows, 8 motion
declarations, 32 letter-spacing declarations, and 3 Google font-host references.
There is one reduced-motion query, covering smooth scrolling only.

Measured contrast: footer blue on its dark background is 2.65:1; white on the red
button gradient endpoint is 3.92:1; the deep brand blue on the dark pane is 1.36:1.
The mobile stylesheet removes the hero overlay even though its text stays white.

## 2. Translation and precedence

| Reference element | Website treatment | Decision |
| --- | --- | --- |
| Neutral base and raised surfaces | Page, header, cards | Adopt for both themes |
| Ruled frame and shared cells | Aligned sections and card grids | Adopt |
| Geist interface typography | Body, headings, navigation | Adopt |
| Mono caps labels and editorial serif | Normal-case sans labels | Drop; approved proposal wins |
| Brand mark assets in skills | Existing website logo/favicon | Keep existing identity |
| Dense application controls | Existing anchor buttons/navigation | Adapt; no new controls |
| Numbered documentation strips | Left-aligned section headings | Drop |
| Documentation sidebars | Existing landing-page sections | Drop |
| Blue interaction, red errors only | Buttons, links, focus | Adopt; logo/media colours unchanged |

## 3. Token contract

One semantic set in `src/styles/tokens.css`, identical roles in both themes:

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#ffffff` | `#000000` |
| Secondary surface | `#f8fafc` | `#1a1a1a` |
| Raised/hover surface | `#f4f7fb` | `#2a2a2a` |
| Text | `#18202c` | `#e5e5e5` |
| Muted | `#5f6b7a` | `#999999` |
| Decorative rule | `#cfd8e5` | `#404040` |
| Interactive edge | `#768599` | `#747474` |
| Accent | `#125dae` | `#4da3ff` |
| Text on accent | `#ffffff` | `#000000` |

Hero and footer have their own fixed dark-surface roles. Add explicit hover and
pressed roles and test every combination used. The brand blue `#003978` is a fill
only on dark surfaces. Every colour, family, type size, radius, shadow, and motion
value used by components comes from tokens. Layout lengths may remain local CSS.

## 4. Delivery and verification

Record this decision before styling. Then implement tokens, local fonts, shell,
cards, buttons, responsive layouts, and reduced motion. Use Node's built-in test
runner for token contrast; no test framework dependency is needed.

Verify a production build, all token contrast pairs, local font requests, no
horizontal overflow or clipped headings/labels, visible keyboard focus, and
screenshots of the hero, grids, long titles, team, and footer in both themes.
Run accessibility checks and distinguish pre-existing semantic findings from
appearance regressions. Keep local QA fixtures and screenshots outside the repo.

## 5. Implementation evidence and deviations

Implementation and verification evidence will be appended after the approved
design is built. No push, merge, tag, release, or deployment is authorized.
