import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync("src/scripts/theme.js", "utf8");

function browser({ stored = null, dark = false, blockedStorage = false } = {}) {
  const attributes = {};
  const root = { dataset: {} };
  const events = {};
  const buttonEvents = {};
  const systemEvents = {};
  const button = {
    hidden: true,
    setAttribute: (key, value) => { attributes[key] = value; },
    addEventListener: (key, callback) => { buttonEvents[key] = callback; },
  };
  const media = {
    matches: dark,
    addEventListener: (key, callback) => { systemEvents[key] = callback; },
  };
  let ready = false;
  const storage = new Map(stored === null ? [] : [["energyatlas-theme", stored]]);
  runInNewContext(source, {
    document: {
      documentElement: root,
      getElementById: () => ready ? button : null,
      addEventListener: (key, callback) => { events[key] = callback; },
    },
    window: { matchMedia: () => media },
    localStorage: {
      getItem: (key) => {
        if (blockedStorage) throw new Error("Storage unavailable");
        return storage.get(key) ?? null;
      },
      setItem: (key, value) => {
        if (blockedStorage) throw new Error("Storage unavailable");
        storage.set(key, value);
      },
    },
  });
  return {
    root, button, attributes, storage,
    ready() { ready = true; events.DOMContentLoaded?.(); },
    click() { buttonEvents.click?.(); },
    systemDark(value) { media.matches = value; systemEvents.change?.(); },
  };
}

test("saved theme wins over system preference before the control exists", () => {
  const page = browser({ stored: "light", dark: true });
  assert.equal(page.root.dataset.theme, "light");
  assert.equal(page.button.hidden, true);
  page.ready();
  assert.equal(page.button.hidden, false);
  assert.equal(page.attributes["aria-checked"], "false");
  page.systemDark(false);
  page.systemDark(true);
  assert.equal(page.root.dataset.theme, "light");
});

test("default follows the system until a toggle stores an explicit choice", () => {
  const page = browser();
  assert.equal(page.root.dataset.theme, "light");
  page.ready();
  page.systemDark(true);
  assert.equal(page.root.dataset.theme, "dark");
  assert.equal(page.attributes["aria-checked"], "true");
  page.click();
  assert.equal(page.root.dataset.theme, "light");
  assert.equal(page.storage.get("energyatlas-theme"), "light");
  assert.equal(page.attributes["aria-checked"], "false");
  page.systemDark(false);
  page.systemDark(true);
  assert.equal(page.root.dataset.theme, "light");
  page.click();
  assert.equal(page.root.dataset.theme, "dark");
  assert.equal(page.storage.get("energyatlas-theme"), "dark");
  assert.equal(page.attributes["aria-checked"], "true");
});

test("invalid saved values fall back to the system", () => {
  assert.equal(browser({ stored: "invalid", dark: true }).root.dataset.theme, "dark");
});

test("switch works for this visit when storage access is blocked", () => {
  const page = browser({ dark: true, blockedStorage: true });
  assert.equal(page.root.dataset.theme, "dark");
  page.ready();
  page.click();
  assert.equal(page.root.dataset.theme, "light");
  assert.equal(page.attributes["aria-checked"], "false");
});
