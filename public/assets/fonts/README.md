# Local fonts

Vendored on 2026-10-21 from the official npm registry with `npm pack`:

- `@fontsource-variable/geist@5.3.0`: Latin and Latin Extended variable WOFF2,
  normal and italic, weight axis 100–900. License: `Geist-OFL.txt`.
  Package SHA-1: `59084c5e2ffa77c6e3c63bc06f3af62ba4dbbdc5`.
- `@fontsource-variable/geist-mono@5.3.0`: Latin and Latin Extended variable WOFF2,
  normal, weight axis 100–900. License: `Geist-Mono-OFL.txt`.
  Package SHA-1: `ef4ce98a5d7485a4944ead6f799346dc33eddc63`.
- `@fontsource/cormorant-garamond@5.3.0`: Latin and Latin Extended WOFF2,
  italic 500. License: `Cormorant-Garamond-OFL.txt`.
  Package SHA-1: `4d6baee3e9257be403a9fc406f42a8a75356824e`.

The binaries and licenses are unmodified. `src/styles/fonts.css` declares the
families. The normal Latin interface font and italic editorial font are preloaded
by the page. Geist also sets the wordmark; Geist Mono sets identifiers. No runtime
font-host or CDN requests are needed.
