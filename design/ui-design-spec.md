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
  blue links and actions, and near-square corners. Remove glow,
  gradient buttons, floating card shadows, and card lift animations. Feature
  visuals alone use the faint, fading edge glow specified below.
- Default to the system theme, with a CSS first-frame fallback. A sun/moon switch
  in the top ribbon toggles light/dark and remembers an explicit choice locally.
  Apply saved preferences before first paint, follow system changes until a
  choice is made, and remain usable when browser storage is unavailable.
  No docking, grid, or chart libraries are involved.
- Use the template families, locally hosted: Geist for interface, headings,
  wordmark, and normal-case labels; Geist Mono for DOI/media identifiers; Cormorant
  Garamond italic 500 for the short hero subtitle and feature summary sentences.
  Explicitly enable normal kerning and common/contextual ligatures on these
  serif roles, without changing font files or the established size scale.
  This replaces the earlier
  Roboto Flex wordmark and system-monospace exceptions at the owner's request.
  Keep wording as written. Button labels use the BEMGen wiki's mono uppercase
  treatment. Header navigation follows Archetype Atlas's mono uppercase tabs;
  other labels remain normal-case sans.
- Preserve the city video hero, heading, copy, and actions. Remove the four
  checkmarked trust items and their strip, with 40px between subtitle and actions. Tighten
  its spacing, keep a legible overlay on mobile, and allow its height to grow to
  fit content. The video and its overlay span the full available page width,
  independently of the centered text container. No vertical page-frame lines
  appear anywhere, including the header, hero, sections, or footer. Do not change
  video playback behavior in this pass.
- The hero begins at y=0 and fills at least the visible viewport height, with
  the fixed ribbon overlaid. Keep enough padding for the ribbon and allow the
  hero to grow on short screens so its content remains readable.
  At the initial top position, hide the ribbon background/border and brand name;
  retain the brand mark, navigation, and theme icon with legible light colours
  over video. Fade the background and name in over 240ms whenever scrollY is
  positive, including anchor navigation and restored scroll positions. Returning
  to the top restores the transparent state. Respect reduced-motion preference.
- Left-align the hero title, subtitle, and actions. Set the subtitle to 60% of
  the title size, in exactly two lines with a break after "for". Keep the
  template serif italic family and a proportional scale on phone screens.
- Align section headings and card copy to the same content grid. Keep borderless
  grids for publications, media, and team. Products uses the bordered card row
  described below; hide Tech Stack for now while preserving its content. Keep
  section titles on the page, without numbered strips or backdrops.
- Keep the `#features` bookmark and an accessible "Features" heading, but hide
  that generic heading visually. Use three vertically stacked video rows:
  "Agentic Digital Twin", "City-Scale Energy Insights", and "Distributed Energy
  Resources Integration". Keep the original three videos in that order and merge
  the former six cards' relevant copy. Cover agentic reasoning and assistance;
  load forecasting, power/grid studies, scenario and climate action planning;
  and distributed resources including storage, EV charging, demand response,
  smart buildings, and combined heat and power. Remove promotional 3D
  reconstruction references, including the module blurb. Give each feature title
  the same typography as a section heading, spanning the row above its media and
  copy. On desktop, keep each media panel at roughly 62% of the row's inner width
  and the description on the right, vertically centered. At 768px and below,
  place the description beneath full-width media. Use one short summary sentence
  and three concise supporting points per feature, without visible bullet
  markers or indentation. Preserve list semantics for assistive technology.
  Preserve the order, media, and playback.
  Remove all feature grid rules and media outlines. Fade the bottom 25% of each
  visual smoothly into the page background, with 16px top corners and square
  bottom corners; offset visuals downward 16px. Feature copy uses the same text
  colour as its titles and 1.45 line height: 24–30px responsive summary sentences and 14px
  supporting points. Summary sentences use the template's Cormorant Garamond
  italic 500; supporting points retain Geist and use concise phrases. Use the shared 96–160px section spacing between feature
  rows, with no extra vertical card padding.
  Place one left-aligned editorial icon above each feature's serif summary,
  sized to three summary line heights (104.4–130.5px responsively).
  Give each visual a translucent neutral edge glow: black at 35% opacity on
  light backgrounds and white at 22% on dark backgrounds, with 96px blur and
  6px spread. These are the owner's chosen glow parameters; preserve them.
  Composite the glow and visual through one shared bottom fade, accounting for
  the glow's 96px drawing space so the visual's original fade position is kept.
  Both disappear completely at the visual's bottom edge, with no bottom glow.
  Bottom-align the first two screen recordings within their existing 16:9 frames,
  with a 1px upward trim, to hide their captured white title ribbons. Keep the
  source files unchanged and retain the default framing of all other visuals.
