"use client";
import * as React from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme") || "dark"
  );
  const [customColor, setCustomColor] = React.useState(
    typeof window !== "undefined" && window.localStorage.getItem("customColor") || "#6366f1"
  );
  const [showPicker, setShowPicker] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "custom");
    if (theme === "custom") {
      document.documentElement.classList.add("custom");
      document.documentElement.style.setProperty("--primary", customColor);
      window.localStorage.setItem("customColor", customColor);
    } else {
      document.documentElement.classList.add(theme);
      document.documentElement.style.removeProperty("--primary");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme, customColor]);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        aria-label="Toggle theme"
        className="rounded p-2 border border-neutral-400 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
        onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "custom" : "dark")}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.08, boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)" }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ outline: "none" }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: 180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -180, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-xl"
        >
          {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🎨"}
        </motion.span>
      </motion.button>
      {theme === "custom" && (
        <>
          <button
            className="rounded p-2 border border-neutral-300 bg-white text-neutral-900 shadow hover:bg-neutral-100 transition-colors duration-200"
            onClick={() => setShowPicker(v => !v)}
            style={{ outline: "none" }}
          >
            Pick Color
          </button>
          {showPicker && (
            <input
              type="color"
              value={customColor}
              onChange={e => setCustomColor(e.target.value)}
              className="ml-2 w-8 h-8 border-none bg-transparent cursor-pointer"
              style={{ verticalAlign: "middle" }}
            />
          )}
        </>
      )}
    </div>
  );
}
