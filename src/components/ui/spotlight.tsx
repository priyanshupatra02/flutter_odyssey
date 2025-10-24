"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SpotlightProps = {
  className?: string;
  fill?: string;
  size?: number;
};

export function Spotlight({
  className,
  fill = "rgba(var(--glow-rgb), 0.24)",
  size = 480,
}: SpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      const controls = animate(mouseX, size / 2, {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      });
      const controlsY = animate(mouseY, size / 2, {
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
      });
      return () => {
        controls.stop();
        controlsY.stop();
      };
    }
    return undefined;
  }, [mounted, mouseX, mouseY, size]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const { clientX, clientY } = event;
      if (
        clientX < bounds.left ||
        clientX > bounds.right ||
        clientY < bounds.top ||
        clientY > bounds.bottom
      ) {
        return;
      }
      mouseX.set(clientX - bounds.left);
      mouseY.set(clientY - bounds.top);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${fill}, transparent 75%)`;

  return (
    <motion.div
      ref={containerRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition duration-500 ease-out group-hover:opacity-100",
        className,
      )}
      style={{
        background,
        mixBlendMode: "screen",
      }}
    />
  );
}