- Replace Modules with Products in the heading and ribbon; use `#products` and
  retain `#modules` as a legacy bookmark. Replace its six children with four
  adjacent cards: EnergyAtlas-MCP, EnergyAtlas-Agent, EnergyAtlas-API, and
  EnergyAtlas-Wiki. Each has one short sentence and a 64px regular sketch icon.
  Only Wiki links to `https://energy-atlas.github.io/`; the other three remain
  static articles without click targets or link affordances. Use one bordered
  row of four equal cells spanning exactly the content width, with shared edges
  and no gutters between cards; wrap to two columns on tablets and one on phones.
  Adopt the wiki icon-card hover shade: a soft 16% accent gradient and a cropped
  oversized copy of the icon at 14% opacity. Wiki also shows this on focus.
- Draw seven seeded editorial icons using `design/editorial_icons.py`, with
  regular (1.3) and bold (1.85) weights on the same 24-unit canvas. Deliver SVGs
  in `src/assets/icons/` and include them inline through one component; edit the
  generator, never the rendered SVGs. Ink follows text, the single accent follows
  theme blue. Metaphors: MCP connector, Agent open infinity loop with a blue
  arrowhead pointing toward its tail across a small gap, API code brackets,
  Wiki open book, city skyline within an open reasoning loop (Digital Twin
  candidate B), load chart, and distributed resource nodes. Keep the previous
  Digital Twin definition for comparison and later revisions.
  Animate only the blue accent while its card is hovered with a mouse/fine
  pointer; all icons rest completely still otherwise. Keep ink and decorative
  backdrop copies stable, and disable all icon motion for reduced-motion users.
  The owner delegated the complete initial icon set
  for later revision, superseding the skill's separate pilot approval gate;
  validate and inspect the API pilot before rendering the family.
- Remove section and grid separators outside the requested Products cards. Retain
  the top ribbon's existing bottom boundary and add a matching full-width top
  boundary to the footer. The footer uses the page background and theme-aware
  text/link colours in both modes; its copyright year is 2027. Publication and
  media dates remain accurate. Content stays centered at its existing readable
  width. Control borders and link/focus indicators retain their dimensions.
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
- Left-align the demo action group with its section heading. Use 96–160px of
  section spacing responsively, keeping the existing content widths.
- The theme switch has a 44px target around a 24px icon area matching the navigation
  chips' visible height, an accessible dark-theme on/off state,
  and sun/moon action icons. Hover and press change only the icon colour;
  no square background or animated fill appears in any state. Keep it beside
  the site name on phones, with all section navigation below it.
  Remove its standing border; keep its keyboard focus ring on the 24px area.
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
| Ruled frame and shared cells | Connected Products cards; other grids borderless | Shared Products edges only; no outer page rails |
| Geist interface typography | Body and headings | Adopt |
| Mono caps labels and editorial serif | Mono uppercase buttons/navigation; other labels normal-case sans; italic serif hero subtitle and feature summaries | Follow the owner's BEMGen and Archetype Atlas references |
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

The hero has its own fixed dark-surface roles; the footer uses the page roles.
Add explicit hover and
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

## 17. Hide captured title ribbons and shorten fades (2026-10-22)

The first two videos now bottom-align within their existing 16:9 frames, with
an additional 1px upward trim. Their 1922×1130 source frames are taller than
16:9, so object-fit cropping hides the captured white window ribbons without
modifying the files or changing frame dimensions. The other four visuals retain
their original centered framing. Shortened the shared fade from the lower 45%
to the lower 25%, keeping the upper 75% fully visible.

