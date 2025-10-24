"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";

type Beam = {
  delay: number;
  duration: number;
  gradient: string;
  translateX: string;
  blur: string;
};

export function BackgroundBeams({ className }: { className?: string }) {
  const beams = useMemo<Beam[]>(
    () =>
      Array.from({ length: 6 }).map((_, index) => {
        const hue = 220 + index * 18;
        return {
          delay: index * 0.8,
          duration: 12 + index * 2,
          gradient: `linear-gradient(120deg, hsla(${hue}, 85%, 72%, 0.08), transparent)`
            + `, linear-gradient(60deg, hsla(${(hue + 30) % 360}, 95%, 70%, 0.12), transparent)`,
          translateX: `${-40 + index * 18}%`,
          blur: index % 2 === 0 ? "blur-2xl" : "blur-3xl",
        };
      }),
    [],
  );

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "[mask-image:radial-gradient(ellipse_at_center,rgba(255,255,255,0.7),transparent_70%)]",
        className,
      )}
    >
      {beams.map((beam, index) => (
        <motion.span
          key={index}
          className={cn(
            "absolute inset-y-[-20%] w-[45%] rounded-full opacity-0 mix-blend-screen",
            beam.blur,
          )}
          style={{
            backgroundImage: beam.gradient,
            left: beam.translateX,
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: [0, 0.75, 0], scale: [0.9, 1.05, 0.9], rotate: [ -12, 6, -12 ] }}
          transition={{
            delay: beam.delay,
            duration: beam.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

