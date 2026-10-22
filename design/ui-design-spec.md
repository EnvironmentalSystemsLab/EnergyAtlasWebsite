# EnergyAtlas website UI alignment

## 0. Implementation decisions

Approved by the owner on 2026-10-21, before implementation, with the font-family
and subsequent frame/brand corrections requested later that day. This section takes
precedence over the reference recipes. This folder is internal and is not published.

- Reference: the EnergyAtlas visual family described by the app-ui-alignment and
  wiki-ui-alignment skills, rather than a particular live site or screenshot.
- Scope: appearance of the existing Astro landing page. Preserve the name,
  wording, section order, anchor IDs, links, media, and functionality. The owner
  chose the skills' unmodified white-E EnergyAtlas mark for the header and all
  favicon variants, replacing the earlier knockout mark. Keep its original
  gradient and drawing in both themes. Use the bundled SVG, PNG, ICO, and Apple
  touch assets from `app-ui-alignment/references/brand/`.
- Use white/light-grey surfaces in light mode and black/charcoal in dark mode,
  thin grid rules, blue links and actions, and near-square corners. Remove glow,
  gradient buttons, floating card shadows, and card lift animations.
- Keep system-preference themes with a CSS first-frame fallback. Do not add a
  theme switch or persistence. No docking, grid, or chart libraries are involved.
- Use the template families, locally hosted: Geist for interface, headings,
  wordmark, and normal-case labels; Geist Mono for DOI/media identifiers; Cormorant
  Garamond italic 500 for the short hero subtitle. This replaces the earlier
  Roboto Flex wordmark and system-monospace exceptions at the owner's request.
  Keep wording as written. Button labels use the BEMGen wiki's mono uppercase
  treatment. Header navigation follows Archetype Atlas's mono uppercase tabs;
  other labels remain normal-case sans.
- Preserve the city video hero, heading, copy, trust badges, and actions. Tighten
  its spacing, keep a legible overlay on mobile, and allow its height to grow to
  fit content. The video and its overlay span the full available page width,
  independently of the centered text container. No vertical page-frame lines
  appear anywhere, including the header, hero, sections, or footer. Do not change
  video playback behavior in this pass.
- Left-align the hero title, subtitle, and actions. Set the subtitle to 60% of
  the title size, in exactly two lines with a break after "for". Keep the
  template serif italic family and a proportional scale on phone screens.
- Align section headings and card copy to the same content grid. Use shared-border
  grids for features, modules, publications, media, team, and integrations. Keep
  section titles on the page, without numbered strips or backdrops.
- Horizontal separators span the full available page width, including grid row
  boundaries and the hero's trust strip. Vertical separators are confined to
  these rows, meeting horizontal rules above and below; no page-height rails.
  Content remains centered at its existing readable width. Control borders,
  image outlines, and link/focus indicators retain their component dimensions.
- Buttons follow `https://energy-atlas.github.io/BEMGen-docs/`: square outlined
  blocks, Geist Mono 600, 11px labels, uppercase with 0.12em tracking, and
  12px/16px padding. Both action kinds use the reference's outlined appearance.
  Keep an opaque dark backing over video for contrast, a minimum 44px target,
  and visible hover, pressed, and focus indicators without moving controls.
- The header navigation beside the site name follows
  `https://energy-atlas.github.io/archetype-atlas/`: muted Geist Mono 600,
  11.5px uppercase labels with 0.14em tracking, compact square 24px chips, and
  8px horizontal inset. The targeted section's chip is inverted with a 1px blue
  outline offset 3px. Retain 44px link targets, allow wrapping on phones, and
  show distinct hover, focus, and pressed states. Selection follows the existing
  section hash; no new scroll tracking or navigation behavior is introduced.
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
| Ruled frame and shared cells | Aligned sections and card grids without outer page rails | Keep cell dividers; omit both vertical page-frame lines at owner's request |
| Geist interface typography | Body, headings, navigation | Adopt |
| Mono caps labels and editorial serif | Normal-case sans labels; one italic serif hero subtitle | Adopt serif after owner's font correction; keep normal case |
| Brand mark assets in skills | White-E header mark and favicon variants | Adopt at owner's request; retain site name and original gradient |
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
| Interactive edge | `#768599` | `#808080` |
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

- Implemented the approved framing, grids, typography, buttons, themes, and mobile
  hero overlay. The page body and scripts match `064093c` byte-for-byte after
  normalizing line endings: no wording, links, media, IDs, or functionality changed.
- CSS is now split into tokens, font declarations, and component styles. The dark
  interactive edge is `#808080` instead of the family's `#747474`, to retain 3.34:1
  against the pressed surface `#303030`. Muted text on that surface is 4.63:1.
- The hero uses fixed dark roles in either theme, including a light-blue primary
  fill with black text. A 70% black overlay bounds the brightest video frame at
  `#4d4d4d`; the blue indicator still reaches 3.22:1 there. Circular team portraits
  and unmodified logos/icons are intentional exceptions to square framing.
- Fonts are vendored from Fontsource 5.3.0 with unmodified OFL licenses and package
  provenance in `public/assets/fonts/README.md`. The production page loads Geist
  and Roboto Flex from its own origin; no external request was observed.
