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
- Default to the system theme, with a CSS first-frame fallback. A sun/moon switch
  in the top ribbon toggles light/dark and remembers an explicit choice locally.
  Apply saved preferences before first paint, follow system changes until a
  choice is made, and remain usable when browser storage is unavailable.
  No docking, grid, or chart libraries are involved.
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
  grids for modules, publications, media, team, and integrations. Keep
  section titles on the page, without numbered strips or backdrops.
- The section is titled "Features" and uses six vertically stacked rows. On desktop, enlarge each media
  panel to roughly 62% of the row's inner width and put its heading and description
  together on the right, vertically centered. At 768px and below, place the text
  beneath full-width media. Preserve the order, media, descriptions, and playback.
  Remove all feature grid rules and media outlines. Fade the bottom 25% of each
  visual smoothly into the page background, with 16px top corners and square
  bottom corners; offset visuals downward 16px. Feature paragraphs use the same
  text colour as their titles and a slightly smaller 15px size.
  Bottom-align the first two screen recordings within their existing 16:9 frames,
  with a 1px upward trim, to hide their captured white title ribbons. Keep the
  source files unchanged and retain the default framing of all other visuals.
- Horizontal separators outside Features span the full available page width, including grid row
  boundaries and the hero's trust strip. Vertical separators are confined to
  these rows, meeting horizontal rules above and below; no page-height rails.
  Content remains centered at its existing readable width. Control borders,
  image outlines, and link/focus indicators retain their component dimensions.
- Buttons retain `https://energy-atlas.github.io/BEMGen-docs/` typography and
  shape: square blocks, Geist Mono 600, 11px labels, uppercase with 0.12em
  tracking, and 12px/16px padding. Demo actions stay outlined; hero actions use
  the fills specified below. Keep a minimum 44px target and visible hover,
  pressed, and focus indicators without moving controls.
