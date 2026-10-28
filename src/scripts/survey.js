(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("survey-dialog");
    if (!dialog) return;
    const triggers = [...document.querySelectorAll("[data-survey-open]")];
    const closeButton = dialog.querySelector("[data-survey-close]");
    let returnFocus = triggers[0];

    function open(trigger) {
      returnFocus = trigger ?? triggers[0];
      dialog.hidden = false;
      if (trigger) closeButton?.focus({ preventScroll: true });
    }

    function close() {
      const restoreFocus = dialog.contains(document.activeElement);
      dialog.hidden = true;
      if (restoreFocus) returnFocus?.focus({ preventScroll: true });
    }

    triggers.forEach(trigger => trigger.addEventListener("click", event => {
      event.preventDefault();
      open(trigger);
    }));
    closeButton?.addEventListener("click", close);
    dialog.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    });
    open();
  }, { once: true });
})();
