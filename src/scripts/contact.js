(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("demo-request");
    const panel = document.getElementById("demo-contact");
    const title = document.getElementById("demo-contact-title");
    const email = document.getElementById("demo-email");
    const copy = document.getElementById("demo-copy-email");
    const status = document.getElementById("demo-contact-status");
    if (!trigger || !panel || !title || !email || !copy || !status) return;

    trigger.addEventListener("click", event => {
      event.preventDefault();
      panel.hidden = !panel.hidden;
      trigger.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) title.focus();
    });
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email.textContent.trim());
        status.textContent = "Email address copied.";
      } catch {
        status.textContent = "Select and copy the email address above.";
      }
    });
  }, { once: true });
})();
