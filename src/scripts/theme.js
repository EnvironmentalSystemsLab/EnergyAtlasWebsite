(() => {
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  let choice = null;
  let button;

  try {
    const saved = localStorage.getItem("energyatlas-theme");
    if (saved === "light" || saved === "dark") choice = saved;
  } catch {
    // Browser storage may be disabled; the switch still works for this visit.
  }

  function render() {
    const theme = choice ?? (system.matches ? "dark" : "light");
    root.dataset.theme = theme;
    if (button) {
      button.setAttribute("aria-checked", String(theme === "dark"));
      button.setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    }
  }

  render(); // Apply the saved choice in the head, before the first paint.
  system.addEventListener("change", () => { if (!choice) render(); });

  document.addEventListener("DOMContentLoaded", () => {
    button = document.getElementById("theme-toggle");
    if (!button) return;
    button.hidden = false;
    render();
    button.addEventListener("click", () => {
      choice = root.dataset.theme === "dark" ? "light" : "dark";
      render();
      try {
        localStorage.setItem("energyatlas-theme", choice);
      } catch {
        // Keep the selected theme even when it cannot be persisted.
      }
    });
  }, { once: true });
})();
