import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync("src/scripts/ribbon.js", "utf8");

function page({ y = 0, hash = "" } = {}) {
  const root = { dataset: {} };
  const events = {};
  const frames = [];
  const window = {
    scrollY: y,
    location: { hash },
    addEventListener: (name, callback) => { events[name] = callback; },
    requestAnimationFrame: (callback) => { frames.push(callback); },
  };
  runInNewContext(source, {
    window,
    document: {
      documentElement: root,
      addEventListener: (name, callback) => { events[name] = callback; },
    },
  });
  return {
    root, window,
    fire(name) { events[name]?.(); },
    flush() { while (frames.length) frames.shift()(); },
    pending() { return frames.length; },
  };
}

test("top is transparent and scrolling reveals the ribbon, then resets at top", () => {
  const p = page();
  assert.equal(p.root.dataset.ribbon, "overlay");
  p.window.scrollY = 1;
  p.fire("scroll");
  p.flush();
  assert.equal(p.root.dataset.ribbon, "raised");
  p.window.scrollY = 0;
  p.fire("scroll");
  p.flush();
  assert.equal(p.root.dataset.ribbon, "overlay");
});

test("deep anchors and restored scroll positions start with the visible ribbon", () => {
  assert.equal(page({ hash: "#features" }).root.dataset.ribbon, "raised");
  assert.equal(page({ hash: "#main" }).root.dataset.ribbon, "overlay");
  assert.equal(page({ y: 400 }).root.dataset.ribbon, "raised");
});

test("history, hash, and layout events reconcile the actual scroll position", () => {
  for (const event of ["pageshow", "hashchange", "resize", "DOMContentLoaded"]) {
    const p = page({ hash: "#features" });
    p.fire(event);
    p.flush();
    assert.equal(p.root.dataset.ribbon, "overlay", `${event}: unresolved anchor at top`);
    p.window.scrollY = 500;
    p.fire(event);
    p.flush();
    assert.equal(p.root.dataset.ribbon, "raised", `${event}: restored position`);
  }
});

test("rapid scroll events share one animation frame and use the latest position", () => {
  const p = page();
  for (let y = 1; y <= 20; y++) {
    p.window.scrollY = y;
    p.fire("scroll");
  }
  assert.equal(p.pending(), 1);
  p.flush();
  assert.equal(p.root.dataset.ribbon, "raised");
});
