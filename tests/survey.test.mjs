import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync("src/scripts/survey.js", "utf8");

function invitation() {
  const ready = {}, events = {}, triggerEvents = {}, closeEvents = {};
  let focus = "page";
  const close = {
    addEventListener: (name, fn) => { closeEvents[name] = fn; },
    focus: () => { focus = "close"; },
  };
  const trigger = {
    addEventListener: (name, fn) => { triggerEvents[name] = fn; },
    focus: () => { focus = "trigger"; },
  };
  const panel = {
    hidden: true,
    querySelector: () => close,
    contains: () => focus === "close",
    addEventListener: (name, fn) => { events[name] = fn; },
  };
  runInNewContext(source, { document: {
    get activeElement() { return focus === "close" ? close : trigger; },
    getElementById: () => panel,
    querySelectorAll: () => [trigger],
    addEventListener: (name, fn) => { ready[name] = fn; },
  } });
  return { panel, events, triggerEvents, closeEvents,
    ready: () => ready.DOMContentLoaded(), focus: () => focus };
}

test("corner invitation opens without taking focus or blocking page interaction", () => {
  const ui = invitation();
  ui.ready();
  assert.equal(ui.panel.hidden, false);
  assert.equal(ui.focus(), "page");
  assert.equal(ui.events.click, undefined);
  ui.closeEvents.click();
  assert.equal(ui.panel.hidden, true);
});

test("Feedback reopens the popup with keyboard access; Escape closes and restores focus", () => {
  const ui = invitation();
  ui.ready();
  ui.closeEvents.click();
  let prevented = false;
  ui.triggerEvents.click({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(ui.panel.hidden, false);
  assert.equal(ui.focus(), "close");
  ui.events.keydown({ key: "Tab", preventDefault() {} });
  assert.equal(ui.panel.hidden, false);
  ui.events.keydown({ key: "Escape", preventDefault() {} });
  assert.equal(ui.panel.hidden, true);
  assert.equal(ui.focus(), "trigger");
});
