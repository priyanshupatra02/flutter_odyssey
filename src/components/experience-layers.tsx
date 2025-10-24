"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MagicWand,
  Stack,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

const layers = [
  {
    title: "Motion Director",
    description:
      "Build cinematic sequences with Flutter&apos;s AnimationController linked to parallax depth maps. Every scroll tick orchestrates staggered entrances and velocity curves.",
    icon: MagicWand,
  },
  {
    title: "State Orchestrator",
    description:
      "Architect complex widget state with Riverpod + Navigator 2.0 scenes. Odyssey keeps transitions silky by diffing fragments and caching layout snapshots.",
    icon: Stack,
  },
  {
    title: "Inclusive Experience",
    description:
      "Animations respect user accessibility controls, supports screen readers, and extends to desktop with keyboard first navigation patterns.",
    icon: UsersThree,
  },
];

export function ExperienceLayers() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateOne = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const translateTwo = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const translateThree = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translations = [translateOne, translateTwo, translateThree];

  return (
    <section
      ref={sectionRef}
      id="experience-layers"
      className="relative mx-auto mt-24 grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1fr]"
    >
      <div className="space-y-5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-outline/40 bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/55"
        >
          Layers of polish
        </motion.p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Layers that elevate the widget beyond a prototype.
        </h2>
        <p className="text-base text-foreground/70 md:text-lg">
          Each module of Odyssey has been engineered to thrill users while being
          maintainable for teams. Scroll to feel how the presentation layers
          react to your momentum.
        </p>
      </div>
      <div className="space-y-6">
        {layers.map(({ title, description, icon: Icon }, index) => {
          const translate = translations[index];
          return (
            <motion.article
              key={title}
              style={{ y: translate }}
              className="group relative overflow-hidden rounded-[32px] border border-outline/25 bg-surface/90 p-8 shadow-[0_30px_80px_rgba(12,16,36,0.14)] backdrop-blur-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-glow/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex gap-4">
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Icon size={26} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/65 md:text-base">
                    {description}
                  </p>
                </div>
              </div>
              <motion.span
                aria-hidden
                className="absolute -right-16 bottom-6 h-28 w-28 rounded-full bg-white/20 blur-3xl dark:bg-white/10"
                animate={{
                  scale: [0.9, 1.08, 0.9],
                  opacity: [0.3, 0.52, 0.32],
                }}
                transition={{
                  duration: 9 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
