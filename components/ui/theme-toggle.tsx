"use client";
import * as React from "react";
import { motion } from "framer-motion";

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
    <motion.button
      aria-label="Toggle theme"
      className="rounded p-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
        {theme === "dark" ? "🌙" : "☀️"}
      </motion.span>
    </motion.button>
  );
}
