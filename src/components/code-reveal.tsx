"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { BracketsAngle } from "@phosphor-icons/react/dist/ssr";

const flutterSnippet = `import 'package:flutter/material.dart';

class OdysseyWidget extends StatefulWidget {
  const OdysseyWidget({super.key});

  @override
  State<OdysseyWidget> createState() => _OdysseyWidgetState();
}

class _OdysseyWidgetState extends State<OdysseyWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1200),
  )..repeat(reverse: true);

  late final Animation<double> depth = CurvedAnimation(
    parent: controller,
    curve: Curves.easeInOutCubic,
  );

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: depth,
      builder: (context, child) {
        return GestureDetector(
          onPanUpdate: (details) => controller.value += details.delta.dy * .001,
          child: DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(28),
              gradient: LinearGradient(
                colors: [
                  Colors.deepPurpleAccent,
                  Colors.blueAccent,
                ],
              ),
              boxShadow: [
                BoxShadow(
                  blurRadius: lerpDouble(24, 48, depth.value)!,
                  spreadRadius: 4,
                  color: Colors.deepPurpleAccent.withOpacity(.28),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
`;

const { duotoneLight, nightOwl } = themes;

export function CodeReveal() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const theme = useMemo(() => {
    return resolvedTheme === "dark" ? nightOwl : duotoneLight;
  }, [resolvedTheme]);

  return (
    <section
      id="code"
      className="relative overflow-hidden rounded-[40px] border border-outline/30 bg-surface/85 p-10 shadow-[0_40px_110px_rgba(10,14,28,0.2)] backdrop-blur-2xl md:p-16"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-outline/50 bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-foreground/60 shadow-inner-strong">
            <BracketsAngle weight="duotone" className="text-accent" size={20} />
            Code reveal
          </div>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            See the Flutter magic behind the glass.
          </h2>
          <p className="text-base text-foreground/70 md:text-lg">
            Tap the glowing button to unveil the widget source. The snippet
            showcases custom animation controllers, gesture listeners, and
            crafted shadows powering Odyssey&apos;s parallax core.
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen((prev) => !prev)}
            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-gradient-to-r from-accent via-glow to-accent px-10 text-lg font-semibold text-accent-foreground shadow-[0_18px_60px_rgba(var(--glow-rgb),0.55)] transition-shadow duration-500"
            data-cursor-target
            data-cursor-text={isOpen ? "Hide •" : "Reveal •"}
            data-cursor-padding="140"
            data-cursor-tone="dark"
          >
            <span className="absolute inset-0 animate-pulse-glow" />
            <span className="absolute inset-0 translate-x-[-120%] bg-white/45 transition-transform duration-700 group-hover:translate-x-[120%]" />
            {isOpen ? "Hide Flutter Code" : "Reveal Flutter Code"}
          </motion.button>
        </div>

        <div className="relative flex-1">
          <AnimatePresence initial={false} mode="wait">
            {isOpen && (
              <motion.div
                key="code-panel"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[32px] border border-outline/25 bg-[rgba(12,16,28,0.88)] shadow-[0_30px_80px_rgba(10,14,28,0.38)] dark:bg-[rgba(6,10,20,0.92)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-glow/15" />
                <div className="relative max-h-[460px] overflow-auto">
                  <Highlight
                    theme={theme}
                    code={flutterSnippet.trim()}
                    language="dart"
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={`${className} m-0 overflow-auto p-8 text-sm leading-relaxed`}
                        style={style}
                      >
                        {tokens.map((line, i) => (
                          <div
                            key={i}
                            {...getLineProps({ line, key: i })}
                            className="flex min-w-max gap-6"
                          >
                            <span className="w-8 select-none text-right text-xs text-foreground/40">
                              {i + 1}
                            </span>
                            <span>
                              {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                              ))}
                            </span>
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8 text-sm text-foreground/55 lg:mt-4"
            >
              Hint: Animations orchestrate via `AnimationController`, while the
              parallax feels real thanks to subtle lerp-tuned shadows.
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
