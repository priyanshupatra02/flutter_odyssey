"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type CursorTarget = {
  element: HTMLElement;
  padding: number;
  text: string | null;
  tone: "light" | "dark";
};

const TARGET_SELECTOR = "[data-cursor-target]";
const BASE_RETICLE_SIZE = 82;
const DOT_SIZE = 6;

const springConfig = { stiffness: 260, damping: 28, mass: 0.6 };
const dotSpringConfig = { stiffness: 420, damping: 32, mass: 0.38 };

function getTargetData(element: HTMLElement): CursorTarget {
  const padding = Number(element.dataset.cursorPadding ?? 36);
  const text = element.dataset.cursorText?.trim() || null;
  const tone = (element.dataset.cursorTone as CursorTarget["tone"]) || "light";

  return {
    element,
    padding,
    text,
    tone,
  };
}

export function FloatingCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [target, setTarget] = useState<CursorTarget | null>(null);

  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);

  const dotX = useSpring(-200, dotSpringConfig);
  const dotY = useSpring(-200, dotSpringConfig);
  const reticleX = useSpring(-200, springConfig);
  const reticleY = useSpring(-200, springConfig);
  const reticleSize = useSpring(BASE_RETICLE_SIZE, springConfig);
  const backdropOpacity = useSpring(0, { stiffness: 150, damping: 24 });

  const rotationRef = useRef(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setIsPointerFine(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isPointerFine) {
      document.body.classList.remove("floating-cursor-active");
    }
    return () => {
      document.body.classList.remove("floating-cursor-active");
    };
  }, [isPointerFine]);

  useEffect(() => {
    if (!isPointerFine) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      dotX.set(event.clientX);
      dotY.set(event.clientY);

      if (target) {
        const rect = target.element.getBoundingClientRect();
        reticleX.set(rect.left + rect.width / 2);
        reticleY.set(rect.top + rect.height / 2);
      } else {
        reticleX.set(event.clientX);
        reticleY.set(event.clientY);
      }

      setIsVisible(true);
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    const handlePointerLeave = () => {
      setIsVisible(false);
      setTarget(null);
      setIsPressed(false);
      pointerX.set(-200);
      pointerY.set(-200);
      dotX.set(-200);
      dotY.set(-200);
      reticleX.set(-200);
      reticleY.set(-200);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [
    dotX,
    dotY,
    isPointerFine,
    pointerX,
    pointerY,
    reticleX,
    reticleY,
    target,
  ]);

  useEffect(() => {
    if (!isPointerFine) return;

    const handlePointerOver = (event: PointerEvent) => {
      const element = (event.target as HTMLElement | null)?.closest(
        TARGET_SELECTOR,
      ) as HTMLElement | null;
      if (!element) {
        setTarget(null);
        reticleSize.set(BASE_RETICLE_SIZE);
        backdropOpacity.set(0.3);
        return;
      }

      const data = getTargetData(element);
      const rect = element.getBoundingClientRect();

      reticleX.set(rect.left + rect.width / 2);
      reticleY.set(rect.top + rect.height / 2);
      reticleSize.set(Math.max(rect.width, rect.height) + data.padding);
      backdropOpacity.set(0.55);

      setTarget(data);
    };

    const handlePointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      const nextTarget = related?.closest(TARGET_SELECTOR) as
        | HTMLElement
        | null;

      if (target?.element && nextTarget && target.element.contains(nextTarget)) {
        return;
      }

      setTarget(null);
      reticleSize.set(BASE_RETICLE_SIZE);
      backdropOpacity.set(0.28);
    };

    window.addEventListener("pointerover", handlePointerOver, true);
    window.addEventListener("pointerout", handlePointerOut, true);

    return () => {
      window.removeEventListener("pointerover", handlePointerOver, true);
      window.removeEventListener("pointerout", handlePointerOut, true);
    };
  }, [backdropOpacity, isPointerFine, reticleSize, reticleX, reticleY, target]);

  useEffect(() => {
    if (!isVisible) {
      backdropOpacity.set(0);
      document.body.classList.remove("floating-cursor-active");
    } else if (!target) {
      backdropOpacity.set(0.28);
      document.body.classList.add("floating-cursor-active");
    } else {
      document.body.classList.add("floating-cursor-active");
    }
  }, [backdropOpacity, isVisible, target]);

  useAnimationFrame((_, delta) => {
    if (!target?.text) return;
    rotationRef.current = (rotationRef.current + delta * 0.03) % 360;
    setRotation(rotationRef.current);
  });

  const targetText = useMemo(() => {
    if (!target?.text) return null;
    const label = target.text.endsWith("•")
      ? target.text
      : `${target.text} • `;
    return label.repeat(6);
  }, [target]);

  if (!isPointerFine) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            aria-hidden
            className="floating-cursor-dot hidden md:block"
            style={{
              x: dotX,
              y: dotY,
              width: DOT_SIZE,
              height: DOT_SIZE,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: isPressed ? 0.65 : target ? 0.75 : 1,
              opacity: target ? 0.85 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            exit={{ opacity: 0, scale: 0.4 }}
          />

          <motion.div
            aria-hidden
            className="floating-cursor-reticle hidden md:flex"
            style={{
              x: reticleX,
              y: reticleY,
              width: reticleSize,
              height: reticleSize,
              opacity: backdropOpacity,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: isPressed ? 0.9 : target ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <span
              className="floating-cursor-reticle__halo"
              data-tone={target?.tone ?? "light"}
            />
            <motion.span
              className="floating-cursor-reticle__outline"
              data-tone={target?.tone ?? "light"}
              animate={{
                borderWidth: target ? 1.5 : 0.5,
              }}
            />
            {targetText && (
              <motion.span
                className="floating-cursor-reticle__text"
                data-tone={target?.tone ?? "light"}
                style={{ rotate: rotation }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              >
                {targetText.split("").map((char, index, array) => (
                  <span
                    key={`${char}-${index}`}
                    style={{
                      transform: `rotate(${(360 * index) / array.length}deg)`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </motion.span>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
