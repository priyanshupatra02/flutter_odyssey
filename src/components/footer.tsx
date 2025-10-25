"use client";

import { motion } from "framer-motion";
import {
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: LinkedinLogo,
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-24 rounded-[36px] border border-outline/20 bg-surface/70 px-10 py-12 shadow-[0_28px_90px_rgba(12,16,32,0.16)] backdrop-blur-2xl md:px-16"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="eyebrow-pill bg-surface/60 px-5 py-2 text-foreground/60">
            <PaperPlaneTilt weight="duotone" className="text-accent" size={20} />
            Let&apos;s talk
          </div>
          <h3 className="heading-md text-foreground">
            Ready to ship Flutter experiences that wow?
          </h3>
          <p className="copy-md max-w-xl text-foreground/65">
            Odyssey is the blueprint for your next interactive widget. Reach out
            to collaborate, fork the project, or dive deeper into the motion
            system.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm text-foreground/70 md:text-base">
          <a
            href="mailto:hello@flutterodyssey.dev"
            className="inline-flex h-14 items-center justify-center rounded-full border border-outline/40 bg-gradient-to-r from-accent/80 via-accent to-accent/70 px-8 font-semibold text-accent-foreground shadow-[0_12px_40px_rgba(var(--glow-rgb),0.42)] transition-transform hover:-translate-y-1"
            data-cursor-target
            data-cursor-text="Email •"
            data-cursor-padding="120"
            data-cursor-tone="dark"
          >
            hello@flutterodyssey.dev
          </a>
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-outline/35 bg-surface/80 text-accent transition-colors hover:border-outline/70"
                data-cursor-target
                data-cursor-text={`${label} •`}
                data-cursor-padding="90"
              >
                <Icon size={26} weight="duotone" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="copy-md mt-10 flex flex-col gap-2 text-foreground/55 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Flutter Odyssey — Crafted for motion-first teams.</span>
        <span>Built with Next.js 16 · Flutter-inspired visuals · Animated by Framer Motion.</span>
      </div>
    </footer>
  );
}