Browser inspection confirms both screen-capture ribbons are hidden, including
the first recording at phone width. At 375, 1280, and 1920px in both themes,
computed framing changes apply only to those two videos and all six masks start
fading at 75%. There is no clipped text, horizontal page overflow, or axe WCAG
A/AA violation. Evidence: `tmp/ui-qa/capture-crop-light.json`,
`tmp/ui-qa/capture-crop-dark.json`, `tmp/ui-capture-crop-first.png`, and
`tmp/ui-capture-crop-second.png`. `npm test` (6 tests), `npm run build`, and
`git diff --check` pass.

## 18. Remove the hero's checkmarked strip (2026-10-22)

Removed the four checkmarked trust items and their ruled strip from the hero,
along with their unused desktop/mobile styles and divider tokens. The subtitle
and two actions remain, separated by 40px. Browser verification confirms zero
badge elements, both action links present, full-width video, and no horizontal
overflow. `npm test` (6 tests), `npm run build`, and `git diff --check` pass.
Screenshot: `tmp/ui-hero-no-badges.png`.

## 19. Viewport hero and scroll-revealed ribbon (2026-10-22)

The fixed ribbon overlays the hero, which starts at y=0 and has a minimum height
of the visible viewport (dvh with svh/vh fallbacks). Responsive padding clears
the ribbon; short screens may grow to fit readable content. At the top, the
ribbon background/border and brand name are transparent while the mark, links,
and theme icon stay visible in contrast-tested light colours over video.
Positive scroll reveals the theme's ribbon surface and name with a 120ms fade;
returning to zero hides them again. Reduced-motion preference removes the fade.

A small head script anticipates deep anchors before paint and reconciles actual
scroll on scroll, DOM ready, pageshow, hash changes, and resizing. It batches
scroll events into one animation frame. The existing anchors and scroll/history
behavior remain intact. Without JavaScript, the ribbon stays opaque and named.
The theme control now paints a 24px square matching the navigation chips inside
its retained 44px native button target, with a visible keyboard focus ring.

Production frames at 375, 1280, and 1920px in both themes confirm hero height
matches the 800px viewport, hero top is zero, initial name opacity is zero,
background is transparent, and control/nav chips are 24px. All content clears
the ribbon, with no clipped labels, page overflow, or axe WCAG A/AA violations.
Normal and reduced-motion fixtures report 120ms and 0ms respectively. Live checks
cover Explore Features, PageDown scrolling, return to top, direct-anchor reload,
history restoration, light/dark switching, and keyboard focus/activation.

Ten tests and the production build pass, as does `git diff --check`. Independent
code review found no material issues. Evidence: `tmp/ui-qa/ribbon-light.json`,
`tmp/ui-qa/ribbon-dark.json`, `tmp/ui-hero-fullscreen-overlay.png`,
`tmp/ui-ribbon-revealed.png`, and `tmp/ui-ribbon-revealed-light.png`.

## 20. Slower ribbon reveal and frameless theme icon (2026-10-22)

Increased the shared ribbon/name fade from 120ms to 240ms. Removed the theme
switch's standing frame while preserving its 24px square visual area, 44px
click target, interaction fills, and keyboard focus ring. Browser checks confirm
240ms transitions, zero border width, successful scroll reveal, and the retained
2px focus indicator. Reduced-motion handling remains unchanged.
`npm test` (10 tests), `npm run build`, and `git diff --check` pass.
Screenshot: `tmp/ui-ribbon-frameless.png`.

## 21. Consolidate Features into three video stories (2026-10-22)

Merged the six cards into three rows, keeping the original three videos and
all playback/framing attributes. The new titles are "Agentic Digital Twin",
"City-Scale Energy Insights", and "Distributed Energy Resources Integration".
Rewrote the descriptions around agentic reasoning and assistance; load forecasts,
power/grid studies, scenario planning and climate action planning; and distributed
resources including storage, electric vehicle charging, demand response, smart
building controls, and combined heat and power. Interactive maps and planning
communication are folded into the new copy. Removed the three image-led cards
and replaced the promotional reconstruction module blurb with planning/map copy.
Existing publication citations remain accurate and unchanged.

