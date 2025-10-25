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
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

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
            className="eyebrow-pill bg-surface/70 px-4 py-2 text-foreground/65"
          >
            <DropHalf weight="duotone" className="text-accent" size={18} />
            Showcase
          </motion.div>
          <h2 className="heading-lg text-foreground">
            Every interaction feels choreographed.
          </h2>
          <p className="copy-lg text-foreground/70">
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
                className={clsx("label-sm rounded-full border border-outline/30 px-4 py-2 shadow-inner-strong", item.color)}
              >
                {item.label}
              </motion.span>
            ))}
          </div>
    </div>

        <div className="relative flex-1">
          <BentoGrid>
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                >
                  <BentoGridItem
                    title={card.title}
                    description={card.description}
                    icon={<Icon size={26} weight="duotone" />}
                    accent={
                      <span className="eyebrow-pill bg-surface/70 px-3 py-1.5 text-foreground/65">
                        Odyssey Flow
                      </span>
                    }
                    header={
                      <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-outline/30 bg-surface/90 p-4 shadow-inner-strong backdrop-blur-md">
                        <div
                          className={clsx(
                            "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                            "bg-gradient-to-br",
                            card.accent,
                          )}
                        />
                        <div className="relative flex flex-col gap-3 text-foreground/70">
                          <p className="copy-md text-foreground/70">
                            {index === 0 &&
                              "Timeline segments choreograph context shifts with motion-tracked scene anchors."}
                            {index === 1 &&
                              "Scroll velocity modulates depth, lens blur, and gradient bloom for tactile depth."}
                            {index === 2 &&
                              "Gesture-driven states snap using Impeller physics, complete with haptics hooks."}
                          </p>
                          <p className="label-sm text-foreground/50">
                            Hover to ignite parallax aura
                          </p>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              );
            })}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
