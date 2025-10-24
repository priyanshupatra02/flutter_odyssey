"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Lightning, Planet } from "@phosphor-icons/react/dist/ssr";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Interactions", href: "#interactions" },
  { label: "Code", href: "#code" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-6 z-50 mx-auto flex max-w-6xl items-center gap-6 rounded-full border border-outline/30 bg-surface/80 px-6 py-3 shadow-inner-strong backdrop-blur-xl md:gap-8"
    >
      <Link
        href="#"
        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.32em] text-foreground/70 transition-colors hover:text-foreground"
        data-cursor-target
        data-cursor-text="Navigate •"
        data-cursor-padding="72"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/20">
          <Planet size={22} weight="duotone" className="text-accent" />
        </span>
        Flutter Odyssey
      </Link>
      <div className="hidden flex-1 items-center justify-center md:flex">
        <div className="flex items-center gap-6 text-sm font-medium text-foreground/70">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -3 }}
              className="relative px-1 py-1 transition-colors hover:text-foreground"
              data-cursor-target
              data-cursor-text={`${link.label} •`}
              data-cursor-padding="60"
            >
              {link.label}
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent/90"
                whileHover={{ scaleX: 1 }}
              />
            </motion.a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link
          href="#experience"
          className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-full border border-outline/40 bg-gradient-to-r from-accent/80 via-accent to-accent/80 px-5 text-sm font-semibold text-accent-foreground shadow-[0_10px_40px_rgba(var(--glow-rgb),0.35)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_12px_50px_rgba(var(--glow-rgb),0.45)] md:flex"
          data-cursor-target
          data-cursor-text="Experience •"
          data-cursor-padding="90"
          data-cursor-tone="dark"
        >
          <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full" />
          <Lightning size={20} weight="duotone" className="relative" />
          Experience Widget
        </Link>
        <Link
          href="#code"
          className="flex h-11 items-center gap-2 rounded-full border border-outline/40 bg-surface/80 px-4 text-sm font-semibold text-foreground/80 transition-colors hover:border-outline/70 hover:text-foreground"
          data-cursor-target
          data-cursor-text="Reveal •"
          data-cursor-padding="70"
        >
          <Code size={20} weight="duotone" className="text-accent" />
          <span className="hidden sm:inline">Reveal Code</span>
        </Link>
      </div>
    </motion.nav>
  );
}
