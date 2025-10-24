"use client";

import { useTheme } from "next-themes";
import { MoonStars, SunHorizon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isReady = typeof resolvedTheme === "string";
  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      className="relative flex h-11 w-20 items-center justify-center rounded-full border border-outline/40 bg-surface/80 text-foreground/80 shadow-inner-strong backdrop-blur-md transition-all duration-500 hover:border-outline/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 via-transparent to-accent/25 opacity-0 transition-opacity duration-500 hover:opacity-100" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isReady ? (isDark ? "moon" : "sun") : "loading"}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {isReady ? (
            isDark ? (
              <MoonStars size={26} weight="duotone" className="text-accent" />
            ) : (
              <SunHorizon size={26} weight="duotone" className="text-accent" />
            )
          ) : (
            <span className="block h-6 w-6 animate-pulse rounded-full border border-outline/60" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
