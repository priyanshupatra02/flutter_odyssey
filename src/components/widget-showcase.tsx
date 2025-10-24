"use client";

import { motion, type Variants } from "framer-motion";
import {
  Browsers,
  DropHalf,
  Gradient,
  HandTap,
} from "@phosphor-icons/react/dist/ssr";
import { useMemo } from "react";
import clsx from "clsx";

const cards = [
  {
    title: "Storyline Navigation",
    description:
      "Scroll through chapters that morph seamlessly between hero, product, and testimonial moments without jarring context switches.",
    icon: Browsers,
    accent: "from-blue-500/70 via-sky-400/60 to-cyan-300/60",
  },
  {
    title: "Deep Parallax Layers",
    description:
      "Layered depth responds to the user's scroll velocity, translating backgrounds, cards, and particles on independent curves.",
    icon: Gradient,
    accent: "from-fuchsia-400/70 via-purple-400/60 to-indigo-400/60",
  },
  {
    title: "Haptic Gesture Deck",
    description:
      "Interactive carousels, draggable handles, and press states mapped to Flutter's physics controllers for delightful tactility.",
    icon: HandTap,
    accent: "from-emerald-400/70 via-lime-300/60 to-amber-300/60",
  },
];

const orbitingBadges = [
  { label: "Canvas Kit", color: "bg-accent/20", delay: 0 },
  { label: "Skia + Impeller", color: "bg-glow/20", delay: 0.2 },
  { label: "60 FPS on Mid-tier", color: "bg-emerald-500/20", delay: 0.4 },
];

export function WidgetShowcase() {
  const cardVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 40 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.15 + i * 0.12,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      }),
    }),
    [],
  );

  return (
    <section
      id="interactions"
      className="relative isolate overflow-hidden rounded-[48px] border border-outline/20 bg-surface/80 p-10 shadow-[0_40px_120px_rgba(8,12,20,0.18)] backdrop-blur-2xl md:p-16"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-12 top-12 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
        animate={{
          y: [0, -16, 0],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-glow/15 blur-3xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.45, 0.85, 0.45],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
        <div className="space-y-6 lg:max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-outline/50 bg-surface/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.38em] text-foreground/60 shadow-inner-strong"
          >
            <DropHalf weight="duotone" className="text-accent" size={18} />
            Showcase
          </motion.div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Every interaction feels choreographed.
          </h2>
          <p className="text-base text-foreground/70 md:text-lg">
            Animate between widget states, sync with live data, and choreograph
            motion using Flutter&apos;s Impeller renderer. These patterns are
            built with production-ready architecture and maintainable state
            flows.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.25em] text-foreground/55">
            {orbitingBadges.map((item) => (
              <motion.span
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: item.delay }}
                className={clsx(
                  "rounded-full border border-outline/30 px-4 py-2 shadow-inner-strong",
                  item.color,
                )}
              >
                {item.label}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  className={clsx(
                    "group relative overflow-hidden rounded-[28px] border border-outline/30 bg-surface/90 p-5 shadow-lg backdrop-blur-xl",
                    index === 1 ? "md:translate-y-8" : "md:translate-y-0",
                    index === 2 ? "md:translate-y-16" : "",
                  )}
                  data-cursor-target
                  data-cursor-text={`${card.title} •`}
                  data-cursor-padding="120"
                  whileHover={{
                    y: index === 0 ? -12 : index === 1 ? -20 : -16,
                    scale: 1.03,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                >
                  <span
                    className={clsx(
                      "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      "bg-gradient-to-br",
                      card.accent,
                    )}
                  />
                  <div className="relative z-10 space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface/90 shadow-inner-strong backdrop-blur">
                      <Icon size={26} weight="duotone" className="text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-sm text-foreground/65">{card.description}</p>
                  </div>
                  <motion.div
                    aria-hidden
                    className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/25 blur-3xl dark:bg-white/10"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