Live inspection confirms exactly three feature videos with their original URLs,
no feature images, and no remaining promotional reconstruction/FacadeScanner
reference in the rendered text. Production checks at 375, 1280, and 1920px in
both themes confirm all three titles, correct desktop/phone arrangement, no
clipped headings or page overflow, and zero axe WCAG A/AA violations.
`npm test` (10 tests), `npm run build`, and `git diff --check` pass. Evidence:
`tmp/ui-qa/three-features-light.json`, `tmp/ui-qa/three-features-dark.json`, and
`tmp/ui-three-features.png`.

## 22. Feature hierarchy, concise copy, and spacing (2026-10-22)

Visually hid the generic Features heading while retaining its accessible heading
and the `#features` bookmark. Each feature title now spans the full row above
the media and description, using the same responsive 28–40px type as section
headings. Replaced each long paragraph with one summary sentence and three
bullets. Copy remains 15px in the title colour, with line height reduced from
1.65 to 1.45. Added 32–64px between feature cards and increased shared section
spacing from 72–120px to 96–160px. Video sources, crops, fades, and playback stay
unchanged.

Production checks at 375, 1280, and 1920px in light and dark themes show no
horizontal overflow, clipped headings, or axe WCAG A/AA violations. Live
inspection confirms all three headings sit above their visuals and match section
heading sizes, with three bullets each and the original bookmark intact.
`npm test` (10 tests), `npm run build`, and `git diff --check` pass. Evidence:
`tmp/ui-qa/feature-hierarchy-light.json`,
`tmp/ui-qa/feature-hierarchy-dark.json`, and `tmp/ui-feature-hierarchy.png`.

## 23. Feature summary emphasis and matching gaps (2026-10-22)

Removed visible list markers and indentation, retaining accessible list semantics
and all supporting text. Summary sentences now use the existing 20px card type
scale; supporting points use the 14px label scale. Both retain 1.45 line height
and the title text colour. Feature rows now use the section-spacing token, with
vertical card padding removed so the actual gaps match: at 1280px, both the
card-to-card gap and the gap before Modules measure 153.59375px.

All 10 tests, the production build, and `git diff --check` pass. Browser checks
at 375, 1280, and 1920px in both themes report no overflow, clipped headings, or
axe WCAG A/AA violations. Evidence: `tmp/ui-qa/feature-spacing-light.json`,
`tmp/ui-qa/feature-spacing-dark.json`, and `tmp/ui-feature-spacing.png`.

## 24. Faint feature visual glow (2026-10-22)

Added a neutral 16px edge glow to all three videos: 10% black in light mode and
12% white in dark mode, including the system-theme fallback. A padded wrapper
composites each video and its shadow through one mask. Adjusted gradient stops
for the 24px drawing space preserve the original bottom-quarter fade and reach
full transparency at the media's bottom edge. The framing, corners, video
sources, playback, text layout, and card/section gaps remain unchanged.

Verified both themes at 375, 1280, and 1920px: no overflow, clipped headings, or
axe WCAG A/AA violations. Live theme switching resolves the correct glow colour;
screenshots show the glow fading away before the bottom edge. All 10 tests,
`npm run build`, and `git diff --check` pass. Evidence:
`tmp/ui-qa/feature-glow-light.json`, `tmp/ui-qa/feature-glow-dark.json`,
`tmp/ui-feature-glow-light.png`, and `tmp/ui-feature-glow-dark.png`.

## 25. Increase glow visibility (2026-10-22)

The owner found the initial glow too faint. Increased opacity to 28% white in
dark mode and 20% black in light mode, widened blur to 24px, and added 2px spread.
Expanded drawing space to 40px and kept the shared mask aligned to the original
media fade, with full transparency at its bottom edge. Screenshots confirm a
visible soft halo at the top and sides in both themes, with no bottom halo.

All 10 tests, the production build, and `git diff --check` pass. Browser checks
at 375, 1280, and 1920px in both themes show no overflow, clipped headings, or
axe WCAG A/AA violations. Evidence: `tmp/ui-qa/feature-glow-visible-light.json`,
`tmp/ui-qa/feature-glow-visible-dark.json`, `tmp/ui-feature-glow-visible.png`, and
`tmp/ui-feature-glow-visible-light.png`.

