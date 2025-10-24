"use client";

import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Cube, Sparkle, WaveSine, WifiHigh } from "@phosphor-icons/react/dist/ssr";
import { Spotlight } from "@/components/ui/spotlight";

const featureChips = [
  { label: "Adaptive Layouts", icon: Cube },
  { label: "Gesture Intelligence", icon: WaveSine },
  { label: "Real-time Sync", icon: WifiHigh },
];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxOne = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const parallaxTwo = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parallaxThree = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative flex min-h-screen flex-col justify-center py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto hidden h-[420px] w-[420px] rounded-full bg-gradient-to-br from-accent/18 via-transparent to-accent/8 blur-3xl md:block"
        style={{ y: parallaxThree }}
      />
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="group relative space-y-10 overflow-hidden rounded-[44px] border border-outline/20 bg-surface/70 p-10 shadow-[0_40px_120px_rgba(10,14,32,0.24)] backdrop-blur-xl">
          <Spotlight
            className="hidden md:block"
            size={560}
            fill="rgba(var(--glow-rgb),0.32)"
          />
          <div className="relative space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-3 rounded-full border border-outline/50 bg-surface/80 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/70 shadow-inner-strong backdrop-blur-md"
            >
              <Sparkle weight="duotone" className="text-accent" size={20} />
              interactive Flutter widget
            </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl"
          >
            Craft immersive Flutter experiences with cinematic motion and rich
            parallax storytelling.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-xl text-pretty text-lg text-foreground/70 md:text-xl"
          >
            Odyssey is an interactive widget journey built in Flutter. Explore
            how layered animations, tactile gestures, and glassmorphism blend
            into a delightful cross-platform interface ready for production.
          </motion.p>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/75"
            >
              {featureChips.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-outline/40 bg-surface/70 px-4 py-2 shadow-inner-strong backdrop-blur-md"
                >
                  <Icon size={20} weight="duotone" className="text-accent" />
                  {label}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#interactions"
              className="group relative flex h-14 items-center gap-3 overflow-hidden rounded-full border border-outline/40 bg-gradient-to-r from-accent/80 via-accent to-accent/80 px-8 text-base font-semibold text-accent-foreground shadow-[0_16px_45px_rgba(var(--glow-rgb),0.38)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(var(--glow-rgb),0.45)]"
              data-cursor-target
              data-cursor-text="Dive in •"
              data-cursor-padding="110"
              data-cursor-tone="dark"
            >
              <span className="absolute inset-0 translate-x-[-120%] bg-white/40 transition-transform duration-[900ms] ease-out group-hover:translate-x-[120%]" />
              Dive into Interactions
            </a>
            <a
              href="#code"
              className="flex h-14 items-center gap-3 rounded-full border border-outline/50 bg-surface/70 px-8 text-base font-semibold text-foreground/80 transition-colors hover:border-outline/80 hover:text-foreground"
              data-cursor-target
              data-cursor-text="Peek •"
              data-cursor-padding="100"
            >
              Peek at the code
            </a>
          </motion.div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <motion.div
            className="relative w-full max-w-sm rounded-[36px] border border-outline/30 bg-gradient-to-br from-surface/90 via-surface/60 to-surface/90 p-6 pb-8 shadow-[0_40px_80px_rgba(16,18,36,0.18)] backdrop-blur-xl"
            initial={{ opacity: 0, rotateX: -15, y: 80 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
            style={{ y: parallaxTwo }}
          >
            <div className="relative overflow-hidden rounded-[24px] border border-outline/40 bg-gradient-to-br from-white/90 via-surface/80 to-surface/80 p-5 dark:from-white/5 dark:via-surface dark:to-surface">
              <motion.div
                className="absolute -left-10 top-16 h-24 w-24 rounded-full bg-accent/25 blur-2xl"
                aria-hidden
                animate={{ y: [0, -12, 0], opacity: [0.6, 0.85, 0.6] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -right-12 -top-6 h-28 w-28 rounded-full bg-glow/20 blur-2xl"
                aria-hidden
                animate={{ y: [0, 18, 0], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <div className="relative z-10 space-y-6">
                <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/50 px-4 py-3 text-sm font-semibold text-foreground/75 shadow-inner-strong backdrop-blur-md dark:border-white/5">
                  <div>
                    <p className="uppercase text-xs tracking-[0.3em] text-foreground/50">
                      Flutter Odyssey
                    </p>
                    <p className="text-base text-foreground">Live Preview</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
                    <Cube size={26} weight="duotone" />
                  </div>
                </header>
                <div className="space-y-4">
                  {["Supercharged Motion", "Magnetic Gestures", "Adaptive Canvas"].map(
                    (title, index) => (
                      <motion.div
                        key={title}
                        className="group relative overflow-hidden rounded-2xl border border-outline/30 bg-surface/90 p-4 text-left shadow-sm backdrop-blur-md transition-transform hover:-translate-y-1"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + index * 0.08, duration: 0.5 }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-glow/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <p className="text-sm font-semibold text-foreground">
                          {title}
                        </p>
                        <p className="mt-1 text-xs text-foreground/60">
                          {[
                            "Feel butter-smooth transitions and layered parallax out of the box.",
                            "Delight users with physics-driven hero micro-interactions and feedback.",
                            "The widget responds to device breakpoints with pixel-perfect precision.",
                          ][index]}
                        </p>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <motion.div
              aria-hidden
              className="absolute -bottom-12 left-1/2 h-28 w-3/4 -translate-x-1/2 rounded-full bg-black/20 blur-3xl dark:bg-black/50"
              style={{ y: parallaxOne }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
