"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { Icon } from "@/src/components/Icon";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function apply(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  listeners.forEach((listener) => listener());
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => false);

  // React's dev remount clears the class the head script set.
  useLayoutEffect(() => {
    apply(localStorage.getItem("theme") === "dark");
  }, []);

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-field"
      onClick={() => {
        localStorage.setItem("theme", dark ? "light" : "dark");
        apply(!dark);
      }}
    >
      <Icon name={dark ? "sun" : "moon"} size={20} />
    </button>
  );
}