- `npm test`: 2 passing theme tests, exercising 40 contrast assertions per theme.
  Tests were first observed failing before the new token contract was implemented.
  The repository previously had no tests; this uses Node's built-in runner.
- `npm run build`: passes, producing 1 static page. The existing empty hoisted
  script chunk message is also present in the baseline build. `git diff --check`
  passes. No separate lint, typecheck, or format script is defined.
- Final style audit: 0 colour literals outside tokens, 0 literal component font
  sizes, 0 font-host URLs, 0 `!important` rules, and no uppercase transformations.
  The only literal font families outside tokens are the five required `@font-face`
  declarations. The shadow token resolves to `none`. Motion is colour-only and
  resolves to 0s under reduced motion; smooth scrolling also becomes automatic.
- Browser matrix: light and dark at confirmed 375 × 800, 1280 × 800, and
  1920 × 800 viewports. All six have zero horizontal overflow, clipped labels,
  missing images, external requests, or axe-core 4.14.0 WCAG A/AA violations.
  Baseline scans found 1 failing contrast element in light and 19 in dark.
- Because the site has no theme switch and follows system preference, a local,
  ignored production QA server forces only the CSS media conditions for each
  theme and reduced-motion state. It also forces CSS hover/pressed selectors for
  state screenshots and makes lazy images eager for reliable full-page capture.
  No QA script, override, or dependency is shipped. All state scans are clear.
- Keyboard checks: all 29 links in each theme have visible focus rings (58 checks)
  and 0s transitions with reduced motion. Mobile navigation fits all six links on
  one row at 375px. Independent code review found no actionable issue.
- Baseline/final screenshots and machine-readable reports are local, under
  `tmp/ui-qa/` (ignored). Screenshots cover the hero, shared grids, long module
  names, publications, team, integrations, and footer. The live development
  preview remains on port 4321. Internal design records are absent from `dist/`.

No push, merge, tag, release, or deployment was performed.

## 6. App-ui-alignment follow-up audit (2026-10-21)

The owner's instruction to follow app-ui-alignment retains the decisions in
section 0. No unresolved reference, precedence, brand, font, label, or theme
decision was reopened. The application workflow is applied to the actual Astro
landing page; there is no interactive workbench to invent or retrofit.

| Phase | Application to this site |
| --- | --- |
| Read | One static page, CSS themes driven by system preference, local fonts, anchor controls; no UI libraries or canvas renderers |
| Audit | Existing source inventory, reference translation, baseline screenshots, surface and state contrast |
| Decisions | Owner-approved section 0; identity, content, system themes, and normal-case labels retained |
| Record | This internal spec was committed before styling; AGENTS.md points to it |
| Tokens | Shared semantic roles, split rule/control edges, explicit states and text-selection colours, contrast tests |
| Implement | Local fonts, neutral shell and shared grids, blue controls, CSS colour transitions only |
| Verify | Production build, Node contrast suite, skill contrast script, actual viewport dimensions, both themes, accessibility scans and screenshots |
| Hand back | Local commits and evidence recorded; preview stays on 4321; no publication action |

Follow-up gaps closed:

- Ordinary links now have a 1px underline at rest, a 2px underline on hover, and a
  double underline while pressed. The home wordmark acquires the same distinct
  hover/pressed indicators. Indicators use the existing accessible text colours.
- Navigation, button, metadata, integration, and role labels share the label-font,
  weight, case, and tracking settings. Their approved size hierarchy is retained.
- Text selection now uses `#e3ecf5` in light and `#112438` in dark, with the theme's
  primary text colour. The new contrast assertion was observed failing before
  these tokens were added, then passing in both themes.

Verification after these fixes:

- `npm test`: 2 passing theme tests, 41 contrast assertions per theme.
- Skill `contrast.py check --suggest --failures-only`: 80 of 80 pairs pass
  (the Node suite includes a repeated primary-action pair).
- Both themes at confirmed 375, 1280, and 1920px widths: no page overflow, clipped
  labels, external requests, or axe WCAG A/AA violations. Normal, hover, and
  pressed link/wordmark styles were checked separately in both themes; all six
  state scans are clear. Actual selection colours were read from computed CSS.
- `npm run build` and `git diff --check` pass. Independent follow-up review found
  no meaningful issues. Fresh screenshots/reports are in `tmp/ui-qa/follow-up*`.
- Forms, selects, docking, tabs, menus, dialogs, loading/error UI, data palettes,
  and status-tone tints are not shipped by this page. Their theming and greyscale
  form checks are not applicable. No unused controls or tokens were added.

The remaining deviations are the approved landing-page adaptations documented
above. No content, behavior, or publishing change is included in this follow-up.

## 7. Template font-family correction (2026-10-21)

The owner requested the font families required by the templates, superseding the
earlier Roboto Flex and system-monospace exceptions. Section 0 reflects this update.

- Geist now sets the wordmark, hero title, interface, headings, and labels. Its
  brand weight is 700; the former Roboto-only width-axis settings are removed.
