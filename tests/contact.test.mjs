import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = readFileSync("src/scripts/contact.js", "utf8");
function contact({ blocked = false } = {}) {
  const ready = {}, events = {}, attributes = {};
  let copied, focused;
  const trigger = { addEventListener: (key, fn) => { events[key] = fn; },
    setAttribute: (key, value) => { attributes[key] = value; } };
  const copy = { addEventListener: (key, fn) => { events.copy = fn; } };
  const panel = { hidden: true };
  const title = { focus: () => { focused = true; } };
  const email = { textContent: "cl2749+energyatlas@cornell.edu" };
  const status = { textContent: "" };
  const elements = { "demo-request": trigger, "demo-contact": panel,
    "demo-contact-title": title, "demo-copy-email": copy,
    "demo-email": email, "demo-contact-status": status };
  runInNewContext(source, {
    document: { getElementById: id => elements[id],
      addEventListener: (key, fn) => { ready[key] = fn; } },
    navigator: { clipboard: { async writeText(value) {
      if (blocked) throw new Error("Clipboard unavailable");
      copied = value;
    } } },
  });
  ready.DOMContentLoaded();
  return { events, panel, status, attributes, focused: () => focused,
    copied: () => copied };
}

test("demo request reveals the recipient without requiring a mail handler", () => {
  const ui = contact();
  let prevented = false;
  ui.events.click({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(ui.panel.hidden, false);
  assert.equal(ui.attributes["aria-expanded"], "true");
  assert.equal(ui.focused(), true);
});

test("copy preserves the plus-address exactly", async () => {
  const ui = contact();
  await ui.events.copy();
  assert.equal(ui.copied(), "cl2749+energyatlas@cornell.edu");
  assert.equal(ui.status.textContent, "Email address copied.");
});

test("blocked clipboard access leaves a usable manual-copy instruction", async () => {
  const ui = contact({ blocked: true });
  await ui.events.copy();
  assert.equal(ui.status.textContent, "Select and copy the email address above.");
});
