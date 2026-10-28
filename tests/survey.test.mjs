import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync("src/scripts/survey.js", "utf8");

function invitation() {
  const ready = {};
  const events = {};
  const triggerEvents = {};
  const closeEvents = [{}, {}];
  const locked = new Set();
  let focused = false;
  const trigger = {
    addEventListener: (name, fn) => { triggerEvents[name] = fn; },
    focus: () => { focused = true; },
  };
  const dialog = {
    open: false,
    showModal() { this.open = true; },
    close() { this.open = false; events.close?.(); },
    addEventListener: (name, fn) => { events[name] = fn; },
    querySelectorAll: () => closeEvents.map(e => ({
      addEventListener: (name, fn) => { e[name] = fn; },
    })),
  };
  runInNewContext(source, { document: {
    activeElement: null,
    documentElement: { classList: {
      add: (name) => locked.add(name), remove: (name) => locked.delete(name),
    } },
    getElementById: () => dialog,
    querySelectorAll: () => [trigger],
    addEventListener: (name, fn) => { ready[name] = fn; },
  } });
  return { dialog, events, triggerEvents, closeEvents, locked,
    ready: () => ready.DOMContentLoaded(), focused: () => focused };
}

test("survey opens on arrival and stays open until an explicit dismissal", () => {
  const ui = invitation();
  ui.ready();
  assert.equal(ui.dialog.open, true);
  assert.equal(ui.locked.has("survey-open"), true);
  assert.equal(ui.events.click, undefined); // Backdrop clicks do not dismiss it.
  ui.closeEvents[0].click();
  assert.equal(ui.dialog.open, false);
  assert.equal(ui.locked.size, 0);
  assert.equal(ui.focused(), true);
});

test("Feedback reopens the dialog and the secondary close action unlocks the page", () => {
  const ui = invitation();
  ui.ready();
  ui.dialog.close(); // Native Escape also dispatches close.
  let prevented = false;
  ui.triggerEvents.click({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(ui.dialog.open, true);
  ui.closeEvents[1].click();
  assert.equal(ui.locked.size, 0);
  assert.equal(ui.focused(), true);
});
