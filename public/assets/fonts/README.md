# Local fonts

Vendored on 2026-10-21 from the official npm registry with `npm pack`:

- `@fontsource-variable/geist@5.3.0`: Latin and Latin Extended variable WOFF2,
  normal and italic, weight axis 100–900. License: `Geist-OFL.txt`.
  Package SHA-1: `59084c5e2ffa77c6e3c63bc06f3af62ba4dbbdc5`.
- `@fontsource-variable/roboto-flex@5.3.0`: Latin full-axis variable WOFF2,
  retained for the expanded EnergyAtlas wordmark. License: `Roboto-Flex-OFL.txt`.
  Package SHA-1: `f47e978c349819bd78c5f4600e05795dc5b916e0`.

The binaries and licenses are unmodified. `src/styles/fonts.css` declares the
families. The normal Latin interface font and wordmark font are preloaded by the
page. No runtime font-host or CDN requests are needed.