- Geist Mono sets DOI and media identifiers. Cormorant Garamond italic 500 supplies
  the template's sparse editorial accent on the existing short hero subtitle.
  Text, sizes, colour roles, logo artwork, and all behavior stay as before.
- All three families use local Latin/Latin Extended WOFF2 files and OFL licenses.
  Roboto's unused binary, license, and preload have been removed. Provenance is
  recorded in the font README. The prior evidence naming Roboto documents the
  initial pass; the current three-family setup is verified below.
- The browser viewport override was unavailable for reliable sizing during this
  check, so production pages were rendered in same-origin frames at confirmed
  375, 1280, and 1920px viewport widths, in both themes. All three fonts report
  loaded in each frame, with the intended computed family/style/weight per role.
  All six checks report no clipping, page overflow, external requests, or axe
  WCAG A/AA violations. Evidence: `tmp/ui-qa/fonts.json` and font-matrix screenshots.
- `npm test`, `npm run build`, and independent review pass. The preview server
  was restarted after its earlier process expired, then the live page refreshed.

## 8. Remove outer vertical frame lines (2026-10-21)

At the owner's request, removed the two outer page-frame borders from every
container and the redundant hero/footer border overrides. The inner grid cell
dividers remain. Removed the reserved scrollbar gutter so the hero fills the
available page width as in the original layout. Its video remains positioned
against the full hero rather than the centered copy container.

The live browser confirms 0px left/right borders on all ten containers, including
header and footer. Hero and video both extend from x=0 to the page's full 1745px
content width, with zero horizontal overflow. `npm test` (2 tests),
`npm run build`, and `git diff --check` pass. Screenshot:
`tmp/ui-no-frame-lines.png`. Section 0 records this override to the template frame.

## 9. White-E site mark and favicons (2026-10-21)

The owner selected the skills' white-E mark for the site icon and favicon. Copied
the supplied brand assets unchanged to `public/brand/`: header SVG, vector favicon,
32px PNG favicon, 16/32/48px ICO, and 180px Apple touch icon. The conventional
`/favicon.ico` and legacy icon SVG URL also serve the new assets. Sharing metadata
uses the white-E SVG. No knockout variant is used on the page.

The header mark is 26px beside the 20px name (the guideline's 1.3× ratio), with a
one-third-height gap and centered alignment. Its empty alt text avoids repeating
the visible name; the home link keeps its existing accessible name. Colours and
geometry are unchanged from the source artwork.

Verified byte identity with the skill assets in both `public/` and `dist/`, the
white SVG fill, PNG dimensions, and all three ICO sizes. Every header/favicon
endpoint returns 200 with the correct image content type from the local origin.
The refreshed browser confirms the header mark is loaded, the expected favicon
links are present, and placement matches the guideline. `npm test` (2 tests),
`npm run build`, and `git diff --check` pass.

## 10. Full-width horizontal separators (2026-10-21)

At the owner's request, retained the horizontal separators and extended every
grid row boundary to the page edges, including the hero trust strip. Column
dividers remain inside rows bounded above and below by horizontal rules. The
centered content widths, absent outer vertical rails, and full-width hero video
are preserved. Control and media outlines remain local to their components.

The live browser confirms full-width rules, zero horizontal overflow, zero outer
container borders, and matching hero/video widths. Production fixtures at 375,
1280, and 1920px in both themes confirm all seven ruled grids have top and row
bottom rules, with no clipped labels, page overflow, or axe WCAG A/AA violations.
Evidence: `tmp/ui-qa/separators-light.json`, `tmp/ui-qa/separators-dark.json`, and
`tmp/ui-full-width-separators.png`. `npm test` (2 tests), `npm run build`, and
`git diff --check` pass.

## 11. Hero typography and BEMGen buttons (2026-10-21)

The owner requested left-aligned hero type, a subtitle at 60% of the title size,
and two lines split after "for". Both share the content grid's left edge, as do
the hero actions. A forced line break keeps the wording unchanged. The phone
title now uses the same responsive hero scale so the ratio holds at every width.

Inspected the live BEMGen wiki and its `assets/stylesheets/bemgen.css`: its home
page actions are square outlined buttons with Geist Mono 600, 11px uppercase
labels, 0.12em tracking, and 12px/16px padding. Applied that appearance to all
four site actions. Hero controls retain an opaque dark surface over the video;
all targets remain at least 44px tall. Hover/focus use blue text and edges with
an underline; pressed uses a double underline; keyboard focus retains its ring.
These contrast and target-size adaptations are intentional.

Production checks at 375, 1280, and 1920px in both themes verify matching left
edges, a 0.6 font-size ratio, two rendered subtitle lines, no clipped labels or
horizontal overflow, and zero axe WCAG A/AA violations. Live keyboard navigation
confirms the blue 2px focus ring and blue underlined label. Evidence is saved in
`tmp/ui-qa/hero-light.json`, `tmp/ui-qa/hero-dark.json`, and
`tmp/ui-hero-left-aligned.png`. `npm test` (2 tests), `npm run build`, and
`git diff --check` pass. Hero video sizing and separator rules remain unchanged.
