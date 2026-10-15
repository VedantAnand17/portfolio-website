import { useSyncExternalStore } from "react";

function applyTheme(value: string) {
  const dark = value === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === "theme" || event.key === null) {
      applyTheme(event.newValue ?? "light");
      listener();
    }
  };
  window.addEventListener("portfolio-theme", listener);
  window.addEventListener("storage", onStorage);
  try {
    applyTheme(localStorage.getItem("theme") ?? "light");
  } catch {
    /* Keep the current theme when storage is unavailable. */
  }
  return () => {
    window.removeEventListener("portfolio-theme", listener);
    window.removeEventListener("storage", onStorage);
  };
}
function snapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, snapshot, () => "light");
  return {
    theme,
    resolvedTheme: theme,
    setTheme(value: string) {
      applyTheme(value);
      try {
        localStorage.setItem("theme", value);
      } catch {
        /* Storage can be disabled. */
      }
      window.dispatchEvent(new Event("portfolio-theme"));
    },
  };
}
