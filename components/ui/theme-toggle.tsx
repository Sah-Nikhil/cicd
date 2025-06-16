"use client";
import * as React from "react";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme") || "dark"
  );

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      className="rounded p-2 border border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
        