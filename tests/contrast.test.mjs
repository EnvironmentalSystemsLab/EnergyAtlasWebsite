import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

// Catch palette edits that make real text, button states, or focus edges illegible.
const source = readFileSync("src/styles/tokens.css", "utf8");
function declarations(block) {
  assert.ok(block, "The theme's CSS token block must exist");
  return Object.fromEntries([...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)]
    .map((entry) => [entry[1], entry[2].trim()]));
}
const light = declarations(source.match(/:root\s*\{([^}]+)\}/)?.[1]);
const dark = declarations(source.match(/:root\[data-theme="dark"\]\s*\{([^}]+)\}/)?.[1]);
const fallback = declarations(source.match(/@media\s*\(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme\]\)\s*\{([^}]+)\}/)?.[1]);
assert.deepEqual(dark, fallback, "Explicit and system dark palettes must agree");

function luminance(hex) {
  assert.match(hex ?? "", /^#[\da-f]{6}$/i, `Expected an opaque colour, got ${hex}`);
  const [r, g, b] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground, background) {
  const [a, b] = [foreground, background].map(luminance).sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

for (const [name, tokens] of [["light", light], ["dark", { ...light, ...dark }]]) {
  test(`${name}: text, links, controls, and state indicators meet WCAG AA`, () => {
    const check = (fg, bg, minimum) => {
      const ratio = contrast(tokens[`--ui-${fg}`], tokens[`--ui-${bg}`]);
      assert.ok(ratio >= minimum, `${name} ${fg} on ${bg}: ${ratio.toFixed(2)} < ${minimum}`);
    };
    for (const surface of ["bg", "surface", "raised", "pressed"]) {
      for (const text of ["text", "muted", "accent"]) check(text, surface, 4.5);
      for (const edge of ["border-interactive", "focus"]) check(edge, surface, 3);
    }
    for (const state of ["accent", "accent-hover", "accent-pressed"]) {
      check("on-accent", state, 4.5);
      check(state, "bg", 3);
    }
    check("text", "selection", 4.5);
    check("hero-on-accent", "hero-muted", 4.5); // Fixed white hero actions in both themes.
    check("hero-edge", "hero-backdrop", 3); // Edge stays visible over bright video.
    check("on-accent", "accent", 4.5);
    for (const foreground of ["hero-text", "hero-muted", "hero-link", "hero-edge"]) {
      check(foreground, "hero-surface", foreground === "hero-edge" ? 3 : 4.5);
    }
    // Hero primary blue sits on both black video frames and the opaque footer.
    for (const background of ["hero-surface", "hero-backdrop"]) {
      for (const state of ["hero-link", "hero-hover", "hero-pressed"])
        check(state, background, 3);
    }
    for (const state of ["hero-link", "hero-hover", "hero-pressed"])
      check("hero-on-accent", state, 4.5);
  });
}
