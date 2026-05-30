import { useEffect, useState } from "react";

export const THEME_KEY = "henghuy-theme";
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return [theme, () => setTheme(t => (t === "dark" ? "light" : "dark"))];
};

// ─── DATA ───────────────────────────────────────────────────────────────────
