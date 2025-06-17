"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme") || "dark"
  );
  const [customColor, setCustomColor] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("customColor") || "#6366f1"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "custom");
    if (theme === "custom") {
      document.documentElement.classList.add("custom");
      document.documentElement.style.setProperty("--primary", customColor);
      window.localStorage.setItem("customColor", customColor);
    } else {
      document.documentElement.classList.add(theme);
    }
    window.localStorage.setItem("theme", theme);
  }, [theme, customColor]);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        aria-label="Toggle theme"
        className="rounded p-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
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
          <input
            type="color"
            value={customColor}
            onChange={e => setCustomColor(e.target.value)}
            className="w-8 h-8 border-2 border-neutral-400 rounded-full cursor-pointer"
            title="Pick a custom color"
          />
          <input
            type="text"
            value={customColor}
            onChange={e => setCustomColor(e.target.value)}
            className="w-24 ml-2 px-2 py-1 rounded border border-neutral-400 bg-white text-black text-sm"
            maxLength={7}
            pattern="#?[0-9A-Fa-f]{6}"
            title="Enter a hex color code"
          />
        </>
      )}
    </div>
  );
}