## 26. Balance glow transparency across themes (2026-10-22)

The working tree already had a wider 48px blur, 48px drawing space, and 3px
spread, with the light-theme opacity reduced to 10%. Preserved those wider
dimensions. Set the translucent black halo to 35% opacity so it remains visible
on white; softened the white halo to 22% opacity in both dark-theme paths.
The video opacity and bottom fade remain unchanged.

Screenshots confirm the light-theme halo is visible and the bottom stays clear.
Both themes pass browser checks at 375, 1280, and 1920px with no overflow,
clipped headings, or axe WCAG A/AA violations. All 10 tests, `npm run build`, and
`git diff --check` pass. Evidence: `tmp/ui-qa/feature-glow-translucent-light.json`,
`tmp/ui-qa/feature-glow-translucent-dark.json`,
`tmp/ui-feature-glow-translucent-light.png`, and
`tmp/ui-feature-glow-translucent-dark.png`.

## 27. Owner glow settings, serif summaries, and borderless sections (2026-10-22)

Recorded the owner's chosen glow values without changing them: 6rem (96px)
blur and drawing space, 6px spread, 35% black in light mode and 22% white in
dark mode. Feature summary sentences now use the locally hosted Cormorant
Garamond italic 500 face, retaining their 20px size and existing line spacing.
Supporting points remain Geist.

Removed grid boundary pseudo-elements, grid borders, and contrasting gap fills
from all sections. Kept the ribbon boundary and control/focus indicators. The
footer now shares the page background, text, and link roles, with a full-width
1px top border using the ribbon's rule token. Updated its copyright to 2027;
publication and media dates remain unchanged.

Live checks confirm the serif family/style/weight on all three summaries,
zero borders on all five content grids, preserved glow values, and matching
footer/page backgrounds in both themes. Production checks at 375, 1280, and
1920px in both themes report no overflow, clipped headings, or axe WCAG A/AA
violations. All 10 tests, `npm run build`, and `git diff --check` pass. Evidence:
`tmp/ui-qa/serif-borderless-light.json`, `tmp/ui-qa/serif-borderless-dark.json`,
`tmp/ui-serif-features.png`, `tmp/ui-footer-background-dark.png`, and
`tmp/ui-footer-background-light.png`.

## 28. Larger serif summaries and icon-only theme states (2026-10-22)

Increased feature summary type from 20px to a responsive 24–30px scale, retaining
Cormorant Garamond italic 500 and the existing line spacing. Shortened all nine
supporting points while keeping the three feature themes and marker-free layout.
The owner's glow settings remain unchanged.

Removed the theme switch's square background in rest, hover, focus, and pressed
states, along with its fill transition. Only icon colour transitions remain;
hover uses accent and press uses pressed accent, with the video-backed pressed
colour resolved from the existing hero palette. The 44px target and keyboard
focus outline remain. Pointer activation from an unfocused state shows no ring
or fill; keyboard navigation retains the 2px focus outline.

All 10 tests, `npm run build`, and `git diff --check` pass. Production checks at
375, 1280, and 1920px in both themes confirm 24px/30px summary sizes with no
overflow, clipped headings, or axe WCAG A/AA violations. Hover/pressed fixtures
in both themes confirm transparent button and pseudo-element backgrounds and
colour-only transitions. Evidence: `tmp/ui-qa/feature-type-light.json`,
`tmp/ui-qa/feature-type-dark.json`, `tmp/ui-qa/theme-icon-states.json`, and
`tmp/ui-feature-summary-size.png`.

## 29. Products and editorial icon family (2026-10-22)

Replaced Modules with Products in the ribbon and page heading, with four equal,
adjacent bordered cards spanning the title's content frame. MCP, Agent, and API
are static articles; Wiki is a whole-card link to the wiki, with an underlined
title and directional mark. Each has one summary sentence. The new bookmark is
`#products`; `#modules` remains a compatible target with the same ribbon state.
Tech Stack is hidden with its original content preserved for later restoration.