- The hero actions read "explore features" and "wiki" (displayed uppercase by the
  existing button style). In both modes use the wiki's white (#e5e5e5) fill and
  black (#000000) text. Hover and keyboard focus use the same blue (#4da3ff)
  fill in both modes; press uses the fixed hero pressed blue. No text underline
  appears on these two buttons, including hover; retain the focus ring and a
  visible edge over video. Other actions retain their current style.
- Left-align the demo action group with its section heading. Increase section
  spacing by 50%, from 48–80px to 72–120px responsively, keeping the shared grid
  rules, content widths, and internal card spacing.
- The theme switch has a 44px target, an accessible dark-theme on/off state,
  sun/moon action icons, and visible hover/focus/pressed states. Keep it beside
  the site name on phones, with all section navigation below it.
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
| Geist interface typography | Body and headings | Adopt |
| Mono caps labels and editorial serif | Mono uppercase buttons/navigation; other labels normal-case sans; italic serif hero subtitle | Follow the owner's BEMGen and Archetype Atlas references |
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

## 12. Archetype Atlas header navigation (2026-10-21)

The owner requested alignment of the buttons in the top row near the site title
with Archetype Atlas. Inspected its header tabs and live `assets/site.css`.
Header links now use Geist Mono 600 at 11.5px, uppercase with 0.14em tracking,
muted resting text, and compact 24px square chips with 8px horizontal inset.
Each link retains a 44px target. The section matching the existing URL hash
uses inverted neutral colours and a 1px blue outline offset 3px; this is CSS
only, with unchanged links and anchor navigation. Hover adds primary text and
an underline, pressed adds an inverted double-underlined chip, and keyboard
focus uses a 2px blue ring. Hero and demo action styling is unchanged.

At 375px the navigation wraps into two rows of three labels; at 1280 and 1920px
it remains one row. Both themes have no clipped labels, page overflow, or axe
WCAG A/AA violations. All six section links were clicked in the live browser;
each hash selects exactly its own chip. Keyboard navigation confirms focus on
the next link with a 2px blue outline. Evidence: `tmp/ui-qa/navigation-light.json`,
`tmp/ui-qa/navigation-dark.json`, `tmp/ui-qa/navigation-selection.json`, and
`tmp/ui-header-navigation.png`. `npm test` (2 tests), `npm run build`, and
`git diff --check` pass.

## 13. Theme-aware hero actions and ribbon switch (2026-10-22)

Renamed the hero actions to "explore features" and "wiki", preserving their
links and uppercase presentation. Their neutral fills now use the wiki skill's
palette: #e5e5e5 with #000000 text in dark mode, #18202c with #ffffff text in light
mode. Hover/focus fills use the theme's blue (#4da3ff / #125dae), and pressed fills
use the existing pressed-blue tokens. A contrast-tested edge remains visible
over the video. Demo actions retain their outlined treatment.

Added a native sun/moon button with switch semantics to the top ribbon. It
announces the dark-theme state, supports keyboard activation, and has a 44px
target and visible interaction states. On phones it sits beside the name, with
section navigation below. An inline head script restores a saved local choice
before paint, otherwise follows system preference and system changes until the
visitor toggles. Blocked storage does not prevent switching. CSS retains a
system-based fallback with JavaScript disabled; the inactive switch stays hidden.
Explicit and fallback dark palettes are checked for equality to prevent drift.

Six tests pass, covering both contrast palettes, saved preference precedence,
system changes before a choice, invalid saved values, and unavailable storage.
The production build and whitespace check pass. Browser checks confirm mouse
and Space-key toggles, state announcements, persistence after reload, the correct
neutral/blue fills in both themes, and a 44px switch at 375, 1280, and 1920px.
All six responsive checks and both hover fixtures report zero WCAG A/AA axe
violations, no clipped labels, and no page overflow. Evidence is saved in
`tmp/ui-qa/theme-switch-light.json`, `tmp/ui-qa/theme-switch-dark.json`, and
`tmp/ui-theme-dark.png`. Independent code review found no material issues.

## 14. Fixed hero fills, demo alignment, and section spacing (2026-10-22)

At the owner's request, only the two hero actions now keep the same white
(#e5e5e5) fill and black text in both modes. Hover/focus uses the fixed hero blue
(#4da3ff), with no text underline; keyboard focus still has its visible ring.
The demo action group now starts at the heading's left edge. Increased the
shared section-spacing token by 50% to a responsive 72–120px, preserving grid
rules and internal card spacing.

Production browser checks at 375, 1280, and 1920px in both themes confirm the
same hero fills, zero demo-button/heading horizontal offset, section padding of
72px / 115.2px / 120px, and no clipped labels, page overflow, or axe WCAG A/AA
violations. Hover fixtures in both themes confirm #4da3ff fill with no underline.
Evidence: `tmp/ui-qa/spacing-light.json`, `tmp/ui-qa/spacing-dark.json`,
`tmp/ui-fixed-hero-buttons.png`, and `tmp/ui-demo-left-spaced.png`.
`npm test` (6 tests), `npm run build`, and `git diff --check` pass.

## 15. Vertical Key Features layout (2026-10-22)

Changed the six feature cards into one vertical list of full-width rows. Each
heading and description is grouped beside its existing image/video. Desktop
rows use a 1.6:1 media/text split with the shared gutter between them and centered
vertical alignment; media is approximately 708–714px wide at checked desktop
sizes, around 30% larger than before. At 768px and below, media and copy stack
in their original reading order. Content, media attributes, playback, and other
section layouts remain unchanged. Each feature row retains a full-width rule.

Production checks at 375, 1280, and 1920px in both themes confirm six rows, text
beside media on desktop and below it on phones, no clipped labels or horizontal
page overflow, and zero axe WCAG A/AA violations. Evidence is saved in
`tmp/ui-qa/features-light.json`, `tmp/ui-qa/features-dark.json`, and
`tmp/ui-feature-rows.png`. `npm test` (6 tests), `npm run build`, and
`git diff --check` pass.

## 16. Rule-free feature visuals with background fades (2026-10-22)

Renamed the section heading to "Features" while preserving its #features anchor.
Removed its ruled-grid decoration, grid borders, and visual outlines; all other
sections retain their rules. Each feature visual now has 16px top corners,
square bottom corners, and a CSS alpha mask fading its lower 45% into the page
background. The visual shifts downward 16px while its row and copy remain in
place. Feature paragraphs now use the title's text colour at 15px instead of
16px muted text. Media, descriptions, and playback are unchanged.

Live screenshots confirm the fade blends into both white and black page
backgrounds. Production checks at 375, 1280, and 1920px in both themes confirm
all six masks, top-only radii, absent row rules, title/paragraph colour equality,
and 15px copy. There are no clipped labels, horizontal overflow, or axe WCAG A/AA
violations. The phone layout keeps copy below the downward-shifted media without
overlap. Evidence: `tmp/ui-qa/feature-fade-light.json`,
`tmp/ui-qa/feature-fade-dark.json`, and `tmp/ui-features-fade-dark.png`.
`npm test` (6 tests), `npm run build`, and `git diff --check` pass.
