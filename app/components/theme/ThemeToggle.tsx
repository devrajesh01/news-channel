"use client";

import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

type ThemeToggleProps = {
  variant?: "icon" | "switch" | "switch-vertical";
};

export default function ThemeToggle({ variant = "switch" }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = !dark;

    html.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  // Avoid hydration mismatch — placeholder sized per variant
  if (!mounted) {
    const placeholderClass =
      variant === "switch"
        ? "h-8 w-14 rounded-full"
        : variant === "switch-vertical"
        ? "h-14 w-8 rounded-full"
        : "h-9 w-9 rounded-full";

    return <div className={`border border-[var(--border)] ${placeholderClass}`} />;
  }

  if (variant === "switch") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        role="switch"
        aria-checked={dark}
        aria-label="Toggle theme"
        className="relative flex h-8 w-14 cursor-pointer items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-1 transition-colors"
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-sm transition-transform duration-300 ${
            dark ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {dark ? <LuMoon className="h-3.5 w-3.5" /> : <LuSun className="h-3.5 w-3.5" />}
        </span>
      </button>
    );
  }

  if (variant === "switch-vertical") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        role="switch"
        aria-checked={dark}
        aria-label="Toggle theme"
        className="relative flex h-14 w-8 cursor-pointer flex-col items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] py-1 transition-colors"
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-sm transition-transform duration-300 ${
            dark ? "translate-y-6" : "translate-y-0"
          }`}
        >
          {dark ? <LuMoon className="h-3.5 w-3.5" /> : <LuSun className="h-3.5 w-3.5" />}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-foreground transition hover:border-accent-hover hover:bg-[var(--surface)] hover:text-accent"
    >
      {dark ? <LuSun className="h-4 w-4" /> : <LuMoon className="h-4 w-4" />}
    </button>
  );
}