Used the editorial-icons native-vector pipeline: a validated API pilot followed
by seven seeded drawings, each in regular and bold weights (14 SVGs total).
The owner requested the full initial design before advising on revisions, so
the separate pilot approval pause was omitted. The pilot and complete set were
visually checked on light and dark backgrounds at 120px and 24px. Definitions
live in `design/editorial_icons.py`, validated assets in `src/assets/icons/`, and
inline/theme integration in `src/components/EditorialIcon.astro`. The source
rule is recorded in AGENTS.md; Python caches are ignored. No draw-plugin sketch
or generated preview is shipped.

Product icons render at 64px, with gently animated blue accents. Feature icons
sit above and align with each serif summary: 104.4px on phones and 130.5px on
desktop, exactly three summary line heights. Stable ink follows the text colour;
each single accent follows theme blue. Reduced-motion mode disables all seven
foreground animations. The wiki card recipe supplies a 16% gradient wash and
a cropped regular icon at 14% opacity on hover (also Wiki keyboard focus), with
no icon/card lift. Text contrast in the worst overlapping wash/backdrop region
is 10.58:1 light and 11.10:1 dark. Wiki retains distinct hover, press, and focus
indicators; static cards remain outside the tab order.

Browser checks at 375, 800, 1280, and 1920px confirm 1/2/4/4 columns, matching
heading and grid edges, one active product link, hidden Tech Stack with zero
height, no horizontal overflow or clipped labels, and zero settled-state axe
WCAG A/AA violations in both themes. An initial phone scan caught the existing
ribbon palette transition mid-scroll; rechecking the settled state passed.
The Wiki link was clicked successfully (the wiki redirects to `/quick-start/`),
legacy bookmark/selection and keyboard focus were checked, and reduced motion
reports `none` for all seven foreground icons. The style audit reports zero
colour or font-size literals outside tokens (font-face definitions excluded).

All 14 SVGs pass the custom-icons validator individually and the matching-canvas
check. All 10 tests, `npm run build`, and `git diff --check` pass. Independent
review found no material issues. Evidence: `tmp/ui-qa/products-light.json`,
`tmp/ui-qa/products-dark.json`, `tmp/ui-qa/products-motion.json`,
`tmp/ui-qa/products-hover.json`, `tmp/ui-qa/products-style-audit.json`,
`tmp/ui-products-light.png`, `tmp/ui-products-dark.png`,
`tmp/ui-feature-editorial-icons.png`, and `tmp/ui-icon-family.png`.

## 30. Hover-only motion, revised icons, and serif shaping (2026-10-22)

Icons now have no animation at rest. A mouse/fine-pointer hover over a Product
card or feature row activates only its foreground accent; leaving resets it to
its original position. Keyboard focus alone does not start motion. Decorative
backdrops remain still, and reduced-motion mode overrides hover animation.
Live pointer checks confirm only Agent animates when its card is hovered and
all product icons stop after the pointer returns to the ribbon.

Replaced the Agent compass with a hand-drawn mathematical infinity loop, open
on the right. Its single blue arrowhead points toward the loose tail across a
small visible gap. Digital Twin candidate B shows a three-building city skyline
inside an open reasoning/feedback loop, with a blue arrow tip. It is displayed
in the page for review; the previous drawing remains in the generator as
`digital_twin_previous` and in the comparison preview. Changed definitions and
regenerated both weights, without hand-editing SVGs. All 14 family assets pass
individual validation and the matching-canvas check; reviewed the revised
regular and bold drawings at 150px and 24px on light and dark backgrounds.

Explicitly enabled `font-kerning: normal` and common/contextual ligatures on the
hero subtitle and all three serif summaries. Browser computed styles confirm
these values on all four roles, with font families, files, and sizes preserved.

All 10 tests, `npm run build`, and `git diff --check` pass. Both themes pass
375/800/1280/1920px checks with no overflow, clipped headings, or axe WCAG A/AA
violations. Hover fixtures activate all seven foreground accents in either
theme; reduced-motion fixtures report `none` for all seven, and backdrop copies
always report `none`. Evidence: `tmp/ui-qa/icons-typography-light.json`,
`tmp/ui-qa/icons-typography-dark.json`, `tmp/ui-qa/icons-hover-states.json`,
`tmp/ui-icon-revisions.png`, and `tmp/ui-twin-candidate-in-page.png`.
