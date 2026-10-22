# Working rules

- UI and visual styling changes must follow `design/ui-design-spec.md`; section 0
  takes precedence. The `design/` folder is internal and must not be published.
- Preserve the site's identity and existing content, links, and functionality
  during visual alignment unless the owner explicitly requests a change.
- `src/`, `public/brand/`, and `public/assets/fonts/` (including font licenses) are hand-maintained.
  `dist/`, `.astro/`, and `node_modules/` are generated; do not hand-edit them.
- Run `npm run build` and any defined tests before handing back a commit.
- Push, merge, tag, release, or deploy only with the owner's explicit approval.
