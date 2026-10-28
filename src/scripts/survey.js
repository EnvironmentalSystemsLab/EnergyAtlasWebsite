(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.getElementById("survey-dialog");
    if (!dialog || typeof dialog.showModal !== "function") return;
    const triggers = [...document.querySelectorAll("[data-survey-open]")];
    let returnFocus = triggers[0];

    function open(trigger) {
      if (dialog.open) return;
      returnFocus = trigger ?? triggers[0];
      dialog.showModal();
      document.documentElement.classList.add("survey-open");
    }

    triggers.forEach(trigger => trigger.addEventListener("click", event => {
      event.preventDefault();
      open(trigger);
    }));
    dialog.querySelectorAll("[data-survey-close]").forEach(button => {
      button.addEventListener("click", () => dialog.close());
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("survey-open");
      returnFocus?.focus({ preventScroll: true });
    });
    open();
  }, { once: true });
})();
