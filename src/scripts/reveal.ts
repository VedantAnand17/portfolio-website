const preference = matchMedia("(prefers-reduced-motion: reduce)");
if (!preference.matches && window.IntersectionObserver) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          delete (entry.target as HTMLElement).dataset.reveal;
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.05 }
  );
  for (const element of document.querySelectorAll<HTMLElement>(".blur-fade")) {
    const bounds = element.getBoundingClientRect();
    if (bounds.top >= innerHeight || bounds.bottom <= 0) {
      element.dataset.reveal = "pending";
      observer.observe(element);
    }
  }
  preference.addEventListener("change", () => {
    if (preference.matches) {
      observer.disconnect();
      for (const element of document.querySelectorAll<HTMLElement>(
        "[data-reveal]"
      )) {
        delete element.dataset.reveal;
      }
    }
  });
}
