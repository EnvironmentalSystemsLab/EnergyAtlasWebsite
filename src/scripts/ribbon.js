(() => {
  const root = document.documentElement;
  const hash = window.location.hash;
  // Anticipate a deep anchor before the browser restores its scroll position.
  root.dataset.ribbon = window.scrollY > 0 || (hash && hash !== "#main")
    ? "raised" : "overlay";
  let pending = false;

  function update() {
    pending = false;
    root.dataset.ribbon = window.scrollY > 0 ? "raised" : "overlay";
  }

  function schedule() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", schedule, { passive: true });
  for (const event of ["pageshow", "hashchange", "resize"]) {
    window.addEventListener(event, schedule);
  }
  document.addEventListener("DOMContentLoaded", schedule, { once: true });
})();
